"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Sparkles, ShoppingBag, Users, TrendingUp, ArrowRight, 
  Star, Heart, ShoppingCart, Zap, Shield, Truck, Gift, Clock,
  Camera, Crown, Target, Award, Lightning,
  MessageCircle, Eye, Share2, Bell, Grid, List, Fire, Rocket
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [userPoints, setUserPoints] = useState(1250)
  const [showAR, setShowAR] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
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
              AR try-ons, and interactive product discovery!
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

            {/* Interactive Features */}
            <div className="flex justify-center gap-4 mb-8 animate-fadeIn delay-400">
              <Button 
                onClick={() => setShowAR(!showAR)}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
              >
                <Camera className="w-4 h-4 mr-2" />
                AR Try-On
              </Button>
              <Link href="/products">
                <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
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
      <section className="py-8 bg-gradient-to-r from-red-500 to-pink-500 text-white relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">Flash Sale</div>
              <div className="text-sm opacity-80">Ends in 2:45:30</div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">02</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
            <Button className="bg-white text-red-500 hover:bg-red-50">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* AR Try-On Overlay */}
      {showAR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">AR Try-On</h3>
              <button onClick={() => setShowAR(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Point camera at yourself</p>
                <p className="text-sm text-gray-500">Try on products virtually</p>
              </div>
            </div>
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