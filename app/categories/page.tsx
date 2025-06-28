"use client";
import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/category-card";
import CategoryModal from "@/components/category-modal";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { products, categories as productCategories } from "@/lib/products";
import { Sparkles, Truck, Shield, TrendingUp, Search, Navigation, Zap, Star, ShoppingCart, Heart, Eye, ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import CategoryQuickViewModal from "@/components/category-quickview-modal";
import { Navigation as NavComponent } from "@/components/navigation";

const categoryData = [
  { 
    name: "Men", 
    icon: "👔", 
    desc: "Trendy fashion and essentials for men.", 
    badge: "Trending",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    products: 45,
    featured: true
  },
  { 
    name: "Women", 
    icon: "👗", 
    desc: "Latest styles and accessories for women.", 
    badge: "New",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    products: 52,
    featured: true
  },
  { 
    name: "Kids Boys", 
    icon: "🧒", 
    desc: "Fun and comfy picks for boys.", 
    badge: "",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    products: 28,
    featured: false
  },
  { 
    name: "Kids Girls", 
    icon: "👧", 
    desc: "Cute and stylish for girls.", 
    badge: "",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    products: 31,
    featured: false
  },
  { 
    name: "Shoes", 
    icon: "👟", 
    desc: "Step up with our shoe collection.", 
    badge: "Hot",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    products: 67,
    featured: true
  },
  { 
    name: "Phones and Accessories", 
    icon: "📱", 
    desc: "Latest smartphones and must-have accessories.", 
    badge: "New",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    products: 89,
    featured: true
  },
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
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid, list, masonry
  const [sortBy, setSortBy] = useState("popular"); // popular, newest, products

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

  // Animated background particles
  useEffect(() => {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 165, 0, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      <NavComponent />
      
      {/* Animated Background */}
      <canvas 
        id="particles" 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Hero Banner with 3D Effects */}
      <section className="relative py-20 flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-500/90 to-amber-500/90 mb-12 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-bounce">
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <div className="w-6 h-6 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute bottom-10 left-1/4 animate-spin">
          <div className="w-4 h-4 bg-white/25 rounded-full"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 animate-fadeIn relative">
          <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
            Explore Categories
          </span>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 animate-fadeIn delay-100">
          Find your perfect style, tech, and more—discover our curated collections for everyone!
        </p>
        
        {/* Interactive Search with Voice */}
        <div className="flex justify-center animate-fadeIn delay-200 relative">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-20 py-3 rounded-lg border-2 border-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none w-72 md:w-96 text-lg shadow-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-4 mt-6 animate-fadeIn delay-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                viewMode === "grid" 
                  ? "bg-white text-orange-600 shadow-lg" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                viewMode === "list" 
                  ? "bg-white text-orange-600 shadow-lg" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("masonry")}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                viewMode === "masonry" 
                  ? "bg-white text-orange-600 shadow-lg" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              Masonry
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid with 3D Effects */}
      <section className="container mx-auto px-4 pb-16 relative" style={{ zIndex: 1 }}>
        {/* Sort Options */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="products">Most Products</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {filteredCategories.length} categories found
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredCategories.length === 0 && (
              <div className="col-span-full text-center text-gray-500 text-lg py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p>No categories found matching your search.</p>
              </div>
          )}
          {filteredCategories.map((category, idx) => (
              <div 
                key={category.name} 
                className="relative group perspective-1000"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
              <Link href={`/products?category=${category.name}`}>
                  <Card className="cursor-pointer border-0 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white dark:bg-gray-900 relative overflow-hidden transform-gpu group-hover:rotate-y-12">
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Floating Badge */}
                    {category.badge && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                          {category.badge}
                        </div>
                      </div>
                    )}
                    
                    {/* Featured Indicator */}
                    {category.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                      {/* Animated Icon */}
                      <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12">
                      {category.icon}
                    </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center text-sm leading-relaxed">
                        {category.desc}
                      </p>
                      
                      {/* Product Count with Animation */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 dark:text-orange-300 font-bold text-sm">
                            {category.count}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          products available
                      </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full">
                        <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Browse All
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickView(category);
                          }}
                          className="px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredCategories.map((category, idx) => (
              <div 
                key={category.name}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-6">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      {category.badge && (
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {category.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{category.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{category.count} products</span>
                      <span>•</span>
                      <span>Updated recently</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/products?category=${category.name}`}>
                      <button className="btn-primary px-6 py-2">
                        Browse
                      </button>
              </Link>
              <button
                onClick={() => handleQuickView(category)}
                      className="px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "masonry" && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredCategories.map((category, idx) => (
              <div 
                key={category.name}
                className="break-inside-avoid bg-white dark:bg-gray-900 rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} products</span>
                  <Link href={`/products?category=${category.name}`}>
                    <button className="btn-primary px-4 py-2 text-sm">
                      Explore
              </button>
                  </Link>
                </div>
            </div>
          ))}
        </div>
        )}
        
        <div className="flex justify-center mt-16">
          <Link href="/products">
            <button className="btn-primary text-lg px-8 py-3 flex items-center gap-2 group">
              Browse All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
        .delay-300 { animation-delay: 0.3s; }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
} 