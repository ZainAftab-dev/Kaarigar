import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { Breadcrumbs, EmptyState } from '../components/Common'
import Icon from '../components/Icon'

const PAGE_SIZE = 12

export default function Shop() {
  const { liveProducts, categories, cities, getShop, getCategory } = useStore()
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  // read filters from the URL so links like /shop?cat=jewellery work
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''
  const city = params.get('city') || ''
  const sort = params.get('sort') || 'relevance'
  const min = params.get('min') || ''
  const max = params.get('max') || ''
  const rating = params.get('rating') || ''
  const free = params.get('free') === '1'
  const deals = params.get('deals') === '1'

  function setFilter(key, value) {
    const next = new URLSearchParams(params)
    if (value === '' || value === false || value === null) next.delete(key)
    else next.set(key, value === true ? '1' : value)
    setParams(next)
    setVisible(PAGE_SIZE)
  }

  function clearAll() {
    setParams(q ? { q } : {})
  }

  // ---- filtering ----
  let list = liveProducts.filter((p) => {
    const shop = getShop(p.shopId)
    if (q && !(p.name + ' ' + shop.name + ' ' + p.description).toLowerCase().includes(q.toLowerCase())) return false
    if (cat && p.categoryId !== cat) return false
    if (city && shop.city !== city) return false
    if (min && p.price < Number(min)) return false
    if (max && p.price > Number(max)) return false
    if (rating && p.rating < Number(rating)) return false
    if (free && !p.freeDelivery) return false
    if (deals && !p.oldPrice) return false
    return true
  })

  // ---- sorting ----
  list = [...list]
  if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
  if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
  if (sort === 'newest') list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  if (sort === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount)

  const category = getCategory(cat)
  const title = q ? `Results for "${q}"` : category ? category.name : deals ? 'Deals' : 'All handmade products'

  const chips = []
  if (category) chips.push(['cat', category.name])
  if (city) chips.push(['city', city])
  if (min || max) chips.push(['price', `Rs. ${min || 0} – ${max || 'any'}`])
  if (rating) chips.push(['rating', `${rating}+ stars`])
  if (free) chips.push(['free', 'Free delivery'])
  if (deals) chips.push(['deals', 'On sale'])

  function removeChip(key) {
    if (key === 'price') {
      const next = new URLSearchParams(params); next.delete('min'); next.delete('max'); setParams(next)
    } else setFilter(key, '')
  }

  return (
    <div className="wrap page">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: category ? '/shop' : null }, ...(category ? [{ label: category.name }] : [])]} />
      <div className="list-head">
        <div>
          <h1>{title}</h1>
          <p className="muted">{list.length} {list.length === 1 ? 'item' : 'items'}</p>
        </div>
        <div className="list-tools">
          <button className="btn outline filter-btn" onClick={() => setShowFilters(true)}><Icon name="filter" size={18} />Filters</button>
          <label className="sort">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setFilter('sort', e.target.value === 'relevance' ? '' : e.target.value)}>
              <option value="relevance">Sort: Relevance</option>
              <option value="popular">Most popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="chips">
          {chips.map(([key, label]) => (
            <button key={key} className="chip" onClick={() => removeChip(key)} aria-label={`Remove filter ${label}`}>
              {label} <Icon name="close" size={14} />
            </button>
          ))}
          <button className="link-btn" onClick={clearAll}>Clear all</button>
        </div>
      )}

      <div className="shop-layout">
        <div className={'drawer-bg' + (showFilters ? ' open' : '')} onClick={() => setShowFilters(false)} />
        <aside className={'filters' + (showFilters ? ' open' : '')}>
          <div className="filters-head">
            <h2>Filters</h2>
            <button className="icon-btn" aria-label="Close filters" onClick={() => setShowFilters(false)}><Icon name="close" /></button>
          </div>

          <fieldset>
            <legend>Category</legend>
            <label className="radio"><input type="radio" name="cat" checked={!cat} onChange={() => setFilter('cat', '')} />All categories</label>
            {categories.map((c) => (
              <label className="radio" key={c.id}>
                <input type="radio" name="cat" checked={cat === c.id} onChange={() => setFilter('cat', c.id)} />{c.name}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Price (Rs.)</legend>
            <div className="price-inputs">
              <input type="number" min="0" placeholder="Min" aria-label="Minimum price" value={min} onChange={(e) => setFilter('min', e.target.value)} />
              <span>to</span>
              <input type="number" min="0" placeholder="Max" aria-label="Maximum price" value={max} onChange={(e) => setFilter('max', e.target.value)} />
            </div>
            <div className="quick-prices">
              <button className="chip" onClick={() => { const n = new URLSearchParams(params); n.delete('min'); n.set('max', '2000'); setParams(n) }}>Under 2,000</button>
              <button className="chip" onClick={() => { const n = new URLSearchParams(params); n.set('min', '2000'); n.set('max', '5000'); setParams(n) }}>2,000 – 5,000</button>
              <button className="chip" onClick={() => { const n = new URLSearchParams(params); n.set('min', '5000'); n.delete('max'); setParams(n) }}>5,000+</button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Seller city</legend>
            <select value={city} onChange={(e) => setFilter('city', e.target.value)} aria-label="Seller city">
              <option value="">Any city</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </fieldset>

          <fieldset>
            <legend>Rating</legend>
            {['4.5', '4'].map((r) => (
              <label className="radio" key={r}><input type="radio" name="rating" checked={rating === r} onChange={() => setFilter('rating', r)} />{r} stars &amp; up</label>
            ))}
            <label className="radio"><input type="radio" name="rating" checked={!rating} onChange={() => setFilter('rating', '')} />Any rating</label>
          </fieldset>

          <fieldset>
            <legend>Special offers</legend>
            <label className="check"><input type="checkbox" checked={free} onChange={(e) => setFilter('free', e.target.checked)} />Free delivery</label>
            <label className="check"><input type="checkbox" checked={deals} onChange={(e) => setFilter('deals', e.target.checked)} />On sale</label>
          </fieldset>

          <button className="btn full show-results" onClick={() => setShowFilters(false)}>Show {list.length} results</button>
        </aside>

        <div>
          {list.length === 0 ? (
            <EmptyState icon="search" title="No products found" text="Try a different search or remove some filters."
              action={<button className="btn" onClick={() => setParams({})}>Clear all filters</button>} />
          ) : (
            <>
              <div className="grid g4">{list.slice(0, visible).map((p) => <ProductCard key={p.id} product={p} />)}</div>
              {visible < list.length && (
                <div className="center"><button className="btn outline" onClick={() => setVisible(visible + PAGE_SIZE)}>Load more ({list.length - visible} left)</button></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
