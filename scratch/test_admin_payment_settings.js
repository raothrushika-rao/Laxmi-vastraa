import http from 'http';

const BASE_URL = 'http://localhost:3000';
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function makeRequest(path, options = {}, body = null) {
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTest() {
  console.log('\n👑 =========================================================================');
  console.log('👑  ADMIN PAYMENT SETTINGS & ORDER MANAGEMENT TEST SUITE');
  console.log('👑 =========================================================================\n');

  try {
    // 1. GET Payment Settings (Admin)
    const settingsRes = await makeRequest('/api/admin/payment-settings', {
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    assert(settingsRes.status === 200, 'GET /api/admin/payment-settings returns 200 OK');
    assert(settingsRes.data.success === true, 'Returns payment settings');
    assert(typeof settingsRes.data.data.admin_upi_id === 'string', 'Returns Admin UPI VPA');
    assert(typeof settingsRes.data.data.settlement_bank.account_number === 'string', 'Returns Bank Account Details');

    // 2. Non-Admin 403 Forbidden check
    const unauthorizedRes = await makeRequest('/api/admin/payment-settings', {
      headers: { 'x-user-uid': 'customer-uid-123' }
    });
    assert(unauthorizedRes.status === 403, 'Customer denied access to payment settings (403 Forbidden)');

    // 3. Update Payment Settings
    const updateRes = await makeRequest('/api/admin/payment-settings', {
      method: 'POST',
      headers: { 'x-user-uid': 'admin-uid-001' }
    }, {
      admin_upi_id: 'laxmivastraa.royal@okhdfcbank',
      cod_enabled: true,
      max_cod_amount: 150000,
      settlement_bank: {
        account_holder: 'Laxmi Vastaraa Royal Atelier',
        bank_name: 'HDFC Bank Ltd',
        account_number: '50200099887766',
        ifsc_code: 'HDFC0000123'
      }
    });
    assert(updateRes.status === 200, 'POST /api/admin/payment-settings returns 200 OK');
    assert(updateRes.data.data.admin_upi_id === 'laxmivastraa.royal@okhdfcbank', 'Admin UPI updated');
    assert(updateRes.data.data.settlement_bank.account_number === '50200099887766', 'Bank account updated');

    // 4. Update Order Payment Status
    const ordersRes = await makeRequest('/api/orders', {
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    if (ordersRes.data.data.length > 0) {
      const order = ordersRes.data.data[0];
      const payStatusRes = await makeRequest(`/api/orders/${order.order_id}/payment-status`, {
        method: 'PUT',
        headers: { 'x-user-uid': 'admin-uid-001' }
      }, { payment_status: 'Paid' });
      assert(payStatusRes.status === 200, `PUT /api/orders/${order.order_id}/payment-status returns 200 OK`);
      assert(payStatusRes.data.data.payment_status === 'Paid', 'Order payment status updated to Paid');
    }

  } catch (e) {
    console.error('Error:', e);
    failed++;
  }

  console.log('\n=========================================================================');
  console.log(`🏁 ADMIN SETTINGS RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log('=========================================================================\n');
}

runTest();
