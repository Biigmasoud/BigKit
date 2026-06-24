import { useState } from "react";
import { Product } from "../data/mock";
import { formatPrice } from "../config/site";
import { Check, ShieldCheck, Truck, ChevronLeft, HelpCircle, FileText, Info, Award, X } from "lucide-react";

interface ProductDetailViewProps {
  slug: string;
  products: Product[];
  onNavigate: (view: string, slug?: string) => void;
  onAddToCart: (
    product: Product, 
    size: string, 
    printName: string, 
    printNumber: string
  ) => void;
}

type ActiveTabType = "description" | "features" | "washing";

export default function ProductDetailView({ 
  slug, 
  products, 
  onNavigate, 
  onAddToCart 
}: ProductDetailViewProps) {
  
  // Find product by slug or fallback to first one
  const product = products.find(p => p.slug === slug) || products[0];

  const [size, setSize] = useState<string>("L");
  const [printName, setPrintName] = useState<string>("");
  const [printNumber, setPrintNumber] = useState<string>("");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("description");
  const [addedNotification, setAddedNotification] = useState<boolean>(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    onAddToCart(product, size, printName, printNumber);
    setAddedNotification(true);
    
    // Automatically reset notification and navigate to cart after 1.5 seconds
    setTimeout(() => {
      setAddedNotification(false);
      onNavigate("cart");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 animate-in fade-in duration-300 text-white" id="product-detail-view">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8 font-medium" dir="rtl">
        <button onClick={() => onNavigate("home")} className="hover:text-[#E30613] transition-colors">بیگ‌کیت</button>
        <ChevronLeft size={14} />
        <button onClick={() => onNavigate("products")} className="hover:text-[#E30613] transition-colors">کیت‌ها</button>
        <ChevronLeft size={14} />
        <span className="text-white font-bold truncate max-w-[150px] sm:max-w-none">{product.title}</span>
      </div>

      <div className="bg-[#111] rounded-3xl border border-white/5 p-5 sm:p-8 lg:p-10 shadow-2xl flex flex-col lg:flex-row gap-10">
        
        {/* Product Image Gallery Panel */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-inner group">
            {/* Corner Badge */}
            {product.discountPrice && (
              <span className="absolute top-4 right-4 bg-[#E30613] text-white text-xs font-black px-3.5 py-1.5 rounded-lg shadow-md z-10 uppercase tracking-wider">
                حراج ویژه بیگ‌کیت
              </span>
            )}
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-[#E30613] rounded-xl p-0.5 overflow-hidden aspect-[4/5] opacity-100 cursor-pointer">
              <img src={product.image} alt="زاویه اصلی" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="border border-white/5 hover:border-white/20 rounded-xl p-0.5 overflow-hidden aspect-[4/5] opacity-70 hover:opacity-100 transition-all cursor-pointer">
              <img src="https://images.unsplash.com/photo-1508344928928-7137b29de216?w=400&q=80" alt="جزئیات بافت پیراهن" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="border border-white/5 hover:border-white/20 rounded-xl p-0.5 overflow-hidden aspect-[4/5] opacity-70 hover:opacity-100 transition-all cursor-pointer">
              <img src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=400&q=80" alt="نمای پشت" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>

        {/* Product Customizer & Order Form */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6" id="product-purchase-panel">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2.5 items-center">
              <span className="text-xs font-black text-[#E30613] bg-red-600/10 border border-red-600/20 px-3.5 py-1 rounded-lg">{product.category}</span>
              <span className="text-xs text-gray-400 font-bold border-r border-white/5 pr-2.5">تیم: {product.team}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight text-right">
              {product.title}
            </h1>
          </div>
          
          {/* Prices block */}
          <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex items-center justify-between" id="price-card">
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-400 font-bold mb-1">قیمت نهایی با احتساب تخفیف:</span>
              <div className="flex items-baseline gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatPrice(product.discountPrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
            {product.discountPrice && (
              <div className="bg-[#E30613] text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}٪ تخفیف
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div id="size-selector-block">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-300 text-sm">سایز مورد نظر خود را انتخاب کنید:</span>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-black text-[#E30613] hover:text-red-500 flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <HelpCircle size={14} /> راهنمای سایزبندی دقیق
              </button>
            </div>
            
            <div className="flex gap-2.5 sm:gap-3" dir="ltr">
              {sizes.map(s => (
                <button 
                  key={s} 
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-black transition-all text-sm sm:text-base cursor-pointer focus:outline-none ${size === s ? 'border-[#E30613] text-[#E30613] bg-red-600/10' : 'border-white/5 text-gray-400 hover:border-white/20 bg-[#1a1a1a]'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Jersey Print Section (CRO Goldmine) */}
          <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 flex flex-col gap-4 text-right" id="custom-printing">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm sm:text-base">چاپ اسم و شماره دلخواه پشت کیت</h3>
              <span className="text-[10px] text-green-400 font-bold bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded">کاملاً اورجینال</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              جهت چاپ نام بازیکن محبوب یا اسم و شماره دلخواه خودتان، کادر زیر را به فارسی یا انگلیسی تکمیل کنید. (در غیر این صورت، لباس بدون چاپ ارسال خواهد شد)
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="نام دلخواه (مثال: MESSY یا مهدوی)" 
                value={printName}
                onChange={(e) => setPrintName(e.target.value)}
                maxLength={20}
                className="flex-1 bg-[#111] border border-white/5 p-3 rounded-xl text-xs sm:text-sm text-right outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]/30 transition-colors text-white"
              />
              <input 
                type="text" 
                placeholder="شماره (مثال: 10)" 
                value={printNumber}
                onChange={(e) => setPrintNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={3}
                className="w-full sm:w-28 bg-[#111] border border-white/5 p-3 rounded-xl text-xs sm:text-sm text-center outline-none focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613]/30 transition-colors text-white"
              />
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="relative">
            <button 
              onClick={handleAddToCart}
              className={`w-full text-white py-4 sm:py-4.5 rounded-xl text-base sm:text-lg font-black transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2 cursor-pointer focus:outline-none ${addedNotification ? 'bg-green-600 shadow-green-900/35' : 'bg-[#E30613] hover:bg-white hover:text-black shadow-red-950/20'}`}
              id="add-to-cart-cta"
            >
              {addedNotification ? (
                <>به سبد خرید اضافه شد! در حال انتقال...</>
              ) : (
                <>افزودن به سبد خرید بیگ‌کیت</>
              )}
            </button>
          </div>

          {/* Core Trust Indicators */}
          <div className="flex flex-col gap-3 mt-4 text-xs sm:text-sm text-green-400 bg-green-950/20 p-4 rounded-2xl border border-green-900/30 text-right">
            <div className="flex items-center gap-2"><Check className="text-green-400" size={16} /> ضمانت اصالت کیفیت پارچه تایلندی درجه یک</div>
            <div className="flex items-center gap-2"><ShieldCheck className="text-green-400" size={16} /> پرداخت امن از درگاه رسمی بانکی و شتاب</div>
            <div className="flex items-center gap-2"><Truck className="text-green-400" size={16} /> ارسال رایگان سراسر کشور (خرید بالای ۲ میلیون تومان)</div>
          </div>

        </div>
      </div>

      {/* Tabs description */}
      <section className="mt-12 bg-[#111] rounded-3xl border border-white/5 p-6 sm:p-8 shadow-2xl text-right">
        <div className="flex gap-4 border-b border-white/5 pb-3 mb-6" id="detail-tabs">
          {[
            { id: "description", label: "توضیحات محصول" },
            { id: "features", label: "مشخصات فنی و قواره" },
            { id: "washing", label: "راهنمای نگهداری و شستشو" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTabType)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer focus:outline-none ${activeTab === tab.id ? 'border-[#E30613] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="text-gray-300 text-xs sm:text-sm leading-loose max-w-4xl animate-in fade-in duration-200">
            <p className="mb-4">{product.description}</p>
            <p>این کیت از کیفیت پلی‌استر اعلا و نانو تنفسی ساخته شده است که در حین انجام فعالیت‌های ورزشی سنگین، دمای بدن را متعادل نگه داشته و رطوبت ناشی از تعریق را به سرعت تبخیر می‌کند. کیفیت گلدوزی نشان‌ها به شکلی است که پس از ده‌ها بار شستشو، کیفیت اولیه خود را کاملاً حفظ خواهد کرد.</p>
          </div>
        )}

        {activeTab === "features" && (
          <div className="text-gray-300 text-xs sm:text-sm leading-loose max-w-4xl animate-in fade-in duration-200">
            <ul className="space-y-2">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
                  <strong>{feat}</strong>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
                قواره استاندارد هواداری (کمی آزاد) با یقه راحت و آستین کوتاه.
              </li>
            </ul>
          </div>
        )}

        {activeTab === "washing" && (
          <div className="text-gray-300 text-xs sm:text-sm leading-loose max-w-4xl animate-in fade-in duration-200">
            <p className="font-bold text-white mb-2">برای طولانی‌تر شدن عمر کیت ورزشی فوتبالی، به نکات زیر توجه کنید:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>شستشو حتماً با آب ولرم یا سرد (زیر ۳۰ درجه سانتی‌گراد) انجام شود.</li>
              <li>قبل از قرار دادن پیراهن در ماشین لباسشویی، آن را به پشت برگردانید (چپه کنید) تا از آسیب به چاپ و لوگو جلوگیری شود.</li>
              <li>از سفیدکننده‌ها و پودرهای شستشوی بسیار آنزیم‌دار استفاده نکنید.</li>
              <li>به هیچ وجه لباس را مستقیماً اتو نکشید؛ برای اتوکشی حتماً یک پارچه نخی نازک روی لباس و بخش‌های چاپ‌شده قرار دهید.</li>
            </ol>
          </div>
        )}
      </section>

      {/* Size Guide Modal (CRO Masterpiece) */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSizeGuideOpen(false)}></div>
          
          <div className="bg-[#111] text-white border border-white/5 rounded-3xl max-w-lg w-full p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 text-right">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2 font-black text-white">
                <Info size={20} className="text-[#E30613]" />
                راهنمای دقیق سایزبندی کیت فوتبال بیگ‌کیت
              </div>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              کیت‌های ورزشی دارای قواره استاندارد هستند. برای داشتن بهترین انتخاب، از جدول زیر بر اساس قد و وزن تقریبی خود استفاده کنید.
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#1a1a1a]">
              <table className="w-full text-xs text-right text-gray-300">
                <thead className="bg-[#111] text-white font-bold border-b border-white/5">
                  <tr>
                    <th className="p-3">سایز</th>
                    <th className="p-3 text-center">عرض پیراهن</th>
                    <th className="p-3 text-center">ارتفاع پیراهن</th>
                    <th className="p-3 text-center">قد تقریبی خریدار</th>
                    <th className="p-3 text-center">وزن تقریبی خریدار</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-white">S (اسمال)</td>
                    <td className="p-3 text-center">۴۸ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۰ سانتی‌متر</td>
                    <td className="p-3 text-center">۱۶۰ تا ۱۷۰ سانتی‌متر</td>
                    <td className="p-3 text-center">۵۰ تا ۶۵ کیلوگرم</td>
                  </tr>
                  <tr className="bg-[#111]/50">
                    <td className="p-3 font-bold text-white">M (مدیوم)</td>
                    <td className="p-3 text-center">۵۰ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۲ سانتی‌متر</td>
                    <td className="p-3 text-center">۱۷۰ تا ۱۷۵ سانتی‌متر</td>
                    <td className="p-3 text-center">۶۵ تا ۷۵ کیلوگرم</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">L (لارج)</td>
                    <td className="p-3 text-center">۵۲ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۴ سانتی‌متر</td>
                    <td className="p-3 text-center">۱۷۵ تا ۱۸۰ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۵ تا ۸۵ کیلوگرم</td>
                  </tr>
                  <tr className="bg-[#111]/50">
                    <td className="p-3 font-bold text-white">XL (ایکس لارج)</td>
                    <td className="p-3 text-center">۵۴ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۶ سانتی‌متر</td>
                    <td className="p-3 text-center">۱۸۰ تا ۱۸۵ سانتی‌متر</td>
                    <td className="p-3 text-center">۸۵ تا ۹۵ کیلوگرم</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">XXL (دو ایکس لارج)</td>
                    <td className="p-3 text-center">۵۶ سانتی‌متر</td>
                    <td className="p-3 text-center">۷۸ سانتی‌متر</td>
                    <td className="p-3 text-center">۱۸۵ تا ۱۹۵ سانتی‌متر</td>
                    <td className="p-3 text-center">۹۵ تا ۱۱۰ کیلوگرم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3.5 bg-red-950/30 text-red-300 border border-red-900/20 rounded-xl text-[11px] leading-relaxed">
              <strong>توجه:</strong> قواره کیت‌های پلیری (Player Version) جذب‌تر و ورزشکاری‌تر از جدول فوق بوده و لوگوها به جای دوخت، به صورت ژلاتینی پرس شده‌اند. در صورت انتخاب قواره پلیری، عموماً پیشنهاد می‌شود یک سایز بزرگ‌تر انتخاب فرمایید.
            </div>

            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-5 w-full bg-[#E30613] hover:bg-white text-white hover:text-black py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
