"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowLeft, Star, Eye, Trash2, MoveRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { products, Product } from "@/lib/products"

interface WishlistItem extends Product {
  addedAt: string
}

export default function WishlistPage() {
  // Initialize with some real products from our database
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      ...products.find(p => p.id === "1")!,
      addedAt: "2024-01-15T10:00:00Z"
    },
    {
      ...products.find(p => p.id === "phone-iphone-15-pro-max")!,
      addedAt: "2024-01-10T10:00:00Z"
    },
    {
      ...products.find(p => p.id === "5")!,
      addedAt: "2024-01-08T10:00:00Z"
    },
    {
      ...products.find(p => p.id === "women-1")!,
      addedAt: "2024-01-05T10:00:00Z"
    },
    {
      ...products.find(p => p.id === "shoes-1")!,
      addedAt: "2024-01-03T10:00:00Z"
    }
  ])

  const { toast } = useToast()

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (id: string) => {
    const item = wishlistItems.find((item) => item.id === id)
    if (item) {
      toast({
        title: "Added to cart!",
        description: `${item.name} has been added to your cart.`,
      })
      // Here you would typically add to cart state/context
    }
  }

  const moveToCart = (id: string) => {
    const item = wishlistItems.find((item) => item.id === id)
    if (item) {
      addToCart(id)
      removeFromWishlist(id)
      toast({
        title: "Moved to cart!",
        description: `${item.name} has been moved from wishlist to cart.`,
      })
    }
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-warm">SmartShop</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="hover:text-orange-600 dark:hover:text-orange-400">
                  <Eye className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/customer/dashboard">
                <Button variant="ghost" size="sm" className="hover:text-orange-600 dark:hover:text-orange-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-responsive py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h1>
              <p className="text-gray-600 dark:text-gray-300">Save items you love for later</p>
            </div>
            <Badge variant="secondary" className="ml-4 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">{wishlistItems.length} items</Badge>
          </div>
          {wishlistItems.length > 0 && (
            <Button variant="outline" onClick={clearWishlist} className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist and never lose track of them. Start exploring our amazing products!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button className="btn-primary">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/deals">
                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
                    {item.originalPrice && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  {item.isNew && (
                    <Badge className="absolute bottom-2 left-2 bg-green-500 hover:bg-green-600">
                      NEW
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

                  <h3 className="font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">{item.name}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.brand}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Added on {formatDate(item.addedAt)}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      disabled={!item.inStock} 
                      onClick={() => moveToCart(item.id)}
                    >
                      {item.inStock ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Move to Cart
                        </>
                      ) : (
                        "Out of Stock"
                      )}
                    </Button>
                    <Link href={`/products/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Ready to shop?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Move items to your cart or continue browsing for more amazing products.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/products">
                  <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20">
                    <MoveRight className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/customer/cart">
                  <Button className="btn-primary">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
