import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import SalonManagementComponent from "../components/Salon/SalonManagementComponent";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import Categories from "../components/Category/Categories";
import Services from "../components/Service/Services";
import BookingTimes from "../components/BookingTime/BookingTimes";
import ProtectedRoute from "./ProtectedRoute";
import RegisterAdmin from "../components/auth/RegisterAdmin";
import SelectedSalon from "../components/Salon/SelectedSalon";
import Times from "../components/Appointment/Times";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/salons" element={<SalonManagementComponent />} />
        <Route path="/register" element={<SignUp role={"ROLE_CLIENT"} />} />
        <Route path="/registerEmployee" element={<SignUp role={"ROLE_EMPLOYEE"} />} />
        <Route path="/login" element={<SignIn />} />
        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route element={<ProtectedRoute requiredRole={"ROLE_ADMIN"} />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          {/* Handle other routes */}
        </Route>{" "}
        <Route path="/services" element={<Services />} />
        <Route path="/bookingTimes" element={<BookingTimes />} />
        <Route path="/:id" element={<SelectedSalon />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
