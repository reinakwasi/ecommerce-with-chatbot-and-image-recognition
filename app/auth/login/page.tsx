"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, User, Store, Shield, Eye, EyeOff, ArrowRight, Star, Lock, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const sellerParam = searchParams.get("seller")
  const [tab, setTab] = useState(sellerParam === "1" ? "seller" : "customer")

  const handleLogin = async (userType: string) => {
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful!",
        description: `Welcome back to SmartShop!`,
      })

      // Redirect to the homepage for all user types
      router.push("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-primary">
      {/* Left: Hero/Brand Section */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-orange-500 to-amber-600 text-white p-12 relative overflow-hidden animate-fadeInLeft">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">SmartShop</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight drop-shadow-lg">Welcome Back!</h1>
          <p className="text-lg mb-8 opacity-90 max-w-md">Sign in to unlock smart shopping, amazing deals, and your personalized dashboard.</p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3"><Heart className="w-6 h-6 text-orange-300" /> <span>Smart Shopping Assistant</span></li>
            <li className="flex items-center gap-3"><Star className="w-6 h-6 text-amber-300" /> <span>Personalized Recommendations</span></li>
            <li className="flex items-center gap-3"><Lock className="w-6 h-6 text-emerald-300" /> <span>Bank-level Security</span></li>
          </ul>
        </div>
        {/* Testimonial or Why Join */}
        <div className="bg-white/10 rounded-xl p-6 shadow-lg mt-8 animate-fadeInUp">
          <p className="italic text-lg mb-2">"The smart deals and search features are amazing. I save time and money every time I shop!"</p>
          <div className="flex items-center gap-2">
            <img src="/placeholder-user.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
            <span className="font-semibold">Ama, Accra</span>
          </div>
        </div>
        {/* Decorative illustration or gradient blob */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/40 to-orange-400/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      </div>

      {/* Right: Login Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 animate-fadeInRight">
        <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-soft p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Sign In to Your Account</h2>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="flex bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-md">
                <TabsTrigger value="customer" className="flex items-center gap-2 text-lg px-8 py-3 rounded-full transition-all data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-200 data-[state=inactive]:bg-transparent focus:outline-none">
                  <User className="w-5 h-5" /> Customer
                </TabsTrigger>
                <TabsTrigger value="seller" className="flex items-center gap-2 text-lg px-8 py-3 rounded-full transition-all data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-200 data-[state=inactive]:bg-transparent focus:outline-none">
                  <Store className="w-5 h-5" /> Seller
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2 text-lg px-8 py-3 rounded-full transition-all data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:text-gray-200 data-[state=inactive]:bg-transparent focus:outline-none">
                  <Shield className="w-5 h-5" /> Admin
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="customer" className="space-y-6">
              <Label htmlFor="customer-email">Email</Label>
              <Input id="customer-email" type="email" placeholder="Enter your email" className="mb-4 input-enhanced" defaultValue="customer@example.com" />
              <Label htmlFor="customer-password">Password</Label>
              <div className="relative mb-4">
                <Input id="customer-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" defaultValue="password123" className="input-enhanced" />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-customer" />
                  <Label htmlFor="remember-customer" className="text-sm">Remember me</Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:underline">Forgot password?</Link>
              </div>
              <Button className="w-full btn-primary text-lg py-3" onClick={() => handleLogin("customer")} disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In as Customer"}
              </Button>
              <div className="flex flex-col items-center justify-center text-center mt-4">
                <User className="w-8 h-8 text-orange-600 mb-1" />
                <span className="text-xs text-gray-400">Demo: customer@example.com / password123</span>
              </div>
            </TabsContent>

            <TabsContent value="seller" className="space-y-6">
              <Label htmlFor="seller-email">Business Email</Label>
              <Input id="seller-email" type="email" placeholder="Enter your business email" className="mb-4 input-enhanced" defaultValue="seller@example.com" />
              <Label htmlFor="seller-password">Password</Label>
              <div className="relative mb-4">
                <Input id="seller-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" defaultValue="password123" className="input-enhanced" />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-seller" />
                  <Label htmlFor="remember-seller" className="text-sm">Remember me</Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:underline">Forgot password?</Link>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg py-3" onClick={() => handleLogin("seller")} disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In as Seller"}
              </Button>
              <div className="flex flex-col items-center justify-center text-center mt-4">
                <Store className="w-8 h-8 text-emerald-600 mb-1" />
                <span className="text-xs text-gray-400">Demo: seller@example.com / password123</span>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" placeholder="Enter your admin email" className="mb-4 input-enhanced" defaultValue="admin@example.com" />
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative mb-4">
                <Input id="admin-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" defaultValue="admin123" className="input-enhanced" />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="remember-admin" />
                <Label htmlFor="remember-admin" className="text-sm">Remember me</Label>
              </div>
              <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-lg py-3" onClick={() => handleLogin("admin")} disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In as Admin"}
              </Button>
              <div className="flex flex-col items-center justify-center text-center mt-4">
                <Shield className="w-8 h-8 text-teal-600 mb-1" />
                <span className="text-xs text-gray-400">Demo: admin@example.com / admin123</span>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-orange-600 hover:underline font-semibold inline-flex items-center gap-1">
                Sign up <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
