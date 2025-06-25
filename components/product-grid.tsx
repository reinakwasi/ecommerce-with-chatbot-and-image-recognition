"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, Heart, ShoppingCart, Filter, Search, Sparkles } from "lucide-react"
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
}

export function ProductGrid({ 
  products: productsProp,
  category, 
  brand, 
  searchQuery, 
  showFilters = true, 
  limit 
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

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="group relative overflow-hidden border-0 shadow-soft card-hover-lift">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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

      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xs text-gray-400 ml-2">•</span>
          <span className="text-xs text-gray-500">{product.reviewCount} reviews</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.brand}</p>

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
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full">
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Brand Filter */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1000</SelectItem>
                <SelectItem value="over-1000">Over $1000</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredProducts.length} products
          </p>
          {searchTerm && (
            <Badge variant="secondary" className="text-sm">
              Search: "{searchTerm}" ({filteredProducts.length} results)
            </Badge>
          )}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-gray-500">No products found. Try adjusting your filters.</p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map(renderProductCard)}
      </div>
    </div>
  )
}
