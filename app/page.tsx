import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Bot, Sparkles, ShoppingBag, Users, TrendingUp, ArrowRight, Star, Heart, ShoppingCart, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"
import { SmartSearchBar } from "@/components/smart-search-bar"
import { ProductGrid } from "@/components/product-grid"
import { Navigation } from "@/components/navigation"
import { ProductRecommendations } from "@/components/product-recommendations"
import { getUniqueProductsBySection } from "@/lib/products"
import { products, categories as productCategories } from "@/lib/products"

export default function HomePage() {
  // Step 1: Pick featured
  const featuredProducts = getUniqueProductsBySection('featured', new Set(), 8)
  const featuredIds = new Set(featuredProducts.map(p => p.id))

  // Step 2: Pick new arrivals, excluding featured
  const newArrivals = getUniqueProductsBySection('new', featuredIds, 8)
  const newArrivalIds = new Set(newArrivals.map(p => p.id))

  // Step 3: Pick recommended, excluding both
  const excludeIds = new Set([...featuredIds, ...newArrivalIds])
  const recommended = getUniqueProductsBySection('recommended', excludeIds, 8)

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

  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users, color: "blue" },
    { label: "Products Available", value: "100K+", icon: ShoppingBag, color: "purple" },
    { label: "Customer Satisfaction", value: "99.9%", icon: TrendingUp, color: "pink" },
  ]

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              AI-Powered Shopping
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the future of e-commerce with intelligent recommendations, 
              visual search, and AI-powered price negotiation.
            </p>
            
            {/* Smart Search Bar */}
            <div className="mb-12">
              <SmartSearchBar />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Recommendations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Personalized product suggestions based on your preferences
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Visual Search</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upload images to find similar products instantly
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Negotiation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    AI-powered price negotiation for better deals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Curated selection of our most popular items
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

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Latest products just added to our collection
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={newArrivals} limit={8} showFilters={false} />
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <ProductRecommendations showPersonalized={true} showTrending={true} showRecentlyViewed={true} />
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categoriesWithCounts.map((category) => (
              <Link key={category.name} href={`/products?category=${category.name}`}>
                <Card className="group cursor-pointer border-0 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Platform?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of shopping with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Advanced machine learning for personalized experiences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Bank-level security for your transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AI-negotiated prices for maximum savings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container-responsive">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Commerce</span>
              </div>
              <p className="text-gray-400">The future of shopping with AI-powered experiences.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/seller/register" className="hover:text-white transition-colors">
                    Become a Seller
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard" className="hover:text-white transition-colors">
                    Seller Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/seller/help" className="hover:text-white transition-colors">
                    Seller Help
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
