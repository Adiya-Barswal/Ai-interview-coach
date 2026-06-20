import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setAuthChecked } =
  authSlice.actions;
export default authSlice.reducer;
