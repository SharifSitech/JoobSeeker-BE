const {scrapeJobs} = require("../scraper/jobScraper");
const {summarizeJobs} = require("../agents/opportunityFinder");
const {interviewCoachAgent} = require("../agents/interviewCoach");

exports.searchJobs = async (req, res) => {
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
}

exports.findWithFeedback = async (req, res) => {
    let {skills, education, experience} = req.body;

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
        res.status(500).json({error: "Something went wrong", details: error.message});
    }
}