"use client";
import { Mail, Undo2, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Undo2 className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Returns & Refunds</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Easy returns, fast refunds, and peace of mind for every order.</p>
          </div>
        </div>
      </section>

      {/* Policy Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">14-Day Returns</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">Return most items within 14 days for a full refund or exchange.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Fast Refunds</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">Refunds processed within 5 business days after we receive your return.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Hassle-Free Process</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">Contact us, send your item, and get your money back—simple as that.</p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Return an Item</h2>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
            <li>Contact our support team at <span className="text-pink-600 font-medium">support@aicommerce.com</span> before returning any item.</li>
            <li>Pack your item securely in the original packaging.</li>
            <li>Ship the item to the address provided by our support team.</li>
            <li>Once received, we'll process your refund or exchange within 5 business days.</li>
          </ol>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Need help with a return?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Our support team is here to help you every step of the way.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-2">
            <div className="flex items-center gap-2 text-pink-700 dark:text-pink-300"><Mail className="w-5 h-5" /> support@aicommerce.com</div>
          </div>
          <Link href="/help" className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 flex items-center gap-2">Go to Help Center <HelpCircle className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  );
} 