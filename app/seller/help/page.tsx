"use client";
import { Mail, Phone, HelpCircle, ArrowRight, BarChart3, Plus, Store } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I start selling?",
    a: "Register as a seller using the 'Become a Seller' page. Once approved, you can list your products and manage your store from the Seller Dashboard."
  },
  {
    q: "How do I get paid?",
    a: "Payouts are processed weekly to your registered bank account. You can track your earnings in the Seller Dashboard."
  },
  {
    q: "Who do I contact for support?",
    a: "Our dedicated seller support team is here to help you. See contact info below."
  },
];

export default function SellerHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white text-center shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <HelpCircle className="w-14 h-14 mb-2 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Seller Help</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Resources, answers, and support for our valued sellers.</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/auth/register?seller=1" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <Plus className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Become a Seller</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Join our marketplace and grow your business.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Get started <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/seller/dashboard" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <BarChart3 className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Seller Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Manage products, orders, and track your performance.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Go to dashboard <ArrowRight className="w-4 h-4" /></span>
          </Link>
          <Link href="/contact" className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <Store className="w-10 h-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-semibold text-lg mb-1">Contact Seller Support</h2>
            <p className="text-gray-500 dark:text-gray-300 text-center mb-2">Need help? Our team is here for you.</p>
            <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:underline">Contact us <ArrowRight className="w-4 h-4" /></span>
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
          <p className="text-gray-700 dark:text-gray-300 mb-4">Our dedicated seller support team is ready to assist you.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300"><Mail className="w-5 h-5" /> sellersupport@aicommerce.com</div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300"><Phone className="w-5 h-5" /> +233 555 123 456</div>
          </div>
          <Link href="/contact" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">Contact Us</Link>
        </div>
      </section>
    </div>
  );
} 