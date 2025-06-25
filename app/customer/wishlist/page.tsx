"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  inStock: boolean
  category: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Premium Laptop Stand",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      inStock: true,
      category: "Accessories",
    },
    {
      id: "2",
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      inStock: true,
      category: "Electronics",
    },
    {
      id: "3",
      name: "Ergonomic Mouse Pad",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      inStock: false,
      category: "Accessories",
    },
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
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AI Commerce
            </Link>
            <Link href="/customer/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Badge variant="secondary">{wishlistItems.length} items</Badge>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Save items you love to your wishlist and never lose track of them.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Heart className="w-4 h-4 fill-current text-red-500" />
                  </Button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
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

                  <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>

                  <Badge variant="secondary" className="mb-3 text-xs">
                    {item.category}
                  </Badge>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-green-600">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" disabled={!item.inStock} onClick={() => addToCart(item.id)}>
                      {item.inStock ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      ) : (
                        "Out of Stock"
                      )}
                    </Button>
                    <Link href={`/products/${item.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
