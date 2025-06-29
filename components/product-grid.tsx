"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Star, Heart, ShoppingCart, Filter, Search, Sparkles, 
  TrendingUp, Eye, Crown, Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { products, categories, brands, type Product } from "@/lib/products"

interface ProductGridProps {
  products?: Product[]
  category?: string
  brand?: string
  searchQuery?: string
  showFilters?: boolean
  limit?: number
  viewMode?: "grid" | "list" | "3d"
  onQuickView?: (product: Product) => void
  livePrices?: Record<string, number>
}

export function ProductGrid({ 
  products: productsProp,
  category, 
  brand, 
  searchQuery, 
  showFilters = true, 
  limit,
  viewMode = "grid",
  onQuickView,
  livePrices = {}
}: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [selectedBrand, setSelectedBrand] = useState(brand || "all")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")
  const [searchTerm, setSearchTerm] = useState(searchQuery || "")
  const { toast } = useToast()

  useEffect(() => {
    let filtered = [...(productsProp || products)]

    // Apply search filter - make it more robust
    if (searchTerm && searchTerm.trim()) {
      const lowercaseQuery = searchTerm.toLowerCase().trim()
      console.log('Searching for:', lowercaseQuery) // Debug log
      
      filtered = filtered.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(lowercaseQuery)
        const descriptionMatch = product.description.toLowerCase().includes(lowercaseQuery)
        const brandMatch = product.brand.toLowerCase().includes(lowercaseQuery)
        const categoryMatch = product.category.toLowerCase().includes(lowercaseQuery)
        const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        
        // Also search for partial matches (e.g., "iphone" should match "iPhone 15 Pro Max")
        const partialNameMatch = product.name.toLowerCase().split(' ').some(word => 
          word.includes(lowercaseQuery) || lowercaseQuery.includes(word)
        )
        
        return nameMatch || descriptionMatch || brandMatch || categoryMatch || tagsMatch || partialNameMatch
      })
      
      console.log('Found products:', filtered.length) // Debug log
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        product => product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    }

    // Apply brand filter
    if (selectedBrand && selectedBrand !== "all") {
      filtered = filtered.filter(product => product.brand === selectedBrand)
    }

    // Apply price range filter
    switch (priceRange) {
      case "under-100":
        filtered = filtered.filter(product => product.price < 100)
        break
      case "100-500":
        filtered = filtered.filter(product => product.price >= 100 && product.price <= 500)
        break
      case "500-1000":
        filtered = filtered.filter(product => product.price >= 500 && product.price <= 1000)
        break
      case "over-1000":
        filtered = filtered.filter(product => product.price > 1000)
        break
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "featured":
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
    }

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedBrand, searchTerm, sortBy, priceRange, limit, productsProp])

  // Sync selectedCategory and selectedBrand with props if they change
  useEffect(() => {
    setSelectedCategory(category || "all")
  }, [category])
  useEffect(() => {
    setSelectedBrand(brand || "all")
  }, [brand])

  const handleQuickView = (product: Product) => {
    toast({
      title: "Quick View",
      description: `Opening ${product.name} in quick view...`,
    })
  }

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

  const renderProductCard = (product: Product) => {
    const currentPrice = livePrices[product.id] || product.price
    const priceChange = livePrices[product.id] ? livePrices[product.id] - product.price : 0
    const isPriceUp = priceChange > 0
    const isPriceDown = priceChange < 0

    return (
      <Card key={product.id} className="group relative overflow-hidden border-0 shadow-soft card-hover-lift bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <Link href={`/products/${product.id}`} className="block focus:outline-none" tabIndex={-1}>
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Live Price Indicator */}
            {livePrices[product.id] && (
              <div className="absolute top-2 left-2">
                <Badge className={`${isPriceUp ? 'bg-green-500' : isPriceDown ? 'bg-red-500' : 'bg-blue-500'} text-white font-semibold animate-pulse`}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${isPriceDown ? 'rotate-180' : ''}`} />
                  {isPriceUp ? '+' : isPriceDown ? '-' : ''}${Math.abs(priceChange).toFixed(2)}
                </Badge>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                  New
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2 flex-wrap justify-center">
                {/* Quick View */}
                {onQuickView && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                
                {/* Wishlist */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToWishlist(product.id, product.name);
                  }}
                  title="Add to Wishlist"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            {/* Product Info */}
            <div className="mb-3">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount})</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(currentPrice)}
                </span>
              </div>
              {/* Live Price Indicator */}
              {livePrices[product.id] && (
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className={`w-3 h-3 ${isPriceUp ? 'text-green-500' : isPriceDown ? 'text-red-500' : 'text-blue-500'} ${isPriceDown ? 'rotate-180' : ''}`} />
                  <span className={isPriceUp ? 'text-green-500' : isPriceDown ? 'text-red-500' : 'text-blue-500'}>
                    {isPriceUp ? 'Price up' : isPriceDown ? 'Price down' : 'Price stable'}
                  </span>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product.id, product.name);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Link>
      </Card>
    )
  }

  // Render different view modes
  const renderProducts = () => {
    if (viewMode === "3d") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform-style-preserve-3d hover:rotate-y-12 transition-transform duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {renderProductCard(product)}
            </div>
          ))}
        </div>
      )
    }

    if (viewMode === "list") {
      return (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex overflow-hidden border-0 shadow-soft hover:shadow-xl transition-all duration-300">
              <div className="w-48 h-48 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                    New
                  </Badge>
                )}
              </div>
              <CardContent className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-500 mb-2">{product.brand}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onQuickView && onQuickView(product)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Quick View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    // Default grid view
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => renderProductCard(product))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      {renderProducts()}
    </div>
  )
}
