const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://smart-expense-tracker-ten-rouge.vercel.app/'  // ← your Vercel URL
  ],
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/expenses', require('./routes/expenses'))
app.use('/api/ai', require('./routes/ai'))

app.get('/', (req, res) => res.json({ msg: 'Expense tracker API running!' }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB error:', err))

app.listen(5000, () => console.log('✅ Server running on port 5000'))