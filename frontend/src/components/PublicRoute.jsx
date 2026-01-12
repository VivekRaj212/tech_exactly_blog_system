import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated,loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
