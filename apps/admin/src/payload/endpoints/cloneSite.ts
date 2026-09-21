import type { PayloadRequest } from 'payload';

export const cloneSiteEndpoint = async (req: PayloadRequest) => {
  try {
    const { payload } = req;
    
    // Basic body parsing since PayloadRequest doesn't automatically parse for endpoints the same way Express might
    let data;
    if (req.json) {
        data = await req.json();
    } else {
        return Response.json({ error: 'Missing request body' }, { status: 400 });
    }

    const { templateSiteId, newDomain, newName } = data;

    if (!templateSiteId || !newDomain || !newName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Fetch Template Site
    const templateSite = await payload.findByID({
      collection: 'sites',
      id: templateSiteId,
    });

    if (!templateSite) {
      return Response.json({ error: 'Template site not found' }, { status: 404 });
    }

    // 2. Clone Site Record
    const newSite = await payload.create({
      collection: 'sites',
      data: {
        ...templateSite,
        id: undefined, // remove old id string
        domain: newDomain,
        name: newName,
        isTemplate: false,
      },
    });

    const newSiteId = newSite.id as number;

    // 3. Fetch and Clone Products (Simplified for mock scenario)
    // In reality, this requires recursive traversal if categories have parents, etc.
    const productsRes = await payload.find({
      collection: 'products',
      where: { site: { equals: templateSiteId } },
      limit: 1000,
    });

    const oldProductToNewId: Record<number, number> = {};

    for (const oldProduct of productsRes.docs) {
      const newProduct = await payload.create({
        collection: 'products',
        data: {
          ...oldProduct,
          id: undefined, // ensure new ID
          site: newSiteId,
          slug: `${oldProduct.slug}-${Math.random().toString(36).substring(7)}`, // guarantee unique slug
        },
      });
      oldProductToNewId[oldProduct.id as number] = newProduct.id as number;
    }

    // 4. Fetch and Clone Pages
    const pagesRes = await payload.find({
      collection: 'pages',
      where: { site: { equals: templateSiteId } },
      limit: 100,
    });

    for (const oldPage of pagesRes.docs) {
      // Deep clone blocks and rewrite product relationships if productGrid block is present
      const clonedLayouts = (oldPage.layout || []).map((block: any) => {
          if (block.blockType === 'productGrid' && block.products) {
              return {
                  ...block,
                  products: block.products.map((pId: any) => {
                      const idToLookUp = typeof pId === 'number' ? pId : pId.id;
                      return oldProductToNewId[idToLookUp as number] || idToLookUp;
                  })
              };
          }
          // Clone other blocks directly
          return block;
      });

      await payload.create({
        collection: 'pages',
        data: {
          ...oldPage,
          id: undefined,
          site: newSiteId,
          layout: clonedLayouts,
        },
      });
    }

    return Response.json({ 
        success: true, 
        message: 'Site cloned successfully',
        siteId: newSiteId 
    });

  } catch (error: any) {
    req.payload.logger.error(`Error cloning site: ${error.message}`);
    return Response.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
};
