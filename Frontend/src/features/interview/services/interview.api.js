import axios from "axios";

// Axios Instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/interview`,
  withCredentials: true,
});

// Generate Interview Report

export async function generateReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  try {
    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Generate Report Error:", err);

    throw (
      err.response?.data || {
        message: "Failed to generate interview report",
      }
    );
  }
}

// Get Report By ID

export async function getReportById(id) {
  try {
    const response = await api.get(`/${id}`);

    return response.data;
  } catch (err) {
    console.error("Get Report Error:", err);

    throw (
      err.response?.data || {
        message: "Failed to fetch report",
      }
    );
  }
}

// Get All Reports
export async function getAllReports() {
  try {
    const response = await api.get("/");

    return response.data;
  } catch (err) {
    console.error("Get All Reports Error:", err);

    throw (
      err.response?.data || {
        message: "Failed to fetch reports",
      }
    );
  }
}

export async function generateResumePdf(interviewReportId) {
  try {
    const response = await api.post(`/resume-pdf/${interviewReportId}`, null, {
      responseType: "blob",
    });

    return response.data;
  } catch (err) {
    console.error("Generate Resume PDF Error:", err);

    throw (
      err.response?.data || {
        message: "Failed to generate resume PDF",
      }
    );
  }
}
