import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const timeline = [
  {
    stage: '01',
    title: 'The problem',
    text: 'Most students and early professionals track money in scattered notes apps or forget to track it at all, so they only notice a shortfall after it happens.',
  },
  {
    stage: '02',
    title: 'Our solution',
    text: 'Ledgerly gives every transaction a home: type, amount, category, date and a note. The app turns that list into totals, category breakdowns and budget alerts automatically.',
  },
  {
    stage: '03',
    title: 'How it works today',
    text: 'Version 1 runs entirely in the browser. Transactions, budgets and your account are all saved to localStorage, so nothing needs a server to work during development or a demo.',
  },
  {
    stage: '04',
    title: 'Where it is going',
    text: 'The same components and data flow are built to plug into a real backend: Express APIs, MongoDB storage and JWT-based authentication, without rewriting the interface.',
  },
]

const tech = ['HTML', 'CSS', 'JavaScript', 'React', 'React Router', 'localStorage', 'Vite']

const benefits = [
  'See your balance update the moment you log a transaction',
  'Understand which categories quietly consume the most money',
  'Get an early warning before a budget is broken, not after',
  'Export any filtered view to CSV for record-keeping',
]

function About() {
  return (
    <>
      <Navbar />

      <section className="about-hero">
        <div className="container">
          <div className="hero-eyebrow">About the project</div>
          <h1>A small, honest tool for a common problem.</h1>
          <p style={{ maxWidth: '58ch', fontSize: '1.05rem' }}>
            Ledgerly started as a university CSE project with one goal: build a
            personal expense tracker that is genuinely useful, explainable line
            by line, and structured well enough to keep growing across three
            project milestones.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>From problem to product</h2>
          </div>
          <div className="timeline-list">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.stage}>
                <div className="stage">{item.stage}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <div className="section-head" style={{ marginBottom: 20 }}>
                <h2>Technologies used</h2>
              </div>
              <div className="tech-pill-row">
                {tech.map((t) => (
                  <span className="tech-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="section-head" style={{ marginBottom: 20 }}>
                <h2>What it gives you</h2>
              </div>
              <ul style={{ paddingLeft: 20, color: 'var(--ink-soft)' }}>
                {benefits.map((b) => (
                  <li key={b} style={{ marginBottom: 10 }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Future scope</h2>
            <p>
              Later versions will replace localStorage with a real Node.js and
              Express API backed by MongoDB, add JWT-based login instead of the
              current frontend-only session, and introduce richer analytics such
              as year-on-year comparisons and export to PDF.
            </p>
          </div>
          <Link to="/register" className="btn btn-primary">Try the current version</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
