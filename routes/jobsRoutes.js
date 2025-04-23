const express = require("express");
const router = express.Router();
const {scrapeJobs} = require("../scraper/jobScraper");
const {summarizeJobs} = require("../agents/opportunityFinder"); // if using RAG

router.post("/search", async (req, res) => {
    let {skills, education} = req.body;

    education = education ? education.split(" ").join(" ") : "";
    const searchKeyword = ([...skills].join(" ").trim() + " " + education).trim() || "developer"; // fallback to 'developer' if no profile data

    try {
        const jobs = await scrapeJobs(searchKeyword); // Dynamic search based on user input
        const recommendations = await summarizeJobs(req.body, jobs); // Optional: rank jobs based on the user's profile

        res.json({jobs, recommendations});
    } catch (e) {
        console.error("🔴 Job search failed:", e);
        res.status(500).json({error: "Job search failed", details: e.message});
    }
});

module.exports = router;
