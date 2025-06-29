"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, User, Store, Shield, ArrowRight, Star, Lock, TrendingUp, CheckCircle, Check, Heart } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const sellerParam = searchParams.get("seller")
  const [selectedType, setSelectedType] = useState("customer")

  // Set initial type based on URL param
  useState(() => {
    if (sellerParam === "1") setSelectedType("seller")
  })

  const handleRegister = async (userType: string) => {
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful!",
        description: `Welcome to SmartShop as a ${userType}!`,
      })
    }, 2000)
  }

  const benefits = [
    { icon: <Heart className="w-5 h-5" />, text: "Smart Shopping Assistant" },
    { icon: <Star className="w-5 h-5" />, text: "Personalized Recommendations" },
    { icon: <Lock className="w-5 h-5" />, text: "Bank-level Security" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Amazing Deals & Savings" },
  ]

  const userTypes = [
    {
      id: "customer",
      title: "Customer",
      icon: User,
      color: "from-orange-500 to-amber-500",
      description: "Shop smarter with personalized recommendations",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a strong password" }
      ]
    },
    {
      id: "seller",
      title: "Seller",
      icon: Store,
      color: "from-emerald-500 to-teal-500",
      description: "Start selling and grow your business with smart tools",
      fields: [
        { name: "businessName", label: "Business Name", type: "text", placeholder: "Enter your business name" },
        { name: "contactPerson", label: "Contact Person", type: "text", placeholder: "Enter contact person name" },
        { name: "email", label: "Business Email", type: "email", placeholder: "Enter business email" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a strong password" }
      ]
    }
  ]

  const currentType = userTypes.find(type => type.id === selectedType)

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">SmartShop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your account type and join thousands of users experiencing smart shopping
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {userTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            
            return (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-white dark:bg-gray-800 shadow-soft scale-105 border-2 border-orange-200 dark:border-orange-800'
                    : 'bg-white/60 dark:bg-gray-800/60 shadow-soft hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{type.description}</p>
                
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Registration Form */}
        {currentType && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-soft border border-white/20 dark:border-gray-700/50 p-8 md:p-12 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${currentType.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <currentType.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Create {currentType.title} Account
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{currentType.description}</p>
            </div>

            <form className="space-y-6">
              {currentType.fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="mt-2 input-enhanced"
                  />
                </div>
              ))}

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${currentType.color} hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300`}
                onClick={() => handleRegister(currentType.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Create {currentType.title} Account
                  </div>
                )}
              </Button>
            </form>

            {/* Benefits Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">
                Why Choose SmartShop?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="text-orange-500">{benefit.icon}</div>
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-orange-600 hover:underline font-semibold inline-flex items-center gap-1">
                  Sign in <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
