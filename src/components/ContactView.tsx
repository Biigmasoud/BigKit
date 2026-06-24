import { useState, FormEvent } from "react";
import { siteConfig } from "../config/site";
import { MapPin, Phone, Instagram, Send, Check, MessageSquare, Clock } from "lucide-react";

export default function ContactView() {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !message) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setMobile("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 sm:py-16 animate-in fade-in duration-300 text-white" id="contact-view">
      <div className="text-center mb-12">
        <span className="text-xs font-black text-[#E30613] uppercase tracking-wider mb-2 block">ارتباط شبانه‌روزی</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">پشتیبانی و تماس با بیگ‌کیت</h1>
        <div className="w-12 h-1 bg-[#E30613] mx-auto mt-3 rounded-full"></div>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-3 leading-relaxed">
          سوالی دارید؟ می‌خواهید سایز کیت خود را تعویض کنید یا وضعیت سفارش را بپرسید؟ تیم ما ۲۴ ساعته پاسخگوی شماست.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Info Cards Side */}
        <div className="flex flex-col gap-6" id="contact-info-cards">
          {/* Phone Card */}
          <div className="bg-[#111] p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-5 shadow-2xl hover:border-[#E30613]/30 transition-all">
            <div className="w-12 h-12 bg-red-600/10 text-[#E30613] rounded-full flex items-center justify-center flex-shrink-0 border border-red-600/20">
              <Phone size={22} />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-white text-sm sm:text-base">تلفن‌های تماس مستقیم</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 dir-ltr font-mono">
                {siteConfig.phone1} <br />
                {siteConfig.phone2}
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-[#111] p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-5 shadow-2xl hover:border-[#E30613]/30 transition-all">
            <div className="w-12 h-12 bg-red-600/10 text-[#E30613] rounded-full flex items-center justify-center flex-shrink-0 border border-red-600/20">
              <MapPin size={22} />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-white text-sm sm:text-base">آدرس فروشگاه حضوری بیگ‌کیت</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Social Card */}
          <a 
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            className="bg-[#111] p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-5 shadow-2xl hover:border-[#E30613]/30 hover:shadow-2xl transition-all group"
          >
            <div className="w-12 h-12 bg-red-600/10 text-[#E30613] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#E30613] group-hover:text-white transition-colors border border-red-600/20">
              <Instagram size={22} />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-[#E30613] transition-colors">پیج اینستاگرام ما</h3>
              <p className="text-gray-400 text-xs mt-1" dir="ltr">
                @bigkit.ir
              </p>
            </div>
          </a>

          {/* Working Hours Card */}
          <div className="bg-[#111] p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-5 shadow-2xl text-right">
            <div className="w-12 h-12 bg-red-600/10 text-[#E30613] rounded-full flex items-center justify-center flex-shrink-0 border border-red-600/20">
              <Clock size={22} />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-white text-sm sm:text-base">ساعات کاری و پاسخگویی</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {siteConfig.workingHours}
              </p>
              <span className="text-[10px] text-green-400 font-bold bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded mt-1.5 inline-block">
                پشتیبانی آنلاین تلگرام/واتس‌اپ ۲۴ ساعته
              </span>
            </div>
          </div>
        </div>

        {/* Feedback / Contact Form */}
        <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-center" id="contact-form-card">
          {isSubmitted ? (
            <div className="text-center py-8 animate-in zoom-in-95 duration-200 flex flex-col items-center gap-5">
              <div className="w-14 h-14 bg-green-950/40 text-green-400 border border-green-900/30 rounded-full flex items-center justify-center shadow-inner">
                <Check size={28} />
              </div>
              <div className="flex flex-col gap-1.5 text-right items-center">
                <h3 className="text-xl font-bold text-white">پیام شما با موفقیت ارسال شد!</h3>
                <p className="text-xs text-gray-400 text-center max-w-xs">ممنون، پیام شما در صف بررسی کارشناسان بیگ‌کیت قرار گرفت. به زودی با شما تماس می‌گیریم.</p>
              </div>
              <button 
                onClick={handleReset}
                className="bg-[#1a1a1a] hover:bg-white text-white hover:text-black border border-white/5 px-6 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer mt-2"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <div className="text-right">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">ارسال پیغام مستقیم</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                فرم زیر را پر کنید تا پیام شما بلافاصله توسط تیم پشتیبانی بیگ‌کیت بررسی شده و با شما تماس برقرار کنیم.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">نام و نام خانوادگی *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام کامل خود را وارد کنید" 
                    className="w-full border border-white/5 bg-[#1a1a1a] focus:bg-[#111] text-white p-3.5 rounded-xl outline-none focus:border-[#E30613] transition-all text-xs sm:text-sm text-right" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">شماره همراه تماس *</label>
                  <input 
                    type="tel" 
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="مثال: 09123456789" 
                    className="w-full border border-white/5 bg-[#1a1a1a] focus:bg-[#111] text-white p-3.5 rounded-xl outline-none focus:border-[#E30613] transition-all text-xs sm:text-sm text-left font-mono" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">متن پیام یا سوال شما *</label>
                  <textarea 
                    required
                    rows={4} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="جزئیات درخواست یا پیام خود را بنویسید..." 
                    className="w-full border border-white/5 bg-[#1a1a1a] focus:bg-[#111] text-white p-3.5 rounded-xl outline-none focus:border-[#E30613] transition-all text-xs sm:text-sm text-right custom-scrollbar" 
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#E30613] hover:bg-white hover:text-black text-white py-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-lg cursor-pointer"
                >
                  <Send size={14} className="transform rotate-180" />
                  ارسال پیام به بیگ‌کیت
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
