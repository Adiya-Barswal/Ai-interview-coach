const pdf = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviwReport.model");

async function generateInterViewReportController(req, res) {
  const resumeFile = req.file;
  if (!req.file) {
    return res.status(400).json({
      message: "Resume file is required",
    });
  }
  // PDF Parse
  const resumeContent = await pdf(resumeFile.buffer);

  console.log("RESUME CONTENT:");
  console.log(resumeContent);
  console.log(typeof resumeContent);

  const { selfDescription, jobDescription } = req.body;

  // AI Response
  const interViewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  // Save to Database
  const interviewReport = await interviewReportModel.create({
    user: req.user._id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interViewReportByAi,
  });

  console.log("DATABASE SAVED");
  console.log("Saved Report ID:", interviewReport._id);

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

// Get All Reports
async function getAllInterviewReportsController(req, res) {
  const reports = await interviewReportModel
    .find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Interview reports fetched successfully",
    reports,
  });
}

// Get Single Report
async function getInterviewReportByIdController(req, res) {
  const { id } = req.params;

  const report = await interviewReportModel.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!report) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    report,
  });
}
// Generate ATS Resume PDF
async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;

  const interviewReport =
    await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
}

module.exports = {
  generateInterViewReportController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
  generateResumePdfController,
};
