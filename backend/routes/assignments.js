const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM assignments ORDER BY id ');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ error: "Failed to fetch assignments" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM assignments WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching assignment:", error);
        res.status(500).json({ error: "Failed to fetch assignment" });
    }
});

module.exports = router;