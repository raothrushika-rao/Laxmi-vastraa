// Comprehensive End-to-End Test Suite for Laxmi Vastaraa
// Covers Storefront, Catalog, Cart, Checkout, Pincode API, Firebase User Management, and Role-Based Security

import http from 'http';

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    testsFailed++;
  }
}

async function runTestSuite() {
  console.log('\n🏛️ =========================================================================');
  console.log('🏛️  LAXMI VASTARAA — LUXURY E-COMMERCE & FIREBASE AUTH AUTOMATED TEST SUITE');
  console.log('🏛️ =========================================================================\n');

  try {
    // ----------------------------------------------------
    // TEST GROUP 1: CATALOG & STOREFRONT REST APIS
    // ----------------------------------------------------
    console.log('📦 TEST GROUP 1: Saree Catalog & Storefront Queries');
    
    // Test 1: Fetch all sarees
    const allSarees = await makeRequest('/api/sarees');
    assert(allSarees.status === 200, 'GET /api/sarees returns 200 OK');
    assert(Array.isArray(allSarees.data.data), 'GET /api/sarees returns array of masterpieces');
    assert(allSarees.data.data.length >= 8, `Catalog contains ${allSarees.data.data.length} saree heirlooms`);

    // Test 2: Filter by fabric Banarasi
    const banarasiSarees = await makeRequest('/api/sarees?fabric=Banarasi');
    assert(banarasiSarees.status === 200, 'GET /api/sarees?fabric=Banarasi returns 200 OK');
    assert(banarasiSarees.data.data.every(s => s.fabric.toLowerCase() === 'banarasi'), 'All returned items have Banarasi fabric');

    // Test 3: Filter by occasion Bridal
    const bridalSarees = await makeRequest('/api/sarees?occasion=Bridal');
    assert(bridalSarees.status === 200, 'GET /api/sarees?occasion=Bridal returns 200 OK');
    assert(bridalSarees.data.data.every(s => s.occasion.toLowerCase() === 'bridal'), 'All returned items match Bridal occasion');

    // Test 4: Get Single Saree Details
    const singleSaree = await makeRequest('/api/sarees/saree-001');
    assert(singleSaree.status === 200, 'GET /api/sarees/saree-001 returns 200 OK');
    assert(singleSaree.data.data.sku === 'LV-BAN-001', 'Saree-001 has expected SKU (LV-BAN-001)');
    assert(singleSaree.data.data.price === 48500, 'Saree-001 has price ₹48,500');

    // Test 5: Query non-existent saree
    const missingSaree = await makeRequest('/api/sarees/saree-invalid-999');
    assert(missingSaree.status === 404, 'GET invalid saree ID returns 404 Not Found');

    // ----------------------------------------------------
    // TEST GROUP 2: PINCODE & COD VERIFICATION API
    // ----------------------------------------------------
    console.log('\n📍 TEST GROUP 2: Pincode Logistics & COD Verification');

    // Test 6: Valid Jaipur PIN code
    const validPin = await makeRequest('/api/pincode/check/302001');
    assert(validPin.status === 200, 'GET /api/pincode/check/302001 returns 200 OK');
    assert(validPin.data.data.serviceable === true, 'Pincode 302001 is serviceable');
    assert(validPin.data.data.cod_available === true, 'Cash on Delivery (COD) is available');

    // Test 7: Invalid PIN format
    const invalidPin = await makeRequest('/api/pincode/check/123');
    assert(invalidPin.status === 200, 'GET /api/pincode/check/123 returns 200 OK');
    assert(invalidPin.data.data.valid === false, 'Invalid format 123 marked as valid: false');

    // ----------------------------------------------------
    // TEST GROUP 3: FIREBASE AUTH & USER MANAGEMENT REST APIS
    // ----------------------------------------------------
    console.log('\n👑 TEST GROUP 3: Firebase User Profiles & Role-Based Access Control');

    // Test 8: Sync new customer user profile
    const testUid = `usr-test-${Date.now()}`;
    const testEmail = `patron.test.${Date.now()}@heritage.in`;
    const syncRes = await makeRequest('/api/auth/sync-user', { method: 'POST' }, {
      uid: testUid,
      email: testEmail,
      full_name: 'Princess Gayatri of Jaipur',
      phone_number: '+91 98111 22334',
      shipping_address: {
        street: 'Palace Gardens, C-Scheme',
        city: 'Jaipur',
        state: 'Rajasthan',
        postal_code: '302001'
      },
      wishlist_items: ['saree-001', 'saree-003']
    });
    assert(syncRes.status === 200, 'POST /api/auth/sync-user returns 200 OK');
    assert(syncRes.data.data.uid === testUid, 'User UID correctly synced');
    assert(syncRes.data.data.role === 'customer', 'Default role assigned is "customer"');

    // Test 9: Get user profile by UID
    const profileRes = await makeRequest(`/api/users/${testUid}`);
    assert(profileRes.status === 200, `GET /api/users/${testUid} returns 200 OK`);
    assert(profileRes.data.data.full_name === 'Princess Gayatri of Jaipur', 'Profile returns correct full name');
    assert(profileRes.data.data.shipping_address.city === 'Jaipur', 'Profile returns correct shipping city');

    // Test 10: Update user profile
    const updateProfileRes = await makeRequest(`/api/users/${testUid}`, { method: 'PUT' }, {
      phone_number: '+91 99999 88888',
      shipping_address: {
        street: 'Rambagh Palace Estate',
        city: 'Jaipur',
        state: 'Rajasthan',
        postal_code: '302005'
      }
    });
    assert(updateProfileRes.status === 200, 'PUT /api/users/:uid returns 200 OK');
    assert(updateProfileRes.data.data.phone_number === '+91 99999 88888', 'Phone number updated successfully');
    assert(updateProfileRes.data.data.shipping_address.postal_code === '302005', 'Shipping postal code updated');

    // Test 11: Wishlist synchronization
    const wishlistRes = await makeRequest(`/api/users/${testUid}/wishlist`, { method: 'POST' }, {
      wishlist_items: ['saree-001', 'saree-002', 'saree-004']
    });
    assert(wishlistRes.status === 200, 'POST /api/users/:uid/wishlist returns 200 OK');
    assert(wishlistRes.data.data.length === 3, 'User wishlist contains 3 sarees');

    // ----------------------------------------------------
    // TEST GROUP 4: ROLE-BASED ACCESS CONTROL (SECURITY AUDIT)
    // ----------------------------------------------------
    console.log('\n🔒 TEST GROUP 4: Role-Based Access Control Security Audit');

    // Test 12: Customer cannot access Admin Metrics
    const unauthMetrics = await makeRequest('/api/admin/metrics', {
      headers: { 'x-user-uid': testUid } // Customer UID
    });
    assert(unauthMetrics.status === 403, 'Customer UID denied access to /api/admin/metrics (403 Forbidden)');

    // Test 13: Customer cannot delete saree
    const unauthDelete = await makeRequest('/api/sarees/saree-001', {
      method: 'DELETE',
      headers: { 'x-user-uid': testUid }
    });
    assert(unauthDelete.status === 403, 'Customer UID denied deletion of saree (403 Forbidden)');

    // Test 14: Customer cannot create saree
    const unauthCreate = await makeRequest('/api/sarees', {
      method: 'POST',
      headers: { 'x-user-uid': testUid }
    }, {
      title: 'Hacked Saree',
      price: 100
    });
    assert(unauthCreate.status === 403, 'Customer UID denied creation of saree (403 Forbidden)');

    // Test 15: Admin UID allowed access to Admin Metrics
    const adminMetrics = await makeRequest('/api/admin/metrics', {
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    assert(adminMetrics.status === 200, 'Admin UID granted access to /api/admin/metrics (200 OK)');
    assert(typeof adminMetrics.data.data.total_revenue === 'number', 'Metrics returns numeric revenue value');

    // ----------------------------------------------------
    // TEST GROUP 5: ORDERS & INVENTORY INTEGRATION
    // ----------------------------------------------------
    console.log('\n🛍️ TEST GROUP 5: Orders, Checkout & Inventory Deduction');

    // Ensure sufficient stock for test
    await makeRequest('/api/sarees/saree-002', {
      method: 'PUT',
      headers: { 'x-user-uid': 'admin-uid-001' }
    }, { stock_quantity: 5 });

    // Test 16: Check stock before order
    const beforeOrderSaree = await makeRequest('/api/sarees/saree-002');
    const initialStock = beforeOrderSaree.data.data.stock_quantity;

    // Test 17: Place customer order linked to user UID
    const orderPayload = {
      customer_uid: testUid,
      customer_name: 'Princess Gayatri of Jaipur',
      customer_phone: '+91 99999 88888',
      customer_email: 'patron.test@heritage.in',
      shipping_address: 'Rambagh Palace Estate',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302005',
      payment_method: 'Online Payment',
      discount: 5000,
      items: [
        {
          saree_id: 'saree-002',
          quantity: 1,
          blouse_option: 'custom-tailored'
        }
      ]
    };

    const placeOrderRes = await makeRequest('/api/orders', { method: 'POST' }, orderPayload);
    assert(placeOrderRes.status === 201, 'POST /api/orders returns 201 Created');
    assert(placeOrderRes.data.data.order_number.startsWith('LV-2026-'), 'Generated authentic royal order number');
    assert(placeOrderRes.data.data.total_amount === (beforeOrderSaree.data.data.price + 2500 - 5000), 'Total amount calculated correctly');

    // Test 18: Stock deducted atomically
    const afterOrderSaree = await makeRequest('/api/sarees/saree-002');
    assert(afterOrderSaree.data.data.stock_quantity === initialStock - 1, `Stock reduced from ${initialStock} to ${afterOrderSaree.data.data.stock_quantity}`);

    // Test 19: Get Customer Orders by UID
    const userOrdersRes = await makeRequest(`/api/users/${testUid}/orders`);
    assert(userOrdersRes.status === 200, `GET /api/users/${testUid}/orders returns 200 OK`);
    assert(userOrdersRes.data.data.length >= 1, `User has ${userOrdersRes.data.data.length} recorded order(s)`);

    // ----------------------------------------------------
    // TEST GROUP 6: ADMIN CRUD INVENTORY OPERATIONS
    // ----------------------------------------------------
    console.log('\n🎨 TEST GROUP 6: Admin Saree Masterpiece Lifecycle');

    // Test 20: Admin creates new saree
    const newSareePayload = {
      sku: `LV-TES-${Date.now().toString().slice(-4)}`,
      title: 'Automated Test Maharani Shikargah Banarasi Saree',
      fabric: 'Banarasi',
      weave_type: 'Handloom Zari Brocade',
      primary_color: 'Wine',
      price: 68000,
      compare_at_price: 75000,
      stock_quantity: 4,
      reorder_level: 2,
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Exclusive test suite heritage heirloom with gold and silver hunting scene motifs.'
    };

    const createSareeRes = await makeRequest('/api/sarees', {
      method: 'POST',
      headers: { 'x-user-uid': 'admin-uid-001' }
    }, newSareePayload);

    assert(createSareeRes.status === 201, 'POST /api/sarees (Admin) returns 201 Created');
    const createdSareeId = createSareeRes.data.data.id;
    assert(!!createdSareeId, `Created new Saree with ID: ${createdSareeId}`);

    // Test 21: Admin updates saree price and stock
    const updateSareeRes = await makeRequest(`/api/sarees/${createdSareeId}`, {
      method: 'PUT',
      headers: { 'x-user-uid': 'admin-uid-001' }
    }, {
      price: 65000,
      stock_quantity: 6
    });
    assert(updateSareeRes.status === 200, `PUT /api/sarees/${createdSareeId} returns 200 OK`);
    assert(updateSareeRes.data.data.price === 65000, 'Price updated to ₹65,000');
    assert(updateSareeRes.data.data.stock_quantity === 6, 'Stock updated to 6 units');

    // Test 22: Admin deletes test saree
    const deleteSareeRes = await makeRequest(`/api/sarees/${createdSareeId}`, {
      method: 'DELETE',
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    assert(deleteSareeRes.status === 200, `DELETE /api/sarees/${createdSareeId} returns 200 OK`);

    // Verify deletion
    const verifyDeleted = await makeRequest(`/api/sarees/${createdSareeId}`);
    assert(verifyDeleted.status === 404, 'Deleted saree returns 404 Not Found');

    console.log('\n=========================================================================');
    console.log(`🏁 TEST RESULTS: ${testsPassed} PASSED / ${testsFailed} FAILED`);
    console.log('=========================================================================\n');

    if (testsFailed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('💥 Test suite execution error:', err);
    process.exit(1);
  }
}

runTestSuite();
