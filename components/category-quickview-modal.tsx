import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  description?: string;
};

type Category = {
  name: string;
  icon: string;
  desc: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  products: Product[];
};

export default function CategoryQuickViewModal({ open, onClose, category, products }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-fadeInUp flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h2 className="text-2xl font-bold">{category.name}</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-300 mb-4">{category.desc}</p>
        {/* Carousel */}
        <div className="overflow-x-auto flex gap-6 pb-2 mb-6 -mx-2 px-2">
          {products.length === 0 && <div className="text-center text-gray-400">No products found.</div>}
          {products.map(product => (
            <div key={product.id} className="min-w-[220px] max-w-[240px] bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow group transition-transform hover:scale-105">
              <Image src={product.image} alt={product.name} width={120} height={120} className="rounded mb-2 object-cover" />
              <div className="font-semibold text-center mb-1">{product.name}</div>
              <div className="text-indigo-600 font-bold mb-1">${product.price.toFixed(2)}</div>
              {product.rating && (
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              )}
              {product.description && (
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-2 text-center line-clamp-2">{product.description}</div>
              )}
              <div className="flex gap-2 mt-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded text-xs font-semibold transition">
                  <Heart className="w-4 h-4" /> Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/products?category=${encodeURIComponent(category.name)}`}
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition mt-auto"
        >
          View All {category.name}
        </Link>
      </div>
    </div>
  );
} 