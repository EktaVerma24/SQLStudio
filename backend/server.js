const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
 app.use(cors());
 app.use(express.json());

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

app.use('/api/assignments', assignmentRoutes);
app.use('/api/execute', executeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});