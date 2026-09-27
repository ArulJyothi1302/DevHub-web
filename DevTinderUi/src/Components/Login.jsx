import React, { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setAuthenticated } from "../utils/authSlice";
import { useNavigate } from "react-router";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const res = await api.post(
        "/auth/signup",
        {
          fName,
          lName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      const user = res?.data?.data ?? res?.data?.user ?? res?.data;
      dispatch(addUser(user));
      dispatch(setAuthenticated(true));

      const nextRoute = user?.profileCompleted === false ? "/profile" : "/";
      return navigate(nextRoute, { replace: true });
    } catch (err) {
      !isLogin && setErr(err?.response.data || "Something went wrong...");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      const user = res?.data?.data ?? res?.data?.user ?? res?.data;
      dispatch(addUser(user));
      dispatch(setAuthenticated(true));

      const nextRoute = user?.profileCompleted === false ? "/profile" : "/";
      return navigate(nextRoute, { replace: true });
    } catch (err) {
      setErr(err?.response?.data || "Something went Wrong");
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex justify-center my-4">
        <div className="card bg-base-100 image-full w-96 shadow-xl">
          <div className="card-body">
            <input
              type="checkbox"
              className="ms-auto toggle border-blue-500 bg-blue-500 [--tglbg:black] hover:bg-blue-700"
              defaultChecked
              onChange={() => {
                (setIsLogin(!isLogin),
                  setErr(""),
                  setFname(""),
                  setLname(""),
                  setEmail(""),
                  setPassword(""));
              }}
            />
            <h2 className="card-title mx-auto">
              {isLogin ? "Login" : "SignUp"}
            </h2>
            <div>
              {!isLogin && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </label>
                  <label>
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control my-1 w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <p className="text-red-600 ">{err}</p>

            <div className="card-actions justify-end">
              <button
                onClick={isLogin ? handleLogin : handleSignup}
                className="btn btn-primary m-auto my-2"
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
            <div>
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
