import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";
import { BookingTime, Employee } from "../../data/models/Models";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import AuthService from "../../services/auth.service";
import { useUser } from "../../contexts/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import { useNotification } from "../../hooks/useNotification";

interface ListBTProps {
  isModalClosed: boolean;
}
const ListBT: React.FC<ListBTProps> = ({ isModalClosed }) => {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [bookingTimes, setBookingTimes] = useState<BookingTime[]>([]);
  const [filteredBookingTimes, setFilteredBookingTimes] = useState<BookingTime[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    // console.log("isModalClosed", isModalClosed);
    const fetchData = async () => {
      try {
        const btData = await EmployeeService.getAllBookingTimesBySalon(user?.employee.salon.id);
        console.log("btData", btData);
        setBookingTimes(btData);
        setFilteredBookingTimes(btData);

        // console.log("btData", btData);
      } catch (error) {
        console.error("Error fetching booking times:", error);
      }
    };
    const fetchEmployees = async () => {
      try {
        const loggedEmployee = AuthService.getCurrentUser().employee;
        const employeesData = await EmployeeService.getAllEmployeesForSalon(loggedEmployee.salon.id);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
    fetchEmployees();
  }, [isModalClosed]);

  const handleEmployeeFilterChange = (event: SelectChangeEvent<number>) => {
    const employeeId = event.target.value as number;
    setSelectedEmployee(employees.find((empl) => empl.id === employeeId) || null);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Apply employee filter
    let filteredByEmployee = selectedEmployee ? bookingTimes.filter((bookingTime) => bookingTime.employee.id === selectedEmployee.id) : bookingTimes;

    // Apply date filter
    if (selectedDate) {
      const selectedDateFormatted = selectedDate.toISOString().split("T")[0];
      filteredByEmployee = filteredByEmployee.filter((bookingTime) => {
        const btFormatted = bookingTime.startTime.split("T")[0];
        return btFormatted.includes(selectedDateFormatted);
      });
    }
    console.log("filtered", filteredByEmployee);

    setFilteredBookingTimes(filteredByEmployee);
  }, [selectedEmployee, selectedDate, bookingTimes]);

  const handleDelete = async (bookingTime: BookingTime) => {
    console.log("Deleting booking time with id", bookingTime.id);
    try {
      await EmployeeService.deleteBookingTime(bookingTime.id);
      setFilteredBookingTimes((prevBookingTimes) => prevBookingTimes.filter((bt) => bt.id !== bookingTime.id));
      showNotification("Booking time deleted successfully", "success");
    } catch (error: any) {
      showNotification(error.response.data, "error");
      console.log("Error deleting booking time:", error.response.data);
    }
  };

  return (
    <>
      <Stack direction="row" sx={{ marginLeft: "25%", marginRight: "25%", marginTop: "2%", display: "flex", justifyContent: "space-between" }}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="employee-filter-label" size="small">
            Employee
          </InputLabel>
          <Select
            labelId="employee-filter-label"
            id="employee-filter"
            value={selectedEmployee ? selectedEmployee.id : ""}
            onChange={handleEmployeeFilterChange}
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {employees.map((empl) => (
              <MenuItem key={empl.id} value={empl.id}>
                {empl.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="date"
          label="Filter by date"
          type="date"
          InputLabelProps={{
            shrink: true,
            size: "small",
          }}
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(e: any) => handleDateChange(new Date(e.target.value))}
          sx={{ width: "200px", marginLeft: "5%" }}
        />
      </Stack>
      <TableContainer component={Paper} sx={{ width: "50%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookingTimes.map((bookingTime) => (
              <TableRow key={bookingTime.id}>
                <TableCell>{bookingTime.startTime}</TableCell>
                <TableCell>{bookingTime.duration}</TableCell>
                <TableCell>{bookingTime.employee.name}</TableCell>
                <TableCell>
                  <IconButton aria-label="decline" color="error" onClick={() => handleDelete(bookingTime)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListBT;
