const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware.js");

const interviewRouter = express.Router();

// Generate Report

interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);

// Generate ATS Resume PDF
interviewRouter.post(
  "/resume-pdf/:interviewReportId",
  authMiddleware.authUser,
  interviewController.generateResumePdfController,
);

// Get All Reports
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController,
);

// Get Single Report
interviewRouter.get(
  "/:id",
  authMiddleware.authUser,
  interviewController.getInterviewReportByIdController,
);

module.exports = interviewRouter;
