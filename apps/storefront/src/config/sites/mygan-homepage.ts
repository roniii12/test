import type { PageBlock } from "../page-config";

/**
 * mygan.co.il homepage layout.
 * Aligned with official @repo/types and Payload CMS flat block structure.
 */
export const myganHomepage: PageBlock[] = [
  /* ── Hero Carousel + Side Banners ── */
  {
    blockType: "hero",
    autoPlayMs: 5000,
    slides: [
      {
        headline: "מבחר עצום של מחסנים לגינה",
        subheadline: "מגוון מחסנים מעץ, מתכת ופלסטיק — משלוח והתקנה עד הבית",
        cta: "לכל המוצרים",
        ctaHref: "/category/garden-sheds",
        bgGradient: "from-green-900 via-green-800 to-green-700",
        id: "slide1"
      },
      {
        headline: "גדרות במבוק טבעי",
        subheadline: "פרטיות, סגנון ואיכות לחצר שלכם — מבחר ענק במחירים מיוחדים",
        cta: "לכל המוצרים",
        ctaHref: "/category/bamboo-fences",
        bgGradient: "from-amber-900 via-amber-800 to-amber-700",
        id: "slide2"
      },
      {
        headline: "🔥 מבצעים חמים",
        subheadline: "הנחות של עד 50% על מגוון מוצרים נבחרים — המלאי מוגבל!",
        cta: "לכל המבצעים",
        ctaHref: "/category/sale",
        bgGradient: "from-red-900 via-red-800 to-red-700",
        id: "slide3"
      },
    ],
    sideBanners: [
      {
        headline: "מבחר מחסני עץ",
        cta: "לכל המוצרים",
        ctaHref: "/category/wood-sheds",
        bgGradient: "from-amber-800 to-amber-600",
        id: "side1"
      },
      {
        headline: "מבחר רשתות צל",
        cta: "לכל המוצרים",
        ctaHref: "/category/shade-nets",
        bgGradient: "from-sky-800 to-sky-600",
        id: "side2"
      },
    ],
  } as any,

  /* ── Category Banners ── */
  {
    blockType: "categoryBanners",
    title: "קטגוריות ראשיות",
    categories: [
      { id: 1, name: "גדרות במבוק", slug: "bamboo-fences", icon: "🎋", shortDescription: "מבחר ענק של גדרות במבוק טבעי ו-PVC סינטטי" },
      { id: 2, name: "מחסני מתכת", slug: "metal-sheds", icon: "🏗️", shortDescription: "מחסנים עמידים ואיכותיים לחצר ולגינה" },
      { id: 3, name: "קומפוסטרים", slug: "composters", icon: "♻️", shortDescription: "פתרונות קומפוסט ידידותיים לסביבה" },
      { id: 4, name: "חממות", slug: "greenhouses", icon: "🌱", shortDescription: "חממות ביתיות לגידול ירקות ופרחים" },
      { id: 5, name: "מחסן פנל מבודד לפי מידה", slug: "insulated", icon: "🧱", shortDescription: "אידאלי למשרד, קליניקה או חדר קריאה" },
      { id: 6, name: "מחסני פלסטיק", slug: "plastic-sheds", icon: "📦", shortDescription: "קלים להרכבה ועמידים בכל מזג אוויר" },
    ] as any[],
  } as any,

  /* ── Product Grid ── */
  {
    blockType: "productGrid",
    title: "הנמכרים ביותר",
    showAllLabel: "לכל המוצרים",
    products: [
      { id: 101, name: "מחסן מתכת פרמיום 2.13×1.27 T74 דגם EverGreen", price: 1299, salePrice: 999, slug: "metal-shed-t74", inStock: true, specs: [{ key: "מידות", value: "2.13x1.27", id: "s1" }] },
      { id: 102, name: "מחסן עץ אירופאי 3×2 Arad דגם EverGreen", price: 8300, slug: "wood-shed-arad", inStock: true, specs: [{ key: "מידות", value: "3x2", id: "s2" }] },
    ] as any[],
  } as any,

  /* ── Trust Badges ── */
  {
    blockType: "trustBadges",
    title: "חשוב לנו שתדעו",
    badges: [
      { icon: "🔒", title: "תשלום מאובטח בתקן PCI", id: "t1" },
      { icon: "💳", title: "תנאי תשלום נוחים", id: "t2" },
      { icon: "🚚", title: "משלוחים מהירים", id: "t3" },
    ],
  } as any,

  /* ── About Section ── */
  {
    blockType: "about",
    content: {
      root: {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ text: "אתר האינטרנט של 'MyGan' – מיגן, הוא האתר המושלם עבור הגינה שלכם." }],
            version: 1
          }
        ],
        direction: "rtl",
        format: "right",
        indent: 0,
        version: 1
      }
    }
  } as any,
];
