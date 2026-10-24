import { createContext, useContext, useEffect, useState } from 'react'
import * as seed from '../data/seed'

// One shared "store" for the whole app.
// Everything is saved in localStorage so data stays after refresh.
// When the backend is ready, these functions will call the API instead.

const StoreContext = createContext(null)

// When the sample data changes (new products, photos...), bump this number.
// Visitors with old saved data then get the fresh catalogue automatically.
const DATA_VERSION = '2'
try {
  if (localStorage.getItem('kg_version') !== DATA_VERSION) {
    Object.keys(localStorage).filter((k) => k.startsWith('kg_')).forEach((k) => localStorage.removeItem(k))
    localStorage.setItem('kg_version', DATA_VERSION)
  }
} catch {
  // storage blocked: the app still works, just without saving
}

function usePersisted(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or blocked: ignore
    }
  }, [key, value])
  return [value, setValue]
}

const today = () => new Date().toISOString().slice(0, 10)
const newId = (prefix) => prefix + Date.now().toString(36) + Math.floor(Math.random() * 1000)

export function StoreProvider({ children }) {
  const [categories, setCategories] = usePersisted('kg_categories', seed.categories)
  const [products, setProducts] = usePersisted('kg_products', seed.products)
  const [shops, setShops] = usePersisted('kg_shops', seed.shops)
  const [users, setUsers] = usePersisted('kg_users', seed.users)
  const [orders, setOrders] = usePersisted('kg_orders', seed.sampleOrders)
  const [reviews, setReviews] = usePersisted('kg_reviews', seed.reviews)
  const [cart, setCart] = usePersisted('kg_cart', [])
  const [wishlist, setWishlist] = usePersisted('kg_wishlist', [])
  const [userId, setUserId] = usePersisted('kg_user', null)
  const [toast, setToast] = useState(null)

  const user = users.find((u) => u.id === userId) || null

  // ---------- helpers ----------
  const getShop = (id) => shops.find((s) => s.id === id)
  const getProduct = (id) => products.find((p) => p.id === id)
  const getCategory = (id) => categories.find((c) => c.id === id)

  // buyers only see products from approved shops
  const liveProducts = products.filter((p) => getShop(p.shopId)?.status === 'approved')

  function showToast(message, type = 'success') {
    setToast({ message, type, id: Date.now() })
  }
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(t)
  }, [toast])

  // ---------- auth ----------
  function login(email, password) {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (!found) return 'No account found with this email.'
    if (found.password !== password) return 'Incorrect password.'
    setUserId(found.id)
    showToast(`Welcome back, ${found.name.split(' ')[0]}!`)
    return null
  }

  function signup({ name, email, password, phone, city, role, shopName }) {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return 'An account with this email already exists.'
    }
    const id = newId('u')
    const newUser = { id, name, email: email.trim(), password, phone, city, role }
    if (role === 'seller') {
      const shopId = newId('s')
      newUser.shopId = shopId
      setShops((prev) => [...prev, {
        id: shopId, name: shopName, ownerId: id, city, color: '#C2410C',
        since: new Date().getFullYear(), status: 'pending',
        description: `Handmade products by ${name} from ${city}.`,
      }])
    }
    setUsers((prev) => [...prev, newUser])
    setUserId(id)
    showToast('Account created successfully!')
    return null
  }

  function logout() {
    setUserId(null)
    showToast('You have been logged out.')
  }

  function updateProfile(changes) {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...changes } : u)))
    showToast('Profile updated.')
  }

  // ---------- cart ----------
  function addToCart(productId, qty = 1) {
    const product = getProduct(productId)
    if (!product || product.stock === 0) return
    setCart((prev) => {
      const line = prev.find((l) => l.productId === productId)
      if (line) {
        return prev.map((l) => l.productId === productId
          ? { ...l, qty: Math.min(l.qty + qty, product.stock) } : l)
      }
      return [...prev, { productId, qty: Math.min(qty, product.stock) }]
    })
    showToast(`Added "${product.name}" to cart`)
  }

  function updateCartQty(productId, qty) {
    const product = getProduct(productId)
    if (qty < 1) return removeFromCart(productId)
    setCart((prev) => prev.map((l) => l.productId === productId
      ? { ...l, qty: Math.min(qty, product?.stock || qty) } : l))
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((l) => l.productId !== productId))
  }

  // cart lines joined with product info (skips products that were deleted)
  const cartItems = cart
    .map((l) => ({ ...l, product: getProduct(l.productId) }))
    .filter((l) => l.product)
  const cartCount = cartItems.reduce((sum, l) => sum + l.qty, 0)
  const cartSubtotal = cartItems.reduce((sum, l) => sum + l.qty * l.product.price, 0)

  // ---------- wishlist ----------
  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId))
      showToast('Removed from favourites', 'info')
    } else {
      setWishlist((prev) => [...prev, productId])
      showToast('Saved to favourites')
    }
  }

  // ---------- orders ----------
  function placeOrder({ address, payment, shipping, discount }) {
    const items = cartItems.map((l) => ({
      productId: l.productId, name: l.product.name, price: l.product.price, qty: l.qty, shopId: l.product.shopId,
    }))
    const order = {
      id: 'KG-' + (10500 + orders.length + Math.floor(Math.random() * 90)),
      userId, date: today(), status: 'Pending', payment, address, items,
      subtotal: cartSubtotal, shipping, discount, total: cartSubtotal + shipping - discount,
    }
    setOrders((prev) => [order, ...prev])
    // reduce stock
    setProducts((prev) => prev.map((p) => {
      const line = items.find((i) => i.productId === p.id)
      return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p
    }))
    setCart([])
    return order
  }

  function updateOrderStatus(orderId, status) {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
    showToast(`Order ${orderId} marked as ${status}`)
  }

  // ---------- products (seller) ----------
  function addProduct(data) {
    const product = { ...data, id: newId('p'), rating: 0, reviewCount: 0, createdAt: today() }
    setProducts((prev) => [product, ...prev])
    showToast('Product added')
    return product
  }

  function updateProduct(id, data) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
    showToast('Product updated')
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setCart((prev) => prev.filter((l) => l.productId !== id))
    showToast('Product deleted', 'info')
  }

  // ---------- reviews ----------
  function addReview(productId, rating, text) {
    const review = { id: newId('r'), productId, name: user.name, rating, text, date: today() }
    setReviews((prev) => [review, ...prev])
    // update the product's average rating
    setProducts((prev) => prev.map((p) => {
      if (p.id !== productId) return p
      const count = p.reviewCount + 1
      const avg = (p.rating * p.reviewCount + rating) / count
      return { ...p, reviewCount: count, rating: Math.round(avg * 10) / 10 }
    }))
    showToast('Thank you for your review!')
  }

  // ---------- shops & admin ----------
  function updateShop(id, data) {
    setShops((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
  }

  function addCategory(name) {
    const id = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    if (categories.some((c) => c.id === id)) return 'This category already exists.'
    setCategories((prev) => [...prev, { id, name: name.trim(), icon: 'gift', color: '#EDE7DD' }])
    showToast('Category added')
    return null
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    showToast('Category removed', 'info')
  }

  function resetDemoData() {
    Object.keys(localStorage).filter((k) => k.startsWith('kg_') && k !== 'kg_version').forEach((k) => localStorage.removeItem(k))
    window.location.assign(import.meta.env.MODE === 'demo' ? window.location.pathname : '/')
  }

  const value = {
    categories, products, liveProducts, shops, users, orders, reviews, cities: seed.cities,
    user, cartItems, cartCount, cartSubtotal, wishlist, toast,
    getShop, getProduct, getCategory, showToast,
    login, signup, logout, updateProfile,
    addToCart, updateCartQty, removeFromCart,
    toggleWishlist,
    placeOrder, updateOrderStatus,
    addProduct, updateProduct, deleteProduct,
    addReview, updateShop, addCategory, deleteCategory, resetDemoData,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  return useContext(StoreContext)
}
