"use client";
import { Mail, Phone, HelpCircle, ArrowRight, Undo2, Truck, Shield } from "lucide-react";
import Link from "next/link";

const faqs = [
  { q: "How do I track my order?", a: "Go to your dashboard and view your recent orders for tracking info." },
  { q: "How do I contact support?", a: "You can email us at support@aicommerce.com or call +233 595 354 747." },
  { q: "How do I return a product?", a: "Visit the Returns page for our easy return process." },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <HelpCircle className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Help Center</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Find answers, get support, and make the most of your AI Commerce experience.</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/returns" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <Undo2 className="w-10 h-10 text-pink-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Returns & Refunds</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Easy returns and fast refunds for your peace of mind.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Learn more <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/shipping" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <Truck className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Shipping Info</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Fast, reliable delivery across Ghana and beyond.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Learn more <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/privacy" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <Shield className="w-10 h-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Privacy Policy</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Your data is safe, secure, and always in your control.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Learn more <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="mb-6">
                <h3 className="font-semibold text-lg mb-1">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Our friendly support team is here for you. Reach out and we'll get back to you as soon as possible.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300"><Mail className="w-5 h-5" /> support@aicommerce.com</div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300"><Phone className="w-5 h-5" /> +233 595 354 747</div>
          </div>
          <Link href="/contact" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">Contact Us</Link>
        </div>
      </section>
    </div>
  );
} 