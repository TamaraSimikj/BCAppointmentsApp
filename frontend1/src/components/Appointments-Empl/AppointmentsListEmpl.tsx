import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, ListItemButton, Stack, Button, Box, IconButton } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { Appointment } from "../../data/models/Models";
import AppointmentService from "../../services/appointment.service";
import AppointmentStatusIcon from "../Appointment/AppointmentStatusIcon";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { AppointmentStatus } from "../../data/enums";
import { useNotification } from "../../hooks/useNotification";

interface AppointmentsListProps {
  finished: boolean;
  appointmentsList: Appointment[];
}

const AppointmentsListEmpl: React.FC<AppointmentsListProps> = ({ finished, appointmentsList }) => {
  const { showNotification } = useNotification();
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsList);

  useEffect(() => {
    setAppointments(appointmentsList);
  }, [appointmentsList]);

  const handleApprove = async (appointment: Appointment) => {
    try {
      const updatedAppointment = await AppointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus.APPROVED);
      setAppointments((prevAppointments) =>
        prevAppointments.map((prevAppointment) => (prevAppointment.id === updatedAppointment.id ? updatedAppointment : prevAppointment))
      );

      showNotification("Appointment approved successfully", "success");
    } catch (error) {
      showNotification("Error approving appointment", "error");
      console.error("Error approving appointment:", error);
    }
  };

  const handleDecline = async (appointment: Appointment) => {
    try {
      //   const updatedAppointment = await AppointmentService.declineAppointment(appointment.id);
      const updatedAppointment = await AppointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus.DECLINED);

      setAppointments((prevAppointments) =>
        prevAppointments.map((prevAppointment) => (prevAppointment.id === updatedAppointment.id ? updatedAppointment : prevAppointment))
      );

      showNotification("Appointment declined successfully", "success");
    } catch (error) {
      showNotification("Error declining appointment", "error");
    }
  };
  return (
    <Stack sx={{ width: 600 }}>
      <Typography variant="h6" textAlign={"center"}>
        {finished ? "Finished " : "Upcoming "} Appointments
      </Typography>
      <Divider></Divider>
      <List dense sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}>
        {appointments.map((appointment: Appointment) => {
          const labelId = `appointment-list-item-${appointment.id}`;

          return (
            <ListItem
              key={appointment.id}
              disablePadding
              sx={{
                height: "90px",
                padding: "1em",
                "&:hover": {
                  backgroundColor: "#f5f1e1",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "whitesmoke" }}>
                  <AppointmentStatusIcon status={appointment.status} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={
                  <React.Fragment>
                    <Typography variant="subtitle1">
                      App. ID:{appointment.id} - {dayjs(appointment.bookingTime.startTime).format("YYYY-MM-DD HH:mm:ss")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {appointment.service.name} - {appointment.employee.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Client: {appointment.client.name} - {appointment.client.phoneNumber}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemText
                id={labelId}
                primary={
                  <Stack direction={"row"} justifyContent="flex-end">
                    <Typography variant="subtitle1" alignSelf={"center"} pr={2}>
                      Total: {appointment.service.value}
                    </Typography>
                    {!finished && (
                      <>
                        {appointment.status == AppointmentStatus.PENDING && (
                          <IconButton aria-label="approve" color="success" onClick={() => handleApprove(appointment)}>
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        )}
                        {appointment.status !== AppointmentStatus.DECLINED && (
                          <IconButton aria-label="decline" color="error" onClick={() => handleDecline(appointment)}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    )}
                  </Stack>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default AppointmentsListEmpl;
