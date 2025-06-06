const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);
    const text = await result.response.text();

    const jsonMatch = text.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (!jsonMatch) {
      return res
        .status(500)
        .json({ message: "AI response does not contain valid JSON array" });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json({ success: true, data: parsed });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message || error,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res
        .status(400)
        .json({ message: "Missing required field: question" });
    }

    const prompt = conceptExplainPrompt(question);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);
    const text = await result.response.text();

    // Extract JSON object using regex
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(500).json({
        message: "AI response does not contain valid JSON",
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json({ success: true, data: parsed });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message || error,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
