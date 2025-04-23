require('dotenv').config();  // Make sure this is at the top of your file

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const mainRoutes = require('./routes/mainRoutes');
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();
const PORT = 3001;

app.use(cors({
    origin: "http://localhost:8080", // React app URL
    credentials: true,
}));
app.use(express.json());

// Use Routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interview", interviewRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
