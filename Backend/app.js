const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-coach-eo5u7dc9g-adiya-barswals-projects.vercel.app",
      "https://ai-interview-coach-g7sb2kl6o-adiya-barswals-projects.vercel.app", // ← Jo abhi error me dikh raha hai
      /\.vercel\.app$/, // ← Yeh line saare vercel.app domains ko dynamic allow karegi (Permanent Fix!)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// require all the routes here
const authRouter = require("./src/routes/auth.routes");

const interviewRouter = require("./src/routes/interview.routes");

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Interview Coach Backend is running successfully 🚀",
  });
});

// using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
