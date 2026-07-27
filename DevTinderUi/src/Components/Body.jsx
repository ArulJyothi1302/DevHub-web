import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      return;
    }
    const fetchUser = async () => {
      try {
        if (userData) return;
        const res = await api.get("/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [userData]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
