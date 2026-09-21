
import { ProductDetailPage } from "@/components/blocks/ProductDetailPage";

export default async function ProductPage({ params }: { params: Promise<{ site: string; slug: string }> }) {
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
  } catch (err) { }

  if (!siteDoc) {
    return (
      <div className="section-padding text-center min-h-[50vh] flex flex-col justify-center">
        <h1>Product Page Pending API Implementation</h1>
      </div>
    );
  }

  const product = { name: slug } as any;

  return <ProductDetailPage product={product} />;
}
