import { useEffect, useState } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'

const CATEGORIES = ['Food', 'Transport', 'Education', 'Shopping', 'Entertainment', 'Health', 'Other']
const catIcon = { Food: '🍔', Transport: '🚗', Education: '📚', Shopping: '🛍️', Entertainment: '🎮', Health: '💊', Other: '📦' }
const catColors = { Food: '#ef4444', Transport: '#f59e0b', Education: '#2563eb', Shopping: '#8b5cf6', Entertainment: '#10b981', Health: '#06b6d4', Other: '#94a3b8' }

const emptyForm = { title: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0], note: '' }

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [aiText, setAiText] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [filterCat, setFilterCat] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const now = new Date()

  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses?month=${now.getMonth() + 1}&year=${now.getFullYear()}`)
      setExpenses(res.data)
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  useEffect(() => { fetchExpenses() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.amount) return
    setSubmitting(true)
    try {
      await API.post('/expenses', { ...form, amount: Number(form.amount) })
      setForm(emptyForm)
      setShowForm(false)
      fetchExpenses()
    } catch (err) { alert(err.response?.data?.msg || 'Error') }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return
    try {
      await API.delete(`/expenses/${id}`)
      setExpenses(prev => prev.filter(e => e._id !== id))
    } catch (err) { alert('Could not delete') }
  }

  const handleAI = async () => {
    if (!aiText.trim()) { alert('Please type something!'); return }
    setAiLoading(true)
    try {
      const res = await API.post('/ai/parse-expense', { text: aiText })
      setForm({
        title: res.data.title || '',
        amount: res.data.amount || '',
        category: res.data.category || 'Other',
        date: res.data.date || new Date().toISOString().split('T')[0],
        note: aiText,
      })
      setAiText('')
      setShowForm(true)
    } catch (err) { alert('AI failed: ' + (err.response?.data?.msg || err.message)) }
    setAiLoading(false)
  }

  const filtered = filterCat ? expenses.filter(e => e.category === filterCat) : expenses
  const total = filtered.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <Navbar />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#0f0f0f' }}>Expenses</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              {now.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {showForm ? '✕ Cancel' : '+ Add Expense'}
          </button>
        </div>

        {/* AI Input — the star feature */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>🤖</span>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Add with AI</span>
            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>Smart</span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            Just type naturally — "spent 250 at Zomato", "paid 500 for petrol", "bought books for 800"
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              value={aiText}
              onChange={e => setAiText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAI()}
              placeholder="eg. spent 200 on groceries yesterday..."
              style={{ flex: 1, minWidth: '200px', padding: '11px 14px', border: 'none', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
            <button onClick={handleAI} disabled={aiLoading}
              style={{ padding: '11px 20px', background: aiLoading ? 'rgba(255,255,255,0.3)' : '#fff', color: aiLoading ? '#fff' : '#2563eb', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: aiLoading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>
              {aiLoading ? 'Thinking...' : '✨ Parse'}
            </button>
          </div>
        </div>

        {/* Manual form */}
        {showForm && (
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#0f0f0f', marginBottom: '1rem' }}>Add Expense</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Title</label>
                  <input placeholder="eg. Lunch at canteen" value={form.title} required
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Amount (₹)</label>
                  <input type="number" placeholder="250" value={form.amount} required
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif", background: '#fff' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{catIcon[c]} {c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Date</label>
                  <input type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>Note (optional)</label>
                <input placeholder="Any additional note..." value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif" }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={submitting}
                  style={{ flex: 1, padding: '11px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  {submitting ? 'Saving...' : 'Save Expense'}
                </button>
                <button type="button" onClick={() => { setForm(emptyForm); setShowForm(false) }}
                  style={{ padding: '11px 20px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => setFilterCat('')}
            style={{ padding: '6px 14px', borderRadius: '20px', border: '1.5px solid', borderColor: !filterCat ? '#2563eb' : '#e5e7eb', background: !filterCat ? '#2563eb' : '#fff', color: !filterCat ? '#fff' : '#555', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            All
          </button>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilterCat(c === filterCat ? '' : c)}
              style={{ padding: '6px 14px', borderRadius: '20px', border: '1.5px solid', borderColor: filterCat === c ? catColors[c] : '#e5e7eb', background: filterCat === c ? catColors[c] : '#fff', color: filterCat === c ? '#fff' : '#555', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              {catIcon[c]} {c}
            </button>
          ))}
        </div>

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>{filtered.length} expenses</span>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#dc2626' }}>Total: ₹{total.toLocaleString()}</span>
        </div>

        {/* Expense list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8e4dc', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>No expenses found</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Add your first expense above</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(exp => (
              <div key={exp._id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e8e4dc', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${catColors[exp.category]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {catIcon[exp.category]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.title}</div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#fff', background: catColors[exp.category], padding: '1px 8px', borderRadius: '10px' }}>{exp.category}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(exp.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    {exp.note && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.note}</div>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#dc2626' }}>₹{exp.amount.toLocaleString()}</span>
                  <button onClick={() => handleDelete(exp._id)}
                    style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}