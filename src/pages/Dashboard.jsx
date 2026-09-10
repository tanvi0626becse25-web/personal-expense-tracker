import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import StatCard from '../components/StatCard.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import BudgetCard from '../components/BudgetCard.jsx'
import {
  getTransactions,
  addTransaction,
  getCurrentUser,
  getBudget,
  seedSampleDataIfEmpty,
} from '../utils/storage.js'
import {
  calculateTotals,
  calculateCategoryTotals,
  getRecentTransactions,
  formatCurrency,
} from '../utils/calculations.js'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [budget, setBudget] = useState(getBudget())
  const [showForm, setShowForm] = useState(false)

  // Runs once on mount: check the user is logged in, seed demo data if
  // this is the first visit, then load transactions from localStorage.
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    seedSampleDataIfEmpty()
    setTransactions(getTransactions())
    setBudget(getBudget())
  }, [navigate])

  function handleAddTransaction(transactionData) {
    const updated = addTransaction(transactionData)
    setTransactions(updated)
    setShowForm(false)
  }

  const totals = calculateTotals(transactions)
  const expenseCategoryTotals = calculateCategoryTotals(transactions, 'expense')
  const recent = getRecentTransactions(transactions, 6)

  const topCategories = Object.entries(expenseCategoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const totalSpent = totals.expenses
  const isOverTotalBudget = totalSpent > budget.totalBudget

  return (
    <div className="app-shell">
      <Sidebar user={user} />

      <main className="app-main">
        <div className="app-header dashboard-header">
          <div>
            <div className="eyebrow">Personal overview · September</div>
            <h1>Good morning, {user?.fullName?.split(' ')[0] || 'there'}.</h1>
            <p className="sub">Here’s a quick look at your money this month.</p>
          </div>
          <div className="header-actions">
            <span className="date-chip">September 2026 ▾</span>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add transaction</button>
          </div>
        </div>

        <div className="stat-cards dashboard-summary">
          <StatCard label="Total balance" value={formatCurrency(totals.balance)} variant="balance" />
          <StatCard label="Total income" value={formatCurrency(totals.income)} />
          <StatCard label="Total expenses" value={formatCurrency(totals.expenses)} variant="expense" />
          <StatCard label="Savings" value={formatCurrency(Math.max(totals.balance, 0))} variant="gold" />
        </div>

        <div className="dashboard-grid">
          <div>
            <div className="panel panel-large">
              <div className="panel-head">
                <div><span className="panel-kicker">Activity</span><h3>Recent transactions</h3></div>
                <button className="panel-link" onClick={() => navigate('/transactions')}>View all →</button>
              </div>
              {recent.length === 0 ? (
                <div className="empty-state">
                  <div className="icon">—</div>
                  <p>No transactions yet. Add your first one above.</p>
                </div>
              ) : (
                <ul className="mini-tx-list">
                  {recent.map((t) => (
                    <li className="mini-tx-row" key={t.id}>
                      <div className="mini-tx-left">
                        <span className={`tx-dot ${t.type === 'expense' ? 'expense' : ''}`} />
                        <div>
                          <div className="mini-tx-cat">{t.category}</div>
                          <div className="mini-tx-note">{t.note || t.date}</div>
                        </div>
                      </div>
                      <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="panel budget-panel">
              <div className="panel-head">
                <div><span className="panel-kicker">Budget</span><h3>Monthly budget overview</h3></div>
                {isOverTotalBudget && <span className="over-budget-tag">Over budget</span>}
              </div>
              <BudgetCard category="Overall spending" budget={budget.totalBudget} spent={totalSpent} />
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Manage category-level budgets on the Analytics page.
              </p>
            </div>
          </div>

          <div>
            <div className="panel spending-panel">
              <div className="panel-head">
                <div><span className="panel-kicker">Spending</span><h3>Where your money is going</h3></div>
                <span className="small-chip">Top 5</span>
              </div>
              {topCategories.length === 0 ? (
                <p style={{ fontSize: '0.9rem' }}>No expenses logged yet.</p>
              ) : (
                topCategories.map(([category, amount]) => (
                  <div className="category-bar-row" key={category}>
                    <div className="top-line">
                      <span>{category}</span>
                      <span>{formatCurrency(amount)}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${totalSpent > 0 ? (amount / totalSpent) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-insight">
          <div className="insight-mark">i</div>
          <div><span>Quick insight</span><strong>{topCategories[0] ? `${topCategories[0][0]} is your highest spending category.` : 'Add an expense to start seeing spending insights.'}</strong></div>
          <button className="panel-link" onClick={() => navigate('/analytics')}>See analytics →</button>
        </div>
      </main>

      {showForm && (
        <TransactionForm
          onSave={handleAddTransaction}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
