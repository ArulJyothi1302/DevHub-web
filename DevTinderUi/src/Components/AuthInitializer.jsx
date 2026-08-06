import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { addUser } from "../utils/userSlice";
import { setAuthenticated, setAuthChecking } from "../utils/authSlice";

/**
 * AuthInitializer - runs ONCE on app mount to check authentication
 * This prevents routes from rendering until we know auth status
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((store) => store.auth);
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const initializeAuth = async () => {
      // If already have user data, skip check
      if (userData?.id || userData?.email) {
        dispatch(setAuthenticated(true));
        return;
      }

      try {
        const res = await api.get("/profile/view", {
          withCredentials: true,
        });

        // User is authenticated
        dispatch(addUser(res.data));
        dispatch(setAuthenticated(true));
      } catch (err) {
        // User is not authenticated (401 is expected)
        dispatch(setAuthenticated(false));
      }
    };

    if (isCheckingAuth) {
      initializeAuth();
    }
  }, []); // Run only once on mount

  return children;
};

export default AuthInitializer;
