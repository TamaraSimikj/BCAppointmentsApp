// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HomePage from "./components/HomePage";
import SalonManagementComponent from "./components/Salon/SalonManagementComponent";
import NavBar from "./components/NavBar";
import { Box, Container, Paper, ThemeProvider } from "@mui/material";
import { theme } from "./assets/styles/themeStyles";
import "./index.css";
import Notification from "./components/Notification";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Categories from "./components/Category/Categories";
import Services from "./components/Service/Services";
import BookingTimes from "./components/BookingTime/BookingTimes";
import Salon from "./components/Salon/Salon";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navBarProps = {
    closeMobileMenu,
  };

  return (
    <div>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <Notification />
            <NavBar {...navBarProps} />
            {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Your App Name
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/salons" className="nav-link">
              Salons
            </Link>
          </li>
        </div>
      </nav> */}
            {/* <div className="container mt-3"> */}

            <Box>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/salons" element={<SalonManagementComponent />} />
                <Route path="/register" element={<SignUp role={"ROLE_CLIENT"} />} />
                <Route path="/registerEmployee" element={<SignUp role={"ROLE_EMPLOYEE"} />} />
                <Route path="/login" element={<SignIn />} />
                {/* <Route path="/categories" element={<Categories />} /> */}
                <Route path="/categories" element={<ProtectedRoute element={<Categories />} requiredRole="ROLE_ADMIN" path="/categories" />} />
                <Route path="/services" element={<Services />} />
                <Route path="/bookingTimes" element={<BookingTimes />} />
                <Route path="/:id" element={<Salon />} />
              </Routes>
            </Box>

            {/* </div> */}
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
