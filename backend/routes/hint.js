const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../config/db");

router.post("/", async (req, res) => {
  const { assignmentId, query } = req.body;

  if (!assignmentId || !query) {
    return res.status(400).json({
      error: "assignmentId and query are required",
    });
  }

  try {
    // 1. Get assignment detail for context
    const assignmentRes = await pool.query('SELECT * FROM assignments WHERE id = $1', [assignmentId]);
    const assignment = assignmentRes.rows[0] || { title: "Unknown", description: "No description" };

    // 2. Call Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a senior SQL mentor.

Task: Provide a helpful hint to a student working on the following assignment.

Assignment Title: ${assignment.title}
Assignment Goal: ${assignment.description}
Student's Current Query: ${query}

Rules:
- Give only a GUIDING HINT.
- Do NOT provide the full solution query.
- Identify what's missing (e.g., a WHERE clause, an aggregate, a GROUP BY).
- Keep it under 2-3 sentences.
- Be encouraging but professional.
`              },
            ],
          },
        ],
      }
    );

    const hint =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No hint generated";

    res.json({ hint });
  } catch (error) {
    console.error(
      "Error generating hint:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate hint" });
  }
});

module.exports = router;