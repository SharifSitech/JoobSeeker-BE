const {errorHandler} = require("../utils/errorHandler");
const {interviewCoachAgent} = require("../agents/interviewCoach");

exports.interviewCoach = async (req, res) => {
    try {
        const result = await interviewCoachAgent(req.body);

        res.json({feedback: result});
    } catch (error) {
        errorHandler(res, error, "Interview Coach Error");
    }
}