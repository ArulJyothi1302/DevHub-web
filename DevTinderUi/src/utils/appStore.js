import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionsSlice";
import requestSlice from "./requestSlice";
import authSlice from "./authSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionSlice,
    request: requestSlice,
    auth: authSlice,
  },
});
export default appStore;
