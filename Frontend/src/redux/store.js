import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import interviewReducer from "./slices/interviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
});

export default store;
