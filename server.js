// Laxmi Vastaraa - Full-Stack Express REST API Server with Firebase User Management & RBAC
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(__dirname));

// Active Tokens / Auth Session Registry
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_PASSWORD || 'laxmi2026'
};
const activeTokens = new Set(['lv-admin-token-2026']);

// Role-based Access Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.replace('Bearer ', '') : req.query.token;
  const userUid = req.headers['x-user-uid'] || req.query.uid;

  if (token && activeTokens.has(token)) {
    return next();
  }

  if (userUid) {
    const user = db.getUserByUid(userUid);
    if (user && user.role === 'admin') {
      return next();
    }
  }

  return res.status(403).json({ 
    success: false, 
    error: 'Access Denied: Administrator privileges required.' 
  });
}

// ----------------------------------------------------
// 1. FIREBASE AUTH & USER PROFILE API
// ----------------------------------------------------

// POST /api/auth/sync-user - Syncs user profile upon Firebase Sign-In / Sign-Up
app.post('/api/auth/sync-user', (req, res) => {
  try {
    const { uid, email, full_name, displayName, phone_number, shipping_address, wishlist_items } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ success: false, error: 'Firebase UID and Email are required for profile sync.' });
    }

    const user = db.createUser({
      uid,
      email,
      full_name: full_name || displayName,
      phone_number,
      shipping_address,
      wishlist_items
    });

    if (user.role === 'admin') {
      activeTokens.add(`token-${uid}`);
    }

    res.json({ 
      success: true, 
      message: 'User profile synced successfully.', 
      data: user 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/:uid - Get profile by UID
app.get('/api/users/:uid', (req, res) => {
  try {
    const user = db.getUserByUid(req.params.uid);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found.' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/users/:uid - Update profile details
app.put('/api/users/:uid', (req, res) => {
  try {
    const updated = db.updateUserProfile(req.params.uid, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'User profile not found for update.' });
    }
    res.json({ success: true, message: 'Profile updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/:uid/wishlist - Sync user wishlist across devices
app.post('/api/users/:uid/wishlist', (req, res) => {
  try {
    const { wishlist_items } = req.body;
    const items = db.syncWishlist(req.params.uid, wishlist_items);
    if (!items) {
      return res.status(404).json({ success: false, error: 'User profile not found.' });
    }
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/:uid/orders - Get order history for user
app.get('/api/users/:uid/orders', (req, res) => {
  try {
    const user = db.getUserByUid(req.params.uid);
    const orders = db.getUserOrders(req.params.uid || (user ? user.email : ''));
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// 2. SAREES API (CATALOG & ADMIN CRUD)
// ----------------------------------------------------
// GET /api/sarees - List and filter sarees (Public)
app.get('/api/sarees', (req, res) => {
  try {
    const sarees = db.getAllSarees({
      fabric: req.query.fabric,
      weave_type: req.query.weave_type,
      primary_color: req.query.primary_color,
      occasion: req.query.occasion,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      search: req.query.search,
      sort: req.query.sort,
      includeInactive: req.query.includeInactive === 'true'
    });
    res.json({ success: true, count: sarees.length, data: sarees });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/sarees/:id - Saree details by ID or Slug (Public)
app.get('/api/sarees/:id', (req, res) => {
  try {
    const saree = db.getSareeById(req.params.id);
    if (!saree) {
      return res.status(404).json({ success: false, error: 'Saree masterpiece not found.' });
    }
    res.json({ success: true, data: saree });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/sarees - Add new saree (Protected Admin)
app.post('/api/sarees', requireAdmin, (req, res) => {
  try {
    if (!req.body.title || !req.body.price) {
      return res.status(400).json({ success: false, error: 'Title and Price are required fields.' });
    }
    const newSaree = db.createSaree(req.body);
    res.status(201).json({ success: true, message: 'Saree published successfully to live catalog.', data: newSaree });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/sarees/:id - Update existing saree (Protected Admin)
app.put('/api/sarees/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateSaree(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Saree not found for update.' });
    }
    res.json({ success: true, message: 'Saree updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/sarees/:id - Delete saree (Protected Admin)
app.delete('/api/sarees/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteSaree(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Saree not found for deletion.' });
    }
    res.json({ success: true, message: 'Saree deleted from catalog.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// 3. ORDERS API
// ----------------------------------------------------
// POST /api/orders - Place customer order (atomic stock deduction)
app.post('/api/orders', (req, res) => {
  try {
    const { customer_name, customer_phone, items } = req.body;
    if (!customer_name || !customer_phone || !items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Missing mandatory customer information or order items.' });
    }

    const order = db.createOrder(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Royal order placed successfully! Silk mark certification and packaging initiated.', 
      data: order 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/orders - List all customer orders (Protected Admin)
app.get('/api/orders', requireAdmin, (req, res) => {
  try {
    const orders = db.getAllOrders({
      payment_method: req.query.payment_method,
      order_status: req.query.order_status
    });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id - Get specific order details
app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/orders/:id/status - Update shipping or payment status (Protected Admin)
app.patch('/api/orders/:id/status', requireAdmin, (req, res) => {
  try {
    const { order_status, payment_status } = req.body;
    const updated = db.updateOrderStatus(req.params.id, { order_status, payment_status });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }
    res.json({ success: true, message: 'Order status updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// 4. ADMIN AUTH & METRICS
// ----------------------------------------------------
// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = `lv-admin-${Date.now()}`;
    activeTokens.add(token);
    return res.json({ 
      success: true, 
      token, 
      user: { 
        uid: 'admin-uid-001',
        username: 'admin', 
        full_name: 'Laxmi Vastaraa Royal Curator',
        email: 'admin@laxmivastaraa.com',
        role: 'admin', 
        storeName: 'Laxmi Vastaraa' 
      },
      message: 'Authenticated as Laxmi Vastaraa Administrator.' 
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid administrator credentials.' });
});

// GET /api/admin/metrics (Protected Admin)
app.get('/api/admin/metrics', requireAdmin, (req, res) => {
  try {
    const metrics = db.getMetrics();
    res.json({ success: true, data: metrics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// 5. PINCODE & COD CHECKER API
// ----------------------------------------------------
app.get('/api/pincode/check/:pin', (req, res) => {
  try {
    const result = db.checkPincode(req.params.pin);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fallback to index.html for client-side hash routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Laxmi Vastaraa Luxury E-Commerce Suite running on http://localhost:${PORT}`);
});
