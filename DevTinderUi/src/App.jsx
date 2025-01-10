import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <h1>Hello</h1>
    </>
  );
}

export default App;
