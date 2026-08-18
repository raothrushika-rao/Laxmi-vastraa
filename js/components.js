// Laxmi Vastaraa - Luxury Reusable Components
import { store } from './state.js';

export function renderHeader() {
  const cartCount = store.getCartCount();
  const wishlistCount = store.getWishlistCount();
  const currentRoute = store.currentRoute;
  const isAdmin = store.isAdmin();
  const isLoggedIn = store.isLoggedIn();
  const user = store.currentUser;
  const toast = store.toastMessage;
  const toastType = store.toastType;

  return `
    <header class="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-antique-gold/30 transition-all duration-300">
      
      <!-- Live Toast Notification Banner -->
      ${toast ? `
        <div class="px-4 py-2.5 text-xs font-semibold text-white flex items-center justify-between shadow-md animate-slide-down ${
          toastType === 'error' ? 'bg-red-800' :
          toastType === 'success' ? 'bg-green-800' :
          toastType === 'warning' ? 'bg-amber-800' : 'bg-old-wine'
        }">
          <div class="max-w-container-max mx-auto flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">
              ${toastType === 'error' ? 'gpp_bad' : toastType === 'success' ? 'check_circle' : 'info'}
            </span>
            <span>${toast}</span>
          </div>
          <button id="toast-close-btn" class="p-1 hover:opacity-75 transition-opacity" title="Dismiss">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ` : ''}

      <!-- Top Luxury Announcement Banner -->
      <div class="bg-primary text-white text-[11px] py-1 px-4 text-center font-medium tracking-widest uppercase border-b border-antique-gold/20 flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-antique-gold text-[14px]">auto_awesome</span>
        <span>Pure Silk Mark Certified Heirlooms • Complimentary Insured Delivery in India • Use Code <strong>HERITAGE10</strong></span>
        <span class="material-symbols-outlined text-antique-gold text-[14px]">auto_awesome</span>
      </div>

      <div class="max-w-container-max mx-auto px-4 md:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        <!-- Left: Navigation Links (Desktop) -->
        <nav class="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-deep-charcoal">
          <a href="#home" class="nav-link py-1 hover:text-old-wine transition-colors ${currentRoute === 'home' ? 'text-old-wine font-bold border-b-2 border-old-wine' : ''}">
            Atelier Home
          </a>
          <a href="#catalog" class="nav-link py-1 hover:text-old-wine transition-colors ${currentRoute === 'catalog' ? 'text-old-wine font-bold border-b-2 border-old-wine' : ''}">
            All Weaves
          </a>
          <a href="#catalog?category=Banarasi" class="nav-link py-1 hover:text-old-wine transition-colors">
            Banarasi
          </a>
          <a href="#catalog?category=Kanjeevaram" class="nav-link py-1 hover:text-old-wine transition-colors">
            Kanjeevaram
          </a>
          <a href="#catalog?category=Bridal" class="nav-link py-1 hover:text-old-wine transition-colors text-old-wine font-bold">
            Bridal Salon
          </a>
        </nav>

        <!-- Center: Brand Emblem & Wordmark -->
        <a href="#home" class="flex flex-col items-center group py-1">
          <div class="flex items-center gap-1.5 text-old-wine group-hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px] text-antique-gold">temple_hindu</span>
            <span class="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase">LAXMI VASTARAA</span>
          </div>
          <span class="text-[9px] uppercase tracking-[0.35em] text-neutral-500 font-medium">Heritage Handloom Silk</span>
        </a>

        <!-- Right: Actions (Search, Wishlist, Bag, User / Auth, Admin) -->
        <div class="flex items-center gap-2.5 sm:gap-3.5">
          
          <!-- Live Search Button -->
          <button 
            id="search-trigger-btn"
            class="p-2 text-deep-charcoal hover:text-old-wine transition-colors rounded-full hover:bg-black/5"
            title="Search weaves by title, SKU, fabric, or color"
          >
            <span class="material-symbols-outlined text-[22px]">search</span>
          </button>

          <!-- Wishlist Indicator -->
          <a 
            href="#wishlist" 
            class="p-2 text-deep-charcoal hover:text-old-wine transition-colors relative rounded-full hover:bg-black/5"
            title="Your Private Wishlist"
          >
            <span class="material-symbols-outlined text-[22px]">favorite</span>
            ${wishlistCount > 0 ? `
              <span class="absolute top-1 right-1 w-4 h-4 bg-old-wine text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                ${wishlistCount}
              </span>
            ` : ''}
          </a>

          <!-- Cart Drawer Trigger Button -->
          <button 
            id="cart-drawer-trigger"
            class="p-2 text-deep-charcoal hover:text-old-wine transition-colors relative rounded-full hover:bg-black/5 flex items-center gap-1"
            title="View Shopping Bag"
          >
            <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
            ${cartCount > 0 ? `
              <span class="absolute top-1 right-1 w-4 h-4 bg-antique-gold text-deep-charcoal text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in shadow">
                ${cartCount}
              </span>
            ` : ''}
          </button>

          <!-- User Authentication Section (Desktop) -->
          ${isLoggedIn ? `
            <div class="relative group">
              <button 
                id="user-profile-menu-btn" 
                class="flex items-center gap-2 p-1.5 rounded-full hover:bg-black/5 transition-colors border border-antique-gold/30"
                title="Account Menu"
              >
                <img 
                  src="${user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'U')}&background=5B0E2D&color=D4AF37`}" 
                  alt="${user.full_name}" 
                  class="w-7 h-7 rounded-full object-cover border border-antique-gold"
                />
                <span class="hidden xl:inline-block text-xs font-semibold text-deep-charcoal max-w-[100px] truncate">
                  ${user.full_name ? user.full_name.split(' ')[0] : 'Patron'}
                </span>
                <span class="material-symbols-outlined text-[16px] text-neutral-400">expand_more</span>
              </button>

              <!-- Dropdown Menu -->
              <div class="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest border-2 border-antique-gold/40 rounded-xl shadow-2xl py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <div class="px-4 py-2.5 border-b border-neutral-100">
                  <p class="text-xs font-bold text-deep-charcoal truncate">${user.full_name}</p>
                  <p class="text-[10px] text-neutral-500 truncate">${user.email}</p>
                  <span class="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-primary text-white' : 'bg-antique-gold/20 text-old-wine'}">
                    ${user.role === 'admin' ? 'Admin Curator' : 'Patron of Vastaraa'}
                  </span>
                </div>

                <div class="py-1 text-xs text-neutral-700">
                  <a href="#profile" class="flex items-center gap-2.5 px-4 py-2 hover:bg-surface-container/50 transition-colors">
                    <span class="material-symbols-outlined text-[18px] text-antique-gold">person</span> Profile & Addresses
                  </a>
                  <a href="#profile?tab=orders" class="flex items-center gap-2.5 px-4 py-2 hover:bg-surface-container/50 transition-colors">
                    <span class="material-symbols-outlined text-[18px] text-antique-gold">package_2</span> My Royal Orders
                  </a>
                  <a href="#wishlist" class="flex items-center gap-2.5 px-4 py-2 hover:bg-surface-container/50 transition-colors">
                    <span class="material-symbols-outlined text-[18px] text-antique-gold">favorite</span> Wishlist (${wishlistCount})
                  </a>

                  ${isAdmin ? `
                    <a href="#admin" class="flex items-center gap-2.5 px-4 py-2 text-old-wine font-bold hover:bg-surface-container/50 transition-colors border-t border-neutral-100">
                      <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span> Atelier Studio
                    </a>
                  ` : ''}
                </div>

                <div class="pt-1 border-t border-neutral-100">
                  <button id="nav-logout-btn" class="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold transition-colors">
                    <span class="material-symbols-outlined text-[18px]">logout</span> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <a 
              href="#login" 
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-old-wine/40 text-old-wine hover:bg-old-wine hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
              title="Sign In / Register"
            >
              <span class="material-symbols-outlined text-[16px]">account_circle</span>
              <span class="hidden sm:inline">Sign In</span>
            </a>
          `}

          <!-- Admin Atelier Studio Badge -->
          <a 
            href="#admin" 
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full ${isAdmin ? 'bg-old-wine text-white' : 'border border-antique-gold/60 text-old-wine hover:bg-surface-container'} text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
            title="Admin Atelier Studio"
          >
            <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span class="hidden sm:inline">Admin Studio</span>
          </a>

          <!-- Mobile Menu Button -->
          <button 
            id="mobile-menu-btn"
            class="lg:hidden p-2 text-deep-charcoal hover:text-old-wine"
            aria-label="Toggle navigation menu"
          >
            <span class="material-symbols-outlined text-[26px]">menu</span>
          </button>

        </div>

      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-nav" class="hidden lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
        <div class="w-4/5 max-w-sm h-full bg-surface-container-lowest p-6 flex flex-col justify-between overflow-y-auto shadow-2xl border-r border-antique-gold/30">
          
          <div class="space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-antique-gold/20">
              <div class="flex items-center gap-1.5 text-old-wine font-serif font-bold text-lg">
                <span class="material-symbols-outlined text-antique-gold">auto_awesome</span>
                <span>LAXMI VASTARAA</span>
              </div>
              <button id="mobile-nav-close" class="p-1 text-neutral-500 hover:text-black">
                <span class="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <!-- User Status in Drawer -->
            ${isLoggedIn ? `
              <div class="p-3 rounded-xl bg-surface-container-low border border-antique-gold/30 space-y-1">
                <p class="text-xs font-bold text-deep-charcoal">${user.full_name}</p>
                <p class="text-[11px] text-neutral-500">${user.email}</p>
                <span class="inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-antique-gold/20 text-old-wine">
                  ${user.role === 'admin' ? 'Administrator' : 'Patron'}
                </span>
              </div>
            ` : `
              <a href="#login" class="mobile-nav-item block text-center py-2.5 bg-old-wine text-white text-xs font-bold uppercase tracking-wider rounded-lg">
                Sign In / Create Account
              </a>
            `}

            <nav class="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider text-deep-charcoal">
              <a href="#home" class="mobile-nav-item py-2 border-b border-neutral-100 hover:text-old-wine">Atelier Home</a>
              <a href="#catalog" class="mobile-nav-item py-2 border-b border-neutral-100 hover:text-old-wine">All Weaves & Catalog</a>
              <a href="#catalog?category=Banarasi" class="mobile-nav-item py-2 border-b border-neutral-100 hover:text-old-wine">Royal Banarasi</a>
              <a href="#catalog?category=Kanjeevaram" class="mobile-nav-item py-2 border-b border-neutral-100 hover:text-old-wine">Kanjeevaram Pattu</a>
              <a href="#catalog?category=Chanderi" class="mobile-nav-item py-2 border-b border-neutral-100 hover:text-old-wine">Chanderi Tissue</a>
              <a href="#catalog?category=Bridal" class="mobile-nav-item py-2 border-b border-neutral-100 text-old-wine font-bold">The Bridal Salon</a>
            </nav>

            <div class="pt-4 space-y-2 border-t border-neutral-200 text-xs font-semibold uppercase tracking-wider">
              ${isLoggedIn ? `
                <a href="#profile" class="mobile-nav-item py-2 text-deep-charcoal flex items-center justify-between">
                  <span>My Profile</span>
                  <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </a>
                <a href="#profile?tab=orders" class="mobile-nav-item py-2 text-deep-charcoal flex items-center justify-between">
                  <span>My Orders</span>
                  <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </a>
              ` : ''}
              <a href="#wishlist" class="mobile-nav-item py-2 text-deep-charcoal flex items-center justify-between">
                <span>Private Wishlist</span>
                <span class="bg-old-wine text-white text-xs px-2 py-0.5 rounded-full">${wishlistCount}</span>
              </a>
              <a href="#bag" class="mobile-nav-item py-2 text-deep-charcoal flex items-center justify-between">
                <span>Shopping Bag</span>
                <span class="bg-antique-gold text-white text-xs px-2 py-0.5 rounded-full">${cartCount}</span>
              </a>
              ${isAdmin ? `
                <a href="#admin" class="mobile-nav-item py-2 text-old-wine font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span> Atelier Studio
                </a>
              ` : ''}
              ${isLoggedIn ? `
                <button id="mobile-nav-logout-btn" class="mobile-nav-item w-full text-left py-2 text-red-600 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">logout</span> Sign Out
                </button>
              ` : ''}
            </div>
          </div>

          <div class="pt-6 border-t border-antique-gold/20 text-xs text-neutral-600">
            <p class="font-serif italic mb-1">"Pure Silk Mark Certified Heirlooms"</p>
            <p>Direct from Varanasi & Kanchipuram Pit-Looms</p>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer class="bg-primary text-white border-t border-antique-gold/30 mt-20 pt-16 pb-12">
      <div class="max-w-container-max mx-auto px-4 md:px-8">
        
        <!-- Top Guarantee Badges -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 text-center">
          <div class="flex flex-col items-center">
            <span class="material-symbols-outlined text-antique-gold text-[36px] mb-2">verified</span>
            <h4 class="font-serif font-semibold text-sm">100% Pure Silk Mark</h4>
            <p class="text-xs text-white/70 mt-1">Official Silk Mark & GI Label</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="material-symbols-outlined text-antique-gold text-[36px] mb-2">history_edu</span>
            <h4 class="font-serif font-semibold text-sm">Pit-Loom Master Artisans</h4>
            <p class="text-xs text-white/70 mt-1">Generations of Weaving Heritage</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="material-symbols-outlined text-antique-gold text-[36px] mb-2">local_shipping</span>
            <h4 class="font-serif font-semibold text-sm">Insured Express Courier</h4>
            <p class="text-xs text-white/70 mt-1">Free Delivery across India</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="material-symbols-outlined text-antique-gold text-[36px] mb-2">featured_seasonal_and_gifts</span>
            <h4 class="font-serif font-semibold text-sm">Brass-Seal Velvet Casket</h4>
            <p class="text-xs text-white/70 mt-1">Archival Muslin Packaging</p>
          </div>
        </div>

        <!-- Main Footer Columns -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-white/10">
          
          <!-- Column 1: Brand Info -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-antique-gold text-[28px]">auto_awesome</span>
              <span class="font-serif text-2xl font-bold tracking-widest">LAXMI VASTARAA</span>
            </div>
            <p class="text-xs leading-relaxed text-white/80 max-w-sm">
              Laxmi Vastaraa bridges centuries of Indian textile heritage with contemporary haute couture. Every saree is an immortal heirloom, woven with untainted silver, tested gold, and certified pure mulberry silk.
            </p>
            <div class="pt-2 text-xs text-antique-gold font-medium">
              Flagship Atelier: Godowlia Heritage Corridor, Varanasi & Khaderpet, Kanchipuram
            </div>
          </div>

          <!-- Column 2: Collections -->
          <div>
            <h4 class="font-serif text-sm font-semibold text-antique-gold uppercase tracking-wider mb-4">Royal Weaves</h4>
            <ul class="space-y-2.5 text-xs text-white/80">
              <li><a href="#catalog?category=Banarasi" class="hover:text-antique-gold transition-colors">Varanasi Katan Silk</a></li>
              <li><a href="#catalog?category=Kanjeevaram" class="hover:text-antique-gold transition-colors">Kanchipuram Korvai Pattu</a></li>
              <li><a href="#catalog?category=Chanderi" class="hover:text-antique-gold transition-colors">Chanderi Tissue Zari</a></li>
              <li><a href="#catalog?category=Patola" class="hover:text-antique-gold transition-colors">Patan Double Ikat</a></li>
              <li><a href="#catalog?category=Cotton" class="hover:text-antique-gold transition-colors">Srikalahasti Kalamkari</a></li>
              <li><a href="#catalog?category=Bridal" class="hover:text-antique-gold transition-colors">Heritage Bridal Shikargah</a></li>
            </ul>
          </div>

          <!-- Column 3: Client Experience -->
          <div>
            <h4 class="font-serif text-sm font-semibold text-antique-gold uppercase tracking-wider mb-4">Atelier Care</h4>
            <ul class="space-y-2.5 text-xs text-white/80">
              <li><a href="#wishlist" class="hover:text-antique-gold transition-colors">Your Private Wishlist</a></li>
              <li><a href="#bag" class="hover:text-antique-gold transition-colors">Shopping Bag & Checkout</a></li>
              <li><a href="#admin" class="hover:text-antique-gold transition-colors">Inventory Studio (Admin)</a></li>
              <li><a href="javascript:void(0)" class="hover:text-antique-gold transition-colors" onclick="alert('Silk Mark Verification: All sarees carry an official barcode silk mark certificate inside the parcel.')">Silk Mark Verification</a></li>
              <li><a href="javascript:void(0)" class="hover:text-antique-gold transition-colors" onclick="alert('Custom Blouse Tailoring: Our in-house master tailors provide customized Maggam work and padding.')">Custom Tailoring</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div>
            <h4 class="font-serif text-sm font-semibold text-antique-gold uppercase tracking-wider mb-4">The Royal Gazette</h4>
            <p class="text-xs text-white/80 mb-3">Subscribe to receive private salon invitations and first access to limited edition handlooms.</p>
            <form onsubmit="event.preventDefault(); alert('Thank you for subscribing to Laxmi Vastaraa Royal Gazette!'); event.target.reset();" class="space-y-2">
              <input type="email" placeholder="Enter your email address" required class="w-full text-xs px-3.5 py-2.5 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-antique-gold text-white placeholder-white/50" />
              <button type="submit" class="w-full bg-antique-gold hover:bg-yellow-600 text-deep-charcoal text-xs font-bold py-2.5 rounded uppercase tracking-wider transition-colors">Join Salon</button>
            </form>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-4">
          <p>© 2026 Laxmi Vastaraa. All Rights Reserved. Handwoven with pride in India.</p>
          <div class="flex gap-6">
            <span class="hover:text-antique-gold cursor-pointer">Authenticity Guarantee</span>
            <span class="hover:text-antique-gold cursor-pointer">Preservation Guide</span>
            <span class="hover:text-antique-gold cursor-pointer">Insured Shipping Policy</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}

// ----------------------------------------------------
// PRODUCT CARD COMPONENT
// ----------------------------------------------------
export function renderProductCard(product) {
  const isWishlisted = store.isWishlisted(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= product.reorder_level;

  const primaryImage = product.images?.[0]?.image_url || product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';
  const secondaryImage = product.images?.[1]?.image_url || product.images?.[1] || primaryImage;

  return `
    <article class="product-card group relative bg-surface-container-lowest rounded-xl overflow-hidden border border-antique-gold/20 shadow-sm hover:shadow-xl hover:border-antique-gold/60 transition-all duration-500 flex flex-col justify-between">
      
      <!-- Image Container -->
      <div class="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-low cursor-pointer product-detail-trigger" data-id="${product.id}">
        
        <!-- Primary Image -->
        <img 
          src="${primaryImage}" 
          alt="${product.title}" 
          loading="lazy"
          class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 group-hover:opacity-0"
        />

        <!-- Secondary Image (Hover preview) -->
        <img 
          src="${secondaryImage}" 
          alt="${product.title} angle" 
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-105"
        />

        <!-- Badges Overlay -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span class="silk-badge text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow-md">
            ${product.fabric}
          </span>
          ${product.is_featured ? `
            <span class="bg-primary text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
              Heritage Heirloom
            </span>
          ` : ''}
          ${isLowStock ? `
            <span class="bg-amber-600 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full animate-pulse">
              Only ${product.stock_quantity} Left
            </span>
          ` : ''}
          ${isOutOfStock ? `
            <span class="bg-red-700 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
              Archived / Sold
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Button -->
        <button 
          class="wishlist-btn absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-old-wine hover:bg-white hover:scale-110 shadow-md transition-all"
          data-id="${product.id}"
          title="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
          aria-label="Wishlist toggle"
        >
          <span class="material-symbols-outlined text-[20px] ${isWishlisted ? 'fill text-old-wine' : 'text-neutral-700'}">
            ${isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        <!-- Quick View Hover Button -->
        <div class="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button 
            class="quick-view-btn w-full bg-white/95 backdrop-blur text-deep-charcoal text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow-lg hover:bg-old-wine hover:text-white transition-colors"
            data-id="${product.id}"
          >
            Quick View & Drape Specs
          </button>
        </div>

      </div>

      <!-- Saree Info & Metadata -->
      <div class="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <div class="flex items-center justify-between text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
            <span>${product.weave_type || 'Pit-Loom'} • ${product.primary_color || 'Royal'}</span>
            <span class="font-mono text-neutral-400">${product.sku}</span>
          </div>

          <h3 
            class="font-serif font-bold text-sm text-deep-charcoal hover:text-old-wine cursor-pointer line-clamp-1 mt-1 product-detail-trigger"
            data-id="${product.id}"
            title="${product.title}"
          >
            ${product.title}
          </h3>

          <p class="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            ${product.work_type || product.description}
          </p>
        </div>

        <!-- Price & Action -->
        <div class="pt-2 border-t border-antique-gold/20 flex items-center justify-between">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="font-serif font-bold text-base text-old-wine">₹${product.price.toLocaleString('en-IN')}</span>
              ${product.compare_at_price ? `
                <span class="text-xs text-neutral-400 line-through">₹${product.compare_at_price.toLocaleString('en-IN')}</span>
              ` : ''}
            </div>
            <span class="text-[10px] text-green-700 font-semibold block">Silk Mark Verified</span>
          </div>

          <button 
            class="add-to-cart-btn p-2 rounded bg-surface hover:bg-antique-gold text-old-wine hover:text-white border border-antique-gold/30 transition-colors ${isOutOfStock ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}"
            data-id="${product.id}"
            title="${isOutOfStock ? 'Sold Out' : 'Add to Bag'}"
            ${isOutOfStock ? 'disabled' : ''}
          >
            <span class="material-symbols-outlined text-[20px]">${isOutOfStock ? 'block' : 'add_shopping_cart'}</span>
          </button>
        </div>

      </div>

    </article>
  `;
}

// ----------------------------------------------------
// QUICK VIEW MODAL
// ----------------------------------------------------
export function renderQuickViewModal(product) {
  if (!product) return '';
  const isWishlisted = store.isWishlisted(product.id);
  const isOutOfStock = product.stock_quantity <= 0;

  const primaryImage = product.images?.[0]?.image_url || product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80';

  return `
    <div id="quick-view-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div class="relative w-full max-w-3xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-antique-gold/40 grid grid-cols-1 md:grid-cols-2">
        
        <!-- Close Button -->
        <button id="close-quick-view" class="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-neutral-700 hover:text-black">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <!-- Image Left -->
        <div class="relative aspect-[3/4] md:aspect-auto bg-surface-container-low">
          <img src="${primaryImage}" alt="${product.title}" class="w-full h-full object-cover" />
          <div class="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
            SKU: ${product.sku}
          </div>
        </div>

        <!-- Info Right -->
        <div class="p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div>
            <span class="text-xs uppercase tracking-widest text-antique-gold font-bold">${product.fabric} Handloom</span>
            <h2 class="font-serif text-xl font-bold text-deep-charcoal mt-1">${product.title}</h2>
            
            <div class="flex items-baseline gap-2 mt-2">
              <span class="font-serif text-2xl font-bold text-old-wine">₹${product.price.toLocaleString('en-IN')}</span>
              ${product.compare_at_price ? `<span class="text-sm text-neutral-400 line-through">₹${product.compare_at_price.toLocaleString('en-IN')}</span>` : ''}
            </div>

            <p class="text-xs text-neutral-600 mt-3 leading-relaxed line-clamp-3">
              ${product.description}
            </p>

            <div class="grid grid-cols-2 gap-2 mt-4 text-xs bg-surface-container p-3 rounded-lg border border-antique-gold/20">
              <div><strong>Weave:</strong> ${product.weave_type || 'Zari Brocade'}</div>
              <div><strong>Color:</strong> ${product.primary_color || 'Royal'}</div>
              <div><strong>Occasion:</strong> ${product.occasion || 'Bridal'}</div>
              <div><strong>Availability:</strong> ${isOutOfStock ? '<span class="text-red-700 font-bold">Sold Out</span>' : `<span class="text-green-700 font-bold">${product.stock_quantity} in stock</span>`}</div>
            </div>
          </div>

          <div class="space-y-2 pt-2 border-t border-neutral-200">
            <button 
              class="add-to-cart-modal-btn w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded shadow transition-colors flex items-center justify-center gap-2 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}"
              data-id="${product.id}"
              ${isOutOfStock ? 'disabled' : ''}
            >
              <span class="material-symbols-outlined text-[18px]">shopping_bag</span> ${isOutOfStock ? 'Sold Out' : 'Add to Shopping Bag'}
            </button>

            <div class="flex gap-2">
              <a 
                href="#product/${product.id}" 
                class="flex-1 text-center border border-antique-gold/40 text-old-wine hover:bg-antique-gold/10 font-bold text-xs uppercase tracking-wider py-2.5 rounded transition-colors"
              >
                View Full Specifications
              </a>
              <button 
                class="wishlist-modal-btn px-4 rounded border border-neutral-300 text-old-wine hover:bg-neutral-100"
                data-id="${product.id}"
              >
                <span class="material-symbols-outlined text-[20px] ${isWishlisted ? 'fill' : ''}">${isWishlisted ? 'favorite' : 'favorite_border'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

// ----------------------------------------------------
// CART DRAWER COMPONENT
// ----------------------------------------------------
export function renderCartDrawer() {
  if (!store.isCartDrawerOpen) return '';
  const totals = store.getCartTotals();

  return `
    <div id="cart-drawer-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div class="w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-left border-l border-antique-gold/30">
        
        <!-- Header -->
        <div>
          <div class="flex justify-between items-center pb-4 border-b border-antique-gold/20">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-old-wine text-[24px]">shopping_bag</span>
              <h2 class="font-serif font-bold text-lg text-deep-charcoal">Your Shopping Bag (${store.getCartCount()})</h2>
            </div>
            <button id="close-cart-drawer" class="p-1 text-neutral-500 hover:text-black">
              <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <!-- Free Shipping Progress -->
          <div class="py-3 px-4 my-4 bg-surface-container-high rounded-lg text-xs">
            ${totals.amountNeededForFreeShipping > 0 
              ? `<div class="flex justify-between font-medium text-old-wine mb-1.5">
                   <span>Add <strong>₹${totals.amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> for Free Insured Courier</span>
                 </div>
                 <div class="w-full bg-white rounded-full h-1.5 overflow-hidden">
                   <div class="bg-antique-gold h-full rounded-full transition-all" style="width: ${Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100)}%"></div>
                 </div>`
              : `<div class="text-green-800 font-bold flex items-center gap-1.5">
                   <span class="material-symbols-outlined text-[16px]">verified</span> Free Insured Royal Shipping Unlocked!
                 </div>`
            }
          </div>

          <!-- Items List -->
          <div class="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            ${totals.items.length === 0 ? `
              <div class="text-center py-12 text-neutral-500 space-y-3">
                <span class="material-symbols-outlined text-[48px] text-neutral-300">shopping_bag</span>
                <p class="text-xs">Your shopping bag is empty.</p>
                <a href="#catalog" class="inline-block text-xs text-old-wine font-bold uppercase tracking-wider hover:underline" onclick="store.isCartDrawerOpen = false">Explore Sarees</a>
              </div>
            ` : totals.items.map(item => {
              const primaryImg = item.product.images?.[0]?.image_url || item.product.images?.[0] || '';
              return `
                <div class="flex gap-3 p-3 bg-surface rounded-lg border border-neutral-200/80 items-center">
                  <img src="${primaryImg}" alt="${item.product.title}" class="w-16 h-20 object-cover rounded border border-antique-gold/20 flex-shrink-0" />
                  
                  <div class="flex-1 text-xs space-y-1">
                    <h3 class="font-serif font-bold text-deep-charcoal line-clamp-1">${item.product.title}</h3>
                    <p class="text-[10px] text-neutral-500">${item.product.fabric} • Blouse: <span class="capitalize">${item.blouseOption}</span></p>
                    <span class="font-serif font-semibold text-old-wine">₹${item.product.price.toLocaleString('en-IN')}</span>

                    <div class="flex items-center gap-3 pt-1">
                      <div class="flex items-center border border-neutral-300 rounded bg-white">
                        <button class="qty-btn-minus px-2 py-0.5 text-neutral-600 hover:bg-neutral-100 font-bold text-xs" data-id="${item.id}" data-blouse="${item.blouseOption}" data-qty="${item.quantity - 1}">-</button>
                        <span class="px-2 text-xs font-bold">${item.quantity}</span>
                        <button class="qty-btn-plus px-2 py-0.5 text-neutral-600 hover:bg-neutral-100 font-bold text-xs" data-id="${item.id}" data-blouse="${item.blouseOption}" data-qty="${item.quantity + 1}">+</button>
                      </div>
                      
                      <button class="remove-cart-item-btn text-neutral-400 hover:text-red-700" data-id="${item.id}" data-blouse="${item.blouseOption}" title="Remove">
                        <span class="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Footer / Checkout Breakdown -->
        ${totals.items.length > 0 ? `
          <div class="space-y-4 pt-4 border-t border-antique-gold/20">
            
            <!-- Promo Code Input -->
            <form id="drawer-promo-form" class="flex gap-2">
              <input 
                type="text" 
                id="drawer-promo-input" 
                placeholder="Promo Code (HERITAGE10)"
                value="${totals.promoInfo ? totals.promoInfo.code : ''}"
                class="flex-1 text-xs px-3 py-2 border border-neutral-300 rounded focus:border-old-wine uppercase font-mono"
              />
              <button type="submit" class="bg-antique-gold text-deep-charcoal text-xs font-bold px-3 py-2 rounded hover:bg-yellow-600 uppercase">
                ${totals.promoInfo ? 'Applied' : 'Apply'}
              </button>
            </form>

            <div class="space-y-1.5 text-xs text-neutral-700">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-semibold text-deep-charcoal">₹${totals.subtotal.toLocaleString('en-IN')}</span>
              </div>
              ${totals.discount > 0 ? `
                <div class="flex justify-between text-green-700 font-medium">
                  <span>Privilege Discount (${totals.promoInfo.code}):</span>
                  <span>-₹${totals.discount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}
              <div class="flex justify-between">
                <span>Shipping:</span>
                <span>${totals.shipping === 0 ? '<strong class="text-green-700">FREE</strong>' : `₹${totals.shipping}`}</span>
              </div>
              <div class="flex justify-between font-serif font-bold text-base text-old-wine pt-2 border-t border-neutral-200">
                <span>Grand Total:</span>
                <span>₹${totals.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div class="space-y-2">
              <a 
                href="#checkout" 
                class="w-full bg-old-wine hover:bg-primary text-white text-center font-bold text-xs py-3.5 rounded uppercase tracking-widest shadow-md transition-colors block"
                onclick="store.isCartDrawerOpen = false"
              >
                Proceed to Royal Checkout
              </a>
              <a 
                href="#bag" 
                class="w-full border border-neutral-300 hover:border-antique-gold text-deep-charcoal text-center font-bold text-xs py-2.5 rounded uppercase tracking-wider block"
                onclick="store.isCartDrawerOpen = false"
              >
                View Full Bag Details
              </a>
            </div>

          </div>
        ` : ''}

      </div>
    </div>
  `;
}

// ----------------------------------------------------
// SEARCH MODAL COMPONENT
// ----------------------------------------------------
export function renderSearchModal() {
  if (!store.isSearchModalOpen) return '';
  const query = store.searchQuery.toLowerCase().trim();
  const products = store.getProducts();

  const results = query ? products.filter(p => 
    p.title.toLowerCase().includes(query) ||
    p.sku.toLowerCase().includes(query) ||
    p.fabric.toLowerCase().includes(query) ||
    p.primary_color.toLowerCase().includes(query) ||
    (p.work_type && p.work_type.toLowerCase().includes(query)) ||
    (p.description && p.description.toLowerCase().includes(query))
  ) : [];

  return `
    <div id="search-modal-backdrop" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div class="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-antique-gold/40 overflow-hidden space-y-4 p-6">
        
        <!-- Search Input Bar -->
        <div class="flex items-center gap-3 pb-4 border-b border-antique-gold/30">
          <span class="material-symbols-outlined text-old-wine text-[26px]">search</span>
          <input 
            type="text" 
            id="live-search-input"
            placeholder="Search by Saree title, SKU (e.g. LV-BAN-001), Fabric, Color, or Occasion..."
            value="${store.searchQuery}"
            class="flex-1 text-sm bg-transparent focus:outline-none text-deep-charcoal placeholder-neutral-400"
            autofocus
          />
          <button id="close-search-modal" class="p-1 text-neutral-400 hover:text-black">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- Quick Tag Suggestions -->
        <div class="flex flex-wrap gap-2 pt-1 text-[11px]">
          <span class="text-neutral-500 font-medium py-1">Popular searches:</span>
          <button class="search-tag-btn px-2.5 py-1 rounded bg-surface hover:bg-antique-gold hover:text-white border border-neutral-200" data-query="Banarasi">Banarasi</button>
          <button class="search-tag-btn px-2.5 py-1 rounded bg-surface hover:bg-antique-gold hover:text-white border border-neutral-200" data-query="Kanjeevaram">Kanjeevaram</button>
          <button class="search-tag-btn px-2.5 py-1 rounded bg-surface hover:bg-antique-gold hover:text-white border border-neutral-200" data-query="Bridal">Bridal</button>
          <button class="search-tag-btn px-2.5 py-1 rounded bg-surface hover:bg-antique-gold hover:text-white border border-neutral-200" data-query="Gold">Gold Zari</button>
          <button class="search-tag-btn px-2.5 py-1 rounded bg-surface hover:bg-antique-gold hover:text-white border border-neutral-200" data-query="Organza">Organza</button>
        </div>

        <!-- Live Results Container -->
        <div class="max-h-80 overflow-y-auto space-y-3 pt-2">
          ${query === '' ? `
            <div class="text-center py-8 text-neutral-400 text-xs">
              Type keywords above to discover matching handloom master-weaves.
            </div>
          ` : results.length === 0 ? `
            <div class="text-center py-8 text-neutral-500 text-xs">
              No heirloom sarees matched "${query}". Try searching "Banarasi", "Kanjeevaram", or "Maroon".
            </div>
          ` : `
            <div class="text-xs font-bold text-neutral-500 uppercase tracking-wider pb-1">
              Found ${results.length} heirloom masterpiece(s):
            </div>
            ${results.map(p => {
              const imgUrl = p.images?.[0]?.image_url || p.images?.[0] || '';
              return `
                <div 
                  class="search-result-item flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-container cursor-pointer transition-colors border border-neutral-200/60"
                  data-id="${p.id}"
                >
                  <img src="${imgUrl}" alt="${p.title}" class="w-12 h-14 object-cover rounded border border-antique-gold/20 flex-shrink-0" />
                  <div class="flex-1 text-xs">
                    <span class="text-[10px] text-antique-gold uppercase tracking-wider font-bold">${p.fabric} • ${p.primary_color}</span>
                    <h4 class="font-serif font-bold text-deep-charcoal line-clamp-1">${p.title}</h4>
                    <span class="text-neutral-500 font-mono text-[10px]">${p.sku}</span>
                  </div>
                  <span class="font-serif font-bold text-sm text-old-wine">₹${p.price.toLocaleString('en-IN')}</span>
                </div>
              `;
            }).join('')}
          `}
        </div>

      </div>
    </div>
  `;
}

// ----------------------------------------------------
// ADMIN ORDER INSPECTOR MODAL
// ----------------------------------------------------
export function renderAdminOrderModal() {
  if (!store.selectedOrderModal) return '';
  const order = store.selectedOrderModal;
  const isPaid = order.payment_status === 'Paid';
  const isCod = order.payment_status === 'Pending (COD)' || order.payment_method?.includes('COD');

  return `
    <div id="admin-order-modal-backdrop" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div class="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-antique-gold/40 max-h-[90vh] flex flex-col animate-scale-up">
        
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-old-wine to-primary p-5 text-white flex justify-between items-center">
          <div>
            <span class="text-[10px] uppercase tracking-[0.2em] text-antique-gold font-bold block">Consignment & Payment Dossier</span>
            <h3 class="font-serif font-bold text-lg">Order Ref: ${order.order_number || order.order_id}</h3>
          </div>
          <button id="close-admin-order-modal" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="p-6 overflow-y-auto space-y-6 text-xs text-neutral-800">
          
          <!-- Key Indicators Banner -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
            <div>
              <span class="text-[10px] uppercase font-bold text-neutral-400 block">Payment Method</span>
              <strong class="text-deep-charcoal text-xs">${order.payment_method}</strong>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-neutral-400 block">Payment Status</span>
              <span class="inline-block font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-900' : isCod ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'}">
                ${order.payment_status}
              </span>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold text-neutral-400 block">Fulfillment</span>
              <span class="font-bold text-deep-charcoal text-xs">${order.order_status || 'Placed'}</span>
            </div>
          </div>

          <!-- Transaction & Gateway Reference Hash -->
          <div class="p-4 rounded-xl bg-surface border border-antique-gold/30 space-y-2">
            <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-old-wine flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">receipt</span>
              <span>Financial Audit & Transaction IDs</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
              <div><strong>Gateway Payment ID:</strong> ${order.gateway_payment_id || 'N/A (Cash on Delivery)'}</div>
              <div><strong>Gateway Order ID:</strong> ${order.gateway_order_id || 'N/A'}</div>
              <div><strong>Transaction Timestamp:</strong> ${order.paid_at ? new Date(order.paid_at).toLocaleString('en-IN') : 'Awaiting Doorstep Collection'}</div>
              <div><strong>Created At:</strong> ${new Date(order.created_at).toLocaleString('en-IN')}</div>
            </div>
          </div>

          <!-- Customer & Delivery Coordinates -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-neutral-200 bg-white">
            <div>
              <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-deep-charcoal mb-1">Customer Patron</h4>
              <p class="font-bold text-sm text-deep-charcoal">${order.customer_name}</p>
              <p class="text-neutral-600 mt-1">📞 ${order.customer_phone}</p>
              <p class="text-neutral-600">✉️ ${order.customer_email || 'client@laxmivastraa.com'}</p>
            </div>
            <div>
              <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-deep-charcoal mb-1">Dispatch Destination</h4>
              <p class="text-neutral-700 leading-relaxed">${order.shipping_address}</p>
              <p class="font-semibold text-deep-charcoal">${order.city}, ${order.state} - ${order.pincode}</p>
            </div>
          </div>

          <!-- Line Items Breakdown -->
          <div class="space-y-3">
            <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-deep-charcoal">Purchased Saree Heirlooms</h4>
            <div class="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
              ${(order.items || []).map(item => `
                <div class="p-3 bg-white flex justify-between items-center gap-3">
                  <div class="flex items-center gap-3">
                    ${item.image_url ? `<img src="${item.image_url}" class="w-12 h-14 object-cover rounded border" />` : ''}
                    <div>
                      <strong class="font-serif text-deep-charcoal block">${item.saree_title || 'Royal Saree'}</strong>
                      <span class="text-[10px] text-neutral-500 font-mono">${item.saree_id} • Qty: ${item.quantity} • Blouse: ${item.blouse_option}</span>
                    </div>
                  </div>
                  <span class="font-serif font-bold text-sm text-old-wine">₹${(item.unit_price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Total Invoice Calculation -->
          <div class="p-4 rounded-xl bg-surface-container-low border border-antique-gold/20 flex justify-between items-center text-xs">
            <div class="space-y-0.5">
              <span>Subtotal: ₹${(order.subtotal || order.total_amount).toLocaleString('en-IN')}</span>
              ${order.discount > 0 ? `<span class="block text-green-700 font-bold">Privilege Discount: -₹${order.discount.toLocaleString('en-IN')}</span>` : ''}
              <span class="block text-green-700">Insured Handover: FREE</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-neutral-400 block">Total Settlement Amount</span>
              <strong class="font-serif text-xl font-bold text-old-wine">₹${order.total_amount.toLocaleString('en-IN')}</strong>
            </div>
          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="bg-neutral-100 p-4 border-t border-neutral-200 flex justify-between items-center">
          <button 
            type="button" 
            onclick="window.print()" 
            class="px-4 py-2 rounded border border-neutral-300 bg-white hover:bg-neutral-50 text-deep-charcoal font-bold text-xs flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">print</span> Print Consignment Note
          </button>
          
          <button 
            id="close-admin-order-modal-btn" 
            class="bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-wider px-6 py-2 rounded"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  `;
}
