import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils'
import { ProductImage, Stars } from './Common'
import Icon from './Icon'

export default function ProductCard({ product }) {
  const { getShop, wishlist, toggleWishlist, addToCart } = useStore()
  const shop = getShop(product.shopId)
  const saved = wishlist.includes(product.id)
  const off = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  return (
    <article className="card">
      <div className="card-img">
        <Link to={`/product/${product.id}`} tabIndex={-1}>
          <ProductImage product={product} />
        </Link>
        <button
          className={'fav' + (saved ? ' on' : '')} aria-pressed={saved}
          aria-label={saved ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => toggleWishlist(product.id)}
        >
          <Icon name="heart" size={18} filled={saved} />
        </button>
        {off > 0 && <span className="sale">{off}% off</span>}
        {product.stock === 0 && <span className="soldout">Sold out</span>}
        <button
          className="quick-add" onClick={() => addToCart(product.id)}
          disabled={product.stock === 0} aria-label={`Add ${product.name} to cart`}
        >
          <Icon name="cart" size={16} /> Add
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="card-title">{product.name}</Link>
      <Stars rating={product.rating} count={product.reviewCount} />
      <div className="price-row">
        <span className="price">{formatPrice(product.price)}</span>
        {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
      </div>
      {shop && <Link to={`/shop/${shop.id}`} className="card-shop">{shop.name}</Link>}
      {product.freeDelivery && <span className="free">Free delivery</span>}
    </article>
  )
}
