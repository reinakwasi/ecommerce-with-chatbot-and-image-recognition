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
} from "lucide-react"
import Image from "next/image"
import { SmartSearchBar } from "@/components/smart-search-bar"

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const recentOrders = [
    {
      id: "#12345",
      product: "AI-Powered Smartwatch Pro",
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
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, John!</h1>
              <p className="text-gray-600 dark:text-gray-300">Discover amazing products with AI assistance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/customer/wishlist")}>
                <Heart className="w-4 h-4 mr-2" />
                Wishlist ({wishlistItems.length})
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/customer/cart")}>
                <ShoppingBag className="w-4 h-4 mr-2" />
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="recommendations">For You</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentOrders.length}</div>
                  <p className="text-xs text-muted-foreground">1 delivered this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{wishlistItems.length}</div>
                  <p className="text-xs text-muted-foreground">2 items on sale</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$127.50</div>
                  <p className="text-xs text-muted-foreground">Through AI bargaining</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center gap-4">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt={order.product}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{order.product}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {order.id} • {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.price}</p>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            <Badge variant={getStatusColor(order.status) as any}>{order.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                      View All Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Personalized just for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{item.reason}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{item.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${item.price}</p>
                          {item.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">${item.originalPrice}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("recommendations")}>
                      View All Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Orders</h2>
              <div className="flex gap-2">
                <Input placeholder="Search orders..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt={order.product}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{order.product}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Order {order.id} • Placed on {order.date}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusIcon(order.status)}
                          <Badge variant={getStatusColor(order.status) as any}>{order.status}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${order.price}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                          {order.status === "delivered" && !order.rating && <Button size="sm">Rate Product</Button>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <p className="text-gray-600 dark:text-gray-300">{wishlistItems.length} items saved</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" disabled={!item.inStock}>
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Personalized for You</h2>
              <p className="text-gray-600 dark:text-gray-300">
                AI-curated products based on your preferences and behavior
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...recommendations, ...recommendations].map((item, index) => (
                <Card key={`${item.id}-${index}`} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({item.rating})</span>
                    </div>

                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-blue-600 mb-3">{item.reason}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-green-600">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Add to Cart</Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Street Address</label>
                    <Input defaultValue="123 Main Street" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">City</label>
                      <Input defaultValue="New York" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">ZIP Code</label>
                      <Input defaultValue="10001" />
                    </div>
                  </div>
                  <Button>Update Address</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Expires 12/26</p>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add New Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Recommendations</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price Drop Alerts</span>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
