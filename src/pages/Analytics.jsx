import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import BudgetCard from '../components/BudgetCard.jsx'
import {
  getTransactions,
  getCurrentUser,
  getBudget,
  saveBudget,
  seedSampleDataIfEmpty,
} from '../utils/storage.js'
import {
  calculateTotals,
  calculateCategoryTotals,
  getMonthlyBreakdown,
  formatMonthLabel,
  formatCurrency,
  EXPENSE_CATEGORIES,
} from '../utils/calculations.js'

function Analytics() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [budget, setBudget] = useState(getBudget())
  const [activeTab, setActiveTab] = useState('analytics')

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

  const totals = calculateTotals(transactions)
  const expenseCategoryTotals = calculateCategoryTotals(transactions, 'expense')
  const monthly = getMonthlyBreakdown(transactions)
  const maxMonthlyValue = Math.max(1, ...monthly.map((m) => Math.max(m.income, m.expenses)))

  const sortedCategories = Object.entries(expenseCategoryTotals).sort((a, b) => b[1] - a[1])

  function handleTotalBudgetChange(value) {
    const updated = { ...budget, totalBudget: Number(value) || 0 }
    setBudget(updated)
    saveBudget(updated)
  }

  function handleCategoryBudgetChange(category, value) {
    const updated = {
      ...budget,
      categoryBudgets: { ...budget.categoryBudgets, [category]: Number(value) || 0 },
    }
    setBudget(updated)
    saveBudget(updated)
  }

  return (
    <div className="app-shell">
      <Sidebar user={user} />

      <main className="app-main">
        <div className="app-header">
          <div>
            <h1>Analytics &amp; budget</h1>
            <p className="sub">See where your money goes, and set limits to stay in control.</p>
          </div>
        </div>

        <div className="analytics-tabs">
          <button
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={activeTab === 'budget' ? 'active' : ''}
            onClick={() => setActiveTab('budget')}
          >
            Budget
          </button>
        </div>

        {activeTab === 'analytics' && (
          <>
            <div className="dashboard-grid">
              <div className="panel">
                <div className="panel-head">
                  <h3>Monthly income vs expense</h3>
                </div>
                <div className="chart-legend">
                  <span><span className="legend-dot" style={{ background: 'var(--primary)' }} />Income</span>
                  <span><span className="legend-dot" style={{ background: 'var(--expense)' }} />Expense</span>
                </div>
                {monthly.length === 0 ? (
                  <p style={{ fontSize: '0.9rem' }}>Add transactions across a few dates to see a trend here.</p>
                ) : (
                  <div className="chart-bars">
                    {monthly.map((m) => (
                      <div className="chart-bar-col" key={m.month}>
                        <div className="chart-bar-pair">
                          <div
                            className="chart-bar income"
                            style={{ height: `${(m.income / maxMonthlyValue) * 100}%` }}
                            title={`Income: ${formatCurrency(m.income)}`}
                          />
                          <div
                            className="chart-bar expense"
                            style={{ height: `${(m.expenses / maxMonthlyValue) * 100}%` }}
                            title={`Expense: ${formatCurrency(m.expenses)}`}
                          />
                        </div>
                        <div className="chart-bar-label">{formatMonthLabel(m.month)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="panel">
                <div className="panel-head">
                  <h3>Expense by category</h3>
                </div>
                {sortedCategories.length === 0 ? (
                  <p style={{ fontSize: '0.9rem' }}>No expenses logged yet.</p>
                ) : (
                  sortedCategories.map(([category, amount]) => (
                    <div className="category-bar-row" key={category}>
                      <div className="top-line">
                        <span>{category}</span>
                        <span>{formatCurrency(amount)}</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: `${totals.expenses > 0 ? (amount / totals.expenses) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Summary</h3>
              </div>
              <div className="stat-cards" style={{ marginBottom: 0 }}>
                <div className="stat-card">
                  <div className="label">Total income</div>
                  <div className="value">{formatCurrency(totals.income)}</div>
                </div>
                <div className="stat-card expense">
                  <div className="label">Total expenses</div>
                  <div className="value">{formatCurrency(totals.expenses)}</div>
                </div>
                <div className="stat-card balance">
                  <div className="label">Net balance</div>
                  <div className="value">{formatCurrency(totals.balance)}</div>
                </div>
                <div className="stat-card gold">
                  <div className="label">Categories tracked</div>
                  <div className="value">{sortedCategories.length}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'budget' && (
          <>
            <div className="panel">
              <div className="panel-head">
                <h3>Overall monthly budget</h3>
                {totals.expenses > budget.totalBudget && <span className="over-budget-tag">Over budget</span>}
              </div>
              <div className="budget-total-bar">
                <BudgetCard category="Total spending" budget={budget.totalBudget} spent={totals.expenses} />
              </div>
              <div className="field" style={{ maxWidth: 240 }}>
                <label htmlFor="totalBudget">Set total monthly budget (₹)</label>
                <input
                  id="totalBudget"
                  type="number"
                  min="0"
                  value={budget.totalBudget}
                  onChange={(e) => handleTotalBudgetChange(e.target.value)}
                />
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Category budgets</h3>
              </div>
              {EXPENSE_CATEGORIES.map((category) => (
                <div key={category}>
                  <BudgetCard
                    category={category}
                    budget={budget.categoryBudgets[category] || 0}
                    spent={expenseCategoryTotals[category] || 0}
                  />
                  <div className="budget-edit-row">
                    <label htmlFor={`budget-${category}`}>{category} budget (₹)</label>
                    <input
                      id={`budget-${category}`}
                      type="number"
                      min="0"
                      value={budget.categoryBudgets[category] || 0}
                      onChange={(e) => handleCategoryBudgetChange(category, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Analytics
