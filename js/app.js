// Laxmi Vastaraa - Application Controller & Router with Firebase Auth & RBAC
import { store } from './state.js';
import { 
  renderHeader, 
  renderFooter, 
  renderQuickViewModal, 
  renderCartDrawer, 
  renderSearchModal 
} from './components.js';
import { 
  renderHomePage, 
  renderCatalogPage, 
  renderProductDetailPage, 
  renderCartPage, 
  renderCheckoutPage, 
  renderOrderSuccessPage, 
  renderWishlistPage, 
  renderAdminPage,
  renderAdminAddSareePage,
  renderLoginPage,
  renderRegisterPage,
  renderForgotPasswordPage,
  renderUserProfilePage
} from './pages.js';
import { initSilkShader } from './shader.js';

let cleanupShader = null;

function parseHash() {
  const hash = window.location.hash.slice(1) || 'home';
  const [routePart, queryPart] = hash.split('?');
  const params = new URLSearchParams(queryPart || '');

  // Dynamic route: #product/saree-001 or #product/midnight-blue-brocade-banarasi
  if (routePart.startsWith('product/')) {
    const productId = routePart.replace('product/', '');
    return { route: 'product', id: productId, params };
  }

  // Admin Dedicated Routes
  if (routePart === 'admin/add' || routePart === 'admin/add-saree') {
    return { route: 'admin-add-saree', id: null, params };
  }

  if (routePart.startsWith('admin/edit-saree/')) {
    const sareeId = routePart.replace('admin/edit-saree/', '');
    return { route: 'admin-add-saree', id: sareeId, params };
  }

  return { route: routePart, id: null, params };
}

function renderApp() {
  const { route, id, params } = parseHash();
  store.currentRoute = route;

  // Sync category filter if present in query
  if (params.has('category')) {
    store.selectedCategory = params.get('category');
  }

  // Route Security Guards
  if (route === 'admin' || route === 'admin-add-saree') {
    if (!store.isAdmin()) {
      store.showToast('Access Denied: Administrator Privileges Required', 'error');
      // If attempting to open full-page add-saree without admin rights, redirect to #home
      if (route === 'admin-add-saree') {
        window.location.hash = '#login?redirect=admin';
        return;
      }
    }
  }

  // Render Header & Footer (Hidden on dedicated studio add-saree)
  const headerContainer = document.getElementById('header-root');
  if (headerContainer) {
    if (route === 'admin-add-saree') {
      headerContainer.innerHTML = '';
    } else {
      headerContainer.innerHTML = renderHeader();
    }
  }

  const footerContainer = document.getElementById('footer-root');
  if (footerContainer) {
    if (route === 'admin-add-saree') {
      footerContainer.innerHTML = '';
    } else {
      footerContainer.innerHTML = renderFooter();
    }
  }

  // Render Main Content
  const mainContainer = document.getElementById('main-content');
  if (!mainContainer) return;

  if (cleanupShader) {
    cleanupShader();
    cleanupShader = null;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (route) {
    case 'home':
      mainContainer.innerHTML = renderHomePage();
      setTimeout(() => {
        cleanupShader = initSilkShader('hero-silk-canvas');
      }, 50);
      break;

    case 'catalog':
      mainContainer.innerHTML = renderCatalogPage();
      break;

    case 'product':
      mainContainer.innerHTML = renderProductDetailPage(id || store.selectedProductId);
      break;

    case 'bag':
    case 'cart':
      mainContainer.innerHTML = renderCartPage();
      break;

    case 'checkout':
      mainContainer.innerHTML = renderCheckoutPage();
      break;

    case 'order-success':
    case 'confirmation':
      mainContainer.innerHTML = renderOrderSuccessPage();
      break;

    case 'wishlist':
      mainContainer.innerHTML = renderWishlistPage();
      break;

    case 'login':
    case 'signin':
      mainContainer.innerHTML = renderLoginPage(params.get('redirect') || 'home');
      break;

    case 'register':
    case 'signup':
      mainContainer.innerHTML = renderRegisterPage(params.get('redirect') || 'home');
      break;

    case 'forgot-password':
      mainContainer.innerHTML = renderForgotPasswordPage();
      break;

    case 'profile':
      mainContainer.innerHTML = renderUserProfilePage(params.get('tab') || 'profile');
      break;

    case 'admin':
      mainContainer.innerHTML = renderAdminPage();
      break;

    case 'admin-add-saree':
      mainContainer.innerHTML = renderAdminAddSareePage(id);
      break;

    default:
      mainContainer.innerHTML = renderHomePage();
      setTimeout(() => {
        cleanupShader = initSilkShader('hero-silk-canvas');
      }, 50);
      break;
  }

  renderOverlays();
}

function renderOverlays() {
  const overlayContainer = document.getElementById('overlay-root');
  if (!overlayContainer) return;

  const quickViewProduct = store.quickViewProductId 
    ? store.getProductById(store.quickViewProductId) 
    : null;

  overlayContainer.innerHTML = `
    ${renderQuickViewModal(quickViewProduct)}
    ${renderCartDrawer()}
    ${renderSearchModal()}
  `;
}

// ----------------------------------------------------
// Global Event Delegation
// ----------------------------------------------------
function bindEventListeners() {
  window.addEventListener('hashchange', renderApp);

  // Reactive Store Subscriber
  store.subscribe((event, payload) => {
    if (event === 'CART_UPDATED' || event === 'WISHLIST_UPDATED' || event === 'AUTH_CHANGED' || event === 'TOAST_UPDATED') {
      const headerContainer = document.getElementById('header-root');
      if (headerContainer && store.currentRoute !== 'admin-add-saree') {
        headerContainer.innerHTML = renderHeader();
      }
      renderOverlays();
      if (store.currentRoute === 'bag' || store.currentRoute === 'wishlist' || store.currentRoute === 'checkout' || store.currentRoute === 'profile' || store.currentRoute === 'admin') {
        renderApp();
      }
    } else if (event === 'PRODUCTS_UPDATED' || event === 'ORDERS_UPDATED' || event === 'METRICS_UPDATED') {
      renderApp();
    } else if (event === 'ORDER_PLACED') {
      window.location.hash = '#confirmation';
    }
  });

  // Central Click Delegation
  document.addEventListener('click', async (e) => {
    
    // Toast Dismiss
    if (e.target.closest('#toast-close-btn')) {
      store.hideToast();
      return;
    }

    // Product Detail Navigation
    const detailTrigger = e.target.closest('.product-detail-trigger');
    if (detailTrigger) {
      const id = detailTrigger.getAttribute('data-id');
      if (id) {
        window.location.hash = `#product/${id}`;
        store.quickViewProductId = null;
        renderOverlays();
        return;
      }
    }

    // Wishlist Toggle
    const wishlistBtn = e.target.closest('.wishlist-btn, .wishlist-modal-btn');
    if (wishlistBtn) {
      e.stopPropagation();
      const id = wishlistBtn.getAttribute('data-id');
      if (id) store.toggleWishlist(id);
      return;
    }

    // Quick View Modal
    const quickViewBtn = e.target.closest('.quick-view-btn');
    if (quickViewBtn) {
      e.stopPropagation();
      const id = quickViewBtn.getAttribute('data-id');
      if (id) {
        store.quickViewProductId = id;
        renderOverlays();
      }
      return;
    }

    if (e.target.closest('#close-quick-view') || (e.target.id === 'quick-view-modal')) {
      store.quickViewProductId = null;
      renderOverlays();
      return;
    }

    // Add to Bag Buttons
    const addToCartBtn = e.target.closest('.add-to-cart-btn, .add-to-cart-modal-btn');
    if (addToCartBtn) {
      e.stopPropagation();
      const id = addToCartBtn.getAttribute('data-id');
      if (id) {
        store.addToCart(id, 1, { blouseOption: 'unstitched' });
        store.isCartDrawerOpen = true;
        renderOverlays();
      }
      return;
    }

    // PDP Add to Bag Button
    if (e.target.closest('#pdp-add-to-cart-btn')) {
      const btn = e.target.closest('#pdp-add-to-cart-btn');
      const id = btn.getAttribute('data-id');
      const blouseOption = document.querySelector('input[name="pdp-blouse-option"]:checked')?.value || 'unstitched';
      if (id) {
        store.addToCart(id, 1, { blouseOption });
        store.isCartDrawerOpen = true;
        renderOverlays();
      }
      return;
    }

    // PDP Buy Now & Proceed to Checkout Button
    if (e.target.closest('#pdp-buy-now-btn')) {
      const btn = e.target.closest('#pdp-buy-now-btn');
      const id = btn.getAttribute('data-id');
      const blouseOption = document.querySelector('input[name="pdp-blouse-option"]:checked')?.value || 'unstitched';
      if (id) {
        store.addToCart(id, 1, { blouseOption });
        store.isCartDrawerOpen = false;
        renderOverlays();
        window.location.hash = '#checkout';
      }
      return;
    }

    // Checkout Page 1-Click Quick Add Sample Saree
    if (e.target.closest('#quick-add-sample-saree-btn')) {
      const firstSaree = store.getProducts()[0];
      if (firstSaree) {
        store.addToCart(firstSaree.id, 1, { blouseOption: 'unstitched' });
        store.showToast(`Added ${firstSaree.title} to bag`, 'success');
        renderApp();
      }
      return;
    }

    // Checkout Page Quick Reserve Card Button
    const quickCheckoutCardBtn = e.target.closest('.quick-checkout-card-btn');
    if (quickCheckoutCardBtn) {
      const id = quickCheckoutCardBtn.getAttribute('data-id');
      if (id) {
        store.addToCart(id, 1, { blouseOption: 'unstitched' });
        store.showToast('Artisan saree added to checkout bag', 'success');
        renderApp();
      }
      return;
    }

    // PDP Gallery Thumbnails
    const pdpThumb = e.target.closest('.pdp-thumbnail');
    if (pdpThumb) {
      const src = pdpThumb.getAttribute('data-src');
      const mainImg = document.getElementById('pdp-main-image');
      if (mainImg && src) {
        mainImg.src = src;
        document.querySelectorAll('.pdp-thumbnail').forEach(t => {
          t.classList.remove('border-old-wine', 'ring-2', 'ring-old-wine/30');
          t.classList.add('border-neutral-200', 'opacity-70');
        });
        pdpThumb.classList.add('border-old-wine', 'ring-2', 'ring-old-wine/30');
        pdpThumb.classList.remove('border-neutral-200', 'opacity-70');
      }
      return;
    }

    // Cart Drawer Open / Close
    if (e.target.closest('#cart-drawer-trigger')) {
      store.isCartDrawerOpen = true;
      renderOverlays();
      return;
    }

    if (e.target.closest('#close-cart-drawer') || (e.target.id === 'cart-drawer-backdrop')) {
      store.isCartDrawerOpen = false;
      renderOverlays();
      return;
    }

    // Cart Item Quantity Controls
    const cartQtyBtn = e.target.closest('.cart-qty-btn');
    if (cartQtyBtn) {
      const id = cartQtyBtn.getAttribute('data-id');
      const action = cartQtyBtn.getAttribute('data-action');
      const blouse = cartQtyBtn.getAttribute('data-blouse') || 'unstitched';
      const item = store.cart.find(i => i.id === id && i.blouseOption === blouse);
      if (item) {
        const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        store.updateCartQuantity(id, newQty, blouse);
      }
      return;
    }

    const cartRemoveBtn = e.target.closest('.cart-remove-btn');
    if (cartRemoveBtn) {
      const id = cartRemoveBtn.getAttribute('data-id');
      const blouse = cartRemoveBtn.getAttribute('data-blouse') || 'unstitched';
      store.removeFromCart(id, blouse);
      return;
    }

    // Search Modal Controls
    if (e.target.closest('#search-trigger-btn')) {
      store.isSearchModalOpen = true;
      renderOverlays();
      setTimeout(() => document.getElementById('live-search-input')?.focus(), 80);
      return;
    }

    if (e.target.closest('#close-search-modal') || (e.target.id === 'search-modal-backdrop')) {
      store.isSearchModalOpen = false;
      renderOverlays();
      return;
    }

    const searchTag = e.target.closest('.search-tag-btn');
    if (searchTag) {
      const query = searchTag.getAttribute('data-query');
      store.searchQuery = query;
      store.isSearchModalOpen = false;
      window.location.hash = `#catalog?category=${query}`;
      return;
    }

    const searchResultItem = e.target.closest('.search-result-item');
    if (searchResultItem) {
      const id = searchResultItem.getAttribute('data-id');
      store.isSearchModalOpen = false;
      window.location.hash = `#product/${id}`;
      return;
    }

    // Catalog Color Filter Swatch
    const filterColorBtn = e.target.closest('.filter-color-btn');
    if (filterColorBtn) {
      const color = filterColorBtn.getAttribute('data-color');
      store.activeColor = color;
      renderApp();
      return;
    }

    // Reset Catalog Filters
    if (e.target.closest('#clear-all-filters-btn') || e.target.closest('#catalog-reset-filters-btn')) {
      store.selectedCategory = 'all';
      store.activeFabric = 'all';
      store.activeWeaveType = 'all';
      store.activeColor = 'all';
      store.activeOccasion = 'all';
      store.priceFilter = 150000;
      store.searchQuery = '';
      store.sortBy = 'featured';
      renderApp();
      return;
    }

    if (e.target.closest('#clear-search-btn')) {
      store.searchQuery = '';
      renderApp();
      return;
    }

    // Mobile Menu Controls
    if (e.target.closest('#mobile-menu-btn')) {
      document.getElementById('mobile-nav')?.classList.remove('hidden');
      return;
    }

    if (e.target.closest('#mobile-nav-close') || e.target.closest('.mobile-nav-item')) {
      document.getElementById('mobile-nav')?.classList.add('hidden');
      return;
    }

    // Authentication Quick One-Click Logins
    if (e.target.closest('#quick-login-admin')) {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput && passInput) {
        emailInput.value = 'admin@laxmivastaraa.com';
        passInput.value = 'laxmi2026';
        document.getElementById('login-submit-btn')?.click();
      }
      return;
    }

    if (e.target.closest('#quick-login-customer')) {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput && passInput) {
        emailInput.value = 'radha.sharma@heritage.in';
        passInput.value = 'heritage123';
        document.getElementById('login-submit-btn')?.click();
      }
      return;
    }

    // Google Sign-In Action
    if (e.target.closest('#auth-google-btn')) {
      const redirect = parseHash().params.get('redirect') || 'home';
      const res = await store.loginWithGoogle();
      if (res.success) {
        window.location.hash = `#${redirect}`;
      }
      return;
    }

    // Logout Actions
    if (e.target.closest('#nav-logout-btn, #mobile-nav-logout-btn, #profile-logout-btn, #admin-logout-btn')) {
      await store.logout();
      window.location.hash = '#home';
      return;
    }

    // Admin Tabs & Management
    const adminTabBtn = e.target.closest('.admin-tab-btn');
    if (adminTabBtn) {
      store.adminTab = adminTabBtn.getAttribute('data-tab');
      renderApp();
      return;
    }

    const adminDeleteBtn = e.target.closest('.admin-delete-saree-btn');
    if (adminDeleteBtn) {
      const id = adminDeleteBtn.getAttribute('data-id');
      if (id && confirm('Are you sure you wish to delete this saree from the active catalog?')) {
        await store.deleteProduct(id);
      }
      return;
    }

    // Add / Edit Saree Action Buttons
    if (e.target.closest('#regenerate-sku-btn')) {
      const skuInput = document.getElementById('sku');
      const fabricSelect = document.getElementById('fabric');
      if (skuInput) {
        const code = fabricSelect?.value ? fabricSelect.value.slice(0, 3).toUpperCase() : 'BAN';
        skuInput.value = `LV-${code}-${Math.floor(100 + Math.random() * 900)}`;
      }
      return;
    }

    if (e.target.closest('#save-saree-btn') || e.target.closest('#top-save-saree-btn')) {
      const form = document.getElementById('full-add-saree-form');
      if (form) {
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const editingId = form.getAttribute('data-editing-id');
        const title = document.getElementById('title')?.value;
        const sku = document.getElementById('sku')?.value;
        const price = parseFloat(document.getElementById('price')?.value);
        const compare_at_price = document.getElementById('compare_at_price')?.value ? parseFloat(document.getElementById('compare_at_price').value) : null;
        const stock_quantity = parseInt(document.getElementById('stock_quantity')?.value || '5', 10);
        const fabric = document.getElementById('fabric')?.value;
        const weave_type = document.getElementById('weave_type')?.value;
        const primaryColorRadio = document.querySelector('input[name="primary_color"]:checked');
        const primary_color = primaryColorRadio ? primaryColorRadio.value : 'Maroon';
        const main_img = document.getElementById('main_image_url')?.value;
        const pallu_img = document.getElementById('pallu_image_url')?.value;
        const fabric_img = document.getElementById('fabric_image_url')?.value;
        const description = document.getElementById('artisan_story')?.value;

        const images = [main_img];
        if (pallu_img) images.push(pallu_img);
        if (fabric_img) images.push(fabric_img);

        const payload = {
          title,
          sku,
          price,
          compare_at_price,
          stock_quantity,
          fabric,
          weave_type,
          primary_color,
          images,
          description
        };

        try {
          if (editingId) {
            await store.updateProduct(editingId, payload);
          } else {
            await store.addProduct(payload);
          }
          window.location.hash = '#admin';
        } catch (err) {
          alert('Failed to save saree: ' + err.message);
        }
      }
      return;
    }

    // Pincode Verification on PDP
    if (e.target.closest('#pdp-pincode-check-btn')) {
      const pinInput = document.getElementById('pdp-pincode-input');
      const statusBox = document.getElementById('pdp-pincode-status');
      if (pinInput && statusBox) {
        const pin = pinInput.value.trim();
        statusBox.innerHTML = '<span class="text-xs text-neutral-500">Checking delivery networks...</span>';
        const res = await store.checkPincode(pin);
        if (res.valid && res.serviceable) {
          statusBox.className = 'text-xs p-2.5 rounded bg-green-50 text-green-800 border border-green-200 mt-2 space-y-0.5';
          statusBox.innerHTML = `
            <div class="font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">verified</span> PIN ${res.pincode} Serviceable</div>
            <p>${res.message}</p>
          `;
        } else {
          statusBox.className = 'text-xs p-2.5 rounded bg-red-50 text-red-800 border border-red-200 mt-2';
          statusBox.innerHTML = `<span class="font-bold">❌ ${res.message || 'Delivery unavailable'}</span>`;
        }
      }
      return;
    }

  });

  // Inputs & Real-Time Sync
  document.addEventListener('input', (e) => {
    if (e.target.id === 'price-range-slider') {
      store.priceFilter = parseInt(e.target.value, 10);
      renderApp();
      return;
    }

    if (e.target.id === 'live-search-input') {
      store.searchQuery = e.target.value;
      renderOverlays();
      return;
    }

    if (e.target.id === 'main_image_url') {
      const preview = document.getElementById('preview-main-img');
      if (preview && e.target.value) {
        preview.src = e.target.value;
      }
      return;
    }

    if (e.target.classList.contains('admin-stock-input')) {
      const id = e.target.getAttribute('data-id');
      store.updateStock(id, e.target.value);
      return;
    }
  });

  // Form Submissions
  document.addEventListener('submit', async (e) => {
    
    // Auth Login Form
    if (e.target.id === 'auth-login-form') {
      e.preventDefault();
      const form = e.target;
      const redirect = form.getAttribute('data-redirect') || 'home';
      const email = document.getElementById('login-email')?.value;
      const password = document.getElementById('login-password')?.value;
      
      const res = await store.loginWithEmail(email, password);
      if (res.success) {
        window.location.hash = `#${redirect}`;
      }
      return;
    }

    // Auth Register Form
    if (e.target.id === 'auth-register-form') {
      e.preventDefault();
      const form = e.target;
      const redirect = form.getAttribute('data-redirect') || 'home';
      const fullName = document.getElementById('reg-fullname')?.value;
      const email = document.getElementById('reg-email')?.value;
      const phone = document.getElementById('reg-phone')?.value;
      const password = document.getElementById('reg-password')?.value;
      const confirmPassword = document.getElementById('reg-confirm-password')?.value;

      if (password !== confirmPassword) {
        store.showToast('Passwords do not match. Please re-enter.', 'error');
        return;
      }

      const res = await store.registerWithEmail(fullName, email, phone, password);
      if (res.success) {
        window.location.hash = `#${redirect}`;
      }
      return;
    }

    // Auth Forgot Password Form
    if (e.target.id === 'auth-forgot-form') {
      e.preventDefault();
      const email = document.getElementById('forgot-email')?.value;
      await store.forgotPassword(email);
      return;
    }

    // Update Profile Form
    if (e.target.id === 'update-profile-form') {
      e.preventDefault();
      const fullName = document.getElementById('prof-name')?.value;
      const phone = document.getElementById('prof-phone')?.value;
      await store.updateUserProfile({ full_name: fullName, phone_number: phone });
      return;
    }

    // Update Address Form
    if (e.target.id === 'update-address-form') {
      e.preventDefault();
      const street = document.getElementById('prof-street')?.value;
      const city = document.getElementById('prof-city')?.value;
      const state = document.getElementById('prof-state')?.value;
      const pin = document.getElementById('prof-pin')?.value;

      await store.updateUserProfile({
        shipping_address: {
          street,
          city,
          state,
          postal_code: pin
        }
      });
      return;
    }

    // Homepage Pincode Form
    if (e.target.id === 'home-pincode-form') {
      e.preventDefault();
      const pinInput = document.getElementById('home-pincode-input');
      const statusBox = document.getElementById('home-pincode-status');
      if (pinInput && statusBox) {
        const pin = pinInput.value.trim();
        statusBox.innerHTML = '<span class="text-xs text-neutral-500">Checking delivery coverage...</span>';
        const res = await store.checkPincode(pin);
        if (res.valid && res.serviceable) {
          statusBox.className = 'text-xs p-3 rounded-lg bg-green-50 text-green-800 border border-green-200 space-y-1 block';
          statusBox.innerHTML = `
            <div class="font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">verified</span> PIN Code ${res.pincode} is Serviceable</div>
            <p>${res.message}</p>
          `;
        } else {
          statusBox.className = 'text-xs p-3 rounded-lg bg-red-50 text-red-800 border border-red-200 block';
          statusBox.innerHTML = `<div class="font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">error</span> ${res.message || 'Delivery unavailable'}</div>`;
        }
      }
      return;
    }

    // Checkout Form
    if (e.target.id === 'checkout-main-form') {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      const name = document.getElementById('cust-name')?.value?.trim();
      const phone = document.getElementById('cust-phone')?.value?.trim();
      const email = document.getElementById('cust-email')?.value?.trim();
      const address = document.getElementById('cust-address')?.value?.trim();
      const city = document.getElementById('cust-city')?.value?.trim();
      const state = document.getElementById('cust-state')?.value?.trim();
      const pin = document.getElementById('cust-pin')?.value?.trim();
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'Online Payment';

      if (!name || !phone || !address || !pin) {
        store.showToast('Please fill all required delivery details.', 'warning');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Initializing Gateway...`;
      }

      try {
        await store.placeOrder({
          shippingAddress: { name, phone, email, address, city, state, pin },
          paymentMethod
        });
      } catch (err) {
        console.warn('Checkout submission:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
      return;
    }

    // Promo forms
    if (e.target.id === 'cart-page-promo-form') {
      e.preventDefault();
      const code = document.getElementById('cart-page-promo-input')?.value;
      store.applyPromo(code);
      return;
    }

    if (e.target.id === 'drawer-promo-form') {
      e.preventDefault();
      const code = document.getElementById('drawer-promo-input')?.value;
      store.applyPromo(code);
      return;
    }

  });
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
  bindEventListeners();
  renderApp();
});
