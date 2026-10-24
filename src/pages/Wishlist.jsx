import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { EmptyState } from '../components/Common'
import { usePageTitle } from '../helpers'

export default function Wishlist() {
  usePageTitle('Favourites')
  const { wishlist, liveProducts } = useStore()
  const items = liveProducts.filter((p) => wishlist.includes(p.id))

  return (
    <div className="wrap page">
      <h1 className="page-title">Favourites <span className="muted">({items.length})</span></h1>
      {items.length === 0
        ? <EmptyState icon="heart" title="No favourites yet" text="Tap the heart on any item to save it here."
            action={<Link to="/shop" className="btn">Explore products</Link>} />
        : <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
    </div>
  )
}
