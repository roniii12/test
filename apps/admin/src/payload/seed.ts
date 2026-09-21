import type { Payload } from 'payload';
import path from 'path';

// Import static configuration files
import myganSite from '../../../storefront/src/config/sites/mygan.json';
import { myganHomepage } from '../../../storefront/src/config/sites/mygan-homepage';
import defaultTheme from '../../../storefront/src/theme/presets/default.json';

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...');

  // 0. Create an admin user first to ensure Payload Admin UI loads correctly
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@mygan.co.il' } },
  });
  
  if (existingUsers.docs.length === 0) {
    payload.logger.info('Creating admin user...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@mygan.co.il',
        password: 'password',
        role: 'admin',
      }
    });
  }

  // 1. Check for existing template Site and delete or reuse
  const existingSites = await payload.find({
    collection: 'sites',
    where: { domain: { equals: 'mygan.co.il' } },
  });

  if (existingSites.docs.length > 0) {
     payload.logger.info('Site already exists. Cleaning up old data to re-seed...');
     for (const oldSite of existingSites.docs) {
         // Delete associated products
         const products = await payload.find({ collection: 'products', where: { site: { equals: oldSite.id } }, limit: 1000 });
         for (const p of products.docs) await payload.delete({ collection: 'products', id: p.id });

         // Delete associated categories
         const categories = await payload.find({ collection: 'categories', where: { site: { equals: oldSite.id } }, limit: 1000 });
         for (const c of categories.docs) await payload.delete({ collection: 'categories', id: c.id });
         
         // Delete associated pages
         const pages = await payload.find({ collection: 'pages', where: { site: { equals: oldSite.id } }, limit: 1000 });
         for (const p of pages.docs) await payload.delete({ collection: 'pages', id: p.id });

         // Finally delete the site
         await payload.delete({ collection: 'sites', id: oldSite.id });
     }
  }

  // 1a. Create the template Site
  const site = await payload.create({
    collection: 'sites',
    data: {
      name: myganSite.brand.name,
      domain: 'localhost:3000', // Set to localhost:3000 for local verification
      isTemplate: true,
      brand: {
        name: myganSite.brand.name,
        shortName: myganSite.brand.shortName,
        logoText: myganSite.brand.logoText,
        tagline: myganSite.brand.tagline,
      },
      theme: {
        colors: defaultTheme.colors,
        typography: defaultTheme.typography,
        spacing: defaultTheme.spacing,
        borderRadius: defaultTheme.borderRadius,
      },
      header: {
        infoStrip: myganSite.infoStrip,
        topLinks: myganSite.topLinks,
        navigation: myganSite.navigation.map((nav) => ({
          label: nav.label,
          href: nav.href,
          highlight: nav.highlight || false,
          children: nav.children?.map((child) => ({
              label: child.label,
              href: child.href,
          })) || [],
        })),
      },
      footer: {
        columns: myganSite.footer.columns,
        copyrightText: myganSite.footer.copyrightText,
        bottomNote: myganSite.footer.bottomNote,
      },
      contact: {
        phone: myganSite.contact.phone,
        email: myganSite.contact.email,
        address: myganSite.contact.address,
        wazeLink: myganSite.contact.wazeLink,
        hours: {
          weekdays: myganSite.contact.hours.weekdays,
          friday: myganSite.contact.hours.friday,
          notes: myganSite.contact.hours.notes,
        },
      },
      social: myganSite.social as any,
      seo: {
        title: myganSite.seo.title,
        description: myganSite.seo.description,
      },
      locale: {
        defaultLocale: myganSite.locale.defaultLocale,
        defaultDir: myganSite.locale.defaultDir as 'rtl' | 'ltr',
      },
    },
  });

  payload.logger.info(`✨ Created Site: ${site.name} (ID: ${site.id})`);

  // 2. Extract Categories from navigation
  const categoriesMap = new Map<string, string>(); // slug -> categoryId

  // Flat array of category creation promises
  const categoryPromises = myganSite.navigation.flatMap((nav) => {
    const parentSlug = nav.href.replace('/category/', '');
    // Ignore top-level links that aren't categories (like blog)
    if (!nav.href.startsWith('/category/')) return [];
      
    // Create the parent category
    return payload.create({
      collection: 'categories',
      data: {
        name: nav.label,
        slug: parentSlug,
        site: site.id,
      },
    }).then(async (parentCategory) => {
        categoriesMap.set(parentSlug, parentCategory.id as unknown as string);
        
        // If there are children, create them too
        if (nav.children) {
            for (const child of nav.children) {
                const childSlug = child.href.replace('/category/', '');
                const childCategory = await payload.create({
                    collection: 'categories',
                    data: {
                    name: child.label,
                    slug: childSlug,
                    site: site.id,
                    parent: parentCategory.id,
                    },
                });
                categoriesMap.set(childSlug, childCategory.id as unknown as string);
            }
        }
    });
  });

  await Promise.all(categoryPromises);
  payload.logger.info(`✨ Created Categories from navigation menu`);

  // 3. Create Products from the homepage config
  const homepageBlocks = myganHomepage as any[];
  const productGridBlock = homepageBlocks.find((b) => b.type === 'productGrid');
  const productsMap = new Map<string, string>(); // old id -> payload id

  if (productGridBlock && productGridBlock.props.products) {
    const productPromises = productGridBlock.props.products.map((productData: any) => {
      // Basic slug generation from name
      const slug = productData.name.replace(/[^a-zA-Zא-ת0-9]/g, '-').replace(/-+/g, '-').toLowerCase();

      // We don't have the category association directly on the product in the mock data,
      // so we'll leave it empty for now or assign a generic one if needed.
      
      const specs = productData.specs ? productData.specs.split('|').map((spec: string) => {
          const parts = spec.split(':');
          return {
              key: parts[0]?.trim() || 'Spec',
              value: parts[1]?.trim() || parts[0]?.trim()
          };
      }) : [];

      return payload.create({
        collection: 'products',
        data: {
          name: productData.name,
          slug: `${slug}-${Math.floor(Math.random() * 10000)}`, // Ensure uniqueness
          sku: productData.id,
          site: site.id,
          price: productData.price,
          salePrice: productData.salePrice,
          badge: productData.badge,
          inStock: productData.inStock,
          shortDescription: productData.description,
          specs: specs,
          images: [], // Placeholder, no images in basic mock
        },
      }).then(p => {
          productsMap.set(productData.id, p.id as unknown as string);
          return p;
      });
    });

    await Promise.all(productPromises);
    payload.logger.info(`✨ Created Products`);
  }

  // 4. Create Homepage using the blocks mapping
  // We need to map the static data into payload's schema structure
  const heroBlock = homepageBlocks.find(b => b.type === 'hero');
  const catBannersBlock = homepageBlocks.find(b => b.type === 'categoryBanners');
  const trustBlock = homepageBlocks.find(b => b.type === 'trustBadges');
  const aboutBlock = homepageBlocks.find(b => b.type === 'about');

  // Build the layout array
  const layout = [];

  if (heroBlock) {
      layout.push({
          blockType: 'hero' as const,
          autoPlayMs: heroBlock.props.autoPlayMs,
          slides: heroBlock.props.slides as any,
          sideBanners: (heroBlock.props.sideBanners || []).map((sb: any) => ({
              headline: sb.title,
              cta: sb.cta,
              ctaHref: sb.ctaHref,
              bgGradient: sb.bgGradient,
              image: sb.image,
          })),
      });
  }

  if (catBannersBlock) {
     // Needs to reference the created category relations
     // The mock data has simple category links
      layout.push({
          blockType: 'categoryBanners' as const,
          title: catBannersBlock.props.title,
          columns: catBannersBlock.props.columns || 3,
          // Skipping categories mapping for MVP seeder unless exact matches are found
          categories: []
      });
  }

  if (productGridBlock) {
      // Reference the created product IDs
      layout.push({
          blockType: 'productGrid' as const,
          title: productGridBlock.props.title,
          columns: 4,
          products: Array.from(productsMap.values()),
      });
  }

  if (trustBlock) {
      layout.push({
          blockType: 'trustBadges' as const,
          title: trustBlock.props.title,
          badges: trustBlock.props.badges,
      });
  }

  if (aboutBlock) {
       // Note about html field vs richtext
      // Payload richtext is complex, we might just store html in an html field if the schema uses richtext for exact mapping we need to convert.
      // Assuming simple text for now if the schema is richtext but we provide raw html string, might need adjustment based on how Payload handles Lexical seed
  }

  await payload.create({
      collection: 'pages',
      data: {
          title: 'דף הבית',
          slug: 'home',
          site: site.id,
          layout: layout as any,
      }
  });

  payload.logger.info(`✨ Created Homepage`);
  payload.logger.info(`✅ Seeding complete`);
};
