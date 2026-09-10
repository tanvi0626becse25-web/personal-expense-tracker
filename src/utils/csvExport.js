// csvExport.js
// Converts an array of transactions into a downloadable CSV file
// entirely in the browser, using a Blob - no backend needed.

export function exportTransactionsToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Note']

  const rows = transactions.map((t) => [
    t.date,
    t.type,
    t.category,
    t.amount,
    // Wrap notes in quotes and escape any existing quotes, since notes
    // may contain commas which would otherwise break the CSV columns.
    `"${(t.note || '').replace(/"/g, '""')}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
