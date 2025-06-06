const Question = require("../models/Question");

// Prompt to generate multiple interview questions and answers
const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI that only returns valid JSON.
Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write exactly ${numberOfQuestions} interview questions.
- For each, include a clean and detailed answer.
- If needed, include small code blocks.
- Do not explain or describe — only return raw JSON array like:
[
  {
    "question": "What is ...?",
    "answer": "Explanation ..."
  }
]
Return only the JSON array and nothing else — no headings, no text before/after.
`;


const conceptExplainPrompt = (question) => `
You are an AI that returns ONLY valid JSON.

Your task:
- Explain this interview question as if teaching a beginner: "${question}"
- Include clear explanation.
- Add a small code snippet if helpful.
- Include a short title.

Return the explanation as pure JSON in this format:
{
  "title": "Short Title",
  "explanation": "Detailed explanation here..."
}

Important:
- DO NOT return anything outside this JSON object.
- No headings, no markdown, no descriptions — just the JSON.
`;


module.exports = { questionAnswerPrompt, conceptExplainPrompt };
