const express = require("express");
const {profileAnalyzer} = require("../controllers/profileController");

const router = express.Router();

router.post("/analyze", profileAnalyzer);

module.exports = router;

