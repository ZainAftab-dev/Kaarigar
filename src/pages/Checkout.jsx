import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { ProductImage } from '../components/Common'
import { usePageTitle } from '../helpers'
import Icon from '../components/Icon'
import { PROMO_CODES, formatPrice, isValidPhone, shippingFor } from '../utils'

const PAYMENTS = [
  { id: 'Cash on Delivery', desc: 'Pay in cash when your order arrives', icon: 'cash' },
  { id: 'JazzCash', desc: 'Pay from your JazzCash mobile account', icon: 'cash' },
  { id: 'Easypaisa', desc: 'Pay from your Easypaisa mobile account', icon: 'cash' },
]

export default function Checkout() {
  usePageTitle('Checkout')
  const { user, cartItems, cartSubtotal, placeOrder, cities, showToast } = useStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user.name, phone: user.phone || '', city: user.city || 'Lahore', address: '', notes: '',
  })
  const [payment, setPayment] = useState('Cash on Delivery')
  const [wallet, setWallet] = useState('')
  const [code, setCode] = useState('')
  const [promo, setPromo] = useState(null)
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  if (cartItems.length === 0 && !placing) return <Navigate to="/cart" replace />

  const shipping = shippingFor(cartSubtotal)
  const discount = promo ? Math.round(cartSubtotal * PROMO_CODES[promo]) : 0
  const total = cartSubtotal + shipping - discount

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function applyCode() {
    const c = code.trim().toUpperCase()
    if (PROMO_CODES[c]) {
      setPromo(c)
      showToast(`Promo code applied: ${PROMO_CODES[c] * 100}% off`)
    } else {
      setPromo(null)
      setErrors({ ...errors, code: 'This code is not valid. Try KAARIGAR10' })
    }
  }

  function validate() {
    const e = {}
    if (form.name.trim().length < 3) e.name = 'Please enter your full name.'
    if (!isValidPhone(form.phone)) e.phone = 'Enter a valid mobile number, e.g. 03001234567.'
    if (!form.city) e.city = 'Please choose your city.'
    if (form.address.trim().length < 10) e.address = 'Please enter your complete address (house, street, area).'
    if (payment !== 'Cash on Delivery' && !isValidPhone(wallet)) e.wallet = `Enter your ${payment} account number (03XXXXXXXXX).`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(e) {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fix the highlighted fields', 'error')
      return
    }
    setPlacing(true)
    // small delay to feel like a real request
    setTimeout(() => {
      const order = placeOrder({
        address: { name: form.name.trim(), phone: form.phone.trim(), city: form.city, address: form.address.trim() },
        payment, shipping, discount,
      })
      navigate(`/order-success/${order.id}`, { replace: true })
    }, 700)
  }

  const field = (name) => ({ name, id: 'co-' + name, value: form[name], onChange: change, 'aria-invalid': !!errors[name] })

  return (
    <div className="wrap page">
      <Link to="/cart" className="back-link"><Icon name="back" size={18} />Back to cart</Link>
      <h1 className="page-title">Checkout</h1>

      <form className="cart-layout" onSubmit={submit} noValidate>
        <div>
          <section className="panel">
            <h2><span className="step-n">1</span>Delivery address</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="co-name">Full name</label>
                <input {...field('name')} autoComplete="name" />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor="co-phone">Mobile number</label>
                <input {...field('phone')} type="tel" inputMode="numeric" placeholder="03001234567" autoComplete="tel" />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="field">
                <label htmlFor="co-city">City</label>
                <select {...field('city')}>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field span2">
                <label htmlFor="co-address">Complete address</label>
                <textarea {...field('address')} rows="2" placeholder="House no, street, area / society" autoComplete="street-address" />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>
              <div className="field span2">
                <label htmlFor="co-notes">Note for the seller <span className="muted">(optional)</span></label>
                <input {...field('notes')} placeholder="e.g. size, colour, gift message" />
              </div>
            </div>
          </section>

          <section className="panel">
            <h2><span className="step-n">2</span>Payment method</h2>
            <div className="pay-options" role="radiogroup">
              {PAYMENTS.map((p) => (
                <label key={p.id} className={'pay-opt' + (payment === p.id ? ' on' : '')}>
                  <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} />
                  <span className={'pay-logo ' + p.id.split(' ')[0].toLowerCase()}>{p.id === 'Cash on Delivery' ? 'COD' : p.id}</span>
                  <span><b>{p.id}</b><small>{p.desc}</small></span>
                </label>
              ))}
            </div>
            {payment !== 'Cash on Delivery' && (
              <div className="field" style={{ marginTop: 14, maxWidth: 360 }}>
                <label htmlFor="co-wallet">{payment} account number</label>
                <input id="co-wallet" type="tel" inputMode="numeric" placeholder="03XXXXXXXXX" value={wallet} aria-invalid={!!errors.wallet}
                  onChange={(e) => { setWallet(e.target.value); setErrors({ ...errors, wallet: '' }) }} />
                {errors.wallet && <p className="error">{errors.wallet}</p>}
                <p className="muted small">You will receive a payment request on this number (demo).</p>
              </div>
            )}
          </section>
        </div>

        <aside className="summary">
          <h2>Your order</h2>
          <div className="mini-lines">
            {cartItems.map(({ product, qty }) => (
              <div className="mini-line" key={product.id}>
                <div className="mini-img"><ProductImage product={product} size={120} /><span>{qty}</span></div>
                <span className="mini-name">{product.name}</span>
                <b>{formatPrice(product.price * qty)}</b>
              </div>
            ))}
          </div>

          <div className="promo-row">
            <label htmlFor="co-code" className="sr-only">Promo code</label>
            <input id="co-code" placeholder="Promo code" value={code} onChange={(e) => { setCode(e.target.value); setErrors({ ...errors, code: '' }) }} />
            <button type="button" className="btn outline" onClick={applyCode}>Apply</button>
          </div>
          {errors.code && <p className="error">{errors.code}</p>}
          {promo && <p className="ok small"><Icon name="check" size={16} />{promo} applied</p>}

          <div className="sum-row"><span>Items total</span><span>{formatPrice(cartSubtotal)}</span></div>
          <div className="sum-row"><span>Delivery</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
          {discount > 0 && <div className="sum-row green"><span>Discount</span><span>– {formatPrice(discount)}</span></div>}
          <div className="sum-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <button className="btn full big" disabled={placing}>{placing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}</button>
          <p className="muted small center">By placing your order you agree to Kaarigar's terms.</p>
        </aside>
      </form>
    </div>
  )
}
