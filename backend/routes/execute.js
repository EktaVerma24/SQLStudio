const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const QueryAttempt = require('../models/QueryAttempt');

console.log("🔥 EXECUTE ROUTE FILE LOADED 🔥");


router.post('/', async (req, res) => {
    const { query, assignmentId } = req.body;

    if (!query) {
        return res.status(400).json({ message: "Query is required" });
    }

    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery.startsWith("select")) {
        return res.status(400).json({ message: "Only SELECT queries are allowed" });
    }

    try {
        // Run user's query
        const userResult = await pool.query(query);

        // Get expected query
        const assignmentResult = await pool.query(
            'SELECT expected_query FROM assignments WHERE id = $1',
            [assignmentId]
        );

        if (assignmentResult.rows.length === 0) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        const expectedQuery = assignmentResult.rows[0].expected_query;
        console.log("Expected Query:", expectedQuery);
        const expectedResult = await pool.query(expectedQuery);

        // Normalize results — convert all values to strings so number/string
        // type differences don't cause false mismatches, then sort rows and
        // within each row so order doesn't affect correctness.
        const normalizeRows = (rows) =>
            rows
                .map(row =>
                    JSON.stringify(
                        Object.values(row)
                            .map(v => String(v ?? ''))
                            .sort()
                    )
                )
                .sort();

        const userNormalized = normalizeRows(userResult.rows);
        const expectedNormalized = normalizeRows(expectedResult.rows);

        const isCorrect =
            JSON.stringify(userNormalized) ===
            JSON.stringify(expectedNormalized);

        // Save attempt to MongoDB (Persistence DB)
        try {
            console.log("💾 Saving attempt to MongoDB...");
            const attempt = await QueryAttempt.create({
                assignmentId,
                query,
                isCorrect
            });
            console.log("✅ Attempt saved to MongoDB ID:", attempt._id);
        } catch (mongoError) {
            console.error("❌ Failed to save attempt to MongoDB:", mongoError.message);
        }

        res.json({
            success: true,
            rowCount: userResult.rowCount,
            rows: userResult.rows,
            isCorrect
        });

    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({
            success: false,
            message: "Error executing query",
            error: error.message
        });
    }
});

module.exports = router;