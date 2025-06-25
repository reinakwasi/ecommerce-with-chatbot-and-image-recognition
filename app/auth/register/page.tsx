"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, User, Store, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Commerce
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Join the Future</h1>
          <p className="text-gray-600 dark:text-gray-300">Create your account and experience next-gen shopping</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Choose your account type to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer
                </TabsTrigger>
                <TabsTrigger value="seller" className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Seller
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Full Name</Label>
                  <Input id="customer-name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input id="customer-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input id="customer-password" type="password" placeholder="Create a password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-phone">Phone Number</Label>
                  <Input id="customer-phone" placeholder="Enter your phone number" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="customer-terms" />
                  <Label htmlFor="customer-terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => handleRegister("customer")}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Customer Account"}
                </Button>
              </TabsContent>

              <TabsContent value="seller" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="seller-business">Business Name</Label>
                  <Input id="seller-business" placeholder="Enter your business name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-name">Contact Person</Label>
                  <Input id="seller-name" placeholder="Enter contact person name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-email">Business Email</Label>
                  <Input id="seller-email" type="email" placeholder="Enter business email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-password">Password</Label>
                  <Input id="seller-password" type="password" placeholder="Create a password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-tax">Tax ID</Label>
                  <Input id="seller-tax" placeholder="Enter your tax ID" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="seller-terms" />
                  <Label htmlFor="seller-terms" className="text-sm">
                    I agree to the Seller Agreement and Terms of Service
                  </Label>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => handleRegister("seller")}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Seller Account"}
                </Button>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4 mt-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Admin accounts require approval. Please contact support for access.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input id="admin-name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-code">Admin Code</Label>
                  <Input id="admin-code" placeholder="Enter admin access code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input id="admin-password" type="password" placeholder="Create a password" />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                  onClick={() => handleRegister("admin")}
                  disabled={isLoading}
                >
                  {isLoading ? "Requesting Access..." : "Request Admin Access"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
