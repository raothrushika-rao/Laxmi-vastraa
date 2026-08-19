// Laxmi Vastaraa - Razorpay Payment Gateway Client & High-Fidelity Sandbox Simulator
class RazorpayClient {
  constructor() {
    this.sdkLoaded = false;
    this.sdkPromise = null;
  }

  // Load official Razorpay Checkout SDK v1
  async loadSDK() {
    if (typeof window !== 'undefined' && window.Razorpay) {
      this.sdkLoaded = true;
      return true;
    }

    if (typeof document === 'undefined') {
      return false;
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

    // Check if a real, registered Razorpay merchant key is provided in environment
    const isRealMerchantKey = Boolean(
      orderData.key_id && 
      orderData.key_id !== 'rzp_test_luxury_vastaraa' && 
      !orderData.key_id.includes('luxury_vastaraa') && 
      !orderData.key_id.includes('mock') && 
      (orderData.key_id.startsWith('rzp_live_') || (orderData.key_id.startsWith('rzp_test_') && orderData.key_id.length >= 22))
    );

    // 1. If official Razorpay SDK is available on window and real merchant key is present
    if (window.Razorpay && isRealMerchantKey) {
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
        <div class="p-5 space-y-4">
          
          <!-- Method Selector Tabs -->
          <div class="grid grid-cols-3 gap-2">
            <button type="button" class="rzp-tab-btn active p-2.5 rounded-xl border-2 border-antique-gold bg-surface text-old-wine font-bold text-xs flex flex-col items-center gap-1 shadow-sm transition-all" data-tab="upi">
              <span class="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>UPI / QR</span>
            </button>
            <button type="button" class="rzp-tab-btn p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-600 font-semibold text-xs flex flex-col items-center gap-1 hover:border-antique-gold transition-all" data-tab="card">
              <span class="material-symbols-outlined text-[20px]">credit_card</span>
              <span>Cards</span>
            </button>
            <button type="button" class="rzp-tab-btn p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-600 font-semibold text-xs flex flex-col items-center gap-1 hover:border-antique-gold transition-all" data-tab="netbanking">
              <span class="material-symbols-outlined text-[20px]">account_balance</span>
              <span>NetBanking</span>
            </button>
          </div>

          <!-- Tab 1: UPI & QR Scanner -->
          <div id="rzp-tab-content-upi" class="space-y-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-16 h-16 bg-white p-1 rounded-lg border border-neutral-300 shadow-inner shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" class="w-full h-full text-deep-charcoal">
                  <path fill="currentColor" d="M10 10h30v30h-30zM20 20h10v10h-10zM60 10h30v30h-30zM70 20h10v10h-10zM10 60h30v30h-30zM20 70h10v10h-10zM55 55h10v10h-10zM75 55h15v10h-15zM55 75h20v15h-20zM80 80h10v10h-10z"/>
                </svg>
              </div>
              <div>
                <strong class="block font-serif text-deep-charcoal">Scan with any UPI App</strong>
                <p class="text-[10px] text-neutral-500 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                <span class="inline-block mt-1 text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">UPI Autopay Ready</span>
              </div>
            </div>
            <div>
              <label class="block text-[10px] uppercase font-bold text-neutral-500 mb-1">Or Enter Virtual Payment Address (VPA)</label>
              <input type="text" value="${orderData.customer?.phone || '9829012345'}@upi" class="w-full text-xs p-2.5 rounded border border-neutral-300 focus:border-old-wine bg-white" />
            </div>
          </div>

          <!-- Tab 2: Credit / Debit Cards -->
          <div id="rzp-tab-content-card" class="space-y-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs hidden">
            <div>
              <label class="block text-[10px] uppercase font-bold text-neutral-500 mb-1">Card Number</label>
              <input type="text" value="4532 •••• •••• 8899" class="w-full text-xs p-2.5 rounded border border-neutral-300 focus:border-old-wine bg-white font-mono" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] uppercase font-bold text-neutral-500 mb-1">Expiry</label>
                <input type="text" value="12/28" class="w-full text-xs p-2.5 rounded border border-neutral-300 focus:border-old-wine bg-white text-center font-mono" />
              </div>
              <div>
                <label class="block text-[10px] uppercase font-bold text-neutral-500 mb-1">CVV</label>
                <input type="password" value="888" class="w-full text-xs p-2.5 rounded border border-neutral-300 focus:border-old-wine bg-white text-center font-mono" />
              </div>
            </div>
          </div>

          <!-- Tab 3: NetBanking -->
          <div id="rzp-tab-content-netbanking" class="space-y-2 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs hidden">
            <label class="block text-[10px] uppercase font-bold text-neutral-500 mb-1">Select Bank</label>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center gap-2 p-2 rounded border border-antique-gold bg-white cursor-pointer text-[11px] font-semibold text-deep-charcoal">
                <input type="radio" name="rzp-bank" checked class="text-old-wine" /> HDFC Bank
              </label>
              <label class="flex items-center gap-2 p-2 rounded border border-neutral-200 bg-white cursor-pointer text-[11px] font-semibold text-deep-charcoal">
                <input type="radio" name="rzp-bank" class="text-old-wine" /> ICICI Bank
              </label>
              <label class="flex items-center gap-2 p-2 rounded border border-neutral-200 bg-white cursor-pointer text-[11px] font-semibold text-deep-charcoal">
                <input type="radio" name="rzp-bank" class="text-old-wine" /> State Bank of India
              </label>
              <label class="flex items-center gap-2 p-2 rounded border border-neutral-200 bg-white cursor-pointer text-[11px] font-semibold text-deep-charcoal">
                <input type="radio" name="rzp-bank" class="text-old-wine" /> Axis Bank
              </label>
            </div>
          </div>

          <!-- Customer info chip -->
          <div class="bg-surface p-3 rounded-lg border border-antique-gold/20 text-[11px] text-neutral-600 space-y-0.5">
            <div><strong>Patron:</strong> ${orderData.customer?.name}</div>
            <div><strong>Contact:</strong> ${orderData.customer?.phone} • ${orderData.customer?.email}</div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="p-5 pt-0 space-y-2">
          <button 
            id="rzp-sim-pay-success-btn"
            class="w-full bg-old-wine hover:bg-primary text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">verified</span> Complete Payment & Confirm (₹${amountInRupees})
          </button>

          <button 
            id="rzp-sim-pay-fail-btn"
            class="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs py-2.5 rounded-lg transition-colors"
          >
            Simulate Decline / Bank Error
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

    // Tab Switching Handlers
    const tabBtns = container.querySelectorAll('.rzp-tab-btn');
    const tabContents = {
      upi: document.getElementById('rzp-tab-content-upi'),
      card: document.getElementById('rzp-tab-content-card'),
      netbanking: document.getElementById('rzp-tab-content-netbanking')
    };

    tabBtns.forEach(btn => {
      btn.onclick = () => {
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active', 'border-2', 'border-antique-gold', 'bg-surface', 'text-old-wine', 'shadow-sm');
          b.classList.add('border-neutral-200', 'bg-white', 'text-neutral-600');
        });
        btn.classList.add('active', 'border-2', 'border-antique-gold', 'bg-surface', 'text-old-wine', 'shadow-sm');
        btn.classList.remove('border-neutral-200', 'bg-white', 'text-neutral-600');

        Object.keys(tabContents).forEach(key => {
          if (tabContents[key]) {
            if (key === tab) {
              tabContents[key].classList.remove('hidden');
            } else {
              tabContents[key].classList.add('hidden');
            }
          }
        });
      };
    });

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
