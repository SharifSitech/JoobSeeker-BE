const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { scrapeJobs } = require('../scraper/jobScraper'); // Assuming scrapeJobs function for job search
const { interviewCoachAgent } = require('../agents/interviewCoach');
const {summarizeJobs} = require("../agents/opportunityFinder"); // Assuming interviewCoachAgent for interview coaching

// Route definitions
router.get('/', mainController.home);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);


// Combined route
router.post("/combinedSearch", async (req, res) => {
    let { skills, education, experience } = req.body;

    education = education ? education.split(" ").join(" ") : "";
    const searchKeyword = ([...skills].join(" ").trim() + " " + education).trim() || "developer";

    try {
        // Call the Job Scraping Agent
        const jobs = await scrapeJobs(searchKeyword);
        const recommendations = await summarizeJobs(req.body, jobs);
        const interviewFeedback = await interviewCoachAgent({
            skills,
            experience,
            education
        });

        // Combine the results into one response
        res.json({
            jobs,
            recommendations,
            interviewFeedback
        });

    } catch (error) {
        console.error("Error processing the combined search:", error);
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});

module.exports = router;
