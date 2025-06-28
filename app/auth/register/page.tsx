"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, User, Store, Shield, ArrowRight, Bot, Star, Lock, TrendingUp, CheckCircle, Check } from "lucide-react"
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
        description: `Welcome to AI Commerce as a ${userType}!`,
      })
    }, 2000)
  }

  const benefits = [
    { icon: <Bot className="w-5 h-5" />, text: "AI Shopping Assistant" },
    { icon: <Star className="w-5 h-5" />, text: "Personalized Recommendations" },
    { icon: <Lock className="w-5 h-5" />, text: "Bank-level Security" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Smart Deals & Savings" },
  ]

  const userTypes = [
    {
      id: "customer",
      title: "Customer",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      description: "Shop smarter with AI-powered recommendations",
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
      description: "Start selling and grow your business with AI tools",
      fields: [
        { name: "businessName", label: "Business Name", type: "text", placeholder: "Enter your business name" },
        { name: "contactPerson", label: "Contact Person", type: "text", placeholder: "Enter contact person name" },
        { name: "email", label: "Business Email", type: "email", placeholder: "Enter business email" },
        { name: "taxId", label: "Tax ID", type: "text", placeholder: "Enter your tax ID" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a strong password" }
      ]
    },
    {
      id: "admin",
      title: "Admin",
      icon: Shield,
      color: "from-purple-500 to-pink-500",
      description: "Platform management and user support",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
        { name: "adminCode", label: "Admin Code", type: "text", placeholder: "Enter admin access code" },
        { name: "password", label: "Password", type: "password", placeholder: "Create a strong password" }
      ]
    }
  ]

  const currentType = userTypes.find(type => type.id === selectedType)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">AI Commerce</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your account type and join thousands of users experiencing the future of shopping
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
                    ? 'bg-white dark:bg-gray-800 shadow-2xl scale-105 border-2 border-teal-200 dark:border-teal-800'
                    : 'bg-white/60 dark:bg-gray-800/60 shadow-lg hover:shadow-xl hover:scale-102'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{type.description}</p>
                
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Registration Form */}
        {currentType && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 md:p-12 max-w-2xl mx-auto">
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
                    className="mt-2 border-gray-200 dark:border-gray-600 focus:border-teal-500 dark:focus:border-teal-400"
                  />
                </div>
              ))}

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  I agree to the{" "}
                  <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-medium">
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

            {/* Admin Warning */}
            {currentType.id === "admin" && (
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Admin accounts require approval. Please contact support for access.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link 
              href="/auth/login" 
              className="text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
