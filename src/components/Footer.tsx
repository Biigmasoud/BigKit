import { siteConfig } from "../config/site";
import { Phone, MapPin, Mail, Clock, Instagram, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string, slug?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 mt-20 border-t border-white/5" id="main-footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Brand Block */}
        <div className="flex flex-col gap-4 bg-[#111] p-6 rounded-3xl border border-white/5">
          <button 
            onClick={() => onNavigate("home")}
            className="text-3xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity text-right focus:outline-none"
            id="footer-logo"
          >
            BIG<span className="text-[#E30613]">KIT</span>
          </button>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            {siteConfig.brandName} - {siteConfig.description}. ارائه باکیفیت‌ترین کیت‌های ورزشی فوتبال، هواداری و پلیری از برندهای معتبر جهانی با قابلیت چاپ اسم و شماره دلخواه با فونت اورجینال.
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href={siteConfig.instagram} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 hover:bg-[#E30613] rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all"
              title="اینستاگرام بیگ‌کیت"
            >
              <Instagram size={18} />
            </a>
            <a 
              href={siteConfig.whatsapp} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 hover:bg-green-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all"
              title="واتس‌اپ پشتیبانی"
            >
              <span className="text-sm font-bold">WA</span>
            </a>
          </div>
        </div>

        {/* Contact Info Block */}
        <div className="flex flex-col gap-4 bg-[#111] p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold border-r-2 border-[#E30613] pr-3 mb-2">تماس با ما</h3>
          
          <div className="flex items-start gap-3 text-sm text-gray-300">
            <Phone size={18} className="text-[#E30613] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <span>تلفن تماس: {siteConfig.phone1}</span>
              <span>تلفن همراه پشتیبانی: {siteConfig.phone2}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-gray-300">
            <MapPin size={18} className="text-[#E30613] mt-0.5 flex-shrink-0" />
            <span>آدرس: {siteConfig.address}</span>
          </div>

          <div className="flex items-start gap-3 text-sm text-gray-300">
            <Clock size={18} className="text-[#E30613] mt-0.5 flex-shrink-0" />
            <span>ساعات کاری: {siteConfig.workingHours}</span>
          </div>
        </div>

        {/* Trust Badges and Quick links */}
        <div className="flex flex-col gap-4 bg-[#111] p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold border-r-2 border-[#E30613] pr-3 mb-2">نمادهای اعتماد و اصالت</h3>
          <p className="text-xs text-gray-400">خرید ایمن و با اطمینان خاطر همراه با درگاه رسمی پرداخت بانکی کشور</p>
          
          <div className="flex gap-4 mt-2">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center w-24 h-24 hover:border-[#E30613]/50 transition-colors">
              <ShieldCheck size={28} className="text-green-500 mb-1" />
              <span className="text-[10px] text-gray-300 font-bold">ضمانت اصالت</span>
            </div>
            
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center w-24 h-24 hover:border-[#E30613]/50 transition-colors">
              <div className="text-[#E30613] font-black text-xs mb-1">e-Namad</div>
              <span className="text-[10px] text-gray-300 font-bold">نماد الکترونیک</span>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center w-24 h-24 hover:border-[#E30613]/50 transition-colors">
              <span className="text-xl font-bold text-yellow-500 mb-1">★ ★ ★</span>
              <span className="text-[10px] text-gray-300 font-bold">کیفیت تضمینی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Under Footer */}
      <div className="border-t border-white/5 pt-8 mt-8 text-center text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© تمامی حقوق مادی و معنوی برای {siteConfig.brandName} محفوظ است.</span>
          <span className="flex items-center gap-1">
            طراحی شده با <Heart size={12} className="text-[#E30613] fill-[#E30613]" /> برای دوستداران فوتبال و کیت‌های اورجینال
          </span>
        </div>
      </div>
    </footer>
  );
}
