import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { ProductImage } from '../components/Common'
import Icon from '../components/Icon'

export default function Home() {
  const { categories, liveProducts, shops, getCategory, user } = useStore()

  const trending = [...liveProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5)
  const newest = [...liveProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
  const deals = liveProducts.filter((p) => p.oldPrice).slice(0, 5)
  const topShops = shops.filter((s) => s.status === 'approved').slice(0, 4)

  const picks = [
    { cat: 'gifts', label: 'Eid gift boxes' },
    { cat: 'art', label: 'Calligraphy art' },
    { cat: 'beauty', label: 'Organic beauty' },
    { cat: 'bags', label: 'Mirror-work bags' },
    { cat: 'pottery', label: 'Blue pottery' },
  ]

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Discover one-of-a-kind pieces,<br />made by hand across Pakistan.</h1>
          <div className="circles">
            {categories.slice(0, 6).map((c) => (
              <Link to={`/shop?cat=${c.id}`} className="circle" key={c.id}>
                <div className="ph" style={{ background: c.color }}><Icon name={c.icon} /></div>
                {c.name.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh"><h2>Trending right now</h2><Link to="/shop?sort=popular">See all <Icon name="arrow" size={18} /></Link></div>
          <div className="grid">{trending.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="sec pt0">
        <div className="wrap">
          <div className="sh"><h2>Our picks for Eid gifting</h2><Link to="/shop?cat=gifts">Shop gifts <Icon name="arrow" size={18} /></Link></div>
          <div className="picks">
            {picks.map((pk) => {
              const c = getCategory(pk.cat)
              if (!c) return null
              return (
                <Link to={`/shop?cat=${pk.cat}`} className="pick" key={pk.cat}>
                  <div className="ph" style={{ background: c.color }}><Icon name={c.icon} /></div>
                  <span>{pk.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {deals.length > 0 && (
        <section className="sec pt0">
          <div className="wrap">
            <div className="sh"><h2>Deals on handmade</h2><Link to="/shop?deals=1">All deals <Icon name="arrow" size={18} /></Link></div>
            <div className="grid">{deals.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        </section>
      )}

      <section className="sec pt0">
        <div className="wrap">
          <div className="sh"><h2>Shops we love</h2><Link to="/shop">Browse all <Icon name="arrow" size={18} /></Link></div>
          <div className="shops">
            {topShops.map((s) => {
              const items = liveProducts.filter((p) => p.shopId === s.id).slice(0, 3)
              return (
                <Link to={`/shop/${s.id}`} className="shopc" key={s.id}>
                  <div className="row">
                    {[0, 1, 2].map((i) => items[i]
                      ? <ProductImage key={i} product={items[i]} />
                      : <div key={i} className="ph" style={{ background: '#F3EEE6' }} />)}
                  </div>
                  <div className="info"><b>{s.name}</b><span><Icon name="pin" size={14} />{s.city}</span></div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sec pt0">
        <div className="wrap">
          <div className="sh"><h2>Fresh from the workshop</h2><Link to="/shop?sort=newest">See new arrivals <Icon name="arrow" size={18} /></Link></div>
          <div className="grid">{newest.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="sec pt0">
        <div className="wrap">
          <div className="trust">
            <div><Icon name="cash" size={30} /><div><b>Cash on Delivery</b><p>Plus JazzCash and Easypaisa</p></div></div>
            <div><Icon name="shield" size={30} /><div><b>Verified sellers</b><p>Every shop is checked by our team</p></div></div>
            <div><Icon name="truck" size={30} /><div><b>Nationwide delivery</b><p>From Karachi to Gilgit</p></div></div>
            <div><Icon name="heart" size={30} /><div><b>Supports artisans</b><p>Sellers keep 90% of every sale</p></div></div>
          </div>
        </div>
      </section>

      {(!user || user.role === 'buyer') && (
        <section className="sec pt0">
          <div className="wrap">
            <div className="sell-banner">
              <h2>Have a hunar? Open your Kaarigar shop for free and reach buyers across Pakistan.</h2>
              <Link to="/sell" className="btn white">Start selling <Icon name="arrow" size={18} /></Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
