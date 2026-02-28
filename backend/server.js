require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const hintRoutes = require('./routes/hint');
const app = express();
const rateLimit = require('express-rate-limit');

 app.use(cors());
 app.use(express.json());
 app.use('/api/hint', hintRoutes);

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

const assignmentRoutes = require('./routes/assignments');
const executeRoutes = require('./routes/execute');
const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 50
});

app.use(limiter);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/execute', executeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});