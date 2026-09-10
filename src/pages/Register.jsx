import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/storage.js'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const newErrors = {}

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.'

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email) newErrors.email = 'Email is required.'
    else if (!emailPattern.test(form.email)) newErrors.email = 'Enter a valid email address.'

    if (!form.password) newErrors.password = 'Password is required.'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.'

    if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    const result = registerUser(form)
    if (!result.success) {
      setServerError(result.message)
      return
    }

    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="brand">
          <span className="brand-mark">L</span>
          Ledgerly
        </Link>
        <div>
          <h2>Start your ledger in under a minute.</h2>
          <p>Create an account to track income, expenses and budgets from your very first transaction.</p>
        </div>
        <p style={{ fontSize: '0.82rem' }}>University CSE project &middot; Version 1</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form">
          <h1>Create account</h1>
          <p className="sub">It takes less than a minute — no card, no email verification.</p>

          {serverError && <div className="form-error-banner">{serverError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Your name"
              />
              {errors.fullName && <div className="field-error">{errors.fullName}</div>}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="field password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }}>
              Register
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
