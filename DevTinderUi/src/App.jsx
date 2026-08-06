import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import "./index.css";

import AuthInitializer from "./Components/AuthInitializer";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Premium from "./Components/Premium";
import Privacy from "./Components/Privacy";
import Chat from "./Components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <AuthInitializer>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
              </Route>
            </Routes>
          </AuthInitializer>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
