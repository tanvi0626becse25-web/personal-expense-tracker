import { formatCurrency } from '../utils/calculations.js'

// Shows one category's budget vs actual spend as a progress bar.
// Turns red ("over") once spent exceeds the budgeted amount.
function BudgetCard({ category, budget, spent }) {
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const isOver = spent > budget

  return (
    <div className="category-bar-row">
      <div className="top-line">
        <span>
          {category}
          {isOver && <span className="over-budget-tag">Over budget</span>}
        </span>
        <span>{formatCurrency(spent)} / {formatCurrency(budget)}</span>
      </div>
      <div className="bar-track">
        <div className={`bar-fill ${isOver ? 'over' : ''}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

export default BudgetCard
