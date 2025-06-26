"use client";
import React, { useState } from "react";
import CategoryCard from "@/components/category-card";
import CategoryModal from "@/components/category-modal";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { products, categories as productCategories } from "@/lib/products";
import { Sparkles, Truck, Shield, TrendingUp, Search } from "lucide-react";
import CategoryQuickViewModal from "@/components/category-quickview-modal";

const categoryData = [
  { name: "Men", icon: "👔", desc: "Trendy fashion and essentials for men.", badge: "Trending" },
  { name: "Women", icon: "👗", desc: "Latest styles and accessories for women.", badge: "New" },
  { name: "Kids Boys", icon: "🧒", desc: "Fun and comfy picks for boys.", badge: "" },
  { name: "Kids Girls", icon: "👧", desc: "Cute and stylish for girls.", badge: "" },
  { name: "Shoes", icon: "👟", desc: "Step up with our shoe collection.", badge: "Hot" },
  { name: "Phones and Accessories", icon: "📱", desc: "Latest smartphones and must-have accessories.", badge: "New" },
];

const categoriesWithCounts = categoryData
  .map((cat) => ({
    ...cat,
    count: products.filter((p) => p.category === cat.name).length,
  }))
  .filter((c) => c.count > 0);

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = categoriesWithCounts.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuickView = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Banner */}
      <section className="relative py-20 flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600/80 to-purple-600/80 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fadeIn">Discover Categories</h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 animate-fadeIn delay-100">
          Find your style, tech, and more—explore our curated categories for everyone!
        </p>
        <div className="flex justify-center animate-fadeIn delay-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none w-72 md:w-96 text-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center text-gray-500 text-lg py-12">No categories found.</div>
          )}
          {filteredCategories.map((category, idx) => (
            <div key={category.name} className="relative">
              <Link href={`/products?category=${category.name}`}>
                <Card className="group cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 dark:bg-gray-900/80 relative overflow-hidden animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300 mb-3 text-center text-base min-h-[48px]">{category.desc}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {category.count} products
                      </span>
                      {category.badge && (
                        <span className="inline-block bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          {category.badge}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <button
                onClick={() => handleQuickView(category)}
                className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 text-gray-900 rounded shadow hover:bg-blue-600 hover:text-white font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-blue-200"
              >
                Quick View
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <Link href="/products">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
              Shop All Categories
            </button>
          </Link>
        </div>
        <CategoryQuickViewModal
          open={modalOpen}
          onClose={handleClose}
          category={selectedCategory}
          products={selectedCategory ? products.filter(p => p.category === selectedCategory.name).slice(0, 5).map(p => ({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
            rating: p.rating,
            description: p.description,
          })) : []}
        />
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
        .before\:animate-shine:before {
          content: '';
          animation: shine 1.2s linear infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
} 