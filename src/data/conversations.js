// ============================================================
// Shop Genie – Conversation Store (localStorage persistence)
// ============================================================

const STORAGE_KEY = "shopgenie_conversations";

export const generateId = () =>
  Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

export const DEFAULT_CONVERSATIONS = [
  {
    id: "conv_priya",
    customerName: "Priya Sharma",
    customerPhone: "+91 98432 11234",
    avatar: "PS",
    avatarColor: "#8b5cf6",
    lastMessage: "Great, I'll go with size M in sage green!",
    lastTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    unread: 2,
    isOnline: true,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hi! I'm looking for the classic linen shirt",
        time: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "ai",
        text: `Here's the info on *Classic Linen Shirt*:\n\n📋 *Description:* Breathable 100% linen shirt with a relaxed fit. Perfect for summer and casual outings.\n💰 *Price:* ₹1,299 _(35% off MRP ₹1,999)_\n🧵 *Material:* 100% Linen\n🎨 *Colors:* White, Sage Green, Dusty Blue\n📦 *Availability:* Available in all sizes: S, M, L, XL.\n\nWould you like to know about sizes, shipping, or how to order?`,
        time: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m3",
        sender: "customer",
        text: "Do you have it in sage green?",
        time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
      {
        id: "m4",
        sender: "ai",
        text: `*Classic Linen Shirt* is available in these colors:\n\n🎨 White | Sage Green | Dusty Blue\n\nAvailable in all sizes: S, M, L, XL.\n\nWhich color catches your eye?`,
        time: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m5",
        sender: "customer",
        text: "Great, I'll go with size M in sage green!",
        time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "conv_arjun",
    customerName: "Arjun Mehta",
    customerPhone: "+91 87654 32109",
    avatar: "AM",
    avatarColor: "#f59e0b",
    lastMessage: "What's the return policy if it doesn't fit?",
    lastTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    unread: 1,
    isOnline: false,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hey! Do you have slim fit chinos in navy?",
        time: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "ai",
        text: `Here's the info on *Slim Fit Chinos*:\n\n📋 *Description:* Versatile slim-fit chinos that work from casual Fridays to weekend outings.\n💰 *Price:* ₹1,499 _(32% off MRP ₹2,199)_\n🧵 *Material:* 97% Cotton, 3% Elastane\n🎨 *Colors:* Khaki, Olive, Navy\n📦 *Availability:* Available in all sizes: 30, 32, 34, 36.\n\nWould you like to know about sizes, shipping, or how to order?`,
        time: new Date(Date.now() - 34 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m3",
        sender: "customer",
        text: "What's the return policy if it doesn't fit?",
        time: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "conv_meera",
    customerName: "Meera Nair",
    customerPhone: "+91 76543 21098",
    avatar: "MN",
    avatarColor: "#10b981",
    lastMessage: "Thank you! I'll place the order now.",
    lastTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    isOnline: false,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hello! Do you have the ribbed knit co-ord set in camel?",
        time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "ai",
        text: `Here's the info on *Ribbed Knit Co-ord Set*:\n\n📋 *Description:* Matching crop top and wide-leg trouser in soft ribbed knit. Effortlessly chic.\n💰 *Price:* ₹2,499 _(29% off MRP ₹3,499)_\n🧵 *Material:* 60% Viscose, 35% Polyester, 5% Elastane\n🎨 *Colors:* Camel, Cream, Rust\n📦 *Availability:* Available in sizes: S, M, L. Sizes XS are currently out of stock.\n\nWould you like to know about sizes, shipping, or how to order?`,
        time: new Date(Date.now() - 2.9 * 60 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m3",
        sender: "customer",
        text: "What about size XS? I'm usually XS",
        time: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m4",
        sender: "ai",
        text: `Here's the availability for *Ribbed Knit Co-ord Set*:\n\n📦 Available in sizes: S, M, L. Sizes XS are currently out of stock.\n🎨 Colors: Camel, Cream, Rust\n\nI can notify you when it's back in stock. Would you like that?`,
        time: new Date(Date.now() - 2.4 * 60 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m5",
        sender: "customer",
        text: "Ok I'll go with size S then. How do I order?",
        time: new Date(Date.now() - 2.2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m6",
        sender: "ai",
        text: `Great choice! *Ribbed Knit Co-ord Set* at *₹2,499* is a fantastic pick! 🎉\n\nTo complete your order:\n1. Visit our website or send us your preferred size & color\n2. We'll confirm availability and share payment details\n3. Free shipping on orders above ₹1,499. Standard delivery 3–5 business days.\n\nWhich size and color would you like?`,
        time: new Date(Date.now() - 2.1 * 60 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m7",
        sender: "customer",
        text: "Size S in camel please!",
        time: new Date(Date.now() - 2.05 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m8",
        sender: "ai",
        text: "Perfect! I've noted your order: *Ribbed Knit Co-ord Set – Size S, Camel*. Our team will reach out shortly with payment details. Expected delivery in 3–5 business days. 📦✨",
        time: new Date(Date.now() - 2.0 * 60 * 60 * 1000).toISOString(),
        isAI: true,
      },
      {
        id: "m9",
        sender: "customer",
        text: "Thank you! I'll place the order now.",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "conv_rahul",
    customerName: "Rahul Verma",
    customerPhone: "+91 65432 10987",
    avatar: "RV",
    avatarColor: "#ef4444",
    lastMessage: "Do you have cargo joggers in size L?",
    lastTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    unread: 0,
    isOnline: false,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hi! Do you have cargo joggers in size L?",
        time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        sender: "ai",
        text: `Here's the availability for *Cargo Jogger Pants*:\n\n📦 Available in sizes: L, XL. Sizes S, M are currently out of stock.\n🎨 Colors: Olive, Black, Stone\n\nWould you like to go ahead and order?`,
        time: new Date(Date.now() - 4.9 * 60 * 60 * 1000).toISOString(),
        isAI: true,
      },
    ],
  },
];

export const loadConversations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to load from localStorage:", e);
  }
  return DEFAULT_CONVERSATIONS;
};

export const saveConversations = (conversations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.warn("Failed to save to localStorage:", e);
  }
};

export const resetConversations = () => {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_CONVERSATIONS;
};
