import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../utils/storage.js'

function Sidebar({ user }) {
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: '▦' },
    { path: '/transactions', label: 'Transactions', icon: '↔' },
    { path: '/analytics', label: 'Analytics', icon: '◒' },
  ]

  function handleLogout() {
    logoutUser()
    navigate('/login')
  }

  return (
    <aside className="app-sidebar">
      <Link to="/" className="brand sidebar-brand">
        <span className="brand-mark">₹</span>
        <span>Ledgerly</span>
      </Link>

      <div className="sidebar-section-label">Overview</div>
      <ul className="app-nav">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-note">
        <span className="sidebar-note-mark">₹</span>
        <div>
          <strong>Stay on track</strong>
          <span>Small entries make better insights.</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{(user?.fullName || 'G').charAt(0).toUpperCase()}</div>
        <div className="sidebar-user-info">
          <div className="name">{user?.fullName || 'Guest User'}</div>
          <div className="email">{user?.email || 'guest@ledgerly.app'}</div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout} title="Logout" aria-label="Logout">↗</button>
      </div>
    </aside>
  )
}

export default Sidebar
