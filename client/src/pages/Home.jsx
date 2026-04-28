import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: "'DM Sans', sans-serif", color: '#fff', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💰</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '20px', color: '#fff' }}>SpendSmart</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
          <Link to="/register" style={{ fontSize: '13px', color: '#0a0a0a', textDecoration: 'none', padding: '8px 18px', background: '#10b981', borderRadius: '8px', fontWeight: 600 }}>Get started →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '12px', fontWeight: 600, padding: '4px 14px', borderRadius: '20px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          AI-Powered Expense Tracking
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', color: '#fff' }}>
          Know exactly where<br />
          <span style={{ fontStyle: 'italic', color: '#10b981' }}>every rupee goes</span>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Just type "spent 250 at Zomato" — our AI automatically categorizes and logs your expense. Beautiful charts show exactly where your money is going.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ padding: '14px 32px', background: '#10b981', color: '#0a0a0a', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>
            Start tracking free →
          </Link>
          <Link to="/login" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Login
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🤖', title: 'AI Expense Parsing', desc: 'Type naturally — "paid 500 for petrol" — AI reads and categorizes automatically. No manual forms.' },
            { icon: '📊', title: 'Visual Charts', desc: 'Pie charts and bar graphs show your spending patterns. Understand your habits at a glance.' },
            { icon: '🏷️', title: 'Smart Categories', desc: 'Food, Transport, Education, Shopping and more. Every expense sorted perfectly.' },
            { icon: '📱', title: 'Works on Mobile', desc: 'Fully responsive. Track expenses on the go from your phone anytime.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
        SpendSmart — Built with MERN + Groq AI
      </div>
    </div>
  )
}