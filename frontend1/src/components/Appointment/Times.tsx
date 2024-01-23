import React, { useEffect, useState } from "react";

import { Grid, Button, Typography, FormControl, Select, InputLabel, MenuItem, Stack, Box } from "@mui/material";
import { Employee, Service } from "../../data/models/Models";
import { Calendar } from "react-multi-date-picker";
import AppointmentService from "../../services/appointment.service";
import EmployeeService from "../../services/employee.service";

type SlotTime = {
  time: string;
};
type SlotsData = {
  id: number;
  time: string;
  employeeId: number;
};
interface TimesProps {
  service: Service;
  onNext: (dataForm: any) => void;
}

const Times: React.FC<TimesProps> = ({ service, onNext }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<number | string>("-1");

  const [slotsData, setSlotsData] = useState<SlotsData[]>([]);
  const [slots, setSlots] = useState<SlotTime[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesData = await EmployeeService.getAllEmployeesForService(service.id);
      const employeesList = employeesData.map((employeeData: any) => employeeData.employee);
      setEmployees(employeesList);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee != "-1") {
      const filteredSlots = slotsData.filter((slot: any) => slot.employeeId == selectedEmployee);
      const uniqueTimeListFiltered: SlotTime[] = [...new Set(filteredSlots.map((slot: any) => slot.time))] as SlotTime[];
      setSlots(uniqueTimeListFiltered);
    } else {
      const uniqueTimeList: SlotTime[] = [...new Set(slotsData.map((slot: any) => slot.time))] as SlotTime[];
      setSlots(uniqueTimeList);
    }
  }, [selectedEmployee, slotsData]);
  const handleEmployeeChange = (employeeId: number | string) => {
    setSelectedEmployee(employeeId);

    // if (employeeId !== "-1") {
    //   const filteredSlots = slotsData.filter((slot: any) => slot.employeeId == employeeId);
    //   const uniqueTimeListFiltered: SlotTime[] = [...new Set(filteredSlots.map((slot: any) => slot.time))] as SlotTime[];
    //   setSlots(uniqueTimeListFiltered);
    // } else {
    //   const uniqueTimeList: SlotTime[] = [...new Set(slotsData.map((slot: any) => slot.time))] as SlotTime[];
    //   setSlots(uniqueTimeList);
    // }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date?.toString !== undefined) {
      let newDate = new Date(date);
      const formattedDate = newDate.toISOString().split(".")[0]; // Remove milliseconds
      console.log("formatted ", formattedDate);
      fetchSlots(formattedDate);
    }
  };
  const fetchSlots = async (date: String) => {
    const slots = await AppointmentService.getSlotsByDate(date, service.id);
    console.log("slots", slots);
    setSlotsData(slots);
    console.log("selectedEmployee on fetch", selectedEmployee);
    setSelectedTimeSlot(null);

    // if (selectedEmployee != "-1") {
    //   const filteredSlots = slots.filter((slot: any) => slot.employeeId == selectedEmployee);
    //   const uniqueTimeListFiltered: SlotTime[] = [...new Set(filteredSlots.map((slot: any) => slot.time))] as SlotTime[];
    //   setSlots(uniqueTimeListFiltered);
    // } else {
    const uniqueTimeList: SlotTime[] = [...new Set(slots.map((slot: any) => slot.time))] as SlotTime[];
    console.log("uniqueTimeList", uniqueTimeList);
    setSlots(uniqueTimeList);
    //}
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    console.log(`Selected time slot: ${timeSlot}`);
    setSelectedTimeSlot(timeSlot);

    const selectedSlot = slotsData.find((slot: any) => slot.time === timeSlot && (selectedEmployee === "-1" || slot.employeeId == selectedEmployee));

    // If a slot is found, log the booking ID
    if (selectedSlot) {
      const bookingId = selectedSlot.id;
      console.log(`Selected time slot: ${timeSlot}, Booking ID: ${bookingId}`);
    } else {
      console.log(`No booking found for time slot: ${timeSlot}`);
    }
  };
  const handleNextClick = () => {
    // You can pass the selected time slot and any other relevant data to the onNext function
    onNext({
      selectedTimeSlot,
      // Include other data if needed
    });
  };

  return (
    <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} gap={"2%"}>
      <Stack>
        <Typography variant="h6" gutterBottom>
          Select Date:
        </Typography>

        <Calendar value={selectedDate} onChange={(newDate: any) => handleDateChange(newDate)} className="teal" format="DD/MM/YYYY" />
        <Typography variant="h6" gutterBottom sx={{ marginTop: "5%" }}>
          Filter by employee:
        </Typography>
        <FormControl style={{ marginTop: "5%" }}>
          <InputLabel id="select-employee">Employee</InputLabel>
          <Select
            labelId="select-employee"
            id="select-id"
            value={selectedEmployee || -1}
            label="Employee"
            name="employee"
            onChange={(event) => handleEmployeeChange(event.target.value)}
            size="small"
          >
            <MenuItem value="-1" key="-1">
              {" "}
              all{" "}
            </MenuItem>
            {employees.map((empl: Employee) => (
              <MenuItem value={empl.id} key={empl.id}>
                {empl.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack>
        <Typography variant="h6" gutterBottom sx={{ width: "max-content" }}>
          Available Time Slots:
        </Typography>
        <Grid container spacing={2}>
          {slots.map((timeSlot: any) => (
            <Grid item key={timeSlot}>
              <Button
                variant={selectedTimeSlot == timeSlot ? "contained" : "outlined"}
                color="secondary"
                onClick={() => handleTimeSlotClick(timeSlot)}
                disabled={!selectedDate} // Disable if no date is selected
              >
                {timeSlot}
              </Button>
            </Grid>
          ))}
        </Grid>

        {selectedTimeSlot && (
          <Button variant="contained" color="primary" onClick={handleNextClick} sx={{ marginTop: "2%" }}>
            Next
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Times;
