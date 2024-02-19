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
} from "@mui/material";
import AuthService from "../../services/auth.service";
import { useUser } from "../../contexts/UserContext";
const ListBT = () => {
  const { user } = useUser();
  const [bookingTimes, setBookingTimes] = useState<BookingTime[]>([]);
  const [filteredBookingTimes, setFilteredBookingTimes] = useState<BookingTime[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getAllBookingTimesBySalon", user?.employee.salon.id);

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
  }, []);

  const handleEmployeeFilterChange = (event: SelectChangeEvent<number>) => {
    const employeeId = event.target.value as number;
    setSelectedEmployee(employees.find((empl) => empl.id === employeeId) || null);
  };

  useEffect(() => {
    // Apply employee filter
    const filteredByEmployee = selectedEmployee
      ? bookingTimes.filter((bookingTime) => bookingTime.employee.id === selectedEmployee.id)
      : bookingTimes;

    setFilteredBookingTimes(filteredByEmployee);
  }, [selectedEmployee, bookingTimes]);
  return (
    <>
      <FormControl sx={{ width: "200px", marginLeft: "20%", marginTop: "2%" }}>
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
      <TableContainer component={Paper} sx={{ width: "50%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Employee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookingTimes.map((bookingTime) => (
              <TableRow key={bookingTime.id}>
                <TableCell>{bookingTime.startTime}</TableCell>
                <TableCell>{bookingTime.duration}</TableCell>
                <TableCell>{bookingTime.employee.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListBT;
