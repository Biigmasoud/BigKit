export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
  stock: number;
  isNew: boolean;
  category: "باشگاهی" | "ملی" | "کلاسیک";
  team: string;
  description: string;
  badge?: string;
  features: string[];
}

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "real-madrid-home-2024",
    title: "کیت اول رئال مادرید ۲۰۲۴/۲۵",
    price: 950000,
    discountPrice: 850000,
    image: "https://images.unsplash.com/photo-1522778526582-8bc1033ce543?w=800&q=80",
    stock: 5,
    isNew: true,
    category: "باشگاهی",
    team: "رئال مادرید",
    description: "کیت رسمی اول رئال مادرید فصل ۲۰۲۴/۲۵ با طراحی بسیار زیبا و پارچه تنفسی ضد تعریق، دارای لوگوهای گلدوزی شده با بالاترین کیفیت دوخت.",
    badge: "پرفروش",
    features: ["پارچه سوزنی تنفسی", "لوگوهای تمام گلدوزی", "قواره استاندارد هواداری", "ضمانت شستشو و ثبات رنگ"]
  },
  {
    id: "2",
    slug: "arsenal-home-2024",
    title: "کیت اول آرسنال ۲۰۲۴/۲۵ نسخه پلیری",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&q=80",
    stock: 3,
    isNew: true,
    category: "باشگاهی",
    team: "آرسنال",
    description: "نسخه پلیری (جذب) کیت اول آرسنال با تکنولوژی هیت-ردی، لوگوهای ژلاتینی حرارتی فوق سبک و سوراخ‌های تهویه هوا در پشت پیراهن.",
    badge: "نسخه پلیری",
    features: ["تکنولوژی Heat.RDY", "لوگوهای ژلاتینی پرس حرارتی", "کپ اندامی و ورزشکاری", "بافت توری ضد تعریق فعال"]
  },
  {
    id: "3",
    slug: "barcelona-away-2024",
    title: "کیت دوم بارسلونا ۲۰۲۴/۲۵",
    price: 950000,
    discountPrice: 750000,
    image: "https://images.unsplash.com/photo-1620023472714-c3e031eb5db8?w=800&q=80",
    stock: 2,
    isNew: false,
    category: "باشگاهی",
    team: "بارسلونا",
    description: "کیت دوم بارسلونا فصل ۲۰۲۴/۲۵ با رنگ مشکی و جزئیات زرد و قرمز نماد کاتالونیا، نسخه‌ای کلاسیک و خاص برای طرفداران پروپاقرص بلوگرانا.",
    badge: "حراج ویژه",
    features: ["۱۰۰٪ پلی‌استر بازیافتی با کیفیت بالا", "مناسب برای ورزش و استفاده روزمره", "لوگوهای دوخته شده بادوام", "یقه کشبافت اعلا"]
  },
  {
    id: "4",
    slug: "argentina-home-2024",
    title: "کیت اول تیم ملی آرژانتین (۳ ستاره)",
    price: 850000,
    image: "https://images.unsplash.com/photo-1552318414-0ce5ef8de6b5?w=800&q=80",
    stock: 20,
    isNew: true,
    category: "ملی",
    team: "آرژانتین",
    description: "کیت رسمی اول تیم ملی آرژانتین ملقب به آلبی‌سلسته با طرح سنتی راه‌راه آسمانی و سفید و داشتن ۳ ستاره طلایی قهرمانی جهان بالای لوگو.",
    badge: "۳ ستاره قهرمان",
    features: ["لوگوی ۳ ستاره قهرمانی جهان", "پچ قهرمانی جام جهانی طلایی وسط سینه", "پارچه خنک‌کننده ایروردی", "طراحی ارگونومیک بازوها"]
  },
  {
    id: "5",
    slug: "italy-special-2024",
    title: "کیت اول تیم ملی ایتالیا ۲۰۲۴",
    price: 890000,
    discountPrice: 790000,
    image: "https://images.unsplash.com/photo-1508344928928-7137b29de216?w=800&q=80",
    stock: 8,
    isNew: false,
    category: "ملی",
    team: "ایتالیا",
    description: "پیراهن لاجوردی‌پوشان تیم ملی ایتالیا با نقش‌ونگارهای کلاسیک رنسانس درون بافت پارچه و فونت اختصاصی آتزوری.",
    badge: "محبوب",
    features: ["بافت تاروپود با نقش رنسانس", "لوگوی جدید فدراسیون ایتالیا", "جنس بسیار نرم و پنبه‌ای-پلی‌استر", "ضمانت عدم تغییر سایز در شستشو"]
  },
  {
    id: "6",
    slug: "milan-home-classic",
    title: "کیت کلاسیک آث میلان ۱۹۹۶/۹۷",
    price: 1100000,
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&q=80",
    stock: 4,
    isNew: true,
    category: "کلاسیک",
    team: "آث میلان",
    description: "کیت نوستالژیک و رویایی روسونری با اسپانسر خاطره‌انگیز Opel و یقه دکمه‌دار، نماد دوران طلایی مالدینی و باجو.",
    badge: "کلاسیک نوستالژی",
    features: ["طرح دقیق و وفادار به نسخه اصلی ۱۹۹۶", "اسپانسر Opel مخملی برجسته", "یقه کلاسیک دکمه‌دار شیک", "قواره آزاد Retro Fit"]
  }
];
