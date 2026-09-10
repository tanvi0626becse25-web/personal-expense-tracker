import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

// Public-facing navbar shown on Home / About / Login / Register.
// "active" link is highlighted based on the current route (useLocation).
function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
  ]

  return (
    <nav className="public-nav">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-mark">₹</span>
          Ledgerly
        </Link>

        <ul className="nav-links" style={{ display: open ? 'flex' : undefined }}>
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={isActive(link.path) ? 'active' : ''}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <Link to="/login" className="btn btn-outline btn-sm">Log in</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
        </div>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </nav>
  )
}

export default Navbar
