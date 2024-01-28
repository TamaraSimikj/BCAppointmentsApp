import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { BookingTime, Service } from "../../data/models/Models";
import { useUser } from "../../contexts/UserContext";
import { AppointmentDTO } from "../../data/models/DTOs";
import { AppointmentStatus } from "../../data/enums";
import dayjs from "dayjs";
import backgroundImage from "../../assets/background-confirm.jpg";
import AppointmentService from "../../services/appointment.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

interface ConfirmationProps {
  goBack: () => void;
  onConfirm: () => void;
  service: Service;
  bookingTime: BookingTime;
}
const keyStyle = { fontWeight: "bold", marginBottom: "0.5rem" };
const valueStyle = { fontStyle: "italic", marginBottom: "1rem" };

const ConfirmationComponent: React.FC<ConfirmationProps> = ({ service, bookingTime, goBack, onConfirm }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [appointmentData, setAppointmentData] = useState<AppointmentDTO>({
    status: AppointmentStatus.PENDING,
    price: service.value,
    client: user?.client,
    bookingTime: bookingTime,
    salon: bookingTime.employee.salon,
    employee: bookingTime.employee,
    service: service,
  } as AppointmentDTO);

  const formattedStartTime = dayjs(bookingTime.startTime).format("YYYY-MM-DD HH:mm:ss");

  const handleClickConfirm = async () => {
    try {
      // Call the createAppointment function
      await AppointmentService.createAppointment(appointmentData);
      onConfirm();
      showNotification("Successfully created new appointment", "success");

      // Redirect to /myAppointments after successful creation
      //   navigate("/myAppointments");
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle the error as needed
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack alignItems={"center"}>
        <Stack sx={{ marginBottom: 3, marginLeft: "-10%" }}>
          <Typography variant="h4" color={"primary"}>
            Appointment Confirmation
          </Typography>

          <Typography alignSelf={"center"} sx={valueStyle}>
            Status:<span style={{ color: "#F2933p" }}> {AppointmentStatus.PENDING}</span>
          </Typography>
        </Stack>

        <Stack alignItems={"left"}>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Client:</Typography>
            <Typography sx={valueStyle}>{user?.client.name}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Service: </Typography>
            <Typography sx={valueStyle}>{service.name}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Employee:</Typography>
            <Typography sx={valueStyle}>{bookingTime.employee.name}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Start time:</Typography>
            <Typography sx={valueStyle}>{formattedStartTime}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Duration:</Typography>
            <Typography sx={valueStyle}>{bookingTime.duration}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography sx={keyStyle}>Price:</Typography>
            <Typography sx={valueStyle}>{service.value}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" onClick={goBack} color="primary">
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationComponent;
