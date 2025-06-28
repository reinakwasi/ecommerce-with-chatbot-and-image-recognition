import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Bot, Sparkles, ShoppingBag, Users, TrendingUp, ArrowRight, Star, Heart, ShoppingCart, Zap, Shield, Truck, Gift, Clock, ThumbsUp } from "lucide-react"
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
    { label: "Happy Customers", value: "50K+", icon: Users, color: "orange" },
    { label: "Products Available", value: "100K+", icon: ShoppingBag, color: "emerald" },
    { label: "Customer Satisfaction", value: "99.9%", icon: TrendingUp, color: "amber" },
  ]

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Smart Shopping Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover amazing products with smart search, personalized recommendations, 
              and friendly price negotiation. Shopping has never been this easy!
            </p>
            
            {/* Smart Search Bar */}
            <div className="mb-12">
              <SmartSearchBar />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Recommendations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get personalized product suggestions just for you
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Visual Search</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upload photos to find similar products instantly
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Friendly Negotiation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Chat with our assistant to get the best deals
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

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fresh products just added to our collection
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

      {/* Smart Recommendations */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
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
                    <h3 className="font-semibold mb-2 group-hover:text-orange-600 transition-colors">
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
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make shopping easy, fun, and rewarding with features designed just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-soft bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Great Deals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Find amazing discounts and special offers every day
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quick shipping and reliable delivery to your door
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All products are carefully selected and quality-checked
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-white dark:bg-gray-900">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Secure Shopping</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your information is safe with our secure payment system
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who love our smart shopping experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="btn-primary">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
