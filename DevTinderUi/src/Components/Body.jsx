import React, { useEffect } from "react";
import Navbar from "./navbar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(baseUrl + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
