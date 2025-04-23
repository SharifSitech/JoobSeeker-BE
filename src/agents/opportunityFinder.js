const {SystemMessage, HumanMessage} = require("@langchain/core/messages");
const createLLM = require("../utils/llm");

const llm = createLLM();

async function summarizeJobs(profile, jobs) {
    const systemPrompt = `
You are an expert job search assistant.

Given a user's profile and a list of job postings, recommend the best matching jobs.
Consider:
- Matching the user's skills with the job title and description.
- Whether the experience level fits.
- Ignore jobs that are clearly unrelated.

Return only the top 5–10 matching jobs as a JSON array of objects in this format:
{
  "title": "string",
  "company": "string",
  "location": "string",
  "link": "string",
  "logo": "string",
  "reason": "short explanation of why it matches"
}
`;

    const userPrompt = `
User Profile:
- Years of Experience: ${profile.experience}
- Skills: ${profile.skills.join(", ")}

Job Listings:
${JSON.stringify(jobs)} 
`;

    try {
        const res = await llm.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userPrompt)
        ]);

        return JSON.parse(res.content);
    } catch (error) {
        return {error: true, message: error.message};
    }
}

module.exports = {summarizeJobs}