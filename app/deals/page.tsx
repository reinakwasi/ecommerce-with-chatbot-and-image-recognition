"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation as NavComponent } from "@/components/navigation";
import { products } from "@/lib/products";
import Link from "next/link";
import { useCountdown } from "@/hooks/use-countdown";
import { FLASH_SALE_DATA } from "@/lib/flash-sale-data";
import { 
  Clock, 
  Flame as Fire, 
  TrendingDown, 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye, 
  Zap, 
  Gift, 
  Tag, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Timer, 
  ArrowRight, 
  Sparkles,
  Target,
  Award,
  Crown,
  Zap as Lightning,
  Bell,
  BellOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Filter,
  SortAsc,
  Grid,
  List,
  Search,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Percent,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

// Mock deals data with enhanced features - using shared flash sale data
const dealsData = [
  FLASH_SALE_DATA, // Use shared flash sale data
  {
    id: 2,
    name: "Premium Denim Collection",
    originalPrice: 89,
    currentPrice: 45,
    discount: 49,
    image: "/Men/denim jeans.jpg",
    category: "Men",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    type: "daily",
    stock: 45,
    sold: 23,
    rating: 4.6,
    reviews: 892,
    features: ["Premium Cotton", "Perfect Fit", "Multiple Colors"],
    urgency: "medium",
    badge: "DAILY DEAL",
    badgeColor: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Women's Fashion Bundle",
    originalPrice: 156,
    currentPrice: 78,
    discount: 50,
    image: "/Women/kurta-1.jpg",
    category: "Women",
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
    type: "bundle",
    stock: 32,
    sold: 18,
    rating: 4.7,
    reviews: 567,
    features: ["3-Piece Set", "Elegant Design", "Comfortable Fit"],
    urgency: "high",
    badge: "BUNDLE SAVE",
    badgeColor: "from-purple-500 to-violet-500"
  },
  {
    id: 4,
    name: "LED Sneakers Collection",
    originalPrice: 120,
    currentPrice: 72,
    discount: 40,
    image: "/Shoes/red-LED-sneakers.jpg",
    category: "Shoes",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
    type: "clearance",
    stock: 28,
    sold: 15,
    rating: 4.5,
    reviews: 423,
    features: ["LED Lights", "Comfortable", "Stylish Design"],
    urgency: "medium",
    badge: "CLEARANCE",
    badgeColor: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "Kids Fashion Pack",
    originalPrice: 95,
    currentPrice: 47,
    discount: 51,
    image: "/Kids/Boys/kids-t-shirt.jpg",
    category: "Kids Boys",
    endTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours
    type: "family",
    stock: 67,
    sold: 34,
    rating: 4.9,
    reviews: 234,
    features: ["5-Piece Pack", "Comfortable", "Durable"],
    urgency: "low",
    badge: "FAMILY PACK",
    badgeColor: "from-green-500 to-emerald-500"
  },
  {
    id: 6,
    name: "Wireless Earbuds Pro",
    originalPrice: 199,
    currentPrice: 99,
    discount: 50,
    image: "/phones and accessories/earpiece.jpg",
    category: "Phones and Accessories",
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
    type: "tech",
    stock: 23,
    sold: 12,
    rating: 4.4,
    reviews: 789,
    features: ["Noise Cancelling", "24h Battery", "Premium Sound"],
    urgency: "high",
    badge: "TECH DEAL",
    badgeColor: "from-indigo-500 to-blue-500"
  }
];

export default function DealsPage() {
  const [deals, setDeals] = useState(dealsData);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("ending");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAuction, setShowAuction] = useState(false);
  const [auctionBids, setAuctionBids] = useState({});
  const [userBids, setUserBids] = useState({});

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      deals.forEach(deal => {
        const difference = deal.endTime.getTime() - Date.now();
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          newTimeLeft[deal.id] = { hours, minutes, seconds };
        } else {
          newTimeLeft[deal.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

  // Auto-refresh deals every 30 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      // Simulate new deals being added
      if (Math.random() > 0.7) {
        const newDeal = {
          id: Date.now(),
          name: "New Flash Deal!",
          originalPrice: Math.floor(Math.random() * 200) + 50,
          currentPrice: Math.floor(Math.random() * 100) + 25,
          discount: Math.floor(Math.random() * 60) + 20,
          image: "/placeholder.jpg",
          category: "Flash",
          endTime: new Date(Date.now() + Math.random() * 4 * 60 * 60 * 1000),
          type: "flash",
          stock: Math.floor(Math.random() * 20) + 5,
          sold: 0,
          rating: 4.5 + Math.random() * 0.5,
          reviews: Math.floor(Math.random() * 500),
          features: ["Limited Time", "Exclusive"],
          urgency: "high",
          badge: "NEW",
          badgeColor: "from-yellow-500 to-orange-500"
        };
        setDeals(prev => [newDeal, ...prev.slice(0, -1)]);
      }
    }, 30000);

    return () => clearInterval(refreshTimer);
  }, []);

  const toggleNotification = (dealId) => {
    setNotifications(prev => ({
      ...prev,
      [dealId]: !prev[dealId]
    }));
  };

  const placeBid = (dealId, amount) => {
    setAuctionBids(prev => ({
      ...prev,
      [dealId]: (prev[dealId] || 0) + amount
    }));
    setUserBids(prev => ({
      ...prev,
      [dealId]: (prev[dealId] || 0) + amount
    }));
  };

  const getFilteredAndSortedDeals = () => {
    let filtered = deals;

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(deal => deal.type === filterType);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(deal => 
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "ending":
        filtered.sort((a, b) => a.endTime - b.endTime);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "price":
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "popular":
        filtered.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }

    return filtered;
  };

  const formatTime = (time) => {
    if (!time) return "00:00:00";
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "text-red-500";
      case "medium": return "text-orange-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const filteredDeals = getFilteredAndSortedDeals();

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      <NavComponent />
      
      {/* Animated Background with Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-spin opacity-50"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-orange-300 rounded-full animate-ping opacity-30"></div>
      </div>

      {/* Hero Section with Live Countdown */}
      <section className="relative py-20 text-center bg-gradient-to-r from-orange-500/90 to-amber-500/90 mb-12" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Fire className="w-8 h-8 text-white animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Hot Deals
              </span>
            </h1>
            <Zap className="w-8 h-8 text-white animate-bounce" />
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Don't miss out on these incredible offers! Limited time deals with real-time countdowns.
          </p>

          {/* Live Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{deals.length}</div>
              <div className="text-sm opacity-80">Active Deals</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">
                {deals.reduce((sum, deal) => sum + deal.discount, 0) / deals.length}%
              </div>
              <div className="text-sm opacity-80">Avg. Savings</div>
              </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">
                {deals.filter(d => d.endTime > new Date()).length}
              </div>
              <div className="text-sm opacity-80">Ending Soon</div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-lg border-2 border-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none w-72 text-lg shadow-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                <option value="all">All Deals</option>
                <option value="flash">Flash Sales</option>
                <option value="daily">Daily Deals</option>
                <option value="bundle">Bundles</option>
                <option value="clearance">Clearance</option>
                <option value="tech">Tech Deals</option>
            </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                <option value="ending">Ending Soon</option>
                <option value="discount">Biggest Discount</option>
                <option value="price">Lowest Price</option>
                <option value="popular">Most Popular</option>
            </select>
          </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="container mx-auto px-4 pb-16 relative" style={{ zIndex: 1 }}>
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "grid" 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "list" 
                    ? "bg-orange-500 text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {filteredDeals.length} deals found
            </span>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="relative group overflow-hidden border-0 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-900">
                {/* Urgency Indicator */}
                <div className={`absolute top-4 left-4 z-20 w-3 h-3 rounded-full ${getUrgencyColor(deal.urgency).replace('text-', 'bg-')} animate-pulse`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`bg-gradient-to-r ${deal.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse`}>
                    {deal.badge}
                  </div>
                </div>

                {/* Notification Bell */}
                <button
                  onClick={() => toggleNotification(deal.id)}
                  className="absolute top-4 right-16 z-20 p-1 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  {notifications[deal.id] ? (
                    <Bell className="w-4 h-4 text-orange-500" />
                  ) : (
                    <BellOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  {/* Countdown Timer */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-500">Ends in:</span>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                      <div className="text-lg font-mono font-bold text-red-600 dark:text-red-400">
                        {formatTime(timeLeft[deal.id])}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors">
                    {deal.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({deal.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      ${deal.currentPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${deal.originalPrice}
                    </span>
                    <Badge className="bg-green-500 text-white">
                      -{deal.discount}%
                    </Badge>
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Stock: {deal.stock - deal.sold} left</span>
                      <span>{Math.round((deal.sold / (deal.stock + deal.sold)) * 100)}% sold</span>
                    </div>
                    <Progress 
                      value={(deal.sold / (deal.stock + deal.sold)) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {deal.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="relative group overflow-hidden border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-900">
                <div className="flex">
                  <div className="relative w-48 h-32 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <div className={`bg-gradient-to-r ${deal.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
                        {deal.badge}
                      </div>
                </div>
                </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                          {deal.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{deal.category}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{deal.rating}</span>
                            <span>({deal.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          ${deal.currentPrice}
                        </div>
                        <div className="text-lg text-gray-400 line-through">
                          ${deal.originalPrice}
                        </div>
                        <Badge className="bg-green-500 text-white mt-1">
                          -{deal.discount}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-red-500 font-medium">Ends in</div>
                          <div className="font-mono font-bold text-red-600">
                            {formatTime(timeLeft[deal.id])}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Stock</div>
                          <div className="font-bold">{deal.stock - deal.sold} left</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Quick View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
            </Card>
          ))}
        </div>
        )}
      </section>

      {/* Live Auction Section */}
      {showAuction && (
        <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Live Auction</h3>
            <p className="text-gray-600 mb-4">Place your bid on this exclusive item!</p>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  Current Bid: ${auctionBids[selectedDeal?.id] || 0}
                </div>
                <div className="text-sm text-gray-500">Your Total Bids: ${userBids[selectedDeal?.id] || 0}</div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => placeBid(selectedDeal?.id, 5)} className="flex-1">
                  +$5
                </Button>
                <Button onClick={() => placeBid(selectedDeal?.id, 10)} className="flex-1">
                  +$10
                </Button>
                <Button onClick={() => placeBid(selectedDeal?.id, 25)} className="flex-1">
                  +$25
                </Button>
              </div>
              
              <Button onClick={() => setShowAuction(false)} className="w-full">
                Close
              </Button>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
} 