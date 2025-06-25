"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  Store,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  BarChart3,
  Shield,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    totalUsers: 15420,
    totalSellers: 1250,
    totalProducts: 45680,
    totalRevenue: 2450000,
    monthlyGrowth: 18.5,
    activeUsers: 8920,
    pendingSellers: 23,
    flaggedProducts: 12,
  }

  const pendingSellers = [
    {
      id: "1",
      businessName: "TechGear Solutions",
      contactPerson: "Sarah Johnson",
      email: "sarah@techgear.com",
      registrationDate: "2024-01-20",
      status: "pending",
    },
    {
      id: "2",
      businessName: "Fashion Forward",
      contactPerson: "Mike Chen",
      email: "mike@fashionforward.com",
      registrationDate: "2024-01-19",
      status: "pending",
    },
  ]

  const flaggedContent = [
    {
      id: "1",
      type: "product",
      title: "Suspicious Electronics Item",
      reporter: "System AI",
      reason: "Potential counterfeit product",
      date: "2024-01-21",
      status: "pending",
    },
    {
      id: "2",
      type: "chat",
      title: "Inappropriate Bargaining Chat",
      reporter: "User Report",
      reason: "Offensive language detected",
      date: "2024-01-20",
      status: "pending",
    },
  ]

  const recentActivity = [
    { action: "New seller approved", user: "Electronics Plus", time: "2 hours ago" },
    { action: "Product flagged for review", user: "System", time: "4 hours ago" },
    { action: "User account suspended", user: "Admin", time: "6 hours ago" },
    { action: "Bulk product import completed", user: "Fashion Store", time: "8 hours ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">System monitoring and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="animate-pulse">
                {stats.pendingSellers} Pending Reviews
              </Badge>
              <Button variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                System Alerts
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{stats.activeUsers.toLocaleString()} active today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSellers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{stats.pendingSellers} pending approval</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{stats.flaggedProducts} flagged for review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Pending Actions
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Seller Applications</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {stats.pendingSellers} awaiting approval
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Flagged Content</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {flaggedContent.length} items need moderation
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Moderate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex gap-2">
                <Input placeholder="Search users..." className="w-64" />
                <Button variant="outline">Export Data</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Registered</span>
                    <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Today</span>
                    <span className="font-semibold text-green-600">{stats.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New This Month</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suspended</span>
                    <span className="font-semibold text-red-600">23</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            User {i}23{i}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">john.doe{i}@example.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Active</Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Seller Management</h2>
              <Badge variant="destructive">{stats.pendingSellers} Pending Approvals</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Seller Applications</CardTitle>
                <CardDescription>Review and approve new seller registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingSellers.map((seller) => (
                    <div key={seller.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{seller.businessName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Contact: {seller.contactPerson}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Email: {seller.email}</p>
                        <p className="text-xs text-gray-500">Applied: {seller.registrationDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Reviewing Application",
                              description: `Opening detailed review for ${seller.businessName}`,
                            })
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            toast({
                              title: "Seller Approved",
                              description: `${seller.businessName} has been approved successfully!`,
                            })
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            toast({
                              title: "Seller Rejected",
                              description: `${seller.businessName} application has been rejected.`,
                              variant: "destructive",
                            })
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <div className="flex gap-2">
                <Input placeholder="Search products..." className="w-64" />
                <Button variant="outline">Bulk Actions</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">42,150</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Flagged Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.flaggedProducts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Out of Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">3,518</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Moderation</h2>
              <Badge variant="destructive">{flaggedContent.length} Items Need Review</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>AI-detected and user-reported content requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Reported by: {item.reporter}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Reason: {item.reason}</p>
                        <p className="text-xs text-gray-500">Flagged: {item.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Reviewing Content",
                              description: `Opening detailed review for ${item.title}`,
                            })
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            toast({
                              title: "Content Approved",
                              description: `${item.title} has been approved.`,
                            })
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            toast({
                              title: "Content Removed",
                              description: `${item.title} has been removed from the platform.`,
                              variant: "destructive",
                            })
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  AI Chatbot Monitoring
                </CardTitle>
                <CardDescription>Monitor AI bargaining conversations for inappropriate content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <p className="text-sm">Appropriate Conversations</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1.2%</div>
                    <p className="text-sm">Flagged for Review</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0.3%</div>
                    <p className="text-sm">Blocked Conversations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>User Growth</span>
                    <span className="font-semibold text-green-600">+{stats.monthlyGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Growth</span>
                    <span className="font-semibold text-green-600">+24.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seller Growth</span>
                    <span className="font-semibold text-green-600">+15.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    AI Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Search Accuracy</span>
                    <span className="font-semibold">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommendation CTR</span>
                    <span className="font-semibold">12.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bargaining Success</span>
                    <span className="font-semibold">78.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-semibold">145ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate</span>
                    <span className="font-semibold text-green-600">0.02%</span>
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
