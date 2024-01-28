import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppointmentsListEmpl from "./AppointmentsListEmpl";
import { useUser } from "../../contexts/UserContext";
import { Appointment } from "../../data/models/Models";
import AppointmentService from "../../services/appointment.service";
import { Upcoming } from "@mui/icons-material";
import { finished } from "stream";

const AppointmentsManagement = () => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [finishedAppointments, setFinishedAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    if (user) {
      fetchAppointments(user.employee.salon.id);
    }
  }, [user]);

  const fetchAppointments = async (id: number) => {
    try {
      const data = await AppointmentService.getAppointmentsForSalon(id);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
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
    <Stack direction={"row"} sx={{ padding: "5%", display: "flex", gap: 2, justifyContent: "space-between" }}>
      <AppointmentsListEmpl finished={false} appointmentsList={upcomingAppointments} />
      <AppointmentsListEmpl finished={true} appointmentsList={finishedAppointments} />
    </Stack>
  );
};

export default AppointmentsManagement;
