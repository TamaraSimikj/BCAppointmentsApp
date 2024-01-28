import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { Appointment } from "../../data/models/Models";
import AppointmentService from "../../services/appointment.service";
import AppointmentStatusIcon from "./AppointmentStatusIcon";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import { AppointmentStatus } from "../../data/enums";
import RateDialog from "../Review/RateDialog";

interface AppointmentsListProps {
  finished: boolean;
  appointments: Appointment[];
  onDecline: (appointment: Appointment) => void;
  //   onClose: () => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ finished, appointments, onDecline }) => {
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>({} as Appointment);

  const handleDecline = (event: any, appointment: Appointment) => {
    //  event.stopPropagation();
    setSelectedAppointment(appointment);
    setIsDeclineDialogOpen(true);
  };

  const callDecline = () => {
    onDecline(selectedAppointment);
    setIsDeclineDialogOpen(false);
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
              {/* <ListItemButton
                sx={{
                  height: "90px",
                  "&:hover": {
                    backgroundColor: "#f5f1e1",
                  },
                }}
              > */}
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
                      {appointment.service.name} in {appointment.salon.name} ({appointment.employee.name})
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Contact: {appointment.salon.number} / {appointment.employee.phoneNumber}
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
                    {!finished && appointment.status !== AppointmentStatus.DECLINED && (
                      <>
                        <Button variant="contained" color="error" onClick={(event) => handleDecline(event, appointment)}>
                          Decline
                        </Button>
                        <Dialog open={isDeclineDialogOpen} onClose={() => setIsDeclineDialogOpen(false)} maxWidth="sm">
                          <DialogTitle>Decline Appointment with ID:{selectedAppointment.id}</DialogTitle>
                          <DialogContent>
                            <Typography>
                              Are you sure you want to decline appointment on{" "}
                              {dayjs(selectedAppointment.bookingTime?.startTime).format("DD/MM/YYYY HH:mm")}?
                            </Typography>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={callDecline} variant="contained" color="error">
                              Decline
                            </Button>
                            <Button onClick={() => setIsDeclineDialogOpen(false)} variant="outlined">
                              Cancel
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    )}
                    {finished && (
                      // <Button variant="outlined" color="success" onClick={() => console.log("click")}>
                      //   Rate
                      // </Button>
                      <RateDialog appointment={appointment} isEditing={false} />
                    )}
                  </Stack>
                }
              />
              {/* </ListItemButton> */}
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default AppointmentsList;
