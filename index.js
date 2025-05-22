require('dotenv').config();  // Make sure this is at the top of your file

const express = require('express');
const cors = require("cors");
const profileRoutes = require("./src/routes/profileRoutes");
const jobRoutes = require("./src/routes/jobsRoutes");
const interviewRoutes = require("./src/routes/interviewRoutes");
const requestLogger = require('./src/middlewares/loggerMiddleware');
const {authMiddleware} = require("./src/middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.ALLOW_ORIGIN_FOR,
    credentials: true,
}));
app.use(express.json());
app.use(requestLogger); // Apply to all routes

// Use Routes
app.use("/api/profile", authMiddleware, profileRoutes);
app.use("/api/jobs", authMiddleware, jobRoutes);
app.use("/api/interview", authMiddleware, interviewRoutes);

// Start server
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Server running at http://0.0.0.0:${PORT} for Docker`);
});
