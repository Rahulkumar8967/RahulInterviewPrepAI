const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract token

      // 👇 Print token and secret BEFORE verification
    // // console.log("Incoming Token =", token);
    // //  console.log("JWT_SECRET =", process.env.JWT_SECRET);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token missing or malformed" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Not authorized, token verification failed",
        error: error.message,
      });
  }
};

module.exports = { protect };
