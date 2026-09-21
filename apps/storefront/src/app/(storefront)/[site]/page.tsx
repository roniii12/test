import { PageRenderer } from "@/components/PageRenderer";

export default async function HomePage({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;
  const decodedSite = decodeURIComponent(site);
  let siteDoc: any = null;
  let pageDoc: any = null;

  let debugStr = "";
  try {
    const res = await fetch(`http://127.0.0.1:4000/api/sites?where[domain][equals]=${decodedSite}&limit=1`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const siteData = await res.json();
      debugStr += JSON.stringify(siteData);
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

    if (siteDoc) {
      const pageRes = await fetch(`http://127.0.0.1:4000/api/pages?where[slug][equals]=home&where[site][equals]=${siteDoc.id}&depth=2`, {
        cache: 'no-store'
      });
      if (pageRes.ok) {
        const pageData = await pageRes.json();
        pageDoc = pageData.docs?.[0];
      }
    }
  } catch (err) {
    console.error("Failed to fetch page data from API:", err);
  }

  if (!siteDoc) {
    return (
      <div className="section-padding text-center min-h-[50vh] flex flex-col justify-center text-left" dir="ltr">
        <h1>Site Not Found</h1>
        <p>Could not find site with domain: {site}</p>
        <p>Decoded: {decodedSite}</p>
        <p>Debug JSON: {debugStr}</p>
      </div>
    );
  }

  if (!pageDoc || !pageDoc.layout) {
    return (
      <div className="section-padding text-center min-h-[50vh] flex flex-col justify-center">
        <h1>Page Not Found (or no blocks)</h1>
      </div>
    );
  }

  return <PageRenderer blocks={pageDoc.layout} />;
}
