import AppointmentsList from "./AppointmentsList";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Appointment } from "../../data/models/Models";
import AppointmentService from "../../services/appointment.service";
import { Box, Stack } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";
import ReviewsList from "../Review/ReviewsList";

const Appointments = () => {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [finishedAppointments, setFinishedAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    if (user) {
      fetchAppointments(user.client.id);
    }
  }, [user]);

  const fetchAppointments = async (id: number) => {
    try {
      const data = await AppointmentService.getAppointmentsForUser(id); // Fetch appointments for the logged user
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const handleDecline = async (appointment: Appointment) => {
    try {
      const updatedAppointment = await AppointmentService.updateAppointmentStatus(appointment.id, "DECLINED");

      setAppointments((prevAppointments) =>
        prevAppointments.map((prevAppointment) => (prevAppointment.id === updatedAppointment.id ? updatedAppointment : prevAppointment))
      );

      showNotification("Appointment declined successfully", "success");
    } catch (error) {
      showNotification("Error declining appointment", "error");
    }
  };

  useEffect(() => {
    // Categorize appointments into upcoming and finished based on bookingTime
    const currentDate = new Date();
    const upcoming = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.bookingTime.startTime);
      return appointmentDate > currentDate;
    });

    const finished = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.bookingTime.startTime);
      return appointmentDate <= currentDate;
    });

    setUpcomingAppointments(upcoming);
    setFinishedAppointments(finished);
  }, [appointments]);

  return (
    <>
      <Stack direction={"row"} sx={{ padding: "5%", display: "flex", gap: 2, justifyContent: "space-between" }}>
        <AppointmentsList finished={false} appointments={upcomingAppointments} onDecline={handleDecline} />
        <AppointmentsList finished={true} appointments={finishedAppointments} onDecline={handleDecline} />
      </Stack>
    </>
  );
};

export default Appointments;
