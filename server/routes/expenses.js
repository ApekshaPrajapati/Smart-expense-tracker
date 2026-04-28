const router = require('express').Router()
const Expense = require('../models/Expense')
const auth = require('../middleware/auth')

// GET all expenses for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const { month, year, category } = req.query
    const filter = { user: req.user.id }

    if (month && year) {
      const start = new Date(year, month - 1, 1)
      const end = new Date(year, month, 0, 23, 59, 59)
      filter.date = { $gte: start, $lte: end }
    }

    if (category) filter.category = category

    const expenses = await Expense.find(filter).sort({ date: -1 })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// GET summary (total + by category) for charts
router.get('/summary', auth, async (req, res) => {
  try {
    const { month, year } = req.query
    const filter = { user: req.user.id }

    if (month && year) {
      const start = new Date(year, month - 1, 1)
      const end = new Date(year, month, 0, 23, 59, 59)
      filter.date = { $gte: start, $lte: end }
    }

    const expenses = await Expense.find(filter)

    // Total
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    // By category — for pie chart
    const byCategory = {}
    expenses.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount
    })

    // By month — for bar chart (last 6 months)
    const byMonth = {}
    expenses.forEach(e => {
      const key = `${new Date(e.date).getFullYear()}-${new Date(e.date).getMonth() + 1}`
      byMonth[key] = (byMonth[key] || 0) + e.amount
    })

    res.json({ total, byCategory, byMonth })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// ADD expense
router.post('/', auth, async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user.id })
    res.json(expense)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// UPDATE expense
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    res.json(expense)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

// DELETE expense
router.delete('/:id', auth, async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json({ msg: 'Deleted' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

module.exports = router