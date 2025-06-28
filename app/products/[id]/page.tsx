"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { 
  Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft, Sparkles, 
  MessageCircle, Users, Eye, Share2, Camera, Zap, Target, Award, Crown,
  Volume2, VolumeX, Play, Pause, Maximize2, Minimize2, RotateCw, Palette,
  Ruler, Smartphone, Users2, Gift, Clock, TrendingUp, ThumbsUp, ThumbsDown,
  MessageSquare, Video, Image as ImageIcon, Settings, Palette as PaletteIcon,
  Shirt, Shoe, Watch, Smartphone as PhoneIcon, Zap as ZapIcon, Target as TargetIcon,
  CheckCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { ProductRecommendations } from "@/components/product-recommendations"
import { BargainingChatbot } from "@/components/bargaining-chatbot"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showChatbot, setShowChatbot] = useState(false)
  const [viewMode, setViewMode] = useState("2D") // 2D, 3D, AR
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [showAR, setShowAR] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [liveViewers, setLiveViewers] = useState(0)
  const [userPoints, setUserPoints] = useState(1250)
  const [productRating, setProductRating] = useState(0)
  const [showCustomization, setShowCustomization] = useState(false)
  const [customizationOptions, setCustomizationOptions] = useState({
    color: "#FF6B35",
    size: "M",
    pattern: "solid",
    embroidery: ""
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Mock live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(Math.floor(Math.random() * 50) + 10)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // 3D Canvas Animation
  useEffect(() => {
    if (viewMode === "3D" && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      let rotation = 0
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw 3D product representation
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(rotation)
        
        // Draw product shape
        ctx.fillStyle = '#FF6B35'
        ctx.fillRect(-50, -50, 100, 100)
        
        // Add shadows and highlights
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(-45, -45, 90, 90)
        
        ctx.restore()
        
        rotation += 0.02
        requestAnimationFrame(animate)
      }
      
      animate()
    }
  }, [viewMode])

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setTimeout(() => {
        const foundProduct = getProductById(productId)
        setProduct(foundProduct)
        setIsLoading(false)
      }, 500)
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    })
    // Award points for purchase
    setUserPoints(prev => prev + 50)
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
    setUserPoints(prev => prev + 10)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-orange-400"></div>
          </div>
          <p className="text-white text-lg">Loading amazing product experience...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Product not found</h2>
          <p className="text-xl mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-white text-orange-600 hover:bg-orange-50">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Live Shopping Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">LIVE NOW: {liveViewers} people viewing this product</span>
          <button 
            onClick={() => setShowLiveChat(!showLiveChat)}
            className="bg-white/20 px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-colors"
          >
            Join Chat
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-white/80 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Visualization */}
          <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1">
                <button
                  onClick={() => setViewMode("2D")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    viewMode === "2D" 
                      ? "bg-white text-orange-600 shadow-lg" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  2D
                </button>
                <button
                  onClick={() => setViewMode("3D")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    viewMode === "3D" 
                      ? "bg-white text-orange-600 shadow-lg" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <RotateCw className="w-4 h-4 inline mr-1" />
                  3D
                </button>
                <button
                  onClick={() => setShowAR(!showAR)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    showAR 
                      ? "bg-white text-orange-600 shadow-lg" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Camera className="w-4 h-4 inline mr-1" />
                  AR
                </button>
              </div>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Product Display */}
            <div className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl ${
              isFullscreen ? 'fixed inset-0 z-50' : 'relative'
            }`}>
              {viewMode === "2D" && (
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                      fill
                      className="object-cover"
              />
              
                    {/* AR Try-On Overlay */}
                    {showAR && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Camera className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                          <p className="text-lg font-medium">Point camera at yourself</p>
                          <p className="text-sm opacity-80">Try on this product virtually</p>
              </div>
                </div>
              )}
            </div>

                  {/* Image Gallery */}
            {product.images.length > 1 && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900">
                      <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                                ? "border-orange-500 scale-105"
                                : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                              width={150}
                              height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "3D" && (
                <div className="aspect-square relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-xs text-gray-600">Drag to rotate • Scroll to zoom</p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Customization */}
            {showCustomization && (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PaletteIcon className="w-5 h-5" />
                    Customize Your Product
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Color</label>
                    <div className="flex gap-2 mt-2">
                      {['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setCustomizationOptions(prev => ({ ...prev, color }))}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            customizationOptions.color === color ? 'border-orange-500 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Size</label>
                    <div className="flex gap-2 mt-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setCustomizationOptions(prev => ({ ...prev, size }))}
                          className={`px-3 py-1 rounded border transition-all ${
                            customizationOptions.size === size 
                              ? 'border-orange-500 bg-orange-50 text-orange-600' 
                              : 'border-gray-300 hover:border-orange-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Gamification Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">{userPoints} points</span>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
              </div>
              
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <span className="text-white/80">
                  ({product.reviews} reviews)
                </span>
                <div className="flex items-center gap-1 text-green-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{liveViewers} viewing</span>
                </div>
              </div>
            </div>

            {/* Price with Dynamic Updates */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-white/60 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                      {calculateDiscount(product.originalPrice, product.price)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-white/80">
                  You save {formatPrice(product.originalPrice - product.price)}!
                </p>
              )}
              
              {/* Live Price Alert */}
              <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-500/30">
                <div className="flex items-center gap-2 text-green-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Price dropped 15% in the last hour!</span>
                </div>
              </div>
            </div>

            {/* Interactive Features */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowCustomization(!showCustomization)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Palette className="w-4 h-4 mr-2" />
                Customize
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                onClick={() => setShowChatbot(!showChatbot)}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>

            {/* Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Description</h3>
              <p className="text-white/80">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-white/20 text-white hover:bg-white/10"
                >
                  -
                </Button>
                  <span className="text-white font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                    variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                    className="border-white/20 text-white hover:bg-white/10"
                >
                  +
                </Button>
              </div>
            </div>

              <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                  onClick={handleAddToWishlist}
                variant="outline"
                  size="icon"
                  className="border-white/20 text-white hover:bg-white/10 w-12 h-12"
              >
                <Heart className="w-5 h-5" />
              </Button>
              </div>
            </div>

            {/* Social Proof */}
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Recent Activity</h4>
                  <span className="text-white/60 text-sm">Live</span>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Sarah from New York just purchased this</span>
              </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Mike added this to his wishlist</span>
              </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Emma left a 5-star review</span>
              </div>
            </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/20">
              <TabsTrigger value="details" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                Shipping
              </TabsTrigger>
              <TabsTrigger value="support" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Product Features</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Premium quality materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Comfortable fit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Durable construction
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <div className="space-y-2 text-white/80">
                    <div className="flex justify-between">
                      <span>Material:</span>
                      <span>Premium Cotton</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Care:</span>
                      <span>Machine Washable</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Origin:</span>
                      <span>Made in USA</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6 text-white">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <div className="text-sm text-white/60">{product.reviews} reviews</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars}★</span>
                          <Progress value={Math.random() * 100} className="flex-1 h-2" />
                          <span className="text-sm text-white/60 w-12">{Math.floor(Math.random() * 50)}%</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6 text-white">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Free Shipping</span>
                  </div>
                  <p className="text-white/80">Free standard shipping on orders over $50</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">Fast Delivery</span>
                  </div>
                  <p className="text-white/80">Get it in 2-3 business days</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="mt-6 text-white">
                  <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">30-Day Return Policy</span>
                    </div>
                  <p className="text-white/80">Not satisfied? Return within 30 days for a full refund</p>
                    </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold">24/7 Support</span>
                  </div>
                  <p className="text-white/80">Get help anytime with our live chat support</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <ProductRecommendations currentProductId={productId} />
        </div>
      </div>

      {/* Live Chat Overlay */}
      {showLiveChat && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border z-50">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Live Chat</h3>
              <button onClick={() => setShowLiveChat(false)} className="text-white/80 hover:text-white">
                ×
              </button>
            </div>
            <p className="text-sm opacity-80">{liveViewers} people chatting</p>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            <div className="space-y-2 text-sm">
              <div className="bg-gray-100 rounded-lg p-2">
                <span className="font-medium text-blue-600">Sarah:</span> "Love this product!"
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                <span className="font-medium text-green-600">Mike:</span> "What size should I get?"
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                <span className="font-medium text-purple-600">Emma:</span> "Just ordered! So excited!"
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Bargaining Chatbot */}
      {showChatbot && (
        <BargainingChatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  )
}
