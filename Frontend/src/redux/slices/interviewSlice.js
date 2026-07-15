import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentReport: null,
  reports: [],
  isLoading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload;
    },

    setReports: (state, action) => {
      state.reports = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearCurrentReport: (state) => {
      state.currentReport = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentReport,
  setReports,
  setLoading,
  setError,
  clearCurrentReport,
  clearError,
} = interviewSlice.actions;

export default interviewSlice.reducer;
