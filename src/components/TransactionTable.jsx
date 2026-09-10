import { formatCurrency } from '../utils/calculations.js'

// Displays a list of transactions as a table, with Edit/Delete actions.
// Renders an empty state when the filtered list has nothing to show.
function TransactionTable({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">—</div>
        <h3>No transactions found</h3>
        <p>Try adjusting your filters, or add a new transaction to get started.</p>
      </div>
    )
  }

  return (
    <div className="tx-table-wrap">
      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Note</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>
                <span className={`type-badge ${t.type}`}>
                  {t.type === 'income' ? 'Income' : 'Expense'}
                </span>
              </td>
              <td>{t.category}</td>
              <td>{t.note || '—'}</td>
              <td className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </td>
              <td>
                <div className="row-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => onEdit(t)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(t.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
