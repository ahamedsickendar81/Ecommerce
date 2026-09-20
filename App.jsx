import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  X,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { products } from "./data/products";
import PaymentModal from "./components/PaymentModal";
export default function App() {
  const [loading, setLoading] = useState(true); // Splash Screen State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toast, setToast] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Splash Screen Timer (2.2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Mobiles", "Laptops", "Buds", "Speakers"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} bag-il add aagiduchu!`);
    setTimeout(() => setToast(null), 2500);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const relatedProducts = selectedProduct
    ? products.filter(
        (p) =>
          p.category === selectedProduct.category &&
          p.id !== selectedProduct.id,
      )
    : [];

  // --- 1. INTRO / SPLASH SCREEN ---
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0F172A] flex flex-col items-center justify-center z-50 transition-all duration-700">
        <div className="flex flex-col items-center animate-pulse">
          {/* Logo Icon Badge */}
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 mb-6">
            <span className="text-white text-4xl font-black">A</span>
          </div>

          {/* Logo Name */}
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            AURA<span className="text-indigo-500">.</span>
          </h1>

          <p className="text-slate-400 text-sm mt-3 tracking-widest uppercase font-semibold">
            Next-Gen Tech Experience
          </p>

          {/* Minimalist Progress Loader */}
          <div className="w-36 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
            <div className="w-full h-full bg-indigo-500 rounded-full animate-[ping_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. MAIN STORE PAGE ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white animate-fadeIn">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <p className="text-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span
              className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer"
              onClick={() => setSelectedCategory("All")}
            >
              AURA<span className="text-indigo-600">.</span>
            </span>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`transition ${selectedCategory === cat ? "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1" : "hover:text-slate-900"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full transition shadow-sm font-semibold text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* --- FLIPKART STYLE TOP EXCLUSIVE DEAL OF THE DAY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-indigo-500/30 shadow-2xl">
          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Details */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg shadow-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                ⚡ DEAL OF THE DAY • ENDS IN 04:22:15
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Titan Phone 15 Pro Max
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
                Flat ₹10,000 Instant Discount with HDFC & ICICI Cards. Titanium
                design with A17 Pro chip and 48MP camera.
              </p>

              {/* Price & Savings Pill */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ₹1,19,999
                </span>
                <span className="text-lg text-slate-400 line-through">
                  ₹1,39,999
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-xl">
                  15% OFF + FREE APODS
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => {
                    addToCart(products[0]); // First product (Titan Phone) add aagum
                    setIsCartOpen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/40 active:scale-95 transition"
                >
                  Claim Deal & Buy Now
                </button>

                <button
                  onClick={() => setSelectedProduct(products[0])}
                  className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition"
                >
                  View Full Specs
                </button>
              </div>
            </div>

            {/* Right Product Image with Discount Floating Badge */}
            <div
              className="relative group cursor-pointer"
              onClick={() => setSelectedProduct(products[0])}
            >
              <div className="w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden bg-slate-800/80 p-4 border border-white/10 shadow-2xl backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
                  alt="Flagship Phone"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Floating Special Tag */}
              <div className="absolute -bottom-3 -left-3 bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5">
                <span>🔥 Limited Stock Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Curated Tech Hardware
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              {selectedCategory === "All" ? "All Products" : selectedCategory} (
              {filteredProducts.length})
            </h1>
          </div>
          {/* Mobile Category Scroll */}
          <div className="flex md:hidden gap-2 overflow-x-auto w-full pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-5 relative">
                  <span className="absolute top-3 left-3 bg-slate-900/85 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 backdrop-blur-md">
                    {item.tag}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({item.reviews})
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-slate-950">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/20"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Details & Related Products Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="sticky top-0 float-right p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Product Info */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block uppercase tracking-wider text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 mb-3">
                    {selectedProduct.category} • {selectedProduct.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedProduct.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({selectedProduct.reviews} customer reviews)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 my-4">
                    <span className="text-3xl font-black text-slate-950">
                      ₹{selectedProduct.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save ₹
                      {(
                        selectedProduct.originalPrice - selectedProduct.price
                      ).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {selectedProduct.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Key Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                        >
                          <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bag & View Cart
                </button>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="border-t border-slate-100 pt-8 mt-6">
                <h3 className="text-lg font-black text-slate-900 mb-4">
                  Similar {selectedProduct.category} You Might Like
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProducts.map((relItem) => (
                    <div
                      key={relItem.id}
                      onClick={() => setSelectedProduct(relItem)}
                      className="cursor-pointer group p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition flex items-center gap-4"
                    >
                      <img
                        src={relItem.image}
                        alt={relItem.name}
                        className="w-16 h-16 object-cover rounded-xl bg-white flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-indigo-600 transition">
                          {relItem.name}
                        </h4>
                        <p className="text-xs font-black text-indigo-600 mt-0.5">
                          ₹{relItem.price.toLocaleString()}
                        </p>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          View details <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mini Cart Slide-Over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                  Your Bag ({cartCount})
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold text-sm">Bag empty-aa irukku</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-white"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs font-black text-indigo-600 mt-1">
                          ₹{item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-slate-600 hover:text-indigo-600"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-slate-600 hover:text-indigo-600"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-center text-lg font-black text-slate-900">
                    <span>Total Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsPaymentOpen(true);
                    }}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition"
                  >
                    Instant Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartTotal={cartTotal}
        onPaymentSuccess={() => {
          setCart([]); // Cart-ai empty pannidum
          setToast("Order placed successfully! Check your phone.");
        }}
      />
    </div>
  );
}
