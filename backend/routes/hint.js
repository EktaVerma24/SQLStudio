const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { assignmentId, query } = req.body;

  if (!assignmentId || !query) {
    return res.status(400).json({
      error: "assignmentId and query are required",
    });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
text: `
You are a senior SQL mentor.

Rules:
- Give only a guiding hint.
- Do NOT give full query.
- Encourage logical thinking.
- Keep under 3 sentences.
- Be concise and educationally clear.

Assignment ${assignmentId}
Student Query: ${query}
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