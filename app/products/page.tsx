"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Grid, List, Heart, ShoppingCart, Search, ArrowLeft, Filter, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ProductGrid } from "@/components/product-grid"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  brand: string
  inStock: boolean
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const brand = searchParams.get("brand") || ""

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our complete collection of premium products with AI-powered recommendations and smart filtering
            </p>
            {searchQuery && (
              <div className="mt-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Search Results for: "{searchQuery}"
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ProductGrid 
          searchQuery={searchQuery}
          category={category}
          brand={brand}
        />
      </div>
    </div>
  )
}
