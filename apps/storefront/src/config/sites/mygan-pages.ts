import type { CategoryPageConfig } from "../page-config";

/* ───────────────────────────────────────────────
 *  mygan.co.il — category page configs
 *  Matches Konimbo CMS category page structure
 * ─────────────────────────────────────────────── */

export const myganCategories: Record<string, CategoryPageConfig> = {
  "metal-sheds": {
    slug: "metal-sheds",
    title: "מחסן גינה מתכת",
    shortDescription: "מחסני מתכת לגינה – איכות גבוהה במחיר משתלם",
    seoText: `<p>רבים בוחרים להציב מחסן בגינה על מנת להנות מהיתרונות הרבים של פתרון אחסון זה. אצלנו ב-MyGan תמצאו מגוון סוגים של מחסנים, ולפני שאתם בוחרים בסוג זה או אחר חשוב שתכירו את היתרונות של כל מחסן.</p>
<p>מחסן מתכת נחשב לאחד מסוגי המחסנים הנמכרים ביותר. המתכת היא חומר גלם עמיד לתנאי מזג האוויר, חזק ואיתן. מחסני מתכת אינם דורשים תחזוקה שוטפת משמעותית, וניתן למצוא אותם במחיר אטרקטיבי.</p>`,
    breadcrumbs: [
      { label: "דף הבית", href: "/" },
      { label: "מחסן גינה", href: "/category/garden-sheds" },
      { label: "מחסני מתכת", href: "/category/metal-sheds" },
    ],
    subCategories: [
      { id: "sc1", name: "מחסן מתכת EverGreen", href: "/category/metal-sheds-evergreen", count: 8 },
      { id: "sc2", name: "מחסן מתכת פרמיום", href: "/category/metal-sheds-premium", count: 5 },
    ],
    products: [
      {
        id: 201,
        name: "מחסן מתכת פרמיום 2.13X1.27 T74 דגם EverGreen",
        shortDescription: "מחסן מתכת איכותי עם גימור פרמיום",
        specs: [{ key: "מפרט", value: "מידות: 2.13X1.27 מ' | צבע: אפור", id: "ms1" }],
        price: 2990,
        salePrice: 2490,
        badge: "מבצע!",
        inStock: true,
        image: "/images/product-placeholder.jpg",
      },
      {
        id: 202,
        name: "מחסן מתכת פרמיום 2.13X1.91 T76 דגם EverGreen",
        shortDescription: "מחסן מתכת רחב עם דלת כפולה",
        specs: [{ key: "מפרט", value: "מידות: 2.13X1.91 מ' | צבע: אפור-ירוק", id: "ms2" }],
        price: 3490,
        salePrice: 2990,
        badge: "מבצע!",
        inStock: true,
        image: "/images/product-placeholder.jpg",
      },
      {
        id: 203,
        name: "מחסן מתכת פרמיום 2.77X2.55 T98 דגם EverGreen",
        shortDescription: "מחסן מתכת גדול לאחסון מקסימלי",
        specs: [{ key: "מפרט", value: "מידות: 2.77X2.55 מ' | צבע: אפור", id: "ms3" }],
        price: 5990,
        salePrice: 4990,
        badge: "הכי נמכר",
        inStock: true,
        image: "/images/product-placeholder.jpg",
      },
      {
        id: 204,
        name: "מחסן מתכת 3.07X2.37 דגם EverGreen",
        shortDescription: "מחסן מתכת ענק",
        specs: [{ key: "מפרט", value: "מידות: 3.07X2.37 מ' | צבע: חום עץ", id: "ms4" }],
        price: 6490,
        salePrice: 5490,
        inStock: true,
        image: "/images/product-placeholder.jpg",
      },
      {
        id: 205,
        name: "מחסן מתכת פרמיום 1.94X1.26 T64 דגם EverGreen",
        shortDescription: "מחסן מתכת קומפקטי",
        specs: [{ key: "מפרט", value: "מידות: 1.94X1.26 מ' | צבע: לבן", id: "ms5" }],
        price: 2490,
        salePrice: 1990,
        badge: "מבצע!",
        inStock: true,
        image: "/images/product-placeholder.jpg",
      },
      {
        id: 206,
        name: "מחסן מתכת אירופאי 2.60X1.85 דגם EverGreen",
        shortDescription: "מחסן מתכת תוצרת אירופה",
        specs: [{ key: "מפרט", value: "מידות: 2.60X1.85 מ' | צבע: ירוק כהה", id: "ms6" }],
        price: 4490,
        inStock: false,
        image: "/images/product-placeholder.jpg",
      },
    ],
  },

  "bamboo-fences": {
    slug: "bamboo-fences",
    title: "גדרות במבוק",
    shortDescription: "גדרות במבוק טבעי ואיכותי – פתרון הצללה ופרטיות לגינה",
    seoText: `<p>גדרות במבוק הן פתרון אלגנטי ואקולוגי להקניית פרטיות וצל בגינה. הבמבוק הוא חומר טבעי, עמיד ובעל מראה ייחודי שמשתלב בכל סגנון גינה.</p>`,
    breadcrumbs: [
      { label: "דף הבית", href: "/" },
      { label: "גדרות במבוק", href: "/category/bamboo-fences" },
    ],
    subCategories: [
      { id: 1, name: "גדר במבוק עובי 14-16", href: "/category/bamboo-14-16", count: 6 },
      { id: 2, name: "גדר במבוק עובי 30-35", href: "/category/bamboo-30-35", count: 4 },
      { id: 3, name: "גדר במבוק סינטטי PVC", href: "/category/bamboo-pvc", count: 3 },
      { id: 4, name: "גדר ערבה", href: "/category/willow-fence", count: 5 },
      { id: 5, name: "גדר קנה צהוב", href: "/category/yellow-cane", count: 3 },
    ] as any[],
    products: [
      {
        id: 301,
        name: "גדר במבוק מושחל 14-16 מ\"מ 1X5 מ' EverGreen",
        specs: [{ key: "מפרט", value: "גובה: 1 מ' | אורך: 5 מ' | עובי: 14-16 מ\"מ", id: "b1" }],
        price: 249,
        salePrice: 199,
        badge: "מבצע!",
        inStock: true,
      },
      {
        id: 302,
        name: "גדר במבוק מושחל 14-16 מ\"מ 1.5X5 מ' EverGreen",
        specs: [{ key: "מפרט", value: "גובה: 1.5 מ' | אורך: 5 מ' | עובי: 14-16 מ\"מ", id: "b2" }],
        price: 349,
        salePrice: 279,
        inStock: true,
      },
      {
        id: 303,
        name: "גדר במבוק מושחל 30-35 שחור 1.5X2 מ' EverGreen",
        specs: [{ key: "מפרט", value: "גובה: 1.5 מ' | אורך: 2 מ' | עובי: 30-35 מ\"מ | צבע: שחור", id: "b3" }],
        price: 499,
        salePrice: 399,
        badge: "פופולרי",
        inStock: true,
      },
      {
        id: 304,
        name: "גדר במבוק סינטטי PVC 1.5X5 מ' EverGreen צבע קקאו",
        specs: [{ key: "מפרט", value: "גובה: 1.5 מ' | אורך: 5 מ' | צבע: קקאו", id: "b4" }],
        price: 599,
        salePrice: 459,
        badge: "מבצע כסאח!!!",
        inStock: true,
      },
      {
        id: 305,
        name: "גדר ערבה מידה 1.5x5 מ' EverGreen",
        specs: [{ key: "מפרט", value: "גובה: 1.5 מ' | אורך: 5 מ'", id: "b5" }],
        price: 349,
        salePrice: 279,
        inStock: true,
      },
      {
        id: 306,
        name: "גדר ערבה מידה 1x5 מ' EverGreen",
        specs: [{ key: "מפרט", value: "גובה: 1 מ' | אורך: 5 מ'", id: "b6" }],
        price: 249,
        salePrice: 199,
        inStock: true,
      },
    ] as any[],
  },

  "shade-nets": {
    slug: "shade-nets",
    title: "רשת צל",
    shortDescription: "רשתות צל והצללה לגינה ולמרפסת",
    breadcrumbs: [
      { label: "דף הבית", href: "/" },
      { label: "רשת צל", href: "/category/shade-nets" },
    ],
    subCategories: [
      { id: 1, name: "רשת צל רגילה", href: "/category/shade-regular", count: 8 },
      { id: 2, name: "רשת צל כפולה", href: "/category/shade-double", count: 4 },
      { id: 3, name: "רשתות הצללה צל\"ש", href: "/category/shade-premium", count: 6 },
    ] as any[],
    products: [
      {
        id: 401,
        name: "רשת צל ירוקה 80% הצללה 4X5 מ'",
        specs: [{ key: "מפרט", value: "מידות: 4X5 מ' | אחוז הצללה: 80% | צבע: ירוק", id: "sn1" }],
        price: 179,
        salePrice: 139,
        inStock: true,
      },
      {
        id: 402,
        name: "רשת צל כפולה בז' 90% הצללה 4X6 מ'",
        specs: [{ key: "מפרט", value: "מידות: 4X6 מ' | אחוז הצללה: 90% | צבע: בז'", id: "sn2" }],
        price: 349,
        salePrice: 289,
        badge: "מומלץ",
        inStock: true,
      },
    ] as any[],
  },

  "garden-sheds": {
    slug: "garden-sheds",
    title: "מחסן גינה",
    shortDescription: "מחסני גינה – מבחר מחסנים מכל הסוגים במחירים משתלמים",
    breadcrumbs: [
      { label: "דף הבית", href: "/" },
      { label: "מחסן גינה", href: "/category/garden-sheds" },
    ],
    subCategories: [
      { id: 1, name: "מחסני מתכת", href: "/category/metal-sheds", count: 12 },
      { id: 2, name: "מחסני עץ", href: "/category/wood-sheds", count: 8 },
      { id: 3, name: "מחסני פלסטיק", href: "/category/plastic-sheds", count: 6 },
      { id: 4, name: "מחסן פנל מבודד", href: "/category/insulated-sheds", count: 4 },
      { id: 5, name: "בקתות עץ", href: "/category/wood-cabins", count: 5 },
    ] as any[],
    products: [],
  },
};

