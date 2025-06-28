"use client";
import { Mail, Truck, ArrowRight, HelpCircle, Navigation, Clock, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { Navigation as NavComponent } from "@/components/navigation";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Truck className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Shipping Information</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Fast, reliable delivery across Ghana and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Standard Delivery</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              2-5 business days, affordable rates, and real-time tracking.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Express Delivery</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              1-2 business days for urgent orders—get it fast!
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Free Shipping</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Enjoy free shipping on orders over GHS 500.
            </p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How Shipping Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Place your order and choose your preferred shipping method at checkout.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Receive a confirmation email with your tracking number.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Track your order in real time from your dashboard or via email updates.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Enjoy fast, secure delivery to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Zones */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Shipping Zones & Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Greater Accra</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">GHS 15 - 2-3 days</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Other Regions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">GHS 25 - 3-5 days</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-teal-50 dark:bg-teal-900/20">
              <MapPin className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">International</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Varies - 7-14 days</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Questions about shipping?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our support team is here to help you with any delivery questions.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Mail className="w-5 h-5" /> support@smartshop.com
            </div>
          </div>
          <Link href="/help" className="btn-primary px-8 py-3 flex items-center gap-2">
            Go to Help Center <HelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
} 