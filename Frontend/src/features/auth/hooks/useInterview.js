import { useDispatch, useSelector } from "react-redux";

import {
  generateReport,
  getReportById,
  getAllReports,
} from "../../interview/services/interview.api";

import {
  setCurrentReport,
  setReports,
  setLoading,
  setError,
  clearError,
} from "../../../redux/slices/interviewSlice";

export function useInterview() {
  const dispatch = useDispatch();

  const { currentReport, reports, isLoading, error } = useSelector(
    (state) => state.interview,
  );

  // Generate Interview Report
  async function generate(data) {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await generateReport(data);

      dispatch(setCurrentReport(response.interviewReport));

      return response;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  // Get Single Report
  async function getReport(id) {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await getReportById(id);

      dispatch(setCurrentReport(response.report));

      return response;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  // Get All Reports
  async function getReports() {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await getAllReports();

      dispatch(setReports(response.reports));

      return response;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    currentReport,
    reports,
    isLoading,
    error,

    generate,
    getReport,
    getReports,
  };
}
