import React from "react";
import { Service } from "../../data/models/Models";
import { IconButton, Stack, Box, Typography, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Times from "./Times";

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
  onSave: (serviceForm: any) => void;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ open, service, onSave, onClose }) => {
  const handleSave = () => {
    onSave({ object: "formReserve value" });
    console.log("save appointment clicked");
  };
  const handleClose = () => {
    console.log("cancel clicked");
    onClose();
  };
  const handleClickNext = (formData: any) => {
    console.log("next clicked, proceedd", formData);
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
        <Box sx={{ maxHeight: "500px", overflowY: "auto", width: "100%", paddingX: 4 }}>
          <Stack direction={"row"}>
            <Times service={service} onNext={(formData) => handleClickNext(formData)} />
          </Stack>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} padding={4}>
          <Button variant="outlined" onClick={handleClose} color="primary" sx={{ marginRight: "1%" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} color="secondary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
