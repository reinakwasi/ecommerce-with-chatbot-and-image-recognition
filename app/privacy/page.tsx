"use client";
import { Mail, Shield, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-gray-700 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Shield className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Your privacy is our priority. Learn how we protect and use your data.</p>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">Data Security</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">Your data is encrypted and stored securely at all times.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">User Control</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">You can request to view or delete your data at any time.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="font-semibold text-lg mb-2">No Data Selling</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">We never sell your data to third parties. Your trust matters.</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Privacy Practices</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700 dark:text-gray-300">
            <li>We collect only the information needed to provide and improve our services.</li>
            <li>We use cookies to enhance your experience and analyze site usage.</li>
            <li>You can opt out of marketing communications at any time.</li>
            <li>For questions or requests, contact our privacy team below.</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-purple-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Questions about privacy?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">We're here to help you understand and control your data.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300"><Mail className="w-5 h-5" /> support@aicommerce.com</div>
          </div>
          <Link href="/help" className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 flex items-center gap-2">Go to Help Center <HelpCircle className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  );
} 