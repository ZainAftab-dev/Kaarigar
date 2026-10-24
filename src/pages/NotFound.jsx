import { Link } from 'react-router-dom'
import { EmptyState } from '../components/Common'

export default function NotFound() {
  return (
    <div className="wrap page">
      <EmptyState icon="search" title="Page not found" text="The page you are looking for does not exist."
        action={<Link to="/" className="btn">Back to home</Link>} />
    </div>
  )
}
