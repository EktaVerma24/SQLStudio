require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const hintRoutes = require('./routes/hint');
const app = express();
const rateLimit = require('express-rate-limit');
const dataRoutes = require('./routes/data');
const connectDB = require('./config/mongodb');

// Connect to MongoDB (Persistence DB)
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/hint', hintRoutes);
app.use('/api/data', dataRoutes);

app.get("/", (req, res) => {
    res.send("CipherSQL Studio Backend is running!");
});

//     app.get("/test-db", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT NOW()");
//         res.json({ message: "Database connection successful!", time: result.rows[0].now });
//     } catch (error) {
//         console.error("Database connection error:", error);
//         res.status(500).json({ message: "Database connection failed", error: error.message });
//     }
// });

// Test DB connection on startup

pool.query("SELECT NOW()")
    .then(res => console.log("DB Connected:", res.rows))
    .catch(err => console.error("DB Connection Error:", err));

const assignmentRoutes = require('./routes/assignments');
const executeRoutes = require('./routes/execute');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50
});

app.use(limiter);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/execute', executeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});