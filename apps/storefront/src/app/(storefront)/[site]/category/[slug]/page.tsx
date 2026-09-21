
import { Breadcrumb } from "@/components/blocks/Breadcrumb";
import { CategoryProductList } from "@/components/blocks/CategoryProductList";

export default async function CategoryPage({ params }: { params: Promise<{ site: string; slug: string }> }) {
  const { site, slug } = await params;
  let siteDoc: any = null;

  try {
    const res = await fetch(`http://127.0.0.1:4000/api/sites?where[domain][equals]=${decodeURIComponent(site)}&limit=1`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const siteData = await res.json();
      siteDoc = siteData.docs?.[0];
    }
    if (!siteDoc) {
      const templateRes = await fetch(`http://127.0.0.1:4000/api/sites?where[isTemplate][equals]=true&limit=1`, {
        next: { revalidate: 60 }
      });
      if (templateRes.ok) {
        const templateData = await templateRes.json();
        siteDoc = templateData.docs?.[0];
      }
    }
  } catch (err) {
    console.error("Failed to fetch site data:", err);
  }

  if (!siteDoc) {
    return (
      <div className="section-padding text-center min-h-[50vh] flex flex-col justify-center">
        <h1>Category Page Pending API Implementation</h1>
        <p>Waiting for the Category Agent to implement this route via API.</p>
      </div>
    );
  }

  const category = { name: slug, icon: "", description: "", seoText: "" };
  const productsData = { docs: [] };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: `#` },
  ];

  return (
    <div className="category-page section-padding min-h-screen bg-background text-foreground">
      <div className="container mx-auto">
        <div className="mb-8 pl-4 pr-4">
            <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="category-header mb-8 text-center bg-muted/30 p-8 rounded-lg border border-border mx-4">
          <div className="flex flex-col items-center justify-center gap-4">
              {category.icon && <span className="text-5xl">{category.icon}</span>}
              <h1 className="text-4xl font-bold">{category.name}</h1>
          </div>
          {category.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">{category.description}</p>
          )}
        </div>

        <div className="px-4">
            {/* Client component for sorting and filtering the product list */}
            <CategoryProductList initialProducts={productsData.docs} />
        </div>

        {/* SEO Text */}
        {category.seoText && (
            <div className="mt-16 p-8 bg-muted/10 rounded-lg mx-4 text-sm text-muted-foreground prose dark:prose-invert max-w-none">
              {typeof category.seoText === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: category.seoText }} />
              ) : (
                  <p>Payload Lexical Content...</p>
              )}
            </div>
        )}
      </div>
    </div>
  );
}
