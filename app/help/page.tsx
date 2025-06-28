"use client";
import { Mail, Phone, HelpCircle, ArrowRight, Undo2, Truck, Shield, Navigation } from "lucide-react";
import Link from "next/link";
import { Navigation as NavComponent } from "@/components/navigation";

const faqs = [
  { q: "How do I track my order?", a: "Go to your dashboard and view your recent orders for tracking info." },
  { q: "How do I contact support?", a: "You can email us at support@smartshop.com or call +233 595 354 747." },
  { q: "How do I return a product?", a: "Visit the Returns page for our easy return process." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, mobile money, and bank transfers." },
  { q: "How long does shipping take?", a: "Standard delivery takes 2-5 business days within Ghana." },
  { q: "Do you ship internationally?", a: "Yes! We ship to most countries worldwide." },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-orange-500 to-amber-500 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <HelpCircle className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Help Center</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Find answers, get support, and make the most of your SmartShop experience.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/returns" className="group bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Undo2 className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Returns & Refunds</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">
              Easy returns and fast refunds for your peace of mind.
            </p>
            <span className="text-orange-600 font-medium flex items-center gap-1 group-hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link href="/shipping" className="group bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Truck className="w-10 h-10 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Shipping Info</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">
              Fast, reliable delivery across Ghana and beyond.
            </p>
            <span className="text-orange-600 font-medium flex items-center gap-1 group-hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <Link href="/privacy" className="group bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Shield className="w-10 h-10 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Privacy Policy</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">
              Your data is safe, secure, and always in your control.
            </p>
            <span className="text-orange-600 font-medium flex items-center gap-1 group-hover:underline">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-lg mb-2 text-orange-700 dark:text-orange-300">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our friendly support team is here for you. Reach out and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-4">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <Mail className="w-5 h-5" /> support@smartshop.com
            </div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Phone className="w-5 h-5" /> +233 595 354 747
            </div>
          </div>
          <Link href="/contact" className="btn-primary px-8 py-3">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 