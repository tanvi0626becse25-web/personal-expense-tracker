import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <span className="brand-mark">L</span>
              Ledgerly
            </div>
            <p style={{ maxWidth: '32ch', fontSize: '0.92rem' }}>
              A Basic expense tracker made as a CSE project . Add your income and expenses,
              keep track of your spending, and manage your monthly budget.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ledgerly · University project</span>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer
