import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { RequireRole, ScrollToTop, Toast } from './components/Common'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import ShopPage from './pages/ShopPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import { Login, Signup } from './pages/Auth'
import Account from './pages/Account'
import Sell from './pages/Sell'
import Help from './pages/Help'
import NotFound from './pages/NotFound'
import SellerDashboard from './pages/seller/SellerDashboard'
import ProductForm from './pages/seller/ProductForm'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/help" element={<Help />} />

          <Route path="/checkout" element={<RequireRole><Checkout /></RequireRole>} />
          <Route path="/order-success/:id" element={<RequireRole><OrderSuccess /></RequireRole>} />
          <Route path="/orders" element={<RequireRole><Orders /></RequireRole>} />
          <Route path="/account" element={<RequireRole><Account /></RequireRole>} />

          <Route path="/seller" element={<RequireRole role="seller"><SellerDashboard /></RequireRole>} />
          <Route path="/seller/products/new" element={<RequireRole role="seller"><ProductForm /></RequireRole>} />
          <Route path="/seller/products/:id/edit" element={<RequireRole role="seller"><ProductForm /></RequireRole>} />

          <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  )
}
