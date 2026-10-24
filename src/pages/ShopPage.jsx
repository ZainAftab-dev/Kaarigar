import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { EmptyState, Photo } from '../components/Common'
import { usePageTitle } from '../helpers'
import Icon from '../components/Icon'

export default function ShopPage() {
  const { id } = useParams()
  const { getShop, liveProducts, categories, orders, showToast } = useStore()
  const [cat, setCat] = useState('')
  const [following, setFollowing] = useState(false)

  const shop = getShop(id)
  usePageTitle(shop && shop.status === 'approved' ? shop.name : 'Shop not found')
  if (!shop || shop.status !== 'approved') {
    return <div className="wrap page"><EmptyState icon="store" title="Shop not found" action={<Link to="/shop" className="btn">Browse products</Link>} /></div>
  }

  const items = liveProducts.filter((p) => p.shopId === shop.id)
  const shown = cat ? items.filter((p) => p.categoryId === cat) : items
  const shopCats = categories.filter((c) => items.some((p) => p.categoryId === c.id))
  const sales = orders.filter((o) => o.items.some((i) => i.shopId === shop.id)).length + 120
  const avg = items.length ? (items.reduce((s, p) => s + p.rating, 0) / items.length).toFixed(1) : '–'

  return (
    <>
      <div className="shop-cover" style={{ background: `linear-gradient(120deg, ${shop.color}22, ${shop.color}55)` }}>
        {shop.cover && <Photo src={shop.cover} alt="" size={1600} eager />}
      </div>
      <div className="wrap page shop-page">
        <div className="shop-head">
          <span className="avatar xl" style={{ background: shop.color }}>{shop.name[0]}</span>
          <div className="shop-meta">
            <h1>{shop.name} <span className="verified"><Icon name="shield" size={16} />Verified</span></h1>
            <p className="muted"><Icon name="pin" size={15} /> {shop.city} · On Kaarigar since {shop.since}</p>
            <div className="shop-stats">
              <span><b>{avg}</b> rating</span><span><b>{sales}</b> sales</span><span><b>{items.length}</b> items</span>
            </div>
          </div>
          <div className="shop-btns">
            <button className={'btn ' + (following ? 'outline' : '')} onClick={() => { setFollowing(!following); showToast(following ? 'Unfollowed shop' : `You are following ${shop.name}`) }}>
              <Icon name="heart" size={18} filled={following} />{following ? 'Following' : 'Follow shop'}
            </button>
            <button className="btn outline" onClick={() => showToast('Messaging will be available when the backend is connected', 'info')}>Message seller</button>
          </div>
        </div>
        <p className="shop-about">{shop.description}</p>

        <div className="shop-body">
          <aside className="shop-cats">
            <h2>Sections</h2>
            <button className={!cat ? 'on' : ''} onClick={() => setCat('')}>All items <span>{items.length}</span></button>
            {shopCats.map((c) => (
              <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>
                {c.name} <span>{items.filter((p) => p.categoryId === c.id).length}</span>
              </button>
            ))}
          </aside>
          <div>
            {shown.length === 0
              ? <EmptyState icon="box" title="No items yet" text="This shop hasn't listed anything in this section." />
              : <div className="grid g4">{shown.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
          </div>
        </div>
      </div>
    </>
  )
}
