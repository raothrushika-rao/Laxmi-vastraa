// Laxmi Vastaraa - Luxury Page Layouts & Screens
import { store } from './state.js';
import { 
  renderProductCard, 
  renderQuickViewModal, 
  renderCartDrawer, 
  renderSearchModal 
} from './components.js';

// ----------------------------------------------------
// 1. HOME / ATELIER SHOWCASE PAGE
// ----------------------------------------------------
export function renderHomePage() {
  const featuredProducts = store.getProducts().filter(p => p.is_featured);
  const banarasiPicks = store.getProducts().filter(p => p.fabric.toLowerCase() === 'banarasi').slice(0, 4);

  return `
    <div class="animate-fade-in space-y-16 sm:space-y-24 pb-16">
      
      <!-- Hero Section -->
      <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <!-- Hero Background Media Overlay -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85" 
            alt="Royal Heritage Banarasi Saree Drape"
            class="w-full h-full object-cover object-center opacity-40 mix-blend-overlay filter brightness-90 contrast-110"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
          <div class="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary/80"></div>
        </div>

        <div class="relative z-10 max-w-container-max mx-auto px-4 md:px-8 py-20 text-left w-full">
          <div class="max-w-2xl space-y-6">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-antique-gold/20 border border-antique-gold/40 text-antique-gold text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>The Autumn/Winter 2026 Bridal Archive</span>
            </div>

            <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Woven for Eternity.
            </h1>

            <p class="text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-xl">
              Immerse yourself in handloom opulence. Pure gold and tested silver zari interlaced with certified mulberry silk from master pit-looms of Varanasi and Kanchipuram.
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <a 
                href="#catalog" 
                class="bg-antique-gold hover:bg-yellow-600 text-deep-charcoal font-bold text-xs uppercase tracking-widest px-8 py-4 rounded shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                Explore Atelier Catalog
              </a>
              <a 
                href="#catalog?category=Bridal" 
                class="border border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded backdrop-blur-sm transition-all"
              >
                The Bridal Salon
              </a>
            </div>

            <!-- Trust Micro-Badges -->
            <div class="grid grid-cols-3 gap-4 pt-8 border-t border-white/20 text-xs">
              <div>
                <strong class="block text-antique-gold font-serif text-sm">100%</strong>
                <span class="text-neutral-300 text-[11px]">Silk Mark Certified</span>
              </div>
              <div>
                <strong class="block text-antique-gold font-serif text-sm">300+ Hrs</strong>
                <span class="text-neutral-300 text-[11px]">Handloom Artistry</span>
              </div>
              <div>
                <strong class="block text-antique-gold font-serif text-sm">Insured</strong>
                <span class="text-neutral-300 text-[11px]">Complimentary Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Heritage Category Grid -->
      <section class="max-w-container-max mx-auto px-4 md:px-8">
        <div class="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Curated Looms</span>
          <h2 class="font-serif text-3xl font-bold text-deep-charcoal">The Royal Weaving Traditions</h2>
          <p class="text-xs text-neutral-600">Select a revered lineage of Indian textile artisanship</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Category Card 1: Banarasi -->
          <a href="#catalog?category=Banarasi" class="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" alt="Banarasi" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span class="text-[10px] uppercase tracking-widest text-antique-gold font-bold">Varanasi Lineage</span>
              <h3 class="font-serif text-xl font-bold">Royal Banarasi</h3>
              <p class="text-[11px] text-white/80 line-clamp-1">Katan silk with kadhwa real silver zari work</p>
            </div>
          </a>

          <!-- Category Card 2: Kanjeevaram -->
          <a href="#catalog?category=Kanjeevaram" class="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all">
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80" alt="Kanjeevaram" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span class="text-[10px] uppercase tracking-widest text-antique-gold font-bold">Tamil Nadu Temple Looms</span>
              <h3 class="font-serif text-xl font-bold">Kanjeevaram Pattu</h3>
              <p class="text-[11px] text-white/80 line-clamp-1">Heavy korvai borders with temple gopuram motifs</p>
            </div>
          </a>

          <!-- Category Card 3: Chanderi -->
          <a href="#catalog?category=Chanderi" class="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all">
            <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" alt="Chanderi" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span class="text-[10px] uppercase tracking-widest text-antique-gold font-bold">Madhya Pradesh Weaves</span>
              <h3 class="font-serif text-xl font-bold">Chanderi Tissue</h3>
              <p class="text-[11px] text-white/80 line-clamp-1">Gossamer silk with lightweight gold bootis</p>
            </div>
          </a>

          <!-- Category Card 4: Bridal Salon -->
          <a href="#catalog?category=Bridal" class="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-all">
            <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80" alt="Bridal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span class="text-[10px] uppercase tracking-widest text-antique-gold font-bold">Bespoke Bridal Salon</span>
              <h3 class="font-serif text-xl font-bold">Bridal Heirlooms</h3>
              <p class="text-[11px] text-white/80 line-clamp-1">Collector Shikargah & Maharani ensembles</p>
            </div>
          </a>

        </div>
      </section>

      <!-- Featured Masterpieces Grid -->
      <section class="max-w-container-max mx-auto px-4 md:px-8">
        <div class="flex justify-between items-end mb-8 border-b border-antique-gold/30 pb-4">
          <div>
            <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Hand-Selected</span>
            <h2 class="font-serif text-3xl font-bold text-deep-charcoal">Featured Heirloom Sarees</h2>
          </div>
          <a href="#catalog" class="text-xs uppercase tracking-widest font-bold text-old-wine hover:text-primary flex items-center gap-1">
            <span>View All Weaves</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${featuredProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- Pincode Delivery Checker Featurette -->
      <section class="max-w-container-max mx-auto px-4 md:px-8">
        <div class="bg-surface-container-lowest rounded-2xl border border-antique-gold/40 p-8 sm:p-12 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-6 space-y-3">
              <div class="inline-flex items-center gap-1 text-antique-gold text-xs uppercase font-bold tracking-widest">
                <span class="material-symbols-outlined text-[16px]">local_shipping</span>
                <span>Real-Time Express Logistics</span>
              </div>
              <h2 class="font-serif text-2xl sm:text-3xl font-bold text-deep-charcoal">
                Check Delivery & COD Availability
              </h2>
              <p class="text-xs text-neutral-600 leading-relaxed">
                Enter your 6-digit Indian PIN Code to verify express courier coverage, Cash on Delivery eligibility, and estimated dispatch schedules from our Jaipur & Varanasi ateliers.
              </p>
            </div>

            <div class="lg:col-span-6">
              <form id="home-pincode-form" class="space-y-3">
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    id="home-pincode-input"
                    maxlength="6"
                    placeholder="Enter 6-Digit PIN Code (e.g. 302001, 110001)" 
                    class="flex-1 text-xs px-4 py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-antique-gold font-mono uppercase"
                  />
                  <button 
                    type="submit" 
                    class="bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-colors shrink-0"
                  >
                    Verify PIN
                  </button>
                </div>
                <div id="home-pincode-status"></div>
              </form>
            </div>

          </div>
        </div>
      </section>

      <!-- Artisan Weaving Legacy Banner -->
      <section class="relative bg-surface-container-lowest border-y border-antique-gold/30 py-16">
        <div class="max-w-container-max mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Uncompromising Standard</span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-deep-charcoal">
              Preserving 500 Years of Handloom Majesty
            </h2>
            <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Every Laxmi Vastaraa saree is an unbroken prayer between master weaver and silk fiber. We eschew modern mechanical power looms in favor of pit-looms where each warp and weft is tension-controlled by hand.
            </p>
            <div class="space-y-3 text-xs text-neutral-600">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-antique-gold">check_circle</span>
                <span>100% Tested Zari: Pure silver wire bathed in 24k gold bath</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-antique-gold">check_circle</span>
                <span>Official GI (Geographical Indication) Tagged Weaving Guilds</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-antique-gold">check_circle</span>
                <span>Archival Casket Delivery with pure cotton mulmul preservation wrap</span>
              </div>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video lg:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80" 
              alt="Artisan at Pit Loom" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  `;
}

// ----------------------------------------------------
// 2. CATALOG & FILTERING PAGE
// ----------------------------------------------------
export function renderCatalogPage() {
  const filteredProducts = store.getFilteredProducts();
  const activeCategory = store.selectedCategory;
  const activeFabric = store.activeFabric;
  const activeColor = store.activeColor;
  const activeOccasion = store.activeOccasion;
  const priceFilter = store.priceFilter;
  const searchQuery = store.searchQuery;

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-8">
      
      <!-- Catalog Header & Breadcrumb -->
      <div class="space-y-2 border-b border-antique-gold/30 pb-6">
        <div class="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest">
          <a href="#home" class="hover:text-old-wine">Atelier</a>
          <span>/</span>
          <span class="text-deep-charcoal font-semibold">Handloom Catalog</span>
          ${activeCategory !== 'all' ? `<span>/</span><span class="text-antique-gold font-bold">${activeCategory}</span>` : ''}
        </div>
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="font-serif text-3xl sm:text-4xl font-bold text-deep-charcoal">The Royal Handloom Vault</h1>
            <p class="text-xs text-neutral-600 mt-1">Showing ${filteredProducts.length} authentic hand-loomed saree heirlooms</p>
          </div>

          <!-- Sorting Selector -->
          <div class="flex items-center gap-3">
            <label class="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Sort By:</label>
            <select id="catalog-sort-select" class="text-xs px-3 py-2 border border-neutral-300 rounded bg-surface focus:border-old-wine">
              <option value="featured" ${store.sortBy === 'featured' ? 'selected' : ''}>Featured Heirlooms</option>
              <option value="price-low" ${store.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${store.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${store.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
              <option value="newest" ${store.sortBy === 'newest' ? 'selected' : ''}>Newest Acquisitions</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Sidebar: Filters (3 Cols) -->
        <aside class="lg:col-span-3 space-y-6 bg-surface-container-lowest p-6 rounded-xl border border-antique-gold/20 shadow-sm h-fit">
          
          <div class="flex justify-between items-center pb-3 border-b border-neutral-200">
            <span class="font-serif font-bold text-sm uppercase tracking-wider text-deep-charcoal">Refine Atelier</span>
            <button id="clear-all-filters-btn" class="text-[11px] text-old-wine hover:underline font-semibold uppercase">Reset All</button>
          </div>

          <!-- Search Query Filter Indicator -->
          ${searchQuery ? `
            <div class="p-2.5 rounded bg-old-wine/10 border border-old-wine/20 text-xs flex justify-between items-center text-old-wine">
              <span>Search: "<strong>${searchQuery}</strong>"</span>
              <button id="clear-search-btn" class="hover:text-black"><span class="material-symbols-outlined text-[16px]">close</span></button>
            </div>
          ` : ''}

          <!-- Fabric Filter -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800">Heritage Fabric</h4>
            <div class="space-y-1.5 text-xs text-neutral-700">
              ${['all', 'Banarasi', 'Kanjeevaram', 'Chanderi', 'Georgette', 'Organza', 'Cotton'].map(fabric => `
                <label class="flex items-center justify-between cursor-pointer hover:text-old-wine">
                  <span class="flex items-center gap-2">
                    <input type="radio" name="filter-fabric" value="${fabric}" ${activeFabric.toLowerCase() === fabric.toLowerCase() ? 'checked' : ''} class="text-old-wine focus:ring-old-wine" />
                    <span>${fabric === 'all' ? 'All Fabrics' : fabric}</span>
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Occasion Filter -->
          <div class="space-y-2 pt-3 border-t border-neutral-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800">Occasion</h4>
            <div class="space-y-1.5 text-xs text-neutral-700">
              ${['all', 'Bridal', 'Festive', 'Formal'].map(occ => `
                <label class="flex items-center justify-between cursor-pointer hover:text-old-wine">
                  <span class="flex items-center gap-2">
                    <input type="radio" name="filter-occasion" value="${occ}" ${activeOccasion.toLowerCase() === occ.toLowerCase() ? 'checked' : ''} class="text-old-wine focus:ring-old-wine" />
                    <span>${occ === 'all' ? 'All Occasions' : occ}</span>
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Primary Color Filter -->
          <div class="space-y-2 pt-3 border-t border-neutral-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-800">Primary Hue</h4>
            <div class="grid grid-cols-4 gap-2 pt-1">
              ${[
                { name: 'all', label: 'All', color: '#eaeaea' },
                { name: 'Maroon', label: 'Maroon', color: '#71001E' },
                { name: 'Royal Blue', label: 'Blue', color: '#1B365D' },
                { name: 'Gold', label: 'Gold', color: '#D4AF37' },
                { name: 'Emerald Green', label: 'Green', color: '#095B42' },
                { name: 'Pink', label: 'Pink', color: '#E07A9E' },
                { name: 'Ivory', label: 'Ivory', color: '#FDFBF7' },
                { name: 'Wine', label: 'Wine', color: '#4A0E17' }
              ].map(c => `
                <button 
                  type="button" 
                  class="filter-color-btn flex flex-col items-center gap-1 p-1.5 rounded border ${activeColor.toLowerCase() === c.name.toLowerCase() ? 'border-old-wine bg-old-wine/10' : 'border-neutral-200'}"
                  data-color="${c.name}"
                  title="${c.name}"
                >
                  <span class="w-5 h-5 rounded-full border border-black/10 shadow-sm" style="background-color: ${c.color}"></span>
                  <span class="text-[9px] truncate max-w-full font-medium">${c.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Price Range Slider -->
          <div class="space-y-3 pt-3 border-t border-neutral-200">
            <div class="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span>Max Price</span>
              <span class="text-old-wine">₹${priceFilter.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              id="price-range-slider" 
              min="15000" 
              max="150000" 
              step="5000" 
              value="${priceFilter}" 
              class="w-full accent-old-wine cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>₹15,000</span>
              <span>₹1,50,000+</span>
            </div>
          </div>

        </aside>

        <!-- Right: Product Grid (9 Cols) -->
        <main class="lg:col-span-9 space-y-6">
          
          ${filteredProducts.length === 0 ? `
            <div class="bg-surface-container-lowest rounded-xl p-16 text-center space-y-4 border border-antique-gold/20">
              <span class="material-symbols-outlined text-[48px] text-antique-gold">filter_alt_off</span>
              <h3 class="font-serif text-2xl font-bold text-deep-charcoal">No Heirloom Weaves Match Your Filters</h3>
              <p class="text-xs text-neutral-600 max-w-md mx-auto">
                Try resetting your filters or adjusting your price ceiling to view our full collection of pure silk sarees.
              </p>
              <button id="catalog-reset-filters-btn" class="bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">
                Reset All Filters
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${filteredProducts.map(p => renderProductCard(p)).join('')}
            </div>
          `}

        </main>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// 3. PRODUCT DETAIL PAGE (SINGLE SAREE MASTERPIECE)
// ----------------------------------------------------
export function renderProductDetailPage(productId) {
  const product = store.getProductById(productId);

  if (!product) {
    return `
      <div class="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 class="font-serif text-3xl font-bold text-deep-charcoal">Saree Masterpiece Not Found</h2>
        <p class="text-xs text-neutral-600">The requested saree has either been acquired into a private collection or does not exist.</p>
        <a href="#catalog" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">Return to Catalog</a>
      </div>
    `;
  }

  const isWishlisted = store.isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= product.reorder_level;
  const images = Array.isArray(product.images) ? product.images : [product.images];

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-12">
      
      <!-- Breadcrumbs -->
      <div class="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest">
        <a href="#home" class="hover:text-old-wine">Atelier</a>
        <span>/</span>
        <a href="#catalog" class="hover:text-old-wine">Vault</a>
        <span>/</span>
        <a href="#catalog?category=${product.fabric}" class="hover:text-old-wine">${product.fabric}</a>
        <span>/</span>
        <span class="text-deep-charcoal font-semibold truncate max-w-[200px] sm:max-w-none">${product.title}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Image Gallery (7 Cols) -->
        <div class="lg:col-span-7 space-y-4">
          <div class="relative rounded-2xl overflow-hidden bg-surface-container-low border border-antique-gold/30 aspect-[3/4] shadow-md">
            <img 
              id="pdp-main-image"
              src="${images[0]?.image_url || images[0] || ''}" 
              alt="${product.title}" 
              class="w-full h-full object-cover object-top transition-all duration-300"
            />
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span class="silk-badge text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow">
                ${product.fabric}
              </span>
              ${product.is_featured ? `
                <span class="bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                  Heritage Masterpiece
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Thumbnails Strip -->
          ${images.length > 1 ? `
            <div class="flex gap-3 overflow-x-auto pb-2">
              ${images.map((img, idx) => `
                <button 
                  type="button" 
                  class="pdp-thumbnail w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${idx === 0 ? 'border-old-wine ring-2 ring-old-wine/30' : 'border-neutral-200 opacity-70 hover:opacity-100'}"
                  data-src="${img.image_url || img}"
                >
                  <img src="${img.image_url || img}" alt="Angle ${idx + 1}" class="w-full h-full object-cover" />
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Right: Purchase Details & Story (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="space-y-2 border-b border-antique-gold/20 pb-6">
            <div class="flex justify-between items-start">
              <span class="text-xs uppercase tracking-[0.2em] text-antique-gold font-bold font-mono">SKU: ${product.sku}</span>
              <button 
                class="wishlist-btn p-2 rounded-full hover:bg-black/5 text-deep-charcoal hover:text-old-wine transition-colors"
                data-id="${product.id}"
                title="Save to Bridal Wishlist"
              >
                <span class="material-symbols-outlined text-[24px] ${isWishlisted ? 'text-old-wine font-fill' : ''}">favorite</span>
              </button>
            </div>

            <h1 class="font-serif text-3xl sm:text-4xl font-bold text-deep-charcoal leading-snug">
              ${product.title}
            </h1>

            <div class="flex items-center gap-3 pt-1">
              <div class="flex items-center text-antique-gold text-xs">
                ${Array.from({ length: 5 }).map((_, i) => `
                  <span class="material-symbols-outlined text-[16px]">${i < Math.floor(product.rating || 5) ? 'star' : 'star_half'}</span>
                `).join('')}
              </div>
              <span class="text-xs text-neutral-500 font-medium">(${product.reviews_count || 12} Verified Connoisseur Reviews)</span>
            </div>

            <!-- Price Display -->
            <div class="flex items-baseline gap-3 pt-3">
              <span class="font-serif text-3xl font-bold text-old-wine">₹${product.price.toLocaleString('en-IN')}</span>
              ${product.compare_at_price ? `
                <span class="text-sm text-neutral-400 line-through">₹${product.compare_at_price.toLocaleString('en-IN')}</span>
                <span class="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  Save ₹${(product.compare_at_price - product.price).toLocaleString('en-IN')}
                </span>
              ` : ''}
            </div>
            <p class="text-[11px] text-neutral-500">Includes all heritage handloom taxes and pure silk certification.</p>
          </div>

          <!-- Stock & Inventory Status -->
          <div class="space-y-2">
            ${isOutOfStock ? `
              <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Currently Acquired / Out of Stock (Contact atelier for bespoke re-weave)</span>
              </div>
            ` : isLowStock ? `
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">timer</span>
                <span>Only ${product.stock_quantity} heirlooms remaining from this loom batch!</span>
              </div>
            ` : `
              <div class="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                <span>In Stock & Ready for Immediate Insured Dispatch</span>
              </div>
            `}
          </div>

          <!-- Custom Blouse Option Selector -->
          <div class="space-y-3 p-4 rounded-xl bg-surface-container-low border border-antique-gold/30">
            <label class="block text-xs font-bold uppercase tracking-wider text-deep-charcoal">
              Blouse Piece Customization:
            </label>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <label class="flex items-center gap-2 p-2.5 rounded bg-white border border-neutral-300 hover:border-antique-gold cursor-pointer">
                <input type="radio" name="pdp-blouse-option" value="unstitched" checked class="text-old-wine focus:ring-old-wine" />
                <div>
                  <strong class="block text-deep-charcoal">Unstitched (0.8m)</strong>
                  <span class="text-[10px] text-neutral-500">Included Complimentary</span>
                </div>
              </label>

              <label class="flex items-center gap-2 p-2.5 rounded bg-white border border-neutral-300 hover:border-antique-gold cursor-pointer">
                <input type="radio" name="pdp-blouse-option" value="custom-tailored" class="text-old-wine focus:ring-old-wine" />
                <div>
                  <strong class="block text-deep-charcoal">Custom Tailored</strong>
                  <span class="text-[10px] text-old-wine font-semibold">+₹2,500 (Bespoke)</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Add to Bag / Purchase Action -->
          <div class="space-y-2.5 pt-2">
            <button 
              id="pdp-add-to-cart-btn"
              data-id="${product.id}"
              ${isOutOfStock ? 'disabled' : ''}
              class="w-full bg-old-wine hover:bg-primary disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>${isOutOfStock ? 'Out of Stock' : 'Add to Royal Shopping Bag'}</span>
            </button>

            <button 
              id="pdp-buy-now-btn"
              data-id="${product.id}"
              ${isOutOfStock ? 'disabled' : ''}
              class="w-full bg-surface hover:bg-surface-container border-2 border-antique-gold disabled:opacity-50 text-old-wine font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Buy Now & Proceed to Checkout</span>
            </button>
          </div>

          <!-- PIN Code Availability Checker Inside PDP -->
          <div class="p-4 rounded-xl border border-neutral-200 bg-surface space-y-2">
            <span class="text-[11px] uppercase font-bold tracking-wider text-neutral-700 block">Check Pincode Serviceability</span>
            <div class="flex gap-2">
              <input 
                type="text" 
                id="pdp-pincode-input"
                maxlength="6"
                placeholder="6-Digit PIN (e.g. 302001)" 
                class="flex-1 text-xs px-3 py-2 border border-neutral-300 rounded focus:border-old-wine font-mono"
              />
              <button 
                id="pdp-pincode-check-btn"
                type="button" 
                class="bg-deep-charcoal text-white text-xs font-bold px-4 py-2 rounded hover:bg-black uppercase"
              >
                Check
              </button>
            </div>
            <div id="pdp-pincode-status"></div>
          </div>

          <!-- Saree Specifications Table -->
          <div class="border-t border-antique-gold/20 pt-6 space-y-4">
            <h3 class="font-serif text-lg font-bold text-deep-charcoal">Weave Specifications</h3>
            
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-surface-container-low rounded">
                <span class="text-[10px] uppercase text-neutral-500 block">Fabric</span>
                <strong class="text-deep-charcoal">${product.fabric}</strong>
              </div>
              <div class="p-3 bg-surface-container-low rounded">
                <span class="text-[10px] uppercase text-neutral-500 block">Weave Technique</span>
                <strong class="text-deep-charcoal">${product.weave_type}</strong>
              </div>
              <div class="p-3 bg-surface-container-low rounded">
                <span class="text-[10px] uppercase text-neutral-500 block">Primary Color</span>
                <strong class="text-deep-charcoal">${product.primary_color}</strong>
              </div>
              <div class="p-3 bg-surface-container-low rounded">
                <span class="text-[10px] uppercase text-neutral-500 block">Occasion</span>
                <strong class="text-deep-charcoal">${product.occasion}</strong>
              </div>
            </div>

            <!-- Artisan Lore -->
            <div class="space-y-2 pt-2">
              <h4 class="font-serif font-bold text-sm text-deep-charcoal flex items-center gap-1.5">
                <span class="material-symbols-outlined text-antique-gold text-[18px]">history_edu</span>
                <span>The Artisan Story</span>
              </h4>
              <p class="text-xs text-neutral-700 leading-relaxed">
                ${product.description}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// 4. CART & BAG SUMMARY PAGE
// ----------------------------------------------------
export function renderCartPage() {
  const cartItems = store.getCartDetailed();
  const totals = store.getCartTotals();

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-8">
      
      <div class="border-b border-antique-gold/30 pb-4">
        <h1 class="font-serif text-3xl font-bold text-deep-charcoal">Your Shopping Bag</h1>
        <p class="text-xs text-neutral-600 mt-1">Review your curated heirloom sarees before secure checkout</p>
      </div>

      ${cartItems.length === 0 ? `
        <div class="bg-surface-container-lowest rounded-2xl p-16 text-center space-y-4 border border-antique-gold/20">
          <span class="material-symbols-outlined text-[56px] text-antique-gold">shopping_bag</span>
          <h2 class="font-serif text-2xl font-bold text-deep-charcoal">Your Shopping Bag is Empty</h2>
          <p class="text-xs text-neutral-600 max-w-sm mx-auto">
            Discover our handwoven Varanasi and Kanchipuram collections and reserve your masterpiece.
          </p>
          <a href="#catalog" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded shadow">
            Explore Handloom Catalog
          </a>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Items List (8 Cols) -->
          <div class="lg:col-span-8 space-y-4">
            ${cartItems.map(item => {
              const primaryImg = item.product.images?.[0]?.image_url || item.product.images?.[0] || '';
              return `
                <div class="bg-surface-container-lowest p-4 sm:p-6 rounded-xl border border-antique-gold/20 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div class="flex gap-4 items-center">
                    <img src="${primaryImg}" alt="${item.product.title}" class="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg border border-antique-gold/20" />
                    <div class="space-y-1">
                      <span class="text-[10px] uppercase font-bold text-antique-gold font-mono">${item.product.sku}</span>
                      <h3 class="font-serif font-bold text-base text-deep-charcoal">${item.product.title}</h3>
                      <p class="text-xs text-neutral-500">${item.product.fabric} • ${item.product.primary_color}</p>
                      <span class="inline-block text-[11px] text-old-wine font-medium">Blouse: ${item.blouseOption === 'custom-tailored' ? 'Custom Tailored (+₹2,500)' : 'Unstitched (Included)'}</span>
                    </div>
                  </div>

                  <div class="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-3">
                    <span class="font-serif font-bold text-lg text-old-wine">₹${(item.product.price * item.quantity + (item.blouseOption === 'custom-tailored' ? 2500 * item.quantity : 0)).toLocaleString('en-IN')}</span>
                    
                    <div class="flex items-center gap-3">
                      <!-- Quantity Controls -->
                      <div class="flex items-center border border-neutral-300 rounded">
                        <button class="cart-qty-btn px-2.5 py-1 text-xs hover:bg-neutral-100" data-id="${item.product.id}" data-action="decrease" data-blouse="${item.blouseOption}">-</button>
                        <span class="px-2 text-xs font-semibold">${item.quantity}</span>
                        <button class="cart-qty-btn px-2.5 py-1 text-xs hover:bg-neutral-100" data-id="${item.product.id}" data-action="increase" data-blouse="${item.blouseOption}">+</button>
                      </div>

                      <button class="cart-remove-btn text-neutral-400 hover:text-red-700 p-1" data-id="${item.product.id}" data-blouse="${item.blouseOption}" title="Remove Saree">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Order Summary (4 Cols) -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-surface-container-low p-6 rounded-xl border border-antique-gold/30 shadow-sm space-y-5">
              <h2 class="font-serif font-bold text-lg text-deep-charcoal border-b border-antique-gold/20 pb-3 uppercase tracking-wider">Order Summary</h2>

              <!-- Promo Code Input -->
              <form id="cart-page-promo-form" class="flex gap-2">
                <input 
                  type="text" 
                  id="cart-page-promo-input"
                  placeholder="Promo Code (HERITAGE10)" 
                  value="${totals.promoInfo ? totals.promoInfo.code : ''}"
                  class="flex-1 text-xs px-3 py-2 border border-neutral-300 rounded focus:border-old-wine uppercase font-mono"
                />
                <button type="submit" class="bg-antique-gold text-deep-charcoal text-xs font-bold px-4 py-2 rounded hover:bg-yellow-600 uppercase">
                  ${totals.promoInfo ? 'Applied' : 'Apply'}
                </button>
              </form>

              ${totals.promoInfo ? `
                <div class="flex justify-between text-xs text-green-700 bg-green-50 p-2.5 rounded border border-green-200">
                  <div>
                    <strong class="block">${totals.promoInfo.code} Applied</strong>
                    <span class="text-[10px] text-green-600">${totals.promoInfo.description}</span>
                  </div>
                  <span class="font-bold">-₹${totals.discount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}

              <!-- Pricing Breakdown -->
              <div class="space-y-2 text-xs text-neutral-700 border-t border-neutral-200 pt-3">
                <div class="flex justify-between">
                  <span>Bag Subtotal (${store.getCartCount()} items):</span>
                  <span class="font-semibold text-deep-charcoal">₹${totals.subtotal.toLocaleString('en-IN')}</span>
                </div>

                ${totals.discount > 0 ? `
                  <div class="flex justify-between text-green-700 font-medium">
                    <span>Special Privilege Discount:</span>
                    <span>-₹${totals.discount.toLocaleString('en-IN')}</span>
                  </div>
                ` : ''}

                <div class="flex justify-between">
                  <span>Insured Express Shipping:</span>
                  <span>${totals.shipping === 0 ? '<strong class="text-green-700">FREE</strong>' : `₹${totals.shipping}`}</span>
                </div>

                <div class="flex justify-between">
                  <span>GST (5% Handloom Tax included):</span>
                  <span>₹${totals.tax.toLocaleString('en-IN')}</span>
                </div>

                <div class="flex justify-between text-base font-serif font-bold text-old-wine pt-3 border-t border-antique-gold/30">
                  <span>Total Amount:</span>
                  <span>₹${totals.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <!-- Checkout Button -->
              <a href="#checkout" class="w-full bg-old-wine hover:bg-primary text-white text-center font-bold text-xs py-4 rounded uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">lock</span> Proceed to Royal Checkout
              </a>

              <div class="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-[14px]">shield</span> 256-Bit Encrypted Secure Checkout
              </div>

            </div>
          </div>

        </div>
      `}

    </div>
  `;
}

// ----------------------------------------------------
// 5. CHECKOUT FLOW PAGE
// ----------------------------------------------------
export function renderCheckoutPage() {
  const totals = store.getCartTotals();
  const user = store.currentUser;

  if (totals.items.length === 0) {
    const featuredSarees = store.getProducts().slice(0, 3);
    return `
      <div class="max-w-3xl mx-auto px-4 py-16 animate-fade-in space-y-10">
        <div class="text-center space-y-3">
          <div class="w-16 h-16 rounded-full bg-antique-gold/10 text-old-wine flex items-center justify-center mx-auto border border-antique-gold/30">
            <span class="material-symbols-outlined text-[32px]">shopping_bag</span>
          </div>
          <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Royal Reservation</span>
          <h1 class="font-serif text-3xl font-bold text-deep-charcoal">Your Shopping Bag is Empty</h1>
          <p class="text-xs text-neutral-600 max-w-md mx-auto">
            To proceed through our secure checkout, please select an authentic artisan handloom from our royal atelier.
          </p>
          <div class="pt-2">
            <button 
              id="quick-add-sample-saree-btn" 
              class="inline-flex items-center gap-2 bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">bolt</span> 1-Click Add Featured Banarasi & Open Checkout
            </button>
          </div>
        </div>

        <!-- Curated Masterpieces to Reserve Immediately -->
        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-antique-gold/30 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-antique-gold/20 pb-3">
            <h2 class="font-serif font-bold text-base text-deep-charcoal">Recommended Atelier Heirlooms</h2>
            <a href="#catalog" class="text-xs text-old-wine font-bold hover:underline">View All Sarees →</a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${featuredSarees.map(saree => `
              <div class="bg-surface rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between p-3 space-y-3 hover:border-antique-gold transition-all">
                <a href="#product/${saree.id}">
                  <img 
                    src="${saree.images?.[0]?.image_url || saree.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}" 
                    alt="${saree.title}" 
                    class="w-full h-40 object-cover rounded-lg"
                  />
                </a>
                <div class="space-y-1">
                  <span class="text-[9px] uppercase font-bold text-antique-gold tracking-wider">${saree.fabric}</span>
                  <h3 class="font-serif font-bold text-xs text-deep-charcoal line-clamp-1">${saree.title}</h3>
                  <div class="font-serif font-bold text-sm text-old-wine">₹${saree.price.toLocaleString('en-IN')}</div>
                </div>
                <button 
                  class="quick-checkout-card-btn w-full bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                  data-id="${saree.id}"
                >
                  <span class="material-symbols-outlined text-[16px]">lock</span> Reserve & Checkout
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="text-center">
          <a href="#catalog" class="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg inline-block">
            Explore All Handloom Collections
          </a>
        </div>
      </div>
    `;
  }

  const defaultName = user ? (user.full_name || user.displayName || '') : 'Maharani Gayatri Devi';
  const defaultPhone = user ? (user.phone_number || '') : '+91 98765 43210';
  const defaultEmail = user ? (user.email || '') : 'client@laxmivastraa.com';
  const defaultAddress = user?.shipping_address?.street || 'Bungalow No. 4, Palace Road, Civil Lines';
  const defaultCity = user?.shipping_address?.city || 'Jaipur';
  const defaultState = user?.shipping_address?.state || 'Rajasthan';
  const defaultPin = user?.shipping_address?.postal_code || '302006';

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in">
      
      <div class="mb-8 text-center max-w-xl mx-auto">
        <span class="text-xs uppercase tracking-[0.2em] text-antique-gold font-bold">Secure Gateway</span>
        <h1 class="font-serif text-3xl font-bold text-deep-charcoal mt-1">Royal Order Checkout</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Form Steps (7 Cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- Auth Status Banner -->
          ${user ? `
            <div class="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between text-xs text-green-900 shadow-sm">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-[20px] text-green-700">verified_user</span>
                <div>
                  <span>Authenticated as <strong>${user.full_name}</strong> (${user.email})</span>
                  <p class="text-[10px] text-green-700">Saved profile and address information applied automatically.</p>
                </div>
              </div>
            </div>
          ` : `
            <div class="bg-surface-container-low border border-antique-gold/40 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-deep-charcoal shadow-sm">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-[22px] text-antique-gold">account_circle</span>
                <div>
                  <strong class="block font-serif">Have an account with Laxmi Vastaraa?</strong>
                  <span class="text-[11px] text-neutral-600">Sign in for saved addresses and VIP privilege tier tracking.</span>
                </div>
              </div>
              <a href="#login?redirect=checkout" class="bg-old-wine text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded text-center shrink-0 hover:bg-primary transition-colors">
                Sign In Now
              </a>
            </div>
          `}

          <form id="checkout-main-form" class="space-y-8">
            
            <!-- Step 1: Contact & Delivery Address -->
            <div class="bg-surface-container-lowest p-6 rounded-xl border border-antique-gold/30 shadow-sm space-y-4">
              <div class="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span class="w-6 h-6 rounded-full bg-old-wine text-white text-xs font-bold flex items-center justify-center">1</span>
                <h2 class="font-serif font-bold text-sm uppercase tracking-wider text-deep-charcoal">Delivery & Contact Credentials</h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input type="text" id="cust-name" required value="${defaultName}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 mb-1">Mobile Phone *</label>
                  <input type="tel" id="cust-phone" required value="${defaultPhone}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-neutral-700 mb-1">Email Address for Invoice & Tracking *</label>
                <input type="email" id="cust-email" required value="${defaultEmail}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-neutral-700 mb-1">Street Address / Landmark *</label>
                <input type="text" id="cust-address" required value="${defaultAddress}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 mb-1">City *</label>
                  <input type="text" id="cust-city" required value="${defaultCity}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 mb-1">State *</label>
                  <input type="text" id="cust-state" required value="${defaultState}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-neutral-700 mb-1">PIN Code *</label>
                  <input type="text" id="cust-pin" required value="${defaultPin}" class="w-full text-xs p-3 rounded border border-neutral-300 focus:border-old-wine" />
                </div>
              </div>

            </div>

            <!-- Step 2: Payment Method (COD vs Online) -->
            <div class="bg-surface-container-lowest p-6 rounded-xl border border-antique-gold/30 shadow-sm space-y-4">
              <div class="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span class="w-6 h-6 rounded-full bg-old-wine text-white text-xs font-bold flex items-center justify-center">2</span>
                <h2 class="font-serif font-bold text-sm uppercase tracking-wider text-deep-charcoal">Payment Instrument</h2>
              </div>

              <div class="space-y-3" id="payment-options-list">
                
                <label class="flex items-center gap-3 p-3.5 rounded border border-antique-gold bg-surface cursor-pointer text-xs">
                  <input type="radio" name="payment-method" value="Online Payment" checked class="text-old-wine focus:ring-old-wine" />
                  <div class="flex-1 flex justify-between items-center">
                    <div>
                      <strong class="block text-deep-charcoal font-serif">Instant UPI / QR / Net Banking / Card (Online Payment)</strong>
                      <span class="text-[11px] text-neutral-500">Fastest confirmation & instant order processing</span>
                    </div>
                    <span class="material-symbols-outlined text-old-wine text-[22px]">qr_code_scanner</span>
                  </div>
                </label>

                <label class="flex items-center gap-3 p-3.5 rounded border border-neutral-300 hover:border-antique-gold bg-white cursor-pointer text-xs">
                  <input type="radio" name="payment-method" value="Cash on Delivery (Insured)" class="text-old-wine focus:ring-old-wine" />
                  <div class="flex-1 flex justify-between items-center">
                    <div>
                      <strong class="block text-deep-charcoal font-serif">Cash on Delivery (COD - Insured Handover)</strong>
                      <span class="text-[11px] text-neutral-500">Pay cash or card upon doorstep delivery</span>
                    </div>
                    <span class="material-symbols-outlined text-neutral-600 text-[22px]">payments</span>
                  </div>
                </label>

              </div>
            </div>

            <!-- Submit Place Order Button -->
            <button 
              type="submit" 
              class="w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] py-5 rounded-lg shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[20px]">lock_open</span> Confirm & Place Royal Order (₹${totals.grandTotal.toLocaleString('en-IN')})
            </button>

          </form>
        </div>

        <!-- Right: Order Summary Breakdown (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-surface-container-low p-6 rounded-xl border border-antique-gold/30 shadow-sm space-y-4 sticky top-24">
            <h2 class="font-serif font-bold text-base text-deep-charcoal uppercase tracking-wider pb-3 border-b border-antique-gold/20">
              Bag Summary (${totals.items.length} Weaves)
            </h2>

            <div class="max-h-64 overflow-y-auto space-y-3 divide-y divide-neutral-200">
              ${totals.items.map(item => {
                const img = item.product.images?.[0]?.image_url || item.product.images?.[0] || '';
                return `
                  <div class="pt-3 flex gap-3 items-center justify-between text-xs">
                    <div class="flex gap-3 items-center">
                      <img src="${img}" alt="${item.product.title}" class="w-12 h-14 object-cover rounded border" />
                      <div>
                        <h4 class="font-semibold text-deep-charcoal line-clamp-1">${item.product.title}</h4>
                        <p class="text-[11px] text-neutral-500">Qty: ${item.quantity} • ${item.blouseOption === 'custom-tailored' ? 'Custom Tailored' : 'Unstitched'}</p>
                      </div>
                    </div>
                    <span class="font-semibold text-deep-charcoal">₹${(item.product.price * item.quantity + (item.blouseOption === 'custom-tailored' ? 2500 * item.quantity : 0)).toLocaleString('en-IN')}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Price Breakdown in Checkout -->
            <div class="space-y-2 text-xs border-t border-neutral-300 pt-3 text-neutral-700">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>₹${totals.subtotal.toLocaleString('en-IN')}</span>
              </div>

              ${totals.discount > 0 ? `
                <div class="flex justify-between text-green-700 font-semibold">
                  <span>Privilege Discount:</span>
                  <span>-₹${totals.discount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}

              <div class="flex justify-between">
                <span>Shipping:</span>
                <span class="text-green-700 font-bold">FREE (Complimentary)</span>
              </div>

              <div class="flex justify-between text-base font-serif font-bold text-old-wine pt-2 border-t border-antique-gold/20">
                <span>Payable Amount:</span>
                <span>₹${totals.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div class="p-3 bg-surface rounded text-[11px] text-neutral-600 border border-antique-gold/20 space-y-1">
              <p class="font-semibold text-old-wine flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span> Silk Mark Verification
              </p>
              <p>Each parcel includes an authentic physical Silk Mark certificate with individual barcode tracking.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// 6. ORDER CONFIRMATION / RECEIPT PAGE
// ----------------------------------------------------
export function renderOrderSuccessPage() {
  const hash = window.location.hash || '';
  const match = hash.match(/[?&]id=([^&]+)/);
  const orderIdFromUrl = match ? decodeURIComponent(match[1]) : null;

  let order = store.lastPlacedOrder;
  if (orderIdFromUrl) {
    const found = (store.orders || []).find(o => o.order_number === orderIdFromUrl || o.order_id === orderIdFromUrl);
    if (found) order = found;
  }

  if (!order) {
    return `
      <div class="max-w-xl mx-auto px-4 py-28 text-center space-y-4">
        <h2 class="font-serif text-2xl font-bold text-deep-charcoal">No Recent Order Found</h2>
        <p class="text-xs text-neutral-600">Please visit the handloom catalog to place an order.</p>
        <a href="#catalog" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">Return to Catalog</a>
      </div>
    `;
  }

  const isPaid = order.payment_status === 'Paid';
  const isCod = order.payment_status === 'Pending (COD)' || order.payment_method?.includes('COD');

  return `
    <div class="max-w-2xl mx-auto px-4 py-16 animate-fade-in space-y-8">
      
      <!-- Top Success Emblem -->
      <div class="text-center space-y-3">
        <div class="w-16 h-16 ${isPaid ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'} rounded-full flex items-center justify-center mx-auto border-2 shadow">
          <span class="material-symbols-outlined text-[36px]">${isPaid ? 'verified' : 'inventory_2'}</span>
        </div>
        <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Consignment Reserved</span>
        <h1 class="font-serif text-3xl font-bold text-deep-charcoal">Royal Order Confirmed</h1>
        <p class="text-xs text-neutral-600">
          Thank you, <strong>${order.customer_name}</strong>. Your master weaver heirloom has been scheduled for inspection, packaging in our brass-seal velvet casket, and insured dispatch.
        </p>
      </div>

      <!-- Receipt Card -->
      <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border-2 border-antique-gold/40 shadow-xl space-y-6">
        
        <div class="flex justify-between items-center pb-4 border-b border-neutral-200 text-xs">
          <div>
            <span class="text-neutral-500 uppercase tracking-wider block text-[10px]">Order Reference</span>
            <strong class="font-mono text-sm text-old-wine font-bold">${order.order_number || order.order_id}</strong>
          </div>
          <div class="text-right">
            <span class="text-neutral-500 uppercase tracking-wider block text-[10px]">Consignment Status</span>
            <span class="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
              ${order.order_status || 'Placed'}
            </span>
          </div>
        </div>

        <!-- Payment Receipt Banner -->
        <div class="p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
          isPaid 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
            : isCod 
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-neutral-50 border-neutral-200 text-neutral-900'
        }">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[24px] ${isPaid ? 'text-emerald-700' : 'text-amber-700'}">
              ${isPaid ? 'lock_person' : 'local_shipping'}
            </span>
            <div>
              <strong class="block font-serif text-sm">
                ${isPaid ? 'Paid via Online Banking (Razorpay Instant Verification)' : 'Payment on Delivery (Cash / Card Handover)'}
              </strong>
              <p class="text-[11px] ${isPaid ? 'text-emerald-700' : 'text-amber-700'}">
                ${isPaid ? `Payment ID: ${order.gateway_payment_id || 'Captured via Gateway'}` : 'Exact cash or card to be collected by royal courier upon doorstep delivery.'}
              </p>
            </div>
          </div>
          <span class="font-mono font-bold text-xs uppercase px-2.5 py-1 rounded-full ${isPaid ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}">
            ${order.payment_status}
          </span>
        </div>

        <!-- Ordered Items Breakdown -->
        <div class="space-y-3">
          <h3 class="font-serif font-bold text-xs uppercase tracking-wider text-neutral-700">Artisan Sarees Reserved</h3>
          
          <div class="space-y-3 divide-y divide-neutral-100">
            ${(order.items || []).map(item => `
              <div class="pt-3 flex justify-between items-center text-xs">
                <div class="flex gap-3 items-center">
                  ${item.image_url ? `<img src="${item.image_url}" class="w-12 h-14 object-cover rounded border" />` : ''}
                  <div>
                    <h4 class="font-semibold text-deep-charcoal">${item.saree_title || 'Royal Saree'}</h4>
                    <p class="text-[11px] text-neutral-500">Qty: ${item.quantity} • Blouse: ${item.blouse_option === 'custom-tailored' ? 'Custom Tailored Maggam Work' : 'Unstitched Fabric'}</p>
                  </div>
                </div>
                <span class="font-serif font-bold text-deep-charcoal">₹${(item.unit_price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Delivery & Payment Summary -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 text-xs text-neutral-700">
          <div>
            <span class="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Dispatch Destination</span>
            <p class="font-medium text-deep-charcoal">${order.shipping_address}</p>
            <p>${order.city}, ${order.state} - ${order.pincode}</p>
            <p class="text-neutral-500 mt-1">Recipient: ${order.customer_name} (${order.customer_phone})</p>
          </div>

          <div>
            <span class="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Payment Breakdown</span>
            <p><strong>Subtotal:</strong> ₹${(order.subtotal || order.total_amount).toLocaleString('en-IN')}</p>
            ${order.discount > 0 ? `<p class="text-green-700 font-semibold"><strong>Privilege Discount:</strong> -₹${order.discount.toLocaleString('en-IN')}</p>` : ''}
            <p class="text-green-700"><strong>Insured Shipping:</strong> FREE</p>
            <p class="text-base font-serif font-bold text-old-wine mt-2">Total Amount: ₹${order.total_amount.toLocaleString('en-IN')}</p>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#catalog" class="bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded shadow text-center transition-colors">
          Continue Exploring Weaves
        </a>
        <a href="#profile" class="border border-antique-gold text-old-wine hover:bg-surface-container text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded text-center transition-colors">
          View All Orders in Profile
        </a>
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// 7. WISHLIST PAGE
// ----------------------------------------------------
export function renderWishlistPage() {
  const wishlistedIds = store.wishlist;
  const wishlistedProducts = store.getProducts().filter(p => wishlistedIds.includes(p.id));

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-8">
      
      <div class="border-b border-antique-gold/30 pb-4">
        <span class="text-xs uppercase tracking-[0.25em] text-antique-gold font-bold">Private Curation</span>
        <h1 class="font-serif text-3xl font-bold text-deep-charcoal mt-1">Your Bridal Wishlist</h1>
        <p class="text-xs text-neutral-600 mt-1">Saved sarees reserved for your consideration</p>
      </div>

      ${wishlistedProducts.length === 0 ? `
        <div class="bg-surface-container-lowest rounded-2xl p-16 text-center space-y-4 border border-antique-gold/20">
          <span class="material-symbols-outlined text-[56px] text-antique-gold">favorite_border</span>
          <h2 class="font-serif text-2xl font-bold text-deep-charcoal">Your Wishlist is Empty</h2>
          <p class="text-xs text-neutral-600">Click the heart icon on any saree to save it to your private bridal wishlist.</p>
          <a href="#catalog" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded">Browse Collections</a>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${wishlistedProducts.map(p => renderProductCard(p)).join('')}
        </div>
      `}

    </div>
  `;
}

// ----------------------------------------------------
// 8. ADMIN DASHBOARD & INVENTORY MANAGEMENT PORTAL
// ----------------------------------------------------
export function renderAdminPage() {
  const isAdmin = store.isAdmin();

  // If not logged in as admin, render Security Guard Access Denied
  if (!isAdmin) {
    return `
      <div class="max-w-md mx-auto px-4 py-24 animate-fade-in text-center space-y-6">
        <div class="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-800 flex items-center justify-center border-2 border-red-300 shadow">
          <span class="material-symbols-outlined text-[36px]">gpp_maybe</span>
        </div>
        <div class="space-y-2">
          <h1 class="font-serif text-2xl font-bold text-deep-charcoal">Access Denied</h1>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Administrator privileges are strictly required to enter the Atelier Control Center. You are currently signed in as a customer patron or guest.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#login?redirect=admin" class="bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">
            Sign In as Admin
          </a>
          <a href="#home" class="border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">
            Return to Storefront
          </a>
        </div>
      </div>
    `;
  }

  // Authenticated Admin Dashboard
  const products = store.getProducts();
  const orders = store.getOrders();
  const metrics = store.metrics;
  const activeTab = store.adminTab || 'inventory';
  const editingSaree = store.editingSareeId ? store.getProductById(store.editingSareeId) : null;

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-8">
      
      <!-- Admin Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-antique-gold/30">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider">Authenticated Session</span>
            <span class="text-xs text-neutral-400">|</span>
            <span class="text-xs text-neutral-500 font-mono">Store: Laxmi Vastaraa</span>
          </div>
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-deep-charcoal mt-1">Atelier Studio & Control Center</h1>
        </div>

        <div class="flex items-center gap-3">
          <a href="#admin/add-saree" class="bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded shadow flex items-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-[18px]">add_circle</span> Add Saree
          </a>
          <button id="admin-logout-btn" class="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">logout</span> Sign Out
          </button>
        </div>
      </div>

      <!-- KPI Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-surface-container-low p-5 rounded-xl border border-antique-gold/30 space-y-1 shadow-sm">
          <span class="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Total Sales Volume</span>
          <div class="font-serif text-2xl font-bold text-old-wine">₹${(metrics.total_revenue || 0).toLocaleString('en-IN')}</div>
          <span class="text-[11px] text-green-700 font-semibold">100% Insured Deliveries</span>
        </div>

        <div class="bg-surface-container-low p-5 rounded-xl border border-antique-gold/30 space-y-1 shadow-sm">
          <span class="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Total Sarees Listed</span>
          <div class="font-serif text-2xl font-bold text-deep-charcoal">${metrics.total_sarees || products.length} SKUs</div>
          <span class="text-[11px] text-neutral-500">Live in Public Storefront</span>
        </div>

        <div class="bg-surface-container-low p-5 rounded-xl border border-antique-gold/30 space-y-1 shadow-sm">
          <span class="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Low Stock Alerts</span>
          <div class="font-serif text-2xl font-bold ${metrics.low_stock_count > 0 ? 'text-amber-700' : 'text-green-700'}">
            ${metrics.low_stock_count || 0} Units
          </div>
          <span class="text-[11px] text-amber-700 font-semibold">≤ 2 units threshold</span>
        </div>

        <div class="bg-surface-container-low p-5 rounded-xl border border-antique-gold/30 space-y-1 shadow-sm">
          <span class="text-[11px] uppercase tracking-wider text-neutral-500 font-bold">Active Orders</span>
          <div class="font-serif text-2xl font-bold text-deep-charcoal">${orders.length} Consignments</div>
          <span class="text-[11px] text-neutral-500">COD & Prepaid</span>
        </div>

      </div>

      <!-- Tab Buttons -->
      <div class="flex border-b border-antique-gold/30 text-xs font-bold uppercase tracking-wider gap-6">
        <button class="admin-tab-btn py-3 border-b-2 ${activeTab === 'inventory' ? 'border-old-wine text-old-wine' : 'border-transparent text-neutral-500 hover:text-deep-charcoal'}" data-tab="inventory">
          Saree Inventory (${products.length})
        </button>
        <button class="admin-tab-btn py-3 border-b-2 ${activeTab === 'orders' ? 'border-old-wine text-old-wine' : 'border-transparent text-neutral-500 hover:text-deep-charcoal'}" data-tab="orders">
          Customer Orders (${orders.length})
        </button>
        <button class="admin-tab-btn py-3 border-b-2 ${activeTab === 'payments' ? 'border-old-wine text-old-wine' : 'border-transparent text-neutral-500 hover:text-deep-charcoal'}" data-tab="payments">
          Payment & Bank Settlement
        </button>
      </div>

      <!-- Tab Content: Inventory Management -->
      ${activeTab === 'inventory' ? `
        <div class="bg-surface-container-lowest rounded-xl border border-antique-gold/30 shadow-sm overflow-hidden space-y-4 p-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 class="font-serif font-bold text-lg text-deep-charcoal">Master Inventory & Stock Control</h2>
            <a href="#admin/add-saree" class="bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">add</span> Add New Saree
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-neutral-200 bg-surface-container-low text-neutral-600 uppercase tracking-wider">
                  <th class="p-3">Saree / Preview</th>
                  <th class="p-3">SKU</th>
                  <th class="p-3">Fabric & Hue</th>
                  <th class="p-3">Price</th>
                  <th class="p-3">Stock Level</th>
                  <th class="p-3 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                ${products.map(p => {
                  const img = p.images?.[0]?.image_url || p.images?.[0] || '';
                  const isLow = p.stock_quantity <= p.reorder_level;
                  return `
                    <tr class="hover:bg-neutral-50 transition-colors">
                      <td class="p-3 flex items-center gap-3">
                        <img src="${img}" alt="${p.title}" class="w-12 h-14 object-cover rounded border" />
                        <div>
                          <strong class="font-serif text-deep-charcoal block">${p.title}</strong>
                          <span class="text-[10px] text-neutral-400 font-mono">${p.id}</span>
                        </div>
                      </td>
                      <td class="p-3 font-mono font-bold text-old-wine">${p.sku}</td>
                      <td class="p-3">
                        <span class="font-semibold block">${p.fabric}</span>
                        <span class="text-neutral-500">${p.primary_color}</span>
                      </td>
                      <td class="p-3 font-serif font-bold">₹${p.price.toLocaleString('en-IN')}</td>
                      <td class="p-3">
                        <div class="flex items-center gap-2">
                          <input 
                            type="number" 
                            min="0" 
                            max="999"
                            value="${p.stock_quantity}" 
                            class="admin-stock-input w-16 p-1.5 border border-neutral-300 rounded text-center font-bold ${isLow ? 'text-red-700 bg-red-50 border-red-300' : 'text-green-800'}"
                            data-id="${p.id}"
                          />
                          ${isLow ? '<span class="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">Low</span>' : ''}
                        </div>
                      </td>
                      <td class="p-3 text-right space-x-2">
                        <a 
                          href="#admin/edit-saree/${p.id}" 
                          class="inline-block p-1 text-neutral-600 hover:text-old-wine"
                          title="Full Page Edit"
                        >
                          <span class="material-symbols-outlined text-[18px]">edit</span>
                        </a>
                        <button 
                          class="admin-delete-saree-btn p-1 text-neutral-400 hover:text-red-700"
                          data-id="${p.id}"
                          title="Delete Saree"
                        >
                          <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : activeTab === 'orders' ? `
        <!-- Tab Content: Customer Orders -->
        <div class="bg-surface-container-lowest rounded-xl border border-antique-gold/30 shadow-sm overflow-hidden p-6 space-y-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 class="font-serif font-bold text-lg text-deep-charcoal">Customer Consignments & Transactions</h2>
              <p class="text-xs text-neutral-500">Live feed of prepaid online payments and Cash on Delivery reservations</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-neutral-200 bg-surface-container-low text-neutral-600 uppercase tracking-wider">
                  <th class="p-3">Order Ref / Date</th>
                  <th class="p-3">Customer Contact</th>
                  <th class="p-3">Amount</th>
                  <th class="p-3">Payment Status</th>
                  <th class="p-3">Fulfillment</th>
                  <th class="p-3 text-right">Inspect & Manage</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                ${orders.map(order => `
                  <tr class="hover:bg-neutral-50 transition-colors">
                    <td class="p-3">
                      <strong class="font-mono text-old-wine block">${order.order_number || order.order_id}</strong>
                      <span class="text-neutral-400 text-[10px]">${new Date(order.created_at).toLocaleDateString('en-IN')}</span>
                      ${order.gateway_payment_id ? `<span class="block text-[9px] text-neutral-500 font-mono">ID: ${order.gateway_payment_id.slice(0, 15)}...</span>` : ''}
                    </td>
                    <td class="p-3">
                      <strong class="text-deep-charcoal block">${order.customer_name}</strong>
                      <span class="text-neutral-500">${order.city}, ${order.state} • ${order.customer_phone}</span>
                    </td>
                    <td class="p-3 font-serif font-bold text-sm">₹${order.total_amount.toLocaleString('en-IN')}</td>
                    <td class="p-3">
                      <div class="space-y-1">
                        <span class="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          order.payment_status === 'Paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          order.payment_status === 'Pending (COD)' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          order.payment_status === 'Failed' ? 'bg-red-100 text-red-800 border border-red-300' :
                          'bg-slate-100 text-slate-700 border border-slate-300'
                        }">${order.payment_status}</span>
                        <select 
                          class="admin-order-payment-status-select block text-[10px] p-1 border border-neutral-300 rounded bg-white"
                          data-id="${order.order_id}"
                        >
                          <option value="Paid" ${order.payment_status === 'Paid' ? 'selected' : ''}>Mark Paid</option>
                          <option value="Pending (COD)" ${order.payment_status === 'Pending (COD)' ? 'selected' : ''}>Pending (COD)</option>
                          <option value="Failed" ${order.payment_status === 'Failed' ? 'selected' : ''}>Mark Failed</option>
                        </select>
                      </div>
                    </td>
                    <td class="p-3">
                      <select 
                        class="admin-order-status-select text-xs p-1.5 border border-neutral-300 rounded bg-white font-semibold"
                        data-id="${order.order_id}"
                      >
                        <option value="Placed" ${order.order_status === 'Placed' ? 'selected' : ''}>Placed</option>
                        <option value="Processing" ${order.order_status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.order_status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                      </select>
                    </td>
                    <td class="p-3 text-right">
                      <button 
                        class="admin-order-inspect-btn inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-antique-gold bg-surface hover:bg-surface-container text-old-wine font-bold text-xs shadow-sm transition-colors"
                        data-id="${order.order_id}"
                      >
                        <span class="material-symbols-outlined text-[16px]">receipt_long</span>
                        <span>Invoice & Details</span>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <!-- Tab Content: Payment & Bank Settlement Settings -->
        <div class="bg-surface-container-lowest rounded-xl border border-antique-gold/30 shadow-sm p-6 sm:p-8 space-y-8">
          
          <div class="border-b border-antique-gold/20 pb-4">
            <span class="text-xs uppercase tracking-[0.2em] text-antique-gold font-bold">Financial Settlement Hub</span>
            <h2 class="font-serif font-bold text-2xl text-deep-charcoal mt-1">Admin Payment Gateway & Bank Account Details</h2>
            <p class="text-xs text-neutral-600 mt-1">
              Configure the exact credentials and destination bank accounts where customer order payments are settled.
            </p>
          </div>

          <form id="admin-payment-settings-form" class="space-y-8">
            
            <!-- Section 1: Razorpay Gateway Configuration -->
            <div class="space-y-4 p-5 rounded-xl bg-surface-container-low border border-antique-gold/30">
              <div class="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span class="material-symbols-outlined text-old-wine">payments</span>
                <h3 class="font-serif font-bold text-sm text-deep-charcoal">1. Razorpay Gateway API Credentials (Online UPI & Cards)</h3>
              </div>
              <p class="text-xs text-neutral-600">
                Obtain these keys from your <a href="https://dashboard.razorpay.com/#/access/api-keys" target="_blank" class="text-old-wine font-bold underline">Razorpay Dashboard → Settings → API Keys</a>.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Razorpay Key ID *</label>
                  <input 
                    type="text" 
                    id="admin-rzp-key-id" 
                    name="razorpay_key_id"
                    value="${store.paymentSettings?.razorpay_key_id || 'rzp_test_luxury_vastaraa'}" 
                    placeholder="rzp_test_... or rzp_live_..."
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine font-mono"
                    required
                  />
                  <span class="text-[10px] text-neutral-400">Public key used to launch customer checkout.</span>
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Razorpay Key Secret *</label>
                  <input 
                    type="password" 
                    id="admin-rzp-key-secret" 
                    name="razorpay_key_secret"
                    value="${store.paymentSettings?.razorpay_key_secret || '••••••••••••••••'}" 
                    placeholder="Enter Key Secret"
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine font-mono"
                    required
                  />
                  <span class="text-[10px] text-neutral-400">Used for server-side HMAC-SHA256 signature verification.</span>
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Webhook Secret</label>
                  <input 
                    type="text" 
                    id="admin-rzp-webhook-secret" 
                    name="webhook_secret"
                    value="${store.paymentSettings?.webhook_secret || 'rzp_webhook_secret_2026'}" 
                    placeholder="Secret for /api/webhooks/razorpay"
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine font-mono"
                  />
                  <span class="text-[10px] text-neutral-400">Webhook URL: <code class="text-old-wine">https://yourdomain.com/api/webhooks/razorpay</code></span>
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Admin UPI Virtual Payment Address (VPA)</label>
                  <input 
                    type="text" 
                    id="admin-upi-id" 
                    name="admin_upi_id"
                    value="${store.paymentSettings?.admin_upi_id || 'laxmivastraa@okaxis'}" 
                    placeholder="yourstore@okhdfcbank"
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine font-mono"
                  />
                  <span class="text-[10px] text-neutral-400">Receives direct instant UPI customer payments.</span>
                </div>
              </div>
            </div>

            <!-- Section 2: Settlement Bank Account Details -->
            <div class="space-y-4 p-5 rounded-xl bg-surface-container-low border border-antique-gold/30">
              <div class="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span class="material-symbols-outlined text-old-wine">account_balance</span>
                <h3 class="font-serif font-bold text-sm text-deep-charcoal">2. Atelier Settlement Bank Account (Where Revenue is Deposited)</h3>
              </div>
              <p class="text-xs text-neutral-600">
                Razorpay automatically settles funds to this bank account (T+2 settlement schedule).
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Account Beneficiary Name *</label>
                  <input 
                    type="text" 
                    id="admin-bank-holder" 
                    name="account_holder"
                    value="${store.paymentSettings?.settlement_bank?.account_holder || 'Laxmi Vastaraa Heritage Silks Pvt Ltd'}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine"
                    required
                  />
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Bank Account Number *</label>
                  <input 
                    type="text" 
                    id="admin-bank-number" 
                    name="account_number"
                    value="${store.paymentSettings?.settlement_bank?.account_number || '50200088991122'}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine font-mono"
                    required
                  />
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Bank Name *</label>
                  <input 
                    type="text" 
                    id="admin-bank-name" 
                    name="bank_name"
                    value="${store.paymentSettings?.settlement_bank?.bank_name || 'HDFC Bank Ltd'}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine"
                    required
                  />
                </div>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">IFSC Code *</label>
                  <input 
                    type="text" 
                    id="admin-bank-ifsc" 
                    name="ifsc_code"
                    value="${store.paymentSettings?.settlement_bank?.ifsc_code || 'HDFC0000240'}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine uppercase font-mono"
                    required
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Bank Branch Location</label>
                  <input 
                    type="text" 
                    id="admin-bank-branch" 
                    name="branch"
                    value="${store.paymentSettings?.settlement_bank?.branch || 'Civil Lines Branch, Jaipur, Rajasthan'}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine"
                  />
                </div>
              </div>
            </div>

            <!-- Section 3: Cash on Delivery (COD) Rules -->
            <div class="space-y-4 p-5 rounded-xl bg-surface-container-low border border-antique-gold/30">
              <div class="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span class="material-symbols-outlined text-old-wine">local_shipping</span>
                <h3 class="font-serif font-bold text-sm text-deep-charcoal">3. Cash on Delivery (COD) Policy</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <label class="flex items-center gap-2 cursor-pointer p-3 bg-white rounded border border-neutral-300">
                  <input 
                    type="checkbox" 
                    id="admin-cod-enabled" 
                    name="cod_enabled" 
                    ${store.paymentSettings?.cod_enabled !== false ? 'checked' : ''} 
                    class="text-old-wine focus:ring-old-wine" 
                  />
                  <span class="font-bold text-deep-charcoal">Enable Insured Cash on Delivery for Customers</span>
                </label>

                <div>
                  <label class="block font-bold text-neutral-700 uppercase text-[10px] mb-1">Max COD Order Value (INR)</label>
                  <input 
                    type="number" 
                    id="admin-max-cod" 
                    name="max_cod_amount"
                    value="${store.paymentSettings?.max_cod_amount || 100000}" 
                    class="w-full p-2.5 rounded border border-neutral-300 focus:border-old-wine"
                  />
                  <span class="text-[10px] text-neutral-400">Orders exceeding this value require upfront online payment.</span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <button 
                type="submit" 
                class="bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">save</span> Save Payment & Settlement Settings
              </button>
            </div>

          </form>

        </div>
      `}

    </div>
  `;
}

// ----------------------------------------------------
// 9. DEDICATED FULL-PAGE ADD / EDIT SAREE STUDIO
// ----------------------------------------------------
export function renderAdminAddSareePage(sareeId = null) {
  const isAdmin = store.isAdmin();

  if (!isAdmin) {
    return `
      <div class="max-w-md mx-auto px-4 py-24 animate-fade-in text-center space-y-6">
        <div class="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-800 flex items-center justify-center border-2 border-red-300 shadow">
          <span class="material-symbols-outlined text-[36px]">gpp_maybe</span>
        </div>
        <div class="space-y-2">
          <h1 class="font-serif text-2xl font-bold text-deep-charcoal">Access Denied</h1>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Administrator privileges are strictly required to add or edit sarees.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#login?redirect=admin" class="bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">
            Sign In as Admin
          </a>
          <a href="#home" class="border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded">
            Return to Storefront
          </a>
        </div>
      </div>
    `;
  }

  const saree = sareeId ? store.getProductById(sareeId) : null;
  const isEditing = !!saree;
  const generatedSku = isEditing ? saree.sku : `LV-BAN-${Math.floor(100 + Math.random() * 900)}`;

  const fabricVal = saree ? saree.fabric.toLowerCase() : '';
  const weaveVal = saree ? (saree.weave_type || '').toLowerCase().replace(/\s+/g, '_') : '';
  const primaryColor = saree ? (saree.primary_color || '').toLowerCase() : '';
  const mainImg = saree?.images?.[0]?.image_url || saree?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';
  const palluImg = saree?.images?.[1]?.image_url || saree?.images?.[1] || '';
  const fabricImg = saree?.images?.[2]?.image_url || saree?.images?.[2] || '';

  return `
    <div class="min-h-screen bg-surface pb-32 animate-fade-in">
      
      <!-- Top Sticky Header -->
      <header class="sticky top-0 z-40 bg-ivory-cream/90 backdrop-blur-md border-b border-antique-gold/20 py-4 px-margin-mobile md:px-margin-desktop">
        <div class="max-w-container-max mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <a href="#admin" class="p-2 text-deep-charcoal hover:text-old-wine transition-colors rounded-full hover:bg-surface-container" title="Return to Dashboard">
              <span class="material-symbols-outlined text-2xl" data-icon="arrow_back">arrow_back</span>
            </a>
            <div>
              <span class="font-label-sm text-label-sm text-antique-gold uppercase tracking-widest block font-bold">Atelier Studio</span>
              <h1 class="font-headline-md text-headline-md font-serif text-deep-charcoal">${isEditing ? `Edit: ${saree.title}` : 'Add New Saree'}</h1>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="hidden md:inline-block font-label-sm text-label-sm text-neutral-500 font-mono">Status: Draft / Live</span>
            <button id="top-save-saree-btn" class="bg-old-wine hover:bg-primary font-label-md text-label-md text-on-primary uppercase tracking-widest px-6 py-2.5 rounded shadow-sm hover:shadow transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-sm" data-icon="save">save</span>
              <span>${isEditing ? 'Update Saree' : 'Save Saree'}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Form Body -->
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8">
        <form id="full-add-saree-form" class="space-y-12 bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-antique-gold/30 shadow-sm" data-editing-id="${isEditing ? saree.id : ''}">
          
          <!-- Section: Product Basics -->
          <section class="space-y-8">
            <h2 class="font-headline-sm text-headline-sm text-deep-charcoal border-b border-antique-gold/30 pb-2 inline-block">Product Basics</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-8">
              
              <div class="col-span-1 md:col-span-2">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="title">Saree Title *</label>
                <input 
                  class="input-underline w-full font-body-md text-body-md text-deep-charcoal focus:ring-0 placeholder:text-outline-variant/60" 
                  id="title" 
                  name="title" 
                  placeholder="e.g., Royal Crimson Katan Silk Banarasi Saree" 
                  type="text" 
                  required
                  value="${saree ? saree.title : ''}"
                />
              </div>

              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="sku">SKU Code *</label>
                <div class="relative">
                  <input 
                    class="input-underline w-full font-body-md text-body-md text-deep-charcoal focus:ring-0 uppercase font-mono" 
                    id="sku" 
                    name="sku" 
                    placeholder="LV-BAN-001" 
                    type="text" 
                    required
                    value="${generatedSku}"
                  />
                  <button type="button" id="regenerate-sku-btn" class="absolute right-0 bottom-2 text-antique-gold hover:text-old-wine" title="Auto-Generate SKU">
                    <span class="material-symbols-outlined text-sm">autorenew</span>
                  </button>
                </div>
              </div>

              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="price">Price (INR) *</label>
                <div class="relative flex items-center">
                  <span class="absolute left-0 bottom-2 font-serif text-deep-charcoal">₹</span>
                  <input 
                    class="input-underline w-full pl-6 font-body-md text-body-md text-deep-charcoal focus:ring-0" 
                    id="price" 
                    name="price" 
                    placeholder="45,000" 
                    type="number" 
                    required
                    value="${saree ? saree.price : ''}"
                  />
                </div>
              </div>

              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="compare_at_price">Compare-at Price (INR)</label>
                <div class="relative flex items-center">
                  <span class="absolute left-0 bottom-2 font-serif text-deep-charcoal">₹</span>
                  <input 
                    class="input-underline w-full pl-6 font-body-md text-body-md text-deep-charcoal focus:ring-0 text-neutral-400" 
                    id="compare_at_price" 
                    name="compare_at_price" 
                    placeholder="52,000" 
                    type="number" 
                    value="${saree && saree.compare_at_price ? saree.compare_at_price : ''}"
                  />
                </div>
              </div>

              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="stock_quantity">Initial Stock Units *</label>
                <input 
                  class="input-underline w-full font-body-md text-body-md text-deep-charcoal focus:ring-0" 
                  id="stock_quantity" 
                  name="stock_quantity" 
                  placeholder="5" 
                  type="number" 
                  min="0"
                  required
                  value="${saree ? saree.stock_quantity : '5'}"
                />
              </div>

            </div>
          </section>

          <!-- Section: Saree Attributes -->
          <section class="space-y-8">
            <h2 class="font-headline-sm text-headline-sm text-deep-charcoal border-b border-antique-gold/30 pb-2 inline-block">Saree Attributes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-8">
              
              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="fabric">Fabric *</label>
                <div class="relative">
                  <select class="input-underline w-full font-body-md text-body-md text-deep-charcoal appearance-none focus:ring-0 bg-transparent pr-8 cursor-pointer" id="fabric" name="fabric" required>
                    <option value="" disabled ${!saree ? 'selected' : ''}>Select Fabric</option>
                    <option value="Kanjeevaram" ${fabricVal === 'kanjeevaram' ? 'selected' : ''}>Kanjeevaram</option>
                    <option value="Banarasi" ${fabricVal === 'banarasi' ? 'selected' : ''}>Banarasi</option>
                    <option value="Chanderi" ${fabricVal === 'chanderi' ? 'selected' : ''}>Chanderi</option>
                    <option value="Georgette" ${fabricVal === 'georgette' ? 'selected' : ''}>Georgette</option>
                    <option value="Organza" ${fabricVal === 'organza' ? 'selected' : ''}>Organza</option>
                    <option value="Cotton" ${fabricVal === 'cotton' ? 'selected' : ''}>Cotton</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                    <span class="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
                  </div>
                </div>
              </div>

              <div class="col-span-1">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="weave_type">Weave Type *</label>
                <div class="relative">
                  <select class="input-underline w-full font-body-md text-body-md text-deep-charcoal appearance-none focus:ring-0 bg-transparent pr-8 cursor-pointer" id="weave_type" name="weave_type" required>
                    <option value="" disabled ${!saree ? 'selected' : ''}>Select Weave</option>
                    <option value="Handloom" ${weaveVal === 'handloom' ? 'selected' : ''}>Handloom</option>
                    <option value="Zari Brocade" ${weaveVal === 'zari_brocade' || weaveVal === 'zaribrocade' ? 'selected' : ''}>Zari Brocade</option>
                    <option value="Ikat" ${weaveVal === 'ikat' ? 'selected' : ''}>Ikat</option>
                    <option value="Printed" ${weaveVal === 'printed' ? 'selected' : ''}>Printed</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                    <span class="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
                  </div>
                </div>
              </div>

              <div class="col-span-1 md:col-span-2">
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase">Primary Color *</label>
                <div class="flex flex-wrap gap-4">
                  <!-- Color Swatches with Radio Buttons -->
                  <label class="cursor-pointer group flex items-center gap-2" title="Maroon / Red">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Maroon" ${primaryColor === 'maroon' || primaryColor === 'red' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#8B0000] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#8B0000] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Maroon</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Emerald Green">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Emerald Green" ${primaryColor === 'emerald green' || primaryColor === 'green' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#006400] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#006400] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Green</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Royal Blue">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Royal Blue" ${primaryColor === 'royal blue' || primaryColor === 'blue' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#00008B] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#00008B] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Royal Blue</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Gold">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Gold" ${primaryColor === 'gold' || primaryColor === 'yellow' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#FFD700] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#FFD700] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Gold</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Pink">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Pink" ${primaryColor === 'pink' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#FFB6C1] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#FFB6C1] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Pink</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Ivory">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Ivory" ${primaryColor === 'ivory' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#E5DCC5] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#E5DCC5] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Ivory</span>
                  </label>

                  <label class="cursor-pointer group flex items-center gap-2" title="Wine">
                    <input class="peer sr-only" name="primary_color" type="radio" value="Wine" ${primaryColor === 'wine' ? 'checked' : ''}/>
                    <div class="w-10 h-10 rounded-full bg-[#5B0E2D] border-2 border-transparent peer-checked:border-antique-gold peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5B0E2D] shadow-sm transition-all group-hover:scale-110"></div>
                    <span class="text-xs text-neutral-600 font-medium peer-checked:font-bold">Wine</span>
                  </label>
                </div>
              </div>

            </div>
          </section>

          <!-- Section: Media Gallery -->
          <section class="space-y-8">
            <h2 class="font-headline-sm text-headline-sm text-deep-charcoal border-b border-antique-gold/30 pb-2 inline-block">Media Gallery</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6">Enter high-resolution imagery URLs or select angles to showcase exquisite weaving craftsmanship.</p>
            
            <div class="space-y-4">
              <div>
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase" for="main_image_url">Main Front View Image URL *</label>
                <input 
                  type="url" 
                  id="main_image_url" 
                  name="main_image_url" 
                  required 
                  value="${mainImg}"
                  placeholder="https://..." 
                  class="w-full text-xs p-3 rounded border border-outline-variant/50 focus:border-antique-gold bg-ivory-cream font-mono"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase" for="pallu_image_url">Pallu Detail Image URL</label>
                  <input 
                    type="url" 
                    id="pallu_image_url" 
                    name="pallu_image_url" 
                    value="${palluImg}"
                    placeholder="https://..." 
                    class="w-full text-xs p-3 rounded border border-outline-variant/50 focus:border-antique-gold bg-ivory-cream font-mono"
                  />
                </div>

                <div>
                  <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase" for="fabric_image_url">Fabric / Blouse Close-up URL</label>
                  <input 
                    type="url" 
                    id="fabric_image_url" 
                    name="fabric_image_url" 
                    value="${fabricImg}"
                    placeholder="https://..." 
                    class="w-full text-xs p-3 rounded border border-outline-variant/50 focus:border-antique-gold bg-ivory-cream font-mono"
                  />
                </div>
              </div>
            </div>

            <!-- Media Visual Preview Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div class="col-span-2 md:col-span-2 aspect-video custom-file-upload rounded-lg flex flex-col items-center justify-center p-4 relative overflow-hidden bg-surface-container-low border border-antique-gold/30">
                <img id="preview-main-img" src="${mainImg}" alt="Main View Preview" class="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform" />
                <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span class="font-label-md text-label-md text-white uppercase tracking-widest bg-black/60 px-3 py-1 rounded">Main Drape Preview</span>
                </div>
              </div>

              <div class="col-span-1 aspect-square custom-file-upload rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden bg-surface-container-low border border-outline-variant/30">
                <span class="material-symbols-outlined text-2xl text-antique-gold mb-1">palette</span>
                <span class="font-label-sm text-[10px] text-on-surface-variant uppercase text-center font-bold">Pallu Detail Angle</span>
              </div>

              <div class="col-span-1 aspect-square custom-file-upload rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden bg-surface-container-low border border-outline-variant/30">
                <span class="material-symbols-outlined text-2xl text-antique-gold mb-1">texture</span>
                <span class="font-label-sm text-[10px] text-on-surface-variant uppercase text-center font-bold">Zari Thread Macro</span>
              </div>
            </div>
          </section>

          <!-- Section: Description & Artisan Story -->
          <section class="space-y-8">
            <h2 class="font-headline-sm text-headline-sm text-deep-charcoal border-b border-antique-gold/30 pb-2 inline-block">Description</h2>
            <div class="grid grid-cols-1 gap-y-8">
              <div>
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase flex items-center gap-2" for="artisan_story">
                  Artisan Story 
                  <span class="material-symbols-outlined text-sm text-antique-gold" data-icon="history_edu">history_edu</span>
                </label>
                <textarea 
                  class="w-full border border-outline-variant/50 rounded bg-ivory-cream p-4 font-body-md text-body-md text-deep-charcoal focus:border-antique-gold focus:ring-1 focus:ring-antique-gold resize-y transition-colors" 
                  id="artisan_story" 
                  name="artisan_story" 
                  placeholder="Describe the heritage, the weavers, and the inspiration behind this piece..." 
                  rows="4"
                  required
                >${saree ? saree.description : 'Exquisitely hand-loomed by master artisans, this traditional saree showcases intricate floral motifs in pure tested zari. A collector piece created over three weeks of dedicated pit-loom weaving.'}</textarea>
              </div>

              <div>
                <label class="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase" for="product_details">Product Details & Care Specifications</label>
                <div class="border border-outline-variant/50 rounded bg-ivory-cream overflow-hidden">
                  <div class="bg-surface-container-low border-b border-outline-variant/50 p-2 flex gap-2">
                    <button class="p-1 text-on-surface-variant hover:text-old-wine rounded hover:bg-surface-variant" type="button"><span class="material-symbols-outlined text-sm" data-icon="format_bold">format_bold</span></button>
                    <button class="p-1 text-on-surface-variant hover:text-old-wine rounded hover:bg-surface-variant" type="button"><span class="material-symbols-outlined text-sm" data-icon="format_italic">format_italic</span></button>
                    <div class="w-px h-6 bg-outline-variant/50 mx-1"></div>
                    <button class="p-1 text-on-surface-variant hover:text-old-wine rounded hover:bg-surface-variant" type="button"><span class="material-symbols-outlined text-sm" data-icon="format_list_bulleted">format_list_bulleted</span></button>
                  </div>
                  <textarea 
                    class="w-full border-none bg-transparent p-4 font-body-md text-body-md text-deep-charcoal focus:ring-0 resize-y" 
                    id="product_details" 
                    name="product_details" 
                    placeholder="Enter care instructions, dimensions, blouse piece details..." 
                    rows="4"
                  >Includes unstitched blouse piece (0.8m). Pure Silk Mark certified. Dry clean only. Store wrapped in pure mulmul cotton.</textarea>
                </div>
              </div>
            </div>
          </section>

          <!-- Hidden Submit Trigger for form validity -->
          <button type="submit" id="add-saree-hidden-submit" class="hidden"></button>
        </form>
      </div>

      <!-- Persistent Action Bar -->
      <div class="fixed bottom-0 left-0 w-full bg-ivory-cream/95 backdrop-blur-md border-t border-antique-gold/20 shadow-ambient-up z-50 py-4 px-margin-mobile md:px-margin-desktop">
        <div class="max-w-container-max mx-auto flex justify-between items-center">
          <a href="#admin" id="discard-saree-btn" class="font-label-md text-label-md text-on-surface-variant hover:text-error uppercase tracking-widest px-4 py-2 transition-colors inline-block">
            Discard
          </a>
          <button id="save-saree-btn" class="bg-old-wine hover:bg-primary font-label-md text-label-md text-on-primary uppercase tracking-widest px-8 py-4 rounded shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2" type="button">
            <span>Save Saree</span>
            <span class="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// 10. FIREBASE AUTH & USER PROFILE SCREENS
// ----------------------------------------------------

export function renderLoginPage(redirect = 'home') {
  return `
    <div class="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div class="bg-surface-container-lowest p-8 sm:p-10 rounded-2xl border-2 border-antique-gold/40 shadow-2xl space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-container border border-antique-gold text-old-wine mb-1 shadow-sm">
            <span class="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h1 class="font-serif text-2xl sm:text-3xl font-bold text-deep-charcoal">Sign In to Atelier</h1>
          <p class="text-xs text-neutral-500">Access your private wishlist, past orders, and royal privileges.</p>
        </div>

        <!-- Google Sign-In Provider Button -->
        <button 
          id="auth-google-btn" 
          type="button" 
          class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-deep-charcoal shadow-sm hover:shadow transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div class="flex items-center my-4">
          <div class="flex-grow border-t border-neutral-200"></div>
          <span class="px-3 text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">Or Email</span>
          <div class="flex-grow border-t border-neutral-200"></div>
        </div>

        <!-- Form -->
        <form id="auth-login-form" class="space-y-4" data-redirect="${redirect}">
          <div>
            <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="login-email">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              name="email" 
              required 
              placeholder="you@domain.com"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider" for="login-password">Password</label>
              <a href="#forgot-password" class="text-[11px] text-old-wine hover:underline font-semibold">Forgot password?</a>
            </div>
            <input 
              type="password" 
              id="login-password" 
              name="password" 
              required 
              placeholder="••••••••"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <button 
            type="submit" 
            id="login-submit-btn"
            class="w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">lock_open</span>
            <span>Sign In</span>
          </button>
        </form>

        <!-- Quick Demo Switchers -->
        <div class="p-3 bg-surface-container-low rounded-xl border border-antique-gold/30 text-xs space-y-2">
          <span class="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">Quick Demo One-Click Sign In</span>
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              id="quick-login-admin"
              class="text-[11px] font-semibold py-1.5 px-2 bg-old-wine/10 text-old-wine hover:bg-old-wine hover:text-white rounded border border-old-wine/30 transition-colors truncate"
            >
              👑 Admin Curator
            </button>
            <button 
              type="button" 
              id="quick-login-customer"
              class="text-[11px] font-semibold py-1.5 px-2 bg-antique-gold/20 text-deep-charcoal hover:bg-antique-gold hover:text-white rounded border border-antique-gold/40 transition-colors truncate"
            >
              🌸 Patron (Radha)
            </button>
          </div>
        </div>

        <!-- Footer link -->
        <div class="text-center pt-2 text-xs text-neutral-600">
          Don't have an account? 
          <a href="#register?redirect=${redirect}" class="font-bold text-old-wine hover:underline">
            Register for Private Salon
          </a>
        </div>

      </div>
    </div>
  `;
}

export function renderRegisterPage(redirect = 'home') {
  return `
    <div class="max-w-md mx-auto px-4 py-14 animate-fade-in">
      <div class="bg-surface-container-lowest p-8 sm:p-10 rounded-2xl border-2 border-antique-gold/40 shadow-2xl space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-container border border-antique-gold text-old-wine mb-1 shadow-sm">
            <span class="material-symbols-outlined text-[28px]">app_registration</span>
          </div>
          <h1 class="font-serif text-2xl sm:text-3xl font-bold text-deep-charcoal">Create Salon Account</h1>
          <p class="text-xs text-neutral-500">Join the circle of Laxmi Vastaraa patrons for bespoke handlooms.</p>
        </div>

        <!-- Google Sign-In Option -->
        <button 
          id="auth-google-btn" 
          type="button" 
          class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-deep-charcoal shadow-sm hover:shadow transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div class="flex items-center my-4">
          <div class="flex-grow border-t border-neutral-200"></div>
          <span class="px-3 text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">Or Register Details</span>
          <div class="flex-grow border-t border-neutral-200"></div>
        </div>

        <!-- Form -->
        <form id="auth-register-form" class="space-y-4" data-redirect="${redirect}">
          <div>
            <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="reg-fullname">Full Name *</label>
            <input 
              type="text" 
              id="reg-fullname" 
              name="fullName" 
              required 
              placeholder="e.g. Maharani Gayatri Devi"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="reg-email">Email Address *</label>
            <input 
              type="email" 
              id="reg-email" 
              name="email" 
              required 
              placeholder="patron@domain.com"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="reg-phone">Mobile Phone (for delivery SMS)</label>
            <input 
              type="tel" 
              id="reg-phone" 
              name="phone" 
              placeholder="+91 98765 43210"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="reg-password">Password *</label>
              <input 
                type="password" 
                id="reg-password" 
                name="password" 
                required 
                minlength="6"
                placeholder="Min. 6 chars"
                class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="reg-confirm-password">Confirm *</label>
              <input 
                type="password" 
                id="reg-confirm-password" 
                name="confirmPassword" 
                required 
                minlength="6"
                placeholder="Repeat password"
                class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
              />
            </div>
          </div>

          <label class="flex items-start gap-2 text-xs text-neutral-600 cursor-pointer pt-1">
            <input type="checkbox" required checked class="mt-0.5 rounded text-old-wine focus:ring-old-wine" />
            <span>I agree to the <a href="javascript:void(0)" class="text-old-wine underline">Terms of Service</a> and <a href="javascript:void(0)" class="text-old-wine underline">Privacy Policy</a></span>
          </label>

          <button 
            type="submit" 
            id="register-submit-btn"
            class="w-full bg-antique-gold hover:bg-yellow-600 text-deep-charcoal font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">how_to_reg</span>
            <span>Create Account</span>
          </button>
        </form>

        <!-- Footer link -->
        <div class="text-center pt-2 text-xs text-neutral-600">
          Already have an account? 
          <a href="#login?redirect=${redirect}" class="font-bold text-old-wine hover:underline">
            Sign In here
          </a>
        </div>

      </div>
    </div>
  `;
}

export function renderForgotPasswordPage() {
  return `
    <div class="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div class="bg-surface-container-lowest p-8 sm:p-10 rounded-2xl border-2 border-antique-gold/40 shadow-2xl space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-container border border-antique-gold text-old-wine mb-1 shadow-sm">
            <span class="material-symbols-outlined text-[28px]">key</span>
          </div>
          <h1 class="font-serif text-2xl sm:text-3xl font-bold text-deep-charcoal">Password Reset</h1>
          <p class="text-xs text-neutral-500">Enter your registered email and we'll dispatch a secure recovery link.</p>
        </div>

        <!-- Form -->
        <form id="auth-forgot-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1" for="forgot-email">Registered Email</label>
            <input 
              type="email" 
              id="forgot-email" 
              name="email" 
              required 
              placeholder="you@domain.com"
              class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-antique-gold focus:ring-1 focus:ring-antique-gold bg-white"
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">send</span>
            <span>Send Reset Link</span>
          </button>
        </form>

        <div class="text-center pt-2 text-xs text-neutral-600">
          Remember your credentials? 
          <a href="#login" class="font-bold text-old-wine hover:underline">
            Back to Sign In
          </a>
        </div>

      </div>
    </div>
  `;
}

export function renderUserProfilePage(activeTab = 'profile') {
  const user = store.currentUser;
  if (!user) {
    return `
      <div class="max-w-md mx-auto px-4 py-24 text-center space-y-4 animate-fade-in">
        <h2 class="font-serif text-2xl font-bold text-deep-charcoal">Patron Authentication Required</h2>
        <p class="text-xs text-neutral-600">Please sign in to view your profile, saved addresses, and order history.</p>
        <a href="#login?redirect=profile" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded">
          Sign In Now
        </a>
      </div>
    `;
  }

  const orders = store.getOrders().filter(o => 
    o.customer_uid === user.uid || 
    (o.customer_email && o.customer_email.toLowerCase() === user.email.toLowerCase())
  );

  return `
    <div class="max-w-container-max mx-auto px-4 md:px-8 py-10 animate-fade-in space-y-8">
      
      <!-- Top Profile Card -->
      <div class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-antique-gold/30 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div class="flex items-center gap-5">
          <img 
            src="${user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'U')}&background=5B0E2D&color=D4AF37`}" 
            alt="${user.full_name}" 
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-antique-gold shadow-md"
          />
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h1 class="font-serif text-2xl font-bold text-deep-charcoal">${user.full_name}</h1>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-primary text-white' : 'bg-antique-gold/20 text-old-wine'}">
                ${user.role === 'admin' ? '👑 Admin Curator' : '🌸 Patron of Vastaraa'}
              </span>
            </div>
            <p class="text-xs text-neutral-500 font-mono">${user.email}</p>
            <p class="text-xs text-neutral-600">${user.phone_number || 'Mobile not provided'}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          ${user.role === 'admin' ? `
            <a href="#admin" class="bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow transition-colors flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span> Atelier Studio
            </a>
          ` : ''}
          <button id="profile-logout-btn" class="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">logout</span> Sign Out
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex border-b border-antique-gold/30 text-xs font-bold uppercase tracking-wider gap-8">
        <a href="#profile" class="py-3 border-b-2 ${activeTab === 'profile' ? 'border-old-wine text-old-wine' : 'border-transparent text-neutral-500 hover:text-deep-charcoal'} transition-colors">
          Account Profile & Address
        </a>
        <a href="#profile?tab=orders" class="py-3 border-b-2 ${activeTab === 'orders' ? 'border-old-wine text-old-wine' : 'border-transparent text-neutral-500 hover:text-deep-charcoal'} transition-colors flex items-center gap-1.5">
          <span>My Royal Orders</span>
          <span class="bg-antique-gold/20 text-old-wine px-2 py-0.5 rounded-full text-[10px]">${orders.length}</span>
        </a>
        <a href="#wishlist" class="py-3 border-b-2 border-transparent text-neutral-500 hover:text-deep-charcoal transition-colors">
          Bridal Wishlist (${store.getWishlistCount()})
        </a>
      </div>

      <!-- Tab 1: Profile & Shipping Details -->
      ${activeTab === 'profile' ? `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Personal Info Form -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl border border-antique-gold/30 shadow-sm space-y-5">
            <h2 class="font-serif font-bold text-lg text-deep-charcoal pb-2 border-b border-neutral-200 flex items-center gap-2">
              <span class="material-symbols-outlined text-antique-gold">person</span> Personal Particulars
            </h2>

            <form id="update-profile-form" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Full Legal Name</label>
                <input type="text" id="prof-name" value="${user.full_name || ''}" required class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
              </div>

              <div>
                <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Email Address (Read-only)</label>
                <input type="email" value="${user.email}" disabled class="w-full text-xs p-3 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed font-mono" />
              </div>

              <div>
                <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Contact Phone</label>
                <input type="tel" id="prof-phone" value="${user.phone_number || ''}" class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
              </div>

              <button type="submit" class="bg-old-wine hover:bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow transition-colors">
                Save Personal Info
              </button>
            </form>
          </div>

          <!-- Shipping Address Form -->
          <div class="bg-surface-container-lowest p-6 rounded-2xl border border-antique-gold/30 shadow-sm space-y-5">
            <h2 class="font-serif font-bold text-lg text-deep-charcoal pb-2 border-b border-neutral-200 flex items-center gap-2">
              <span class="material-symbols-outlined text-antique-gold">local_shipping</span> Default Delivery Address
            </h2>

            <form id="update-address-form" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Street Address / Landmark</label>
                <input type="text" id="prof-street" value="${user.shipping_address?.street || ''}" placeholder="House/Flat No., Street, Landmark" required class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">City</label>
                  <input type="text" id="prof-city" value="${user.shipping_address?.city || ''}" required class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">State</label>
                  <input type="text" id="prof-state" value="${user.shipping_address?.state || ''}" required class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">PIN Code</label>
                  <input type="text" id="prof-pin" value="${user.shipping_address?.postal_code || ''}" required class="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-old-wine bg-white" />
                </div>
              </div>

              <button type="submit" class="bg-antique-gold hover:bg-yellow-600 text-deep-charcoal text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow transition-colors">
                Save Shipping Address
              </button>
            </form>
          </div>

        </div>
      ` : `
        <!-- Tab 2: Orders List -->
        <div class="bg-surface-container-lowest p-6 rounded-2xl border border-antique-gold/30 shadow-sm space-y-6">
          <h2 class="font-serif font-bold text-lg text-deep-charcoal pb-2 border-b border-neutral-200">
            Order Archive & Consignment Tracker
          </h2>

          ${orders.length === 0 ? `
            <div class="py-12 text-center space-y-3">
              <span class="material-symbols-outlined text-[48px] text-antique-gold/60">inventory_2</span>
              <p class="text-xs text-neutral-500">No previous orders found for this account.</p>
              <a href="#catalog" class="inline-block bg-old-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg">Explore Royal Weaves</a>
            </div>
          ` : `
            <div class="space-y-4">
              ${orders.map(order => `
                <div class="p-4 sm:p-5 rounded-xl border border-neutral-200 hover:border-antique-gold/60 bg-surface transition-all space-y-3">
                  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span class="font-mono font-bold text-xs text-old-wine">${order.order_number || order.order_id}</span>
                      <span class="text-xs text-neutral-400 mx-2">•</span>
                      <span class="text-xs text-neutral-600">${new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                        order.order_status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.order_status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }">
                        ${order.order_status || 'Placed'}
                      </span>
                      <span class="text-xs font-serif font-bold text-deep-charcoal">
                        ₹${(order.total_amount || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-4 items-center justify-between text-xs text-neutral-600">
                    <div class="space-y-1">
                      <p><strong>Payment:</strong> ${order.payment_method} (${order.payment_status || 'Pending'})</p>
                      <p><strong>Destination:</strong> ${order.city || ''}, ${order.state || ''} - ${order.pincode || ''}</p>
                    </div>
                    <div class="text-right text-[11px] text-neutral-500">
                      ${order.items ? `${order.items.length} Saree Heirloom(s)` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `}

    </div>
  `;
}
