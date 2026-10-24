import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { Photo, ProductImage } from '../components/Common'
import { usePageTitle } from '../helpers'
import Icon from '../components/Icon'
import { photo } from '../data/seed'

const STORIES = [
  { img: 37757334, title: 'Stitched by hand', text: 'Phulkari and tanka work takes weeks of patient needlework. Every stitch is made by a real person.', link: '/shop?cat=clothing' },
  { img: 15898443, title: 'Painted in Multan', text: 'Blue pottery is shaped, painted and fired in family workshops that go back generations.', link: '/shop?cat=pottery' },
  { img: 37619027, title: 'Printed in Sindh', text: 'Ajrak is block-printed by hand with natural indigo and madder, one wooden block at a time.', link: '/shop?q=ajrak' },
]

export default function Home() {
  const { categories, liveProducts, shops, getCategory, user } = useStore()
  usePageTitle(null)

  const trending = [...liveProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5)
  const newest = [...liveProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
  const deals = liveProducts.filter((p) => p.oldPrice).slice(0, 5)
  const topShops = shops.filter((s) => s.status === 'approved').slice(0, 4)

  const picks = [
    { cat: 'gifts', label: 'Eid gift boxes' },
    { cat: 'art', label: 'Calligraphy art' },
    { cat: 'beauty', label: 'Organic beauty' },
    { cat: 'bags', label: 'Handmade bags' },
    { cat: 'pottery', label: 'Blue pottery' },
  ]

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-banner">
            <div className="hero-text">
              <span className="pill">500+ verified artisans · 40 cities</span>
              <h1>Discover one-of-a-kind pieces, made by hand across Pakistan.</h1>
              <p>Khussas from Multan, Ajrak from Hala, kundan from Lahore. Bought directly from the people who make them, with Cash on Delivery.</p>
              <div className="btn-row">
                <Link to="/shop" className="btn big dark">Start shopping <Icon name="arrow" size={18} /></Link>
                <Link to="/sell" className="btn big outline">Sell on Kaarigar</Link>
              </div>
            </div>
            <div className="hero-img">
              <Photo src={photo(32822921, 1200)} alt="Women artisans embroidering fabric together in Sindh" size={1200} eager />
              <span className="hero-tag"><Icon name="pin" size={14} />Women artisans, Sukkur</span>
            </div>
          </div>

          <div className="circles">
            {categories.slice(0, 6).map((c) => (
              <Link to={`/shop?cat=${c.id}`} className="circle" key={c.id}>
                <div className="circle-img" style={{ background: c.color }}>
                  {c.image ? <Photo src={c.image} alt="" size={300} /> : <Icon name={c.icon} />}
                </div>
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
            {picks.map((pk, i) => {
              const c = getCategory(pk.cat)
              if (!c) return null
              return (
                <Link to={`/shop?cat=${pk.cat}`} className="pick" key={pk.cat}>
                  <Photo src={c.image} alt="" size={i === 0 ? 900 : 600} className="pick-img" />
                  <span>{pk.label} <Icon name="arrow" size={14} /></span>
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

      <section className="sec stories-sec">
        <div className="wrap">
          <div className="sh"><h2>The hands behind Kaarigar</h2><Link to="/sell">Become a seller <Icon name="arrow" size={18} /></Link></div>
          <div className="stories">
            {STORIES.map((s) => (
              <Link to={s.link} className="story" key={s.title}>
                <Photo src={photo(s.img, 900)} alt="" size={700} className="story-img" />
                <div><h3>{s.title}</h3><p>{s.text}</p><span className="link">Shop the craft →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sh"><h2>Shops we love</h2><Link to="/shop">Browse all <Icon name="arrow" size={18} /></Link></div>
          <div className="shops">
            {topShops.map((s) => {
              const items = liveProducts.filter((p) => p.shopId === s.id).slice(0, 3)
              return (
                <Link to={`/shop/${s.id}`} className="shopc" key={s.id}>
                  <div className="row">
                    {[0, 1, 2].map((i) => items[i]
                      ? <ProductImage key={i} product={items[i]} size={300} />
                      : <Photo key={i} src={s.cover} alt="" size={300} className="ph" />)}
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
              <Photo src={photo(34230986, 1400)} alt="" size={1400} className="sell-bg" />
              <div className="sell-inner">
                <h2>Have a hunar? Open your Kaarigar shop for free and reach buyers across Pakistan.</h2>
                <Link to="/sell" className="btn white">Start selling <Icon name="arrow" size={18} /></Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
