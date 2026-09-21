/**
 * Mock data for the storefront template.
 * Structured to match mygan.co.il layout patterns.
 * In production, this data comes from the API.
 */

export interface Category {
  id: string;
  name: string;
  href: string;
  icon: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  badge?: string;
  inStock: boolean;
  specs?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export interface InfoStripItem {
  icon: string;
  text: string;
}

/* ───────── Info Strip (top banners - mygan style) ───────── */
export const infoStripItems: InfoStripItem[] = [
  { icon: "💬", text: "ייעוץ אישי" },
  { icon: "🚚", text: "משלוחים לכל הארץ" },
  { icon: "📱", text: "זמינים גם בווטסאפ 072-3306650" },
];

/* ───────── Categories ───────── */
export const categories: Category[] = [
  { id: "1", name: "מחסני מתכת", href: "/category/metal-sheds", icon: "🏗️", productCount: 24 },
  { id: "2", name: "מחסני עץ", href: "/category/wood-sheds", icon: "🪵", productCount: 18 },
  { id: "3", name: "בקתות עץ", href: "/category/cabins", icon: "🏡", productCount: 12 },
  { id: "4", name: "מחסני פלסטיק", href: "/category/plastic-sheds", icon: "📦", productCount: 15 },
  { id: "5", name: "גדרות במבוק", href: "/category/bamboo-fences", icon: "🎋", productCount: 32 },
  { id: "6", name: "רשת צל", href: "/category/shade-nets", icon: "☀️", productCount: 20 },
  { id: "7", name: "חממות", href: "/category/greenhouses", icon: "🌱", productCount: 8 },
  { id: "8", name: "קומפוסטרים", href: "/category/composters", icon: "♻️", productCount: 6 },
  { id: "9", name: "מחסן פנל מבודד", href: "/category/insulated", icon: "🧱", productCount: 10 },
  { id: "10", name: "גגונים", href: "/category/canopies", icon: "🏠", productCount: 5 },
];

/* ───────── Featured category banners (larger image sections) ───────── */
export interface CategoryBanner {
  id: string;
  name: string;
  href: string;
  description: string;
  bgGradient: string;
  icon: string;
}

export const categoryBanners: CategoryBanner[] = [
  {
    id: "b1",
    name: "גדרות במבוק",
    href: "/category/bamboo-fences",
    description: "מבחר ענק של גדרות במבוק טבעי ו-PVC סינטטי",
    bgGradient: "from-amber-800 to-amber-600",
    icon: "🎋",
  },
  {
    id: "b2",
    name: "מחסני מתכת",
    href: "/category/metal-sheds",
    description: "מחסנים עמידים ואיכותיים לחצר ולגינה",
    bgGradient: "from-slate-700 to-slate-500",
    icon: "🏗️",
  },
  {
    id: "b3",
    name: "קומפוסטרים",
    href: "/category/composters",
    description: "פתרונות קומפוסט ידידותיים לסביבה",
    bgGradient: "from-green-800 to-green-600",
    icon: "♻️",
  },
  {
    id: "b4",
    name: "חממות",
    href: "/category/greenhouses",
    description: "חממות ביתיות לגידול ירקות ופרחים",
    bgGradient: "from-emerald-800 to-emerald-600",
    icon: "🌱",
  },
  {
    id: "b5",
    name: "מחסן פנל מבודד לפי מידה",
    href: "/category/insulated",
    description: "אידאלי למשרד, קליניקה או חדר קריאה",
    bgGradient: "from-blue-800 to-blue-600",
    icon: "🧱",
  },
  {
    id: "b6",
    name: "מחסני פלסטיק",
    href: "/category/plastic-sheds",
    description: "קלים להרכבה ועמידים בכל מזג אוויר",
    bgGradient: "from-indigo-800 to-indigo-600",
    icon: "📦",
  },
];

/* ───────── Products ───────── */
export const products: Product[] = [
  {
    id: "p1",
    name: 'מחסן מתכת פרמיום 2.13×1.27 T74 דגם EverGreen',
    description: "מחסן מתכת פרמיום לגינה ולחצר",
    specs: "רוחב: 2.13 | עומק: 1.27 | גובה: 2.05 (המידות מגג לגג)",
    price: 1299,
    salePrice: 999,
    badge: "מבצע",
    inStock: true,
  },
  {
    id: "p2",
    name: 'מחסן עץ אירופאי 3×2 Arad דגם EverGreen',
    description: "אטום למים, כולל חלון נפתח ורצפה",
    specs: 'רוחב: 3 מ\' עומק: 2 מ\' גובה: 2.45 מ\' בליטת גגון 66 ס"מ',
    price: 8300,
    inStock: true,
  },
  {
    id: "p3",
    name: 'גדר במבוק סינטטי PVC 1.5×5 מ\' צבע קקאו',
    description: "מבצע כסאח!!!",
    specs: "גובה: 1.5 מטר | אורך: 5 מטר",
    price: 350,
    salePrice: 175,
    badge: "מבצע כסאח!",
    inStock: true,
  },
  {
    id: "p4",
    name: 'מחסן גינה פלסטיק Ave G דגם EverGreen',
    description: "מחסן גינה איכותי בעיצוב אלגנטי",
    specs: 'רוחב: 242 ס"מ עומק: 192 ס"מ גובה: 239 ס"מ',
    price: 2749,
    inStock: true,
  },
  {
    id: "p5",
    name: 'בקתת עץ אירופאי 3.3×2.98 דגם EverGreen',
    description: "בקתת עץ איכותית לגינה",
    specs: "רוחב: 3.3 עומק: 2.98 גובה: 228.7",
    price: 11400,
    inStock: true,
  },
  {
    id: "p6",
    name: 'מחסן גינה עץ אירופאי 28 מ"מ 3×3 Ringwood',
    description: "מחסן עץ אטום למים, כולל חלון נפתח, צלינדר, רצפה",
    specs: "עובי: 28 מ\"מ | מידות: 3×3 מטר",
    price: 12999,
    inStock: true,
  },
  {
    id: "p7",
    name: 'גדר ערבה מידה 1.5×5 מ\' EverGreen',
    description: "גדר ערבה טבעית לגינה",
    specs: "גובה: 1.5 מטר | אורך: 5 מטר",
    price: 290,
    salePrice: 180,
    badge: "הנחה",
    inStock: true,
  },
  {
    id: "p8",
    name: 'מחסן מתכת פרמיום 2.13×1.91 T76 דגם EverGreen',
    description: "מחסן מתכת פרמיום רחב",
    specs: "רוחב: 2.13 | עומק: 1.91 | גובה: 2.05 (המידות מגג לגג)",
    price: 1790,
    salePrice: 1249,
    badge: "מבצע",
    inStock: true,
  },
  {
    id: "p9",
    name: 'מחסן מתכת פרמיום 2.77×2.55 T98 דגם EverGreen',
    description: "מחסן מתכת גדול לגינה",
    specs: "רוחב: 2.77 | עומק: 2.55 | גובה: 2.12 (המידות מגג לגג)",
    price: 1499,
    inStock: true,
  },
  {
    id: "p10",
    name: 'מחסן עץ אירופאי 5×3 עובי 28 מ"מ Abigail',
    description: "מחסן עץ אטום למים, כולל חלון נפתח, צלינדר, רצפה",
    specs: "מידות: 5×3 מטר | עובי: 28 מ\"מ",
    price: 19400,
    inStock: true,
  },
  {
    id: "p11",
    name: 'מחסן גינה מפנל מבודד 3×3.5 דגם EverGreen',
    description: "אידאלי למשרד, קליניקה או חדר קריאה",
    specs: "מידות: 3×3.5 מטר | פנל מבודד",
    price: 6500,
    inStock: true,
  },
  {
    id: "p12",
    name: 'גדר ערבה מידה 1×5 מ\' EverGreen',
    description: "גדר ערבה טבעית קומפקטית",
    specs: "גובה: 1 מטר | אורך: 5 מטר",
    price: 190,
    salePrice: 120,
    badge: "הנחה",
    inStock: true,
  },
];

/* ───────── Navigation (mega-menu) ───────── */
export const navItems: NavItem[] = [
  {
    label: "מחסן גינה",
    href: "/category/garden-sheds",
    children: [
      { label: "מחסני מתכת", href: "/category/metal-sheds" },
      { label: "מחסן פנל מבודד", href: "/category/insulated" },
      { label: "מחסני עץ", href: "/category/wood-sheds" },
      { label: "בקתות עץ", href: "/category/cabins" },
      { label: "מחסני פלסטיק", href: "/category/plastic-sheds" },
      { label: "כונניות למחסנים", href: "/category/shelves" },
    ],
  },
  {
    label: "מחסני EverGreen",
    href: "/category/evergreen",
    children: [
      { label: "מחסן מתכת EverGreen", href: "/category/evergreen-metal" },
      { label: "מחסן עץ EverGreen", href: "/category/evergreen-wood" },
      { label: "מחסן פנל מבודד EverGreen", href: "/category/evergreen-insulated" },
      { label: "מחסני פלסטיק Evergreen", href: "/category/evergreen-plastic" },
    ],
  },
  {
    label: "גדרות במבוק",
    href: "/category/bamboo-fences",
    children: [
      { label: "גדר במבוק", href: "/category/bamboo" },
      { label: "גדר במבוק עובי 14-16", href: "/category/bamboo-14" },
      { label: "גדר במבוק עובי 30-35", href: "/category/bamboo-30" },
      { label: "גדר קנה צהוב", href: "/category/yellow-cane" },
      { label: "גדר ערבה", href: "/category/willow" },
      { label: "גדר גזעים", href: "/category/trunk" },
      { label: "גדר במבוק סינטטי PVC", href: "/category/pvc" },
    ],
  },
  {
    label: "ברזנט",
    href: "/category/tarpaulins",
    children: [
      { label: "מצופה נגד גשם", href: "/category/rain-tarp" },
      { label: 'שמשונית "ארז" 610 גרם', href: "/category/erez-tarp" },
      { label: "ברזנט שקוף", href: "/category/clear-tarp" },
    ],
  },
  {
    label: "רשת צל",
    href: "/category/shade-nets",
    children: [
      { label: "רשת צל רגילה לפי מידה", href: "/category/shade-regular" },
      { label: "רשת צל כפולה", href: "/category/shade-double" },
      { label: "רשת הצללה 320 גרם", href: "/category/shade-320" },
      { label: "רשת צל משולש", href: "/category/shade-triangle" },
      { label: "רשת הגנה לעצים", href: "/category/tree-protection" },
    ],
  },
  {
    label: "Sale מבצעים",
    href: "/category/sale",
  },
  { label: "חממות", href: "/category/greenhouses" },
  { label: "קומפוסטר", href: "/category/composters" },
  { label: "גגונים", href: "/category/canopies" },
  { label: "בלוג", href: "/blog" },
];

/* ───────── Trust Badges ───────── */
export const trustBadges: TrustBadge[] = [
  { icon: "🔒", title: "תשלום מאובטח בתקן PCI", description: "הנתונים שלכם מוגנים" },
  { icon: "💳", title: "תנאי תשלום נוחים", description: "עד 12 תשלומים" },
  { icon: "🚚", title: "משלוחים מהירים", description: "לכל רחבי הארץ" },
  { icon: "💰", title: "מחירים אטרקטיביים!", description: "המחיר הכי טוב" },
  { icon: "👨‍🔧", title: "ייעוץ מקצועי", description: "צוות מומחים לשירותכם" },
];

/* ───────── Hero Slides ───────── */
export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  cta: string;
  ctaHref: string;
  bgGradient: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "s1",
    headline: "מחסני גינה באיכות אירופאית",
    subheadline: "מגוון עצום של מחסנים מעץ, מתכת ופלסטיק — משלוח והתקנה עד הבית",
    cta: "לצפייה במחסנים",
    ctaHref: "/category/garden-sheds",
    bgGradient: "from-green-900 via-green-800 to-green-700",
  },
  {
    id: "s2",
    headline: "גדרות במבוק טבעי",
    subheadline: "פרטיות, סגנון ואיכות לחצר שלכם — מבחר ענק במחירים מיוחדים",
    cta: "לגדרות במבוק",
    ctaHref: "/category/bamboo-fences",
    bgGradient: "from-amber-900 via-amber-800 to-amber-700",
  },
  {
    id: "s3",
    headline: "🔥 מבצעים חמים",
    subheadline: "הנחות של עד 50% על מגוון מוצרים נבחרים — המלאי מוגבל!",
    cta: "לכל המבצעים",
    ctaHref: "/category/sale",
    bgGradient: "from-red-900 via-red-800 to-red-700",
  },
];

/* ───────── About Section ───────── */
export const aboutText = `אתר האינטרנט של "MyGan" – מיגן, הוא האתר המושלם עבור הגינה שלכם. באתר תוכלו למצוא את כל הדרוש לכם לטיפוח גינה פרטית וטיפוח חלקת הדשא שלכם. אנו ב-MyGan (מיגן) נלווה אתכם לאורך כל הדרך, החל משלב הייעוץ המקצועי וכלה בשלב אספקת המוצרים עד דלת הבית. לא תצטרכו לשבור את הראש כיצד להוביל את מחסן הגינה שרכשתם עד לפתח הבית, או להיטלטל עם הרכב ולסחוב ציוד כבד לגן. ב-MyGan תוכלו לרכוש מגוון מוצרים לגן: מחסני מתכת, מחסני עץ, גדרות במבוק, ציוד גינה, ועוד.`;
