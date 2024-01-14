import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole, path }) => {
  const { user } = useUser();

  if (!user || user.role !== requiredRole) {
    // Redirect to a login page or a page for unauthorized access
    return <Navigate to="/login" />;
  }

  return <Route path={path} element={element}></Route>;
};

export default ProtectedRoute;
