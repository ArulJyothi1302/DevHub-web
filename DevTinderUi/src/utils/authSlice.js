import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckingAuth: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthChecking: (state, action) => {
      state.isCheckingAuth = Boolean(action.payload);
    },
    setAuthenticated: (state, action) => {
      const nextValue = Boolean(action.payload);
      state.isAuthenticated = nextValue;
      state.isCheckingAuth = false;
    },
    resetAuth: (state) => {
      state.isCheckingAuth = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthChecking, setAuthenticated, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
