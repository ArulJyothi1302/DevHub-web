import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { isCheckingAuth, isAuthenticated } = useSelector(
    (store) => store.auth,
  );
  const userData = useSelector((store) => store.user);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isAuthenticated && userData) {
    const destination = userData.profileCompleted === false ? "/profile" : "/";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
