const { ChatOpenAI } = require("@langchain/openai");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");
const { JsonOutputParser } = require("@langchain/core/output_parsers");

const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7
});

async function interviewCoachAgent(profile) {
    const { yearsOfExperience, skills, education } = profile;

    const systemPrompt = `
You are an expert technical interview coach for software developers.

Based on the user's experience, skills, and education, provide:
- A list of 20 technical interview questions, each with a short but strong answer.
- 5 personalized interview tips.
- 5 areas for technical improvement.

Respond ONLY with valid JSON in the following format (without any extra explanations or comments):

{
  "interviewQuestions": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "interviewTips": ["string"],
  "improvementAreas": ["string"]
}
  `;

    const userPrompt = `
Profile:
- Experience: ${yearsOfExperience}
- Skills: ${skills.join(", ")}
- Education: ${education.trim() ? education : "No education provided"}
  `;

    const parser = new JsonOutputParser();

    try {
        const response = await llm
            .pipe(parser)
            .invoke([
                new SystemMessage(systemPrompt),
                new HumanMessage(userPrompt)
            ]);

        return response;
    } catch (error) {
        return {
            error: "Something went wrong",
            details: error.message
        };
    }
}

module.exports = { interviewCoachAgent };
