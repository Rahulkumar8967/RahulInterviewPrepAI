const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc Add additional questions to an existing session
// @route POST/api/question/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
        note: q.note || "",
        isPinned: q.isPinned || false,
      }))
    );

    // Add the new question IDs to the session
    const newQuestionIds = createdQuestions.map((q) => q._id);
    session.questions.push(...newQuestionIds);
    await session.save();

    res.status(201).json({
      success: true,
      message: "Questions added successfully",
      questions: createdQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// @desc Pin or unpin a question
// @route POST/ api/ question/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }
    
    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
 };

// @desc update a note for a question
// @route POST /api/question/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.note = note || "";
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

