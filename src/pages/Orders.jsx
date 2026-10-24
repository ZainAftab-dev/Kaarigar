import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { EmptyState, ProductImage, StatusBadge } from '../components/Common'
import { formatDate, formatPrice } from '../utils'

const STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered']

function Tracker({ status }) {
  if (status === 'Cancelled') return <p className="error">This order was cancelled.</p>
  const current = STEPS.indexOf(status)
  return (
    <ol className="timeline">
      {STEPS.map((s, i) => <li key={s} className={i <= current ? 'done' : ''}>{s === 'Pending' ? 'Placed' : s}</li>)}
    </ol>
  )
}

export default function Orders() {
  const { user, orders, getProduct, updateOrderStatus, addToCart } = useStore()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)

  const mine = orders.filter((o) => o.userId === user.id)
  const shown = filter === 'All' ? mine : mine.filter((o) => o.status === filter)

  if (mine.length === 0) {
    return <div className="wrap page"><EmptyState icon="box" title="No orders yet" text="When you buy something, you can track it here."
      action={<Link to="/shop" className="btn">Start shopping</Link>} /></div>
  }

  return (
    <div className="wrap page">
      <h1 className="page-title">My orders</h1>
      <div className="seg" role="tablist">
        {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {shown.length === 0 && <p className="muted">No {filter.toLowerCase()} orders.</p>}

      {shown.map((o) => (
        <div className="order" key={o.id}>
          <div className="order-head">
            <div><span className="muted small">Order</span><b>{o.id}</b></div>
            <div><span className="muted small">Placed</span><b>{formatDate(o.date)}</b></div>
            <div><span className="muted small">Total</span><b>{formatPrice(o.total)}</b></div>
            <div><span className="muted small">Payment</span><b>{o.payment}</b></div>
            <StatusBadge status={o.status} />
          </div>
          <div className="order-items">
            {o.items.map((it) => {
              const product = getProduct(it.productId)
              return (
                <div className="order-item" key={it.productId}>
                  {product ? <Link to={`/product/${product.id}`}><ProductImage product={product} className="thumb" /></Link> : <div className="thumb ph" />}
                  <div>
                    <b>{it.name}</b>
                    <span className="muted small">Qty {it.qty} · {formatPrice(it.price)}</span>
                  </div>
                  {o.status === 'Delivered' && product && (
                    <div className="oi-actions">
                      <button className="btn sm outline" onClick={() => addToCart(product.id)}>Buy again</button>
                      <Link className="btn sm outline" to={`/product/${product.id}`}>Write review</Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="order-foot">
            <button className="link-btn" onClick={() => setOpen(open === o.id ? null : o.id)} aria-expanded={open === o.id}>
              {open === o.id ? 'Hide details' : 'Track order'}
            </button>
            {o.status === 'Pending' && (
              <button className="link-btn danger" onClick={() => { if (confirm('Cancel this order?')) updateOrderStatus(o.id, 'Cancelled') }}>Cancel order</button>
            )}
          </div>
          {open === o.id && (
            <div className="order-detail">
              <Tracker status={o.status} />
              <p className="small"><b>Delivery to:</b> {o.address.name}, {o.address.address}, {o.address.city} · {o.address.phone}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
