// Small reusable card used across Dashboard for Balance / Income / Expenses / Savings.
// "variant" controls the accent color via CSS classes (see .stat-card in index.css).
function StatCard({ label, value, variant = '' }) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  )
}

export default StatCard
