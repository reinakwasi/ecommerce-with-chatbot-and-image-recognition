"use client";
import { Mail, Undo2, ArrowRight, HelpCircle, Navigation, Clock, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { Navigation as NavComponent } from "@/components/navigation";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-orange-500 to-amber-500 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Undo2 className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Returns & Refunds</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Easy returns, fast refunds, and peace of mind for every order.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">14-Day Returns</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Return most items within 14 days for a full refund or exchange.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Fast Refunds</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Refunds processed within 5 business days after we receive your return.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Hassle-Free Process</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Contact us, send your item, and get your money back—simple as that.
            </p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Return an Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Contact our support team at{' '}
                  <span className="text-orange-600 font-medium">support@smartshop.com</span> before returning any item.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Pack your item securely in the original packaging.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Ship the item to the address provided by our support team.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Once received, we'll process your refund or exchange within 5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Policy Details */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Return Policy Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">What can be returned?</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Items in original condition</li>
                  <li>• Unused products with tags</li>
                  <li>• Defective items</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">What cannot be returned?</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Used or damaged items</li>
                  <li>• Personal care products</li>
                  <li>• Digital downloads</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Refund Methods</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Original payment method</li>
                  <li>• Store credit</li>
                  <li>• Exchange for different item</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Shipping Costs</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Free returns for defective items</li>
                  <li>• Customer pays for change of mind</li>
                  <li>• We cover return shipping for errors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Need help with a return?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our support team is here to help you every step of the way.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-4">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
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