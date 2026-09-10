import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/storage.js'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Please enter both your email and password.')
      return
    }

    const result = loginUser(form)
    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="brand">
          <span className="brand-mark">L</span>
          Ledgerly
        </Link>
        <div>
          <h2>Welcome back to your ledger.</h2>
          <p>Log in to see your latest balance, recent transactions and budget status.</p>
        </div>
        <p style={{ fontSize: '0.82rem' }}>University CSE project &middot; Version 1</p>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form">
          <h1>Log in</h1>
          <p className="sub">Enter your details to access your dashboard.</p>

          {error && <div className="form-error-banner">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="field password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="row-between">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span style={{ color: 'var(--muted)' }}>Forgot password?</span>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </form>

          <div className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
