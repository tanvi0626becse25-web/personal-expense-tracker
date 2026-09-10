import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const timeline = [
  {
    stage: '01',
    title: 'The Idea',
    text: 'I noticed that it is easy to lose track of small expenses when they are spread across different apps or notes. So I decided to make one simple place to record them .',
  },
  {
    stage: '02',
    title: 'What Ledgerly does',
    text: 'You can add income and expenses, choose a category, add a date and keep a record of your transactions. The dashboard then shows the information in a simpler way.',
  },
  {
    stage: '03',
    title: 'What I Learned',
    text: 'This Project helped us practice React, JavaScript, components, routing and storing data in the browser . I also learned a lot about making different parts of a website work together.',
  },
  {
  stage: '',
  title: 'Built as a CSE Project',
  text: 'I built Ledgerly as my 2nd-year CSE project. The idea was to make a simple expense tracker where users can add their income and expenses and easily see where their money is going.',
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
          <div className="hero-eyebrow">About Ledgerely</div>
          <h1>A simple expense tracker I built to make keeping track of money a little easier.</h1>
          <p style={{ maxWidth: '58ch', fontSize: '1.05rem' }}>
           Ledgerly is my 2nd-year CSE project. I wanted to build something practical instead of just making another basic demo website. It lets you add income and expenses, organise transactions and get a quick idea of where your money is going.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Why I made Ledgerly</h2>
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
