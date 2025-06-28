"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Camera, Loader2, Sparkles, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SmartSearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    toast({
      title: "Searching...",
      description: `Looking for "${searchQuery}"`,
    })

    // Simulate search
    setTimeout(() => {
      toast({
        title: "Search complete!",
        description: `Found products matching "${searchQuery}"`,
      })
    }, 2000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      setIsAnalyzing(true)

      // Simulate image analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        toast({
          title: "Image analyzed!",
          description: "Found similar products based on your image",
        })
      }, 3000)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
    setIsAnalyzing(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-0 shadow-soft bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <CardContent className="p-6">
          {/* Text Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg input-enhanced"
                />
              </div>
              <Button type="submit" className="btn-primary px-8">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Visual Search */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Or search with a photo</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload an image to find similar products
              </p>
            </div>

            {uploadedImage && (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analyzing your image...</h3>
                  <p className="text-gray-500">Finding products that match your photo</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Visual Search</h3>
                  <p className="text-gray-500 mb-4">Drag and drop an image here, or click to upload</p>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

            {/* Features Info */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Smart recognition
              </span>
              <span>•</span>
              <span>Instant product matching</span>
              <span>•</span>
              <span>Price comparison</span>
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Popular searches:</h4>
            <div className="flex flex-wrap gap-2">
              {["Smartphones", "Laptops", "Headphones", "Shoes", "Dresses", "Watches"].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(term)}
                  className="text-xs hover:bg-orange-50 hover:border-orange-300"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
