const { Router } = require("express");

const authController = require("../controllers/auth.controller");

const authMiddlewere = require("../middlewares/auth.middleware");

const authRouter = Router();

// Register api
authRouter.post("/register", authController.registerUserController);

// Login api
authRouter.post("/login", authController.loginUserController);

// logout api
authRouter.get("/logout", authController.logoutUserController);

// get me api

authRouter.get(
  "/get-me",
  authMiddlewere.authUser,
  authController.getMeController,
);

module.exports = authRouter;
