const {HumanMessage, SystemMessage} = require("@langchain/core/messages");
const createLLM = require("../utils/llm");

const llm = createLLM();

async function analyzeProfile(text) {
    try {
        const response = await llm.invoke([
            new SystemMessage("You are a helpful career advisor."),
            new HumanMessage(`Analyze this profile:\n${text}\nReturn key skills and job suggestions in JSON format.`),
        ]);

        // Check if response is valid
        if (!response || !response.content) {
            throw new Error("No valid content in response.");
        }

        // Return parsed response
        return JSON.parse(response.content);
    } catch (err) {
        console.error("Error in profile analysis:", err);  // More detailed error log
        throw new Error("Profile analysis failed");
    }
}

module.exports = {analyzeProfile};
