const express = require("express");
const router = express.Router();
const {searchJobs, findWithFeedback} = require("../controllers/jobsController"); // if using RAG

router.post("/search", searchJobs);
router.post("/find-with-feedback", findWithFeedback);

module.exports = router;
