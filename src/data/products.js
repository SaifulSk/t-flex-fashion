// Product Catalog Data for T-Flex Fashion

export const PRODUCTS = [
  {
    id: "heavyweight-oversized-tee",
    name: "Heavyweight Oversized Tee (240 GSM)",
    slug: "heavyweight-oversized-tee",
    tagline: "Ultra-combed luxury cotton with modern streetwear drop shoulders",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 142,
    badge: "Bestseller",
    category: "oversized",
    image: "/images/mockup_black_tee.jpg",
    gallery: [
      "/images/mockup_black_tee.jpg",
      "/images/mockup_white_tee.jpg"
    ],
    description:
      "Crafted from 100% premium combed ring-spun cotton at a substantial 240 GSM. Features dropped shoulders, a reinforced 1.25-inch thick ribbed crew collar, and a relaxed boxy silhouette that drapes effortlessly. Engineered for vibrant DTG (Direct-to-Garment) print longevity.",
    specs: {
      fabric: "100% Ring-Spun Combed Cotton",
      weight: "240 GSM (Heavyweight)",
      fit: "Relaxed Boxy / Drop Shoulder",
      printArea: "12\" x 16\" (Front & Back)",
      washCare: "Machine wash cold inside-out, tumble dry low or hang dry"
    },
    colors: [
      { name: "Pitch Black", hex: "#121214", border: "#333" },
      { name: "Clean White", hex: "#f8f9fa", border: "#ddd" },
      { name: "Charcoal Grey", hex: "#2b2d35", border: "#444" },
      { name: "Forest Green", hex: "#1a3a2a", border: "#2d5a42" },
      { name: "Vintage Navy", hex: "#1b2838", border: "#2c3e50" },
      { name: "Crimson Red", hex: "#7a1c1d", border: "#992224" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    isCustomizable: true
  },
  {
    id: "classic-crewneck-tee",
    name: "Classic Ring-Spun Daily Tee (180 GSM)",
    slug: "classic-crewneck-tee",
    tagline: "Soft, breathable, and pre-shrunk for the ideal everyday fit",
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 98,
    badge: "Essential",
    category: "classic",
    image: "/images/mockup_white_tee.jpg",
    gallery: [
      "/images/mockup_white_tee.jpg",
      "/images/mockup_black_tee.jpg"
    ],
    description:
      "The undisputed foundation of any casual wardrobe. Lightweight yet durable 180 GSM single jersey cotton with double-needle hems and neck tape for supreme comfort. The smooth high-density weave ensures razor-sharp print details.",
    specs: {
      fabric: "100% Bio-Washed Combed Cotton",
      weight: "180 GSM (Medium-weight)",
      fit: "Regular True-to-Size",
      printArea: "11.5\" x 15\" (Front & Back)",
      washCare: "Machine wash cold, iron on reverse side"
    },
    colors: [
      { name: "Clean White", hex: "#ffffff", border: "#ccc" },
      { name: "Pitch Black", hex: "#121214", border: "#333" },
      { name: "Heather Grey", hex: "#9ca3af", border: "#bbb" },
      { name: "Pastel Lavender", hex: "#c4b5fd", border: "#a78bfa" },
      { name: "Butter Yellow", hex: "#fef08a", border: "#fde047" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    isCustomizable: true
  },
  {
    id: "vintage-acid-wash-tee",
    name: "Acid Wash Distressed Tee (220 GSM)",
    slug: "vintage-acid-wash-tee",
    tagline: "Authentic 90s stone-washed mineral finish with artisanal texture",
    price: 1199,
    originalPrice: 1699,
    rating: 4.95,
    reviewCount: 215,
    badge: "Trending",
    category: "vintage",
    image: "/images/mockup_graphic_tee.jpg",
    gallery: [
      "/images/mockup_graphic_tee.jpg",
      "/images/mockup_black_tee.jpg"
    ],
    description:
      "Individually mineral stone-washed for a one-of-a-kind grunge aesthetic. Each tee features subtle distressed ribbing and a worn-in, ultra-plush hand feel. Perfect backdrop for retro, gothic, or high-contrast color graphics.",
    specs: {
      fabric: "100% Mineral-Washed Cotton",
      weight: "220 GSM",
      fit: "Streetwear Boxy Fit",
      printArea: "12\" x 16\" (Front & Back)",
      washCare: "Gentle cycle cold, do not bleach"
    },
    colors: [
      { name: "Acid Charcoal", hex: "#32353b", border: "#4a4e57" },
      { name: "Washed Olive", hex: "#3a4035", border: "#535c4c" },
      { name: "Washed Indigo", hex: "#2b3447", border: "#3f4d69" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    isCustomizable: true
  },
  {
    id: "french-terry-hoodie",
    name: "French Terry Streetwear Hoodie (380 GSM)",
    slug: "french-terry-hoodie",
    tagline: "Dense luxury loopback fleece with a structured double-layer hood",
    price: 1899,
    originalPrice: 2499,
    rating: 5.0,
    reviewCount: 88,
    badge: "Premium Heavy",
    category: "hoodies",
    image: "/images/mockup_hoodie.jpg",
    gallery: [
      "/images/mockup_hoodie.jpg",
      "/images/mockup_black_tee.jpg"
    ],
    description:
      "A heavyweight masterpiece. 380 GSM custom loopback French Terry fleece that maintains structural drape without sagging. Features a double-layered hood without tacky eyelets, hidden kangaroo pocket reinforcement, and ultra-snug ribbed cuffs.",
    specs: {
      fabric: "100% Combed Cotton French Terry Fleece",
      weight: "380 GSM (Heavyweight)",
      fit: "Relaxed Boxy Streetwear Silhouette",
      printArea: "11\" x 13\" (Chest) & 13\" x 17\" (Back)",
      washCare: "Machine wash cold, flat dry recommended"
    },
    colors: [
      { name: "Pitch Black", hex: "#121214", border: "#333" },
      { name: "Washed Charcoal", hex: "#2f3136", border: "#45484f" },
      { name: "Oatmeal Heather", hex: "#e5e0d8", border: "#d0c9bf" },
      { name: "Deep Forest", hex: "#152a1e", border: "#223f2e" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    isCustomizable: true
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "oversized", name: "Oversized Tees" },
  { id: "classic", name: "Classic Essentials" },
  { id: "vintage", name: "Vintage & Acid Wash" },
  { id: "hoodies", name: "Hoodies & Fleece" }
];

// Presets & Cliparts for the Customizer Studio
export const DESIGN_CLIPARTS = [
  {
    id: "skull-cyber",
    name: "Cyberpunk Skull",
    category: "Streetwear",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 8C30.7 8 15 23.7 15 43c0 10.9 5 20.6 12.8 27v11c0 2.8 2.2 5 5 5h34.4c2.8 0 5-2.2 5-5V70c7.8-6.4 12.8-16.1 12.8-27C85 23.7 69.3 8 50 8zm-16 46c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm32 0c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-22 17h12v6H44v-6zm-7 9h6v4h-6v-4zm13 0h6v4h-6v-4zm13 0h6v4h-6v-4z"/></svg>`
  },
  {
    id: "flame-heart",
    name: "Sacred Flame",
    category: "Icons",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 10c-3 12-14 18-12 30 2 10 10 14 12 25 3-10 11-16 12-25 2-12-9-18-12-30zm0 45c-15-18-35 2-25 25 8 18 25 20 25 20s17-2 25-20c10-23-10-43-25-25z"/></svg>`
  },
  {
    id: "retro-sun-wave",
    name: "Kanagawa Wave",
    category: "Vintage",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="4"/><path d="M20 62c8-12 18-8 26-18 6 12 16 10 24 0 6 8 14 6 18 18H20zm0 10h60v4H20v-4zm6-35a12 12 0 1 0 24 0 12 12 0 1 0-24 0z"/></svg>`
  },
  {
    id: "lightning-bold",
    name: "Electric Bolt",
    category: "Icons",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><polygon points="56,6 18,54 46,54 40,94 82,44 52,44"/></svg>`
  },
  {
    id: "wings-emblem",
    name: "Aero Wings",
    category: "Emblems",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 35c-15-20-42-12-46 5 15 2 28 10 36 20-10 0-22 4-28 12 12 0 24 4 30 12-8 3-18 8-22 16 18-2 30-10 38-20 8 10 20 18 38 20-4-8-14-13-22-16 6-8 18-12 30-12-6-8-18-12-28-12 8-10 21-18 36-20-4-17-31-25-46-5z"/></svg>`
  },
  {
    id: "tokyo-stamp",
    name: "Cyber Tokyo",
    category: "Streetwear",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="12" y="12" width="76" height="76" rx="8" fill="none" stroke="currentColor" stroke-width="5"/><text x="50" y="44" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">TOKYO</text><text x="50" y="64" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">東京・限定</text><line x1="22" y1="72" x2="78" y2="72" stroke="currentColor" stroke-width="3"/></svg>`
  },
  {
    id: "barcode-custom",
    name: "Digital Barcode",
    category: "Streetwear",
    svg: `<svg viewBox="0 0 100 60" fill="currentColor"><rect x="10" y="10" width="4" height="40"/><rect x="18" y="10" width="8" height="40"/><rect x="30" y="10" width="3" height="40"/><rect x="37" y="10" width="6" height="40"/><rect x="47" y="10" width="2" height="40"/><rect x="53" y="10" width="9" height="40"/><rect x="66" y="10" width="5" height="40"/><rect x="75" y="10" width="3" height="40"/><rect x="82" y="10" width="8" height="40"/></svg>`
  },
  {
    id: "star-cluster",
    name: "Y2K Stars",
    category: "Icons",
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 15 L56 38 L78 44 L56 50 L50 73 L44 50 L22 44 L44 38 Z"/><path d="M78 68 L81 78 L91 81 L81 84 L78 94 L75 84 L65 81 L75 78 Z"/><path d="M22 68 L25 78 L35 81 L25 84 L22 94 L19 84 L9 81 L19 78 Z"/></svg>`
  }
];

export const AVAILABLE_FONTS = [
  { name: "Montserrat (Modern)", value: "Montserrat, sans-serif" },
  { name: "Impact (Bold Street)", value: "Impact, Charcoal, sans-serif" },
  { name: "Bebas Neue (Athletic)", value: "'Bebas Neue', sans-serif" },
  { name: "Playfair (Luxury Serif)", value: "'Playfair Display', serif" },
  { name: "Pacifico (Vintage Script)", value: "'Pacifico', cursive" },
  { name: "Orbitron (Futuristic Sci-Fi)", value: "'Orbitron', sans-serif" },
  { name: "Permanent Marker (Grunge)", value: "'Permanent Marker', cursive" },
  { name: "Courier New (Tech Monospace)", value: "'Courier New', monospace" }
];
