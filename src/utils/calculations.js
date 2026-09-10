// calculations.js
// All numbers shown on the Dashboard and Analytics pages are derived
// here from the raw transaction array. Nothing is ever hardcoded -
// this file is the single source of truth for "how do we compute X".

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Education',
  'Health',
  'Other',
]

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Pocket Money', 'Other']

// Formats a number as Indian Rupees, e.g. 125000 -> ₹1,25,000
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

export function calculateTotals(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

// Returns { Food: 1200, Transport: 800, ... } for a given transaction type
export function calculateCategoryTotals(transactions, type = 'expense') {
  const totals = {}
  transactions
    .filter((t) => t.type === type)
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount)
    })
  return totals
}

export function filterTransactions(transactions, { search = '', type = 'all', category = 'all', date = '' } = {}) {
  return transactions.filter((t) => {
    const matchesSearch =
      search.trim() === '' ||
      t.note?.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())

    const matchesType = type === 'all' || t.type === type
    const matchesCategory = category === 'all' || t.category === category
    const matchesDate = date === '' || t.date === date

    return matchesSearch && matchesType && matchesCategory && matchesDate
  })
}

// Groups transactions by month (YYYY-MM) and returns income/expense per month,
// sorted chronologically. Used for the "Monthly Income vs Expense" chart.
export function getMonthlyBreakdown(transactions) {
  const groups = {}

  transactions.forEach((t) => {
    const month = t.date?.slice(0, 7) // "YYYY-MM"
    if (!month) return
    if (!groups[month]) groups[month] = { month, income: 0, expenses: 0 }
    if (t.type === 'income') groups[month].income += Number(t.amount)
    else groups[month].expenses += Number(t.amount)
  })

  return Object.values(groups).sort((a, b) => a.month.localeCompare(b.month))
}

export function getRecentTransactions(transactions, count = 5) {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count)
}

export function formatMonthLabel(monthStr) {
  const [year, month] = monthStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
}
