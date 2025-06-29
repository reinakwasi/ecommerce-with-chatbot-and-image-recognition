"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Sparkles, ShoppingBag, Users, TrendingUp, ArrowRight, 
  Star, Heart, ShoppingCart, Zap, Shield, Truck, Gift, Clock,
  Crown, Target, Award, Zap as Lightning,
  MessageCircle, Eye, Share2, Bell, Grid, List, Flame as Fire, Rocket,
  Globe, Lock, Wifi, Battery, Signal, CheckCircle, Package,
  CreditCard, MapPin, Calendar, Timer, Gift as GiftIcon
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SmartSearchBar } from "@/components/smart-search-bar"
import { ProductGrid } from "@/components/product-grid"
import { Navigation } from "@/components/navigation"
import { ProductRecommendations } from "@/components/product-recommendations"
import { getUniqueProductsBySection } from "@/lib/products"
import { products, categories as productCategories } from "@/lib/products"
import { useCountdown } from "@/hooks/use-countdown"
import { FLASH_SALE_END_TIME } from "@/lib/flash-sale-data"

export default function HomePage() {
  const [userPoints, setUserPoints] = useState(1250)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  
  // Use shared countdown hook
  const { timeLeft, formatTime, isExpired } = useCountdown(FLASH_SALE_END_TIME)

  const [featuredProducts, setFeaturedProducts] = useState(() => getUniqueProductsBySection('featured', new Set(), 8))

  const handleRefreshFeatured = () => {
    setFeaturedProducts(getUniqueProductsBySection('featured', new Set(), 8))
  }

  // 3D Background Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
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
        ctx.fillStyle = `rgba(255, 165, 0, ${particle.opacity})`
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [])

  const newArrivals = getUniqueProductsBySection('new', new Set(), 8)

  const categoryIcons: Record<string, string> = {
    Smartphones: "📱",
    Laptops: "💻",
    Audio: "🎧",
    Tablets: "📲",
    Wearables: "⌚",
    Gaming: "🎮",
    TVs: "📺",
    "Smart Home": "🏠",
    Cameras: "📷",
    Drones: "🚁",
  }

  const categoriesWithCounts = productCategories
    .map((category) => ({
      name: category,
      icon: categoryIcons[category] || "📦",
      count: products.filter((p) => p.category === category).length,
    }))
    .filter((c) => c.count > 0)

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 0 }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Effects */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500/90 via-amber-500/90 to-yellow-500/90" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
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

            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow mb-6 animate-fadeIn relative">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                SmartShop
              </span>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-8 animate-fadeIn delay-100">
              Experience the future of shopping with AI-powered recommendations, 
              smart search, and interactive product discovery!
            </p>

            {/* Gamification Header */}
            <div className="flex items-center justify-center gap-4 mb-8 animate-fadeIn delay-200">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">{userPoints} points</span>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Level 5 Shopper
              </Badge>
            </div>
            
            {/* Smart Search Bar */}
            <div className="mb-12 animate-fadeIn delay-300">
              <SmartSearchBar />
            </div>

            {/* Interactive Features */}
            <div className="flex justify-center gap-4 mb-8 animate-fadeIn delay-400">
              <Link href="/products">
                <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/about">
                <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30">
                  <Users className="w-4 h-4 mr-2" />
                  About Us
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fadeIn delay-500">
              <Card className="border-0 shadow-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">AI Recommendations</h3>
                  <p className="text-white/80">
                    Get personalized product suggestions powered by advanced AI
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">Visual Search</h3>
                  <p className="text-white/80">
                    Upload photos to find similar products instantly
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">Smart Negotiation</h3>
                  <p className="text-white/80">
                    Chat with our AI assistant to get the best deals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Live Deal Countdown */}
      {!isExpired && (
        <section className="py-8 bg-gradient-to-r from-red-500 to-pink-500 text-white relative" style={{ zIndex: 1 }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Fire className="w-8 h-8 animate-pulse" />
                  Flash Sale
                </div>
                <div className="text-sm opacity-80">Ends in {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.hours)}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.minutes)}</div>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.seconds)}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
              <Button 
                className="bg-white text-red-500 hover:bg-red-50 font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  console.log('Shop Now clicked!');
                  router.push('/deals');
                }}
              >
                <Fire className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>
            <div className="text-center mt-4 text-sm opacity-70">
              ⚡ Click to view all deals and save big! ⚡
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-900 relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-4">
                Featured Products
                <Button size="sm" variant="outline" className="ml-2" onClick={handleRefreshFeatured} title="Refresh Featured Products">
                  <span className="sr-only">Refresh</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.003 7.003 0 0012 19a7 7 0 006.418-4M18.418 15A7.003 7.003 0 0012 5a7 7 0 00-6.418 4" /></svg>
                </Button>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Handpicked items our customers love
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} limit={8} showFilters={false} />
        </div>
      </section>

      {/* Shop by Categories Prompt */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950 relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-700 dark:text-orange-200">Do you want to shop by categories?</h2>
          <Link href="/categories">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-full shadow-lg">
              Click here to browse categories
            </Button>
          </Link>
        </div>
      </section>

      {/* Smart Recommendations */}
      <section className="py-16 bg-white dark:bg-gray-900 relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <ProductRecommendations showPersonalized={true} showTrending={true} showRecentlyViewed={true} />
        </div>
      </section>

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