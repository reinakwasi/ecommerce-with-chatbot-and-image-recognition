import React from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type Category = {
  name: string;
  slug: string;
  image: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  products: Product[];
};

export default function CategoryModal({ open, onClose, category, products }: Props) {
  if (!open || !category) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Featured in {category.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {products.map(product => (
            <div key={product.id} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <Image src={product.image} alt={product.name} width={100} height={100} className="rounded mb-2 object-cover" />
              <div className="font-medium text-center">{product.name}</div>
              <div className="text-indigo-600 font-bold">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <Link
          href={`/categories/${category.slug}`}
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          View All {category.name}
        </Link>
      </div>
    </div>
  );
} 