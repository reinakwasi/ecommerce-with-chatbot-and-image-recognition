"use client";
import { useState, useMemo } from "react";
import { products, categories, brands } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, Heart, ShoppingCart, Clock, Zap, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Navigation as NavComponent } from "@/components/navigation";

function getDiscountPercent(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100);
}

const onSaleProducts = products.filter(p => p.isOnSale);
const dealOfTheDay = onSaleProducts.length > 0 ? onSaleProducts[0] : null;
const flashSaleProducts = onSaleProducts.slice(0, 4);
const recommendedDeals = onSaleProducts
  .filter(p => p.rating && p.rating >= 4.7)
  .slice(0, 4);

export default function DealsPage() {
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("discount");
  const [flashModalOpen, setFlashModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(3600);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredDeals = useMemo(() => {
    let deals = onSaleProducts;
    if (category !== "all") deals = deals.filter(p => p.category === category);
    if (brand !== "all") deals = deals.filter(p => p.brand === brand);
    if (sort === "discount") deals = [...deals].sort((a, b) => getDiscountPercent(b.originalPrice || b.price, b.price) - getDiscountPercent(a.originalPrice || a.price, a.price));
    if (sort === "low") deals = [...deals].sort((a, b) => a.price - b.price);
    if (sort === "high") deals = [...deals].sort((a, b) => b.price - a.price);
    return deals;
  }, [category, brand, sort]);

  useState(() => {
    const interval = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(interval);
  });
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Hero Banner */}
      <section className="relative py-12 flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-500/90 to-amber-500/90 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fadeIn">
          Amazing Deals & Flash Sales
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 animate-fadeIn delay-100">
          Save big with exclusive deals, flash sales, and personalized recommendations!
        </p>
        {dealOfTheDay && (
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-6 animate-fadeInUp">
            <Image src={dealOfTheDay.image} alt={dealOfTheDay.name} width={120} height={120} className="rounded-lg object-cover" />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold animate-pulse">
                  Deal of the Day
                </Badge>
                <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                  <Clock className="w-4 h-4" /> {hours}h {minutes}m {seconds}s left
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{dealOfTheDay.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  ${dealOfTheDay.price.toFixed(2)}
                </span>
                {dealOfTheDay.originalPrice && (
                  <span className="text-gray-500 line-through">
                    ${dealOfTheDay.originalPrice.toFixed(2)}
                  </span>
                )}
                {dealOfTheDay.originalPrice && (
                  <Badge className="bg-emerald-500 text-white font-bold">
                    -{getDiscountPercent(dealOfTheDay.originalPrice, dealOfTheDay.price)}%
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                {dealOfTheDay.description}
              </p>
              <div className="flex gap-2 mt-2">
                <Button className="btn-primary">
                  <ShoppingCart className="w-4 h-4 mr-1" /> Grab Now
                </Button>
                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                  <Heart className="w-4 h-4 mr-1" /> Wishlist
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Subscribe to Deal Alerts */}
      <section className="container mx-auto px-4 mb-8 flex flex-col items-center">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 items-center bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-soft p-4 w-full max-w-xl">
          <label className="font-semibold text-lg">Get Deal Alerts:</label>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded border px-3 py-2 text-base flex-1 input-enhanced"
          />
          <Button type="submit" className="btn-primary px-6 py-2">
            Subscribe
          </Button>
        </form>
        {subscribed && (
          <div className="mt-2 text-emerald-600 font-semibold animate-fadeIn">
            Subscribed! You'll get the hottest deals in your inbox.
          </div>
        )}
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-soft p-4">
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Category:</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              className="rounded border px-2 py-1 input-enhanced"
            >
              <option value="all">All</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Brand:</label>
            <select 
              value={brand} 
              onChange={e => setBrand(e.target.value)} 
              className="rounded border px-2 py-1 input-enhanced"
            >
              <option value="all">All</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort by:</label>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)} 
              className="rounded border px-2 py-1 input-enhanced"
            >
              <option value="discount">Biggest Discount</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredDeals.length === 0 && (
            <div className="col-span-full text-center text-gray-500 text-lg py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <p>No deals found matching your criteria.</p>
            </div>
          )}
          {filteredDeals.map((product, idx) => (
            <Card key={product.id} className="group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900 relative overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                  {product.isFeatured && (
                    <Badge className="absolute top-2 left-2 bg-orange-600 text-white font-bold animate-pulse">
                      Special Deal
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-emerald-500 text-white font-bold">
                      -{getDiscountPercent(product.originalPrice, product.price)}%
                    </Badge>
                  )}
                  {idx < 3 && (
                    <Badge className="absolute bottom-2 left-2 bg-orange-600 text-white font-bold animate-pulse">
                      Expiring Soon
                    </Badge>
                  )}
                  {product.inStock && product.inStock < 10 && (
                    <Badge className="absolute bottom-2 right-2 bg-red-600 text-white font-bold animate-bounce">
                      Limited Stock
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1 text-center group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-600 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-300 mb-2 text-center line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Button className="btn-primary">
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                  </Button>
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    <Heart className="w-4 h-4 mr-1" /> Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Personalized Deals */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" /> Deals Just for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recommendedDeals.map((product, idx) => (
            <Card key={product.id} className="group border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900 relative overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative w-28 h-28 mb-3">
                  <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                </div>
                <h3 className="text-base font-bold mb-1 text-center group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-orange-600 font-bold text-base">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" className="btn-primary">
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    <Heart className="w-4 h-4 mr-1" />
                  </Button>
                </div>
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