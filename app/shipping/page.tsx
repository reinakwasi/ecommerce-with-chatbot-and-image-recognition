"use client";
import { Mail, Truck, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Truck className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Shipping Information</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Fast, reliable delivery across Ghana and beyond.</p>
          </div>
        </div>
      </section>

      {/* Delivery Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Standard Delivery</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">2-5 business days, affordable rates, and real-time tracking.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Express Delivery</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">1-2 business days for urgent orders—get it fast!</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Free Shipping</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">Enjoy free shipping on orders over GHS 500.</p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How Shipping Works</h2>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
            <li>Place your order and choose your preferred shipping method at checkout.</li>
            <li>Receive a confirmation email with your tracking number.</li>
            <li>Track your order in real time from your dashboard or via email updates.</li>
            <li>Enjoy fast, secure delivery to your doorstep.</li>
          </ol>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Questions about shipping?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Our support team is here to help you with any delivery questions.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-2">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300"><Mail className="w-5 h-5" /> support@aicommerce.com</div>
          </div>
          <Link href="/help" className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 flex items-center gap-2">Go to Help Center <HelpCircle className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  );
} 