const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklist.model");

// register controller
async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "please provide username, email and password",
      });
    }

    const isUserAlreadyExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Account already exist with this email address or usernames",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// login controller

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "please provide email and password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: " User login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// logout

async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    // Token hai ya nahi check karo
    if (!token) {
      return res.status(400).json({
        message: "No token found",
      });
    }

    // Token blacklist me save karo
    await BlacklistTokenModel.create({
      token,
    });

    // Browser/Postman ki cookie delete karo
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

//get me api
async function getMeController(req, res) {
  try {
    const user = await UserModel.findById(req.user.id);
    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,

        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
