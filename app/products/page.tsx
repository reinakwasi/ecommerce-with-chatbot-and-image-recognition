"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { 
  Star, Grid, List, Heart, ShoppingCart, Search, ArrowLeft, Filter, Sparkles,
  TrendingUp, Eye, Crown, Award, Users, Camera
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ProductGrid } from "@/components/product-grid"
import { Navigation } from "@/components/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { categories, brands } from "@/lib/products"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  brand: string
  inStock: boolean
  description?: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const brand = searchParams.get("brand") || ""
  const { toast } = useToast()
  
  const [viewMode, setViewMode] = useState<"grid" | "list" | "3d">("grid")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [userPoints, setUserPoints] = useState(1250)
  const [showQuickView, setShowQuickView] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<Product[]>([])
  const [livePrices, setLivePrices] = useState<Record<string, number>>({})
  const [gamificationLevel, setGamificationLevel] = useState(5)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAIRecommendations, setShowAIRecommendations] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [selectedPrice, setSelectedPrice] = useState<string>("all")
  const [selectedRating, setSelectedRating] = useState<number>(0)

  // 3D Background Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 150

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        color: `hsl(${Math.random() * 60 + 15}, 70%, 60%)`
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrices(prev => {
        const newPrices = { ...prev }
        Object.keys(newPrices).forEach(key => {
          newPrices[key] = Math.max(0, newPrices[key] + (Math.random() - 0.5) * 10)
        })
        return newPrices
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Simulate AI recommendations
  useEffect(() => {
    const mockRecommendations = [
      {
        id: "trend1",
        name: "Trending: iPhone 15 Pro Max",
        price: 1199,
        image: "/phones and accessories/iphone 15 pro max.webp",
        rating: 4.9,
        reviewCount: 1247,
        category: "Electronics",
        brand: "Apple",
        inStock: true
      },
      {
        id: "trend2",
        name: "Popular: Samsung Galaxy S24 Ultra",
        price: 1299,
        image: "/phones and accessories/samsung galaxy S24 Ultra.webp",
        rating: 4.8,
        reviewCount: 892,
        category: "Electronics",
        brand: "Samsung",
        inStock: true
      },
      {
        id: "trend3",
        name: "Best Seller: Men's Casual Jacket",
        price: 89,
        image: "/Men/casual men black jacket.jpg",
        rating: 4.7,
        reviewCount: 567,
        category: "Clothing",
        brand: "UrbanStyle",
        inStock: true
      },
      {
        id: "trend4",
        name: "Hot Deal: Women's Kurta",
        price: 45,
        image: "/Women/kurta-1.jpg",
        rating: 4.6,
        reviewCount: 423,
        category: "Clothing",
        brand: "EthnicWear",
        inStock: true
      },
      {
        id: "trend5",
        name: "Trending: LED Sneakers",
        price: 129,
        image: "/Shoes/red-LED-sneakers.jpg",
        rating: 4.5,
        reviewCount: 234,
        category: "Footwear",
        brand: "LightStep",
        inStock: true
      },
      {
        id: "trend6",
        name: "Popular: Brown Purse",
        price: 79,
        image: "/Women/Accessories/brown-purse-with-black-detail.jpg",
        rating: 4.4,
        reviewCount: 189,
        category: "Accessories",
        brand: "FashionBag",
        inStock: true
      }
    ]
    setAiRecommendations(mockRecommendations)
  }, [])

  const handleVirtualTryOn = (product: Product) => {
    setSelectedProduct(product)
    setShowQuickView(true)
  }

  const handlePriceAlert = (productId: string) => {
    setUserPoints(prev => prev + 10)
  }

  const handleSocialShare = (productId: string) => {
    setUserPoints(prev => prev + 5)
  }

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement])
      setUserPoints(prev => prev + 50)
    }
  }

  // Filtered ProductGrid props
  const productGridProps = {
    searchQuery,
    category: selectedCategory,
    brand: selectedBrand,
    viewMode,
    onQuickView: handleVirtualTryOn,
    livePrices,
  }

  // Filter UI
  const FilterSidebar = (
    <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 z-10">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-soft p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-orange-600">Filters</h3>
        {/* Category */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Category</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedCategory("all")}>All</Button>
            {categories.map(cat => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedCategory(cat)}>{cat}</Button>
            ))}
          </div>
        </div>
        {/* Brand */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Brand</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedBrand === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedBrand("all")}>All</Button>
            {brands.map(brand => (
              <Button key={brand} variant={selectedBrand === brand ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedBrand(brand)}>{brand}</Button>
            ))}
          </div>
        </div>
        {/* Price */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Price</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedPrice === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("all")}>All</Button>
            <Button variant={selectedPrice === "under-100" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("under-100")}>Under $100</Button>
            <Button variant={selectedPrice === "100-500" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("100-500")}>$100 - $500</Button>
            <Button variant={selectedPrice === "500-1000" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("500-1000")}>$500 - $1000</Button>
            <Button variant={selectedPrice === "over-1000" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("over-1000")}>Over $1000</Button>
          </div>
        </div>
        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Rating</h4>
          <div className="flex gap-2 flex-wrap">
            {[5,4,3,2,1].map(star => (
              <Button key={star} variant={selectedRating === star ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedRating(star)}>
                {[...Array(star)].map((_,i) => <Star key={i} className="w-4 h-4 text-yellow-400 inline" />)}
                {star}+
              </Button>
            ))}
            <Button variant={selectedRating === 0 ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedRating(0)}>All</Button>
          </div>
        </div>
        {/* Reset */}
        <Button variant="outline" className="w-full mt-2" onClick={() => {
          setSelectedCategory("all"); setSelectedBrand("all"); setSelectedPrice("all"); setSelectedRating(0);
        }}>Reset Filters</Button>
      </div>
    </aside>
  )

  // Mobile Filter Drawer
  const FilterDrawer = (
    <Sheet open={showFilterDrawer} onOpenChange={setShowFilterDrawer}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white shadow-lg lg:hidden" onClick={() => setShowFilterDrawer(true)}>
          <Filter className="w-5 h-5 mr-2" /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-xl font-bold mb-4 text-orange-600">Filters</h3>
        {/* Category */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Category</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedCategory === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedCategory("all")}>All</Button>
            {categories.map(cat => (
              <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedCategory(cat)}>{cat}</Button>
            ))}
          </div>
        </div>
        {/* Brand */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Brand</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedBrand === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedBrand("all")}>All</Button>
            {brands.map(brand => (
              <Button key={brand} variant={selectedBrand === brand ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedBrand(brand)}>{brand}</Button>
            ))}
          </div>
        </div>
        {/* Price */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Price</h4>
          <div className="flex flex-col gap-2">
            <Button variant={selectedPrice === "all" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("all")}>All</Button>
            <Button variant={selectedPrice === "under-100" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("under-100")}>Under $100</Button>
            <Button variant={selectedPrice === "100-500" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("100-500")}>$100 - $500</Button>
            <Button variant={selectedPrice === "500-1000" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("500-1000")}>$500 - $1000</Button>
            <Button variant={selectedPrice === "over-1000" ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedPrice("over-1000")}>Over $1000</Button>
          </div>
        </div>
        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-orange-500">Rating</h4>
          <div className="flex gap-2 flex-wrap">
            {[5,4,3,2,1].map(star => (
              <Button key={star} variant={selectedRating === star ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedRating(star)}>
                {[...Array(star)].map((_,i) => <Star key={i} className="w-4 h-4 text-yellow-400 inline" />)}
                {star}+
              </Button>
            ))}
            <Button variant={selectedRating === 0 ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setSelectedRating(0)}>All</Button>
          </div>
        </div>
        {/* Reset */}
        <Button variant="outline" className="w-full mt-2" onClick={() => {
          setSelectedCategory("all"); setSelectedBrand("all"); setSelectedPrice("all"); setSelectedRating(0);
        }}>Reset Filters</Button>
      </SheetContent>
    </Sheet>
  )

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Gamification Header */}
      <div className="relative bg-gradient-to-r from-orange-500/90 to-amber-500/90 py-6" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">{userPoints} points</span>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Level {gamificationLevel} Shopper
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Smart Product Discovery
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Experience the future of shopping with AI-powered recommendations, virtual try-ons, live price tracking, and social shopping features
            </p>
            {searchQuery && (
              <div className="mt-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Search className="w-4 h-4 mr-2" />
                  Search Results for: "{searchQuery}"
                </Badge>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  viewMode === "grid" 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                }`}
              >
                <Grid className="w-4 h-4 inline mr-2" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  viewMode === "list" 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                }`}
              >
                <List className="w-4 h-4 inline mr-2" />
                List
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  viewMode === "3d" 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                3D View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Banner */}
      {aiRecommendations.length > 0 && (
        <div className="relative bg-gradient-to-r from-purple-500/90 to-pink-500/90 py-6" style={{ zIndex: 1 }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold text-white">Trending & Popular Products</h3>
                  <p className="text-white/80">Discover what's hot and what others are buying</p>
                </div>
              </div>
              <Button 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={() => setShowAIRecommendations(!showAIRecommendations)}
              >
                {showAIRecommendations ? 'Hide' : 'View All'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations Section */}
      {showAIRecommendations && aiRecommendations.length > 0 && (
        <div className="relative bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-8" style={{ zIndex: 1 }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Trending & Popular Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {aiRecommendations.map((product) => (
                <Card key={product.id} className="group relative overflow-hidden border-0 shadow-soft card-hover-lift bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Trending Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-12 h-12 p-0 bg-white/90 hover:bg-white"
                        onClick={() => handleVirtualTryOn(product)}
                        title="Quick View"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-purple-600">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                        onClick={() => {
                          toast({
                            title: "Added to cart!",
                            description: `${product.name} has been added to your cart.`,
                          })
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVirtualTryOn(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Popularity Indicator */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-purple-500" />
                          <span>{product.reviewCount} bought</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Crown className="w-3 h-3 text-yellow-500" />
                          <span>+5 points</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative flex gap-8" style={{ zIndex: 1 }}>
        {FilterSidebar}
        <div className="flex-1">
          <ProductGrid 
            {...productGridProps}
            priceRange={selectedPrice}
            minRating={selectedRating}
          />
        </div>
        {FilterDrawer}
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Quick View</h3>
              <button onClick={() => setShowQuickView(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{selectedProduct.brand}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-orange-600">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(selectedProduct.price)}
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedProduct.description || "This is a high-quality product with excellent features and great value for money."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Popup */}
      {achievements.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>New Achievement Unlocked!</span>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  )
}
