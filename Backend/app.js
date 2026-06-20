const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// require all the routes here
const authRouter = require("./src/routes/auth.routes");

// using all the routes here
app.use("/api/auth", authRouter);

module.exports = app;
