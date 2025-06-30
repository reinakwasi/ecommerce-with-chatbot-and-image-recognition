"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, CreditCard, Truck, Shield, Sparkles, ArrowLeft, CheckCircle, Package as PackageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock cart items (replace with real cart state in production)
const cartItems = [
  {
    id: "phone-iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    image: "/phones and accessories/iphone 15 pro max.webp",
    price: 1299.99,
    quantity: 1,
    brand: "Apple",
  },
  {
    id: "3",
    name: "Men's Casual Black Jacket",
    image: "/Men/casual men black jacket.jpg",
    price: 3499.99,
    quantity: 2,
    brand: "AIC Brand",
  },
]

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = subtotal > 50 ? 0 : 9.99
const tax = subtotal * 0.08
const total = subtotal + shipping + tax

export default function CheckoutPage() {
  const [step, setStep] = useState<"details" | "payment" | "review" | "success">("details")
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod") // cod for Cash on Delivery
  const [placingOrder, setPlacingOrder] = useState(false)

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = () => {
    setPlacingOrder(true)
    setTimeout(() => {
      setStep("success")
      setPlacingOrder(false)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-warm">SmartShop</span>
            </Link>
            <Link href="/customer/cart">
              <Button variant="ghost" size="sm" className="hover:text-orange-600 dark:hover:text-orange-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container-responsive py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Left: Forms/Steps */}
          <div>
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  Checkout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === "details" ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"}`}>1</div>
                  <span className={step === "details" ? "font-bold text-orange-600" : "text-gray-500"}>Details</span>
                  <div className="h-1 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === "payment" ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"}`}>2</div>
                  <span className={step === "payment" ? "font-bold text-orange-600" : "text-gray-500"}>Payment</span>
                  <div className="h-1 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === "review" || step === "success" ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"}`}>3</div>
                  <span className={step === "review" || step === "success" ? "font-bold text-orange-600" : "text-gray-500"}>Review</span>
                </div>

                {step === "details" && (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); setStep("payment") }}>
                    <Input name="name" value={shippingInfo.name} onChange={handleShippingChange} placeholder="Full Name" required className="input-enhanced" />
                    <Input name="email" value={shippingInfo.email} onChange={handleShippingChange} placeholder="Email Address" type="email" required className="input-enhanced" />
                    <Input name="phone" value={shippingInfo.phone} onChange={handleShippingChange} placeholder="Phone Number" required className="input-enhanced" />
                    <Input name="address" value={shippingInfo.address} onChange={handleShippingChange} placeholder="Street Address" required className="input-enhanced" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="city" value={shippingInfo.city} onChange={handleShippingChange} placeholder="City" required className="input-enhanced" />
                      <Input name="state" value={shippingInfo.state} onChange={handleShippingChange} placeholder="State" required className="input-enhanced" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="zip" value={shippingInfo.zip} onChange={handleShippingChange} placeholder="ZIP/Postal Code" required className="input-enhanced" />
                      <Input name="country" value={shippingInfo.country} onChange={handleShippingChange} placeholder="Country" required className="input-enhanced" />
                    </div>
                    <Button className="btn-primary w-full mt-2" type="submit">Continue to Payment</Button>
                  </form>
                )}

                {step === "payment" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Select Payment Method</h3>
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" : "border-gray-200 dark:border-gray-700 hover:border-orange-300"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Cash on Delivery</span>
                        {paymentMethod === 'cod' && <CheckCircle className="w-5 h-5 text-orange-500" />}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Pay with cash when your order is delivered.</p>
                    </div>
                    {/* Add other payment methods here in the future */}
                    <Button className="btn-primary w-full mt-2" onClick={() => setStep("review")}>Review Order</Button>
                  </div>
                )}

                {step === "review" && (
                  <div className="space-y-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                      <div className="font-semibold mb-2 text-orange-700 dark:text-orange-300">Shipping to:</div>
                      <div className="text-gray-700 dark:text-gray-200">
                        {shippingInfo.name}<br />
                        {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                        {shippingInfo.country}<br />
                        {shippingInfo.email} | {shippingInfo.phone}
                      </div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                      <div className="font-semibold mb-2 text-orange-700 dark:text-orange-300">Payment Method:</div>
                      <div className="text-gray-700 dark:text-gray-200 font-semibold">
                        Cash on Delivery
                      </div>
                    </div>
                    <Button className="btn-primary w-full mt-2" onClick={handlePlaceOrder} disabled={placingOrder}>
                      {placingOrder ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                )}

                {step === "success" && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <PackageIcon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Order Placed!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for shopping with SmartShop. Your order is confirmed and will be shipped soon.</p>
                    <Link href="/">
                      <Button className="btn-primary">Back to Home</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-2">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure checkout with SSL encryption</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free shipping on orders over $50</div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.brand}</div>
                      <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-orange-600">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 