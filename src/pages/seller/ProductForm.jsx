import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { EmptyState, ProductImage } from '../../components/Common'
import { usePageTitle } from '../../helpers'
import Icon from '../../components/Icon'

// Shrinks an uploaded photo so it fits in browser storage
function resizeImage(file, maxSize = 700) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function ProductForm() {
  const { id } = useParams()
  usePageTitle(id ? 'Edit product' : 'Add product')
  const navigate = useNavigate()
  const { user, categories, getProduct, addProduct, updateProduct, showToast } = useStore()
  const editing = Boolean(id)
  const existing = editing ? getProduct(id) : null

  const [form, setForm] = useState(() => existing
    ? { name: existing.name, categoryId: existing.categoryId, price: existing.price, oldPrice: existing.oldPrice || '', stock: existing.stock, description: existing.description, freeDelivery: existing.freeDelivery, image: existing.image || '' }
    : { name: '', categoryId: categories[0]?.id || '', price: '', oldPrice: '', stock: 1, description: '', freeDelivery: false, image: '' })
  const [errors, setErrors] = useState({})

  if (editing && (!existing || existing.shopId !== user.shopId)) {
    return <div className="wrap page"><EmptyState title="Product not found" action={<Link to="/seller?tab=products" className="btn">Back to products</Link>} /></div>
  }

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setErrors({ ...errors, [name]: '' })
  }

  async function upload(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return showToast('Please choose an image file', 'error')
    try {
      const data = await resizeImage(file)
      setForm((f) => ({ ...f, image: data }))
    } catch {
      showToast('Could not read this image', 'error')
    }
  }

  function submit(e) {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 3) er.name = 'Product name must be at least 3 characters.'
    if (!form.price || Number(form.price) <= 0) er.price = 'Enter a valid price.'
    if (form.oldPrice && Number(form.oldPrice) <= Number(form.price)) er.oldPrice = 'Original price must be higher than the sale price.'
    if (form.stock === '' || Number(form.stock) < 0) er.stock = 'Enter stock (0 or more).'
    if (form.description.trim().length < 20) er.description = 'Please write at least 20 characters so buyers know what they are getting.'
    setErrors(er)
    if (Object.keys(er).length) return

    const data = {
      name: form.name.trim(), categoryId: form.categoryId,
      price: Number(form.price), oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock), description: form.description.trim(),
      freeDelivery: form.freeDelivery, image: form.image, shopId: user.shopId,
    }
    if (editing) updateProduct(id, data)
    else addProduct(data)
    navigate('/seller?tab=products')
  }

  const f = (name) => ({ name, id: 'pf-' + name, value: form[name], onChange: change, 'aria-invalid': !!errors[name] })
  const preview = { ...form, price: Number(form.price) || 0, name: form.name || 'Product name' }

  return (
    <div className="wrap page">
      <Link to="/seller?tab=products" className="back-link"><Icon name="back" size={18} />Back to products</Link>
      <h1 className="page-title">{editing ? 'Edit product' : 'Add a new product'}</h1>

      <form className="pf-layout" onSubmit={submit} noValidate>
        <div>
          <section className="panel">
            <h2>Photo</h2>
            <div className="upload">
              <ProductImage product={preview} className="upload-preview" />
              <div>
                <label className="btn outline" htmlFor="pf-file"><Icon name="upload" size={18} />{form.image ? 'Change photo' : 'Upload photo'}</label>
                <input id="pf-file" type="file" accept="image/*" onChange={upload} className="sr-only" />
                {form.image && <button type="button" className="link-btn danger" onClick={() => setForm({ ...form, image: '' })}>Remove photo</button>}
                <p className="muted small">JPG or PNG. Square photos look best. Without a photo, a category tile is shown.</p>
              </div>
            </div>
          </section>

          <section className="panel">
            <h2>Details</h2>
            <div className="form-grid">
              <div className="field span2"><label htmlFor="pf-name">Product name</label><input {...f('name')} placeholder="e.g. Handmade Golden Khussa" />{errors.name && <p className="error">{errors.name}</p>}</div>
              <div className="field"><label htmlFor="pf-categoryId">Category</label><select {...f('categoryId')}>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div className="field"><label htmlFor="pf-stock">Stock</label><input {...f('stock')} type="number" min="0" />{errors.stock && <p className="error">{errors.stock}</p>}</div>
              <div className="field"><label htmlFor="pf-price">Price (Rs.)</label><input {...f('price')} type="number" min="1" />{errors.price && <p className="error">{errors.price}</p>}</div>
              <div className="field"><label htmlFor="pf-oldPrice">Original price <span className="muted">(optional, shows a sale)</span></label><input {...f('oldPrice')} type="number" min="1" />{errors.oldPrice && <p className="error">{errors.oldPrice}</p>}</div>
              <div className="field span2"><label htmlFor="pf-description">Description</label><textarea {...f('description')} rows="5" placeholder="Materials, size, how it is made, care instructions" /><span className="muted small">{form.description.length} characters</span>{errors.description && <p className="error">{errors.description}</p>}</div>
            </div>
            <label className="check"><input type="checkbox" name="freeDelivery" checked={form.freeDelivery} onChange={change} />Offer free delivery on this item</label>
          </section>
        </div>

        <aside className="summary">
          <h2>Preview</h2>
          <div className="card preview-card">
            <div className="card-img"><ProductImage product={preview} /></div>
            <span className="card-title">{preview.name}</span>
            <span className="price">Rs. {preview.price.toLocaleString()}</span>
            {form.freeDelivery && <span className="free">Free delivery</span>}
          </div>
          <button className="btn full big">{editing ? 'Save changes' : 'Publish product'}</button>
          <Link to="/seller?tab=products" className="btn full outline">Cancel</Link>
        </aside>
      </form>
    </div>
  )
}
