import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { isValidPhone } from '../utils'
import { usePageTitle } from '../helpers'

export default function Account() {
  usePageTitle('Account settings')
  const { user, updateProfile, cities, showToast, resetDemoData } = useStore()
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '', city: user.city || 'Lahore' })
  const [pass, setPass] = useState({ current: '', next: '' })
  const [error, setError] = useState('')

  function save(e) {
    e.preventDefault()
    if (form.name.trim().length < 3) return setError('Please enter your full name.')
    if (!isValidPhone(form.phone)) return setError('Enter a valid mobile number.')
    setError('')
    updateProfile({ name: form.name.trim(), phone: form.phone, city: form.city })
  }

  function changePassword(e) {
    e.preventDefault()
    if (pass.current !== user.password) return showToast('Current password is incorrect', 'error')
    if (pass.next.length < 6) return showToast('New password must be at least 6 characters', 'error')
    updateProfile({ password: pass.next })
    setPass({ current: '', next: '' })
  }

  return (
    <div className="wrap page narrow">
      <h1 className="page-title">Account settings</h1>
      <form className="panel" onSubmit={save}>
        <h2>Profile</h2>
        <div className="form-grid">
          <div className="field"><label htmlFor="ac-name">Full name</label><input id="ac-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field"><label htmlFor="ac-email">Email</label><input id="ac-email" value={user.email} disabled /></div>
          <div className="field"><label htmlFor="ac-phone">Mobile number</label><input id="ac-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div className="field"><label htmlFor="ac-city">City</label><select id="ac-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn">Save changes</button>
      </form>

      <form className="panel" onSubmit={changePassword}>
        <h2>Change password</h2>
        <div className="form-grid">
          <div className="field"><label htmlFor="ac-cur">Current password</label><input id="ac-cur" type="password" value={pass.current} onChange={(e) => setPass({ ...pass, current: e.target.value })} /></div>
          <div className="field"><label htmlFor="ac-new">New password</label><input id="ac-new" type="password" value={pass.next} onChange={(e) => setPass({ ...pass, next: e.target.value })} /></div>
        </div>
        <button className="btn outline">Update password</button>
      </form>

      <div className="panel">
        <h2>Demo data</h2>
        <p className="muted">This frontend saves everything in your browser. Reset to start fresh with the original sample data.</p>
        <button className="btn outline danger-btn" onClick={() => { if (confirm('Reset all demo data? This logs you out.')) resetDemoData() }}>Reset demo data</button>
      </div>
    </div>
  )
}
