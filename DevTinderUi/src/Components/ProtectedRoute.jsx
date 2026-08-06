import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProtectedRoute = () => {
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

  // Auth check complete but not authenticated
  if (!isAuthenticated || !userData) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated - render protected routes
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

export default ProtectedRoute;
