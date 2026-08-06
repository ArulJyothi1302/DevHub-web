import { GoogleLogin } from "@react-oauth/google";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setAuthenticated } from "../utils/authSlice";
import { useNavigate } from "react-router";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const response = await api.post(
            `/auth/google`,
            {
              credential: credentialResponse.credential,
            },
            {
              withCredentials: true,
            },
          );
          dispatch(addUser(response.data.user));
          dispatch(setAuthenticated(true));
          if (!response.data.user.profileCompleted) {
            navigate("/profile");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.error(err);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;
