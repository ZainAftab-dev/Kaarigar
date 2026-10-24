import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { isValidEmail } from '../utils'

const FAQ = [
  ['How do I place an order?', 'Add items to your cart, go to checkout, enter your address and choose Cash on Delivery, JazzCash or Easypaisa. You will see your order in "My orders".'],
  ['How long does delivery take?', 'Most orders arrive in 3 to 5 working days. Same-city orders often arrive in 1 to 2 days.'],
  ['Is delivery free?', 'Delivery is free on orders above Rs. 3,000. Below that, a flat Rs. 200 delivery fee applies.'],
  ['What is your return policy?', 'If your item arrives damaged or is not as described, contact us within 7 days for a free replacement or full refund.', 'returns'],
  ['Can I cancel my order?', 'Yes, you can cancel any order that is still "Pending" from the My orders page.'],
  ['How do I become a seller?', 'Click "Sell on Kaarigar", create a seller account and add your shop details. Our team reviews new shops within 2 working days.'],
  ['How do sellers get paid?', 'Sellers receive 90% of each sale. Payouts are sent weekly to JazzCash, Easypaisa or a bank account.'],
]

export default function Help() {
  const { showToast } = useStore()
  const [open, setOpen] = useState(window.location.hash.includes('returns') ? 3 : 0)
  const [msg, setMsg] = useState({ name: '', email: '', text: '' })

  function send(e) {
    e.preventDefault()
    if (!msg.name || !isValidEmail(msg.email) || msg.text.length < 10) return showToast('Please fill all fields correctly', 'error')
    showToast('Message sent! We will reply within 24 hours.')
    setMsg({ name: '', email: '', text: '' })
  }

  return (
    <div className="wrap page narrow">
      <h1 className="page-title">Help &amp; FAQ</h1>
      <div className="faq">
        {FAQ.map(([q, a, anchor], i) => (
          <div className={'faq-item' + (open === i ? ' open' : '')} key={i} id={anchor}>
            <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span aria-hidden="true">{open === i ? '–' : '+'}</span></button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>

      <form className="panel" onSubmit={send} style={{ marginTop: 32 }}>
        <h2>Still need help? Contact us</h2>
        <div className="form-grid">
          <div className="field"><label htmlFor="h-name">Name</label><input id="h-name" value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} /></div>
          <div className="field"><label htmlFor="h-email">Email</label><input id="h-email" type="email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} /></div>
          <div className="field span2"><label htmlFor="h-text">Message</label><textarea id="h-text" rows="4" value={msg.text} onChange={(e) => setMsg({ ...msg, text: e.target.value })} /></div>
        </div>
        <button className="btn">Send message</button>
      </form>
    </div>
  )
}
