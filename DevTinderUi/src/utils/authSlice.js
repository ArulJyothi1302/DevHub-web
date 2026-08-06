import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isCheckingAuth: true, // Critical: start with true so nothing renders
    isAuthenticated: false,
  },
  reducers: {
    setAuthChecking: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      state.isCheckingAuth = false;
    },
  },
});

export const { setAuthChecking, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
