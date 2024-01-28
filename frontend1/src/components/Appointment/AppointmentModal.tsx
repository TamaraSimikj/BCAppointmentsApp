import React, { useState } from "react";
import { BookingTime, Service } from "../../data/models/Models";
import { IconButton, Stack, Box, Typography, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Times from "./Times";
import ConfirmationComponent from "./ConfirmationComponent";
import AppointmentService from "../../services/appointment.service";
import backgroundImage from "../../assets/background-confirm.jpg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  maxHeight: "900px",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};
interface AppointmentModalProps {
  open: boolean;
  service: Service;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ open, service, onClose }) => {
  const [showTimes, setShowTimes] = useState(true);
  const [bookingTime, setBookingTime] = useState<BookingTime>({} as BookingTime);

  //   const handleSave = () => {
  //     console.log("save appointment clicked");
  //     setShowTimes(true);
  //     onClose();
  //   };
  const handleClose = () => {
    console.log("cancel clicked");
    setShowTimes(true);
    onClose();
  };
  const handleClickNext = async (bookingTimeId: number) => {
    console.log("next clicked, proceedd", bookingTimeId);
    const getBT = await AppointmentService.getBookingTime(bookingTimeId);
    console.log("get booking time", getBT);
    setBookingTime(getBT);
    setShowTimes(false);
  };

  const handleGoBack = () => {
    setShowTimes(true); // Set to true to show the Times component again
  };
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} sx={{ padding: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Make an appointment
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box sx={{ height: "400px", overflowY: "auto", width: "100%", paddingX: 4 }}>
          <Stack direction={"row"}>
            {showTimes ? (
              <Times service={service} onNext={(bookingTimeId) => handleClickNext(bookingTimeId)} />
            ) : (
              <ConfirmationComponent service={service} bookingTime={bookingTime} goBack={handleGoBack} onConfirm={handleClose} />
            )}
          </Stack>
        </Box>
        {/* <Box display={"flex"} justifyContent={"space-between"} padding={4}>
          {!showTimes && (
            <>
              <Button variant="outlined" onClick={handleGoBack} color="primary">
                Back
              </Button>
              <Stack display={"flex"} direction={"row"} gap={2} justifyContent={"flex-end"}>
                <Button variant="outlined" onClick={handleClose} color="primary" sx={{ marginRight: "1%" }}>
                  Cancel
                </Button>

                <Button variant="contained" onClick={handleSave} color="secondary">
                  Save
                </Button>
              </Stack>
            </>
          )}
        </Box> */}
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
