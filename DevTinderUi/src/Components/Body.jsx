import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { addUser } from "../utils/userSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    // Skip auth check if already on login page
    if (location.pathname === "/login") {
      setIsAuthResolved(true);
      return;
    }

    const hasUser = Boolean(
      userData?.id || userData?.email || userData?.username,
    );
    if (hasUser) {
      setIsAuthResolved(true);
      return;
    }

    let isMounted = true;
    setIsAuthResolved(false);

    const fetchUser = async () => {
      try {
        const res = await api.get("/profile/view", {
          withCredentials: true,
        });

        if (isMounted) {
          dispatch(addUser(res.data));
          setIsAuthResolved(true);
        }
      } catch (err) {
        if (isMounted) {
          navigate("/login", { replace: true });
          setIsAuthResolved(true);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch, location.pathname, navigate, userData]);

  if (location.pathname === "/login") {
    return <Outlet />;
  }

  if (!isAuthResolved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

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
