const {analyzeProfile} = require("../agents/profileAnalyzer");
const {errorHandler} = require("../utils/errorHandler");

exports.profileAnalyzer = async (req, res) => {
    try {
        const {text} = req.body;
        const result = await analyzeProfile(text);

        res.json(result);
    } catch (error) {
        errorHandler(res, error, "Profile analysis failed");
    }
}