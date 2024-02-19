import EmployeeService from "../../services/employee.service";
import CreateBTForm from "./CreateBTForm";
import ListBT from "./ListBT";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";

const BookingTimes = () => {
  const { showNotification } = useNotification();

  const handleDeleteAll = async () => {
    try {
      // Call your service method to delete old timeslots
      await EmployeeService.deleteOldTimeslots();
      showNotification("Old timeslots successfully deleted.", "success");
    } catch (error) {
      showNotification(`Error deleting old timeslots: ${error}`, "error");
      console.error("Error deleting old timeslots:", error);
    }
  };
  return (
    <>
      <CreateBTForm />
      <Box sx={{ textAlign: "center", margin: "0.5%" }}>
        <Button variant="outlined" color="error" onClick={handleDeleteAll}>
          Delete old not reserved
        </Button>
      </Box>

      <ListBT />
    </>
  );
};

export default BookingTimes;
