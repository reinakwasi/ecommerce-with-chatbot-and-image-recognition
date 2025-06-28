"use client";
import Image from "next/image";
import { Sparkles, Bot, Search, Zap, Users, TrendingUp, ShoppingCart, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, ShoppingBag, Heart, Truck, Gift } from "lucide-react"
import Link from "next/link"

const team = [
  { name: "Alex Kim", role: "Founder & CEO", img: "/placeholder-user.jpg" },
  { name: "Priya Patel", role: "Lead AI Engineer", img: "/placeholder-user.jpg" },
  { name: "Maria Garcia", role: "Product Designer", img: "/placeholder-user.jpg" },
  { name: "James Lee", role: "Full Stack Developer", img: "/placeholder-user.jpg" },
];

const stats = [
  { label: "Happy Customers", value: "50K+", icon: Users },
  { label: "Products Available", value: "100K+", icon: ShoppingBag },
  { label: "Customer Satisfaction", value: "99.9%", icon: TrendingUp },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do, ensuring you have the best shopping experience possible."
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your security is our priority. We use industry-leading protection to keep your information safe."
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    description: "Quick delivery and reliable service. We get your products to you when you need them."
  },
  {
    icon: Gift,
    title: "Great Deals",
    description: "We work hard to bring you the best prices and exclusive offers on quality products."
  }
]

const features = [
  {
    icon: Zap,
    title: "Smart Search",
    description: "Find exactly what you're looking for with our intelligent search that understands what you want."
  },
  {
    icon: Heart,
    title: "Personalized Recommendations",
    description: "Get product suggestions tailored just for you based on your preferences and shopping history."
  },
  {
    icon: Users,
    title: "Friendly Assistance",
    description: "Our helpful shopping assistant is here to help you find the best deals and answer your questions."
  },
  {
    icon: Star,
    title: "Quality Guarantee",
    description: "Every product is carefully selected and quality-checked to ensure you get the best value."
  }
]

const timeline = [
  { year: "2022", event: "We dreamed of making online shopping easier and more fun for everyone." },
  { year: "2023", event: "We built our first version and started helping people find great products." },
  { year: "2024", event: "We launched new features like smart deals and a helpful shopping assistant." },
  { year: "Future", event: "We want to bring even more helpful tools and reach shoppers everywhere!" },
];

const faqs = [
  { q: "What makes SmartShop different?", a: "We help you find the best products and deals, just for you. Our smart features make shopping easy and fun!" },
  { q: "Is my information safe?", a: "Yes! We keep your details private and never share them with anyone else." },
  { q: "How do I get a better price?", a: "Look out for our special offers and daily deals. You can also chat with our assistant for tips!" },
  { q: "How can I get help?", a: "You can contact us anytime through our website or live chat. We're always happy to help!" },
];

const testimonials = [
  { name: "Sarah Johnson", quote: "SmartShop found me the perfect phone at a great price! The negotiation feature was so easy.", img: "/placeholder-user.jpg" },
  { name: "David Kim", quote: "I love the smart search and flash deals. Shopping here feels effortless!", img: "/placeholder-user.jpg" },
  { name: "Emily Chen", quote: "Customer support was super helpful and the delivery was fast. Highly recommend!", img: "/placeholder-user.jpg" },
];

const partners = [
  { name: "TechBrand", logo: "/placeholder-logo.png" },
  { name: "ShopEase", logo: "/placeholder-logo.png" },
  { name: "SmartGadgets", logo: "/placeholder-logo.png" },
  { name: "FashionPro", logo: "/placeholder-logo.png" },
  { name: "HomePlus", logo: "/placeholder-logo.png" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            About SmartShop
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're on a mission to make shopping simple, fun, and rewarding. 
            Our smart platform helps you discover amazing products and get the best deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="btn-primary">
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              SmartShop was born from a simple idea: shopping should be easy, enjoyable, and rewarding. 
              We believe everyone deserves to find great products at great prices without the hassle.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today, we're proud to serve thousands of happy customers with our smart shopping platform 
              that combines technology with human touch to create the best shopping experience possible.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These principles guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Special</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Smart features that make shopping better
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Real stories from real customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Everything you need to know about SmartShop
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Trusted brands we work with
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 mx-auto opacity-60 hover:opacity-100 transition-opacity"
                />
                <p className="text-sm text-gray-500 mt-2">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who love our smart shopping experience
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Shopping Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s both; }
        .animate-fadeInUp { animation: fadeIn 0.7s both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
} 