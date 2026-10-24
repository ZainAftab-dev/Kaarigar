import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { formatPrice } from '../utils'

export default function Sell() {
  // simple earnings calculator
  const [price, setPrice] = useState(2500)
  const [perMonth, setPerMonth] = useState(20)
  const earnings = price * perMonth * 0.9

  return (
    <>
      <section className="sell-hero">
        <div className="wrap">
          <span className="pill">For artisans &amp; home-based sellers</span>
          <h1>Turn your hunar into a business.</h1>
          <p>Open a free Kaarigar shop and sell your handmade products to buyers in every city of Pakistan.</p>
          <div className="btn-row center-row">
            <Link to="/signup?role=seller" className="btn big">Open your free shop <Icon name="arrow" size={18} /></Link>
            <Link to="/help" className="btn big outline">How it works</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="steps">
            <div className="step"><span className="step-n">1</span><h3>Create your shop</h3><p>Sign up as a seller, add your shop name, city and story.</p></div>
            <div className="step"><span className="step-n">2</span><h3>List your products</h3><p>Add photos, price and stock. It takes about 5 minutes per item.</p></div>
            <div className="step"><span className="step-n">3</span><h3>Get orders</h3><p>We notify you on every order. Courier picks up from your door.</p></div>
            <div className="step"><span className="step-n">4</span><h3>Get paid</h3><p>Receive 90% of each sale in your JazzCash, Easypaisa or bank account.</p></div>
          </div>
        </div>
      </section>

      <section className="sec pt0">
        <div className="wrap calc">
          <div>
            <h2>How much could you earn?</h2>
            <div className="field">
              <label htmlFor="calc-price">Average price of your product: <b>{formatPrice(price)}</b></label>
              <input id="calc-price" type="range" min="300" max="15000" step="100" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div className="field">
              <label htmlFor="calc-qty">Items sold per month: <b>{perMonth}</b></label>
              <input id="calc-qty" type="range" min="1" max="200" value={perMonth} onChange={(e) => setPerMonth(Number(e.target.value))} />
            </div>
          </div>
          <div className="calc-result">
            <span>You could earn</span>
            <b>{formatPrice(earnings)}</b>
            <span>per month after Kaarigar's 10% fee</span>
          </div>
        </div>
      </section>

      <section className="sec pt0">
        <div className="wrap">
          <div className="trust">
            <div><Icon name="store" size={30} /><div><b>Free shop</b><p>No monthly or listing fee</p></div></div>
            <div><Icon name="truck" size={30} /><div><b>Doorstep pickup</b><p>TCS &amp; Leopards partners</p></div></div>
            <div><Icon name="cash" size={30} /><div><b>Weekly payouts</b><p>JazzCash, Easypaisa or bank</p></div></div>
            <div><Icon name="users" size={30} /><div><b>Seller support</b><p>Help in Urdu and English</p></div></div>
          </div>
        </div>
      </section>
    </>
  )
}
