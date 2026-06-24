import { Product } from "../data/mock";
import ProductCard from "./ProductCard";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Medal, Star, Flame, Trophy, Heart, ShoppingCart, Phone } from "lucide-react";

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: string, slug?: string) => void;
  onQuickAdd: (product: Product) => void;
}

export default function HomeView({ products, onNavigate, onQuickAdd }: HomeViewProps) {
  // Take 4 featured/new products
  const newArrivals = products.filter(p => p.isNew || p.discountPrice).slice(0, 4);

  // Find specific products for Bento Quick actions
  const arsenalProduct = products.find(p => p.slug === "arsenal-home-2024");
  const argentinaProduct = products.find(p => p.slug === "argentina-home-2024");

  const reviews = [
    {
      name: "امیررضا علوی",
      date: "۱۴۰۵/۰۴/۰۱",
      rating: 5,
      comment: "کیت پلیری آرسنال رو خریدم، کیفیتش واقعاً بی‌نظیره. لوگوها و دوخت کار فوق‌العاده تمیزه و قواره پیراهن عالیه. حتماً خرید بعدی هم از بیگ‌کیت خواهد بود.",
      product: "کیت اول آرسنال"
    },
    {
      name: "نیما خسروی",
      date: "۱۴۰۵/۰۳/۲۵",
      rating: 5,
      comment: "چاپ اسم و شماره پشت پیراهن با فونت دقیق و اورجینال باشگاه انجام شده. چند بار هم شستم و اصلاً تغییری نکرده. از پشتیبانی خوبتون تشکر می‌کنم.",
      product: "کیت اول رئال مادرید"
    },
    {
      name: "سحر مهدوی",
      date: "۱۴۰۵/۰۳/۱۸",
      rating: 5,
      comment: "کیت کلاسیک میلان خاطره‌انگیز و عالیه. جنس پارچه لطیف و بسیار باکیفیته. بسته‌بندی عالی و ارسال بسیار سریع بود.",
      product: "کیت کلاسیک میلان"
    }
  ];

  return (
    <div className="flex flex-col gap-12 sm:gap-16 max-w-7xl mx-auto px-4 sm:px-6 animate-in fade-in duration-500 text-white" id="home-view">
      
      {/* Bento Grid Hero Layout */}
      <section className="w-full mt-2 sm:mt-4" id="bento-hero-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Hero Box (col-span-7 row-span-4) */}
          <div className="md:col-span-7 bg-[#111] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-white/5 shadow-2xl min-h-[420px]">
            {/* Ambient Red Glow */}
            <div className="absolute top-0 left-0 w-full h-full opacity-35 pointer-events-none bg-gradient-to-br from-red-600/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <span className="bg-[#E30613] text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider text-white">
                New Arrival
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-6 leading-tight text-white tracking-tight">
                کیت اول <br />
                آرسنال ۲۰۲۴/۲۵
              </h1>
              <p className="text-gray-400 mt-4 max-w-sm text-sm sm:text-base leading-relaxed">
                نسخه پلیری با تکنولوژی جدید تنفسی Heat.RDY و لوگوهای ژلاتینی برجسته پرس حرارتی. قواره ورزشکاری.
              </p>
            </div>

            <div className="flex items-end justify-between relative z-10 mt-8">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs sm:text-sm line-through">۱,۵۰۰,۰۰۰ تومان</span>
                <span className="text-2xl sm:text-4xl font-black text-white">۱,۲۰۰,۰۰۰ تومان</span>
              </div>
              <button 
                onClick={() => onNavigate("product-detail", "arsenal-home-2024")}
                className="bg-white text-black font-black text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl hover:bg-[#E30613] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                خرید سریع
              </button>
            </div>
            
            {/* Background Graphic Decoration */}
            <div className="absolute right-[-10%] top-[20%] w-72 sm:w-96 h-72 sm:h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[100px] sm:text-[160px] font-black opacity-5 select-none pointer-events-none tracking-tighter">ARS</div>
          </div>

          {/* Second Kit Box (col-span-5) */}
          <div className="md:col-span-5 bg-[#1a1a1a] rounded-3xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden min-h-[220px]">
            <div className="flex justify-between items-start relative z-10">
              <div className="bg-blue-600/10 text-blue-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-blue-600/20 uppercase tracking-wider">
                ملی
              </div>
              <span className="text-gray-500 text-xs font-bold">پیشنهاد محبوب</span>
            </div>
            
            <div className="mt-4 relative z-10">
              <h3 className="text-2xl font-black text-white">کیت آرژانتین ۲۰۲۴</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">نسخه ۳ ستاره قهرمان جهان - البی سلسته</p>
            </div>

            <div className="flex items-center justify-between mt-6 relative z-10">
              <span className="text-xl font-black text-white">۸۵۰,۰۰۰ تومان</span>
              <button 
                onClick={() => {
                  if (argentinaProduct) {
                    onQuickAdd(argentinaProduct);
                  } else {
                    onNavigate("product-detail", "argentina-home-2024");
                  }
                }}
                className="w-12 h-12 bg-[#E30613] text-white hover:bg-white hover:text-black rounded-2xl flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md"
                title="افزودن سریع به سبد"
              >
                <ShoppingCart size={20} className="stroke-[2.5]" />
              </button>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Quick Stats Box (col-span-2) */}
          <div className="md:col-span-2 bg-[#222] rounded-3xl p-5 flex flex-col items-center justify-center border border-white/5 text-center min-h-[140px] hover:border-white/10 transition-all">
            <div className="text-3xl sm:text-4xl font-black text-[#E30613] tracking-tighter">+۵۰۰</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">
              محصول و کیت جدید
            </div>
          </div>

          {/* Support Box (col-span-3) */}
          <div className="md:col-span-3 bg-[#E30613] rounded-3xl p-5 flex flex-col justify-between border border-white/5 min-h-[140px] hover:scale-[1.02] transition-transform">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Phone size={16} className="text-white" />
            </div>
            <div>
              <div className="text-[11px] text-red-200 font-bold uppercase tracking-wider">پشتیبانی آنلاین</div>
              <div className="text-base sm:text-lg font-black leading-tight mt-1 text-white">
                مشاوره رایگان انتخاب سایز و مدل
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bento Footer / Promo Bar */}
      <section className="w-full" id="bento-promo-bar">
        <div className="bg-white rounded-3xl flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-5 sm:py-6 gap-4 border border-white/5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-black text-xs sm:text-sm font-black">ارسال سریع ۲۴ ساعته پیشتاز</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-black text-xs sm:text-sm font-black">ضمانت تعویض سایز و بازگشت وجه</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-black text-xs sm:text-sm font-black">پرداخت در محل (ویژه تهران)</span>
            </div>
          </div>
          <div className="text-black font-black text-base sm:text-lg tracking-tighter w-full sm:w-auto text-left border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
            BIG<span className="text-[#E30613]">KIT</span> EXCLUSIVE
          </div>
        </div>
      </section>

      {/* Category Grid Access */}
      <section className="w-full" id="categories-section">
        <div className="text-right mb-8">
          <span className="text-xs font-black text-[#E30613] uppercase tracking-widest block mb-1">
            دسته‌بندی‌ها
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            کیت تیم محبوب خود را جستجو کنید
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Club Category */}
          <div 
            onClick={() => onNavigate("products")}
            className="group relative h-44 sm:h-52 rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#111]"
          >
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&q=80" 
              alt="کیت باشگاهی" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white text-right">
              <Trophy className="text-[#E30613] mb-2" size={24} />
              <h3 className="text-xl font-black">کیت‌های باشگاهی اروپا</h3>
              <p className="text-xs text-gray-400 mt-1">پیراهن و شورت تیم‌های معتبر اروپایی</p>
            </div>
          </div>

          {/* National Category */}
          <div 
            onClick={() => onNavigate("products")}
            className="group relative h-44 sm:h-52 rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#111]"
          >
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1552318414-0ce5ef8de6b5?w=800&q=80" 
              alt="کیت ملی" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white text-right">
              <Star className="text-amber-400 mb-2 fill-amber-400" size={24} />
              <h3 className="text-xl font-black">کیت‌های ملی مدعیان</h3>
              <p className="text-xs text-gray-400 mt-1">پیراهن اول و دوم کشورهای مدعی جام جهانی</p>
            </div>
          </div>

          {/* Classic Category */}
          <div 
            onClick={() => onNavigate("products")}
            className="group relative h-44 sm:h-52 rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#111]"
          >
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1620023472714-c3e031eb5db8?w=800&q=80" 
              alt="کیت کلاسیک نوستالژی" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white text-right">
              <RotateCcw className="text-sky-400 mb-2" size={24} />
              <h3 className="text-xl font-black">کیت‌های کلاسیک نوستالژی</h3>
              <p className="text-xs text-gray-400 mt-1">طرح‌های نوستالژیک و خاطره‌انگیز قدیمی فوتبال</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Products */}
      <section className="w-full" id="new-arrivals-section">
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
          <div className="text-right">
            <span className="text-xs font-black text-[#E30613] uppercase tracking-wider mb-1 block">محصولات منتخب</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">جدیدترین کیت‌های ویژه فصل</h2>
          </div>
          <button 
            onClick={() => onNavigate("products")}
            className="text-sm font-bold text-gray-400 hover:text-[#E30613] flex items-center gap-1 transition-colors group focus:outline-none"
          >
            مشاهده همه کیت‌ها
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onNavigate={onNavigate} 
              onQuickAdd={onQuickAdd} 
            />
          ))}
        </div>
      </section>

      {/* Trust Campaign Banner */}
      <section className="w-full" id="trust-campaign">
        <div className="bg-[#111] rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row justify-between items-center text-white border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-[#E30613]/20 rounded-full blur-3xl"></div>
          
          <div className="mb-6 md:mb-0 text-right relative z-10 max-w-xl">
            <span className="bg-[#E30613] text-white text-[10px] font-black px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">
              پیشنهاد طلایی ارسال
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-3">ارسال کاملاً رایگان به سراسر کشور</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              برای تمامی سفارش‌های بالای ۲ میلیون تومان، هزینه پست پیشتاز به تمام شهرهای کشور کاملاً رایگان خواهد بود!
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate("products")}
            className="px-8 py-4 bg-white text-black hover:bg-[#E30613] hover:text-white rounded-2xl font-black transition-all shadow-md active:scale-95 text-sm sm:text-base cursor-pointer focus:outline-none"
          >
            شروع خرید کـیـت
          </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full mb-4" id="customer-reviews-section">
        <div className="text-right mb-8">
          <span className="text-xs font-black text-[#E30613] uppercase tracking-widest block mb-1">
            صدای مشتریان
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">نظرات و رضایت خریداران بیگ‌کیت</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[#111] p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors">
              <div>
                {/* Stars and Rating */}
                <div className="flex gap-1 text-amber-400 mb-3" dir="ltr">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Review text */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed text-right font-medium">
                  «{review.comment}»
                </p>
              </div>

              {/* Author details */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-xs text-gray-500">
                <div className="text-right">
                  <div className="font-bold text-gray-300">{review.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">خریدار {review.product}</div>
                </div>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
