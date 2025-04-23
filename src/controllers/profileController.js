const {analyzeProfile} = require("../agents/profileAnalyzer");

exports.profileAnalyzer = async (req, res) => {
    try {
        const {text} = req.body;
        const result = await analyzeProfile(text);

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Profile analysis failed"});
    }
}