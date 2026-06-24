export const siteConfig = {
  brandName: "بیگکیت",
  description: "مرجع تخصصی خرید لباس فوتبال، کیت‌های باشگاهی و ملی",
  phone1: "۰۲۱-۱۲۳۴۵۶۷۸",
  phone2: "۰۹۱۲۱۲۳۴۵۶۷",
  whatsapp: "https://wa.me/989121234567",
  instagram: "https://instagram.com/bigkit.ir",
  address: "تهران، میدان منیریه، مجتمع تجاری ورزشی پلاک ۱۲",
  email: "support@bigkit.ir",
  workingHours: "شنبه تا پنجشنبه: ۹ صبح تا ۹ شب",
  supportText: "پشتیبانی ۲۴ ساعته",
  shippingText: "ارسال رایگان بالای ۲ میلیون تومان",
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};
