"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Heart, Eye, Save, Truck, Shield, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { products, Product } from "@/lib/products"

interface CartItem extends Product {
  quantity: number
}

export default function CartPage() {
  // Initialize with some real products from our database
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      ...products.find(p => p.id === "phone-iphone-15-pro-max")!,
      quantity: 1
    },
    {
      ...products.find(p => p.id === "3")!,
      quantity: 2
    },
    {
      ...products.find(p => p.id === "women-1")!,
      quantity: 1
    }
  ])

  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const { toast } = useToast()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    const item = cartItems.find(item => item.id === id)
    setCartItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: `${item?.name} has been removed from your cart.`,
    })
  }

  const saveForLater = (id: string) => {
    const item = cartItems.find(item => item.id === id)
    removeItem(id)
    toast({
      title: "Saved for later",
      description: `${item?.name} has been moved to your wishlist.`,
    })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true)
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
    })
    // Navigate to checkout
    window.location.href = "/checkout"
  }

  const clearCart = () => {
    setCartItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
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
                  Continue Shopping
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
            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h1>
              <p className="text-gray-600 dark:text-gray-300">Review your items and proceed to checkout</p>
            </div>
            <Badge variant="secondary" className="ml-4 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">{cartItems.length} items</Badge>
          </div>
          {cartItems.length > 0 && (
            <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        {item.isNew && (
                          <Badge className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-600 text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.name}</h3>
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.brand}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                              <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                                Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                              </Badge>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-lg bg-white dark:bg-gray-700">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            <Button variant="outline" size="sm" onClick={() => saveForLater(item.id)}>
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Product savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo discount (SAVE10)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="flex items-center gap-1">
                      {shipping === 0 ? (
                        <>
                          <Truck className="w-4 h-4 text-green-600" />
                          FREE
                        </>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-blue-600 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Promo Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Try "SAVE10" for 10% off</p>
                </CardContent>
              </Card>

              {/* Security & Shipping Info */}
              <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Shield className="w-4 h-4" />
                      Secure checkout with SSL encryption
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Truck className="w-4 h-4" />
                      Free shipping on orders over $50
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CreditCard className="w-4 h-4" />
                      Multiple payment options available
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button
                className="w-full h-12 text-lg btn-primary"
                onClick={handleCheckout}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>

              <Link href="/products">
                <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
