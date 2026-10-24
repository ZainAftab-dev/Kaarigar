import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import Icon from './Icon'

// Product picture: shows the uploaded image, or a coloured tile with the category icon.
export function ProductImage({ product, className = '', iconSize }) {
  const { getCategory } = useStore()
  const cat = getCategory(product.categoryId)
  if (product.image) {
    return <img className={'ph ' + className} src={product.image} alt={product.name} />
  }
  return (
    <div className={'ph ' + className} style={{ background: cat?.color || '#EDE7DD' }} role="img" aria-label={product.name}>
      <Icon name={cat?.icon || 'gift'} size={iconSize} />
    </div>
  )
}

export function Stars({ rating, count, size = 14 }) {
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      <Icon name="star" size={size} filled />
      <b>{rating ? rating.toFixed(1) : 'New'}</b>
      {count !== undefined && <span>({count})</span>}
    </span>
  )
}

// Clickable star input used in the review form
export function StarInput({ value, onChange }) {
  return (
    <div className="star-input" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button" key={n} role="radio" aria-checked={value === n} aria-label={`${n} star`}
          className={n <= value ? 'on' : ''} onClick={() => onChange(n)}
        >
          <Icon name="star" size={26} filled={n <= value} />
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon = 'box', title, text, action }) {
  return (
    <div className="empty">
      <div className="empty-ic"><Icon name={icon} size={36} /></div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {action}
    </div>
  )
}

export function QtyPicker({ value, max, onChange, small }) {
  return (
    <div className={'qty' + (small ? ' sm' : '')}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(value - 1)} disabled={value <= 1}>
        <Icon name="minus" size={16} />
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)} disabled={value >= max}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}

export function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className={'toast ' + toast.type} role="status" key={toast.id}>
      <Icon name={toast.type === 'error' ? 'close' : 'check'} size={18} />
      {toast.message}
    </div>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Only lets logged-in users with the right role see a page
export function RequireRole({ role, children }) {
  const { user } = useStore()
  const location = useLocation()
  if (!user) return <Navigate to={'/login?next=' + encodeURIComponent(location.pathname)} replace />
  if (role && user.role !== role) {
    return (
      <div className="wrap page">
        <EmptyState icon="shield" title="Access denied" text={`This page is only for ${role}s.`}
          action={<Link to="/" className="btn">Go to home</Link>} />
      </div>
    )
  }
  return children
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          {i < items.length - 1 && <span className="sep">/</span>}
        </span>
      ))}
    </nav>
  )
}

export function StatusBadge({ status }) {
  return <span className={'status s-' + status.toLowerCase()}>{status}</span>
}
