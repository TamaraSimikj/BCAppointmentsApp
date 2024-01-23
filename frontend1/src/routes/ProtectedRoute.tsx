import React, { useEffect, useState } from "react";
import { Route, Navigate, RouteProps, useNavigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import SignIn from "../components/auth/SignIn";
import { Grid } from "@mui/material";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user === null || user.role !== requiredRole) {
      navigate("/login");
    }
  }, []);

  return (
    <Grid container direction="column" width="100%" flexWrap="nowrap">
      <Grid container direction="row" flexWrap="nowrap">
        <Grid item></Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default ProtectedRoute;

// interface ProtectedRouteProps {
//   path: string;
//   element: React.ReactNode;
//   requiredRole: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole, path }) => {
//   const { user } = useUser();

//   if (!user || user.role !== requiredRole) {
//     // Redirect to a login page or a page for unauthorized access
//     return <Navigate to="/login" />;
//   }

//   return <Route path={path} element={element} />;
//   // <Route path={path} element={element}></Route>;
// };

// export default ProtectedRoute;
