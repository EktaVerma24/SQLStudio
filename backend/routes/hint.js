const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    const{assignmentId, query} = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Assignment ${assignmentId}.User's SQL query: ${query}. Provide hints to help the user correct their query.`,
                
                },
            ],
        });
        res.json({
            hint: completion.choices[0].message.content,
        });
    } catch (error) {
        res.status(500).json({ error: "Error generating hint" });
    }
    });
module.exports = router;