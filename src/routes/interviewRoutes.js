const express = require("express");
const router = express.Router();
const {interviewCoach} = require("../controllers/interviewController");

router.post("/coach", interviewCoach);

module.exports = router;
