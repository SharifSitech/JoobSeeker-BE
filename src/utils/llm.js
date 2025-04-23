const {ChatOpenAI} = require("@langchain/openai");

function createLLM(options = {
    modelName: "gpt-3.5-turbo",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY
}) {
    return new ChatOpenAI({
        openAIApiKey: options.openAIApiKey,
        modelName: options.modelName,
        temperature: options.temperature,
        ...options
    });
}

module.exports = createLLM;
