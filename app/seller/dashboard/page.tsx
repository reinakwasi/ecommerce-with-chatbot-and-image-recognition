"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  BarChart3,
  Eye,
  Star,
  ShoppingCart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const router = useRouter()

  // Mock authentication check
  useEffect(() => {
    // Replace this with your real auth logic
    const isSellerLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isSellerLoggedIn') === 'true';
    if (!isSellerLoggedIn) {
      router.replace("/auth/login?seller=1")
    }
  }, [router])

  // Mock data
  const stats = {
    totalRevenue: 45230.5,
    totalOrders: 342,
    totalProducts: 28,
    totalCustomers: 156,
    monthlyGrowth: 12.5,
  }

  const products = [
    {
      id: "1",
      name: "AI-Powered Smartwatch Pro",
      price: 299.99,
      stock: 15,
      sold: 45,
      rating: 4.8,
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Wireless Gaming Headset",
      price: 149.99,
      stock: 8,
      sold: 23,
      rating: 4.6,
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Smart Home Hub",
      price: 199.99,
      stock: 0,
      sold: 67,
      rating: 4.9,
      status: "out_of_stock",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "AI Smartwatch Pro", amount: 299.99, status: "shipped" },
    { id: "#12346", customer: "Jane Smith", product: "Gaming Headset", amount: 149.99, status: "processing" },
    { id: "#12347", customer: "Mike Johnson", product: "Smart Home Hub", amount: 199.99, status: "delivered" },
  ]

  const bargainingHistory = [
    {
      id: "1",
      customer: "Alice Brown",
      product: "AI Smartwatch Pro",
      originalPrice: 299.99,
      finalPrice: 279.99,
      status: "accepted",
      messages: 8,
    },
    {
      id: "2",
      customer: "Bob Wilson",
      product: "Gaming Headset",
      originalPrice: 149.99,
      finalPrice: 139.99,
      status: "negotiating",
      messages: 5,
    },
  ]

  // Update the handleAddProduct function
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Opening product creation form...",
    })
    // Navigate to add product page
    window.location.href = "/seller/products/add"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your store and track performance</p>
            </div>
            <Button
              onClick={handleAddProduct}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bargaining">AI Bargaining</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+23 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">3 out of stock</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+12 new this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {order.customer} - {order.product}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.amount}</p>
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Bargaining Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bargainingHistory.slice(0, 3).map((negotiation) => (
                      <div key={negotiation.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{negotiation.customer}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{negotiation.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            ${negotiation.originalPrice} → ${negotiation.finalPrice}
                          </p>
                          <Badge variant={negotiation.status === "accepted" ? "default" : "secondary"}>
                            {negotiation.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button onClick={handleAddProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-lg font-bold text-green-600">${product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                          <Badge variant={product.status === "active" ? "default" : "destructive"}>
                            {product.status === "active" ? "Active" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <span>Stock: {product.stock}</span>
                          <span>Sold: {product.sold}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => (window.location.href = `/products/${product.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit Product",
                              description: `Opening editor for ${product.name}`,
                            })
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Delete Product",
                              description: `Are you sure you want to delete ${product.name}?`,
                              variant: "destructive",
                            })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Order Management</h2>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Customer: {order.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Product: {order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${order.amount}</p>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "shipped"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Order Details",
                                description: `Viewing details for order ${order.id}`,
                              })
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bargaining" className="space-y-6">
            <h2 className="text-2xl font-bold">AI Bargaining History</h2>

            <Card>
              <CardHeader>
                <CardTitle>Customer Negotiations</CardTitle>
                <CardDescription>Track AI-assisted price negotiations with customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bargainingHistory.map((negotiation) => (
                    <div key={negotiation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{negotiation.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Product: {negotiation.product}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Messages: {negotiation.messages}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Original: ${negotiation.originalPrice}
                        </p>
                        <p className="font-semibold text-lg text-green-600">Final: ${negotiation.finalPrice}</p>
                        <Badge variant={negotiation.status === "accepted" ? "default" : "secondary"}>
                          {negotiation.status}
                        </Badge>
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Chat History",
                                description: `Opening chat with ${negotiation.customer}`,
                              })
                            }}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            View Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-semibold">${(stats.totalRevenue * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="font-semibold">${(stats.totalRevenue * 0.25).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Growth Rate</span>
                      <span className="font-semibold text-green-600">+{stats.monthlyGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    AI Bargaining Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Successful Negotiations</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Discount</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Conversion Rate</span>
                      <span className="font-semibold text-green-600">+34%</span>
                    </div>
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
