import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import Icon from '../components/Icon'
import { isValidEmail, isValidPhone } from '../utils'
import { Photo } from '../components/Common'
import { usePageTitle } from '../helpers'
import { photo } from '../data/seed'

function homeFor(user) {
  if (user.role === 'seller') return '/seller'
  if (user.role === 'admin') return '/admin'
  return '/'
}

function AuthSide({ seller }) {
  return (
    <div className="auth-side">
      <Photo src={photo(seller ? 37619027 : 40303896, 1000)} alt="" size={1000} eager />
      <div className="auth-quote">
        <p>{seller ? 'Sell your handmade work to buyers in every city of Pakistan.' : 'Real things, made by real hands. Delivered to your door.'}</p>
        <span>Kaarigar · Handmade in Pakistan</span>
      </div>
    </div>
  )
}

export function Login() {
  usePageTitle('Sign in')
  const { login, user, users } = useStore()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const next = params.get('next')
  if (user) return <Navigate to={next || homeFor(user)} replace />

  function submit(e) {
    e.preventDefault()
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (!password) return setError('Please enter your password.')
    const err = login(email, password)
    if (err) return setError(err)
    const u = users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase())
    navigate(next || homeFor(u), { replace: true })
  }

  function demo(addr) { setEmail(addr); setPassword('123456'); setError('') }

  return (
    <div className="auth-page">
      <AuthSide />
      <form className="auth-card" onSubmit={submit} noValidate>
        <h1>Sign in</h1>
        <p className="muted">Welcome back to Kaarigar</p>
        <div className="field">
          <label htmlFor="li-email">Email</label>
          <input id="li-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} />
        </div>
        <div className="field">
          <label htmlFor="li-pass">Password</label>
          <div className="pass">
            <input id="li-pass" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} />
            <button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn full big">Sign in</button>
        <p className="center small">New to Kaarigar? <Link to={'/signup' + (next ? '?next=' + next : '')} className="link">Create an account</Link></p>

        <div className="demo">
          <p className="small"><b>Demo accounts</b> (password 123456)</p>
          <div className="demo-btns">
            <button type="button" className="chip" onClick={() => demo('buyer@kaarigar.pk')}><Icon name="user" size={14} />Buyer</button>
            <button type="button" className="chip" onClick={() => demo('seller@kaarigar.pk')}><Icon name="store" size={14} />Seller</button>
            <button type="button" className="chip" onClick={() => demo('admin@kaarigar.pk')}><Icon name="shield" size={14} />Admin</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function Signup() {
  usePageTitle('Create account')
  const { signup, user, cities } = useStore()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [role, setRole] = useState(params.get('role') === 'seller' ? 'seller' : 'buyer')
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: 'Lahore', password: '', confirm: '', shopName: '' })
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to={homeFor(user)} replace />

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function submit(e) {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 3) er.name = 'Please enter your full name.'
    if (!isValidEmail(form.email)) er.email = 'Please enter a valid email address.'
    if (!isValidPhone(form.phone)) er.phone = 'Enter a valid mobile number, e.g. 03001234567.'
    if (form.password.length < 6) er.password = 'Password must be at least 6 characters.'
    if (form.confirm !== form.password) er.confirm = 'Passwords do not match.'
    if (role === 'seller' && form.shopName.trim().length < 3) er.shopName = 'Please enter a shop name.'
    if (!agree) er.agree = 'Please accept the terms to continue.'
    setErrors(er)
    if (Object.keys(er).length) return

    const err = signup({ ...form, name: form.name.trim(), shopName: form.shopName.trim(), role })
    if (err) return setErrors({ email: err })
    navigate(role === 'seller' ? '/seller' : params.get('next') || '/', { replace: true })
  }

  const f = (name) => ({ name, id: 'su-' + name, value: form[name], onChange: change, 'aria-invalid': !!errors[name] })

  return (
    <div className="auth-page">
      <AuthSide seller={role === 'seller'} />
      <form className="auth-card wide" onSubmit={submit} noValidate>
        <h1>Create your account</h1>
        <div className="role-switch" role="radiogroup" aria-label="Account type">
          <button type="button" role="radio" aria-checked={role === 'buyer'} className={role === 'buyer' ? 'on' : ''} onClick={() => setRole('buyer')}>
            <Icon name="bag" /><b>I want to buy</b><small>Shop handmade products</small>
          </button>
          <button type="button" role="radio" aria-checked={role === 'seller'} className={role === 'seller' ? 'on' : ''} onClick={() => setRole('seller')}>
            <Icon name="store" /><b>I want to sell</b><small>Open a free shop</small>
          </button>
        </div>

        <div className="form-grid">
          <div className="field"><label htmlFor="su-name">Full name</label><input {...f('name')} autoComplete="name" />{errors.name && <p className="error">{errors.name}</p>}</div>
          <div className="field"><label htmlFor="su-email">Email</label><input {...f('email')} type="email" autoComplete="email" />{errors.email && <p className="error">{errors.email}</p>}</div>
          <div className="field"><label htmlFor="su-phone">Mobile number</label><input {...f('phone')} type="tel" placeholder="03001234567" />{errors.phone && <p className="error">{errors.phone}</p>}</div>
          <div className="field"><label htmlFor="su-city">City</label><select {...f('city')}>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
          {role === 'seller' && (
            <div className="field span2"><label htmlFor="su-shopName">Shop name</label><input {...f('shopName')} placeholder="e.g. Ammi's Embroidery" />{errors.shopName && <p className="error">{errors.shopName}</p>}</div>
          )}
          <div className="field"><label htmlFor="su-password">Password</label><input {...f('password')} type="password" autoComplete="new-password" />{errors.password && <p className="error">{errors.password}</p>}</div>
          <div className="field"><label htmlFor="su-confirm">Confirm password</label><input {...f('confirm')} type="password" autoComplete="new-password" />{errors.confirm && <p className="error">{errors.confirm}</p>}</div>
        </div>

        <label className="check"><input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrors({ ...errors, agree: '' }) }} />I agree to Kaarigar's terms and privacy policy</label>
        {errors.agree && <p className="error">{errors.agree}</p>}
        {role === 'seller' && <p className="note"><Icon name="shield" size={16} />New shops are reviewed by our team before they appear in the marketplace.</p>}

        <button className="btn full big">{role === 'seller' ? 'Create seller account' : 'Create account'}</button>
        <p className="center small">Already have an account? <Link to="/login" className="link">Sign in</Link></p>
      </form>
    </div>
  )
}
