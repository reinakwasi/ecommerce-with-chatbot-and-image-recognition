import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
      <div className="container-responsive">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SmartShop</span>
            </div>
            <p className="text-gray-400">Smart shopping made simple and enjoyable for everyone.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/auth/register?seller=1" className="hover:text-white transition-colors">Become a Seller</Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-white transition-colors">Seller Dashboard</Link>
              </li>
              <li>
                <Link href="/seller/help" className="hover:text-white transition-colors">Seller Help</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">Returns</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SmartShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 