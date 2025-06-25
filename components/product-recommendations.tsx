"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, Clock, Sparkles, ArrowRight, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { getRelatedProducts, getFeaturedProducts, getNewProducts, type Product, getUniqueProductsBySection } from "@/lib/products"

interface ProductRecommendationsProps {
  currentProductId?: string
  userPreferences?: string[]
  showPersonalized?: boolean
  showTrending?: boolean
  showRecentlyViewed?: boolean
}

export function ProductRecommendations({
  currentProductId,
  userPreferences = [],
  showPersonalized = true,
  showTrending = true,
  showRecentlyViewed = true,
}: ProductRecommendationsProps) {
  const [activeTab, setActiveTab] = useState("personalized")
  const [personalizedProducts, setPersonalizedProducts] = useState<Product[]>([])
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Track IDs to avoid duplicates across tabs
    const usedIds = new Set<string>()
    // Personalized: related or featured
    let personalized: Product[] = []
    if (currentProductId) {
      personalized = getRelatedProducts(currentProductId, 4)
    } else {
      personalized = getUniqueProductsBySection('featured', usedIds, 4)
    }
    personalized.forEach(p => usedIds.add(p.id))
    setPersonalizedProducts(personalized)
    // Trending: most reviewed, not in personalized
    const trending = getUniqueProductsBySection('new', usedIds, 4)
    trending.forEach(p => usedIds.add(p.id))
    setTrendingProducts(trending)
  }, [currentProductId])

  const handleAddToCart = (productId: string, productName: string) => {
    toast({
      title: "Added to cart!",
      description: `${productName} has been added to your cart.`,
    })
  }

  const handleAddToWishlist = (productId: string, productName: string) => {
    toast({
      title: "Added to wishlist",
      description: `${productName} has been added to your wishlist.`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  const renderProductCard = (product: Product, showAiScore = false) => (
    <Card key={product.id} className="group relative overflow-hidden border-0 shadow-soft card-hover-lift">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* AI Score Badge */}
        {showAiScore && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
              <Sparkles className="w-3 h-3 mr-1" />
              95% Match
            </Badge>
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">
              -{calculateDiscount(product.originalPrice, product.price)}%
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full w-8 h-8 p-0 bg-white/90 hover:bg-white"
              onClick={() => handleAddToWishlist(product.id, product.name)}
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleAddToCart(product.id, product.name)}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? "text-yellow-400 fill-current" 
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold text-green-600 text-sm">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* AI Match Reason */}
        {showAiScore && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            Based on your preferences
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Recommended for You</h2>
          <p className="text-gray-600 dark:text-gray-300">
            AI-powered suggestions based on your preferences and behavior
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="group">
            View All
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          {showPersonalized && (
            <TabsTrigger value="personalized" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Personalized
            </TabsTrigger>
          )}
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
        </TabsList>

        {showPersonalized && (
          <TabsContent value="personalized" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personalizedProducts.map((product) => renderProductCard(product, true))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="trending" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => renderProductCard(product))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
