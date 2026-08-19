// Laxmi Vastaraa - Reactive State Management with Backend REST API & Firebase User Management
import { INITIAL_PRODUCTS, PROMO_CODES } from './data.js';
import { firebaseAuth } from './firebase-config.js';
import { razorpayClient } from './razorpay-client.js';

class Store {
  constructor() {
    this.subscribers = [];
    this.products = [...INITIAL_PRODUCTS];
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

      if (res.user.role === 'admin') {
        this.adminUser = res.user;
        this.adminToken = 'lv-admin-token-2026';
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('lv_admin_auth_v2', JSON.stringify({ token: this.adminToken, user: this.adminUser }));
          }
        } catch (e) {}
        this.fetchPaymentSettings();
        this.fetchMetrics();
        this.fetchOrders();
      }

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
      const promoDef = PROMO_CODES[cleanCode];
      this.promo = {
        code: cleanCode,
        type: promoDef.discountPercent ? 'percent' : 'flat',
        value: promoDef.discountPercent || promoDef.flatDiscount || 0,
        ...promoDef
      };
      this.notify('CART_UPDATED', this.cart);
      this.showToast(`Promo ${cleanCode} applied!`, 'success');
      return { success: true, message: `Applied ${cleanCode} successfully!` };
    }
    this.showToast('Invalid coupon code.', 'error');
    return { success: false, message: 'Invalid coupon code. Try HERITAGE10 or ROYAL20' };
  }

  applyCoupon(code) {
    const res = this.applyPromo(code);
    return res.success;
  }

  removePromo() {
    this.promo = null;
    this.notify('CART_UPDATED', this.cart);
  }

  // --- CHECKOUT & 2-STEP ATOMIC PAYMENT WORKFLOW ---
  async placeOrder(orderData) {
    const cartItems = this.getCartDetailed();
    if (cartItems.length === 0) {
      throw new Error('Your shopping bag is empty.');
    }

    const discount = this.getCartDiscount();
    const isCod = orderData.paymentMethod === 'Cash on Delivery (Insured)' || orderData.paymentMethod === 'COD';

    const orderPayload = {
      customer_uid: this.currentUser?.uid || 'guest-patron',
      customer_name: orderData.shippingAddress.name || this.currentUser?.full_name || 'Valued Patron',
      customer_email: orderData.shippingAddress.email || this.currentUser?.email || 'client@laxmivastraa.com',
      customer_phone: orderData.shippingAddress.phone || this.currentUser?.phone_number || '+91 98290 12345',
      shipping_address: orderData.shippingAddress.address || this.currentUser?.shipping_address?.street || 'Heritage Boulevard',
      city: orderData.shippingAddress.city || this.currentUser?.shipping_address?.city || 'Jaipur',
      state: orderData.shippingAddress.state || this.currentUser?.shipping_address?.state || 'Rajasthan',
      pincode: orderData.shippingAddress.pin || this.currentUser?.shipping_address?.postal_code || '302001',
      payment_method: isCod ? 'Cash on Delivery (Insured)' : 'Online Payment (Razorpay)',
      discount,
      items: cartItems.map(item => ({
        saree_id: item.product.id,
        quantity: item.quantity,
        blouse_option: item.blouseOption
      }))
    };

    // ----------------------------------------------------
    // PATH A: CASH ON DELIVERY (COD)
    // ----------------------------------------------------
    if (isCod) {
      try {
        const res = await fetch('/api/orders/cod', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        const data = await res.json();
        if (data.success && data.data) {
          const placedOrder = data.data;
          this.lastPlacedOrder = placedOrder;
          this.orders.unshift(placedOrder);
          this.clearCart();
          this.fetchProducts();
          this.fetchMetrics();
          this.notify('ORDER_PLACED', placedOrder);
          this.showToast('Cash on Delivery order confirmed! Silk mark packaging initiated.', 'success');
          window.location.hash = `#order-success?id=${placedOrder.order_number}`;
          return placedOrder;
        } else {
          throw new Error(data.error || 'Failed to place COD order.');
        }
      } catch (err) {
        this.showToast(err.message || 'Unable to place COD order.', 'error');
        throw err;
      }
    }

    // ----------------------------------------------------
    // PATH B: ONLINE PAYMENT (RAZORPAY GATEWAY)
    // ----------------------------------------------------
    try {
      // Step 1: Initialize Pre-Order Draft on Server
      const initRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const initData = await initRes.json();

      if (!initData.success || !initData.data) {
        throw new Error(initData.error || 'Failed to initialize payment gateway.');
      }

      const gatewayOrder = initData.data;

      // Step 2: Open Razorpay Gateway Modal
      return new Promise((resolve, reject) => {
        razorpayClient.openCheckout({
          orderData: gatewayOrder,
          onSuccess: async (paymentResponse) => {
            try {
              // Verify Cryptographic Signature on Backend
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  order_id: gatewayOrder.order_id,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success && verifyData.data) {
                const confirmedOrder = verifyData.data;
                this.lastPlacedOrder = confirmedOrder;
                this.orders.unshift(confirmedOrder);
                this.clearCart(); // Cart is cleared ONLY upon successful payment
                this.fetchProducts();
                this.fetchMetrics();
                this.notify('ORDER_PLACED', confirmedOrder);
                this.showToast('Payment successful! Royal heirloom order confirmed.', 'success');
                window.location.hash = `#order-success?id=${confirmedOrder.order_number}`;
                resolve(confirmedOrder);
              } else {
                throw new Error(verifyData.error || 'Payment signature verification failed.');
              }
            } catch (vErr) {
              this.showToast(`Payment Verification: ${vErr.message}`, 'error');
              reject(vErr);
            }
          },
          onFailure: async (failReason) => {
            await fetch('/api/payment/failed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: gatewayOrder.order_id,
                reason: failReason
              })
            }).catch(() => {});

            this.showToast('Payment failed. Your bag is preserved. Please retry or select Cash on Delivery.', 'error');
            reject(new Error(failReason));
          },
          onDismiss: async () => {
            await fetch('/api/payment/failed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: gatewayOrder.order_id,
                reason: 'User closed payment window.'
              })
            }).catch(() => {});

            this.showToast('Payment window closed. Your bag is saved.', 'warning');
            reject(new Error('Payment window closed.'));
          }
        });
      });

    } catch (err) {
      this.showToast(err.message || 'Payment processing error.', 'error');
      throw err;
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
    if (this.promo.type === 'percent' || this.promo.discountPercent) {
      const pct = this.promo.discountPercent || this.promo.value || 0;
      return Math.round((subtotal * pct) / 100);
    }
    const flat = this.promo.flatDiscount || this.promo.value || 0;
    return Math.min(subtotal, flat);
  }

  getDiscountAmount() {
    return this.getCartDiscount();
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

  // --- ADMIN PAYMENT & SETTLEMENT SETTINGS ---
  async fetchPaymentSettings() {
    try {
      const res = await fetch('/api/admin/payment-settings', {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        this.paymentSettings = json.data;
        this.notify('PAYMENT_SETTINGS_UPDATED', this.paymentSettings);
        return this.paymentSettings;
      }
    } catch (err) {
      console.warn('Error fetching payment settings:', err);
    }
    return null;
  }

  async savePaymentSettings(settings) {
    try {
      const res = await fetch('/api/admin/payment-settings', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      const json = await res.json();
      if (json.success) {
        this.paymentSettings = json.data;
        this.showToast('Payment & settlement settings saved successfully.', 'success');
        this.notify('PAYMENT_SETTINGS_UPDATED', this.paymentSettings);
        return { success: true, data: json.data };
      }
      this.showToast(json.error || 'Failed to save payment settings.', 'error');
      return { success: false, error: json.error };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false, error: err.message };
    }
  }

  async updateOrderPaymentStatus(orderId, paymentStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}/payment-status`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ payment_status: paymentStatus })
      });
      const json = await res.json();
      if (json.success) {
        const order = this.orders.find(o => o.order_id === orderId || o.order_number === orderId);
        if (order) {
          order.payment_status = paymentStatus;
          if (paymentStatus === 'Paid' && !order.paid_at) {
            order.paid_at = new Date().toISOString();
          }
        }
        this.saveOrders();
        this.showToast(`Payment status updated to "${paymentStatus}".`, 'success');
        this.notify('ORDERS_UPDATED', this.orders);
        await this.fetchMetrics();
        return { success: true };
      }
      this.showToast(json.error || 'Failed to update payment status.', 'error');
      return { success: false };
    } catch (err) {
      this.showToast(err.message, 'error');
      return { success: false };
    }
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
