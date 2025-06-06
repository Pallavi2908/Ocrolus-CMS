// simple token based auth

import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Empty field value found" });
  }
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "error 500" });
  }
};

export default authMiddleware;
