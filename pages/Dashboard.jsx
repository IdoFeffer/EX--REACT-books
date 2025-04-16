import { bookService } from "../services/book.service.js"
const { useEffect, useState } = React

export function Dashboard() {
  const [categoryCounts, setCategoryCounts] = useState({})
  useEffect(() => {
    bookService.getCategories().then(setCategoryCounts)
  }, [])

  const total = Object.values(categoryCounts).reduce(
    (sum, count) => sum + count,
    0
  )
  console.log('categoryCounts:', categoryCounts)

  return (
    <section className="dashboard container">
      <h2>Dashboard</h2>
      <p>Book per category:</p>
      <div className="chart">
        {Object.entries(categoryCounts).map(([category, count]) => {
          const percentage = Math.round((count / total) * 100)
          return (
            <div className="bar-wrapper">
            <div
              className="bar"
              key={category}
              style={{ height: `${percentage}%` }}
            >
              <span className="percentage">{percentage}%</span>
            </div>
              <span className="label">{category}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
