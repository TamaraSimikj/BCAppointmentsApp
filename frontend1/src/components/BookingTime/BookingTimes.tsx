import EmployeeService from "../../services/employee.service";
import CreateBTForm from "./CreateBTForm";
import ListBT from "./ListBT";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";

const BookingTimes = () => {
  const { showNotification } = useNotification();
  const { user } = useUser();

  const [isModalClosed, setIsModalClosed] = useState(false);

  const handleModalClose = () => {
    // console.log("modal closed emitted");
    setIsModalClosed(!isModalClosed);
  };

  const handleDeleteAll = async () => {
    try {
      await EmployeeService.deleteOldTimeslots(user?.employee.id);
      showNotification("Old timeslots successfully deleted.", "success");
    } catch (error) {
      showNotification(`Error deleting old timeslots: ${error}`, "error");
      console.error("Error deleting old timeslots:", error);
    }
  };
  return (
    <>
      <CreateBTForm onClose={handleModalClose} />
      <Box sx={{ textAlign: "center", margin: "0.5%" }}>
        <Button variant="outlined" color="error" onClick={handleDeleteAll}>
          Delete old not reserved
        </Button>
      </Box>

      <ListBT isModalClosed={isModalClosed} />
    </>
  );
};

export default BookingTimes;
