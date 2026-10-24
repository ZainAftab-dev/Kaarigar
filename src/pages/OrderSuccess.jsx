import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { EmptyState } from '../components/Common'
import { usePageTitle } from '../helpers'
import Icon from '../components/Icon'
import { formatPrice } from '../utils'

export default function OrderSuccess() {
  usePageTitle('Order placed')
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.id === id)

  if (!order) return <div className="wrap page"><EmptyState title="Order not found" action={<Link to="/orders" className="btn">My orders</Link>} /></div>

  return (
    <div className="wrap page narrow">
      <div className="success">
        <div className="success-ic"><Icon name="check" size={40} /></div>
        <h1>Shukriya! Your order is placed.</h1>
        <p className="muted">Order <b>{order.id}</b> · We'll send updates to {order.address.phone}</p>

        <div className="panel left">
          <div className="sum-row"><span>Items</span><span>{order.items.reduce((s, i) => s + i.qty, 0)}</span></div>
          <div className="sum-row"><span>Payment</span><span>{order.payment}</span></div>
          <div className="sum-row"><span>Deliver to</span><span>{order.address.address}, {order.address.city}</span></div>
          <div className="sum-row total"><span>{order.payment === 'Cash on Delivery' ? 'Pay on delivery' : 'Total paid'}</span><span>{formatPrice(order.total)}</span></div>
        </div>

        <ol className="timeline">
          <li className="done">Order placed</li>
          <li>Seller confirms</li>
          <li>Shipped</li>
          <li>Delivered</li>
        </ol>

        <div className="btn-row">
          <Link to="/orders" className="btn">Track my order</Link>
          <Link to="/shop" className="btn outline">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}
