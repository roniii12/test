
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SiteProvider } from "@/config/SiteProvider";
import { I18nProvider } from "@/i18n";
import { TopBar } from "@/components/blocks/TopBar";
import { MainNav } from "@/components/blocks/MainNav";
import { Footer } from "@/components/blocks/Footer";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import defaultTheme from "@/theme/presets/default.json";
import myganConfig from "@/config/sites/mygan.json";
import type { Site } from "@/config/site-config";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const decodedSite = decodeURIComponent(site);
  let siteDoc: any = null;

  try {
    // 1. Fetch site settings from Payload REST API
    const res = await fetch(`http://127.0.0.1:4000/api/sites?where[domain][equals]=${decodedSite}&limit=1`, {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const siteData = await res.json();
      siteDoc = siteData.docs?.[0];
    }

    // 2. Fallback for Dev Mode (Phase 4) - Match first template site if domain not found
    if (!siteDoc) {
      const templateRes = await fetch(`http://127.0.0.1:4000/api/sites?where[isTemplate][equals]=true&limit=1`, {
        cache: 'no-store'
      });
      if (templateRes.ok) {
        const templateData = await templateRes.json();
        siteDoc = templateData.docs?.[0];
      }
    }
  } catch (err) {
    console.error("Failed to fetch site config from API:", err);
  }

  const siteConfig = (siteDoc as unknown as Site) || (myganConfig as unknown as Site);
  const themeTokens = siteDoc?.theme || (siteConfig as any).theme || defaultTheme;
  const headerConfig = siteDoc?.header || siteConfig;
  const footerConfig = siteDoc?.footer || (siteConfig as any).footer;
  
  // Ensure brand is available if siteDoc is missing it but myganConfig has it
  if (!siteConfig.brand && (myganConfig as any).brand) {
    siteConfig.brand = (myganConfig as any).brand;
  }

  return (
    <ThemeProvider initialTheme={themeTokens} initialDir={siteConfig.locale?.defaultDir || 'rtl'}>
      <SiteProvider config={siteConfig}>
        <I18nProvider initialLocale={siteConfig.locale?.defaultLocale || 'he'}>
          <TopBar infoStrip={headerConfig.infoStrip} topLinks={headerConfig.topLinks} />
          <MainNav navigation={headerConfig.navigation} brand={siteConfig.brand || siteConfig} />
          {children}
          <Footer config={footerConfig} contact={siteConfig.contact} social={siteConfig.social || undefined} />
          <ThemeSwitcher />
        </I18nProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}
