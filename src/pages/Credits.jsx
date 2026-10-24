import { photo, photoCredits } from '../data/seed'
import { Photo } from '../components/Common'
import { usePageTitle } from '../helpers'

export default function Credits() {
  usePageTitle('Photo credits')
  return (
    <div className="wrap page narrow">
      <h1 className="page-title">Photo credits</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Product and story photos on Kaarigar come from photographers on Pexels and are used under the
        {' '}<a className="link" href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">Pexels license</a>.
        Thank you to everyone below.
      </p>
      <ul className="credits">
        {photoCredits.map(([name, id]) => (
          <li key={id}>
            <Photo src={photo(id, 200)} alt="" size={160} className="credit-img" />
            <div>
              <b>{name}</b>
              <a className="link small" href={`https://www.pexels.com/photo/${id}/`} target="_blank" rel="noreferrer">View on Pexels</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
