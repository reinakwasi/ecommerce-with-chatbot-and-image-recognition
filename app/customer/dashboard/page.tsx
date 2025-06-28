"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
  Navigation,
} from "lucide-react"
import Image from "next/image"
import { SmartSearchBar } from "@/components/smart-search-bar"
import { Navigation as NavComponent } from "@/components/navigation"

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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

  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 border-b border-orange-100 dark:border-gray-700 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, John!</h1>
              <p className="text-gray-600 dark:text-gray-300">Discover amazing products with smart assistance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/customer/wishlist")} className="hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <Heart className="w-4 h-4 mr-2 text-orange-600" />
                Wishlist ({wishlistItems.length})
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/customer/cart")} className="hover:bg-orange-50 dark:hover:bg-orange-900/20">
                <ShoppingBag className="w-4 h-4 mr-2 text-orange-600" />
                Cart (2)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Smart Search */}
        <div className="mb-8">
          <SmartSearchBar />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300">My Orders</TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300">Wishlist</TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300">For You</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700 dark:data-[state=active]:bg-orange-900/20 dark:data-[state=active]:text-orange-300">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{recentOrders.length}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">1 delivered this week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistItems.length}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">2 items on sale</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  <Star className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$45.99</div>
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
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>View and track all your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <Image
                        src={order.image}
                        alt={order.product}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{order.product}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Order #{order.id} • {order.date}</p>
                        <p className="text-lg font-semibold text-orange-600">${order.price}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                            {order.status}
                          </Badge>
                        </div>
                        {order.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{order.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-soft border border-gray-100 dark:border-gray-600">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full mb-4"
                      />
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.name}</h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-bold text-orange-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="btn-primary flex-1">
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Personalized suggestions based on your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-soft border border-gray-100 dark:border-gray-600">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full mb-4"
                      />
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.name}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-orange-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.reason}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="btn-primary flex-1">
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">john.doe@example.com</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" className="input-enhanced" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input id="email" defaultValue="john.doe@example.com" className="input-enhanced" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <Input id="phone" defaultValue="+233 595 354 747" className="input-enhanced" />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                      <Input id="address" defaultValue="Accra, Ghana" className="input-enhanced" />
                    </div>
                  </div>
                  
                  <Button className="btn-primary">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
