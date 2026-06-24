import { useState, useEffect } from "react";
import { mockProducts, Product } from "./data/mock";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ProductsView from "./components/ProductsView";
import ProductDetailView from "./components/ProductDetailView";
import CartView, { CartItem } from "./components/CartView";
import ContactView from "./components/ContactView";
import { Check, ShoppingBag, X } from "lucide-react";

export default function App() {
  // Views navigation state
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>("");

  // Search filter query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Shopping Cart items state loaded from localstorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("bigkit_cart_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Simple toast state for cart addition confirmation
  const [toast, setToast] = useState<{ visible: boolean; text: string; productTitle?: string } | null>(null);

  // Synchronize cart with localStorage
  useEffect(() => {
    localStorage.setItem("bigkit_cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleNavigate = (view: string, slug?: string) => {
    setCurrentView(view);
    if (slug) {
      setSelectedProductSlug(slug);
    }
    // Scroll smoothly to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add item to cart with options
  const handleAddToCart = (product: Product, size: string, printName: string, printNumber: string) => {
    setCartItems((prevItems) => {
      // Find matching item with SAME size and SAME print name / number
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === size &&
          item.printName === printName &&
          item.printNumber === printNumber
      );

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        // Append brand new unique item
        const uniqueId = `${product.id}-${size}-${printName || "no"}-${printNumber || "no"}-${Date.now()}`;
        return [
          ...prevItems,
          {
            product,
            quantity: 1,
            selectedSize: size,
            printName,
            printNumber,
            uniqueId
          }
        ];
      }
    });

    // Show a premium toast notification
    setToast({
      visible: true,
      text: "کیت با موفقیت به سبد خرید اضافه شد",
      productTitle: `${product.title} (سایز ${size})`
    });
  };

  // Quick add from catalog (defaults to Large size, no printing)
  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, "L", "", "");
  };

  const handleUpdateQuantity = (uniqueId: string, delta: number) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        if (item.uniqueId === uniqueId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (uniqueId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Total count of items in the cart (sum of quantities)
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#0a0a0a] text-white" dir="rtl" id="app-root">
      
      {/* Header component */}
      <Header 
        activeView={currentView} 
        onNavigate={handleNavigate} 
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6" id="main-content">
        
        {currentView === "home" && (
          <HomeView 
            products={mockProducts} 
            onNavigate={handleNavigate} 
            onQuickAdd={handleQuickAdd} 
          />
        )}

        {currentView === "products" && (
          <ProductsView 
            products={mockProducts} 
            onNavigate={handleNavigate} 
            onQuickAdd={handleQuickAdd}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentView === "product-detail" && (
          <ProductDetailView 
            slug={selectedProductSlug} 
            products={mockProducts} 
            onNavigate={handleNavigate} 
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === "cart" && (
          <CartView 
            cartItems={cartItems} 
            onUpdateQuantity={handleUpdateQuantity} 
            onRemoveItem={handleRemoveItem} 
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        )}

        {currentView === "contact" && (
          <ContactView />
        )}

      </main>

      {/* Footer component */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Interactive Toast Notification */}
      {toast && toast.visible && (
        <div 
          className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-96 bg-[#111] border border-white/5 text-white p-4 rounded-3xl shadow-2xl z-50 flex items-start gap-3 animate-in slide-in-from-bottom duration-300"
          id="cart-toast"
        >
          <div className="w-10 h-10 bg-[#E30613] text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <ShoppingBag size={20} />
          </div>
          
          <div className="flex-1 text-right">
            <h4 className="font-bold text-sm text-white flex items-center gap-1">
              <Check size={16} className="text-green-400" />
              {toast.text}
            </h4>
            <p className="text-gray-400 text-xs mt-1 truncate">{toast.productTitle}</p>
          </div>

          <button 
            onClick={() => setToast(null)}
            className="text-gray-500 hover:text-white p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
