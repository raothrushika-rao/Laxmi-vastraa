// Comprehensive Automated Payment Suite for Laxmi Vastaraa (Razorpay, COD, Webhooks, Stock Decrement)
import http from 'http';
import crypto from 'crypto';

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

async function runPaymentSuite() {
  console.log('\n💳 =========================================================================');
  console.log('💳  LAXMI VASTARAA — RAZORPAY GATEWAY & COD PAYMENT AUTOMATED TEST SUITE');
  console.log('💳 =========================================================================\n');

  try {
    // ----------------------------------------------------
    // TEST GROUP 1: PAYMENT GATEWAY CONFIGURATION
    // ----------------------------------------------------
    console.log('⚙️ TEST GROUP 1: Payment Gateway Config & Environment');
    const configRes = await makeRequest('/api/payment/config');
    assert(configRes.status === 200, 'GET /api/payment/config returns 200 OK');
    assert(configRes.data.success === true, 'Payment config endpoint successful');
    assert(typeof configRes.data.data.key_id === 'string', 'Returns public Razorpay Key ID');
    assert(configRes.data.data.currency === 'INR', 'Currency configured to INR');
    assert(configRes.data.data.store_name === 'Laxmi Vastaraa', 'Store branding verified');

    // ----------------------------------------------------
    // TEST GROUP 2: ONLINE PAYMENT 2-STEP ATOMIC FLOW (SUCCESS)
    // ----------------------------------------------------
    console.log('\n⚡ TEST GROUP 2: Online Payment 2-Step Atomic Transaction');

    // Restock Saree-001 to guarantee test units
    await makeRequest('/api/sarees/saree-001', {
      method: 'PUT',
      headers: { 'x-user-uid': 'admin-uid-001' }
    }, { stock_quantity: 10 });

    const sareeBefore = await makeRequest('/api/sarees/saree-001');
    const stockBeforeOnline = sareeBefore.data.data.stock_quantity;

    // Step 1: Pre-Order Draft Creation
    const draftPayload = {
      customer_uid: 'patron-online-test',
      customer_name: 'Maharani Divya of Udaipur',
      customer_email: 'divya@udaipur.heritage.in',
      customer_phone: '+91 98290 88888',
      shipping_address: 'City Palace Lake View Wing',
      city: 'Udaipur',
      state: 'Rajasthan',
      pincode: '313001',
      payment_method: 'Online Payment (Razorpay)',
      discount: 2500,
      items: [
        {
          saree_id: 'saree-001',
          quantity: 2,
          blouse_option: 'custom-tailored'
        }
      ]
    };

    const draftRes = await makeRequest('/api/payment/create-order', { method: 'POST' }, draftPayload);
    assert(draftRes.status === 201, 'POST /api/payment/create-order returns 201 Created');
    assert(draftRes.data.success === true, 'Draft order successfully initialized');
    assert(typeof draftRes.data.data.gateway_order_id === 'string', 'Generated Gateway Order ID');
    assert(draftRes.data.data.amount > 0, 'Calculated amount in Paise');

    const draftOrderData = draftRes.data.data;

    // Verify Stock was NOT decremented during draft stage
    const sareeDuringDraft = await makeRequest('/api/sarees/saree-001');
    assert(sareeDuringDraft.data.data.stock_quantity === stockBeforeOnline, 'Stock remains UNCHANGED during draft stage');

    // Step 2: Verification & Confirmation
    const mockPaymentId = `pay_${Date.now()}`;
    const mockOrderId = draftOrderData.gateway_order_id;
    const mockSignature = `sig_test_${Date.now()}`;

    const verifyRes = await makeRequest('/api/payment/verify', { method: 'POST' }, {
      order_id: draftOrderData.order_id,
      razorpay_order_id: mockOrderId,
      razorpay_payment_id: mockPaymentId,
      razorpay_signature: mockSignature
    });

    assert(verifyRes.status === 200, 'POST /api/payment/verify returns 200 OK');
    assert(verifyRes.data.success === true, 'Payment verified successfully');
    assert(verifyRes.data.data.payment_status === 'Paid', 'Order payment_status is "Paid"');
    assert(verifyRes.data.data.order_status === 'Placed', 'Order order_status is "Placed"');
    assert(verifyRes.data.data.gateway_payment_id === mockPaymentId, 'Recorded Gateway Payment ID');

    // Verify Stock WAS decremented after verification
    const sareeAfterPaid = await makeRequest('/api/sarees/saree-001');
    assert(sareeAfterPaid.data.data.stock_quantity === stockBeforeOnline - 2, 'Stock atomically decremented by 2 units');

    // ----------------------------------------------------
    // TEST GROUP 3: PAYMENT FAILURE & CART PRESERVATION
    // ----------------------------------------------------
    console.log('\n🛡️ TEST GROUP 3: Payment Cancellation & Failure Handling');

    const stockBeforeFail = sareeAfterPaid.data.data.stock_quantity;

    // Create Draft Order to simulate user closing popup
    const failDraftRes = await makeRequest('/api/payment/create-order', { method: 'POST' }, {
      customer_uid: 'patron-fail-test',
      customer_name: 'Princess Ananya',
      customer_email: 'ananya@heritage.in',
      customer_phone: '+91 98111 00000',
      shipping_address: 'Bungalow 7, Malabar Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400006',
      payment_method: 'Online Payment (Razorpay)',
      discount: 0,
      items: [
        {
          saree_id: 'saree-001',
          quantity: 1,
          blouse_option: 'unstitched'
        }
      ]
    });

    const failOrderId = failDraftRes.data.data.order_id;

    // Simulate modal dismissal / failure event
    const failRes = await makeRequest('/api/payment/failed', { method: 'POST' }, {
      order_id: failOrderId,
      reason: 'User dismissed Razorpay checkout window.'
    });

    assert(failRes.status === 200, 'POST /api/payment/failed returns 200 OK');

    // Verify order is marked Failed in DB
    const failedOrderCheck = await makeRequest(`/api/orders/${failOrderId}`);
    assert(failedOrderCheck.data.data.payment_status === 'Failed', 'Order payment_status updated to "Failed"');

    // Verify Stock was NOT decremented
    const sareeAfterFail = await makeRequest('/api/sarees/saree-001');
    assert(sareeAfterFail.data.data.stock_quantity === stockBeforeFail, 'Stock is PRESERVED on payment failure');

    // ----------------------------------------------------
    // TEST GROUP 4: CASH ON DELIVERY (COD) ORDER PLACEMENT
    // ----------------------------------------------------
    console.log('\n📦 TEST GROUP 4: Cash on Delivery (COD) Workflow');

    const stockBeforeCod = sareeAfterFail.data.data.stock_quantity;

    const codPayload = {
      customer_uid: 'patron-cod-test',
      customer_name: 'Rani Priyamvada',
      customer_email: 'priyamvada@jaipur.heritage.in',
      customer_phone: '+91 97777 66666',
      shipping_address: 'Raj Bhavan Estate',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302005',
      payment_method: 'Cash on Delivery (Insured)',
      discount: 1000,
      items: [
        {
          saree_id: 'saree-001',
          quantity: 1,
          blouse_option: 'unstitched'
        }
      ]
    };

    const codRes = await makeRequest('/api/orders/cod', { method: 'POST' }, codPayload);
    assert(codRes.status === 201, 'POST /api/orders/cod returns 201 Created');
    assert(codRes.data.success === true, 'COD order placed successfully');
    assert(codRes.data.data.payment_status === 'Pending (COD)', 'Payment status is "Pending (COD)"');
    assert(codRes.data.data.order_status === 'Placed', 'Order status is "Placed"');

    // Verify Stock decremented for COD
    const sareeAfterCod = await makeRequest('/api/sarees/saree-001');
    assert(sareeAfterCod.data.data.stock_quantity === stockBeforeCod - 1, 'Stock decremented by 1 unit for COD');

    // ----------------------------------------------------
    // TEST GROUP 5: RAZORPAY WEBHOOK PROCESSING
    // ----------------------------------------------------
    console.log('\n🔔 TEST GROUP 5: Webhook Listener & Async Events');

    // Create Draft for Webhook Test
    const webhookDraftRes = await makeRequest('/api/payment/create-order', { method: 'POST' }, {
      customer_uid: 'patron-webhook-test',
      customer_name: 'Begum Noor Jahan',
      customer_email: 'noor@lucknow.heritage.in',
      customer_phone: '+91 96666 55555',
      shipping_address: 'Nawab Haveli, Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001',
      payment_method: 'Online Payment (Razorpay)',
      discount: 0,
      items: [{ saree_id: 'saree-001', quantity: 1 }]
    });

    const webhookDraft = webhookDraftRes.data.data;
    const webhookPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_hook_${Date.now()}`,
            order_id: webhookDraft.gateway_order_id,
            amount: webhookDraft.amount,
            currency: 'INR',
            status: 'captured',
            notes: {
              order_id: webhookDraft.order_id
            }
          }
        }
      }
    };

    const webhookRes = await makeRequest('/api/webhooks/razorpay', { method: 'POST' }, webhookPayload);
    assert(webhookRes.status === 200, 'POST /api/webhooks/razorpay returns 200 OK');
    assert(webhookRes.data.status === 'ok', 'Webhook event processed');

    // Verify order was confirmed via webhook
    const webhookOrderCheck = await makeRequest(`/api/orders/${webhookDraft.order_id}`);
    assert(webhookOrderCheck.data.data.payment_status === 'Paid', 'Order confirmed to "Paid" via webhook event');

    // ----------------------------------------------------
    // TEST GROUP 6: ADMIN SYNC & ORDER LOOKUP
    // ----------------------------------------------------
    console.log('\n👑 TEST GROUP 6: Admin Dashboard & Order Lookup Sync');

    const adminOrders = await makeRequest('/api/orders', {
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    assert(adminOrders.status === 200, 'GET /api/orders (Admin) returns 200 OK');
    assert(adminOrders.data.count > 0, 'Orders list contains records');

    const paidOrder = adminOrders.data.data.find(o => o.payment_status === 'Paid');
    const codOrderRecord = adminOrders.data.data.find(o => o.payment_status === 'Pending (COD)');

    assert(Boolean(paidOrder), 'Admin dashboard has "Paid" online orders');
    assert(Boolean(codOrderRecord), 'Admin dashboard has "Pending (COD)" orders');

    const metricsRes = await makeRequest('/api/admin/metrics', {
      headers: { 'x-user-uid': 'admin-uid-001' }
    });
    assert(metricsRes.status === 200, 'GET /api/admin/metrics returns 200 OK');
    assert(metricsRes.data.data.total_revenue > 0, 'Total revenue includes confirmed & COD orders');

  } catch (e) {
    console.error('💥 Test suite execution error:', e);
    failed++;
  }

  console.log('\n=========================================================================');
  console.log(`🏁 PAYMENT TEST RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log('=========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPaymentSuite();
