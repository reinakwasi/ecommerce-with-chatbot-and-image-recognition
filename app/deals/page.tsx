"use client";
import { useState, useMemo } from "react";
import { products, categories, brands } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Heart, ShoppingCart, Clock, Zap } from "lucide-react";

function getDiscountPercent(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100);
}

const onSaleProducts = products.filter(p => p.isOnSale);
const dealOfTheDay = onSaleProducts.length > 0 ? onSaleProducts[0] : null;
const flashSaleProducts = onSaleProducts.slice(0, 4); // Mock: first 4 on-sale products
const aiRecommendedDeals = onSaleProducts
  .filter(p => p.rating && p.rating >= 4.7)
  .slice(0, 4); // Mock AI: top-rated deals

export default function DealsPage() {
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("discount");
  const [flashModalOpen, setFlashModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(3600); // 1 hour flash sale
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filtered and sorted deals
  const filteredDeals = useMemo(() => {
    let deals = onSaleProducts;
    if (category !== "all") deals = deals.filter(p => p.category === category);
    if (brand !== "all") deals = deals.filter(p => p.brand === brand);
    if (sort === "discount") deals = [...deals].sort((a, b) => getDiscountPercent(b.originalPrice || b.price, b.price) - getDiscountPercent(a.originalPrice || a.price, a.price));
    if (sort === "low") deals = [...deals].sort((a, b) => a.price - b.price);
    if (sort === "high") deals = [...deals].sort((a, b) => b.price - a.price);
    return deals;
  }, [category, brand, sort]);

  // Countdown for Deal of the Day and Flash Sale
  useState(() => {
    const interval = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(interval);
  });
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  // Subscribe to deal alerts (mock)
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Flash Sale Banner */}
      <section className="relative py-8 flex flex-col items-center justify-center text-center bg-gradient-to-r from-pink-600/90 to-yellow-400/90 mb-8 overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="flex items-center gap-4 mb-2">
          <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Flash Sale!</h2>
        </div>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-4 animate-fadeIn delay-100">
          Limited time only! Grab these deals before they're gone.
        </p>
        <div className="flex items-center gap-2 justify-center mb-4">
          <Clock className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-lg">{hours}h {minutes}m {seconds}s left</span>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-pink-900 font-bold px-8 py-2 rounded-lg shadow-lg animate-bounce" onClick={() => setFlashModalOpen(true)}>
          Shop Flash Sale
        </Button>
        {/* Flash Sale Modal */}
        {flashModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeInUp flex flex-col">
              <button
                onClick={() => setFlashModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="w-6 h-6 text-yellow-400" /> Flash Sale Deals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                {flashSaleProducts.map(product => (
                  <Card key={product.id} className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/80">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-lg mb-2 object-cover" />
                      <h4 className="font-semibold mb-1 text-center">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-pink-600 font-bold text-lg">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                        {product.originalPrice && (
                          <Badge className="bg-yellow-400 text-white font-bold">-{getDiscountPercent(product.originalPrice, product.price)}%</Badge>
                        )}
                      </div>
                      <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full mt-2"><ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-pink-900 font-bold px-8 py-2 rounded-lg shadow-lg mt-auto" onClick={() => setFlashModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Hero Banner */}
      <section className="relative py-12 flex flex-col items-center justify-center text-center bg-gradient-to-r from-pink-500/90 to-yellow-400/90 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fadeIn">Hot Deals & Flash Sales</h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 animate-fadeIn delay-100">
          Save big with AI-powered bargains, exclusive flash sales, and personalized recommendations!
        </p>
        {dealOfTheDay && (
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-6 animate-fadeInUp">
            <Image src={dealOfTheDay.image} alt={dealOfTheDay.name} width={120} height={120} className="rounded-lg object-cover" />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold animate-pulse">Deal of the Day</Badge>
                <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200"><Clock className="w-4 h-4" /> {hours}h {minutes}m {seconds}s left</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{dealOfTheDay.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-pink-600 dark:text-pink-400">${dealOfTheDay.price.toFixed(2)}</span>
                {dealOfTheDay.originalPrice && (
                  <span className="text-gray-500 line-through">${dealOfTheDay.originalPrice.toFixed(2)}</span>
                )}
                {dealOfTheDay.originalPrice && (
                  <Badge className="bg-yellow-400 text-white font-bold">-{getDiscountPercent(dealOfTheDay.originalPrice, dealOfTheDay.price)}%</Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{dealOfTheDay.description}</p>
              <div className="flex gap-2 mt-2">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold"><ShoppingCart className="w-4 h-4 mr-1" /> Grab Now</Button>
                <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50"><Heart className="w-4 h-4 mr-1" /> Wishlist</Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Subscribe to Deal Alerts */}
      <section className="container mx-auto px-4 mb-8 flex flex-col items-center">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 items-center bg-white/80 dark:bg-gray-900/80 rounded-lg shadow p-4 w-full max-w-xl">
          <label className="font-semibold text-lg">Get Deal Alerts:</label>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded border px-3 py-2 text-base flex-1"
          />
          <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg">Subscribe</Button>
        </form>
        {subscribed && <div className="mt-2 text-green-600 font-semibold animate-fadeIn">Subscribed! You'll get the hottest deals in your inbox.</div>}
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white/80 dark:bg-gray-900/80 rounded-lg shadow p-4">
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Category:</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="rounded border px-2 py-1">
              <option value="all">All</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Brand:</label>
            <select value={brand} onChange={e => setBrand(e.target.value)} className="rounded border px-2 py-1">
              <option value="all">All</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort by:</label>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded border px-2 py-1">
              <option value="discount">Biggest Discount</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredDeals.length === 0 && (
            <div className="col-span-full text-center text-gray-500 text-lg py-12">No deals found.</div>
          )}
          {filteredDeals.map((product, idx) => (
            <Card key={product.id} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 dark:bg-gray-900/80 relative overflow-hidden animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                  {product.isFeatured && (
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white font-bold animate-pulse">AI Bargain</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-yellow-400 text-white font-bold">-{getDiscountPercent(product.originalPrice, product.price)}%</Badge>
                  )}
                  {idx < 3 && (
                    <Badge className="absolute bottom-2 left-2 bg-pink-600 text-white font-bold animate-pulse">Expiring Soon</Badge>
                  )}
                  {product.inStock && product.inStock < 10 && (
                    <Badge className="absolute bottom-2 right-2 bg-red-600 text-white font-bold animate-bounce">Limited Stock</Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1 text-center group-hover:text-pink-600 transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-pink-600 font-bold text-lg">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-300 mb-2 text-center line-clamp-2">{product.description}</p>
                <div className="flex gap-2 mt-auto">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold"><ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart</Button>
                  <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50"><Heart className="w-4 h-4 mr-1" /> Wishlist</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI-Powered Personalized Deals */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2"><Sparkles className="w-6 h-6 text-pink-500" /> Deals Just for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {aiRecommendedDeals.map((product, idx) => (
            <Card key={product.id} className="group border-0 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/90 dark:bg-gray-900/80 relative overflow-hidden animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-28 h-28 mb-3">
                  <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                </div>
                <h3 className="text-base font-bold mb-1 text-center group-hover:text-pink-600 transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-pink-600 font-bold text-base">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full mt-auto"><ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        .animate-fadeInUp { animation: fadeIn 0.7s both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
} 