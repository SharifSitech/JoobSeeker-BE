const express = require("express");
const {analyzeProfile} = require("../agents/profileAnalyzer.js");

const router = express.Router();

router.post("/analyze", async (req, res) => {
    try {
        const {text} = req.body;
        const result = await analyzeProfile(text);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Profile analysis failed"});
    }
});

module.exports = router;

