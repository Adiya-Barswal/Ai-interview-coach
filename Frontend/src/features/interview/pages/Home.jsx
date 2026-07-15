import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Loader2,
  Briefcase,
  User,
  UploadCloud,
  FileCheck2,
  FileText,
} from "lucide-react";

import { useInterview } from "../../auth/hooks/useInterview";

export default function Home() {
  const navigate = useNavigate();

  // Form State
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  // Interview Hook
  const { generate, getReports, reports, isLoading, error } = useInterview();

  // Resume Upload
  function handleResumeChange(e) {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);
    }
  }

  // use effect
  useEffect(() => {
    getReports();
  }, []);

  // Generate Report
  async function handleGenerate() {
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload resume and enter job description.");
      return;
    }

    try {
      const response = await generate({
        resume: resumeFile,
        jobDescription,
        selfDescription,
      });

      navigate(`/interview/${response.interviewReport._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="min-h-screen bg-[#070514] text-white flex items-start justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 tracking-wide">
            <Sparkles className="text-purple-400 w-7 h-7 animate-pulse" />
            AI Interview <span className="text-purple-500">Coach</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Get AI-powered interview preparation and personalized insights
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3">
          {/* Job Description */}
          <div className="bg-[#131129]/60 border border-gray-800/60 rounded-xl p-5 flex flex-col min-h-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-950/40 rounded-lg text-purple-400">
                <Briefcase size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-[15px]">Job Description</h3>

                <p className="text-xs text-gray-400">
                  Paste the job description here
                </p>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description..."
              className="w-full flex-1 bg-[#090714] border border-gray-800 rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-2">
            {/* Upload Resume */}
            <div className="bg-[#131129]/60 border border-gray-800 rounded-xl p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-950/40 rounded-lg text-purple-400">
                  <UploadCloud size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[15px]">Upload Resume</h3>

                  <p className="text-xs text-gray-400">Upload PDF Resume</p>
                </div>
              </div>

              <label className="flex-1 border border-dashed border-gray-700 rounded-lg flex flex-col justify-center items-center cursor-pointer p-5">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleResumeChange}
                />

                <div className="p-3 bg-purple-600 rounded-full text-white mb-3">
                  {resumeFile ? (
                    <FileCheck2 size={20} />
                  ) : (
                    <UploadCloud size={20} />
                  )}
                </div>

                <span className="text-sm">
                  {resumeFile ? resumeFile.name : "Choose File or Drag & Drop"}
                </span>

                <span className="text-xs text-gray-500 mt-2">
                  PDF • Max 5 MB
                </span>
              </label>
            </div>

            {/* Self Description */}
            <div className="bg-[#131129]/60 border border-gray-800 rounded-xl p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-950/40 rounded-lg text-purple-400">
                  <User size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[15px]">
                    Self Description
                  </h3>

                  <p className="text-xs text-gray-400">Describe yourself</p>
                </div>
              </div>

              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Describe yourself..."
                className="w-full flex-1 bg-[#090714] border border-gray-800 rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}

        <div className="flex justify-center mt-10">
          <div className="w-full max-w-md">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Interview Report
                </>
              )}
            </button>

            {error && (
              <p className="text-red-400 text-sm text-center mt-4">{error}</p>
            )}

            <div className="mt-8 text-center">
              <p className="text-xs text-purple-400 flex justify-center items-center gap-2">
                <Sparkles size={12} />
                AI Powered Analysis
              </p>

              <p className="text-[11px] text-gray-500">
                Usually takes 20–30 seconds
              </p>
            </div>

            {/* ================= Recent Reports ================= */}

            <div className="mt-10 w-full border-t border-gray-800 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-3xl font-bold">
                  <Sparkles className="text-purple-500" size={22} />
                  Recent Reports
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className="cursor-pointer bg-[#131129]/70 border border-gray-800 rounded-xl p-5 hover:border-purple-500 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                        <FileText className="text-purple-400" size={22} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                          {report.jobDescription}
                        </h3>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-gray-400">Match Score</span>

                          <span className="font-bold text-purple-400">
                            {report.matchScore || 0}%
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
