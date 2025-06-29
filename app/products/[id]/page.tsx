"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, Heart, ShoppingCart, MessageCircle, CheckCircle, Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getProductById } from "@/lib/products"
import { ProductRecommendations } from "@/components/product-recommendations"
import { BargainingChatbot } from "@/components/bargaining-chatbot"
import { Navigation } from "@/components/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showChatbot, setShowChatbot] = useState(false)
  const { toast } = useToast()

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
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
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
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Image Display */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              
              {/* Live Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-blue-500 text-white">
                    New
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Purchase
                </Badge>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-orange-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {product.originalPrice && (
                <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                  Save {calculateDiscount(product.originalPrice, product.price)}%
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowChatbot(true)}
                  className="border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Bargain
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-orange-100 dark:bg-orange-900/20">
              <TabsTrigger value="description" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Product Details</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>Brand: {product.brand}</li>
                        <li>Category: {product.category}</li>
                        <li>Material: Premium Quality</li>
                        <li>Warranty: 1 Year</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Info</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>Free Shipping</li>
                        <li>2-3 Business Days</li>
                        <li>30-Day Returns</li>
                        <li>Secure Packaging</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Overall Rating */}
                    <div className="text-center border-b pb-6">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-2xl font-bold">{product.rating}/5</p>
                      <p className="text-gray-600">Based on {product.reviewCount} reviews</p>
                    </div>

                    {/* Customer Reviews */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">What customers are saying:</h3>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Sarah M.</span>
                          </div>
                          <p className="text-gray-700">"Absolutely love this product! The quality is amazing and it exceeded my expectations. Fast shipping too!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Mike R.</span>
                          </div>
                          <p className="text-gray-700">"Great value for money. The product is well-made and the customer service was excellent when I had questions."</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Jennifer L.</span>
                          </div>
                          <p className="text-gray-700">"Perfect fit and exactly as described. I'm very happy with my purchase and would definitely recommend to others!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">David K.</span>
                          </div>
                          <p className="text-gray-700">"Solid product with good quality. The color is exactly as shown in the pictures. Would buy again!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Emma T.</span>
                          </div>
                          <p className="text-gray-700">"This exceeded all my expectations! The material feels premium and it's so comfortable. Best purchase I've made this year!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Alex P.</span>
                          </div>
                          <p className="text-gray-700">"It's okay for the price. The quality is decent but not outstanding. Shipping was fast though."</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Lisa W.</span>
                          </div>
                          <p className="text-gray-700">"Incredible quality! I've been using this for months and it still looks brand new. Highly recommend!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Robert H.</span>
                          </div>
                          <p className="text-gray-700">"Good product overall. The size fits perfectly and the material is comfortable. Great for daily use."</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Maria S.</span>
                          </div>
                          <p className="text-gray-700">"Absolutely stunning! The design is beautiful and the craftsmanship is top-notch. Worth every penny!"</p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">Tom B.</span>
                          </div>
                          <p className="text-gray-700">"Very satisfied with this purchase. The product arrived on time and in perfect condition. Good value for money."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Product Recommendations */}
        <div className="mt-12">
          <ProductRecommendations currentProductId={productId} />
        </div>
      </div>

      {/* Bargaining Chatbot */}
      <BargainingChatbot 
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        product={product}
      />
    </div>
  )
}
