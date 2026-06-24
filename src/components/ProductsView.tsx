import { useState, useMemo } from "react";
import { Product } from "../data/mock";
import ProductCard from "./ProductCard";
import { Filter, SlidersHorizontal, Search, Check, RefreshCw } from "lucide-react";

interface ProductsViewProps {
  products: Product[];
  onNavigate: (view: string, slug?: string) => void;
  onQuickAdd: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type SortType = "newest" | "cheapest" | "expensive";

export default function ProductsView({ 
  products, 
  onNavigate, 
  onQuickAdd, 
  searchQuery, 
  onSearchChange 
}: ProductsViewProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<SortType>("newest");
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("all"); // 'all' or 'low-stock'

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Stock Status Filter
    if (selectedStockStatus === "low-stock") {
      result = result.filter(p => p.stock <= 5);
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => 
          p.title.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.team.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortOption === "cheapest") {
      result.sort((a, b) => {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pA - pB;
      });
    } else if (sortOption === "expensive") {
      result.sort((a, b) => {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pB - pA;
      });
    } else {
      // newest (default or isNew first)
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedStockStatus, searchQuery, sortOption]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedStockStatus("all");
    onSearchChange("");
    setSortOption("newest");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 animate-in fade-in duration-300 text-white" id="products-view">
      
      {/* Title Header Banner */}
      <div className="bg-[#111] text-white rounded-3xl p-8 sm:p-12 mb-10 text-right relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute left-0 bottom-0 top-0 opacity-20 w-1/2 bg-[radial-gradient(circle_at_left,rgba(227,6,19,0.35),transparent_60%)]"></div>
        <div className="relative z-10">
          <span className="text-[#E30613] font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">آرشیو رسمی محصولات بیگ‌کیت</span>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">کیت‌های برتر فوتبال</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
            محصولات ورزشی را بر اساس لیگ، کشور، رنگ یا نوع کیت فیلتر کنید. تمامی کیت‌ها شامل تضمین کیفیت و امکان تست سایز می‌باشند.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <aside className="w-full lg:w-64 flex-shrink-0" id="products-sidebar">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 sticky top-28 shadow-xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex items-center gap-2 font-black text-white text-lg">
                <Filter size={18} className="text-[#E30613]" />
                فیلترها
              </div>
              
              <button 
                onClick={resetFilters}
                className="text-xs font-bold text-gray-500 hover:text-[#E30613] flex items-center gap-1 transition-colors"
                title="پاک کردن فیلترها"
              >
                <RefreshCw size={12} /> حذف فیلتر
              </button>
            </div>

            {/* Search filter within sidebar */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-2.5">جستجوی متنی</label>
              <div className="relative flex items-center bg-[#1a1a1a] border border-white/5 rounded-xl px-3 py-2.5">
                <input 
                  type="text" 
                  placeholder="رئال، آرسنال، کلاسیک..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent text-xs outline-none text-white pr-1 text-right"
                />
                <Search size={14} className="text-gray-400 flex-shrink-0" />
              </div>
            </div>

            {/* Category Filter Group */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-400 mb-3">دسته‌بندی‌ها</label>
              <div className="space-y-2 text-sm text-gray-300">
                {[
                  { id: "all", label: "همه کیت‌ها" },
                  { id: "باشگاهی", label: "کیت‌های باشگاهی" },
                  { id: "ملی", label: "کیت‌های ملی" },
                  { id: "کلاسیک", label: "کیت‌های نوستالژی / کلاسیک" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between w-full p-2.5 rounded-xl text-right transition-colors text-xs font-bold ${selectedCategory === cat.id ? 'bg-red-600/10 text-[#E30613] border border-red-600/20' : 'hover:bg-[#1a1a1a] text-gray-300'}`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <Check size={14} className="text-[#E30613]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Scarcity / Stock Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3">وضعیت موجودی</label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedStockStatus(selectedStockStatus === "all" ? "low-stock" : "all")}
                  className={`flex items-center gap-2.5 w-full p-2.5 rounded-xl text-right transition-colors text-xs font-bold ${selectedStockStatus === "low-stock" ? 'bg-red-600/10 text-[#E30613] border border-red-600/20' : 'border border-white/5 bg-[#1a1a1a] text-gray-300'}`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedStockStatus === "low-stock"}
                    onChange={() => {}} // handled by click
                    className="accent-[#E30613] cursor-pointer"
                  />
                  <span>در حال اتمام (موجودی کم)</span>
                </button>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid & Controls */}
        <div className="flex-1" id="products-grid-section">
          
          {/* Top sorting & info bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-[#111] p-4 rounded-3xl border border-white/5 shadow-xl" id="sorting-bar">
            <div className="text-xs text-gray-400 font-bold text-right w-full sm:w-auto">
              {searchQuery.trim() !== "" ? (
                <span>نتایج جستجو برای <span className="text-[#E30613]">«{searchQuery}»</span>: {filteredProducts.length} کیت یافت شد</span>
              ) : (
                <span>نمایش {filteredProducts.length} کیت ورزشی فوتبالی</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <SlidersHorizontal size={12} /> مرتب‌سازی:
              </span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortType)}
                className="border border-white/5 bg-[#1a1a1a] text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer hover:border-[#E30613] focus:border-[#E30613] transition-colors"
              >
                <option value="newest">جدیدترین‌ها</option>
                <option value="cheapest">ارزان‌ترین‌ها</option>
                <option value="expensive">گران‌ترین‌ها</option>
              </select>
            </div>
          </div>

          {/* Actual Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-grid">
              {filteredProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onNavigate={onNavigate} 
                  onQuickAdd={onQuickAdd} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#111] p-16 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center gap-4 shadow-xl" id="no-products-found">
              <Search size={48} className="text-gray-500" />
              <h3 className="text-lg font-bold text-white">هیچ کیتی مطابق فیلترهای شما یافت نشد!</h3>
              <p className="text-xs text-gray-400 max-w-sm">لطفاً عبارت دیگری را جستجو کنید یا فیلترها را حذف کنید.</p>
              <button 
                onClick={resetFilters}
                className="bg-[#E30613] hover:bg-white text-white hover:text-black px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer mt-2"
              >
                حذف همه فیلترها و مشاهده کل کیت‌ها
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
