// update-product-images.js
// Script to mix local and external images in product data

const fs = require('fs');
const path = require('path');

// Paths to local image folders
const imageFolders = [
  'public/Men',
  'public/Women',
  'public/Kids/Boys',
  'public/Kids/Girls',
  'public/Shoes',
];

// Load products array from a JSON export of lib/products.ts
// (You may need to export your products array to a .json file for this script)
const productsPath = path.join(__dirname, 'lib', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Gather all local image paths
let localImages = [];
for (const folder of imageFolders) {
  const files = fs.readdirSync(path.join(__dirname, folder));
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      // Store as web path (e.g., /Men/blue-t-shirt.jpg)
      const webPath = '/' + path.relative('public', path.join(folder, file)).replace(/\\/g, '/');
      localImages.push(webPath);
    }
  }
}

// Shuffle local images for randomness
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(localImages);

let localImageIndex = 0;

// Update products
const updatedProducts = products.map(product => {
  // 50% chance to use a local image, 50% to keep external
  const useLocal = Math.random() < 0.5 && localImageIndex < localImages.length;
  if (useLocal) {
    const img = localImages[localImageIndex++];
    return {
      ...product,
      image: img,
      images: [img],
    };
  } else {
    // Keep existing image(s)
    return product;
  }
});

// Write to a new file for review
const outPath = path.join(__dirname, 'lib', 'products.with-local-images.json');
fs.writeFileSync(outPath, JSON.stringify(updatedProducts, null, 2));

console.log('Updated products written to', outPath); 