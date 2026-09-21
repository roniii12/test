import { PageRenderer } from "@/components/PageRenderer";
import { notFound } from "next/navigation";

export default async function DynamicPage({ params }: { params: Promise<{ site: string; slug: string }> }) {
  const { site, slug } = await params;
  const decodedSite = decodeURIComponent(site);

  let siteDoc: any = null;
  let pageDoc: any = null;

  try {
    const res = await fetch(`http://127.0.0.1:4000/api/sites?where[domain][equals]=${decodedSite}&limit=1`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const siteData = await res.json();
      siteDoc = siteData.docs?.[0];
    }

    if (!siteDoc) {
      const templateRes = await fetch(`http://127.0.0.1:4000/api/sites?where[isTemplate][equals]=true&limit=1`, {
        cache: 'no-store'
      });
      if (templateRes.ok) {
        const templateData = await templateRes.json();
        siteDoc = templateData.docs?.[0];
      }
    }

    if (!siteDoc) return notFound();

    const pageRes = await fetch(`http://127.0.0.1:4000/api/pages?where[slug][equals]=${slug}&where[site][equals]=${siteDoc.id}&depth=2`, {
      cache: 'no-store'
    });
    
    if (pageRes.ok) {
      const pageData = await pageRes.json();
      pageDoc = pageData.docs?.[0];
    }
  } catch (err) {
    console.error("Failed to fetch page data:", err);
  }

  if (!pageDoc || !pageDoc.layout) {
    return notFound();
  }

  return <PageRenderer blocks={pageDoc.layout} />;
}
