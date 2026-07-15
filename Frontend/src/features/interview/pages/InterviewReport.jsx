import { Download, Loader2 } from "lucide-react";
import { generateResumePdf } from "../services/interview.api";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Terminal, Users, Map, ArrowRight } from "lucide-react";

import { useInterview } from "../../auth/hooks/useInterview";

export default function InterviewReport() {
  const { id } = useParams();

  const [downloading, setDownloading] = useState(false);

  const [openIndex, setOpenIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("technical");

  const { currentReport, getReport, isLoading, error } = useInterview();

  useEffect(() => {
    if (id) {
      getReport(id);
    }
  }, [id]);

  // Download ATS Resume PDF

  const handleDownloadResume = async () => {
    try {
      setDownloading(true);

      const pdf = await generateResumePdf(id);

      const url = window.URL.createObjectURL(new Blob([pdf]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download resume");
    } finally {
      setDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070514] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070514] text-red-400">
        {error}
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070514] text-gray-400">
        Report Not Found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#070514] text-white flex items-start justify-center px-8 pt-0 pb-16 overflow-y-auto">
      <div className="w-full max-w-[1400px] bg-[#0c0a1e] border border-gray-800/60 rounded-2xl grid grid-cols-12 overflow-hidden shadow-2xl shadow-black/80 mx-auto mt-4 mb-10">
        {/* ================= Sidebar ================= */}

        <aside className="col-span-12 md:col-span-2 border-r border-gray-800/40 p-6 pt-10 flex flex-col items-center">
          <h2 className="text-[15px] font-semibold mb-10 text-gray-200 tracking-wide text-center">
            Interview Report
          </h2>

          <nav className="w-full flex flex-col items-center">
            {/* Technical */}

            <button
              onClick={() => {
                setActiveSection("technical");
                setOpenIndex(null);
              }}
              className={`w-full max-w-[170px] justify-center px-4 py-3 rounded-xl flex items-center gap-2 text-xs mt-6
                ${
                  activeSection === "technical"
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/20"
                }`}
            >
              <Terminal size={14} />
              <span>Technical Questions</span>
            </button>

            {/* Behavioral */}

            <button
              onClick={() => {
                setActiveSection("behavioral");
                setOpenIndex(null);
              }}
              className={`w-full max-w-[170px] justify-center px-4 py-3 rounded-xl flex items-center gap-2 text-xs mt-4
                ${
                  activeSection === "behavioral"
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/20"
                }`}
            >
              <Users size={14} />
              <span>Behavioral Questions</span>
            </button>

            {/* Roadmap */}

            <button
              onClick={() => {
                setActiveSection("roadmap");
                setOpenIndex(null);
              }}
              className={`w-full max-w-[170px] justify-center px-4 py-3 rounded-xl flex items-center gap-2 text-xs mt-4
                ${
                  activeSection === "roadmap"
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-900/20"
                }`}
            >
              <Map size={14} />
              <span>Roadmap</span>
            </button>

            {/* Download Resume */}

            <div className="w-full mt-8">
              <button
                onClick={handleDownloadResume}
                disabled={downloading}
                className="w-full max-w-[170px] mx-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition text-sm"
              >
                {downloading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Resume</span>
                  </>
                )}
              </button>
            </div>
          </nav>
        </aside>

        {/* ================= Main ================= */}

        <main className="col-span-12 md:col-span-8 border-r border-gray-800/40 p-10 flex flex-col items-center">
          {/* ================= Technical ================= */}
          {activeSection === "technical" && (
            <>
              <div className="text-center mb-2">
                <h1 className="text-xl font-bold text-gray-100">
                  Technical Questions
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                  AI generated interview questions based on your resume.
                </p>
              </div>

              <div className="w-full space-y-4 mt-10">
                {currentReport.technicalQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#120f2d]/60 border border-gray-800/40 rounded-xl p-6 py-8 shadow-lg mx-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>

                      <span className="text-[11px] font-bold tracking-wider text-gray-400">
                        TECHNICAL
                      </span>
                    </div>

                    <p className="text-[14px] font-medium text-gray-200 leading-relaxed mb-6">
                      {item.question}
                    </p>

                    <div className="border-t border-gray-800/30 pt-4">
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="text-xs text-purple-400 flex items-center gap-1 bg-purple-950/20 border border-purple-900/30 px-3 py-1.5 rounded-lg"
                      >
                        {openIndex === index ? "Hide Answer" : "View Answer"}

                        <ArrowRight
                          size={13}
                          className={`transition-transform duration-300 ${
                            openIndex === index ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {openIndex === index && (
                        <div className="mt-5 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Intention
                            </h4>

                            <p className="text-sm text-gray-400 mt-1">
                              {item.intention}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Suggested Answer
                            </h4>

                            <p className="text-sm text-gray-400 mt-1">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}{" "}
          {/* ================= Behavioral ================= */}
          {activeSection === "behavioral" && (
            <>
              <div className="text-center mb-2">
                <h1 className="text-xl font-bold text-gray-100">
                  Behavioral Questions
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                  AI generated behavioral interview questions based on your
                  resume.
                </p>
              </div>

              <div className="w-full space-y-4 mt-10">
                {currentReport.behavioralQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#120f2d]/60 border border-gray-800/40 rounded-xl p-6 py-8 shadow-lg mx-6"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>

                      <span className="text-[11px] font-bold tracking-wider text-gray-400">
                        BEHAVIORAL
                      </span>
                    </div>

                    <p className="text-[14px] font-medium text-gray-200 leading-relaxed mb-6">
                      {item.question}
                    </p>

                    <div className="border-t border-gray-800/30 pt-4">
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="text-xs text-purple-400 flex items-center gap-1 bg-purple-950/20 border border-purple-900/30 px-3 py-1.5 rounded-lg"
                      >
                        {openIndex === index ? "Hide Answer" : "View Answer"}

                        <ArrowRight
                          size={13}
                          className={`transition-transform duration-300 ${
                            openIndex === index ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {openIndex === index && (
                        <div className="mt-5 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Intention
                            </h4>

                            <p className="text-sm text-gray-400 mt-1">
                              {item.intention}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Suggested Answer
                            </h4>

                            <p className="text-sm text-gray-400 mt-1">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* ================= Roadmap ================= */}
          {activeSection === "roadmap" && (
            <>
              <div className="text-center mb-2">
                <h1 className="text-xl font-bold text-gray-100">
                  Preparation Roadmap
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                  AI generated preparation plan.
                </p>
              </div>

              <div className="w-full space-y-5 mt-10 px-6">
                {currentReport.preparationPlan.map((day, index) => (
                  <div
                    key={index}
                    className="bg-[#120f2d]/60 border border-gray-800/40 rounded-xl p-6"
                  >
                    <h2 className="text-purple-400 font-semibold text-lg">
                      Day {day.day}
                    </h2>

                    <p className="text-gray-300 mt-2">{day.focus}</p>

                    <ul className="list-disc ml-5 mt-4 space-y-2">
                      {day.tasks.map((task, i) => (
                        <li key={i} className="text-gray-400 text-sm">
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* ================= Skill Gaps ================= */}

        <section className="col-span-12 md:col-span-2 p-6 pt-10">
          <h3 className="text-sm font-semibold mb-6 text-gray-200 text-center">
            Skill Gaps
          </h3>

          {/* Match Score */}

          <div className="bg-[#120f2d]/40 border border-gray-800/40 rounded-xl p-5 mb-8 text-center">
            <h4 className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">
              Match Score
            </h4>

            <div className="mt-4 text-5xl font-bold text-purple-400">
              {currentReport.matchScore}%
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Resume vs Job Description
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {currentReport.skillGaps.map((item, index) => (
              <span
                key={index}
                className={`text-[11px] px-2.5 py-1 rounded-full border
                  ${
                    item.severity === "high"
                      ? "bg-rose-950/30 text-rose-400 border-rose-900/40"
                      : item.severity === "medium"
                        ? "bg-amber-950/30 text-amber-400 border-amber-900/40"
                        : "bg-emerald-950/30 text-emerald-400 border-emerald-900/40"
                  }`}
              >
                {item.skill}
              </span>
            ))}
          </div>

          <div className="bg-[#120f2d]/40 border border-gray-800/40 rounded-xl p-4">
            <h4 className="text-[10px] uppercase tracking-wider text-center text-gray-500 font-bold mb-3">
              Severity
            </h4>

            <ul className="space-y-3 text-xs">
              {currentReport.skillGaps.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-gray-300"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5
                      ${
                        item.severity === "high"
                          ? "bg-rose-500"
                          : item.severity === "medium"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                  ></span>

                  <span>
                    <strong className="capitalize">{item.severity}</strong> —{" "}
                    {item.skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
