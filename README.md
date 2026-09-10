# Ledgerly — Personal Expense Tracker with Analytics

A university CSE project: a personal expense tracker that logs income and
expenses, calculates totals live from the data, tracks category-wise
spending, and warns when a budget is broken — all in the browser using
React and localStorage.

This is **Version 1** of a three-part project. It is intentionally
frontend-only so it can be explained clearly in a first viva, while being
structured to grow into a full MERN (MongoDB, Express, React, Node.js)
application in later versions.

---

## Features

- **Public marketing site** — Home, About pages with a full design system
- **Frontend authentication** — Register and Login, session stored in localStorage
- **Dashboard** — balance, income, expenses, savings, recent transactions,
  top spending categories, and a monthly budget overview, all calculated
  dynamically from transaction data
- **Transactions page** — add, edit, delete transactions; search; filter by
  type, category and date; export the filtered list to CSV
- **Analytics & Budget page** — category-wise expense breakdown, monthly
  income vs expense chart, and an editable budget per category with an
  over-budget warning
- **Demo data** — realistic sample transactions are seeded automatically on
  first load, so the dashboard is never empty during a demo
- **Fully responsive** — works on desktop, tablet and mobile

---

## Technologies used

| Layer | Technology |
|---|---|
| Structure | HTML (via JSX) |
| Styling | CSS (custom design system, no UI framework) |
| Behaviour | JavaScript (ES6+) |
| UI library | React (function components, hooks) |
| Routing | React Router |
| Data storage | Browser `localStorage` |
| Build tool | Vite |

React is used deliberately lightly: plain `useState`/`useEffect`, no Redux,
no Context API, no custom hooks. This keeps the code explainable line by
line for a first viva.

---

## Folder structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Public site navigation
│   │   ├── Sidebar.jsx         # Logged-in app navigation
│   │   ├── StatCard.jsx        # Dashboard summary card
│   │   ├── TransactionForm.jsx # Add/Edit transaction modal
│   │   ├── TransactionTable.jsx# Transaction list table
│   │   ├── BudgetCard.jsx      # Budget progress bar
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Analytics.jsx
│   ├── utils/
│   │   ├── storage.js          # All localStorage read/write logic
│   │   ├── calculations.js     # Totals, category totals, filtering, formatting
│   │   └── csvExport.js        # CSV export via Blob
│   ├── App.jsx                 # Route definitions
│   ├── main.jsx                # React entry point
│   └── index.css               # Full design system
├── index.html
├── package.json
└── vite.config.js
```

---

## How to install

```bash
npm install
```

## How to run

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

---

## Available routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Public landing page |
| `/about` | About | Project overview |
| `/login` | Login | Frontend/localStorage auth |
| `/register` | Register | Creates a user in localStorage |
| `/dashboard` | Dashboard | Main app page (requires login) |
| `/transactions` | Transactions | Add/edit/delete/filter/export |
| `/analytics` | Analytics & Budget | Charts + budget management |

---

## How localStorage is used

All persistence goes through `src/utils/storage.js`, so the rest of the app
never touches `localStorage` directly:

- **`expenseTracker_transactions`** — array of transaction objects:
  ```js
  { id: 1, type: "expense", amount: 500, category: "Food", date: "2026-09-10", note: "Lunch" }
  ```
- **`expenseTracker_budget`** — `{ totalBudget, categoryBudgets: { Food: 5000, ... } }`
- **`expenseTracker_users`** — array of registered users (demo-only, plain text passwords)
- **`expenseTracker_session`** — the currently logged-in user

Sample data is inserted automatically the first time the app is opened, but
only if no transactions already exist, so real data is never overwritten.

---

## Future MERN upgrade plan

Version 1 is deliberately structured so the upgrade path is a swap, not a
rewrite:

1. **Backend** — build a Node.js + Express REST API with MongoDB and
   Mongoose models for `User` and `Transaction`.
2. **Auth** — replace localStorage-based login/register with JWT issued by
   the backend, and hash passwords with bcrypt.
3. **Data layer** — replace the functions in `utils/storage.js` with Axios
   calls to the new API, keeping the same function names/signatures so
   pages and components do not need to change.
4. **State** — introduce Context API or a data-fetching library once data
   is shared across more components and comes from a network request.
5. **Deployment** — deploy the frontend and backend separately (e.g.
   Vercel/Netlify + Render/Railway) with environment-based API URLs.

---

## Viva explanation points

**What is this project?**
A personal expense tracker where a user logs income and expenses, and the
app calculates balances, category spending and budget status automatically.

**Why no backend yet?**
This is the first of three planned versions. Building the backend now would
make the code harder to explain; the current version proves the core logic
and UI work correctly before adding server complexity.

**Where is data stored?**
In the browser's `localStorage`, through a small set of helper functions in
`utils/storage.js` — this isolates all persistence logic in one place.

**How are dashboard numbers calculated?**
Nothing is hardcoded. `utils/calculations.js` derives totals, category
totals and monthly breakdowns from the transaction array every time it
renders, using array methods like `filter`, `reduce` and `map`.

**What React concepts are used?**
- Function components and JSX
- Props (e.g. `StatCard`, `BudgetCard`, `TransactionTable` all receive data via props)
- `useState` for form inputs, filters and toggles
- `useEffect` for loading data on page mount and guarding routes
- React Router (`Routes`, `Route`, `Link`, `useNavigate`, `useLocation`)

**What JavaScript concepts are used?**
- Arrays and objects as the core data model
- Array methods: `map`, `filter`, `reduce`, `sort`
- Functions and default parameters
- Template literals and destructuring
- `JSON.stringify` / `JSON.parse` for localStorage
- `Intl.NumberFormat` for currency formatting
- The `Blob` API for CSV export

---

## What can be added in the second and third presentations

**Second version**
- Real backend: Node.js, Express, MongoDB, Mongoose
- JWT-based authentication with bcrypt password hashing
- Transactions linked to a specific user in the database
- Replace localStorage calls with Axios API requests

**Third version**
- Protected routes verified against a real JWT on the server
- Recurring transactions and multi-currency support
- Advanced analytics: year-on-year comparison, PDF export
- Cloud deployment with a live demo link
- Optional: shared/family budgets, notifications, dark mode
