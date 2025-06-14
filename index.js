require('dotenv').config();  // Make sure this is at the top of your file

const express = require('express');
const cors = require("cors");
const profileRoutes = require("./src/routes/profileRoutes");
const jobRoutes = require("./src/routes/jobsRoutes");
const interviewRoutes = require("./src/routes/interviewRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.ALLOW_ORIGIN_FOR,
    credentials: true,
}));
app.use(express.json());

// Use Routes
app.use('/api/profile', profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interview", interviewRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
