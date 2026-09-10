import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import TransactionTable from '../components/TransactionTable.jsx'
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getCurrentUser,
  seedSampleDataIfEmpty,
} from '../utils/storage.js'
import { filterTransactions, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/calculations.js'
import { exportTransactionsToCSV } from '../utils/csvExport.js'

const allCategories = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])]

function Transactions() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    seedSampleDataIfEmpty()
    setTransactions(getTransactions())
  }, [navigate])

  function handleSave(transactionData) {
    let updated
    if (editingTransaction) {
      updated = updateTransaction(editingTransaction.id, transactionData)
    } else {
      updated = addTransaction(transactionData)
    }
    setTransactions(updated)
    setShowForm(false)
    setEditingTransaction(null)
  }

  function handleEdit(transaction) {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Delete this transaction? This cannot be undone.')
    if (!confirmed) return
    const updated = deleteTransaction(id)
    setTransactions(updated)
  }

  function handleCancelForm() {
    setShowForm(false)
    setEditingTransaction(null)
  }

  const filtered = filterTransactions(transactions, {
    search,
    type: typeFilter,
    category: categoryFilter,
    date: dateFilter,
  })

  function handleExport() {
    exportTransactionsToCSV(filtered, 'ledgerly-transactions.csv')
  }

  return (
    <div className="app-shell">
      <Sidebar user={user} />

      <main className="app-main">
        <div className="app-header">
          <div>
            <h1>Transactions</h1>
            <p className="sub">Add, edit, filter and export your income and expenses.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add transaction
          </button>
        </div>

        <div className="toolbar">
          <div className="toolbar-filters">
            <input
              type="text"
              className="toolbar-search"
              placeholder="Search by note or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All categories</option>
              {allCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn btn-outline btn-sm" onClick={handleExport}>
              Export CSV
            </button>
          </div>
        </div>

        <TransactionTable
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <TransactionForm
          editingTransaction={editingTransaction}
          onSave={handleSave}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  )
}

export default Transactions
