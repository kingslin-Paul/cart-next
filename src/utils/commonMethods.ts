export const capitalizeFirst = (value: string): string => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  export const staticProducts:any = [
  {
    id: 1,
    title: "Smart TV",
    price: 299.99,
    description: "A 50-inch smart TV with 4K resolution.",
    category: "tv",
    image: "/products/headphone.png",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 99.99,
    description: "Noise cancelling over-ear headphones.",
    category: "audio",
    image: "/products/smart-tv.png",
  },
  {
    id: 3,
    title: "Gaming Laptop",
    price: 1299.99,
    description: "High performance laptop for gaming and work.",
    category: "laptop",
    image: "/products/laptop.png",
  },
  {
    id: 4,
    title: "Smartphone",
    price: 699.99,
    description: "Latest smartphone with AMOLED display.",
    category: "mobile",
    image: "/products/smartphone.png",
  },
    {
    id: 5,
    title: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with fast response.",
    category: "gaming", // 🎮
    image: "/products/wireless-mouse.png",
  },
  {
    id: 6,
    title: "Sound Box",
    price: 149.99,
    description: "Powerful portable sound box with deep bass.",
    category: "appliances", // 📦
    image: "/products/sound-box.png",
  },
];