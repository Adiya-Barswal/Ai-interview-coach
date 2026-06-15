const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    // Token hai ya nahi
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized/token not provided",
      });
    }

    // Blacklist check
    const isBlacklisted = await BlacklistTokenModel.findOne({
      token,
    });

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token has been blacklisted",
      });
    }

    // JWT verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User find karo
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Request me user attach karo
    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = { authUser };
