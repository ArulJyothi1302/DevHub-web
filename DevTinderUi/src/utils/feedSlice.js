import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      if (!state) {
        return action.payload;
      }
      state.push(...action.payload);
    },

    // Add this
    replaceFeed: (state, action) => {
      return action.payload;
    },

    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },

    clearFeed: () => {
      return null;
    },
  },
});

export const { addFeed, replaceFeed, removeFeed, clearFeed } =
  feedSlice.actions;

export default feedSlice.reducer;
