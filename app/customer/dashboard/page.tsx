"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ShoppingBag,
  Heart,
  Package,
  Star,
  Filter,
  Truck,
  CheckCircle,
  Clock,
  User,
  Settings,
  CreditCard,
  MapPin,
  Home,
  LogOut,
  Sparkles,
  LayoutDashboard,
  Inbox,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import { Navigation as NavComponent } from "@/components/navigation"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [userTier, setUserTier] = useState(3);
  const [nextTierPoints, setNextTierPoints] = useState(2000);

  // Mock data
  const recentOrders = [
    {
      id: "#12345",
      product: "Smart Watch Pro",
      price: 279.99,
      status: "delivered",
      date: "2024-01-15",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      id: "#12346",
      product: "Wireless Gaming Headset",
      price: 139.99,
      status: "shipped",
      date: "2024-01-18",
      image: "/placeholder.svg?height=80&width=80",
      rating: null,
    },
    {
      id: "#12347",
      product: "Smart Home Hub",
      price: 199.99,
      status: "processing",
      date: "2024-01-20",
      image: "/placeholder.svg?height=80&width=80",
      rating: null,
    },
  ]

  const wishlistItems = [
    {
      id: "1",
      name: "Premium Laptop Stand",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
    },
    {
      id: "2",
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
    },
    {
      id: "3",
      name: "Ergonomic Mouse Pad",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg?height=100&width=100",
      inStock: false,
    },
  ]

  const recommendations = [
    {
      id: "1",
      name: "Smart Fitness Tracker",
      price: 149.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.6,
      reason: "Based on your smartwatch purchase",
    },
    {
      id: "2",
      name: "Wireless Charging Pad",
      price: 39.99,
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.4,
      reason: "Perfect for your devices",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "shipped":
        return <Truck className="w-4 h-4 text-orange-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-amber-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      default:
        return "outline"
    }
  }

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  // Animated stats
  const AnimatedNumber = ({ value }: { value: number }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = value;
      if (start === end) return;
      let increment = end / 30;
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setDisplay(end);
          clearInterval(timer);
        } else {
          setDisplay(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(timer);
    }, [value]);
    return <span>{display}</span>;
  };

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Smart St",
    city: "Accra",
  });
  const [profileErrors, setProfileErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const { toast } = useToast();

  // Validation logic
  const validateProfile = (p = profile) => {
    const errors = { name: "", email: "", address: "", city: "" };
    if (!p.name.trim()) errors.name = "Name is required.";
    if (!p.email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(p.email)) errors.email = "Invalid email format.";
    if (!p.address.trim()) errors.address = "Address is required.";
    if (!p.city.trim()) errors.city = "City is required.";
    return errors;
  };
  const hasProfileErrors = Object.values(profileErrors).some(Boolean);

  // Validate on change
  useEffect(() => {
    setProfileErrors(validateProfile(profile));
  }, [profile]);

  // Orders search and filter state
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Filtered orders
  const filteredOrders = recentOrders.filter(order => {
    const matchesSearch =
      order.product.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.id.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus =
      orderStatusFilter === "all" || order.status.toLowerCase() === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Add loading and error state for data fetches
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState("");
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState("");

  // Simulate loading and error for demo (replace with real API calls)
  useEffect(() => {
    setOrdersLoading(true);
    setWishlistLoading(true);
    setRecommendationsLoading(true);
    setTimeout(() => {
      // Simulate random error for demonstration
      if (Math.random() < 0.1) setOrdersError("Failed to load orders. Please try again.");
      if (Math.random() < 0.1) setWishlistError("Failed to load wishlist. Please try again.");
      if (Math.random() < 0.1) setRecommendationsError("Failed to load recommendations. Please try again.");
      setOrdersLoading(false);
      setWishlistLoading(false);
      setRecommendationsLoading(false);
    }, 800);
  }, []);

  // Wishlist add to cart state
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState(wishlistItems);

  // Rating modal state
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [ratingOrder, setRatingOrder] = useState<any>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [orders, setOrders] = useState(recentOrders);

  // Order status chart data
  const orderStatusCounts = orders.reduce((acc, order) => {
    const status = order.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusLabels = [
    { key: "delivered", label: "Delivered", color: "#10b981" },
    { key: "shipped", label: "Shipped", color: "#f59e42" },
    { key: "processing", label: "Processing", color: "#fbbf24" },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent initialUser={{ id: "1", name: profile.name, email: profile.email, role: "customer" }} />
      {/* Header with dynamic greeting and points widget */}
      <header className="bg-white/90 dark:bg-gray-800/90 border-b border-orange-100 dark:border-gray-700 backdrop-blur-sm">
        <div className="container-responsive py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getGreeting()}, {profile.name}!</h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back! Manage your orders, wishlist, and profile.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Loyalty/Points Widget */}
              <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg px-6 py-3 flex flex-col items-center shadow-md">
                <span className="text-white font-bold text-lg">{userPoints} pts</span>
                <span className="text-white text-xs">Tier {userTier}</span>
                <Progress value={Math.min((userPoints / nextTierPoints) * 100, 100)} className="w-24 h-2 mt-1 bg-white/30" />
                <span className="text-white text-xs mt-1">{nextTierPoints - userPoints} pts to next tier</span>
              </div>
              <Link href="/">
                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container-responsive py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300 flex items-center gap-2">
              <Package className="w-4 h-4" /> My Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Profile & Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Quick Stats with animated numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white"><AnimatedNumber value={recentOrders.length} /></div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">1 delivered this week</p>
                </CardContent>
              </Card>
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white"><AnimatedNumber value={wishlistItems.length} /></div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">2 items on sale</p>
                </CardContent>
              </Card>
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  <Star className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white"><AnimatedNumber value={45.99} /></div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">From deals and discounts</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track your latest purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <Image
                        src={order.image}
                        alt={order.product}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{order.product}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">${order.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-500" /> For You</CardTitle>
                <CardDescription>Personalized recommendations based on your activity.</CardDescription>
              </CardHeader>
              <CardContent>
                {recommendationsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <div>Loading recommendations...</div>
                  </div>
                ) : recommendationsError ? (
                  <div className="flex flex-col items-center justify-center py-12 text-red-400">
                    <Sparkles className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">{recommendationsError}</div>
                    <div className="text-sm">Please refresh the page or try again later.</div>
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Sparkles className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">No recommendations yet</div>
                    <div className="text-sm">Shop more to get personalized picks!</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20">
                        <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-bold text-green-600">${item.price}</span>
                            {item.originalPrice && <span className="line-through text-xs">${item.originalPrice}</span>}
                          </div>
                          <div className="text-xs text-gray-500 italic mt-1">{item.reason}</div>
                        </div>
                        <Button size="sm" variant="outline" className="self-start">View</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Status Overview */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-soft p-6 mb-8">
              <h3 className="text-lg font-bold mb-4 text-orange-700 dark:text-orange-200">Order Status Overview</h3>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <Inbox className="w-10 h-10 mb-2" />
                  <div className="font-semibold">No order data yet</div>
                </div>
              ) : (
                <div className="flex items-end gap-6 h-40">
                  {statusLabels.map(({ key, label, color }) => (
                    <div key={key} className="flex flex-col items-center flex-1">
                      <div
                        className="w-10 rounded-t-lg"
                        style={{
                          height: `${(orderStatusCounts[key] || 0) * 30}px`,
                          background: color,
                          transition: 'height 0.4s',
                        }}
                      />
                      <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-200">{label}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{orderStatusCounts[key] || 0}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View and manage all your past and current orders.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search orders..."
                    className="w-64 input-enhanced"
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                  />
                  <select
                    className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <div>Loading orders...</div>
                  </div>
                ) : ordersError ? (
                  <div className="flex flex-col items-center justify-center py-12 text-red-400">
                    <Inbox className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">{ordersError}</div>
                    <div className="text-sm">Please refresh the page or try again later.</div>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Inbox className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">No orders found</div>
                    <div className="text-sm">Try adjusting your search or filter.</div>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-orange-100 dark:divide-gray-700">
                      <thead className="bg-orange-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-orange-100 dark:divide-gray-700">
                        {filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${order.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Badge variant={getStatusColor(order.status) as any} className="capitalize flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                {order.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="outline" size="sm" className="mr-2" onClick={() => { setSelectedOrder(order); setIsOrderDialogOpen(true); }}>View Order</Button>
                              {order.rating ? (
                                <div className="flex items-center justify-end text-amber-500">
                                  {[...Array(order.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                              ) : order.status.toLowerCase() === "delivered" ? (
                                <Button variant="default" size="sm" className="btn-primary" onClick={() => { setRatingOrder(order); setIsRatingDialogOpen(true); }}>Rate</Button>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Order Details Dialog with stepper */}
                <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>
                        {selectedOrder ? (
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-4">
                              <Image src={selectedOrder.image} alt={selectedOrder.product} width={60} height={60} className="rounded-lg object-cover" />
                              <div>
                                <div className="font-semibold text-lg">{selectedOrder.product}</div>
                                <div className="text-sm text-gray-500">Order ID: {selectedOrder.id}</div>
                              </div>
                            </div>
                            {/* Order Tracking Stepper */}
                            <div className="flex items-center justify-between mt-4 mb-2">
                              {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                                const statusIdx = ['ordered', 'shipped', 'out for delivery', 'delivered'].indexOf(selectedOrder.status.toLowerCase());
                                const isActive = idx <= statusIdx;
                                return (
                                  <div key={step} className="flex-1 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${isActive ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>{idx + 1}</div>
                                    <span className={`text-xs mt-1 ${isActive ? 'text-orange-600 font-semibold' : 'text-gray-400'}`}>{step}</span>
                                    {idx < 3 && <div className={`h-1 w-full ${isActive ? 'bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'}`}></div>}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex gap-4 mt-2">
                              <div className="text-sm">Price: <span className="font-bold">${selectedOrder.price}</span></div>
                              <div className="text-sm">Status: <Badge variant={getStatusColor(selectedOrder.status) as any}>{selectedOrder.status}</Badge></div>
                            </div>
                            <div className="text-sm text-gray-500">Order Date: {selectedOrder.date}</div>
                            <div className="text-sm text-gray-500">Shipping Address: 123 Smart St, Accra</div>
                            <div className="text-sm text-gray-500">Payment Method: Credit Card</div>
                          </div>
                        ) : (
                          <span>No order selected.</span>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose asChild>
                      <Button variant="outline" className="mt-4 w-full">Close</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Your saved items. Don't let them get away!</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <div>Loading wishlist...</div>
                  </div>
                ) : wishlistError ? (
                  <div className="flex flex-col items-center justify-center py-12 text-red-400">
                    <Heart className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">{wishlistError}</div>
                    <div className="text-sm">Please refresh the page or try again later.</div>
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Heart className="w-12 h-12 mb-2" />
                    <div className="font-semibold text-lg">Your wishlist is empty</div>
                    <div className="text-sm">Browse products and add your favorites here.</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <Image src={item.image} alt={item.name} width={300} height={200} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-green-600 text-lg">${item.price}</span>
                            {item.originalPrice && <span className="line-through text-sm text-gray-500">${item.originalPrice}</span>}
                            {/* Sale/Stock Badges */}
                            {item.originalPrice && <Badge variant="secondary">Sale</Badge>}
                            {!item.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 btn-primary"
                              disabled={!item.inStock || addingToCartId === item.id}
                              onClick={() => {
                                setAddingToCartId(item.id);
                                setTimeout(() => {
                                  setAddingToCartId(null);
                                  setWishlist(wishlist => wishlist.filter(w => w.id !== item.id));
                                  toast({
                                    title: "Added to cart!",
                                    description: `${item.name} has been added to your cart.`,
                                  });
                                }, 1000);
                              }}
                            >
                              {addingToCartId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : item.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button size="sm" variant="outline"><Heart className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Profile & Settings</CardTitle>
                <CardDescription>Manage your personal information, addresses, and payment methods.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Personal Information</h3>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input-enhanced" />
                    {profileErrors.name && <div className="text-xs text-red-500 mt-1">{profileErrors.name}</div>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="input-enhanced" />
                    {profileErrors.email && <div className="text-xs text-red-500 mt-1">{profileErrors.email}</div>}
                  </div>
                  <Button className="btn-primary" disabled={isUpdatingProfile || hasProfileErrors} onClick={async () => {
                    if (hasProfileErrors) {
                      toast({
                        title: "Invalid input",
                        description: "Please fix the errors before updating your profile.",
                        variant: "destructive",
                      });
                      return;
                    }
                    setIsUpdatingProfile(true);
                    // Simulate API call with random error
                    setTimeout(() => {
                      setIsUpdatingProfile(false);
                      if (Math.random() < 0.2) {
                        toast({
                          title: "Update failed!",
                          description: "Could not update your profile. Please try again.",
                          variant: "destructive",
                        });
                        return;
                      }
                      toast({
                        title: "Profile updated!",
                        description: "Your profile information has been saved.",
                      });
                    }, 1200);
                  }}>{isUpdatingProfile ? "Updating..." : "Update Profile"}</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Shipping Address</h3>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} className="input-enhanced" />
                    {profileErrors.address && <div className="text-xs text-red-500 mt-1">{profileErrors.address}</div>}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={profile.city} onChange={e => setProfile(p => ({ ...p, city: e.target.value }))} className="input-enhanced" />
                    {profileErrors.city && <div className="text-xs text-red-500 mt-1">{profileErrors.city}</div>}
                  </div>
                  <Button variant="outline">Manage Addresses</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Rating Modal */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Your Order</DialogTitle>
            <DialogDescription>
              {ratingOrder && (
                <div className="space-y-2 mt-2">
                  <div className="font-semibold">{ratingOrder.product}</div>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(star => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${star <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        onClick={() => setRatingValue(star)}
                        fill={star <= ratingValue ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <textarea
                    className="w-full mt-3 p-2 border rounded text-sm"
                    rows={3}
                    placeholder="Leave a comment (optional)"
                    value={ratingComment}
                    onChange={e => setRatingComment(e.target.value)}
                  />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Button
              className="btn-primary flex-1"
              disabled={ratingValue === 0}
              onClick={() => {
                if (!ratingOrder) return;
                setOrders(orders => orders.map(o => o.id === ratingOrder.id ? { ...o, rating: ratingValue, ratingComment } : o));
                setIsRatingDialogOpen(false);
                setRatingValue(0);
                setRatingComment("");
                toast({
                  title: "Thank you for your feedback!",
                  description: `You rated ${ratingOrder.product} ${ratingValue} star${ratingValue > 1 ? 's' : ''}.`,
                });
              }}
            >Submit</Button>
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
