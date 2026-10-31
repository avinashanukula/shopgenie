// ============================================================
// Shop Genie – Business & Product Data
// Replace with real WhatsApp Business API integration later
// ============================================================

export const BUSINESS = {
  name: "Thread & Co.",
  type: "Clothing Store",
  phone: "+91 98765 43210",
  description: "Premium contemporary clothing for men and women. We focus on quality fabrics, clean cuts, and timeless style.",
  returnPolicy: "7-day easy returns on unworn items with original tags. Exchange within 14 days.",
  shippingPolicy: "Free shipping on orders above ₹1,499. Standard delivery 3–5 business days. Express delivery available for ₹149.",
  paymentMethods: "UPI, credit/debit cards, net banking, and cash on delivery available.",
};

export const PRODUCTS = [
  {
    id: "P001",
    name: "Classic Linen Shirt",
    category: "Men",
    price: 1299,
    mrp: 1999,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sage Green", "Dusty Blue"],
    stock: { S: 8, M: 12, L: 5, XL: 2 },
    description: "Breathable 100% linen shirt with a relaxed fit. Perfect for summer and casual outings.",
    material: "100% Linen",
    careInstructions: "Machine wash cold, gentle cycle. Do not tumble dry.",
    image: null,
  },
  {
    id: "P002",
    name: "High-Rise Straight Jeans",
    category: "Women",
    price: 1899,
    mrp: 2799,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Indigo Blue", "Black", "Light Wash"],
    stock: { "26": 3, "28": 7, "30": 9, "32": 4, "34": 1 },
    description: "Flattering high-rise cut with a straight leg. Made from premium stretch denim.",
    material: "98% Cotton, 2% Elastane",
    careInstructions: "Machine wash cold, inside out. Hang dry.",
    image: null,
  },
  {
    id: "P003",
    name: "Oversized Graphic Tee",
    category: "Unisex",
    price: 699,
    mrp: 999,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Off-White", "Charcoal"],
    stock: { S: 15, M: 20, L: 18, XL: 10, XXL: 6 },
    description: "Relaxed oversized tee with artistic graphic print. Made from 100% cotton jersey.",
    material: "100% Cotton Jersey",
    careInstructions: "Machine wash cold. Tumble dry low.",
    image: null,
  },
  {
    id: "P004",
    name: "Ribbed Knit Co-ord Set",
    category: "Women",
    price: 2499,
    mrp: 3499,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Cream", "Rust"],
    stock: { XS: 0, S: 4, M: 6, L: 3 },
    description: "Matching crop top and wide-leg trouser in soft ribbed knit. Effortlessly chic.",
    material: "60% Viscose, 35% Polyester, 5% Elastane",
    careInstructions: "Hand wash cold. Lay flat to dry.",
    image: null,
  },
  {
    id: "P005",
    name: "Slim Fit Chinos",
    category: "Men",
    price: 1499,
    mrp: 2199,
    sizes: ["30", "32", "34", "36"],
    colors: ["Khaki", "Olive", "Navy"],
    stock: { "30": 6, "32": 10, "34": 8, "36": 4 },
    description: "Versatile slim-fit chinos that work from casual Fridays to weekend outings.",
    material: "97% Cotton, 3% Elastane",
    careInstructions: "Machine wash warm. Tumble dry medium.",
    image: null,
  },
  {
    id: "P006",
    name: "Floral Wrap Midi Dress",
    category: "Women",
    price: 1999,
    mrp: 2999,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Terracotta Print", "Navy Print", "Sage Print"],
    stock: { XS: 2, S: 5, M: 8, L: 4, XL: 1 },
    description: "Feminine wrap silhouette with an adjustable tie waist. Flowing chiffon fabric.",
    material: "100% Chiffon Polyester",
    careInstructions: "Hand wash or dry clean. Do not wring.",
    image: null,
  },
  {
    id: "P007",
    name: "Cargo Jogger Pants",
    category: "Unisex",
    price: 1199,
    mrp: 1799,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Olive", "Black", "Stone"],
    stock: { S: 0, M: 0, L: 2, XL: 5 },
    description: "Relaxed cargo pants with multiple utility pockets. Tapered jogger fit.",
    material: "100% Cotton Twill",
    careInstructions: "Machine wash cold.",
    image: null,
  },
  {
    id: "P008",
    name: "Puffer Vest",
    category: "Unisex",
    price: 2199,
    mrp: 3299,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Tan", "Forest Green"],
    stock: { S: 3, M: 7, L: 6, XL: 4 },
    description: "Lightweight quilted puffer vest with side pockets. Great for layering.",
    material: "Nylon shell, Polyester fill",
    careInstructions: "Machine wash cold, gentle. Tumble dry low.",
    image: null,
  },
];

export const getProductByName = (name) => {
  const n = name.toLowerCase();
  return PRODUCTS.find(p =>
    p.name.toLowerCase().includes(n) ||
    p.category.toLowerCase().includes(n)
  );
};

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.colors.some(c => c.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q)
  );
};

export const getStockStatus = (stock) => {
  const total = Object.values(stock || {}).reduce((a, b) => a + b, 0);
  if (total === 0) return { label: "Out of Stock", class: "tag-outstock" };
  if (total <= 5) return { label: "Low Stock", class: "tag-lowstock" };
  return { label: "In Stock", class: "tag-instock" };
};

export const FAQS = [
  {
    q: "What is your return & exchange policy?",
    a: "7-day easy returns on unworn items with original tags. Exchanges are accepted within 14 days with free reverse pickup.",
  },
  {
    q: "How long does standard delivery take?",
    a: "Standard shipping takes 3-5 business days across India. Express shipping arrives in 1-2 days.",
  },
  {
    q: "Is there any delivery charge?",
    a: "Free shipping on orders above ₹1,499. For orders below ₹1,499, standard shipping is ₹79.",
  },
  {
    q: "Do you offer any discounts for multiple items?",
    a: "Yes! Use coupon code GENIE10 at checkout to receive an automatic 10% discount on 2 or more items.",
  },
  {
    q: "Can I cancel or modify an order after placing it?",
    a: "Orders can be modified or cancelled within 2 hours of placement before dispatch begins.",
  },
  {
    q: "What payment methods are supported?",
    a: "UPI (Google Pay, PhonePe, Paytm), Net Banking, all major Credit/Debit Cards, and Cash on Delivery (COD).",
  },
];

