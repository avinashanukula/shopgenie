// ============================================================
// Shop Genie – Smart AI Reply Engine
// Handles ANY customer input naturally. Ready for real LLM swap.
// ============================================================
import { BUSINESS, PRODUCTS, searchProducts } from './products';

const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

// ── Helpers ──────────────────────────────────────────────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getDiscount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

const stockLine = (product) => {
  const entries = Object.entries(product.stock);
  const avail   = entries.filter(([, q]) => q > 0).map(([s]) => s);
  const oos     = entries.filter(([, q]) => q === 0).map(([s]) => s);
  if (avail.length === 0) return '❌ Currently out of stock across all sizes.';
  if (oos.length > 0)
    return `✅ Available in: *${avail.join(', ')}*. Out of stock: ${oos.join(', ')}.`;
  return `✅ In stock in all sizes: *${avail.join(', ')}*`;
};

// ── Intent patterns ──────────────────────────────────────────
const is = (msg, patterns) => patterns.some(p =>
  typeof p === 'string' ? msg.includes(p) : p.test(msg)
);

// ── Core response builder ────────────────────────────────────
const buildReply = (rawMessage, history = []) => {
  const msg = rawMessage.toLowerCase().trim();

  // ── 1. Greetings ──────────────────────────────────────────
  if (is(msg, [/\b(hi|hello|hey|hiya|good morning|good evening|good afternoon|namaste|sup|what's up)\b/])) {
    return pick([
      `Hey! 👋 Welcome to *${BUSINESS.name}*! I'm Genie, your AI shopping assistant.\n\nI can help you with product info, sizes, prices, stock, delivery and more. What are you looking for today? 🛍️`,
      `Hello! Great to hear from you 😊 I'm Genie — the AI for *${BUSINESS.name}*.\n\nJust tell me what you're looking for and I'll take care of the rest!`,
      `Hi there! Welcome to *${BUSINESS.name}* 🙌\n\nWe have a great collection of clothing for Men, Women and Unisex. What can I help you with?`,
    ]);
  }

  // ── 2. Thanks / positive ──────────────────────────────────
  if (is(msg, [/\b(thank|thanks|thank you|ty|cheers|great|awesome|perfect|nice|cool|wonderful)\b/])) {
    return pick([
      `You're very welcome! 😊 Feel free to ask if you need anything else. Happy shopping! 🛍️`,
      `Happy to help! Let me know if there's anything else you'd like to know. ✨`,
      `Anytime! That's what I'm here for 😊 Is there anything else I can assist you with?`,
    ]);
  }

  // ── 3. Goodbye ────────────────────────────────────────────
  if (is(msg, [/\b(bye|goodbye|see you|ciao|take care|later)\b/])) {
    return `Goodbye! 👋 It was lovely chatting with you. Visit us again at *${BUSINESS.name}* anytime. Have a wonderful day! ☀️`;
  }

  // ── 4. How are you / general chat ─────────────────────────
  if (is(msg, [/how are you/i, /how r u/i, /how's it going/i])) {
    return `I'm doing great, thanks for asking! 😊 I'm always ready to help you find the perfect outfit.\n\nWhat can I help you shop for today at *${BUSINESS.name}*?`;
  }

  // ── 5. What do you sell / browse catalogue ─────────────────
  if (is(msg, [/what.*sell/i, /what.*have/i, /show.*collection/i, /browse/i, /catalogue/i, /catalog/i, /products/i, /what.*available/i, /show me/i, /see.*items/i])) {
    const sample = PRODUCTS.slice(0, 5).map(p =>
      `• *${p.name}* (${p.category}) — ${formatPrice(p.price)} _(${getDiscount(p)}% off)_`
    ).join('\n');
    return `Here's a glimpse of our collection at *${BUSINESS.name}* ✨\n\n${sample}\n\n...and more! Would you like to browse by Men, Women, or Unisex? Or just tell me what style you're looking for 👗`;
  }

  // ── 6. Men's collection ──────────────────────────────────
  if (is(msg, [/\bmen\b/, /\bman\b/, /\bguy\b/, /\bboys\b/, /\bhim\b/, /\bfor him\b/])) {
    const mens = PRODUCTS.filter(p => p.category === 'Men' || p.category === 'Unisex');
    const list = mens.map(p => `• *${p.name}* — ${formatPrice(p.price)} _(${getDiscount(p)}% off)_`).join('\n');
    return `Here's our *Men's & Unisex Collection* 👔\n\n${list}\n\nWant details, sizes or availability for any of these?`;
  }

  // ── 7. Women's collection ─────────────────────────────────
  if (is(msg, [/\bwomen\b/, /\bwoman\b/, /\bgirls?\b/, /\bher\b/, /\bfor her\b/, /\bladies\b/])) {
    const womens = PRODUCTS.filter(p => p.category === 'Women' || p.category === 'Unisex');
    const list = womens.map(p => `• *${p.name}* — ${formatPrice(p.price)} _(${getDiscount(p)}% off)_`).join('\n');
    return `Here's our *Women's & Unisex Collection* 👗\n\n${list}\n\nAnything catch your eye? I can tell you more about any item!`;
  }

  // ── 8. Specific product match ─────────────────────────────
  const matched = searchProducts(msg);
  const product  = matched.length > 0 ? matched[0] : null;

  if (product) {
    const d = getDiscount(product);
    const stockStr = stockLine(product);

    // Sub-intents with product
    if (is(msg, [/price|cost|how much|rate|charge|fee/])) {
      return pick([
        `*${product.name}* is priced at *${formatPrice(product.price)}* 🎉\n_(${d}% off MRP ${formatPrice(product.mrp)})_\n\n${stockStr}\n\nWant to know about sizes or colors?`,
        `💰 *${product.name}*: *${formatPrice(product.price)}* — that's ${d}% off the MRP of ${formatPrice(product.mrp)}!\n\n${stockStr}\n\nShall I help you with anything else about this item?`,
      ]);
    }

    if (is(msg, [/stock|available|availability|in stock|do you have|have it/])) {
      return `Here's the stock for *${product.name}*:\n\n${stockStr}\n🎨 Colors: ${product.colors.join(' | ')}\n\n${matched[0].stock && Object.values(matched[0].stock).some(q => q > 0) ? 'Would you like to go ahead and order? 🛍️' : 'I can notify you when it\'s back. Would you like that?'}`;
    }

    if (is(msg, [/size|fit|fitting|measurement|dimension/])) {
      return `*${product.name}* comes in these sizes:\n\n${stockStr}\n\n📐 _${product.description}_\n\nNot sure about sizing? Our size guide is on the website. Want me to share more details?`;
    }

    if (is(msg, [/color|colour|shade|variant/])) {
      return `*${product.name}* is available in:\n\n🎨 *${product.colors.join(' | ')}*\n\n${stockStr}\n\nWhich color are you leaning towards?`;
    }

    if (is(msg, [/material|fabric|quality|made of|composition|texture/])) {
      return `*${product.name}* is crafted from:\n\n🧵 *${product.material}*\n\n_${product.description}_\n\nIt's a premium piece at a great price. Want to know about availability?`;
    }

    if (is(msg, [/wash|care|clean|maintain|how to wash/])) {
      return `Care instructions for *${product.name}*:\n\n🫧 ${product.careInstructions}\n\nFollowing these will keep it looking brand new! Anything else?`;
    }

    if (is(msg, [/buy|order|purchase|want|take it|get it|book/])) {
      return `Great pick! *${product.name}* at *${formatPrice(product.price)}* is a fantastic choice 🎉\n\nTo order:\n1. Tell me your preferred *size* and *color*\n2. We'll confirm and share payment details\n3. 🚚 ${BUSINESS.shippingPolicy}\n\nWhich size and color would you like?`;
    }

    if (is(msg, [/return|refund|exchange|replace/])) {
      return `For *${product.name}*, here's our return policy:\n\n🔄 ${BUSINESS.returnPolicy}\n\nNeed help with anything else about this product?`;
    }

    // General product info (fallback)
    return `Here's everything about *${product.name}*:\n\n📋 ${product.description}\n💰 *${formatPrice(product.price)}* _(${d}% off MRP ${formatPrice(product.mrp)})_\n🧵 ${product.material}\n🎨 ${product.colors.join(', ')}\n${stockStr}\n\nWant to know about sizes, order, or delivery?`;
  }

  // ── 9. Price / offers / deals ────────────────────────────
  if (is(msg, [/discount|sale|offer|deal|promo|coupon|off|affordable|cheap|budget/])) {
    const deals = PRODUCTS
      .filter(p => getDiscount(p) >= 28)
      .map(p => `• *${p.name}* — ${formatPrice(p.price)} _(${getDiscount(p)}% off!)_`);
    return `🔥 Here are our best deals right now:\n\n${deals.join('\n')}\n\nAll prices already have maximum discounts applied. Want details on any of these?`;
  }

  // ── 10. Return / refund ───────────────────────────────────
  if (is(msg, [/return|refund|exchange|replace|policy/])) {
    return `Our return & exchange policy at *${BUSINESS.name}*:\n\n🔄 ${BUSINESS.returnPolicy}\n\nHave a specific product in mind? I can give you more details!`;
  }

  // ── 11. Shipping / delivery ───────────────────────────────
  if (is(msg, [/ship|deliver|dispatch|courier|when.*arrive|how long|tracking|track/])) {
    return pick([
      `Here's our delivery info 🚚\n\n${BUSINESS.shippingPolicy}\n\nWould you like to know anything else?`,
      `Shipping details for *${BUSINESS.name}*:\n\n📦 ${BUSINESS.shippingPolicy}\n\nOnce dispatched, you'll receive a tracking link. Need anything else?`,
    ]);
  }

  // ── 12. Payment ───────────────────────────────────────────
  if (is(msg, [/pay|payment|upi|cod|cash|card|online|gpay|phonepe|paytm/])) {
    return `We accept all major payment methods 💳\n\n${BUSINESS.paymentMethods}\n\nAll online payments are fully secure. Anything else I can help with?`;
  }

  // ── 13. Location / store ──────────────────────────────────
  if (is(msg, [/where|location|address|store|shop|visit|physical/])) {
    return `We operate primarily online! 🌐\n\nYou can order through WhatsApp by chatting with us, or visit our website. We deliver across India. 🇮🇳\n\nNeed help placing an order?`;
  }

  // ── 14. Size guide ────────────────────────────────────────
  if (is(msg, [/size guide|size chart|measurement|which size|what size/])) {
    return `📏 *Size Guide – ${BUSINESS.name}*\n\nFor tops (S/M/L/XL):\n• S → Chest 34–36"\n• M → Chest 37–39"\n• L → Chest 40–42"\n• XL → Chest 43–45"\n\nFor bottoms (waist in inches): 26, 28, 30, 32, 34, 36\n\nWhen in doubt, size up for a relaxed fit. Need help with a specific item?`;
  }

  // ── 15. Gift / gifting ────────────────────────────────────
  if (is(msg, [/gift|gifting|present|someone special|birthday|anniversary/])) {
    const giftPicks = PRODUCTS.slice(0, 3).map(p => `• *${p.name}* — ${formatPrice(p.price)}`).join('\n');
    return `How thoughtful! 🎁 Here are some great gifting options:\n\n${giftPicks}\n\nWe can also arrange gift wrapping. Who is the gift for — a man or a woman? I'll pick the best options!`;
  }

  // ── 16. Complaint / issue ────────────────────────────────
  if (is(msg, [/complaint|problem|issue|wrong|damaged|defect|broken|bad/])) {
    return `I'm really sorry to hear that! 😟 We take quality very seriously at *${BUSINESS.name}*.\n\nPlease share:\n1. Your order ID\n2. A photo of the issue\n\nOur team will resolve it within 24 hours. You're covered by our return & exchange policy: _${BUSINESS.returnPolicy}_`;
  }

  // ── 17. Off-topic / random ───────────────────────────────
  if (is(msg, [/weather|cricket|food|movie|music|politics|football|game/])) {
    return pick([
      `Ha! I wish I could chat about that 😄 But I'm Genie — a specialist in *${BUSINESS.name}'s* clothing collection!\n\nCan I help you find something stylish to wear? 👔`,
      `That's a bit outside my expertise 😅 I'm your personal shopping assistant for *${BUSINESS.name}*!\n\nHow about I help you find the perfect outfit instead?`,
    ]);
  }

  // ── 18. "Who are you" / about ────────────────────────────
  if (is(msg, [/who are you|what are you|about you|are you a bot|are you ai|are you human/])) {
    return `I'm *Genie* 🧞 — the AI shopping assistant for *${BUSINESS.name}*!\n\nI'm powered by AI and can help you with:\n• Product info & availability\n• Prices & discounts\n• Sizes & fit advice\n• Shipping & returns\n• Placing orders\n\nWhat can I help you with today?`;
  }

  // ── 19. Fallback (handles truly anything) ─────────────────
  return pick([
    `Thanks for your message! 😊 I'm Genie, your shopping assistant for *${BUSINESS.name}*.\n\nI can help you with our clothing collection — products, prices, sizes, delivery and more. What would you like to know?`,
    `Hmm, let me make sure I help you correctly! 🤔\n\nAt *${BUSINESS.name}*, I can assist with:\n• Specific products (e.g. "linen shirt", "high-rise jeans")\n• Pricing & discounts\n• Size guidance\n• Shipping & returns\n\nWhat are you looking for?`,
    `I want to make sure I give you the best answer! At *${BUSINESS.name}*, I specialise in our clothing collection. Could you tell me a bit more about what you're looking for? 🛍️`,
  ]);
};

// ── Public API ───────────────────────────────────────────────
export const generateAIReply = (customerMessage, conversationHistory = []) =>
  new Promise((resolve) => {
    const delay = 600 + Math.random() * 900; // 0.6–1.5s
    setTimeout(() => resolve(buildReply(customerMessage, conversationHistory)), delay);
  });

// Quick-start demo prompts shown in the chat
export const DEMO_PROMPTS = [
  'Do you have linen shirts?',
  'What\'s the price of high-rise jeans?',
  'Show me women\'s collection',
  'Do you offer free shipping?',
  'What\'s your return policy?',
  'Any discounts available?',
  'I want to buy the floral dress',
  'What sizes do the chinos come in?',
];

// Legacy export kept for compatibility
export const SIMULATED_MESSAGES = DEMO_PROMPTS;
