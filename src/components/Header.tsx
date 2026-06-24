import { useState } from "react";
import { siteConfig } from "../config/site";
import { ShoppingCart, Search, User, Phone, Menu, X, Instagram, MessageSquare } from "lucide-react";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string, slug?: string) => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ activeView, onNavigate, cartCount, searchQuery, onSearchChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleNav = (view: string, slug?: string) => {
    onNavigate(view, slug);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5" id="main-header">
      {/* Top Banner */}
      <div className="bg-[#111] text-white text-xs py-2 px-4 border-b border-white/5" id="top-banner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 font-medium text-gray-300">
              <Phone size={13} className="text-[#E30613]" /> {siteConfig.phone1}
            </span>
            <span className="hidden sm:inline text-gray-400">{siteConfig.supportText}</span>
          </div>
          <div className="text-[#E30613] font-bold animate-pulse-subtle text-[11px] sm:text-xs">
            {siteConfig.shippingText}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between" id="header-container">
        {/* Logo & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="منوی اصلی"
            id="mobile-menu-trigger"
          >
            <Menu size={24} />
          </button>
          
          <button 
            onClick={() => handleNav("home")}
            className="text-3xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity focus:outline-none"
            id="logo-button"
          >
            BIG<span className="text-[#E30613]">KIT</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400" id="desktop-nav">
          <button 
            onClick={() => handleNav("home")} 
            className={`cursor-pointer transition-colors pb-1 ${activeView === "home" ? "text-white border-b-2 border-[#E30613]" : "hover:text-white"}`}
          >
            صفحه اصلی
          </button>
          <button 
            onClick={() => handleNav("products")} 
            className={`cursor-pointer transition-colors pb-1 ${activeView === "products" ? "text-white border-b-2 border-[#E30613]" : "hover:text-white"}`}
          >
            کیتهای باشگاهی و ملی
          </button>
          <button 
            onClick={() => handleNav("contact")} 
            className={`cursor-pointer transition-colors pb-1 ${activeView === "contact" ? "text-white border-b-2 border-[#E30613]" : "hover:text-white"}`}
          >
            تماس و پشتیبانی
          </button>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-4" id="header-actions">
          {/* Search Trigger / Bar */}
          <div className="relative flex items-center">
            {isSearchVisible ? (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center px-4 py-1.5 shadow-xl w-48 sm:w-64 animate-in fade-in slide-in-from-left-2 duration-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (activeView !== "products") {
                      onNavigate("products");
                    }
                  }}
                  placeholder="جستجوی کیت محبوب..."
                  className="w-full text-xs outline-none text-white pr-1 bg-transparent"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    setIsSearchVisible(false);
                    onSearchChange("");
                  }} 
                  className="text-gray-400 hover:text-white p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsSearchVisible(true);
                  if (activeView !== "products") {
                    onNavigate("products");
                  }
                }}
                className="p-2 rounded-full bg-[#1a1a1a] border border-white/5 text-gray-300 hover:text-[#E30613] hover:border-[#E30613]/30 transition-all flex items-center gap-2"
                title="جستجو"
                id="search-btn"
              >
                <Search size={18} />
                <span className="hidden sm:inline text-xs text-gray-400">جستجو...</span>
              </button>
            )}
          </div>

          {/* User Profile */}
          <button 
            onClick={() => handleNav("contact")}
            className="p-2 rounded-full bg-[#1a1a1a] border border-white/5 text-gray-300 hover:text-white transition-colors hidden sm:inline-block"
            title="حساب کاربری"
            id="profile-btn"
          >
            <User size={18} />
          </button>

          {/* Shopping Cart */}
          <button 
            onClick={() => handleNav("cart")} 
            className="relative p-2.5 rounded-full bg-[#1a1a1a] border border-white/5 text-gray-300 hover:text-white transition-all focus:outline-none"
            title="سبد خرید"
            id="cart-btn"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E30613] text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" id="mobile-sidebar-drawer">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-4/5 bg-[#111] border-l border-white/5 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 text-white">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xl font-black">
                BIG<span className="text-[#E30613]">KIT</span>
              </span>
              <button 
                className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
                id="close-sidebar-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5 text-base font-bold flex-1">
              <button 
                onClick={() => handleNav("home")}
                className={`text-right py-2.5 border-b border-white/5 transition-colors ${activeView === "home" ? "text-[#E30613]" : "text-gray-300 hover:text-white"}`}
              >
                صفحه اصلی
              </button>
              <button 
                onClick={() => handleNav("products")}
                className={`text-right py-2.5 border-b border-white/5 transition-colors ${activeView === "products" ? "text-[#E30613]" : "text-gray-300 hover:text-white"}`}
              >
                تمامی محصولات و کیت‌ها
              </button>
              <button 
                onClick={() => handleNav("cart")}
                className={`text-right py-2.5 border-b border-white/5 transition-colors ${activeView === "cart" ? "text-[#E30613]" : "text-gray-300 hover:text-white"}`}
              >
                سبد خرید شما ({cartCount} مورد)
              </button>
              <button 
                onClick={() => handleNav("contact")}
                className={`text-right py-2.5 border-b border-white/5 transition-colors ${activeView === "contact" ? "text-[#E30613]" : "text-gray-300 hover:text-white"}`}
              >
                تماس با ما / پشتیبانی
              </button>
            </div>

            <div className="p-6 border-t border-white/5 bg-[#1a1a1a] text-xs text-gray-400 flex flex-col gap-3">
              <div className="font-bold text-gray-200">اطلاعات تماس بیگ‌کیت:</div>
              <div>تلفن: {siteConfig.phone1}</div>
              <div>آدرس: {siteConfig.address}</div>
              <div className="flex gap-4 mt-2">
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-green-400 font-bold">
                  <MessageSquare size={14} /> واتس‌اپ
                </a>
                <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-pink-400 font-bold">
                  <Instagram size={14} /> اینستاگرام
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
