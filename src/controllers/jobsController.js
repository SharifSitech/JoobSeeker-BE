const {scrapeJobs} = require("../scraper/jobScraper");
const {errorHandler} = require("../utils/errorHandler");
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
    } catch (error) {
        errorHandler(res, error, "Job search failed");
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

        res.json({
            jobs,
            recommendations,
            interviewFeedback
        });

    } catch (error) {
        errorHandler(res, error, "Error processing the combined search");
    }
}