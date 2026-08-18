// Laxmi Vastaraa - Reactive State Management with Backend REST API & Firebase User Management
import { INITIAL_PRODUCTS, PROMO_CODES } from './data.js';
import { firebaseAuth } from './firebase-config.js';

class Store {
  constructor() {
    this.subscribers = [];
    this.products = [];
    this.cart = [];
    this.wishlist = [];
    this.orders = [];
    this.promo = null;
    this.lastPlacedOrder = null;

    // Filter & Search State
    this.selectedCategory = 'all';
    this.activeFabric = 'all';
    this.activeWeaveType = 'all';
    this.activeColor = 'all';
    this.activeOccasion = 'all';
    this.priceFilter = 150000;
    this.searchQuery = '';
    this.sortBy = 'featured';

    // UI Modals & Routing
    this.currentRoute = 'home';
    this.selectedProductId = null;
    this.quickViewProductId = null;
    this.isCartDrawerOpen = false;
    this.isSearchModalOpen = false;
    this.adminTab = 'inventory'; // 'inventory', 'orders', 'add_saree', 'edit_saree'
    this.editingSareeId = null;

    // Firebase User & Auth State
    this.currentUser = null;
    this.authLoading = true;
    this.toastMessage = null;
    this.toastType = 'info'; // 'info', 'success', 'error', 'warning'
    this.toastTimeout = null;

    // Admin Auth State (synced with Firebase role & legacy admin token)
    this.adminToken = null;
    this.adminUser = null;

    // Pincode Verification State
    this.pincodeResult = null;
    this.isCheckingPincode = false;

    // Metrics
    this.metrics = {
      total_sarees: 8,
      low_stock_count: 2,
      low_stock_sarees: [],
      pending_orders: 2,
      total_revenue: 106100
    };

    this.init();
  }

  init() {
    // 1. Load LocalStorage Caches for snappy offline & instant first paint
    try {
      if (typeof localStorage !== 'undefined') {
        const cachedProducts = localStorage.getItem('lv_products_v2');
        if (cachedProducts) this.products = JSON.parse(cachedProducts);
        else this.products = [...INITIAL_PRODUCTS];

        const cachedCart = localStorage.getItem('lv_cart_v2');
        if (cachedCart) this.cart = JSON.parse(cachedCart);

        const cachedWishlist = localStorage.getItem('lv_wishlist_v2');
        if (cachedWishlist) this.wishlist = JSON.parse(cachedWishlist);

        const cachedOrders = localStorage.getItem('lv_orders_v2');
        if (cachedOrders) this.orders = JSON.parse(cachedOrders);

        const cachedAdmin = localStorage.getItem('lv_admin_auth_v2');
        if (cachedAdmin) {
          const auth = JSON.parse(cachedAdmin);
          this.adminToken = auth.token;
          this.adminUser = auth.user;
        }
      }
    } catch (e) {
      console.warn('LocalStorage init fallback:', e);
      this.products = [...INITIAL_PRODUCTS];
    }

    // 2. Initialize Firebase Auth State Listener
    firebaseAuth.onAuthStateChanged(async (user) => {
      this.currentUser = user;
      this.authLoading = false;

      if (user) {
        if (user.role === 'admin') {
          this.adminToken = `lv-admin-token-${user.uid}`;
          this.adminUser = user;
          localStorage.setItem('lv_admin_auth_v2', JSON.stringify({ token: this.adminToken, user: this.adminUser }));
        }

        // Sync wishlist items from user record if present
        if (Array.isArray(user.wishlist_items) && user.wishlist_items.length > 0) {
          this.wishlist = Array.from(new Set([...this.wishlist, ...user.wishlist_items]));
          this.saveWishlist();
        }
      } else {
        // If not logged in as admin via Firebase and no legacy admin
        if (!localStorage.getItem('lv_admin_auth_v2')) {
          this.adminToken = null;
          this.adminUser = null;
        }
      }

      this.notify('AUTH_CHANGED', user);
    });

    // 3. Fetch fresh live state from backend REST API asynchronously
    this.fetchProducts();
    this.fetchOrders();
    this.fetchMetrics();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify(event, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(event, payload);
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    });
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = 'info', duration = 4000) {
    this.toastMessage = message;
    this.toastType = type;
    this.notify('TOAST_UPDATED', { message, type });

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
      this.notify('TOAST_UPDATED', null);
    }, duration);
  }

  hideToast() {
    this.toastMessage = null;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.notify('TOAST_UPDATED', null);
  }

  // --- FIREBASE AUTH METHODS ---
  async loginWithEmail(email, password) {
    try {
      const res = await firebaseAuth.signInWithEmailAndPassword(email, password);
      this.currentUser = res.user;
      this.showToast(`Welcome back, ${res.user.full_name || 'Patron'}!`, 'success');
      this.notify('AUTH_CHANGED', this.currentUser);
      return { success: true, user: res.user };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  }

  async registerWithEmail(fullName, email, phoneNumber, password) {
    try {
      const res = await firebaseAuth.createUserWithEmailAndPassword(fullName, email, phoneNumber, password);
      this.currentUser = res.user;
      this.showToast(`Account created! Welcome to Laxmi Vastaraa, ${fullName}.`, 'success');
      this.notify('AUTH_CHANGED', this.currentUser);
      return { success: true, user: res.user };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  }

  async loginWithGoogle() {
    try {
      const res = await firebaseAuth.signInWithPopupGoogle();
      this.currentUser = res.user;
      this.showToast(`Signed in with Google as ${res.user.full_name}.`, 'success');
      this.notify('AUTH_CHANGED', this.currentUser);
      return { success: true, user: res.user };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  }

  async forgotPassword(email) {
    try {
      const res = await firebaseAuth.sendPasswordResetEmail(email);
      this.showToast(res.message, 'success');
      return { success: true, message: res.message };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  }

  async logout() {
    await firebaseAuth.signOut();
    this.currentUser = null;
    this.adminToken = null;
    this.adminUser = null;
    localStorage.removeItem('lv_admin_auth_v2');
    this.showToast('You have been securely signed out.', 'info');
    this.notify('AUTH_CHANGED', null);
  }

  async updateUserProfile(updates) {
    try {
      const updated = await firebaseAuth.updateUserProfile(updates);
      this.currentUser = updated;
      this.showToast('Profile information updated successfully.', 'success');
      this.notify('AUTH_CHANGED', updated);
      return { success: true, user: updated };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  isAdmin() {
    if (this.currentUser && this.currentUser.role === 'admin') return true;
    if (this.adminToken && this.adminUser) return true;
    return false;
  }

  // --- API DATA FETCHING & SYNCHRONIZATION ---
  async fetchProducts(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/sarees?${query}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        this.products = data.data;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('lv_products_v2', JSON.stringify(this.products));
        }
        this.notify('PRODUCTS_UPDATED', this.products);
      }
    } catch (err) {
      console.warn('Using local products store (offline/initial):', err);
    }
  }

  async fetchOrders() {
    try {
      const headers = {};
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch('/api/orders', { headers });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        this.orders = data.data;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('lv_orders_v2', JSON.stringify(this.orders));
        }
        this.notify('ORDERS_UPDATED', this.orders);
      }
    } catch (err) {
      console.warn('Orders fetch:', err);
    }
  }

  async fetchMetrics() {
    try {
      const headers = {};
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch('/api/admin/metrics', { headers });
      const data = await res.json();
      if (data.success && data.data) {
        this.metrics = data.data;
        this.notify('METRICS_UPDATED', this.metrics);
      }
    } catch (err) {
      console.warn('Metrics fetch:', err);
    }
  }

  // --- SAREE CATALOG CRUD ---
  async addProduct(productData) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch('/api/sarees', {
        method: 'POST',
        headers,
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        this.products.unshift(data.data);
        this.saveProducts();
        this.fetchMetrics();
        this.notify('PRODUCTS_UPDATED', this.products);
        this.showToast('Saree published successfully to live catalog!', 'success');
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to create saree.');
      }
    } catch (err) {
      // Optimistic local update fallback
      const newSaree = {
        id: `saree-${Date.now()}`,
        sku: productData.sku || `LV-WEAVE-${Math.floor(100 + Math.random() * 900)}`,
        title: productData.title,
        price: parseFloat(productData.price),
        fabric: productData.fabric,
        weave_type: productData.weave_type,
        primary_color: productData.primary_color,
        stock_quantity: parseInt(productData.stock_quantity || 5, 10),
        reorder_level: 2,
        images: Array.isArray(productData.images) ? productData.images : [productData.image_url],
        description: productData.description,
        is_active: true
      };
      this.products.unshift(newSaree);
      this.saveProducts();
      this.notify('PRODUCTS_UPDATED', this.products);
      return newSaree;
    }
  }

  async updateProduct(id, updates) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch(`/api/sarees/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success && data.data) {
        const idx = this.products.findIndex(p => p.id === id);
        if (idx !== -1) this.products[idx] = data.data;
        this.saveProducts();
        this.fetchMetrics();
        this.notify('PRODUCTS_UPDATED', this.products);
        this.showToast('Saree details updated.', 'success');
        return data.data;
      }
    } catch (err) {
      const idx = this.products.findIndex(p => p.id === id);
      if (idx !== -1) {
        this.products[idx] = { ...this.products[idx], ...updates };
        this.saveProducts();
        this.notify('PRODUCTS_UPDATED', this.products);
      }
    }
  }

  async deleteProduct(id) {
    try {
      const headers = {};
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch(`/api/sarees/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (data.success) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
        this.fetchMetrics();
        this.notify('PRODUCTS_UPDATED', this.products);
        this.showToast('Saree removed from catalog.', 'info');
        return true;
      }
    } catch (err) {
      this.products = this.products.filter(p => p.id !== id);
      this.saveProducts();
      this.notify('PRODUCTS_UPDATED', this.products);
      return true;
    }
  }

  async updateStock(id, newStock) {
    const qty = Math.max(0, parseInt(newStock, 10));
    return this.updateProduct(id, { stock_quantity: qty });
  }

  // --- PINCODE & COD CHECKER ---
  async checkPincode(pin) {
    this.isCheckingPincode = true;
    try {
      const res = await fetch(`/api/pincode/check/${pin}`);
      const data = await res.json();
      this.pincodeResult = data.data;
      this.isCheckingPincode = false;
      this.notify('PINCODE_CHECKED', this.pincodeResult);
      return this.pincodeResult;
    } catch (err) {
      this.isCheckingPincode = false;
      const fallback = {
        valid: /^[1-9][0-9]{5}$/.test(String(pin).trim()),
        pincode: pin,
        serviceable: true,
        cod_available: true,
        estimated_days: 3,
        dispatch_hub: 'Atelier Central Hub',
        message: 'PIN Code is serviceable with Cash on Delivery (COD) & Free Express Shipping.'
      };
      this.pincodeResult = fallback;
      this.notify('PINCODE_CHECKED', fallback);
      return fallback;
    }
  }

  // --- CART MANAGEMENT ---
  addToCart(productId, quantity = 1, options = {}) {
    const product = this.getProductById(productId);
    if (!product) return;

    if (product.stock_quantity <= 0) {
      this.showToast(`Sorry, "${product.title}" is currently out of stock.`, 'error');
      return;
    }

    const blouseOption = options.blouseOption || 'unstitched';
    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.blouseOption === blouseOption
    );

    if (existingIndex > -1) {
      const currentQty = this.cart[existingIndex].quantity;
      if (currentQty + quantity > product.stock_quantity) {
        this.showToast(`Cannot add more than ${product.stock_quantity} available units.`, 'warning');
        return;
      }
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        quantity: Math.min(quantity, product.stock_quantity),
        blouseOption,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    this.showToast(`Added "${product.title}" to your Shopping Bag.`, 'success');
    this.notify('CART_UPDATED', this.cart);
  }

  updateCartQuantity(productId, quantity, blouseOption = 'unstitched') {
    const product = this.getProductById(productId);
    const itemIndex = this.cart.findIndex(
      item => item.id === productId && item.blouseOption === blouseOption
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.cart.splice(itemIndex, 1);
      } else {
        const maxStock = product ? product.stock_quantity : 99;
        this.cart[itemIndex].quantity = Math.min(quantity, maxStock);
      }
      this.saveCart();
      this.notify('CART_UPDATED', this.cart);
    }
  }

  removeFromCart(productId, blouseOption = 'unstitched') {
    this.cart = this.cart.filter(
      item => !(item.id === productId && item.blouseOption === blouseOption)
    );
    this.saveCart();
    this.notify('CART_UPDATED', this.cart);
  }

  clearCart() {
    this.cart = [];
    this.promo = null;
    this.saveCart();
    this.notify('CART_UPDATED', this.cart);
  }

  // --- WISHLIST MANAGEMENT ---
  async toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed saree from your wishlist.', 'info');
    } else {
      this.wishlist.push(productId);
      this.showToast('Added saree to your private bridal wishlist.', 'success');
    }
    this.saveWishlist();

    // Sync with Firebase user document in backend if logged in
    if (this.currentUser?.uid) {
      try {
        await fetch(`/api/users/${this.currentUser.uid}/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist_items: this.wishlist })
        });
      } catch (err) {
        console.warn('Wishlist sync:', err);
      }
    }

    this.notify('WISHLIST_UPDATED', this.wishlist);
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // --- PROMO CODES ---
  applyPromo(code) {
    if (!code) return { success: false, message: 'Please enter a coupon code' };
    const cleanCode = code.toUpperCase().trim();
    if (PROMO_CODES[cleanCode]) {
      this.promo = {
        code: cleanCode,
        ...PROMO_CODES[cleanCode]
      };
      this.notify('CART_UPDATED', this.cart);
      this.showToast(`Promo ${cleanCode} applied!`, 'success');
      return { success: true, message: `Applied ${cleanCode} successfully!` };
    }
    this.showToast('Invalid coupon code.', 'error');
    return { success: false, message: 'Invalid coupon code. Try HERITAGE10 or ROYAL20' };
  }

  removePromo() {
    this.promo = null;
    this.notify('CART_UPDATED', this.cart);
  }

  // --- CHECKOUT & ORDER PLACEMENT ---
  async placeOrder(orderData) {
    const cartItems = this.getCartDetailed();
    if (cartItems.length === 0) {
      throw new Error('Your shopping cart is empty.');
    }

    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    const total = this.getCartTotal();

    const orderPayload = {
      customer_uid: this.currentUser?.uid || 'guest-patron',
      customer_name: orderData.shippingAddress.name || this.currentUser?.full_name || 'Valued Patron',
      customer_email: orderData.shippingAddress.email || this.currentUser?.email || 'patron@laxmivastaraa.com',
      customer_phone: orderData.shippingAddress.phone || this.currentUser?.phone_number || '+91 98290 11223',
      shipping_address: orderData.shippingAddress.address || this.currentUser?.shipping_address?.street || 'Heritage Boulevard',
      city: orderData.shippingAddress.city || this.currentUser?.shipping_address?.city || 'Jaipur',
      state: orderData.shippingAddress.state || this.currentUser?.shipping_address?.state || 'Rajasthan',
      pincode: orderData.shippingAddress.pin || this.currentUser?.shipping_address?.postal_code || '302001',
      payment_method: orderData.paymentMethod || 'Online Payment',
      discount,
      items: cartItems.map(item => ({
        saree_id: item.product.id,
        quantity: item.quantity,
        blouse_option: item.blouseOption
      }))
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        this.lastPlacedOrder = data.data;
        this.orders.unshift(data.data);
        this.clearCart();
        this.fetchProducts(); // Refresh stocks
        this.fetchMetrics();
        this.notify('ORDER_PLACED', this.lastPlacedOrder);
        this.showToast('Order confirmed! Heritage heirloom is being prepared.', 'success');
        return this.lastPlacedOrder;
      } else {
        throw new Error(data.error || 'Failed to process order.');
      }
    } catch (err) {
      // Optimistic local placement fallback
      const fallbackOrder = {
        order_id: `ord-${Date.now()}`,
        order_number: `LV-2026-${String(this.orders.length + 1).padStart(3, '0')}`,
        customer_uid: this.currentUser?.uid || 'guest-patron',
        customer_name: orderPayload.customer_name,
        customer_email: orderPayload.customer_email,
        customer_phone: orderPayload.customer_phone,
        shipping_address: orderPayload.shipping_address,
        city: orderPayload.city,
        state: orderPayload.state,
        pincode: orderPayload.pincode,
        payment_method: orderPayload.payment_method,
        payment_status: orderPayload.payment_method === 'COD' ? 'Pending' : 'Paid',
        order_status: 'Placed',
        subtotal,
        discount,
        shipping_fee: 0,
        total_amount: total,
        created_at: new Date().toISOString(),
        items: cartItems.map(item => ({
          saree_id: item.product.id,
          saree_title: item.product.title,
          quantity: item.quantity,
          unit_price: item.product.price,
          blouse_option: item.blouseOption,
          image_url: item.product.images?.[0]?.image_url || item.product.images?.[0] || ''
        }))
      };

      this.lastPlacedOrder = fallbackOrder;
      this.orders.unshift(fallbackOrder);
      this.clearCart();
      this.notify('ORDER_PLACED', fallbackOrder);
      return fallbackOrder;
    }
  }

  async updateOrderStatus(orderId, statusData) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (this.adminToken) headers['Authorization'] = `Bearer ${this.adminToken}`;
      if (this.currentUser?.uid) headers['x-user-uid'] = this.currentUser.uid;

      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(statusData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        const idx = this.orders.findIndex(o => o.order_id === orderId || o.order_number === orderId);
        if (idx !== -1) this.orders[idx] = data.data;
        this.saveOrders();
        this.fetchMetrics();
        this.notify('ORDERS_UPDATED', this.orders);
        this.showToast('Order status updated.', 'success');
        return data.data;
      }
    } catch (err) {
      const idx = this.orders.findIndex(o => o.order_id === orderId);
      if (idx !== -1) {
        this.orders[idx] = { ...this.orders[idx], ...statusData };
        this.saveOrders();
        this.notify('ORDERS_UPDATED', this.orders);
      }
    }
  }

  // --- ADMIN LEGACY LOGIN / LOGOUT ---
  async adminLogin(username, password) {
    return this.loginWithEmail(username === 'admin' ? 'admin@laxmivastaraa.com' : username, password);
  }

  adminLogout() {
    this.logout();
  }

  isAdminAuthenticated() {
    return this.isAdmin();
  }

  // --- HELPERS & CALCULATIONS ---
  getProductById(id) {
    return this.products.find(p => p.id === id || p.slug === id || p.sku === id) || null;
  }

  getProducts() {
    return this.products;
  }

  getOrders() {
    return this.orders;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  getCartDetailed() {
    return this.cart
      .map(item => {
        const product = this.getProductById(item.id);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);
  }

  getCartSubtotal() {
    return this.getCartDetailed().reduce((total, item) => {
      const basePrice = item.product.price * item.quantity;
      const customization = item.blouseOption === 'custom-tailored' ? 2500 * item.quantity : 0;
      return total + basePrice + customization;
    }, 0);
  }

  getCartDiscount() {
    if (!this.promo) return 0;
    const subtotal = this.getCartSubtotal();
    if (this.promo.type === 'percent') {
      return Math.round((subtotal * this.promo.value) / 100);
    }
    return Math.min(subtotal, this.promo.value);
  }

  getCartTotal() {
    return Math.max(0, this.getCartSubtotal() - this.getCartDiscount());
  }

  getCartTotals() {
    const items = this.getCartDetailed();
    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    const grandTotal = this.getCartTotal();
    const shipping = 0;
    const tax = Math.round(grandTotal * 0.05);

    return {
      items,
      subtotal,
      discount,
      shipping,
      tax,
      grandTotal,
      promoInfo: this.promo
    };
  }

  isWishlisted(productId) {
    return this.isInWishlist(productId);
  }

  getWishlist() {
    return this.wishlist;
  }

  getFilteredProducts() {
    return this.products.filter(product => {
      // Category / Fabric
      if (this.selectedCategory !== 'all') {
        const matchCategory = product.fabric.toLowerCase() === this.selectedCategory.toLowerCase() ||
                              product.occasion.toLowerCase() === this.selectedCategory.toLowerCase();
        if (!matchCategory) return false;
      }

      if (this.activeFabric !== 'all') {
        if (product.fabric.toLowerCase() !== this.activeFabric.toLowerCase()) return false;
      }

      if (this.activeWeaveType !== 'all') {
        if (!product.weave_type.toLowerCase().includes(this.activeWeaveType.toLowerCase())) return false;
      }

      if (this.activeColor !== 'all') {
        if (product.primary_color.toLowerCase() !== this.activeColor.toLowerCase()) return false;
      }

      if (this.activeOccasion !== 'all') {
        if (product.occasion.toLowerCase() !== this.activeOccasion.toLowerCase()) return false;
      }

      if (product.price > this.priceFilter) return false;

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase().trim();
        const matches = product.title.toLowerCase().includes(q) ||
                        product.sku.toLowerCase().includes(q) ||
                        product.fabric.toLowerCase().includes(q) ||
                        product.primary_color.toLowerCase().includes(q) ||
                        product.work_type.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'price-low') return a.price - b.price;
      if (this.sortBy === 'price-high') return b.price - a.price;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      if (this.sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }

  // Local Storage Synchronizers
  saveProducts() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lv_products_v2', JSON.stringify(this.products));
      }
    } catch (e) {}
  }

  saveCart() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lv_cart_v2', JSON.stringify(this.cart));
      }
    } catch (e) {}
  }

  saveWishlist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lv_wishlist_v2', JSON.stringify(this.wishlist));
      }
    } catch (e) {}
  }

  saveOrders() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lv_orders_v2', JSON.stringify(this.orders));
      }
    } catch (e) {}
  }
}

export const store = new Store();
