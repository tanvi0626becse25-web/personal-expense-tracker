import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <>
      <Navbar />

      <main className="home-v4">
        <section className="home-showcase">
          <div className="container">
            <div className="home-intro">
              <div className="home-copy">
                <div className="home-edition">2026 · PERSONAL FINANCE</div>
                <h1>Personal<br /><em>Expense</em><br />Tracker.</h1>
                <p>
                  A calm, simple place to record your spending, keep an eye on
                  your budget and understand where your money goes each month.
                </p>
                <div className="home-points">
                  <span>Income & expenses</span>
                  <span>Monthly summaries</span>
                  <span>Spending categories</span>
                </div>
                <div className="home-actions-v4">
                  <Link to="/register" className="btn btn-primary">Start tracking <span>→</span></Link>
                  <Link to="/about" className="home-about-link">About the project</Link>
                </div>
              </div>

              <div className="home-cards-area" aria-label="Ledgerly finance dashboard preview">
                <div className="floating-card savings-card">
                  <span>MONTHLY SAVINGS</span>
                  <strong>+ ₹11,500</strong>
                  <small>28.7% of income</small>
                </div>

                <div className="floating-card goal-card">
                  <div className="goal-card-head"><span>SAVINGS GOAL</span><b>62%</b></div>
                  <strong>Laptop fund</strong>
                  <div className="goal-progress"><i /></div>
                  <small>₹31,000 of ₹50,000</small>
                </div>

                <div className="finance-board">
                  <div className="board-head">
                    <div>
                      <span className="board-kicker">MY FINANCES</span>
                      <h2>October overview</h2>
                    </div>
                    <button type="button" className="board-month">This month⌄</button>
                  </div>

                  <div className="board-summary">
                    <div className="summary-box income-box">
                      <span>Total income</span>
                      <strong>₹40,000</strong>
                      <small>8 transactions</small>
                    </div>
                    <div className="summary-box expense-box">
                      <span>Total expenses</span>
                      <strong>₹28,500</strong>
                      <small>24 transactions</small>
                    </div>
                    <div className="summary-box saving-box">
                      <span>Net savings</span>
                      <strong>₹11,500</strong>
                      <small>28.7% savings rate</small>
                    </div>
                  </div>

                  <div className="board-table">
                    <div className="board-table-title">
                      <span>Recent transactions</span>
                      <Link to="/transactions">View all →</Link>
                    </div>
                    <div className="board-row board-row-head">
                      <span>TRANSACTION</span><span>CATEGORY</span><span>DATE</span><span>AMOUNT</span>
                    </div>
                    <div className="board-row">
                      <span className="transaction-name"><i className="row-icon food">F</i>Groceries</span>
                      <span>Food</span><span>08 Oct</span><b className="negative">− ₹1,650</b>
                    </div>
                    <div className="board-row">
                      <span className="transaction-name"><i className="row-icon travel">T</i>Metro card</span>
                      <span>Transport</span><span>07 Oct</span><b className="negative">− ₹500</b>
                    </div>
                    <div className="board-row">
                      <span className="transaction-name"><i className="row-icon work">W</i>Freelance</span>
                      <span>Income</span><span>06 Oct</span><b className="positive">+ ₹6,000</b>
                    </div>
                    <div className="board-row">
                      <span className="transaction-name"><i className="row-icon home">H</i>Electricity</span>
                      <span>Utilities</span><span>04 Oct</span><b className="negative">− ₹1,500</b>
                    </div>
                  </div>

                  <div className="board-bottom">
                    <div>
                      <span className="board-kicker">SPENDING BY CATEGORY</span>
                      <div className="category-line"><span>Food</span><b>₹7,800</b></div>
                      <div className="mini-track"><i style={{ width: '76%' }} /></div>
                      <div className="category-line"><span>Transport</span><b>₹3,400</b></div>
                      <div className="mini-track"><i style={{ width: '43%' }} /></div>
                    </div>
                    <div className="board-chart">
                      <span className="board-kicker">WEEKLY SPENDING</span>
                      <div className="chart-bars-v4"><i /><i /><i /><i /><i /><i /><i /></div>
                      <div className="chart-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-bottom-strip">
              <div><b>01</b><span>Record</span><small>Everyday transactions in seconds.</small></div>
              <div><b>02</b><span>Review</span><small>See income, expenses and savings together.</small></div>
              <div><b>03</b><span>Understand</span><small>Use categories to spot spending patterns.</small></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
