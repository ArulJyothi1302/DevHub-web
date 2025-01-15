import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
