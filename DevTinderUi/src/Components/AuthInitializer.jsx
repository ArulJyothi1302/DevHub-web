import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import api from "../utils/api";
import { addUser } from "../utils/userSlice";
import {
  resetAuth,
  setAuthenticated,
  setAuthChecking,
} from "../utils/authSlice";

const PUBLIC_PATHS = ["/login"];

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isCheckingAuth } = useSelector((store) => store.auth);
  const userData = useSelector((store) => store.user);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    const isPublicRoute = PUBLIC_PATHS.includes(location.pathname);

    if (isPublicRoute) {
      if (isCheckingAuth) {
        dispatch(setAuthChecking(false));
        dispatch(resetAuth());
      }
      return;
    }

    if (!isCheckingAuth || hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;

    const initializeAuth = async () => {
      if (userData?.id || userData?.email) {
        dispatch(setAuthenticated(true));
        return;
      }

      try {
        const res = await api.get("/profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
        dispatch(setAuthenticated(true));
      } catch (err) {
        dispatch(resetAuth());
      }
    };

    initializeAuth();
  }, [dispatch, isCheckingAuth, location.pathname, userData]);

  return children;
};

export default AuthInitializer;
