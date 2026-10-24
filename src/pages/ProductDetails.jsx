import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { Breadcrumbs, EmptyState, ProductImage, QtyPicker, StarInput, Stars } from '../components/Common'
import { usePageTitle } from '../helpers'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { formatDate, formatPrice } from '../utils'

function Reviews({ product }) {
  const { reviews, user, addReview, orders } = useStore()
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const list = reviews.filter((r) => r.productId === product.id)

  const hasBought = user && orders.some((o) => o.userId === user.id && o.items.some((i) => i.productId === product.id))

  function submit(e) {
    e.preventDefault()
    if (!rating) return setError('Please choose a star rating.')
    if (text.trim().length < 10) return setError('Please write at least 10 characters.')
    addReview(product.id, rating, text.trim())
    setRating(0); setText(''); setError('')
  }

  return (
    <div className="reviews">
      <div className="rev-summary">
        <div className="big-rating">{product.rating ? product.rating.toFixed(1) : '–'}</div>
        <Stars rating={product.rating} size={18} />
        <p className="muted">{product.reviewCount} reviews</p>
      </div>
      <div>
        {user ? (
          <form className="rev-form" onSubmit={submit}>
            <h3>Write a review</h3>
            {!hasBought && <p className="muted small">Tip: reviews from verified buyers get a badge.</p>}
            <StarInput value={rating} onChange={setRating} />
            <label htmlFor="rev-text" className="sr-only">Your review</label>
            <textarea id="rev-text" rows="3" placeholder="What did you like about this item?" value={text} onChange={(e) => setText(e.target.value)} />
            {error && <p className="error">{error}</p>}
            <button className="btn">Post review</button>
          </form>
        ) : (
          <p className="muted"><Link to={`/login?next=/product/${product.id}`} className="link">Sign in</Link> to write a review.</p>
        )}
        {list.length === 0 && <p className="muted" style={{ marginTop: 16 }}>No written reviews yet.</p>}
        {list.map((r) => (
          <div className="review" key={r.id}>
            <div className="rev-top"><span className="avatar">{r.name[0]}</span><b>{r.name}</b><span className="muted small">{formatDate(r.date)}</span></div>
            <Stars rating={r.rating} />
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProduct, getShop, getCategory, liveProducts, addToCart, toggleWishlist, wishlist, user } = useStore()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('details')
  const [zoom, setZoom] = useState(null)

  const product = getProduct(id)
  const shop = product && getShop(product.shopId)
  usePageTitle(product ? product.name : 'Product not found')
  if (!product || shop?.status !== 'approved') {
    return <div className="wrap page"><EmptyState icon="search" title="Product not found" text="It may have been removed by the seller."
      action={<Link to="/shop" className="btn">Browse products</Link>} /></div>
  }

  const category = getCategory(product.categoryId)
  const saved = wishlist.includes(product.id)
  const related = liveProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 5)
  const outOfStock = product.stock === 0
  const isOwnProduct = user?.role === 'seller' && user.shopId === product.shopId

  function buyNow() {
    addToCart(product.id, qty)
    navigate('/checkout')
  }

  // hover zoom on the main photo (desktop)
  function moveZoom(e) {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: category?.name || 'Shop', to: `/shop?cat=${product.categoryId}` }, { label: product.name }]} />

      <div className="pd">
        <div className="gallery">
          <div
            className={'main-img' + (zoom ? ' zooming' : '')}
            onMouseMove={product.image ? moveZoom : undefined}
            onMouseLeave={() => setZoom(null)}
            style={zoom ? { '--zoom-origin': zoom } : undefined}
          >
            <ProductImage product={product} size={1200} eager key={product.id} />
          </div>
          {product.image && <p className="muted small zoom-hint">Hover over the photo to zoom</p>}
        </div>

        <div className="pd-info">
          <Link to={`/shop/${shop.id}`} className="pd-shop">{shop.name}</Link>
          <h1>{product.name}</h1>
          <Stars rating={product.rating} count={product.reviewCount} size={16} />
          <div className="pd-price">
            <span className="price">{formatPrice(product.price)}</span>
            {product.oldPrice && <><s>{formatPrice(product.oldPrice)}</s><span className="sale-tag">Save {formatPrice(product.oldPrice - product.price)}</span></>}
          </div>
          <p className={'stock' + (outOfStock ? ' out' : product.stock <= 5 ? ' low' : '')}>
            {outOfStock ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left, order soon` : 'In stock'}
          </p>

          {!isOwnProduct && (
            <>
              <div className="pd-qty">
                <span>Quantity</span>
                <QtyPicker value={qty} max={Math.max(1, product.stock)} onChange={setQty} />
              </div>
              <div className="pd-actions">
                <button className="btn big" onClick={() => addToCart(product.id, qty)} disabled={outOfStock}><Icon name="cart" />Add to cart</button>
                <button className="btn big dark" onClick={buyNow} disabled={outOfStock}>Buy it now</button>
                <button className={'icon-btn round' + (saved ? ' saved' : '')} onClick={() => toggleWishlist(product.id)} aria-pressed={saved} aria-label="Save to favourites">
                  <Icon name="heart" filled={saved} />
                </button>
              </div>
            </>
          )}
          {isOwnProduct && <Link to={`/seller/products/${product.id}/edit`} className="btn"><Icon name="edit" size={18} />Edit this product</Link>}

          <ul className="pd-perks">
            <li><Icon name="truck" />{product.freeDelivery ? 'Free delivery' : 'Delivery Rs. 200, free over Rs. 3,000'} · 3 to 5 working days</li>
            <li><Icon name="cash" />Cash on Delivery, JazzCash or Easypaisa</li>
            <li><Icon name="shield" />7-day easy return if the item is damaged</li>
          </ul>

          <Link to={`/shop/${shop.id}`} className="seller-card">
            <span className="avatar lg" style={{ background: shop.color }}>{shop.name[0]}</span>
            <div><b>{shop.name}</b><span className="muted small"><Icon name="pin" size={14} />{shop.city} · On Kaarigar since {shop.since}</span></div>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>

      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'details'} onClick={() => setTab('details')}>Item details</button>
        <button role="tab" aria-selected={tab === 'reviews'} onClick={() => setTab('reviews')}>Reviews ({product.reviewCount})</button>
        <button role="tab" aria-selected={tab === 'shipping'} onClick={() => setTab('shipping')}>Delivery &amp; returns</button>
      </div>
      <div className="tab-body" role="tabpanel">
        {tab === 'details' && (
          <div className="prose">
            <p>{product.description}</p>
            <ul>
              <li>Category: {category?.name}</li>
              <li>Made by: {shop.name}, {shop.city}</li>
              <li>Handmade item, small variations are natural</li>
            </ul>
          </div>
        )}
        {tab === 'reviews' && <Reviews product={product} />}
        {tab === 'shipping' && (
          <div className="prose">
            <p>Orders are dispatched within 2 days and delivered by TCS or Leopards in 3 to 5 working days. Delivery is free on orders above Rs. 3,000.</p>
            <p>If your item arrives damaged, contact us within 7 days for a free replacement or full refund.</p>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section className="sec">
          <div className="sh"><h2>You may also like</h2></div>
          <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  )
}
