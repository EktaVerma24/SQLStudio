# CipherSQL Studio 🛡️

Hey! Welcome to **CipherSQL Studio**. This is a browser-based SQL learning platform I built to help students practice queries in a real-world environment without having to set up their own databases or servers.

The project combines a PostgreSQL sandbox for the actual data with a MongoDB persistence layer to track how users are doing. Plus, there's a little bit of AI magic to help you out when you're stuck.

---

## ✨ Key Features

- **Practice with Real Data**: I've pre-loaded a `users` table so you can jump straight into writing `SELECT` queries.
- **Smart Hints**: Stuck on a join or a where clause? Click "Get Hint" to get a nudge (not the answer!) from Gemini AI.
- **Instant Verdict**: The engine compares your query results with the expected answer using a stable normalization logic (handles sorting and data types automatically).
- **History Tracking**: Every attempt you make is saved to MongoDB Atlas, so we can see the progress and common mistakes.
- **Modern Dark UI**: Built with a custom SCSS system (mobile-first!) that stays easy on the eyes while you're coding.

---

## 🛠️ Tech Stack

### Frontend
- **React.js + Vite** for the core app.
- **Vanilla SCSS** (using BEM naming) for all styles — no heavy CSS frameworks here, just clean, custom components.
- **Monaco Editor** (the VS Code engine) for that premium coding feel.
- **Lucide React** for icons and **React Hot Toast** for those snappy notifications.

### Backend
- **Node.js + Express** handling the API routes.
- **PostgreSQL** for the challenge data.
- **MongoDB Atlas** for persisting your query attempts.
- **Google Gemini 1.5 Flash** for generating intelligent hints.

---

## 🚀 Getting Started

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file (see `.env.example` for what to put in there). You'll need your Postgres credentials, a MongoDB URI, and a Gemini API key.
4. `npm start` (Runs on port 5000)

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. In your `.env` file, make sure `VITE_API_URL` points to `http://localhost:5000/api`.
4. `npm run dev` (Runs on port 5173)

---

## 📝 A Note on the Data-Flow Diagram

As per the requirements, the **Data-Flow Diagram (DFD)** must be hand-drawn. I have documented the logic flow in the `Gap Analysis Report` within the docs folder to make it easier to sketch out. 

The flow basically goes: 
`User -> React App -> Express API -> PostgreSQL (Execution) -> Normalization (Comparison) -> MongoDB (Save Attempt) -> JSON Response back to UI`.

---

## 🐞 Recent Fixes
- **Normalization Bug**: Fixed an issue where the query engine would sometimes fail to match results if columns weren't in a specific type order. Now it uses a stable string-based sort.
- **Vanilla SCSS Migration**: Re-wrote the entire UI from Tailwind back to pure SCSS to stick to the "no frameworks" styling rule.

---

Hope you enjoy using it! If you find any bugs, feel free to open an issue. Happy querying! 🚀
