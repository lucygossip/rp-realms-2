const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Extract token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. No token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Get user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. 🚨 STATUS CHECK (NEW CORE LOGIC)
    if (user.status === "banned") {
      return res.status(403).json({
        message: "Your account has been banned",
      });
    }

    if (user.status === "suspended") {
      return res.status(403).json({
        message: "Your account is suspended",
      });
    }

    // 6. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;