export const FREE_DELIVERY_LIMIT = 3000
export const DELIVERY_FEE = 200

// Promo codes that work at checkout (demo)
export const PROMO_CODES = {
  KAARIGAR10: 0.1, // 10% off
  EID20: 0.2, // 20% off
}

export function formatPrice(amount) {
  return 'Rs. ' + Math.round(amount).toLocaleString('en-PK')
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function shippingFor(subtotal) {
  return subtotal === 0 || subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE
}

// Pakistani mobile number like 03001234567
export function isValidPhone(phone) {
  return /^03\d{9}$/.test(phone.replace(/[\s-]/g, ''))
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
