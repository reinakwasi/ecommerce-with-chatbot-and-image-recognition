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
  { icon: <Bot className="w-8 h-8 text-blue-600" />, title: "AI-Powered Shopping", desc: "Personalized recommendations and smart price negotiation." },
  { icon: <Search className="w-8 h-8 text-purple-600" />, title: "Visual & Smart Search", desc: "Find products by text or image instantly." },
  { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Flash Deals & Bargains", desc: "Exclusive deals, flash sales, and AI-powered price drops." },
  { icon: <Shield className="w-8 h-8 text-green-600" />, title: "Secure & Trusted", desc: "Bank-level security and trusted sellers." },
  { icon: <ShoppingCart className="w-8 h-8 text-pink-600" />, title: "Seamless Shopping", desc: "Easy checkout, fast delivery, and real-time order tracking." },
  { icon: <Star className="w-8 h-8 text-yellow-400" />, title: "Top-Rated Support", desc: "24/7 customer support and satisfaction guarantee." },
];

const timeline = [
  { year: "2022", event: "Idea for an AI-driven e-commerce platform is born." },
  { year: "2023", event: "Prototype launched with smart search and recommendations." },
  { year: "2024", event: "Full platform launch with AI bargaining, flash sales, and more." },
  { year: "Future", event: "Expanding to global markets and new AI features." },
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