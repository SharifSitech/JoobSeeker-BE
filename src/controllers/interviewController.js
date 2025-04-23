const {interviewCoachAgent} = require("../agents/interviewCoach");

exports.interviewCoach = async (req, res) => {
    try {
        const result = await interviewCoachAgent(req.body);

        res.json({feedback: result});
    } catch (error) {
        console.error("Interview Coach error:", error);
        res.status(500).json({error: "Failed to get interview coaching feedback"});
    }
}