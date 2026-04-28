import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#94a3b8']
const CATEGORIES = ['Food', 'Transport', 'Education', 'Shopping', 'Entertainment', 'Health', 'Other']

export default function Dashboard() {
  const { user } = useAuth()
  const [summary, setSummary] = useState({ total: 0, byCategory: {}, byMonth: {} })
  const [recentExpenses, setRecentExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const now = new Date()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, expensesRes] = await Promise.all([
          API.get(`/expenses/summary?month=${now.getMonth() + 1}&year=${now.getFullYear()}`),
          API.get(`/expenses?month=${now.getMonth() + 1}&year=${now.getFullYear()}`)
        ])
        setSummary(summaryRes.data)
        setRecentExpenses(expensesRes.data.slice(0, 5))
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const pieData = Object.entries(summary.byCategory).map(([name, value]) => ({ name, value }))

  const barData = Object.entries(summary.byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([key, value]) => {
      const [year, month] = key.split('-')
      const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short' })
      return { month: monthName, amount: value }
    })

  const catIcon = { Food: '🍔', Transport: '🚗', Education: '📚', Shopping: '🛍️', Entertainment: '🎮', Health: '💊', Other: '📦' }

  if (loading) return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', fontFamily: "'DM Sans', sans-serif", color: '#94a3b8' }}>
        Loading your dashboard...
      </div>
    </>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#0f0f0f' }}>
              Hello, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              {now.toLocaleString('default', { month: 'long', year: 'numeric' })} overview
            </p>
          </div>
          <Link to="/expenses" style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            + Add Expense
          </Link>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Spent', value: `₹${summary.total.toLocaleString()}`, bg: '#2563eb', color: '#fff', icon: '💸' },
            { label: 'Transactions', value: recentExpenses.length + (recentExpenses.length === 5 ? '+' : ''), bg: '#fff', color: '#0f0f0f', icon: '📊' },
            { label: 'Top Category', value: Object.entries(summary.byCategory).sort(([,a],[,b]) => b-a)[0]?.[0] || 'None', bg: '#fff', color: '#0f0f0f', icon: '🏆' },
            { label: 'Avg per day', value: `₹${Math.round(summary.total / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate())}`, bg: '#fff', color: '#0f0f0f', icon: '📅' },
          ].map(({ label, value, bg, color, icon }) => (
            <div key={label} style={{ background: bg, borderRadius: '16px', padding: '1.2rem', border: bg === '#fff' ? '1px solid #e8e4dc' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color, fontFamily: "'Playfair Display', serif" }}>{value}</div>
              <div style={{ fontSize: '12px', color: bg === '#2563eb' ? 'rgba(255,255,255,0.8)' : '#94a3b8', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '1.5rem' }}>

          {/* Pie chart */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#0f0f0f', marginBottom: '1rem' }}>Spending by Category</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(val) => [`₹${val}`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
                No expenses this month
              </div>
            )}
          </div>

          {/* Bar chart */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#0f0f0f', marginBottom: '1rem' }}>Monthly Spending</h3>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
                  <Tooltip formatter={(val) => [`₹${val}`, 'Spent']} />
                  <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
                No data yet
              </div>
            )}
          </div>
        </div>

        {/* Category breakdown */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#0f0f0f', marginBottom: '1rem' }}>Category Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CATEGORIES.map((cat, i) => {
              const amount = summary.byCategory[cat] || 0
              const pct = summary.total ? Math.round((amount / summary.total) * 100) : 0
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{catIcon[cat]} {cat}</span>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>₹{amount.toLocaleString()} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({pct}%)</span></span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: COLORS[i % COLORS.length], borderRadius: '10px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent expenses */}
        <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#0f0f0f' }}>Recent Expenses</h3>
            <Link to="/expenses" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>View all →</Link>
          </div>
          {recentExpenses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentExpenses.map(exp => (
                <div key={exp._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8f7f4', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                      {catIcon[exp.category]}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f' }}>{exp.title}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{exp.category} · {new Date(exp.date).toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#dc2626' }}>-₹{exp.amount}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📭</div>
              <div style={{ fontSize: '14px' }}>No expenses this month</div>
              <Link to="/expenses" style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Add your first expense →</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}