const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({
      token,
    });

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authUser,
};
