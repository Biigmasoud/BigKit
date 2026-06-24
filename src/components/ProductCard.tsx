import React from "react";
import { formatPrice } from "../config/site";
import { Product } from "../data/mock";
import { ShoppingCart, Eye, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onNavigate: (view: string, slug?: string) => void;
  onQuickAdd: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onNavigate, onQuickAdd }: ProductCardProps) {
  const isLowStock = product.stock <= 5;

  return (
    <div 
      className="group bg-[#111] rounded-3xl border border-white/5 overflow-hidden hover:border-[#E30613]/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-3 sm:p-4"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Section */}
      <div className="relative aspect-[4/5] bg-[#1a1a1a] rounded-2xl overflow-hidden">
        {/* Status Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#E30613] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
              جدید
            </span>
          )}
          {product.discountPrice && (
            <span className="bg-red-600/10 text-[#E30613] border border-red-600/20 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md">
              تخفیف ویژه
            </span>
          )}
          {product.badge && !product.isNew && !product.discountPrice && (
            <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-3">
          <button 
            onClick={() => onNavigate("product-detail", product.slug)}
            className="w-11 h-11 bg-white hover:bg-[#E30613] text-black hover:text-white rounded-xl flex items-center justify-center transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="مشاهده جزئیات"
          >
            <Eye size={18} className="stroke-[2.5]" />
          </button>
          <button 
            onClick={() => onQuickAdd(product)}
            className="w-11 h-11 bg-[#E30613] hover:bg-white text-white hover:text-black rounded-xl flex items-center justify-center transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="افزودن سریع"
          >
            <ShoppingCart size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Actual Image */}
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Product Content Section */}
      <div className="pt-4 flex flex-col gap-2 flex-1 justify-between">
        <div className="flex flex-col gap-1.5">
          {/* Stock Notification */}
          {isLowStock ? (
            <span className="text-[10px] text-[#E30613] font-black bg-red-950/40 border border-red-900/30 w-fit px-2.5 py-1 rounded-lg">
              فقط {product.stock} عدد باقی مانده!
            </span>
          ) : (
            <span className="text-[10px] text-green-400 font-black bg-green-950/40 border border-green-900/30 w-fit px-2.5 py-1 rounded-lg">
              موجود در انبار
            </span>
          )}

          {/* Title */}
          <button 
            onClick={() => onNavigate("product-detail", product.slug)}
            className="font-bold text-gray-200 text-right line-clamp-2 hover:text-[#E30613] transition-colors text-sm sm:text-base cursor-pointer focus:outline-none mt-1"
          >
            {product.title}
          </button>
        </div>

        {/* Pricing and Quick Add */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex flex-col text-right">
            {product.discountPrice ? (
              <>
                <span className="text-[11px] text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base font-black text-white">
                  {formatPrice(product.discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-base font-black text-white">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button 
            onClick={() => onQuickAdd(product)}
            className="bg-[#1a1a1a] hover:bg-[#E30613] text-gray-300 hover:text-white p-2.5 rounded-xl transition-all duration-200 active:scale-95 border border-white/5"
            title="افزودن سریع به سبد"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
