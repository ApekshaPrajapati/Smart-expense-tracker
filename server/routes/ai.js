const router = require('express').Router()
const Groq = require('groq-sdk')
const auth = require('../middleware/auth')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Parse natural language expense
// User types "spent 250 at Zomato yesterday"
// AI returns structured { title, amount, category, date }
router.post('/parse-expense', auth, async (req, res) => {
  try {
    const { text } = req.body

    if (!text) return res.status(400).json({ msg: 'No text provided' })

    const today = new Date().toISOString().split('T')[0]

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: `Today's date is ${today}. Extract expense details from this text and return ONLY a JSON object with no explanation:
        
Text: "${text}"

Return this exact JSON format:
{
  "title": "short expense title",
  "amount": 0,
  "category": "one of: Food, Transport, Education, Shopping, Entertainment, Health, Other",
  "date": "YYYY-MM-DD",
  "note": "original text"
}

Rules:
- amount must be a number
- date must be YYYY-MM-DD format
- if date not mentioned use today: ${today}
- category must exactly match one of the given options`
      }],
      max_tokens: 200,
    })

    const raw = response.choices[0].message.content
    // Clean and parse JSON
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    res.json(parsed)
  } catch (err) {
    console.log('AI parse error:', err.message)
    res.status(500).json({ msg: err.message })
  }
})

module.exports = router