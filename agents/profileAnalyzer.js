const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

async function analyzeProfile(text) {
    try {
        const response = await model.invoke([
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

module.exports = { analyzeProfile };
