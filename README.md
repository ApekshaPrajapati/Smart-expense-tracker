# XpenseAI — AI Expense Tracker

> Just type "spent 250 at Zomato" — AI logs it automatically.

![MERN](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square) ![Groq](https://img.shields.io/badge/AI-Groq%20LLaMA-green?style=flat-square)

---
## What is XpenseAI?

Most expense trackers make you fill boring forms. XpenseAI lets you just type naturally — "paid 500 for petrol yesterday" — and AI automatically extracts the amount, category, and date. Beautiful charts then show exactly where your money is going.

---

## Features

- 🤖 AI parses natural language into categorized expenses
- 📊 Dashboard with pie chart and bar chart
- 🏷️ 7 categories — Food, Transport, Education, Shopping, Entertainment, Health, Other
- 🔐 JWT authentication
- 📱 Fully responsive — mobile and desktop

## Tech Stack

| | |
|---|---|
| Frontend | React, Vite, Recharts, React Router |
| Backend | Node.js, Express, MongoDB Atlas |
| AI | Groq API — LLaMA 3.3 70B |
| Deploy | Vercel + Render |

---

## Setup

```bash
# Backend
cd server && npm install
cp .env.example .env   # fill your keys
node server.js

# Frontend
cd client && npm install
npm run dev
```

## Environment Variables

```env
# server/.env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/expensetracker
JWT_SECRET=your_secret_here
GROQ_API_KEY=gsk_your_groq_key

# client/.env
VITE_API_URL=http://localhost:5000/api
```

---

## Live Demo

🔗 [vercel-link.vercel.app](https://smart-expense-tracker-ten-rouge.vercel.app)

