import { useState, FormEvent } from "react";
import { Product } from "../data/mock";
import { formatPrice } from "../config/site";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Gift, Truck } from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  printName: string;
  printNumber: string;
  uniqueId: string;
}

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (uniqueId: string, delta: number) => void;
  onRemoveItem: (uniqueId: string) => void;
  onNavigate: (view: string, slug?: string) => void;
  onClearCart: () => void;
}

export default function CartView({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onNavigate,
  onClearCart
}: CartViewProps) {
  
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  // Checkout simulation states
  const [isCheckoutStep, setIsCheckoutStep] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>("");

  // Calculate Subtotal (using discount price if available)
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  // Free shipping goal (2,000,000 Toman)
  const freeShippingThreshold = 2000000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const shippingCost = isFreeShipping ? 0 : 45000;

  // Coupon Simulator
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponAppliedMessage("");

    const code = couponCode.toUpperCase().trim();
    if (code === "BIGKIT" || code === "MESSY") {
      setDiscountPercent(15);
      setCouponAppliedMessage("کد تخفیف ۱۵ درصدی با موفقیت اعمال شد!");
    } else if (code === "FIRST" || code === "OFFER") {
      setDiscountPercent(10);
      setCouponAppliedMessage("کد تخفیف ۱۰ درصدی با موفقیت اعمال شد!");
    } else {
      setCouponError("کد تخفیف معتبر نیست. از BIGKIT یا FIRST استفاده کنید.");
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const totalPayable = subtotal - discountAmount + shippingCost;

  // Checkout execution
  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !shippingAddress || !city) {
      alert("لطفاً تمام فیلدهای آدرس و مشخصات را پر کنید.");
      return;
    }
    // Generate a beautiful tracking number
    const randNum = Math.floor(100000 + Math.random() * 90000);
    setTrackingNumber(`BK-${randNum}`);
    setIsOrderPlaced(true);
    
    // Clear shopping cart on parent state
    setTimeout(() => {
      onClearCart();
    }, 100);
  };

  // Render Order Success Screen
  if (isOrderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center animate-in zoom-in-95 duration-300 text-right text-white" id="order-success-screen">
        <div className="bg-[#111] rounded-3xl border border-white/5 p-8 shadow-2xl flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 bg-green-950/40 text-green-400 rounded-full flex items-center justify-center animate-bounce shadow-md border border-green-900/30">
            <Check size={36} />
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">سفارش شما با موفقیت ثبت شد!</h1>
            <p className="text-xs sm:text-sm text-gray-400">ممنون از اعتماد شما به بیگ‌کیت. کیت‌های ورزشی شما در حال آماده‌سازی هستند.</p>
          </div>

          <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 w-full flex flex-col gap-3 text-sm font-medium">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-gray-400 text-xs">کد پیگیری سفارش:</span>
              <span className="font-mono font-black text-[#E30613] text-base select-all">{trackingNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">تحویل گیرنده:</span>
              <span className="text-gray-200">{fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">شماره تماس:</span>
              <span className="text-gray-200 font-mono">{phoneNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">مبلغ پرداخت شده:</span>
              <span className="text-[#E30613] font-black">{formatPrice(totalPayable)}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed">
            پیامک حاوی جزئیات بارنامه پستی و رهگیری مرسوله به محض تحویل به اداره پست، برای شماره همراه شما ارسال خواهد شد.
          </p>

          <button 
            onClick={() => onNavigate("home")}
            className="w-full bg-[#E30613] text-white hover:bg-white hover:text-black py-4 rounded-xl font-black transition-all cursor-pointer"
          >
            بازگشت به صفحه اصلی بیگ‌کیت
          </button>
        </div>
      </div>
    );
  }

  // Render Empty Cart Screen
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6 text-white" id="empty-cart-screen">
        <div className="w-20 h-20 bg-[#111] text-gray-500 rounded-full flex items-center justify-center border border-white/5 shadow-2xl">
          <ShoppingBag size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black text-white">سبد خرید شما فعلاً خالی است!</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            کیت‌های فوق‌العاده فصل جدید با کیفیت درجه یک تایلندی منتظر شما هستند. لباس تیم محبوبت رو انتخاب کن و بر تن کن!
          </p>
        </div>
        <button 
          onClick={() => onNavigate("products")}
          className="bg-[#E30613] hover:bg-white text-white hover:text-black px-8 py-3.5 rounded-xl font-black transition-all shadow-lg cursor-pointer flex items-center gap-2 focus:outline-none"
        >
          مشاهده و خرید کیت‌های فوتبال
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 animate-in fade-in duration-300 text-white" id="cart-view">
      <h1 className="text-2xl sm:text-3xl font-black mb-8 text-right text-white border-r-4 border-[#E30613] pr-4">
        سبد خرید شما ({cartItems.length} مورد)
      </h1>

      {/* Free Shipping Progress Alert */}
      <div className="bg-[#111] p-5 rounded-3xl border border-white/5 mb-8 shadow-2xl flex flex-col gap-3 text-right">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
          <span className="flex items-center gap-1.5 text-[#E30613]">
            <Truck size={16} />
            {isFreeShipping ? "تبریک! هزینه ارسال سفارش شما کاملاً رایگان شد!" : "خرید بیشتر برای ارسال رایگان!"}
          </span>
          <span className="text-gray-400">سقف ارسال رایگان: ۲,۰۰۰,۰۰۰ تومان</span>
        </div>
        
        {/* Progress bar background */}
        <div className="w-full bg-[#1a1a1a] h-2 rounded-full overflow-hidden border border-white/5">
          <div 
            className="bg-[#E30613] h-full transition-all duration-500 rounded-full"
            style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
          ></div>
        </div>

        {!isFreeShipping && (
          <p className="text-xs text-gray-400 font-medium">
            فقط <span className="text-[#E30613] font-black font-mono">{formatPrice(remainingForFreeShipping)}</span> دیگر به سبد خرید خود اضافه کنید تا ارسال به سراسر کشور رایگان شود!
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: Checkout Form OR Cart Items List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          {isCheckoutStep ? (
            /* Checkout step address inputs */
            <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl text-right" id="checkout-form-panel">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="font-black text-lg text-white">مشخصات تحویل‌گیرنده و آدرس ارسال</h3>
                <button 
                  onClick={() => setIsCheckoutStep(false)}
                  className="text-xs text-[#E30613] hover:text-red-400 font-black flex items-center gap-1 focus:outline-none"
                >
                  <ArrowRight size={14} /> بازگشت به ویرایش سبد
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">نام و نام خانوادگی تحویل گیرنده *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: علی رضایی"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-white/5 p-3 rounded-xl bg-[#1a1a1a] focus:bg-[#111] text-xs sm:text-sm outline-none focus:border-[#E30613] transition-colors text-right text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">شماره همراه تماس *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="مثال: 09121234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full border border-white/5 p-3 rounded-xl bg-[#1a1a1a] focus:bg-[#111] text-xs sm:text-sm outline-none focus:border-[#E30613] transition-colors text-left font-mono text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">استان / شهر *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: تهران"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-white/5 p-3 rounded-xl bg-[#1a1a1a] focus:bg-[#111] text-xs sm:text-sm outline-none focus:border-[#E30613] transition-colors text-right text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">کد پستی (اختیاری)</label>
                    <input 
                      type="text" 
                      placeholder="کد پستی ۱۰ رقمی"
                      className="w-full border border-white/5 p-3 rounded-xl bg-[#1a1a1a] focus:bg-[#111] text-xs sm:text-sm outline-none focus:border-[#E30613] transition-colors text-left font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">آدرس دقیق پستی جهت تحویل *</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="خیابان، کوچه، پلاک، طبقه و واحد..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full border border-white/5 p-3 rounded-xl bg-[#1a1a1a] focus:bg-[#111] text-xs sm:text-sm outline-none focus:border-[#E30613] transition-colors text-right text-white"
                  />
                </div>

                <div className="p-4 bg-red-950/30 rounded-xl border border-red-900/20 mt-2 text-xs text-red-300 leading-relaxed">
                  <strong>نحوه پرداخت دمو:</strong> پس از تکمیل اطلاعات و زدن دکمه تایید، فاکتور خرید شبیه‌سازی شده و کد پیگیری صادر خواهد شد تا جریان کامل خرید بدون نیاز به پرداخت مالی واقعی تکمیل شود.
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#E30613] text-white hover:bg-white hover:text-black py-4 rounded-xl text-base font-black transition-all shadow-lg cursor-pointer text-center"
                >
                  ثبت نهایی سفارش و دریافت کد پیگیری
                </button>
              </form>
            </div>
          ) : (
            /* Standard cart items list */
            <div className="flex flex-col gap-4" id="cart-items-list">
              {cartItems.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div 
                    key={item.uniqueId} 
                    className="bg-[#111] p-4 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center gap-4 shadow-xl hover:border-white/10 transition-all"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 relative rounded-2xl overflow-hidden bg-[#1a1a1a] flex-shrink-0 border border-white/5">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 text-center sm:text-right w-full">
                      <h3 className="font-bold text-white text-sm sm:text-base">{item.product.title}</h3>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                        <span className="bg-[#1a1a1a] px-2 py-0.5 rounded-md font-bold text-[10px] border border-white/5">سایز: {item.selectedSize}</span>
                        {(item.printName || item.printNumber) ? (
                          <span className="text-green-400 font-bold bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded-md text-[10px]">
                            چاپ: {item.printName || "بدون نام"} | {item.printNumber || "بدون شماره"}
                          </span>
                        ) : (
                          <span className="text-gray-500">بدون چاپ اسم و شماره</span>
                        )}
                      </div>

                      <div className="text-[#E30613] font-black text-sm sm:text-base mt-2">
                        {formatPrice(itemPrice)}
                      </div>
                    </div>

                    {/* Quantity Selector and Actions */}
                    <div className="flex items-center gap-5 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                      <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden" dir="ltr">
                        <button 
                          onClick={() => onUpdateQuantity(item.uniqueId, 1)}
                          className="px-3.5 py-1.5 hover:bg-[#111] hover:text-[#E30613] text-white transition-colors font-bold text-sm"
                        >
                          +
                        </button>
                        <span className="px-2 font-mono font-bold text-white text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.uniqueId, -1);
                            } else {
                              onRemoveItem(item.uniqueId);
                            }
                          }}
                          className="px-3.5 py-1.5 hover:bg-[#111] hover:text-[#E30613] text-white transition-colors font-bold text-sm"
                        >
                          -
                        </button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.uniqueId)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-950/20 p-2.5 rounded-xl transition-colors"
                        title="حذف از سبد خرید"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => onNavigate("products")}
                  className="text-xs sm:text-sm font-black text-white hover:text-[#E30613] flex items-center gap-1 focus:outline-none transition-colors"
                >
                  <ArrowRight size={14} className="transform rotate-180" /> ادامه خرید کیت‌ها
                </button>
                <button 
                  onClick={onClearCart}
                  className="text-xs font-black text-gray-500 hover:text-[#E30613] focus:outline-none transition-colors"
                >
                  خالی کردن کل سبد خرید
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Order Summary (Fixed in sticky) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 sticky top-28 shadow-2xl text-right" id="order-summary-card">
            <h3 className="font-black text-lg border-b border-white/5 pb-4 mb-5 text-white">خلاصه سفارش</h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-400 mb-6">
              <div className="flex justify-between items-center">
                <span>جمع کل اقلام سبد:</span>
                <span className="font-mono font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-[#E30613]">
                  <span className="flex items-center gap-1 font-bold">
                    <Gift size={14} /> تخفیف ویژه ({discountPercent}٪):
                  </span>
                  <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>هزینه پست پیشتاز:</span>
                <span className="font-bold text-white">
                  {isFreeShipping ? (
                    <span className="text-green-400 bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded font-bold text-[10px]">رایگان</span>
                  ) : (
                    <span className="font-mono">{formatPrice(shippingCost)}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Discount Code Input Box */}
            <div className="border-t border-b border-white/5 py-4 mb-6">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="کد تخفیف (مثال: BIGKIT)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-white/5 bg-[#1a1a1a] px-3 py-2 rounded-xl text-xs outline-none focus:border-[#E30613] text-right uppercase text-white"
                  disabled={isCheckoutStep}
                />
                <button 
                  type="submit"
                  disabled={isCheckoutStep}
                  className="bg-[#E30613] hover:bg-white hover:text-black text-white px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer disabled:opacity-40"
                >
                  اعمال
                </button>
              </form>
              
              {couponAppliedMessage && (
                <p className="text-[11px] text-green-400 font-bold mt-2 flex items-center gap-1">
                  <Check size={12} /> {couponAppliedMessage}
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-[#E30613] font-bold mt-2">
                  {couponError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-lg sm:text-xl font-black mb-6 pt-1 text-white">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-[#E30613] font-mono">{formatPrice(totalPayable)}</span>
            </div>

            {!isCheckoutStep ? (
              <button 
                onClick={() => setIsCheckoutStep(true)}
                className="w-full bg-[#E30613] hover:bg-white hover:text-black text-white py-4 rounded-xl font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                id="checkout-next-btn"
              >
                تایید اقلام و ادامه ثبت سفارش
                <ArrowRight size={16} className="transform rotate-180" />
              </button>
            ) : (
              <div className="text-center text-xs text-gray-400 font-bold bg-[#1a1a1a] p-3 rounded-xl border border-white/5">
                در حال ثبت آدرس و مشخصات...
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-xs text-gray-500 font-bold text-center">
              <ShieldCheck size={14} className="text-green-500" />
              ضمانت بازگشت وجه و تعویض سایز بیگ‌کیت
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
