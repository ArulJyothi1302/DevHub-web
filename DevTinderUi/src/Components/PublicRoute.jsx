import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { isCheckingAuth, isAuthenticated } = useSelector((store) => store.auth);
  const userData = useSelector((store) => store.user);

  // Still checking auth - show loading
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  // Already authenticated - redirect to home
  if (isAuthenticated && userData) {
    return <Navigate to="/" replace />;
  }

  // Not authenticated - show login
  return <Outlet />;
};

export default PublicRoute;
