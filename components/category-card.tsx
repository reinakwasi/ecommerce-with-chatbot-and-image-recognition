import Link from "next/link";
import Image from "next/image";
import React from "react";

type Category = {
  name: string;
  slug: string;
  image: string;
};

type Props = {
  category: Category;
  onPreview?: (category: Category) => void;
};

export default function CategoryCard({ category, onPreview }: Props) {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white dark:bg-gray-900 cursor-pointer">
      <Link href={`/categories/${category.slug}`} className="block w-full h-48">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
          <span className="text-lg font-semibold text-white p-4 w-full text-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all">{category.name}</span>
        </div>
      </Link>
      {onPreview && (
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onPreview(category);
          }}
          className="absolute top-3 right-3 z-10 px-3 py-1 bg-white/80 text-gray-900 rounded shadow hover:bg-white font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Preview
        </button>
      )}
    </div>
  );
} 