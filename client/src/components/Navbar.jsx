import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogout = () => { logout(); navigate('/login') }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: '📊 Dashboard' },
    { path: '/expenses', label: '📋 Expenses' },
  ]

  const linkStyle = (path) => ({
    fontSize: '13px',
    color: isActive(path) ? '#2563eb' : '#555',
    textDecoration: 'none',
    fontWeight: isActive(path) ? 600 : 500,
    padding: '6px 12px',
    borderRadius: '8px',
    background: isActive(path) ? '#eff6ff' : 'transparent',
    fontFamily: "'DM Sans', sans-serif",
  })

  return (
    <>
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💰</div>
    
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '18px', color: '#0f0f0f' }}>XpenseAI</span>
        </Link>

        {!isMobile && user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navLinks.map(l => <Link key={l.path} to={l.path} style={linkStyle(l.path)}>{l.label}</Link>)}
          </div>
        )}

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Hi, {user.name.split(' ')[0]} 👋</span>
                <button onClick={handleLogout} style={{ fontSize: '13px', color: '#dc2626', background: 'none', border: '1px solid #fecaca', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ fontSize: '13px', color: '#555', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
                <Link to="/register" style={{ fontSize: '13px', color: '#fff', textDecoration: 'none', padding: '7px 16px', background: '#2563eb', borderRadius: '8px', fontWeight: 600 }}>Sign up →</Link>
              </>
            )}
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: '22px', height: '2px', background: '#374151', borderRadius: '2px' }} />)}
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: '60px', left: 0, right: 0, background: '#fff', borderBottom: '1px solid #e8e4dc', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 99, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          {user && navLinks.map(l => (
            <Link key={l.path} to={l.path} style={{ fontSize: '15px', color: isActive(l.path) ? '#2563eb' : '#374151', textDecoration: 'none', fontWeight: 500 }}>{l.label}</Link>
          ))}
          {user ? (
            <>
              <div style={{ height: '1px', background: '#e8e4dc' }} />
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Logged in as {user.name}</span>
              <button onClick={handleLogout} style={{ fontSize: '15px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: "'DM Sans', sans-serif" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: '15px', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
              <Link to="/register" style={{ display: 'block', textAlign: 'center', fontSize: '15px', color: '#fff', textDecoration: 'none', padding: '12px', background: '#2563eb', borderRadius: '10px', fontWeight: 600 }}>Sign up free →</Link>
            </>
          )}
        </div>
      )}
    </>
  )
}