"use client";
import Image from "next/image";
import { Sparkles, Bot, Search, Zap, Users, TrendingUp, ShoppingCart, Shield, Star } from "lucide-react";

const team = [
  { name: "Alex Kim", role: "Founder & CEO", img: "/placeholder-user.jpg" },
  { name: "Priya Patel", role: "Lead AI Engineer", img: "/placeholder-user.jpg" },
  { name: "Maria Garcia", role: "Product Designer", img: "/placeholder-user.jpg" },
  { name: "James Lee", role: "Full Stack Developer", img: "/placeholder-user.jpg" },
];

const features = [
  { icon: <Bot className="w-8 h-8 text-blue-600" />, title: "Personal Shopping Assistant", desc: "Our smart assistant helps you find what you love, just for you." },
  { icon: <Search className="w-8 h-8 text-purple-600" />, title: "Easy Search", desc: "Look for products by typing or uploading a photo—it's that simple!" },
  { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Big Savings & Special Offers", desc: "Enjoy daily deals, special discounts, and surprise price drops." },
  { icon: <Shield className="w-8 h-8 text-green-600" />, title: "Safe & Secure Shopping", desc: "Your information is always protected and private with us." },
  { icon: <ShoppingCart className="w-8 h-8 text-pink-600" />, title: "Smooth Shopping Experience", desc: "Shop easily, pay quickly, and get your order fast." },
  { icon: <Star className="w-8 h-8 text-yellow-400" />, title: "Friendly Support", desc: "Our team is here to help you anytime you need it." },
];

const timeline = [
  { year: "2022", event: "We dreamed of making online shopping easier and more fun for everyone." },
  { year: "2023", event: "We built our first version and started helping people find great products." },
  { year: "2024", event: "We launched new features like smart deals and a helpful shopping assistant." },
  { year: "Future", event: "We want to bring even more helpful tools and reach shoppers everywhere!" },
];

const faqs = [
  { q: "What makes AI Commerce different?", a: "We help you find the best products and deals, just for you. Our smart assistant makes shopping easy and fun!" },
  { q: "Is my information safe?", a: "Yes! We keep your details private and never share them with anyone else." },
  { q: "How do I get a better price?", a: "Look out for our special offers and daily deals. You can also chat with our assistant for tips!" },
  { q: "How can I get help?", a: "You can contact us anytime through our website or live chat. We're always happy to help!" },
];

const testimonials = [
  { name: "Sarah Johnson", quote: "AI Commerce found me the perfect phone at a great price! The AI negotiation was so easy.", img: "/placeholder-user.jpg" },
  { name: "David Kim", quote: "I love the smart search and flash deals. Shopping here feels futuristic!", img: "/placeholder-user.jpg" },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image src="/placeholder-logo.png" alt="AI Commerce Logo" width={80} height={80} className="mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fadeIn">About AI Commerce</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeIn delay-100">
            Revolutionizing online shopping with artificial intelligence, personalized experiences, and unbeatable deals.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">What Makes Us Unique?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={f.title} className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-6 flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="flex flex-col md:flex-row md:justify-center md:gap-12">
          {timeline.map((t, i) => (
            <div key={t.year} className="flex flex-col items-center mb-8 md:mb-0 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-2">{t.year}</div>
              <p className="text-gray-700 dark:text-gray-200 text-center max-w-xs">{t.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={member.name} className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-6 animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <Image src={member.img} alt={member.name} width={80} height={80} className="rounded-full mb-3" />
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Shopping?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Start exploring our AI-powered platform or get in touch with our team!</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">Start Shopping</a>
          <a href="/contact" className="bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">Contact Us</a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-6 animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={t.name} className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow p-6 animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <Image src={t.img} alt={t.name} width={60} height={60} className="rounded-full mb-3" />
              <p className="italic text-gray-700 dark:text-gray-200 mb-2">"{t.quote}"</p>
              <h4 className="font-semibold text-blue-600">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p, i) => (
            <div key={p.name} className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <Image src={p.logo} alt={p.name} width={80} height={80} className="mb-2" />
              <span className="text-gray-500 dark:text-gray-300 text-sm">{p.name}</span>
            </div>
          ))}
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