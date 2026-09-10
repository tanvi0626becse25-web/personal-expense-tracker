import { useState, useEffect } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/calculations.js'

const emptyForm = {
  type: 'expense',
  amount: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
}

// One form is reused for both "Add transaction" and "Edit transaction".
// If `editingTransaction` is passed in, the fields are pre-filled with its values.
function TransactionForm({ editingTransaction, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        date: editingTransaction.date,
        note: editingTransaction.note || '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [editingTransaction])

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleTypeChange(type) {
    // Reset category when switching type, since income/expense have different category lists
    setForm((prev) => ({ ...prev, type, category: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = 'Enter an amount greater than 0.'
    if (!form.category) newErrors.category = 'Please select a category.'
    if (!form.date) newErrors.date = 'Please select a date.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({ ...form, amount: Number(form.amount) })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
          <button className="modal-close" onClick={onCancel} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="type-toggle">
            <button
              type="button"
              className={`income ${form.type === 'income' ? 'selected' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`expense ${form.type === 'expense' ? 'selected' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
          </div>

          <div className="field">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="1"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="e.g. 1500"
            />
            {errors.amount && <div className="field-error">{errors.amount}</div>}
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <div className="field-error">{errors.category}</div>}
          </div>

          <div className="field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <div className="field-error">{errors.date}</div>}
          </div>

          <div className="field">
            <label htmlFor="note">Note (optional)</label>
            <input
              id="note"
              type="text"
              value={form.note}
              onChange={(e) => handleChange('note', e.target.value)}
              placeholder="e.g. Groceries for the week"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline btn-block" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-block">
              Save transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm
