// Laxmi Vastraa - Comprehensive E2E System Trial Runner
import http from 'http';

const BASE_URL = 'http://localhost:3000';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = options.headers || {};
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return { status: res.status, ok: res.ok, headers: res.headers, data };
}

async function runFullTrial() {
  console.log('🏛️ =========================================================================');
  console.log('🏛️  LAXMI VASTARAA — COMPREHENSIVE END-TO-END FINAL TRIAL RUNNER');
  console.log('🏛️ =========================================================================\n');

  // -------------------------------------------------------------
  // STAGE 1: Static Assets & Web Architecture
  // -------------------------------------------------------------
  console.log('🌐 STAGE 1: Static Assets & Web Architecture');
  const homeRes = await request('/');
  assert(homeRes.status === 200, 'Frontend root index.html returns 200 OK');
  assert(typeof homeRes.data === 'string' && homeRes.data.includes('Laxmi Vastraa'), 'HTML contains Laxmi Vastraa title & brand identity');
  assert(homeRes.data.includes('hero-silk-canvas') || homeRes.data.includes('app.js'), 'HTML contains app script & silk canvas anchor');

  const cssRes = await request('/css/styles.css');
  assert(cssRes.status === 200, 'Bespoke CSS bundle (/css/styles.css) loaded successfully');

  const jsAppRes = await request('/js/app.js');
  assert(jsAppRes.status === 200, 'ES Module /js/app.js loaded successfully');

  const jsPagesRes = await request('/js/pages.js');
  assert(jsPagesRes.status === 200, 'ES Module /js/pages.js loaded successfully');

  const jsComponentsRes = await request('/js/components.js');
  assert(jsComponentsRes.status === 200, 'ES Module /js/components.js loaded successfully');

  const jsShaderRes = await request('/js/shader.js');
  assert(jsShaderRes.status === 200, 'ES Module /js/shader.js (WebGL Silk Simulation) loaded successfully');

  const jsRzpRes = await request('/js/razorpay-client.js');
  assert(jsRzpRes.status === 200, 'ES Module /js/razorpay-client.js loaded successfully');

  // -------------------------------------------------------------
  // STAGE 2: Saree Catalog & Multi-Dimensional Filters
  // -------------------------------------------------------------
  console.log('\n📦 STAGE 2: Saree Heirloom Catalog & Filtering Engine');
  const allSareesRes = await request('/api/sarees');
  assert(allSareesRes.status === 200, 'GET /api/sarees returns 200 OK');
  assert(allSareesRes.data.success === true, 'API payload indicates success');
  assert(Array.isArray(allSareesRes.data.data), 'Catalog data is an array');
  const catalog = allSareesRes.data.data;
  assert(catalog.length >= 8, `Catalog loaded ${catalog.length} exquisite sarees`);

  // Fabric Filter Test
  const banarasiRes = await request('/api/sarees?fabric=Banarasi');
  assert(banarasiRes.data.data.every(s => s.fabric.toLowerCase().includes('banarasi')), 'Fabric filter returns only Banarasi sarees');

  const kanjeevaramRes = await request('/api/sarees?fabric=Kanjeevaram');
  assert(kanjeevaramRes.data.data.every(s => s.fabric.toLowerCase().includes('kanjeevaram') || s.title.toLowerCase().includes('kanchipuram')), 'Fabric filter returns Kanjeevaram sarees');

  // Occasion Filter Test
  const bridalRes = await request('/api/sarees?occasion=Bridal');
  assert(bridalRes.data.data.length > 0, 'Occasion filter matches Bridal collection');

  // Price Sort Test
  const sortAscRes = await request('/api/sarees?sort=price-asc');
  const pricesAsc = sortAscRes.data.data.map(s => s.price);
  let isSortedAsc = true;
  for (let i = 1; i < pricesAsc.length; i++) {
    if (pricesAsc[i] < pricesAsc[i - 1]) isSortedAsc = false;
  }
  assert(isSortedAsc, 'Sort by Price: Low to High works accurately');

  // Saree Detail by ID
  const singleSareeRes = await request('/api/sarees/saree-001');
  assert(singleSareeRes.status === 200, 'GET /api/sarees/saree-001 returns 200 OK');
  assert(singleSareeRes.data.data.title.includes('Banarasi'), 'Saree detail contains certified title');
  assert(singleSareeRes.data.data.fabric === 'Banarasi', 'Saree fabric verified as Banarasi');
  assert(singleSareeRes.data.data.stock_quantity > 0, `Saree has active inventory: ${singleSareeRes.data.data.stock_quantity}`);

  // -------------------------------------------------------------
  // STAGE 3: Logistics & Pincode Serviceability
  // -------------------------------------------------------------
  console.log('\n📍 STAGE 3: Pincode Logistics & COD Serviceability Engine');
  const pinJaipur = await request('/api/pincode/check/302001');
  assert(pinJaipur.data.data.valid === true, 'Pincode 302001 (Jaipur) is valid and serviceable');
  assert(pinJaipur.data.data.cod_available === true, 'COD is available for Jaipur royal delivery');
  assert(pinJaipur.data.data.estimated_days <= 5, `Estimated delivery within ${pinJaipur.data.data.estimated_days} days (${pinJaipur.data.data.dispatch_hub})`);

  const pinBangalore = await request('/api/pincode/check/560001');
  assert(pinBangalore.data.data.valid === true, 'Pincode 560001 (Bangalore) is serviceable');

  const invalidPin = await request('/api/pincode/check/123');
  assert(invalidPin.status === 200 && invalidPin.data.data.valid === false, 'Invalid format pincode 123 correctly flagged as non-serviceable');

  // -------------------------------------------------------------
  // STAGE 4: Firebase User Profile & Cloud Wishlist Sync
  // -------------------------------------------------------------
  console.log('\n👑 STAGE 4: Customer Account Sync, Wishlist & Profile Management');
  const testUid = `customer-${Date.now()}`;
  const syncRes = await request('/api/auth/sync-user', {
    method: 'POST',
    body: {
      uid: testUid,
      email: 'maharani.radhika@heritage.in',
      full_name: 'Maharani Radhika Devi',
      phone_number: '+91 9876543210',
      shipping_address: {
        line1: 'The City Palace',
        city: 'Jaipur',
        state: 'Rajasthan',
        postal_code: '302001'
      },
      wishlist_items: ['saree-001', 'saree-002']
    }
  });
  assert(syncRes.status === 200, 'POST /api/auth/sync-user synced user profile');
  assert(syncRes.data.data.role === 'customer', 'Default role assigned is customer');

  // Update Profile
  const updateProfileRes = await request(`/api/users/${testUid}`, {
    method: 'PUT',
    body: {
      phone_number: '+91 9123456789',
      shipping_address: {
        line1: 'Rambagh Palace Estate',
        city: 'Jaipur',
        state: 'Rajasthan',
        postal_code: '302005'
      }
    }
  });
  assert(updateProfileRes.status === 200, 'PUT /api/users/:uid successfully updated address & phone');
  assert(updateProfileRes.data.data.shipping_address.city === 'Jaipur', 'Updated city preserved');

  // Wishlist Sync
  const wishlistRes = await request(`/api/users/${testUid}/wishlist`, {
    method: 'POST',
    body: {
      wishlist_items: ['saree-001', 'saree-002', 'saree-003']
    }
  });
  assert(wishlistRes.status === 200, 'POST /api/users/:uid/wishlist synced 3 items across cloud');
  assert(wishlistRes.data.data.length === 3, 'Cloud wishlist accurately holds 3 sarees');

  // -------------------------------------------------------------
  // STAGE 5: Complete Checkout & Payment Gateway Trials
  // -------------------------------------------------------------
  console.log('\n💳 STAGE 5: Payment Gateway, Razorpay 2-Step & COD Trial');

  // 5.1 Payment Config
  const payConfigRes = await request('/api/payment/config');
  assert(payConfigRes.status === 200, 'GET /api/payment/config returns 200 OK');
  assert(payConfigRes.data.data.currency === 'INR', 'Currency configured to INR');
  assert(Boolean(payConfigRes.data.data.key_id), 'Public Razorpay Key ID exposed');

  // 5.2 Online Payment Flow (2-Step Transaction)
  const draftRes = await request('/api/payment/create-order', {
    method: 'POST',
    body: {
      customer_name: 'Maharani Radhika Devi',
      customer_email: 'maharani.radhika@heritage.in',
      customer_phone: '9876543210',
      shipping_address: {
        address: 'Rambagh Palace Estate',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302005'
      },
      items: [
        {
          saree_id: 'saree-001',
          title: 'Midnight Blue Brocade Banarasi Silk Saree',
          price: 48500,
          quantity: 1,
          blouse_option: 'custom-tailored'
        }
      ]
    }
  });
  assert(draftRes.status === 201, 'POST /api/payment/create-order initialized draft order');
  const onlineOrder = draftRes.data.data;
  assert(Boolean(onlineOrder.gateway_order_id), `Generated Gateway Order ID: ${onlineOrder.gateway_order_id}`);
  assert(onlineOrder.amount === 51000 * 100, `Calculated correct amount in Paise (₹${onlineOrder.total_amount})`);

  // Step 2: Verification
  const verifyRes = await request('/api/payment/verify', {
    method: 'POST',
    body: {
      order_id: onlineOrder.order_id,
      razorpay_order_id: onlineOrder.gateway_order_id,
      razorpay_payment_id: `pay_${Date.now()}`,
      razorpay_signature: 'sig_test_verified_royal_sha256'
    }
  });
  assert(verifyRes.status === 200, 'POST /api/payment/verify verified transaction');
  assert(verifyRes.data.data.payment_status === 'Paid', 'Order payment_status is Paid');
  assert(verifyRes.data.data.order_status === 'Placed', 'Order status is Placed');

  // 5.3 Cash on Delivery (COD) Flow
  const codRes = await request('/api/orders/cod', {
    method: 'POST',
    body: {
      customer_name: 'Princess Gayatri',
      customer_email: 'gayatri@heritage.in',
      customer_phone: '9876500000',
      shipping_address: {
        address: 'City Palace Complex',
        city: 'Udaipur',
        state: 'Rajasthan',
        pincode: '313001'
      },
      items: [
        {
          saree_id: 'saree-002',
          title: 'Crimson & Antique Gold Korvai Kanjeevaram Pattu',
          price: 64000,
          quantity: 1,
          blouse_option: 'unstitched'
        }
      ]
    }
  });
  assert(codRes.status === 201, 'POST /api/orders/cod placed Cash on Delivery order');
  assert(codRes.data.data.payment_status === 'Pending (COD)', 'COD order has payment_status: Pending (COD)');
  assert(codRes.data.data.payment_method.includes('Cash on Delivery'), 'Payment method recorded as COD');

  // -------------------------------------------------------------
  // STAGE 6: Admin Security, Studio CRUD, Metrics & Settings
  // -------------------------------------------------------------
  console.log('\n👑 STAGE 6: Admin Security, Studio CRUD, Live Metrics & Settlement');

  // Admin Login
  const loginRes = await request('/api/admin/login', {
    method: 'POST',
    body: {
      username: 'admin',
      password: 'laxmi2026'
    }
  });
  assert(loginRes.status === 200, 'POST /api/admin/login authenticated successfully');
  const adminToken = loginRes.data.token;
  assert(Boolean(adminToken), 'Issued valid Admin JWT session token');

  const adminHeaders = {
    'Authorization': `Bearer ${adminToken}`
  };

  // RBAC Protection Verification
  const unauthorizedMetrics = await request('/api/admin/metrics');
  assert(unauthorizedMetrics.status === 403, 'Unauthorized access to /api/admin/metrics returns 403 Forbidden');

  // Authorized Metrics
  const authorizedMetrics = await request('/api/admin/metrics', { headers: adminHeaders });
  assert(authorizedMetrics.status === 200, 'Authorized GET /api/admin/metrics returns 200 OK');
  const metrics = authorizedMetrics.data.data;
  assert(typeof metrics.total_revenue === 'number' && metrics.total_revenue > 0, `Live Total Revenue: ₹${metrics.total_revenue.toLocaleString()}`);
  assert(metrics.total_orders_count >= 2, `Total Recorded Orders: ${metrics.total_orders_count}`);
  assert(metrics.total_sarees >= 8, `Active Products: ${metrics.total_sarees}`);

  // Admin Saree Studio (CRUD)
  const newSareePayload = {
    title: 'Imperial Paithani Pure Silk Peacock Heirloom',
    fabric: 'Paithani',
    weave_type: 'Handloom Kadwa Zari',
    primary_color: 'Emerald Green & Royal Gold',
    price: 78000,
    original_price: 95000,
    stock: 5,
    occasion: 'Royal Reception',
    zari_type: 'Pure Gold & Silver Tested Zari',
    pure_silk_mark: 'SILK-MARK-IN-2026-999',
    description: 'Bespoke handwoven Paithani with authentic peacock pallu motifs.',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=80',
    additional_images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1000&auto=format&fit=crop&q=80'
    ]
  };

  const createSareeRes = await request('/api/sarees', {
    method: 'POST',
    headers: adminHeaders,
    body: newSareePayload
  });
  assert(createSareeRes.status === 201, 'POST /api/sarees (Admin Studio) published new saree');
  const createdSareeId = createSareeRes.data.data.id || createSareeRes.data.data.saree_id;
  assert(Boolean(createdSareeId), `Created Saree ID: ${createdSareeId}`);

  // Update Saree
  const updateSareeRes = await request(`/api/sarees/${createdSareeId}`, {
    method: 'PUT',
    headers: adminHeaders,
    body: {
      price: 82000,
      stock_quantity: 4
    }
  });
  assert(updateSareeRes.status === 200, 'PUT /api/sarees/:id updated price to ₹82,000 and stock to 4');

  // Verify updated in catalog
  const checkUpdatedSaree = await request(`/api/sarees/${createdSareeId}`);
  assert(checkUpdatedSaree.data.data.price === 82000, 'Public catalog reflects new price ₹82,000');

  // Delete Saree
  const deleteSareeRes = await request(`/api/sarees/${createdSareeId}`, {
    method: 'DELETE',
    headers: adminHeaders
  });
  assert(deleteSareeRes.status === 200, 'DELETE /api/sarees/:id removed saree from catalog');

  // Admin Payment Settings
  const getPaySettingsRes = await request('/api/admin/payment-settings', { headers: adminHeaders });
  assert(getPaySettingsRes.status === 200, 'GET /api/admin/payment-settings returns 200 OK');
  assert(Boolean(getPaySettingsRes.data.data.admin_upi_id), 'Admin UPI VPA ID is configured');
  assert(Boolean(getPaySettingsRes.data.data.settlement_bank?.account_number), 'Bank NEFT/RTGS details present');

  const updatePaySettingsRes = await request('/api/admin/payment-settings', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      admin_upi_id: 'laxmivastraa@icici',
      settlement_bank: {
        account_holder: 'Laxmi Vastraa Heritage Handlooms LLP',
        bank_name: 'State Bank of India',
        account_number: '309988776655',
        ifsc_code: 'SBIN0001234'
      }
    }
  });
  assert(updatePaySettingsRes.status === 200, 'POST /api/admin/payment-settings updated settlement settings');

  // Admin Order Status Update
  const codOrderId = codRes.data.data.order_id;
  const updateOrderStatusRes = await request(`/api/orders/${codOrderId}/status`, {
    method: 'PATCH',
    headers: adminHeaders,
    body: {
      order_status: 'Silk Inspected & Sealed'
    }
  });
  assert(updateOrderStatusRes.status === 200, 'PATCH /api/orders/:id/status updated status to Silk Inspected & Sealed');

  // Update COD payment to Paid
  const updateCodPayRes = await request(`/api/orders/${codOrderId}/payment-status`, {
    method: 'PUT',
    headers: adminHeaders,
    body: {
      payment_status: 'Paid'
    }
  });
  assert(updateCodPayRes.status === 200, 'PUT /api/orders/:id/payment-status updated COD status to Paid upon delivery');

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log('\n=========================================================================');
  console.log(`🏁 FULL TRIAL COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (${failedTests} FAILED)`);
  console.log('=========================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runFullTrial().catch(err => {
  console.error('Trial Runner Exception:', err);
  process.exit(1);
});
