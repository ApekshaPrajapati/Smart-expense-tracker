import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💰</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '20px', color: '#0f0f0f' }}>XpenseAI</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{ fontSize: '13px', color: '#555', textDecoration: 'none', fontWeight: 500, padding: '7px 16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Login</Link>
          <Link to="/register" style={{ fontSize: '13px', color: '#fff', textDecoration: 'none', padding: '7px 16px', background: '#2563eb', borderRadius: '8px', fontWeight: 600 }}>Get started →</Link>
        </div>
      </nav>

      {/* Hero section */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', padding: 'clamp(3rem, 8vw, 6rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '4px 16px', borderRadius: '20px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            🤖 AI-Powered Expense Tracking
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.2rem', color: '#fff' }}>
            Know exactly where<br />
            <span style={{ fontStyle: 'italic', color: '#93c5fd' }}>every rupee goes</span>
          </h1>

          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Just type <strong style={{ color: '#fff' }}>"spent 250 at Zomato"</strong> — our AI automatically categorizes and logs your expense. Beautiful charts show exactly where your money goes.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ padding: '13px 32px', background: '#fff', color: '#2563eb', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>
              Start tracking free →
            </Link>
            <Link to="/login" style={{ padding: '13px 32px', background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', border: '1px solid rgba(255,255,255,0.25)' }}>
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#f8faff', borderBottom: '1px solid #e8e4dc', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
        {[['💸', '10K+', 'Expenses tracked'], ['🏷️', '7', 'Smart categories'], ['🤖', 'AI', 'Auto-categorize'], ['📊', '100%', 'Free to use']].map(([icon, num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e3a5f', fontFamily: "'Playfair Display', serif" }}>{num}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f0f0f', marginBottom: '12px' }}>How XpenseAI works</h2>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Three simple steps to financial clarity</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { step: '01', icon: '✍️', title: 'Type naturally', desc: 'Say "paid 500 for petrol" or "spent 200 on lunch". No forms, no dropdowns.' },
            { step: '02', icon: '🤖', title: 'AI categorizes', desc: 'Our AI instantly reads your text and categorizes the expense correctly.' },
            { step: '03', icon: '📊', title: 'See insights', desc: 'Beautiful pie charts and bar graphs show exactly where your money goes.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.8rem', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 700, color: '#eff6ff', lineHeight: 1 }}>{step}</div>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', marginBottom: '8px', fontFamily: "'Playfair Display', serif" }}>{title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div style={{ background: '#f8faff', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0f0f0f', marginBottom: '12px' }}>Everything you need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🍔', title: 'Food', color: '#fef2f2', border: '#fecaca' },
              { icon: '🚗', title: 'Transport', color: '#fffbeb', border: '#fde68a' },
              { icon: '📚', title: 'Education', color: '#eff6ff', border: '#bfdbfe' },
              { icon: '🛍️', title: 'Shopping', color: '#f5f3ff', border: '#ddd6fe' },
              { icon: '🎮', title: 'Entertainment', color: '#f0fdf4', border: '#bbf7d0' },
              { icon: '💊', title: 'Health', color: '#ecfeff', border: '#a5f3fc' },
            ].map(({ icon, title, color, border }) => (
              <div key={title} style={{ background: color, border: `1px solid ${border}`, borderRadius: '16px', padding: '1.2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          Start tracking today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '2rem' }}>Free forever. No credit card needed.</p>
        <Link to="/register" style={{ display: 'inline-block', padding: '14px 36px', background: '#fff', color: '#2563eb', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>
          Create free account →
        </Link>
      </div>

      {/* Footer */}
      <div style={{ background: '#0f0f0f', padding: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
        XpenseAI — Built with MERN + Groq AI 🤖
      </div>
    </div>
  )
}