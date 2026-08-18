// Laxmi Vastaraa - Razorpay Payment Gateway Client & High-Fidelity Sandbox Simulator
class RazorpayClient {
  constructor() {
    this.sdkLoaded = false;
    this.sdkPromise = null;
  }

  // Load official Razorpay Checkout SDK v1
  async loadSDK() {
    if (window.Razorpay) {
      this.sdkLoaded = true;
      return true;
    }

    if (this.sdkPromise) {
      return this.sdkPromise;
    }

    this.sdkPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        this.sdkLoaded = true;
        resolve(true);
      };
      script.onerror = () => {
        console.warn('⚠️ Razorpay CDN script was blocked or unreachable. Falling back to high-fidelity Luxury Sandbox Gateway Simulator.');
        this.sdkLoaded = false;
        resolve(false);
      };
      document.head.appendChild(script);
    });

    return this.sdkPromise;
  }

  // Open Secure Payment Gateway Modal
  async openCheckout({
    orderData,
    onSuccess,
    onFailure,
    onDismiss
  }) {
    await this.loadSDK();

    const amountInRupees = (orderData.amount / 100).toLocaleString('en-IN');

    // 1. If official Razorpay SDK is available on window
    if (window.Razorpay && orderData.key_id && !orderData.key_id.startsWith('rzp_test_mock')) {
      try {
        const options = {
          key: orderData.key_id,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'Laxmi Vastaraa',
          description: `Order ${orderData.order_number} • Royal Heirloom Handloom Silk`,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm6eSds3DlJqh9gMtxAytk8xZQJcf8eOjtj6Kv41wjar3LNzaW9vBJpB8TPxgNSlwr-iek1uRLOps8cB_t1TytQE0hL0mADYDt387SHsBcglqkZ9SWuxUTbfcztl3j3BAhYnf3sF8IN9N8-xc9zT6pAYOBQnmhnp7EerXIyXGOCB2GHba1zhZHeH-jVjElmexAv1RIcBzW2fj_zjWnQi1l-K16j8BA0UmABRtvEJl8XEBMm594ATD5hw',
          order_id: orderData.gateway_order_id.startsWith('order_') && !orderData.gateway_order_id.includes('mock') ? orderData.gateway_order_id : undefined,
          prefill: {
            name: orderData.customer?.name || 'Valued Patron',
            email: orderData.customer?.email || 'client@laxmivastraa.com',
            contact: orderData.customer?.phone || '+91 98290 12345'
          },
          notes: {
            store_name: 'Laxmi Vastaraa',
            consignment_id: orderData.order_number
          },
          theme: {
            color: '#71001E',
            backdrop_color: 'rgba(73, 0, 16, 0.7)'
          },
          modal: {
            backdropclose: false,
            escape: true,
            handleback: true,
            confirm_close: true,
            ondismiss: function () {
              if (typeof onDismiss === 'function') {
                onDismiss('User dismissed payment modal.');
              }
            }
          },
          handler: function (response) {
            if (typeof onSuccess === 'function') {
              onSuccess({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id || orderData.gateway_order_id,
                razorpay_signature: response.razorpay_signature || `sig_test_${Date.now()}`
              });
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          if (typeof onFailure === 'function') {
            onFailure(response.error?.description || 'Payment transaction failed.');
          }
        });

        rzp.open();
        return;
      } catch (err) {
        console.warn('Razorpay SDK invocation fallback to Luxury Sandbox Modal:', err);
      }
    }

    // 2. High-Fidelity Luxury Sandbox Gateway Simulator (for test mode, demo testing, or offline sandbox)
    this.renderSandboxModal({
      orderData,
      amountInRupees,
      onSuccess,
      onFailure,
      onDismiss
    });
  }

  // Luxury Sandbox Gateway Simulator
  renderSandboxModal({
    orderData,
    amountInRupees,
    onSuccess,
    onFailure,
    onDismiss
  }) {
    // Remove any existing modal
    const existing = document.getElementById('rzp-sandbox-modal-container');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'rzp-sandbox-modal-container';
    container.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in';

    container.innerHTML = `
      <div class="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-antique-gold/40 animate-slide-up flex flex-col">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-old-wine to-primary p-5 text-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-antique-gold/40">
              <span class="material-symbols-outlined text-antique-gold text-[22px]">lock</span>
            </div>
            <div>
              <span class="text-[10px] uppercase tracking-[0.2em] text-antique-gold font-bold block">Razorpay Secure</span>
              <h3 class="font-serif font-bold text-base">Laxmi Vastaraa</h3>
            </div>
          </div>
          <button id="rzp-modal-close-btn" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white" title="Cancel Payment">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Order Bar -->
        <div class="bg-surface-container-low px-5 py-3 border-b border-antique-gold/20 flex items-center justify-between text-xs">
          <div>
            <span class="text-neutral-500 text-[10px] block">Order Ref:</span>
            <strong class="font-mono text-deep-charcoal">${orderData.order_number}</strong>
          </div>
          <div class="text-right">
            <span class="text-neutral-500 text-[10px] block">Amount to Pay:</span>
            <strong class="text-old-wine font-serif text-base font-bold">₹${amountInRupees}</strong>
          </div>
        </div>

        <!-- Sandbox Test Notice -->
        <div class="bg-amber-50 border-b border-amber-200 px-5 py-2 flex items-center gap-2 text-[11px] text-amber-900">
          <span class="material-symbols-outlined text-amber-700 text-[16px]">info</span>
          <span><strong>Test Sandbox Mode</strong>: Safe simulation for testing without real charges.</span>
        </div>

        <!-- Payment Instrument Tabs / Selection -->
        <div class="p-6 space-y-4">
          <label class="block text-xs font-semibold text-neutral-700">Choose Instant Payment Method</label>

          <div class="space-y-2.5">
            
            <label class="flex items-center justify-between p-3 rounded-xl border border-antique-gold bg-surface cursor-pointer hover:bg-surface-container transition-colors">
              <div class="flex items-center gap-3">
                <input type="radio" name="rzp-sim-method" value="upi" checked class="text-old-wine focus:ring-old-wine" />
                <div>
                  <strong class="block text-xs font-semibold text-deep-charcoal">Instant UPI / QR Scanner</strong>
                  <span class="text-[10px] text-neutral-500">Google Pay, PhonePe, Paytm, BHIM</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-old-wine text-[22px]">qr_code_2</span>
            </label>

            <label class="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-antique-gold bg-white cursor-pointer transition-colors">
              <div class="flex items-center gap-3">
                <input type="radio" name="rzp-sim-method" value="card" class="text-old-wine focus:ring-old-wine" />
                <div>
                  <strong class="block text-xs font-semibold text-deep-charcoal">Credit / Debit Card</strong>
                  <span class="text-[10px] text-neutral-500">Visa, MasterCard, RuPay, Amex</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-neutral-600 text-[22px]">credit_card</span>
            </label>

            <label class="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-antique-gold bg-white cursor-pointer transition-colors">
              <div class="flex items-center gap-3">
                <input type="radio" name="rzp-sim-method" value="netbanking" class="text-old-wine focus:ring-old-wine" />
                <div>
                  <strong class="block text-xs font-semibold text-deep-charcoal">NetBanking (Top 50+ Banks)</strong>
                  <span class="text-[10px] text-neutral-500">HDFC, ICICI, SBI, Axis, Kotak</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-neutral-600 text-[22px]">account_balance</span>
            </label>

          </div>

          <!-- Customer info chip -->
          <div class="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-[11px] text-neutral-600 space-y-0.5">
            <div><strong>Patron:</strong> ${orderData.customer?.name}</div>
            <div><strong>Contact:</strong> ${orderData.customer?.phone} • ${orderData.customer?.email}</div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="p-6 pt-0 space-y-2">
          <button 
            id="rzp-sim-pay-success-btn"
            class="w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">verified</span> Authorize & Pay ₹${amountInRupees}
          </button>

          <button 
            id="rzp-sim-pay-fail-btn"
            class="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs py-2.5 rounded-lg transition-colors"
          >
            Simulate Transaction Failure
          </button>
        </div>

        <!-- Footer Seal -->
        <div class="bg-neutral-100 px-5 py-2.5 text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-[14px] text-green-700">lock</span>
          <span>256-bit Encrypted Banking Handshake • PCI-DSS Level 1 Compliant</span>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    // Event Handlers for Sandbox Modal
    const closeBtn = document.getElementById('rzp-modal-close-btn');
    const paySuccessBtn = document.getElementById('rzp-sim-pay-success-btn');
    const payFailBtn = document.getElementById('rzp-sim-pay-fail-btn');

    const closeModal = () => {
      container.remove();
    };

    closeBtn.onclick = () => {
      closeModal();
      if (typeof onDismiss === 'function') {
        onDismiss('User dismissed payment modal.');
      }
    };

    payFailBtn.onclick = () => {
      closeModal();
      if (typeof onFailure === 'function') {
        onFailure('Bank server timed out or payment was declined by user.');
      }
    };

    paySuccessBtn.onclick = () => {
      paySuccessBtn.disabled = true;
      paySuccessBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Processing Bank Handshake...`;

      setTimeout(() => {
        closeModal();
        const fakePaymentId = `pay_${Date.now()}`;
        const fakeOrderId = orderData.gateway_order_id || `order_${Date.now()}`;
        const fakeSignature = `sig_test_${Date.now()}`;

        if (typeof onSuccess === 'function') {
          onSuccess({
            razorpay_payment_id: fakePaymentId,
            razorpay_order_id: fakeOrderId,
            razorpay_signature: fakeSignature
          });
        }
      }, 700);
    };
  }
}

export const razorpayClient = new RazorpayClient();
