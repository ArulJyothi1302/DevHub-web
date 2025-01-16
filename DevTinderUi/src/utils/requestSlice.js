import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const reqArr = state.filter((myReq) => myReq._id !== action.payload);
      return reqArr;
    },
  },
});
export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
