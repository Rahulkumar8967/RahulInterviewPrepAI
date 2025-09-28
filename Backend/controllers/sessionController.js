const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc Create a new session and linked question
// @route POST /api/sessions/create
// @create Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions = [] } = req.body;

    // make sure user is attached from auth middleware
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user" });
    }

    // create session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // handle questions safely
    let questionDocs = [];
    if (Array.isArray(questions) && questions.length > 0) {
      questionDocs = await Promise.all(
        questions.map(async (q) => {
          const question = await Question.create({
            session: session._id,
            question: q.question,
            answer: q.answer,
          });
          return question._id;
        })
      );
    }

    // attach questions to session
    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("Create Session Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc Get all sessions for the logged-in user
// @route GET/api/sessions/my-sessions
// @access Private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Session is not create" });
  }
};

// desc Get a session by ID with populated questions
// @route GET/api/sessions/:id
// @access Private

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session is not found with this id" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Session is not create" });
  }
};

// @desc Delete a session and its questions
// @route DELETE /api/sessions/:id
// @access Private

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Check ownership
    if (!session.user.equals(req.user._id)) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this session",
      });
    }

    // Delete all questions linked to this session
    await Question.deleteMany({ session: session._id });

    // Delete the session
    await session.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete session",
      error: error.message,
    });
  }
};
