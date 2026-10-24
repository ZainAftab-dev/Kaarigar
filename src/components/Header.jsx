import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils'
import Icon from './Icon'

function SearchBox() {
  const { liveProducts } = useStore()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [text, setText] = useState(params.get('q') || '')
  const [open, setOpen] = useState(false)

  const suggestions = text.trim().length > 1
    ? liveProducts.filter((p) => p.name.toLowerCase().includes(text.toLowerCase())).slice(0, 5)
    : []

  function submit(e) {
    e.preventDefault()
    setOpen(false)
    navigate('/shop' + (text.trim() ? '?q=' + encodeURIComponent(text.trim()) : ''))
  }

  return (
    <form className="search" role="search" onSubmit={submit}>
      <label htmlFor="site-search" className="sr-only">Search Kaarigar</label>
      <input
        id="site-search" type="search" autoComplete="off" value={text}
        placeholder="Search for khussas, pottery, jewellery and more"
        onChange={(e) => { setText(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      <button type="submit" aria-label="Search"><Icon name="search" /></button>
      {open && suggestions.length > 0 && (
        <ul className="suggest">
          {suggestions.map((p) => (
            <li key={p.id}>
              <Link to={`/product/${p.id}`} onClick={() => { setOpen(false); setText('') }}>
                <span>{p.name}</span><b>{formatPrice(p.price)}</b>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

function UserMenu() {
  const { user, logout } = useStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function close(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  if (!user) {
    return <Link to="/login" className="icon-btn" aria-label="Sign in"><Icon name="user" /><span className="lbl">Sign in</span></Link>
  }

  return (
    <div className="user-menu" ref={ref}>
      <button className="icon-btn" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        <span className="avatar">{user.name[0]}</span><span className="lbl">{user.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className="dropdown" onClick={() => setOpen(false)}>
          <p className="dd-head"><b>{user.name}</b><span>{user.email}</span></p>
          {user.role === 'seller' && <Link to="/seller"><Icon name="store" size={18} />Seller dashboard</Link>}
          {user.role === 'admin' && <Link to="/admin"><Icon name="shield" size={18} />Admin panel</Link>}
          <Link to="/orders"><Icon name="box" size={18} />My orders</Link>
          <Link to="/wishlist"><Icon name="heart" size={18} />Favourites</Link>
          <Link to="/account"><Icon name="settings" size={18} />Account settings</Link>
          <button onClick={() => { logout(); navigate('/') }}><Icon name="logout" size={18} />Log out</button>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { categories, cartCount, wishlist, user } = useStore()
  const [drawer, setDrawer] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="promo">Free delivery on orders above Rs. 3,000 · Cash on Delivery across Pakistan</div>
      <header className="site-header">
        <div className="wrap">
          <div className="hrow">
            <button className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setDrawer(true)}><Icon name="menu" /></button>
            <Link to="/" className="logo" aria-label="Kaarigar home">Kaarigar</Link>
            <SearchBox key={location.search} />
            <div className="icons">
              <UserMenu />
              <Link to="/wishlist" className="icon-btn" aria-label={`Favourites, ${wishlist.length} items`}>
                <Icon name="heart" />{wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
                <Icon name="cart" />{cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
            </div>
          </div>
          <nav className="cats" aria-label="Categories">
            <NavLink to="/shop" end>All</NavLink>
            {categories.map((c) => <Link key={c.id} to={`/shop?cat=${c.id}`}>{c.name}</Link>)}
            {(!user || user.role === 'buyer') && <Link to="/sell" className="sell-link">Sell on Kaarigar</Link>}
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={'drawer-bg' + (drawer ? ' open' : '')} onClick={() => setDrawer(false)} />
      <aside className={'drawer' + (drawer ? ' open' : '')} aria-hidden={!drawer}
        onClick={(e) => { if (e.target.closest('a')) setDrawer(false) }}>
        <div className="drawer-head">
          <span className="logo">Kaarigar</span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setDrawer(false)}><Icon name="close" /></button>
        </div>
        <p className="drawer-title">Categories</p>
        <Link to="/shop">All products</Link>
        {categories.map((c) => <Link key={c.id} to={`/shop?cat=${c.id}`}><Icon name={c.icon} size={18} />{c.name}</Link>)}
        <p className="drawer-title">Account</p>
        {user ? (
          <>
            {user.role === 'seller' && <Link to="/seller">Seller dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin">Admin panel</Link>}
            <Link to="/orders">My orders</Link>
            <Link to="/account">Account settings</Link>
          </>
        ) : (
          <><Link to="/login">Sign in</Link><Link to="/signup">Create account</Link></>
        )}
        <Link to="/sell">Sell on Kaarigar</Link>
        <Link to="/help">Help &amp; FAQ</Link>
      </aside>
    </>
  )
}
