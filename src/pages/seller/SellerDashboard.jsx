import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { EmptyState, ProductImage } from '../../components/Common'
import { usePageTitle } from '../../helpers'
import Icon from '../../components/Icon'
import { ORDER_STATUSES, formatDate, formatPrice } from '../../utils'

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'chart' },
  { id: 'products', label: 'Products', icon: 'box' },
  { id: 'orders', label: 'Orders', icon: 'cart' },
  { id: 'shop', label: 'Shop settings', icon: 'settings' },
]

// only the part of an order that belongs to this shop
function shopPart(order, shopId) {
  const items = order.items.filter((i) => i.shopId === shopId)
  return { ...order, items, shopTotal: items.reduce((s, i) => s + i.price * i.qty, 0) }
}

// the last 7 calendar days, oldest first
function lastSevenDays() {
  return [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
}

function Overview({ shop, myProducts, myOrders, setTab }) {
  const [week] = useState(lastSevenDays)
  const revenue = myOrders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.shopTotal, 0)
  const pending = myOrders.filter((o) => o.status === 'Pending').length
  const lowStock = myProducts.filter((p) => p.stock <= 5)

  // sales for the last 7 days (sample bars + real orders)
  const days = week.map((d, i) => {
    const key = d.toISOString().slice(0, 10)
    const real = myOrders.filter((o) => o.date === key && o.status !== 'Cancelled').reduce((s, o) => s + o.shopTotal, 0)
    const sample = [3200, 5400, 2100, 6800, 4300, 7500, 3900][i]
    return { label: d.toLocaleDateString('en-GB', { weekday: 'short' }), value: real + sample }
  })
  const maxDay = Math.max(...days.map((d) => d.value))

  return (
    <>
      <div className="stats">
        <div className="stat"><Icon name="cash" /><span>Total sales</span><b>{formatPrice(revenue)}</b></div>
        <div className="stat"><Icon name="cart" /><span>Orders</span><b>{myOrders.length}</b></div>
        <div className="stat"><Icon name="box" /><span>Products</span><b>{myProducts.length}</b></div>
        <div className="stat warn"><Icon name="bolt" /><span>Pending orders</span><b>{pending}</b></div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <h2>Sales this week</h2>
          <div className="bars" role="img" aria-label="Bar chart of sales for the last 7 days">
            {days.map((d) => (
              <div className="bar-col" key={d.label}>
                <span className="bar-val">{Math.round(d.value / 1000)}k</span>
                <div className="bar-fill" style={{ height: (d.value / maxDay) * 100 + '%' }} />
                <span className="bar-lbl">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Needs attention</h2>
          {pending > 0 && <button className="attn" onClick={() => setTab('orders')}><Icon name="cart" size={18} />{pending} order(s) waiting for confirmation</button>}
          {lowStock.map((p) => (
            <Link key={p.id} to={`/seller/products/${p.id}/edit`} className="attn"><Icon name="box" size={18} />{p.name}: {p.stock === 0 ? 'out of stock' : `only ${p.stock} left`}</Link>
          ))}
          {pending === 0 && lowStock.length === 0 && <p className="muted">All good! Nothing needs your attention.</p>}
          <Link to={`/shop/${shop.id}`} className="link" style={{ display: 'inline-block', marginTop: 12 }}>View my public shop →</Link>
        </div>
      </div>
    </>
  )
}

function Products({ myProducts }) {
  const { deleteProduct, updateProduct, getCategory } = useStore()
  const [q, setQ] = useState('')
  const list = myProducts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>My products ({myProducts.length})</h2>
        <input className="mini-search" placeholder="Search products" aria-label="Search my products" value={q} onChange={(e) => setQ(e.target.value)} />
        <Link to="/seller/products/new" className="btn"><Icon name="plus" size={18} />Add product</Link>
      </div>
      {list.length === 0 ? <EmptyState icon="box" title="No products" text="Add your first product to start selling." /> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td><div className="t-prod"><ProductImage product={p} className="thumb sm" size={120} /><Link to={`/product/${p.id}`}>{p.name}</Link></div></td>
                  <td>{getCategory(p.categoryId)?.name}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>
                    <input className="stock-input" type="number" min="0" value={p.stock} aria-label={`Stock for ${p.name}`}
                      onChange={(e) => updateProduct(p.id, { stock: Math.max(0, Number(e.target.value)) })} />
                    {p.stock === 0 && <span className="status s-cancelled">Out</span>}
                  </td>
                  <td>{p.rating ? p.rating.toFixed(1) : '–'}</td>
                  <td className="t-actions">
                    <Link to={`/seller/products/${p.id}/edit`} className="icon-btn" aria-label={`Edit ${p.name}`}><Icon name="edit" size={18} /></Link>
                    <button className="icon-btn danger" aria-label={`Delete ${p.name}`} onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id) }}><Icon name="trash" size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Orders({ myOrders }) {
  const { updateOrderStatus } = useStore()
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? myOrders : myOrders.filter((o) => o.status === filter)

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Orders</h2>
        <div className="seg">
          {['All', ...ORDER_STATUSES].map((s) => <button key={s} aria-selected={filter === s} onClick={() => setFilter(s)}>{s}</button>)}
        </div>
      </div>
      {list.length === 0 ? <p className="muted">No orders here yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id}>
                  <td><b>{o.id}</b><br /><span className="muted small">{formatDate(o.date)}</span></td>
                  <td>{o.address.name}<br /><span className="muted small">{o.address.city} · {o.address.phone}</span></td>
                  <td>{o.items.map((i) => <div key={i.productId} className="small">{i.qty} × {i.name}</div>)}</td>
                  <td>{formatPrice(o.shopTotal)}</td>
                  <td className="small">{o.payment}</td>
                  <td>
                    <label className="sr-only" htmlFor={'st-' + o.id}>Status of {o.id}</label>
                    <select id={'st-' + o.id} className={'status-select s-' + o.status.toLowerCase()} value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}>
                      {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ShopSettings({ shop }) {
  const { updateShop, cities, showToast } = useStore()
  const [form, setForm] = useState({ name: shop.name, city: shop.city, description: shop.description, color: shop.color })

  function save(e) {
    e.preventDefault()
    if (form.name.trim().length < 3) return showToast('Shop name is too short', 'error')
    updateShop(shop.id, { ...form, name: form.name.trim() })
    showToast('Shop details saved')
  }

  return (
    <form className="panel" onSubmit={save}>
      <h2>Shop settings</h2>
      <div className="form-grid">
        <div className="field"><label htmlFor="ss-name">Shop name</label><input id="ss-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="field"><label htmlFor="ss-city">City</label><select id="ss-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div className="field span2"><label htmlFor="ss-desc">About your shop</label><textarea id="ss-desc" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="field"><label htmlFor="ss-color">Brand colour</label><input id="ss-color" type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></div>
      </div>
      <button className="btn">Save shop</button>
    </form>
  )
}

export default function SellerDashboard() {
  usePageTitle('Seller dashboard')
  const { user, getShop, products, orders } = useStore()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'overview'
  const setTab = (t) => setParams({ tab: t })

  const shop = getShop(user.shopId)
  if (!shop) return <div className="wrap page"><EmptyState title="Shop not found" /></div>

  const myProducts = products.filter((p) => p.shopId === shop.id)
  const myOrders = orders.filter((o) => o.items.some((i) => i.shopId === shop.id)).map((o) => shopPart(o, shop.id))

  return (
    <div className="wrap page dash">
      <aside className="dash-side">
        <div className="dash-shop">
          <span className="avatar lg" style={{ background: shop.color }}>{shop.name[0]}</span>
          <div><b>{shop.name}</b><span className="muted small">{shop.city}</span></div>
        </div>
        <nav>
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}><Icon name={t.icon} size={18} />{t.label}</button>
          ))}
          <Link to="/seller/products/new"><Icon name="plus" size={18} />Add product</Link>
        </nav>
      </aside>

      <div className="dash-main">
        <h1 className="page-title">Assalam-o-Alaikum, {user.name.split(' ')[0]}</h1>
        {shop.status === 'pending' && (
          <div className="banner warn"><Icon name="shield" />Your shop is <b>under review</b>. You can add products now; they will go live once an admin approves your shop.</div>
        )}
        {shop.status === 'rejected' && (
          <div className="banner danger"><Icon name="shield" />Your shop was not approved. Please update your shop details and contact support.</div>
        )}
        {tab === 'overview' && <Overview shop={shop} myProducts={myProducts} myOrders={myOrders} setTab={setTab} />}
        {tab === 'products' && <Products myProducts={myProducts} />}
        {tab === 'orders' && <Orders myOrders={myOrders} />}
        {tab === 'shop' && <ShopSettings shop={shop} key={shop.id} />}
      </div>
    </div>
  )
}
