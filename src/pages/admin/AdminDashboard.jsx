import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { ProductImage } from '../../components/Common'
import { usePageTitle } from '../../helpers'
import Icon from '../../components/Icon'
import { ORDER_STATUSES, formatDate, formatPrice } from '../../utils'

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'chart' },
  { id: 'sellers', label: 'Sellers', icon: 'store' },
  { id: 'products', label: 'Products', icon: 'box' },
  { id: 'orders', label: 'Orders', icon: 'cart' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'categories', label: 'Categories', icon: 'grid' },
]

function Overview({ setTab }) {
  const { users, shops, products, orders } = useStore()
  const revenue = orders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0)
  const pendingShops = shops.filter((s) => s.status === 'pending')

  const byStatus = ORDER_STATUSES.map((s) => ({ s, n: orders.filter((o) => o.status === s).length }))
  const maxN = Math.max(1, ...byStatus.map((x) => x.n))

  return (
    <>
      <div className="stats">
        <div className="stat"><Icon name="cash" /><span>Total revenue</span><b>{formatPrice(revenue)}</b></div>
        <div className="stat"><Icon name="cart" /><span>Orders</span><b>{orders.length}</b></div>
        <div className="stat"><Icon name="store" /><span>Shops</span><b>{shops.length}</b></div>
        <div className="stat"><Icon name="users" /><span>Users</span><b>{users.length}</b></div>
      </div>
      <div className="dash-grid">
        <div className="panel">
          <h2>Orders by status</h2>
          {byStatus.map(({ s, n }) => (
            <div className="hbar" key={s}>
              <span>{s}</span>
              <div><span className={'s-' + s.toLowerCase()} style={{ width: (n / maxN) * 100 + '%' }} /></div>
              <b>{n}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <h2>Pending approvals</h2>
          {pendingShops.length === 0 && <p className="muted">No shops waiting for approval.</p>}
          {pendingShops.map((s) => (
            <button key={s.id} className="attn" onClick={() => setTab('sellers')}><Icon name="store" size={18} />{s.name} ({s.city}) is waiting for review</button>
          ))}
          <p className="muted small" style={{ marginTop: 12 }}>{products.length} products listed in total.</p>
        </div>
      </div>
    </>
  )
}

function Sellers() {
  const { shops, users, products, updateShop, showToast } = useStore()
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? shops : shops.filter((s) => s.status === filter)

  function setStatus(shop, status) {
    updateShop(shop.id, { status })
    const msg = { approved: 'approved and is now live', rejected: 'rejected', suspended: 'suspended' }[status]
    showToast(`${shop.name} ${msg}`, status === 'approved' ? 'success' : 'info')
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Sellers &amp; shops</h2>
        <div className="seg">
          {['all', 'pending', 'approved', 'suspended', 'rejected'].map((s) => (
            <button key={s} aria-selected={filter === s} onClick={() => setFilter(s)}>{s[0].toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Shop</th><th>Owner</th><th>City</th><th>Products</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {list.map((s) => {
              const owner = users.find((u) => u.id === s.ownerId)
              return (
                <tr key={s.id}>
                  <td><div className="t-prod"><span className="avatar" style={{ background: s.color }}>{s.name[0]}</span><b>{s.name}</b></div></td>
                  <td>{owner?.name || '—'}<br /><span className="muted small">{owner?.email}</span></td>
                  <td>{s.city}</td>
                  <td>{products.filter((p) => p.shopId === s.id).length}</td>
                  <td><span className={'status s-' + s.status}>{s.status}</span></td>
                  <td className="t-actions">
                    {s.status !== 'approved' && <button className="btn sm" onClick={() => setStatus(s, 'approved')}>Approve</button>}
                    {s.status === 'pending' && <button className="btn sm outline" onClick={() => setStatus(s, 'rejected')}>Reject</button>}
                    {s.status === 'approved' && <button className="btn sm outline" onClick={() => setStatus(s, 'suspended')}>Suspend</button>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {list.length === 0 && <p className="muted">No shops in this list.</p>}
    </div>
  )
}

function Products() {
  const { products, getShop, getCategory, deleteProduct } = useStore()
  const [q, setQ] = useState('')
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>All products ({products.length})</h2>
        <input className="mini-search" placeholder="Search products" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Product</th><th>Shop</th><th>Category</th><th>Price</th><th>Stock</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td><div className="t-prod"><ProductImage product={p} className="thumb sm" size={120} /><Link to={`/product/${p.id}`}>{p.name}</Link></div></td>
                <td>{getShop(p.shopId)?.name}</td>
                <td>{getCategory(p.categoryId)?.name || '—'}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td className="t-actions">
                  <button className="icon-btn danger" aria-label={`Remove ${p.name}`} onClick={() => { if (confirm(`Remove "${p.name}" from Kaarigar?`)) deleteProduct(p.id) }}><Icon name="trash" size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Orders() {
  const { orders, updateOrderStatus } = useStore()
  return (
    <div className="panel">
      <h2>All orders ({orders.length})</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><b>{o.id}</b><br /><span className="muted small">{formatDate(o.date)}</span></td>
                <td>{o.address.name}<br /><span className="muted small">{o.address.city}</span></td>
                <td>{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td>{formatPrice(o.total)}</td>
                <td className="small">{o.payment}</td>
                <td>
                  <label className="sr-only" htmlFor={'ad-' + o.id}>Status</label>
                  <select id={'ad-' + o.id} className={'status-select s-' + o.status.toLowerCase()} value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}>
                    {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Users() {
  const { users } = useStore()
  return (
    <div className="panel">
      <h2>Users ({users.length})</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Role</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><div className="t-prod"><span className="avatar">{u.name[0]}</span>{u.name}</div></td>
                <td>{u.email}</td><td>{u.phone}</td><td>{u.city}</td>
                <td><span className={'status role-' + u.role}>{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Categories() {
  const { categories, products, addCategory, deleteCategory, showToast } = useStore()
  const [name, setName] = useState('')

  function add(e) {
    e.preventDefault()
    if (name.trim().length < 3) return showToast('Category name is too short', 'error')
    const err = addCategory(name)
    if (err) return showToast(err, 'error')
    setName('')
  }

  return (
    <div className="panel">
      <h2>Categories</h2>
      <form className="promo-row" onSubmit={add} style={{ maxWidth: 460 }}>
        <label htmlFor="cat-name" className="sr-only">New category name</label>
        <input id="cat-name" placeholder="New category, e.g. Wedding" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn"><Icon name="plus" size={18} />Add</button>
      </form>
      <div className="cat-list">
        {categories.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length
          return (
            <div className="cat-item" key={c.id}>
              <span className="cat-ic" style={{ background: c.color }}><Icon name={c.icon} size={20} /></span>
              <div><b>{c.name}</b><span className="muted small">{count} products</span></div>
              <button className="icon-btn danger" aria-label={`Delete ${c.name}`} disabled={count > 0}
                title={count > 0 ? 'Move or delete its products first' : 'Delete'}
                onClick={() => deleteCategory(c.id)}><Icon name="trash" size={18} /></button>
            </div>
          )
        })}
      </div>
      <p className="muted small">A category can only be deleted when it has no products.</p>
    </div>
  )
}

export default function AdminDashboard() {
  usePageTitle('Admin panel')
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') || 'overview'
  const setTab = (t) => setParams({ tab: t })
  const { shops } = useStore()
  const pending = shops.filter((s) => s.status === 'pending').length

  return (
    <div className="wrap page dash">
      <aside className="dash-side">
        <div className="dash-shop"><span className="avatar lg" style={{ background: '#1F2937' }}><Icon name="shield" size={20} /></span><div><b>Admin panel</b><span className="muted small">Kaarigar</span></div></div>
        <nav>
          {TABS.map((t) => (
            <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} size={18} />{t.label}
              {t.id === 'sellers' && pending > 0 && <span className="count">{pending}</span>}
            </button>
          ))}
        </nav>
      </aside>
      <div className="dash-main">
        <h1 className="page-title">{TABS.find((t) => t.id === tab)?.label}</h1>
        {tab === 'overview' && <Overview setTab={setTab} />}
        {tab === 'sellers' && <Sellers />}
        {tab === 'products' && <Products />}
        {tab === 'orders' && <Orders />}
        {tab === 'users' && <Users />}
        {tab === 'categories' && <Categories />}
      </div>
    </div>
  )
}
