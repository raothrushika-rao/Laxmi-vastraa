// Laxmi Vastaraa - Luxury Handloom Catalog Data & Categories
export const CATEGORIES = [
  { id: 'all', name: 'All Heirlooms', icon: 'auto_awesome' },
  { id: 'Banarasi', name: 'Royal Banarasi', icon: 'temple_hindu' },
  { id: 'Kanjeevaram', name: 'Kanjeevaram Gold', icon: 'diamond' },
  { id: 'Chanderi', name: 'Chanderi Tissue', icon: 'filter_vintage' },
  { id: 'Organza', name: 'Katan Organza', icon: 'flare' },
  { id: 'Cotton', name: 'Handpainted Tussar', icon: 'brush' },
  { id: 'Bridal', name: 'Heritage Bridal', icon: 'crown' }
];

export const COLOR_SWATCHES = [
  { name: 'All', hex: 'transparent', id: 'all' },
  { name: 'Maroon', hex: '#71001E', id: 'Maroon' },
  { name: 'Royal Blue', hex: '#1E3A8A', id: 'Royal Blue' },
  { name: 'Gold', hex: '#D4AF37', id: 'Gold' },
  { name: 'Emerald Green', hex: '#065F46', id: 'Emerald Green' },
  { name: 'Pink', hex: '#DB2777', id: 'Pink' },
  { name: 'Ivory', hex: '#FFFDD0', id: 'Ivory' },
  { name: 'Wine', hex: '#490010', id: 'Wine' }
];

export const WEAVE_TYPES = [
  'All Weaves',
  'Handloom',
  'Zari Brocade',
  'Ikat',
  'Printed'
];

export const FABRICS = [
  'All Fabrics',
  'Banarasi',
  'Kanjeevaram',
  'Chanderi',
  'Organza',
  'Georgette',
  'Cotton'
];

export const OCCASIONS = [
  'All Occasions',
  'Bridal',
  'Festive',
  'Formal'
];

export const PROMO_CODES = {
  'HERITAGE10': { discountPercent: 10, description: '10% Royal Privilege on Handlooms' },
  'ROYAL20': { discountPercent: 20, minAmount: 100000, description: '20% Grand Heritage Salon Discount' },
  'FIRSTWEAVE': { flatDiscount: 5000, minAmount: 50000, description: '₹5,000 Welcome Voucher for Curated Weaves' }
};

export const INITIAL_PRODUCTS = [
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
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm6eSds3DlJqh9gMtxAytk8xZQJcf8eOjtj6Kv41wjar3LNzaW9vBJpB8TPxgNSlwr-iek1uRLOps8cB_t1TytQE0hL0mADYDt387SHsBcglqkZ9SWuxUTbfcztl3j3BAhYnf3sF8IN9N8-xc9zT6pAYOBQnmhnp7EerXIyXGOCB2GHba1zhZHeH-jVjElmexAv1RIcBzW2fj_zjWnQi1l-K16j8BA0UmABRtvEJl8XEBMm594ATD5hw',
        alt_text: 'Korvai Joint & Pallu Detail',
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
    description: 'Sheer silk-cotton tissue interwoven with micro-spun gold zari and hand-enamelled floral meenakari motifs. Ethereal, lightweight, and luminous.',
    price: 32500,
    compare_at_price: 38000,
    fabric: 'Chanderi',
    weave_type: 'Handloom',
    primary_color: 'Emerald Green',
    work_type: 'Meenakari Floral Bootis',
    occasion: 'Festive',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 6,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 4.8,
    reviews_count: 14,
    images: [
      {
        id: 'img-003-1',
        saree_id: 'saree-003',
        image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Emerald Tissue Chanderi Saree',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-003-2',
        saree_id: 'saree-003',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Chanderi Zari Pallu Detail',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'saree-004',
    sku: 'LV-PAT-004',
    title: 'Patan Royal Purple Double Ikat Patola Saree',
    slug: 'patan-royal-purple-double-ikat-patola',
    description: 'An engineering masterpiece created by the Salvi master weavers of Patan. Warp and weft are tie-dyed individually with botanical pigments before handloom weaving.',
    price: 115000,
    compare_at_price: 135000,
    fabric: 'Kanjeevaram',
    weave_type: 'Ikat',
    primary_color: 'Wine',
    work_type: 'Double Ikat Geometric & Elephants',
    occasion: 'Formal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 1,
    stock_status: 'low_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: false,
    rating: 5.0,
    reviews_count: 9,
    images: [
      {
        id: 'img-004-1',
        saree_id: 'saree-004',
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Patan Double Ikat Patola Saree',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-004-2',
        saree_id: 'saree-004',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm6eSds3DlJqh9gMtxAytk8xZQJcf8eOjtj6Kv41wjar3LNzaW9vBJpB8TPxgNSlwr-iek1uRLOps8cB_t1TytQE0hL0mADYDt387SHsBcglqkZ9SWuxUTbfcztl3j3BAhYnf3sF8IN9N8-xc9zT6pAYOBQnmhnp7EerXIyXGOCB2GHba1zhZHeH-jVjElmexAv1RIcBzW2fj_zjWnQi1l-K16j8BA0UmABRtvEJl8XEBMm594ATD5hw',
        alt_text: 'Double Ikat Weave Detail',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'saree-005',
    sku: 'LV-ORG-005',
    title: 'Blush Rose Katan Organza with Hand-Cut Zari',
    slug: 'blush-rose-katan-organza-zari',
    description: 'Delicate spun sheer organza featuring antique gold cutwork kadwa borders and shimmering rose petal undertones. Perfect for contemporary cocktail receptions.',
    price: 36000,
    compare_at_price: 42000,
    fabric: 'Organza',
    weave_type: 'Handloom',
    primary_color: 'Pink',
    work_type: 'Hand Cutwork Zari Borders',
    occasion: 'Formal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 5,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 4.7,
    reviews_count: 12,
    images: [
      {
        id: 'img-005-1',
        saree_id: 'saree-005',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Blush Rose Katan Organza Saree',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-005-2',
        saree_id: 'saree-005',
        image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Organza Border Texture',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'saree-006',
    sku: 'LV-TUS-006',
    title: 'Ivory & Mustard Handpainted Kalamkari Tussar',
    slug: 'ivory-mustard-handpainted-kalamkari-tussar',
    description: 'Wild kosa tussar silk organically textured with natural river dyes. Illustrating mythological courtly garden motifs with fine bamboo pen detailing.',
    price: 28500,
    compare_at_price: 34000,
    fabric: 'Cotton',
    weave_type: 'Printed',
    primary_color: 'Ivory',
    work_type: 'Pen Kalamkari & Vegetable Dyes',
    occasion: 'Festive',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 4,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: false,
    rating: 4.9,
    reviews_count: 19,
    images: [
      {
        id: 'img-006-1',
        saree_id: 'saree-006',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Kalamkari Tussar Silk Saree',
        is_primary: true,
        display_order: 1
      }
    ]
  },
  {
    id: 'saree-007',
    sku: 'LV-BRI-007',
    title: 'Maharani Gold Shikargah Brocade Saree',
    slug: 'maharani-gold-shikargah-brocade-saree',
    description: 'The pinnacle of Varanasi weaving. Intricate hunting expedition tableaux with running motifs of royal deer, swans, and palatial foliage in 24k gold zari.',
    price: 89000,
    compare_at_price: 105000,
    fabric: 'Banarasi',
    weave_type: 'Zari Brocade',
    primary_color: 'Gold',
    work_type: 'Full Shikargah Hunting Scenes in Real Zari',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 3,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 27,
    images: [
      {
        id: 'img-007-1',
        saree_id: 'saree-007',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm6eSds3DlJqh9gMtxAytk8xZQJcf8eOjtj6Kv41wjar3LNzaW9vBJpB8TPxgNSlwr-iek1uRLOps8cB_t1TytQE0hL0mADYDt387SHsBcglqkZ9SWuxUTbfcztl3j3BAhYnf3sF8IN9N8-xc9zT6pAYOBQnmhnp7EerXIyXGOCB2GHba1zhZHeH-jVjElmexAv1RIcBzW2fj_zjWnQi1l-K16j8BA0UmABRtvEJl8XEBMm594ATD5hw',
        alt_text: 'Maharani Gold Shikargah Saree Front',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-007-2',
        saree_id: 'saree-007',
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Shikargah Pallu Detail',
        is_primary: false,
        display_order: 2
      }
    ]
  },
  {
    id: 'saree-008',
    sku: 'LV-BAN-008',
    title: 'Rani Pink Kadhwa Jangla Banarasi Pure Silk Saree',
    slug: 'rani-pink-kadhwa-jangla-banarasi',
    description: 'A masterpiece created with interlocking floral vines (Jangla) that spread continuously across the fabric without breaks. Heavy ceremonial border and regal sheen.',
    price: 54000,
    compare_at_price: 65000,
    fabric: 'Banarasi',
    weave_type: 'Zari Brocade',
    primary_color: 'Pink',
    work_type: 'Full Jangla Floral Vines in Gold & Silver',
    occasion: 'Bridal',
    saree_length: '5.5m Saree + 0.8m Blouse',
    blouse_included: true,
    stock_quantity: 4,
    stock_status: 'in_stock',
    reorder_level: 2,
    is_active: true,
    is_featured: false,
    rating: 4.9,
    reviews_count: 15,
    images: [
      {
        id: 'img-008-1',
        saree_id: 'saree-008',
        image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Rani Pink Jangla Banarasi Saree',
        is_primary: true,
        display_order: 1
      },
      {
        id: 'img-008-2',
        saree_id: 'saree-008',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        alt_text: 'Jangla Weaving Close-up',
        is_primary: false,
        display_order: 2
      }
    ]
  }
];
