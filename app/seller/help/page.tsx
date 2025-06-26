"use client";
import { Mail, Phone, HelpCircle } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-2xl w-full animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2"><HelpCircle className="w-7 h-7 text-blue-600" /> Seller Help</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">Find answers to common questions and get the support you need to succeed as a seller.</p>
        <div className="mb-8">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="mb-6">
              <h2 className="font-semibold text-lg mb-1">{faq.q}</h2>
              <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <h2 className="font-semibold text-lg mb-2 text-center">Need more help?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-700 dark:text-gray-200">
            <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-blue-600" /> sellersupport@aicommerce.com</div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5 text-green-600" /> +233 555 123 456</div>
          </div>
        </div>
      </div>
    </div>
  );
} 