export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  category: string
  brand: string
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
  tags: string[]
  specifications: Record<string, string>
  aiScore?: number
  matchReason?: string
  createdAt: string // ISO date string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Men's Black Zipper Shirt",
    description: "A stylish men's black shirt with a zipper, perfect for casual or semi-formal occasions.",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "/Men/black-shirt-with-zipper.jpg",
    images: [
      "/Men/black-shirt-with-zipper.jpg",
      "/Men/blue-t-shirt.jpg",
      "/Men/grey-t-shirt.jpg",
      "/Men/purple-t-shirt.jpg",
      "/Men/teal-t-shirt.jpg"
    ],
    rating: 4.8,
    reviewCount: 1247,
    category: "Men",
    brand: "AIC Brand",
    inStock: true,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    createdAt: "2024-06-01T10:00:00Z",
    tags: ["Shirt", "Black", "Zipper", "Men"],
    specifications: {
      "Material": "Cotton Blend",
      "Color": "Black",
      "Style": "Zipper Shirt",
      "Fit": "Regular"
    }
  },
  {
    id: "2",
    name: "Men's Grey T-Shirt",
    description: "Classic men's grey t-shirt, soft and comfortable for everyday wear.",
    price: 1299.99,
    image: "/Men/grey-t-shirt.jpg",
    images: [
      "/Men/grey-t-shirt.jpg",
      "/Men/teal-t-shirt.jpg",
      "/Men/blue-t-shirt.jpg",
      "/Men/black-shirt-with-zipper.jpg",
      "/Men/purple-t-shirt.jpg"
    ],
    rating: 4.7,
    reviewCount: 892,
    category: "Men",
    brand: "AIC Brand",
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: "2024-05-28T10:00:00Z",
    tags: ["T-Shirt", "Grey", "Men"],
    specifications: {
      "Material": "Cotton",
      "Color": "Grey",
      "Style": "T-Shirt",
      "Fit": "Regular"
    }
  },
  {
    id: "3",
    name: "Men's Casual Black Jacket",
    description: "A versatile men's black jacket, ideal for layering in cool weather.",
    price: 3499.99,
    originalPrice: 3999.99,
    image: "/Men/casual men black jacket.jpg",
    images: [
      "/Men/casual men black jacket.jpg",
      "/Men/denim jeans.jpg",
      "/Men/Urban-Jeans.jpg",
      "/Men/Slate Casual Shirt.jpg",
      "/Men/grey stylish casual shirt.jpg"
    ],
    rating: 4.9,
    reviewCount: 567,
    category: "Men",
    brand: "AIC Brand",
    inStock: true,
    isFeatured: true,
    isOnSale: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Jacket", "Black", "Men"],
    specifications: {
      "Material": "Polyester",
      "Color": "Black",
      "Style": "Jacket",
      "Fit": "Regular"
    }
  },
  {
    id: "4",
    name: "Men's Grey Stylish Casual Shirt",
    description: "A modern grey casual shirt for men, perfect for both work and leisure.",
    price: 2499.99,
    image: "/Men/grey stylish casual shirt.jpg",
    images: [
      "/Men/grey stylish casual shirt.jpg",
      "/Men/Slate Casual Shirt.jpg",
      "/Men/Urban-Jeans.jpg",
      "/Men/denim jeans.jpg",
      "/Men/casual men black jacket.jpg"
    ],
    rating: 4.6,
    reviewCount: 423,
    category: "Men",
    brand: "AIC Brand",
    inStock: true,
    createdAt: "2024-04-20T10:00:00Z",
    tags: ["Shirt", "Grey", "Casual", "Men"],
    specifications: {
      "Material": "Cotton",
      "Color": "Grey",
      "Style": "Casual Shirt",
      "Fit": "Slim"
    }
  },
  {
    id: "5",
    name: "Women's Marble Fashion Wristwatch",
    description: "Elegant women's wristwatch with a marble face and modern design.",
    price: 399.99,
    originalPrice: 449.99,
    image: "/Women/Accessories/marble-fashion-wristwatch.jpg",
    images: [
      "/Women/Accessories/marble-fashion-wristwatch.jpg",
      "/Women/Accessories/necklace-detail.jpg",
      "/Women/Accessories/stacked-bracelets-set.jpg",
      "/Women/Accessories/threader-necklace-closeup.jpg",
      "/Women/Accessories/black-over-the-shoulder-bag.jpg"
    ],
    rating: 4.8,
    reviewCount: 2156,
    category: "Women",
    brand: "AIC Accessories",
    inStock: true,
    isOnSale: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Wristwatch", "Marble", "Women"],
    specifications: {
      "Material": "Stainless Steel",
      "Color": "Marble/Gold",
      "Type": "Wristwatch"
    }
  },
  {
    id: "6",
    name: "Women's Stacked Bracelets Set",
    description: "A trendy set of stacked bracelets for women, perfect for accessorizing any outfit.",
    price: 249.99,
    image: "/Women/Accessories/stacked-bracelets-set.jpg",
    images: [
      "/Women/Accessories/stacked-bracelets-set.jpg",
      "/Women/Accessories/necklace-detail.jpg",
      "/Women/Accessories/marble-fashion-wristwatch.jpg",
      "/Women/Accessories/threader-necklace-closeup.jpg",
      "/Women/Accessories/black-over-the-shoulder-bag.jpg"
    ],
    rating: 4.7,
    reviewCount: 3421,
    category: "Women",
    brand: "AIC Accessories",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Bracelets", "Stacked", "Women"],
    specifications: {
      "Material": "Mixed Metals",
      "Color": "Gold/Silver",
      "Type": "Bracelet Set"
    }
  },
  {
    id: "7",
    name: "Women's Kurta - Style 1",
    description: "Traditional women's kurta, comfortable and stylish for everyday wear.",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "/Women/kurta-1.jpg",
    images: [
      "/Women/kurta-1.jpg",
      "/Women/kurta-2.jpg",
      "/Women/kurta-3.jpg",
      "/Women/kurta-4.jpg",
      "/Women/kurta-5.jpg"
    ],
    rating: 4.8,
    reviewCount: 789,
    category: "Women",
    brand: "AIC Fashion",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women", "Traditional"],
    specifications: {
      "Material": "Cotton",
      "Color": "Assorted",
      "Type": "Kurta"
    }
  },
  {
    id: "women-1",
    name: "Women's Boho Dress",
    description: "Stylish boho dress for women.",
    price: 49.99,
    image: "/Women/womens-boho-dress.jpg",
    images: ["/Women/womens-boho-dress.jpg"],
    rating: 4.7,
    reviewCount: 15,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Dress", "Boho", "Women"],
    specifications: {"Material": "Cotton"},
    isFeatured: true
  },
  {
    id: "women-2",
    name: "Women Black Top",
    description: "Classic black top for women.",
    price: 29.99,
    image: "/Women/women-black-top.jpg",
    images: ["/Women/women-black-top.jpg"],
    rating: 4.6,
    reviewCount: 10,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Black", "Women"],
    specifications: {"Material": "Polyester"}
  },
  {
    id: "women-3",
    name: "Trendy Ladies Top",
    description: "Trendy top for ladies.",
    price: 34.99,
    image: "/Women/trendy-ladies-tops-500x500.jpg",
    images: ["/Women/trendy-ladies-tops-500x500.jpg"],
    rating: 4.5,
    reviewCount: 8,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Trendy", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-4",
    name: "Striped T-Shirt",
    description: "Striped t-shirt for women.",
    price: 24.99,
    image: "/Women/striped-t-shirt.jpg",
    images: ["/Women/striped-t-shirt.jpg"],
    rating: 4.4,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["T-Shirt", "Striped", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-5",
    name: "Striped Fashion Shirt",
    description: "Fashionable striped shirt for women.",
    price: 27.99,
    image: "/Women/striped-fashion-shirt.jpg",
    images: ["/Women/striped-fashion-shirt.jpg"],
    rating: 4.5,
    reviewCount: 9,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shirt", "Striped", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-6",
    name: "Simple Red T-Shirt",
    description: "Simple red t-shirt for women.",
    price: 19.99,
    image: "/Women/simple-red-t-shirt.jpg",
    images: ["/Women/simple-red-t-shirt.jpg"],
    rating: 4.3,
    reviewCount: 6,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["T-Shirt", "Red", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-7",
    name: "RTF Rama Green Rayon Stylish Women",
    description: "Stylish green rayon top for women.",
    price: 32.99,
    image: "/Women/rtf-rama-green-rayon-stylish-women.jpg",
    images: ["/Women/rtf-rama-green-rayon-stylish-women.jpg"],
    rating: 4.6,
    reviewCount: 8,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Green", "Women"],
    specifications: {"Material": "Rayon"}
  },
  {
    id: "women-8",
    name: "Rose Stitched on Sleeve",
    description: "Top with rose stitched on sleeve.",
    price: 28.99,
    image: "/Women/rose-stitched-on-sleeve.jpg",
    images: ["/Women/rose-stitched-on-sleeve.jpg"],
    rating: 4.7,
    reviewCount: 10,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Rose", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-9",
    name: "Red Top",
    description: "Red top for women.",
    price: 22.99,
    image: "/Women/red-top.jpg",
    images: ["/Women/red-top.jpg"],
    rating: 4.2,
    reviewCount: 5,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Red", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-10",
    name: "Red Tee with Pocket",
    description: "Red tee with pocket for women.",
    price: 23.99,
    image: "/Women/red-tee-with-pocket.jpg",
    images: ["/Women/red-tee-with-pocket.jpg"],
    rating: 4.4,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Tee", "Red", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-11",
    name: "Light Blue Women's Fashion",
    description: "Light blue fashion top for women.",
    price: 26.99,
    image: "/Women/light-blue-womens-fashion.jpg",
    images: ["/Women/light-blue-womens-fashion.jpg"],
    rating: 4.5,
    reviewCount: 8,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Blue", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-12",
    name: "Kurti",
    description: "Traditional kurti for women.",
    price: 34.99,
    image: "/Women/kurti.jpg",
    images: ["/Women/kurti.jpg"],
    rating: 4.6,
    reviewCount: 9,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurti", "Traditional", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-13",
    name: "Kurta 3",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-3.jpg",
    images: ["/Women/kurta-3.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-14",
    name: "Kurta 4",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-4.jpg",
    images: ["/Women/kurta-4.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-15",
    name: "Kurta 5",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-5.jpg",
    images: ["/Women/kurta-5.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-16",
    name: "Kurta 8",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-8.jpg",
    images: ["/Women/kurta-8.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-17",
    name: "Kurta 10",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-10.jpg",
    images: ["/Women/kurta-10.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-18",
    name: "Kurta 11",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-11.jpg",
    images: ["/Women/kurta-11.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-19",
    name: "Kurta 12",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-12.jpg",
    images: ["/Women/kurta-12.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-20",
    name: "Kurta 13",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-13.jpg",
    images: ["/Women/kurta-13.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-21",
    name: "Kurta 14",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-14.jpg",
    images: ["/Women/kurta-14.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-22",
    name: "Kurta 15",
    description: "Kurta for women.",
    price: 36.99,
    image: "/Women/kurta-15.jpg",
    images: ["/Women/kurta-15.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurta", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-23",
    name: "Embroidered Women's Top",
    description: "Embroidered top for women.",
    price: 39.99,
    image: "/Women/embroidered-womens-top.jpg",
    images: ["/Women/embroidered-womens-top.jpg"],
    rating: 4.7,
    reviewCount: 10,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Top", "Embroidered", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-24",
    name: "Straight Fit Kurti",
    description: "Straight fit kurti for women.",
    price: 34.99,
    image: "/Women/Straight-Fit-Kurti.jpg",
    images: ["/Women/Straight-Fit-Kurti.jpg"],
    rating: 4.6,
    reviewCount: 8,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurti", "Straight Fit", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-25",
    name: "Pink Kurti",
    description: "Pink kurti for women.",
    price: 32.99,
    image: "/Women/Pink-Kurti.jpg",
    images: ["/Women/Pink-Kurti.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurti", "Pink", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "women-26",
    name: "Aqua Kurti",
    description: "Aqua kurti for women.",
    price: 32.99,
    image: "/Women/Aqua-Kurti.jpg",
    images: ["/Women/Aqua-Kurti.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Women",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Kurti", "Aqua", "Women"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-boys-1",
    name: "Plaid Shirt for Kids",
    description: "Plaid shirt for boys.",
    price: 19.99,
    image: "/Kids/Boys/plaid-shirt-for-kids.jpg",
    images: ["/Kids/Boys/plaid-shirt-for-kids.jpg"],
    rating: 4.6,
    reviewCount: 7,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shirt", "Plaid", "Boys"],
    specifications: {"Material": "Cotton"},
    isFeatured: true
  },
  {
    id: "kids-boys-2",
    name: "Kids Zip Up",
    description: "Zip up jacket for boys.",
    price: 24.99,
    image: "/Kids/Boys/kids-zip-up.jpg",
    images: ["/Kids/Boys/kids-zip-up.jpg"],
    rating: 4.5,
    reviewCount: 6,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Jacket", "Zip Up", "Boys"],
    specifications: {"Material": "Polyester"}
  },
  {
    id: "kids-boys-3",
    name: "Kids Whale Shirt",
    description: "Whale shirt for boys.",
    price: 17.99,
    image: "/Kids/Boys/kids-whale-shirt.jpg",
    images: ["/Kids/Boys/kids-whale-shirt.jpg"],
    rating: 4.4,
    reviewCount: 5,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shirt", "Whale", "Boys"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-boys-4",
    name: "Kids T-Shirt",
    description: "T-shirt for boys.",
    price: 15.99,
    image: "/Kids/Boys/kids-t-shirt.jpg",
    images: [
      "/Kids/Boys/kids-t-shirt.jpg",
      "/Kids/Boys/childs-raccoon-tee.jpg",
      "/Kids/Boys/childrens-black-beanie.jpg",
      "/Kids/Boys/child-grey-sweatpants.jpg",
      "/Kids/Boys/kids-whale-shirt.jpg"
    ],
    rating: 4.3,
    reviewCount: 4,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["T-Shirt", "Boys"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-boys-5",
    name: "Child's Raccoon Tee",
    description: "Raccoon tee for boys.",
    price: 16.99,
    image: "/Kids/Boys/childs-raccoon-tee.jpg",
    images: ["/Kids/Boys/childs-raccoon-tee.jpg"],
    rating: 4.5,
    reviewCount: 5,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Tee", "Raccoon", "Boys"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-boys-6",
    name: "Children's Black Beanie",
    description: "Black beanie for boys.",
    price: 9.99,
    image: "/Kids/Boys/childrens-black-beanie.jpg",
    images: ["/Kids/Boys/childrens-black-beanie.jpg"],
    rating: 4.2,
    reviewCount: 3,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Beanie", "Black", "Boys"],
    specifications: {"Material": "Wool"}
  },
  {
    id: "kids-boys-7",
    name: "Child Grey Sweatpants",
    description: "Grey sweatpants for boys.",
    price: 14.99,
    image: "/Kids/Boys/child-grey-sweatpants.jpg",
    images: ["/Kids/Boys/child-grey-sweatpants.jpg"],
    rating: 4.3,
    reviewCount: 4,
    category: "Kids Boys",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Sweatpants", "Grey", "Boys"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-girls-1",
    name: "Toddler Striped Dress Back",
    description: "Striped dress for toddler girls.",
    price: 21.99,
    image: "/Kids/Girls/toddler-striped-dress-back.jpg",
    images: ["/Kids/Girls/toddler-striped-dress-back.jpg"],
    rating: 4.6,
    reviewCount: 5,
    category: "Kids Girls",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Dress", "Striped", "Girls"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "kids-girls-2",
    name: "Toddler Striped Dress Back",
    description: "Striped dress for toddler girls.",
    price: 21.99,
    image: "/Kids/Girls/toddler-striped-dress-back.jpg",
    images: ["/Kids/Girls/toddler-striped-dress-back.jpg"],
    rating: 4.6,
    reviewCount: 5,
    category: "Kids Girls",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Dress", "Striped", "Girls"],
    specifications: {"Material": "Cotton"}
  },
  {
    id: "shoes-1",
    name: "White Lowtop LED Shoes",
    description: "Trendy white lowtop LED shoes.",
    price: 59.99,
    image: "/Shoes/white-lowtop-LED-shoes.jpg",
    images: [
      "/Shoes/white-lowtop-LED-shoes.jpg",
      "/Men/teal-t-shirt.jpg",
      "/Women/womens-boho-dress.jpg",
      "/Kids/Boys/plaid-shirt-for-kids.jpg",
      "/Kids/Girls/girls-striped-dress.jpg"
    ],
    rating: 4.8,
    reviewCount: 14,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shoes", "LED", "White"],
    specifications: {"Material": "Synthetic"},
    isFeatured: true
  },
  {
    id: "shoes-2",
    name: "Shops 23",
    description: "Trendy shoes from shop 23.",
    price: 49.99,
    image: "/Shoes/shops_23.jpg",
    images: ["/Shoes/shops_23.jpg"],
    rating: 4.2,
    reviewCount: 6,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shoes", "Shops"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-3",
    name: "Right Foot All Black Sneaker",
    description: "All black sneaker for men.",
    price: 54.99,
    image: "/Shoes/right-foot-all-black-sneaker.jpg",
    images: ["/Shoes/right-foot-all-black-sneaker.jpg"],
    rating: 4.5,
    reviewCount: 8,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shoes", "Black", "Sneaker"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-4",
    name: "Red LED Sneakers",
    description: "Red LED sneakers for men.",
    price: 64.99,
    image: "/Shoes/red-LED-sneakers.jpg",
    images: ["/Shoes/red-LED-sneakers.jpg"],
    rating: 4.7,
    reviewCount: 10,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-05-15T10:00:00Z",
    tags: ["Shoes", "Red", "LED"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-5",
    name: "Red LED Shoes",
    description: "Red LED shoes for men.",
    price: 62.99,
    image: "/Shoes/red-LED-shoes.jpg",
    images: ["/Shoes/red-LED-shoes.jpg"],
    rating: 4.6,
    reviewCount: 9,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-04-10T10:00:00Z",
    tags: ["Shoes", "Red", "LED"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-6",
    name: "Pair of Navy Blue Skate Shoes",
    description: "Navy blue skate shoes for men.",
    price: 57.99,
    image: "/Shoes/pair-of-navy-blue-skate-shoes.jpg",
    images: ["/Shoes/pair-of-navy-blue-skate-shoes.jpg"],
    rating: 4.5,
    reviewCount: 7,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-03-25T10:00:00Z",
    tags: ["Shoes", "Navy Blue", "Skate"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-7",
    name: "Navy Blue Skate Shoe Left",
    description: "Left navy blue skate shoe for men.",
    price: 57.99,
    image: "/Shoes/navy-blue-skate-shoe-left.jpg",
    images: ["/Shoes/navy-blue-skate-shoe-left.jpg"],
    rating: 4.4,
    reviewCount: 6,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-03-20T10:00:00Z",
    tags: ["Shoes", "Navy Blue", "Skate"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-8",
    name: "Mens Casual Shoes",
    description: "Casual shoes for men.",
    price: 52.99,
    image: "/Shoes/mens-casual-shoes-men-casual.jpg",
    images: ["/Shoes/mens-casual-shoes-men-casual.jpg"],
    rating: 4.3,
    reviewCount: 5,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-03-10T10:00:00Z",
    tags: ["Shoes", "Casual", "Men"],
    specifications: {"Material": "Synthetic"}
  },
  {
    id: "shoes-9",
    name: "Marc Jacobs Lace Up Shoes for Men",
    description: "Lace up shoes for men by Marc Jacobs.",
    price: 69.99,
    image: "/Shoes/marc-jacobs-lace-up-shoes-for-men.jpg",
    images: ["/Shoes/marc-jacobs-lace-up-shoes-for-men.jpg"],
    rating: 4.6,
    reviewCount: 7,
    category: "Shoes",
    brand: "Marc Jacobs",
    inStock: true,
    createdAt: "2024-02-28T10:00:00Z",
    tags: ["Shoes", "Lace Up", "Men"],
    specifications: {"Material": "Leather"}
  },
  {
    id: "shoes-10",
    name: "Brown Casuals",
    description: "Brown casual shoes for men.",
    price: 49.99,
    image: "/Shoes/Brown casuals.jpg",
    images: ["/Shoes/Brown casuals.jpg"],
    rating: 4.2,
    reviewCount: 4,
    category: "Shoes",
    brand: "Generic",
    inStock: true,
    createdAt: "2024-02-15T10:00:00Z",
    tags: ["Shoes", "Brown", "Casual"],
    specifications: {"Material": "Leather"}
  }
]

export const categories = [
  "Men",
  "Women",
  "Kids Boys",
  "Kids Girls",
  "Shoes"
]

export const brands = [
  "AIC Brand",
  "AIC Accessories",
  "AIC Fashion",
  "Generic",
  "Marc Jacobs"
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(product => product.brand === brand)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured)
}

export function getNewProducts(limit: number = 8): Product[] {
  return products
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getOnSaleProducts(): Product[] {
  return products.filter(product => product.isOnSale)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(productId)
  if (!currentProduct) return []
  
  return products
    .filter(product => 
      product.id !== productId && 
      (product.category === currentProduct.category || 
       product.brand === currentProduct.brand)
    )
    .slice(0, limit)
} 

export function getUniqueProductsBySection(section: 'featured' | 'new' | 'recommended', excludeIds: Set<string> = new Set(), limit: number = 8): Product[] {
  let pool: Product[] = [];
  if (section === 'featured') {
    pool = products.filter(p => p.isFeatured && !excludeIds.has(p.id));
  } else if (section === 'new') {
    pool = products
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter(p => !excludeIds.has(p.id));
  } else if (section === 'recommended') {
    pool = products.filter(p => !excludeIds.has(p.id));
  }
  // Shuffle pool for randomness
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}