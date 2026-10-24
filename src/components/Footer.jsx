import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { isValidEmail } from '../utils'

export default function Footer() {
  const { showToast } = useStore()
  const [email, setEmail] = useState('')

  function subscribe(e) {
    e.preventDefault()
    if (!isValidEmail(email)) return showToast('Please enter a valid email', 'error')
    showToast('Subscribed! Watch your inbox for new makers.')
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="news">
          <div>
            <h3>Get new makers and deals in your inbox</h3>
            <p>One email a week. No spam.</p>
          </div>
          <form onSubmit={subscribe}>
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <input id="news-email" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn">Subscribe</button>
          </form>
        </div>
        <div className="fg">
          <div>
            <div className="logo light">Kaarigar</div>
            <p>A marketplace for Pakistani artisans and home-based sellers. Handmade in Pakistan.</p>
          </div>
          <div><h4>Shop</h4><ul>
            <li><Link to="/shop">All products</Link></li>
            <li><Link to="/shop?cat=jewellery">Jewellery</Link></li>
            <li><Link to="/shop?cat=gifts">Gifts</Link></li>
            <li><Link to="/wishlist">Favourites</Link></li>
          </ul></div>
          <div><h4>Sell</h4><ul>
            <li><Link to="/sell">Sell on Kaarigar</Link></li>
            <li><Link to="/signup?role=seller">Open a shop</Link></li>
            <li><Link to="/seller">Seller dashboard</Link></li>
          </ul></div>
          <div><h4>Help</h4><ul>
            <li><Link to="/orders">Track my order</Link></li>
            <li><Link to="/help">FAQ</Link></li>
            <li><Link to="/help#returns">Returns</Link></li>
          </ul></div>
        </div>
        <div className="copy">
          <span>© 2026 Kaarigar. Handmade in Pakistan.</span>
          <span className="pay"><b>COD</b><b>JazzCash</b><b>Easypaisa</b></span>
        </div>
      </div>
    </footer>
  )
}
