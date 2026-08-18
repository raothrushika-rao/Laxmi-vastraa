// Laxmi Vastaraa - Database & Persistent Storage Engine
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial 8 Authentic Luxury Saree Masterpieces
const SEED_SAREES = [
  {
    id: 'saree-001',
    sku: 'LV-BAN-001',
    title: 'Midnight Blue Brocade Banarasi Silk Saree',
    slug: 'midnight-blue-brocade-banarasi',
    description: 'An ode to twilight in the sacred ghats of Varanasi. Woven on traditional pit-looms with genuine tested gold zari and pure mulberry katan silk over 45 days.',
    price: 48500,
    compare_at_price: 58000,
    fabric: 'Banarasi',
    weave_type: 'Zari Brocade',
    primary_color: 'Royal Blue',
    work_type: 'Kadwa Jaal & Floral Bootis',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 4,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 24,
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    images: [
      {
        id: 'img-001-1',
        saree_id: 'saree-001',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm6eSds3DlJqh9gMtxAytk8xZQJcf8eOjtj6Kv41wjar3LNzaW9vBJpB8TPxgNSlwr-iek1uRLOps8cB_t1TytQE0hL0mADYDt387SHsBcglqkZ9SWuxUTbfcztl3j3BAhYnf3sF8IN9N8-xc9zT6pAYOBQnmhnp7EerXIyXGOCB2GHba1zhZHeH-jVjElmexAv1RIcBzW2fj_zjWnQi1l-K16j8BA0UmABRtvEJl8XEBMm594ATD5hw',
        alt_text: 'Midnight Blue Brocade Banarasi Full View',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-001-2',
        saree_id: 'saree-001',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Pallu Zari Detail Close-up',
        is_primary: false,
        display_order: 2
      },
      {
        id: 'img-001-3',
        saree_id: 'saree-001',
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Blouse Piece & Border Weave',
        is_primary: false,
        display_order: 3
      }
    ]
  },
  {
    id: 'saree-002',
    sku: 'LV-KAN-002',
    title: 'Crimson & Antique Gold Korvai Kanjeevaram Pattu',
    slug: 'crimson-antique-gold-korvai-kanjeevaram',
    description: 'Interlocked using the ancient Korvai technique with solid temple borders and pure silver electroplated in 24k gold. Heirloom weight of 920 grams pure silk.',
    price: 64000,
    compare_at_price: 76000,
    fabric: 'Kanjeevaram',
    weave_type: 'Handloom',
    primary_color: 'Maroon',
    work_type: 'Korvai Temple Borders & Mayil Motifs',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 2,
    stock_status: 'low_stock',
    reorder_level: 3,
    is_active: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 31,
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    images: [
      {
        id: 'img-002-1',
        saree_id: 'saree-002',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Crimson & Gold Korvai Kanjeevaram Saree',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-002-2',
        saree_id: 'saree-002',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Temple Border Korvai Detail',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'saree-003',
    sku: 'LV-CHA-003',
    title: 'Emerald Tissue Chanderi with Meenakari Butis',
    slug: 'emerald-tissue-chanderi-meenakari',
    description: 'Woven with silk warp and lustrous zari weft from Madhya Pradesh. Weightless elegance adorned with delicate floral Meenakari in emerald and ruby hues.',
    price: 36500,
    compare_at_price: 42000,
    fabric: 'Chanderi',
    weave_type: 'Handloom',
    primary_color: 'Emerald Green',
    work_type: 'Meenakari Zari Butis & Gold Border',
    occasion: 'Festive',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 6,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 4.8,
    reviews_count: 18,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    images: [
      {
        id: 'img-003-1',
        saree_id: 'saree-003',
        image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Emerald Tissue Chanderi Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-004',
    sku: 'LV-PAT-004',
    title: 'Patan Royal Purple Double Ikat Patola Saree',
    slug: 'patan-royal-purple-double-ikat-patola',
    description: 'An extraordinary double-ikat marvel from Patan, Gujarat. Warp and weft threads are tied and dyed prior to weaving with mathematical precision over 6 months.',
    price: 95000,
    compare_at_price: 110000,
    fabric: 'Silk',
    weave_type: 'Ikat',
    primary_color: 'Wine',
    work_type: 'Double Ikat Nari Kunjar & Geometric Motifs',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 1,
    stock_status: 'low_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: false,
    rating: 5.0,
    reviews_count: 9,
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    images: [
      {
        id: 'img-004-1',
        saree_id: 'saree-004',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Patan Double Ikat Patola Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-005',
    sku: 'LV-ORG-005',
    title: 'Blush Rose Katan Organza with Hand-Cut Zari',
    slug: 'blush-rose-katan-organza-handcut-zari',
    description: 'Sheer crisp organza spun from fine Katan silk in a subtle blush rose hue, embellished with hand-cut gold bootas across the body and scalloped border.',
    price: 28000,
    compare_at_price: 34000,
    fabric: 'Organza',
    weave_type: 'Handloom',
    primary_color: 'Pink',
    work_type: 'Hand Cut Work & Floral Scallop Borders',
    occasion: 'Festive',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 8,
    stock_status: 'in_stock',
    reorder_level: 3,
    is_active: true,
    is_featured: false,
    rating: 4.7,
    reviews_count: 14,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    images: [
      {
        id: 'img-005-1',
        saree_id: 'saree-005',
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Blush Rose Organza Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-006',
    sku: 'LV-TUS-006',
    title: 'Ivory & Mustard Handpainted Kalamkari Tussar',
    slug: 'ivory-mustard-handpainted-kalamkari-tussar',
    description: 'Wild Tussar silk naturally dyed and hand-painted in Srikalahasti using organic bamboo pens and vegetable dyes, depicting mythological flora.',
    price: 32000,
    compare_at_price: 38000,
    fabric: 'Cotton',
    weave_type: 'Printed',
    primary_color: 'Ivory',
    work_type: 'Pen Kalamkari & Organic Dyes',
    occasion: 'Formal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 5,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: false,
    rating: 4.8,
    reviews_count: 12,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    images: [
      {
        id: 'img-006-1',
        saree_id: 'saree-006',
        image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Kalamkari Tussar Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-007',
    sku: 'LV-BRI-007',
    title: 'Maharani Gold Shikargah Brocade Saree',
    slug: 'maharani-gold-shikargah-brocade',
    description: 'An imperial heirloom depicting royal hunting scenes (Shikargah) woven with real gold zari warp and pure crimson mulberry silk weft.',
    price: 88000,
    compare_at_price: 105000,
    fabric: 'Banarasi',
    weave_type: 'Zari Brocade',
    primary_color: 'Gold',
    work_type: 'Shikargah Jaal with Real Tested Zari',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 2,
    stock_status: 'low_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 19,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    images: [
      {
        id: 'img-007-1',
        saree_id: 'saree-007',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Maharani Gold Shikargah Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-008',
    sku: 'LV-BAN-008',
    title: 'Rani Pink Kadhwa Jangla Banarasi Pure Silk Saree',
    slug: 'rani-pink-kadhwa-jangla-banarasi',
    description: 'Hand-woven in Varanasi with intricate all-over floral vines (Jangla) in fine silver and gold Kadhwa weaving, finished with heavy scalloped zari pallu.',
    price: 54000,
    compare_at_price: 65000,
    fabric: 'Banarasi',
    weave_type: 'Zari Brocade',
    primary_color: 'Pink',
    work_type: 'Kadhwa Jangla Vine Motifs',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 3,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 22,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    images: [
      {
        id: 'img-008-1',
        saree_id: 'saree-008',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnjuSY8ueWTinDhezIbqleGYcStP7P8-6QlBWr9l0sHJzdsBUcWHH2S7bcV9rQanSqRf-k78h21sIovYP_KMPaULFL3TPbLPMI0lWfepmH4a-hssDOk10oMQNsnvBE1ZpF1EtEWk-nLeA1VjrmXyL4r2ax29P7Yn1m6uveeTpuG0EQm76W_nqVxeasEGnpEYzWWIMQuY2CRQDdIXCj4UwRCBZ-pNqI_pPQF8cY_NTgryjQWlbrT0VJg',
        alt_text: 'Rani Pink Kadhwa Jangla Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  }
];

// Initial Seed Users (Synced with Firebase UID)
const SEED_USERS = [
  {
    uid: 'admin-uid-001',
    full_name: 'Laxmi Vastaraa Royal Curator',
    email: 'admin@laxmivastaraa.com',
    phone_number: '+91 98290 12345',
    role: 'admin',
    shipping_address: {
      street: '1 Royal Atelier Boulevard',
      city: 'Jaipur',
      state: 'Rajasthan',
      postal_code: '302001'
    },
    wishlist_items: ['saree-001', 'saree-002'],
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    uid: 'customer-uid-001',
    full_name: 'Radha Sharma',
    email: 'radha.sharma@heritage.in',
    phone_number: '+91 98765 43210',
    role: 'customer',
    shipping_address: {
      street: '102 Heritage Lane',
      city: 'Jaipur',
      state: 'Rajasthan',
      postal_code: '302001'
    },
    wishlist_items: ['saree-001', 'saree-003'],
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Initial Seed Orders
const SEED_ORDERS = [
  {
    order_id: 'ord-101',
    order_number: 'LV-2026-001',
    customer_uid: 'customer-uid-001',
    customer_name: 'Maharani Divya Rathore',
    customer_email: 'divya.rathore@heritage.in',
    customer_phone: '+91 98290 54321',
    shipping_address: 'Rathore Haveli, Civil Lines',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302006',
    payment_method: 'Online Payment',
    payment_status: 'Paid',
    order_status: 'Delivered',
    subtotal: 64000,
    discount: 6400,
    shipping_fee: 0,
    total_amount: 57600,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    items: [
      {
        id: 'item-101-1',
        order_id: 'ord-101',
        saree_id: 'saree-002',
        quantity: 1,
        unit_price: 64000,
        blouse_option: 'custom-tailored',
        saree_title: 'Crimson & Antique Gold Korvai Kanjeevaram Pattu'
      }
    ]
  },
  {
    order_id: 'ord-102',
    order_number: 'LV-2026-002',
    customer_uid: 'customer-uid-001',
    customer_name: 'Radha Sharma',
    customer_email: 'radha.sharma@heritage.in',
    customer_phone: '+91 98765 43210',
    shipping_address: '102 Heritage Lane',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    payment_method: 'COD',
    payment_status: 'Pending',
    order_status: 'Processing',
    subtotal: 48500,
    discount: 0,
    shipping_fee: 0,
    total_amount: 48500,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    items: [
      {
        id: 'item-102-1',
        order_id: 'ord-102',
        saree_id: 'saree-001',
        quantity: 1,
        unit_price: 48500,
        blouse_option: 'unstitched',
        saree_title: 'Midnight Blue Brocade Banarasi Silk Saree'
      }
    ]
  }
];

class Database {
  constructor() {
    this.data = {
      sarees: [],
      orders: [],
      users: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!Array.isArray(this.data.users) || this.data.users.length === 0) {
          this.data.users = SEED_USERS;
          this.save();
        }
      } else {
        this.data = {
          sarees: SEED_SAREES,
          orders: SEED_ORDERS,
          users: SEED_USERS
        };
        this.save();
      }
    } catch (e) {
      console.error('Error loading database, resetting to seed:', e);
      this.data = { sarees: SEED_SAREES, orders: SEED_ORDERS, users: SEED_USERS };
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save db.json:', e);
    }
  }

  // --- USER AUTH & PROFILES CRUD ---
  getUserByUid(uid) {
    if (!uid) return null;
    return this.data.users.find(u => u.uid === uid) || null;
  }

  getUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    return this.data.users.find(u => u.email.toLowerCase().trim() === cleanEmail) || null;
  }

  createUser(userData) {
    const uid = userData.uid || `user-${Date.now()}`;
    const email = (userData.email || '').toLowerCase().trim();

    // Check if user already exists
    const existing = this.getUserByUid(uid) || this.getUserByEmail(email);
    if (existing) {
      if (uid) existing.uid = uid;
      return this.updateUserProfile(existing.uid, userData);
    }

    // Role determination: default to admin if email contains admin@ or matching admin list
    let role = userData.role || 'customer';
    if (email === 'admin@laxmivastaraa.com' || email === 'admin@laxmivastraa.com') {
      role = 'admin';
    }

    const newUser = {
      uid,
      full_name: userData.full_name || userData.displayName || 'Patron of Vastaraa',
      email,
      phone_number: userData.phone_number || '',
      role,
      shipping_address: userData.shipping_address || {
        street: '',
        city: '',
        state: '',
        postal_code: ''
      },
      wishlist_items: Array.isArray(userData.wishlist_items) ? userData.wishlist_items : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUserProfile(uid, updateData) {
    const user = this.getUserByUid(uid);
    if (!user) return null;

    if (updateData.full_name !== undefined) user.full_name = updateData.full_name;
    if (updateData.phone_number !== undefined) user.phone_number = updateData.phone_number;
    if (updateData.shipping_address !== undefined) {
      user.shipping_address = {
        ...user.shipping_address,
        ...updateData.shipping_address
      };
    }
    if (Array.isArray(updateData.wishlist_items)) {
      user.wishlist_items = updateData.wishlist_items;
    }
    if (updateData.role && (updateData.role === 'admin' || updateData.role === 'customer')) {
      user.role = updateData.role;
    }

    user.updated_at = new Date().toISOString();
    this.save();
    return user;
  }

  syncWishlist(uid, wishlistItems) {
    const user = this.getUserByUid(uid);
    if (!user) return null;
    user.wishlist_items = Array.isArray(wishlistItems) ? wishlistItems : [];
    user.updated_at = new Date().toISOString();
    this.save();
    return user.wishlist_items;
  }

  getWishlist(uid) {
    const user = this.getUserByUid(uid);
    return user ? user.wishlist_items : [];
  }

  getUserOrders(uidOrEmail) {
    if (!uidOrEmail) return [];
    return this.data.orders.filter(o => 
      o.customer_uid === uidOrEmail || 
      (o.customer_email && o.customer_email.toLowerCase() === uidOrEmail.toLowerCase())
    );
  }

  // --- SAREES CRUD ---
  getAllSarees(filters = {}) {
    let result = [...this.data.sarees];

    if (!filters.includeInactive) {
      result = result.filter(s => s.is_active !== false);
    }

    if (filters.fabric && filters.fabric !== 'all') {
      result = result.filter(s => s.fabric.toLowerCase() === filters.fabric.toLowerCase());
    }

    if (filters.weave_type && filters.weave_type !== 'all') {
      result = result.filter(s => s.weave_type.toLowerCase().includes(filters.weave_type.toLowerCase()));
    }

    if (filters.primary_color && filters.primary_color !== 'all') {
      result = result.filter(s => s.primary_color.toLowerCase() === filters.primary_color.toLowerCase());
    }

    if (filters.occasion && filters.occasion !== 'all') {
      result = result.filter(s => s.occasion.toLowerCase() === filters.occasion.toLowerCase());
    }

    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      result = result.filter(s => s.price <= max);
    }

    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      result = result.filter(s => s.price >= min);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.sku.toLowerCase().includes(q) ||
        s.fabric.toLowerCase().includes(q) ||
        s.primary_color.toLowerCase().includes(q) ||
        (s.work_type && s.work_type.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'price_asc':
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return result;
  }

  getSareeById(idOrSlug) {
    return this.data.sarees.find(s => s.id === idOrSlug || s.slug === idOrSlug || s.sku === idOrSlug) || null;
  }

  createSaree(data) {
    const id = `saree-${Date.now()}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sku = data.sku || `LV-${(data.fabric || 'WEAVE').slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const stockQty = parseInt(data.stock_quantity ?? 5, 10);
    const reorderLevel = parseInt(data.reorder_level ?? 2, 10);
    let stockStatus = 'in_stock';
    if (stockQty <= 0) stockStatus = 'out_of_stock';
    else if (stockQty <= reorderLevel) stockStatus = 'low_stock';

    let formattedImages = [];
    if (Array.isArray(data.images)) {
      formattedImages = data.images.map((img, i) => {
        if (typeof img === 'string') {
          return {
            id: `img-${id}-${i + 1}`,
            saree_id: id,
            image_url: img,
            alt_text: `${data.title} View ${i + 1}`,
            is_primary: i === 0,
            display_order: i + 1
          };
        }
        return img;
      });
    } else if (data.image_url) {
      formattedImages = [{
        id: `img-${id}-1`,
        saree_id: id,
        image_url: data.image_url,
        alt_text: data.title,
        is_primary: true,
        display_order: 1
      }];
    }

    const newSaree = {
      id,
      sku,
      title: data.title,
      slug,
      description: data.description || '',
      price: parseFloat(data.price),
      compare_at_price: data.compare_at_price ? parseFloat(data.compare_at_price) : null,
      fabric: data.fabric || 'Banarasi',
      weave_type: data.weave_type || 'Handloom',
      primary_color: data.primary_color || 'Maroon',
      work_type: data.work_type || 'Zari Brocade',
      occasion: data.occasion || 'Bridal',
      saree_length: data.saree_length || '5.5m Saree + 0.8m Blouse',
      blouse_included: data.blouse_included !== undefined ? Boolean(data.blouse_included) : true,
      stock_quantity: stockQty,
      stock_status: stockStatus,
      reorder_level: reorderLevel,
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
      is_featured: Boolean(data.is_featured),
      rating: 5.0,
      reviews_count: 1,
      created_at: new Date().toISOString(),
      images: formattedImages
    };

    this.data.sarees.unshift(newSaree);
    this.save();
    return newSaree;
  }

  updateSaree(id, updates) {
    const index = this.data.sarees.findIndex(s => s.id === id);
    if (index === -1) return null;

    const current = this.data.sarees[index];

    let newStock = updates.stock_quantity !== undefined ? parseInt(updates.stock_quantity, 10) : current.stock_quantity;
    let reorder = updates.reorder_level !== undefined ? parseInt(updates.reorder_level, 10) : current.reorder_level;

    let stockStatus = 'in_stock';
    if (newStock <= 0) stockStatus = 'out_of_stock';
    else if (newStock <= reorder) stockStatus = 'low_stock';

    let formattedImages = current.images;
    if (Array.isArray(updates.images)) {
      formattedImages = updates.images.map((img, i) => {
        if (typeof img === 'string') {
          return {
            id: `img-${id}-${i + 1}`,
            saree_id: id,
            image_url: img,
            alt_text: `${updates.title || current.title} View ${i + 1}`,
            is_primary: i === 0,
            display_order: i + 1
          };
        }
        return img;
      });
    }

    const updated = {
      ...current,
      ...updates,
      price: updates.price ? parseFloat(updates.price) : current.price,
      compare_at_price: updates.compare_at_price !== undefined ? (updates.compare_at_price ? parseFloat(updates.compare_at_price) : null) : current.compare_at_price,
      stock_quantity: newStock,
      reorder_level: reorder,
      stock_status: stockStatus,
      images: formattedImages
    };

    this.data.sarees[index] = updated;
    this.save();
    return updated;
  }

  deleteSaree(id) {
    const index = this.data.sarees.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.data.sarees.splice(index, 1);
    this.save();
    return true;
  }

  // --- ORDERS CRUD & 2-STEP ATOMIC TRANSACTION FLOW ---

  // Step 1: Pre-Order Draft Creation (Stock is checked but NOT yet decremented)
  createDraftOrder(orderPayload) {
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `LV-2026-${String(this.data.orders.length + 1).padStart(3, '0')}`;

    let calculatedSubtotal = 0;
    const orderItems = [];

    // Verify stock availability without decrementing yet
    for (const item of orderPayload.items) {
      const saree = this.getSareeById(item.saree_id);
      if (!saree) {
        throw new Error(`Saree item ${item.saree_id} was not found in our catalog.`);
      }

      if (saree.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for "${saree.title}". Only ${saree.stock_quantity} available.`);
      }

      const blouseFee = item.blouse_option === 'custom-tailored' ? 2500 * item.quantity : 0;
      const itemTotal = (saree.price * item.quantity) + blouseFee;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        order_id: orderId,
        saree_id: saree.id,
        quantity: item.quantity,
        unit_price: saree.price,
        blouse_option: item.blouse_option || 'unstitched',
        saree_title: saree.title,
        image_url: saree.images?.[0]?.image_url || saree.images?.[0] || ''
      });
    }

    const discount = parseFloat(orderPayload.discount || 0);
    const shippingFee = 0; // Complimentary white-glove insured delivery
    const totalAmount = Math.max(0, calculatedSubtotal - discount + shippingFee);

    const draftOrder = {
      order_id: orderId,
      order_number: orderNumber,
      customer_uid: orderPayload.customer_uid || 'guest-patron',
      customer_name: orderPayload.customer_name,
      customer_email: orderPayload.customer_email,
      customer_phone: orderPayload.customer_phone,
      shipping_address: orderPayload.shipping_address,
      city: orderPayload.city || 'Jaipur',
      state: orderPayload.state || 'Rajasthan',
      pincode: orderPayload.pincode || '302001',
      payment_method: orderPayload.payment_method || 'Online Payment (Razorpay)',
      payment_status: 'Pending',
      order_status: 'Draft',
      subtotal: calculatedSubtotal,
      discount,
      shipping_fee: shippingFee,
      total_amount: totalAmount,
      gateway_order_id: orderPayload.gateway_order_id || null,
      created_at: new Date().toISOString(),
      items: orderItems
    };

    this.data.orders.unshift(draftOrder);
    this.save();
    return draftOrder;
  }

  // Step 2A: Confirm Online Payment & Atomically Deduct Saree Stock
  confirmOrderPayment(orderIdOrNumber, paymentDetails = {}) {
    const order = this.getOrderById(orderIdOrNumber);
    if (!order) {
      throw new Error(`Order ${orderIdOrNumber} not found.`);
    }

    // Idempotency: if already paid, return existing order
    if (order.payment_status === 'Paid' && order.order_status === 'Placed') {
      return order;
    }

    // Verify and atomically deduct inventory stock
    for (const item of order.items) {
      const saree = this.getSareeById(item.saree_id);
      if (!saree) {
        throw new Error(`Saree ${item.saree_id} is no longer available in the catalog.`);
      }

      if (saree.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for "${saree.title}". Only ${saree.stock_quantity} remaining.`);
      }

      // Decrement stock
      saree.stock_quantity -= item.quantity;
      if (saree.stock_quantity <= 0) {
        saree.stock_status = 'out_of_stock';
      } else if (saree.stock_quantity <= saree.reorder_level) {
        saree.stock_status = 'low_stock';
      }
    }

    // Update order status
    order.payment_status = 'Paid';
    order.order_status = 'Placed';
    order.gateway_payment_id = paymentDetails.payment_id || paymentDetails.razorpay_payment_id || `pay_${Date.now()}`;
    order.gateway_order_id = paymentDetails.gateway_order_id || paymentDetails.razorpay_order_id || order.gateway_order_id;
    order.gateway_signature = paymentDetails.signature || paymentDetails.razorpay_signature || null;
    order.payment_method = paymentDetails.payment_method || order.payment_method || 'Online Payment (Razorpay)';
    order.paid_at = new Date().toISOString();
    order.updated_at = new Date().toISOString();

    this.save();
    return order;
  }

  // Step 2B: Create Cash on Delivery (COD) Order & Atomically Deduct Stock
  createCodOrder(orderPayload) {
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `LV-2026-${String(this.data.orders.length + 1).padStart(3, '0')}`;

    let calculatedSubtotal = 0;
    const orderItems = [];

    // Verify & atomically deduct inventory stock
    for (const item of orderPayload.items) {
      const saree = this.getSareeById(item.saree_id);
      if (!saree) {
        throw new Error(`Saree item ${item.saree_id} was not found in our catalog.`);
      }

      if (saree.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for "${saree.title}". Only ${saree.stock_quantity} available.`);
      }

      // Atomic stock decrement
      saree.stock_quantity -= item.quantity;
      if (saree.stock_quantity <= 0) {
        saree.stock_status = 'out_of_stock';
      } else if (saree.stock_quantity <= saree.reorder_level) {
        saree.stock_status = 'low_stock';
      }

      const blouseFee = item.blouse_option === 'custom-tailored' ? 2500 * item.quantity : 0;
      const itemTotal = (saree.price * item.quantity) + blouseFee;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        order_id: orderId,
        saree_id: saree.id,
        quantity: item.quantity,
        unit_price: saree.price,
        blouse_option: item.blouse_option || 'unstitched',
        saree_title: saree.title,
        image_url: saree.images?.[0]?.image_url || saree.images?.[0] || ''
      });
    }

    const discount = parseFloat(orderPayload.discount || 0);
    const shippingFee = 0;
    const totalAmount = Math.max(0, calculatedSubtotal - discount + shippingFee);

    const newOrder = {
      order_id: orderId,
      order_number: orderNumber,
      customer_uid: orderPayload.customer_uid || 'guest-patron',
      customer_name: orderPayload.customer_name,
      customer_email: orderPayload.customer_email,
      customer_phone: orderPayload.customer_phone,
      shipping_address: orderPayload.shipping_address,
      city: orderPayload.city || 'Jaipur',
      state: orderPayload.state || 'Rajasthan',
      pincode: orderPayload.pincode || '302001',
      payment_method: 'Cash on Delivery (Insured)',
      payment_status: 'Pending (COD)',
      order_status: 'Placed',
      subtotal: calculatedSubtotal,
      discount,
      shipping_fee: shippingFee,
      total_amount: totalAmount,
      created_at: new Date().toISOString(),
      items: orderItems
    };

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  // Handle Payment Failure / Modal Cancellation
  markOrderFailed(orderIdOrNumber, failureReason = 'Payment cancelled or gateway error.') {
    const order = this.getOrderById(orderIdOrNumber);
    if (!order) return null;

    order.payment_status = 'Failed';
    order.failure_reason = failureReason;
    order.updated_at = new Date().toISOString();
    this.save();
    return order;
  }

  // Standard Direct Order Placement (Backward compatibility & COD fallback)
  createOrder(orderPayload) {
    if (orderPayload.payment_method === 'Cash on Delivery (Insured)' || 
        orderPayload.payment_method === 'COD' || 
        orderPayload.payment_status === 'Pending (COD)') {
      return this.createCodOrder(orderPayload);
    }

    // If online direct placement (e.g. verified or demo)
    const draft = this.createDraftOrder(orderPayload);
    return this.confirmOrderPayment(draft.order_id, {
      payment_id: orderPayload.payment_id || `pay_${Date.now()}`,
      signature: orderPayload.signature || 'sig_direct',
      payment_method: orderPayload.payment_method || 'Online Payment (Razorpay)'
    });
  }

  getAllOrders(filters = {}) {
    let result = [...this.data.orders];

    if (filters.payment_method && filters.payment_method !== 'all') {
      result = result.filter(o => o.payment_method.toLowerCase() === filters.payment_method.toLowerCase());
    }

    if (filters.order_status && filters.order_status !== 'all') {
      result = result.filter(o => o.order_status.toLowerCase() === filters.order_status.toLowerCase());
    }

    if (filters.payment_status && filters.payment_status !== 'all') {
      result = result.filter(o => o.payment_status.toLowerCase() === filters.payment_status.toLowerCase());
    }

    return result;
  }

  getOrderById(orderIdOrNumber) {
    return this.data.orders.find(o => 
      o.order_id === orderIdOrNumber || 
      o.order_number === orderIdOrNumber || 
      o.gateway_order_id === orderIdOrNumber
    ) || null;
  }

  updateOrderStatus(orderId, { order_status, payment_status }) {
    const order = this.data.orders.find(o => o.order_id === orderId || o.order_number === orderId);
    if (!order) return null;

    if (order_status) order.order_status = order_status;
    if (payment_status) order.payment_status = payment_status;

    order.updated_at = new Date().toISOString();
    this.save();
    return order;
  }

  // --- ADMIN METRICS ---
  getMetrics() {
    const totalSarees = this.data.sarees.length;
    const lowStockSarees = this.data.sarees.filter(s => s.stock_quantity <= s.reorder_level);
    const lowStockCount = lowStockSarees.length;
    const pendingOrders = this.data.orders.filter(o => o.order_status === 'Placed' || o.order_status === 'Processing').length;
    const totalRevenue = this.data.orders.reduce((sum, o) => {
      if (o.payment_status === 'Paid' || o.payment_status === 'Pending (COD)') {
        return sum + o.total_amount;
      }
      return sum;
    }, 0);

    return {
      total_sarees: totalSarees,
      low_stock_count: lowStockCount,
      low_stock_sarees: lowStockSarees,
      pending_orders: pendingOrders,
      total_revenue: totalRevenue,
      total_orders_count: this.data.orders.length,
      total_users_count: this.data.users.length
    };
  }

  // --- PINCODE CHECKER ---
  checkPincode(pin) {
    const cleanPin = String(pin).trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      return {
        valid: false,
        serviceable: false,
        message: 'Invalid 6-digit Indian PIN code format.'
      };
    }

    // Metro & Tier 1 prefixes
    const isNorthMetro = cleanPin.startsWith('11') || cleanPin.startsWith('30') || cleanPin.startsWith('22');
    const isWestMetro = cleanPin.startsWith('40') || cleanPin.startsWith('38') || cleanPin.startsWith('41');
    const isSouthMetro = cleanPin.startsWith('56') || cleanPin.startsWith('60') || cleanPin.startsWith('50');

    let estimatedDays = 4;
    let hub = 'Regional Dispatch Center';

    if (isNorthMetro) {
      estimatedDays = 2;
      hub = 'Varanasi Central Atelier Hub';
    } else if (isWestMetro) {
      estimatedDays = 3;
      hub = 'Mumbai Luxury Transit Hub';
    } else if (isSouthMetro) {
      estimatedDays = 3;
      hub = 'Kanchipuram Silk Express Center';
    }

    return {
      valid: true,
      pincode: cleanPin,
      serviceable: true,
      cod_available: true,
      express_delivery: true,
      estimated_days: estimatedDays,
      dispatch_hub: hub,
      message: `Delivers in ${estimatedDays} business days via Insured Royal Courier. Cash on Delivery (COD) is available.`
    };
  }
}

export const db = new Database();
