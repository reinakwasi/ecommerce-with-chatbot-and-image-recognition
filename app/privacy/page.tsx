"use client";
import { Mail, Shield, HelpCircle, Navigation } from "lucide-react";
import Link from "next/link";
import { Navigation as NavComponent } from "@/components/navigation";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavComponent />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Shield className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Your privacy is our priority. Learn how we protect and use your data.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">Data Security</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              Your data is encrypted and stored securely at all times.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">User Control</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              You can request to view or delete your data at any time.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="font-semibold text-lg mb-2">No Data Selling</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              We never sell your data to third parties. Your trust matters.
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Privacy Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  We collect only the information needed to provide and improve our services.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  We use cookies to enhance your experience and analyze site usage.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  You can opt out of marketing communications at any time.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  For questions or requests, contact our privacy team below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Questions about privacy?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We're here to help you understand and control your data.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-4">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
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