// storage.js
// localStorage helpers used by the first frontend version.

const TRANSACTIONS_KEY = 'expenseTracker_transactions'
const BUDGET_KEY = 'expenseTracker_budget'
const USERS_KEY = 'expenseTracker_users'
const SESSION_KEY = 'expenseTracker_session'

// ---------- Transactions ----------

export function getTransactions() {
  const raw = localStorage.getItem(TRANSACTIONS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveTransactions(transactions) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
}

export function addTransaction(transaction) {
  const transactions = getTransactions()
  const newTransaction = {
    ...transaction,
    id: Date.now(), // simple unique id, good enough for a localStorage-based demo
  }
  const updated = [newTransaction, ...transactions]
  saveTransactions(updated)
  return updated
}

export function updateTransaction(id, updatedFields) {
  const transactions = getTransactions()
  const updated = transactions.map((t) =>
    t.id === id ? { ...t, ...updatedFields } : t
  )
  saveTransactions(updated)
  return updated
}

export function deleteTransaction(id) {
  const transactions = getTransactions()
  const updated = transactions.filter((t) => t.id !== id)
  saveTransactions(updated)
  return updated
}

// ---------- Budget ----------

const DEFAULT_BUDGET = {
  totalBudget: 20000,
  categoryBudgets: {
    Food: 5000,
    Transport: 3000,
    Shopping: 4000,
    Bills: 6000,
    Entertainment: 2000,
    Education: 3000,
    Health: 2000,
    Other: 1000,
  },
}

export function getBudget() {
  const raw = localStorage.getItem(BUDGET_KEY)
  return raw ? JSON.parse(raw) : DEFAULT_BUDGET
}

export function saveBudget(budget) {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(budget))
}

// ---------- Auth (frontend-only for Version 1) ----------
// Frontend-only login for the first version.
export function registerUser({ fullName, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    return { success: false, message: 'An account with this email already exists.' }
  }
  const newUser = { id: Date.now(), fullName, email, password }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { success: true, user: newUser }
}

export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (!user) {
    return { success: false, message: 'Invalid email or password.' }
  }
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ id: user.id, fullName: user.fullName, email: user.email })
  )
  return { success: true, user }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY)
  return raw ? JSON.parse(raw) : null
}

// ---------- Sample data ----------
// Runs once, only if no transactions exist yet, so the dashboard is
// never empty during a demo - and never overwrites real user data.

export function seedSampleDataIfEmpty() {
  const existing = getTransactions()
  if (existing.length > 0) return

  const today = new Date()
  const daysAgo = (n) => {
    const d = new Date(today)
    d.setDate(d.getDate() - n)
    return d.toISOString().slice(0, 10)
  }

  const sample = [
    { type: 'income', amount: 45000, category: 'Salary', date: daysAgo(28), note: 'September salary' },
    { type: 'income', amount: 6000, category: 'Freelance', date: daysAgo(20), note: 'Logo design project' },
    { type: 'expense', amount: 1200, category: 'Food', date: daysAgo(2), note: 'Groceries' },
    { type: 'expense', amount: 450, category: 'Food', date: daysAgo(5), note: 'Dinner with friends' },
    { type: 'expense', amount: 800, category: 'Transport', date: daysAgo(6), note: 'Cab rides' },
    { type: 'expense', amount: 2200, category: 'Shopping', date: daysAgo(9), note: 'New shoes' },
    { type: 'expense', amount: 6200, category: 'Bills', date: daysAgo(11), note: 'Electricity + WiFi' },
    { type: 'expense', amount: 599, category: 'Entertainment', date: daysAgo(13), note: 'Streaming subscription' },
    { type: 'expense', amount: 1500, category: 'Education', date: daysAgo(15), note: 'Online course' },
    { type: 'expense', amount: 900, category: 'Health', date: daysAgo(17), note: 'Pharmacy' },
    { type: 'expense', amount: 350, category: 'Other', date: daysAgo(18), note: 'Miscellaneous' },
    { type: 'expense', amount: 1100, category: 'Food', date: daysAgo(22), note: 'Weekly groceries' },
    { type: 'expense', amount: 2800, category: 'Shopping', date: daysAgo(24), note: 'Festive shopping' },
    { type: 'income', amount: 2000, category: 'Pocket Money', date: daysAgo(26), note: 'From family' },
    { type: 'expense', amount: 650, category: 'Transport', date: daysAgo(30), note: 'Fuel' },
  ]

  const withIds = sample.map((t, index) => ({ ...t, id: Date.now() + index }))
  saveTransactions(withIds)
}
