// Frontend Rendering and State Engine Integrity Test
import { store } from '../js/state.js';
import { 
  renderHeader, 
  renderFooter, 
  renderQuickViewModal, 
  renderCartDrawer, 
  renderSearchModal,
  renderAdminOrderModal
} from '../js/components.js';
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
} from '../js/pages.js';

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

console.log('\n=============================================================');
console.log('🏛️  LAXMI VASTARAA — FRONTEND RENDERING & LOGIC INTEGRITY TEST');
console.log('=============================================================\n');

// 1. Initial State & Data Check
assert(Array.isArray(store.products) && store.products.length >= 8, `Store loaded ${store.products.length} products`);
assert(store.cart.length === 0, 'Cart is initially empty');

// 2. Test Component Renderers
const headerHtml = renderHeader();
assert(typeof headerHtml === 'string' && (headerHtml.includes('LAXMI VASTARAA') || headerHtml.includes('Laxmi Vastraa')), 'Header renders brand name');

const footerHtml = renderFooter();
assert(typeof footerHtml === 'string' && (footerHtml.includes('Silk Mark') || footerHtml.includes('LAXMI VASTARAA')), 'Footer renders certification note & brand');

store.isSearchModalOpen = true;
store.searchQuery = 'Banarasi';
const searchHtml = renderSearchModal();
assert(typeof searchHtml === 'string' && searchHtml.includes('live-search-input'), 'Search modal renders search input');
store.isSearchModalOpen = false;

// 3. Test Home Page
const homeHtml = renderHomePage();
assert(homeHtml.includes('Woven for Eternity'), 'Home page renders hero headline');
assert(homeHtml.includes('Explore Atelier Catalog'), 'Home page renders CTA button');

// 4. Test Catalog Page
const catalogHtml = renderCatalogPage();
assert(catalogHtml.includes('Banarasi') && catalogHtml.includes('Kanjeevaram'), 'Catalog page renders fabric filters');

// 5. Test Product Detail Page
const product = store.products[0];
assert(product && product.id, `Product 0 exists: ${product?.title}`);
const detailHtml = renderProductDetailPage(product.id);
assert(detailHtml.includes(product.title), 'Product detail page renders product title');
assert(detailHtml.includes('Weave Specifications') && detailHtml.includes('The Artisan Story'), 'Product detail renders weave specifications and artisan story');
assert(detailHtml.includes('pdp-pincode-input'), 'Product detail renders pincode check input');

// 6. Test Cart & Drawer
store.addToCart(product.id, 1);
assert(store.cart.length === 1, 'Cart has 1 item after addToCart');
assert(store.getCartTotal() === product.price, `Cart total matches product price (₹${product.price})`);

store.isCartDrawerOpen = true;
const cartDrawerHtml = renderCartDrawer();
assert(cartDrawerHtml.includes(product.title), 'Cart drawer shows added product title');
store.isCartDrawerOpen = false;

const cartPageHtml = renderCartPage();
assert(cartPageHtml.includes(product.title), 'Cart page shows added product title');

// 7. Test Coupon Application
const couponApplied = store.applyCoupon('HERITAGE10');
assert(couponApplied === true, 'Coupon HERITAGE10 applied successfully');
assert(store.getDiscountAmount() === Math.round(product.price * 0.1), '10% discount calculated accurately');

// 8. Test Checkout Page
const checkoutHtml = renderCheckoutPage();
assert(checkoutHtml.includes('Shipping') || checkoutHtml.includes('Delivery'), 'Checkout renders shipping section');
assert(checkoutHtml.includes('Cash on Delivery') || checkoutHtml.includes('COD') || checkoutHtml.includes('Razorpay'), 'Checkout renders payment options');

// 9. Test Wishlist
store.toggleWishlist(product.id);
assert(store.isInWishlist(product.id) === true, 'Product added to wishlist');
const wishlistHtml = renderWishlistPage();
assert(wishlistHtml.includes(product.title), 'Wishlist page renders wishlisted product');

// 10. Test Auth Pages
const loginHtml = renderLoginPage();
assert(loginHtml.includes('login-form') || loginHtml.includes('Sign In'), 'Login page renders sign in form');

const registerHtml = renderRegisterPage();
assert(registerHtml.includes('register-form') || registerHtml.includes('Create Account'), 'Register page renders registration form');

const forgotHtml = renderForgotPasswordPage();
assert(forgotHtml.includes('forgot-form') || forgotHtml.includes('Reset Password') || forgotHtml.includes('Password'), 'Forgot password page renders reset form');

const profileHtml = renderUserProfilePage();
assert(profileHtml.includes('Royal Account') || profileHtml.includes('Profile') || profileHtml.includes('Wardrobe') || profileHtml.includes('Patron'), 'User profile page renders profile section');

// 11. Test Admin Pages
// Non-admin guard check
store.adminToken = null;
store.adminUser = null;
const accessDeniedHtml = renderAdminAddSareePage();
assert(accessDeniedHtml.includes('Access Denied'), 'Admin page blocks non-admin users');

// Authorized admin check
store.adminToken = 'lv-admin-token-2026';
store.adminUser = { role: 'admin', email: 'admin@laxmivastraa.com' };
const adminHtml = renderAdminPage();
assert(adminHtml.includes('Admin') || adminHtml.includes('Executive') || adminHtml.includes('Studio'), 'Admin page renders admin studio');

const adminAddHtml = renderAdminAddSareePage();
assert(adminAddHtml.includes('Heirloom') || adminAddHtml.includes('Title') || adminAddHtml.includes('SKU'), 'Admin add saree page renders form when authenticated');

// 12. Test Order Success Page
const mockOrder = {
  id: 'ord-test-verify-12345',
  order_number: 'ORD-2026-9999',
  shipping_address: { full_name: 'Maharani Gayatri', city: 'Jaipur' },
  items: [{ title: product.title, price: product.price, quantity: 1 }],
  pricing: { final_amount: product.price },
  payment_method: 'COD',
  payment_status: 'Pending (COD)'
};
store.lastPlacedOrder = mockOrder;
const orderSuccessHtml = renderOrderSuccessPage();
assert(orderSuccessHtml.includes(mockOrder.order_number) || orderSuccessHtml.includes(mockOrder.id) || orderSuccessHtml.includes('Order Confirmation') || orderSuccessHtml.includes('Consignment'), 'Order success page renders Order details');

console.log('\n=============================================================');
console.log(`🏁 FRONTEND INTEGRITY RESULTS: ${passed} PASSED / ${failed} FAILED`);
console.log('=============================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
