// Shared flash sale data
export const FLASH_SALE_END_TIME = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

export const FLASH_SALE_DATA = {
  id: "flash-sale-1", // Unique ID to avoid conflicts
  name: "iPhone 15 Pro Max - Flash Sale",
  originalPrice: 1299,
  currentPrice: 899,
  discount: 31,
  image: "/phones and accessories/iphone 15 pro max.webp",
  category: "Phones and Accessories",
  endTime: FLASH_SALE_END_TIME,
  type: "flash",
  stock: 15,
  sold: 8,
  rating: 4.8,
  reviews: 1247,
  features: ["5G Ready", "Pro Camera", "A17 Pro Chip"],
  urgency: "high",
  badge: "FLASH SALE",
  badgeColor: "from-red-500 to-pink-500"
}; 