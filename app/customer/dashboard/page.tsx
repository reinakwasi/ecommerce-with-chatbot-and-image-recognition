"use client"

import { useState } from "react"
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
} from "lucide-react"
import Image from "next/image"
import { Navigation as NavComponent } from "@/components/navigation"
import Link from "next/link"

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
      <NavComponent initialUser={{ id: "1", name: "John Doe", email: "john@example.com", role: "customer" }} />

      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 border-b border-orange-100 dark:border-gray-700 backdrop-blur-sm">
        <div className="container-responsive py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">John's Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back! Manage your orders, wishlist, and profile.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-500" /> For You</CardTitle>
                <CardDescription>Personalized recommendations based on your activity.</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View and manage all your past and current orders.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search orders..." className="w-64 input-enhanced" />
                  <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                </div>
              </CardHeader>
              <CardContent>
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
                      {recentOrders.map((order) => (
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
                            <Button variant="outline" size="sm" className="mr-2">View Order</Button>
                            {order.rating ? (
                              <div className="flex items-center justify-end text-amber-500">
                                {[...Array(order.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                              </div>
                            ) : (
                              <Button variant="default" size="sm" className="btn-primary">Rate</Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <Image src={item.image} alt={item.name} width={300} height={200} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-green-600 text-lg">${item.price}</span>
                          {item.originalPrice && <span className="line-through text-sm text-gray-500">${item.originalPrice}</span>}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" className="flex-1 btn-primary" disabled={!item.inStock}>{item.inStock ? "Add to Cart" : "Out of Stock"}</Button>
                          <Button size="sm" variant="outline"><Heart className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
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
                    <Input id="name" defaultValue="John Doe" className="input-enhanced" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="input-enhanced" />
                  </div>
                  <Button className="btn-primary">Update Profile</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Shipping Address</h3>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Smart St" className="input-enhanced" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Accra" className="input-enhanced" />
                  </div>
                  <Button variant="outline">Manage Addresses</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
