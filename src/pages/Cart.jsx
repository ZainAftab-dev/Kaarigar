import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { EmptyState, ProductImage, QtyPicker } from '../components/Common'
import { usePageTitle } from '../helpers'
import Icon from '../components/Icon'
import { FREE_DELIVERY_LIMIT, formatPrice, shippingFor } from '../utils'

export default function Cart() {
  usePageTitle('Your cart')
  const { cartItems, cartSubtotal, updateCartQty, removeFromCart, getShop, toggleWishlist, wishlist } = useStore()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return <div className="wrap page"><EmptyState icon="cart" title="Your cart is empty" text="Discover handmade treasures from artisans across Pakistan."
      action={<Link to="/shop" className="btn">Start shopping</Link>} /></div>
  }

  const shipping = shippingFor(cartSubtotal)
  const remaining = FREE_DELIVERY_LIMIT - cartSubtotal
  const progress = Math.min(100, (cartSubtotal / FREE_DELIVERY_LIMIT) * 100)

  // group items by shop, like Etsy
  const shopIds = [...new Set(cartItems.map((l) => l.product.shopId))]

  return (
    <div className="wrap page">
      <h1 className="page-title">Your cart <span className="muted">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span></h1>
      <div className="cart-layout">
        <div>
          <div className="ship-bar">
            {remaining > 0
              ? <p>Add <b>{formatPrice(remaining)}</b> more for <b>free delivery</b></p>
              : <p><Icon name="truck" size={18} /> You've unlocked <b>free delivery!</b></p>}
            <div className="bar"><span style={{ width: progress + '%' }} /></div>
          </div>

          {shopIds.map((sid) => {
            const shop = getShop(sid)
            return (
              <div className="cart-shop" key={sid}>
                <Link to={`/shop/${sid}`} className="cart-shop-name"><Icon name="store" size={18} />{shop?.name}</Link>
                {cartItems.filter((l) => l.product.shopId === sid).map(({ product, qty }) => (
                  <div className="cart-line" key={product.id}>
                    <Link to={`/product/${product.id}`}><ProductImage product={product} className="thumb" size={200} /></Link>
                    <div className="cl-info">
                      <Link to={`/product/${product.id}`} className="cl-name">{product.name}</Link>
                      <span className="muted small">{product.stock <= 5 ? `Only ${product.stock} left` : 'In stock'}</span>
                      <div className="cl-actions">
                        <QtyPicker small value={qty} max={product.stock} onChange={(n) => updateCartQty(product.id, n)} />
                        {!wishlist.includes(product.id) && (
                          <button className="link-btn" onClick={() => { toggleWishlist(product.id); removeFromCart(product.id) }}>Save for later</button>
                        )}
                        <button className="link-btn danger" onClick={() => removeFromCart(product.id)}>Remove</button>
                      </div>
                    </div>
                    <div className="cl-price">
                      <b>{formatPrice(product.price * qty)}</b>
                      {qty > 1 && <span className="muted small">{formatPrice(product.price)} each</span>}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          <div className="sum-row"><span>Items total</span><span>{formatPrice(cartSubtotal)}</span></div>
          <div className="sum-row"><span>Delivery</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
          <div className="sum-row total"><span>Total</span><span>{formatPrice(cartSubtotal + shipping)}</span></div>
          <p className="muted small">Have a promo code? Add it at checkout.</p>
          <button className="btn full big" onClick={() => navigate('/checkout')}>Proceed to checkout <Icon name="arrow" size={18} /></button>
          <Link to="/shop" className="link center-block">Continue shopping</Link>
          <div className="sum-pay"><Icon name="shield" size={18} />Secure checkout · COD available</div>
        </aside>
      </div>
    </div>
  )
}
