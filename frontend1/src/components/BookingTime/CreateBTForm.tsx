import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { BookingTime, Employee } from "../../data/models/Models";
import EmployeeService from "../../services/employee.service";
import AuthService from "../../services/auth.service";
import FormEmployee from "./FormEmployee";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import dayjs from "dayjs";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { DateObject, Value } from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Label, Padding } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import "react-multi-date-picker/styles/colors/teal.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNotification } from "../../hooks/useNotification";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  maxHeight: "900px",
  //overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "5px",
  // border: "2px solid #000",
  boxShadow: 24,
  //p: 4,
};
export interface EmployeeData {
  employee: Employee;
  fromTime: string;
  toTime: string;
  fromTime1: string;
  toTime1: string;
  slotsDuration: number;
  dates: any;
}

const CreateBTForm = () => {
  const [open, setOpen] = useState(false);
  const { showNotification } = useNotification();

  const handleOpen = () => setOpen(true);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeDataList, setEmployeeDataList] = useState<EmployeeData[]>([]);

  const [rangeValues, setRangeValues] = useState<Value>(null);

  const [formData, setFormData] = useState({
    type: "",
    employee: {} as Employee,
    slotsDuration: 30,
    fromTime: "08:00",
    toTime: "12:30",
    fromTime1: "13:00",
    toTime1: "16:00",
  });

  const handleChangeOnInput = (key: string, value: string | number | boolean | any): void => {
    if (key == "employee") {
      let employee = employees.find((e) => e.id === value);
      setFormData({
        ...formData,
        employee: employee || ({} as Employee),
      });
      return;
    }

    setFormData({
      ...formData,
      [key]: value,
    });

    //console.log(key, value);
  };

  const handleSave = async () => {
    console.log("save clicked");
    console.log("Employee data list from child components:", employeeDataList);
    if (formData.type !== "" && employeeDataList.length !== 0) {
      await EmployeeService.createBookingTimes(employeeDataList);
      showNotification("Booking times created successfully!", "success");
      handleClose();
    } else {
      showNotification("Please fill all fields!", "warning");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRangeValues([]);
    setEmployeeDataList([]);
    setFormData({
      type: "",
      employee: {} as Employee,
      slotsDuration: 30,
      fromTime: "08:00",
      toTime: "12:30",
      fromTime1: "13:00",
      toTime1: "16:00",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedEmployee = AuthService.getCurrentUser().employee;
        console.log("loggedEmployee", loggedEmployee);
        const employeesData = await EmployeeService.getAllEmployeesForSalon(loggedEmployee.salon.id);
        setEmployees(employeesData);
        console.log("employeesData", employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const updateEmployeeData = (updatedEmployeeData: EmployeeData) => {
    setEmployeeDataList((prevList) => {
      const updatedList = [...prevList];
      const index = updatedList.findIndex((data) => data.employee.id === updatedEmployeeData.employee.id);

      if (index !== -1) {
        updatedList[index] = updatedEmployeeData;
      } else {
        updatedList.push(updatedEmployeeData);
      }
      return updatedList;
    });
    //  console.log("employeeDataList", employeeDataList);
  };

  return (
    <>
      <div>
        <Stack direction={"row"} justifyContent={"center"} mt={"2%"}>
          {" "}
          <Typography variant="h5" alignSelf={"center"}>
            Booking Times
          </Typography>
          <Button onClick={handleOpen} variant="contained" color="secondary" sx={{ marginLeft: "2%" }}>
            Create new
          </Button>
        </Stack>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
          <Box sx={style}>
            <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} sx={{ padding: 4 }}>
              <Typography id="modal-title" variant="h6" component="h2">
                Create booking times
              </Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Box sx={{ maxHeight: "500px", overflowY: "auto", width: "100%", padding: 4 }}>
              <Stack direction={"row"}>
                <Calendar value={rangeValues} multiple range onChange={(newValues) => setRangeValues(newValues)} className="teal" />
                <Stack paddingLeft={"5%"}>
                  <Stack direction={"row"} padding={"2%"}>
                    <TimePicker
                      label="From Time"
                      value={dayjs(formData.fromTime, "HH:mm")}
                      onChange={(time) => {
                        handleChangeOnInput("fromTime", time?.format("HH:mm") || "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      sx={{ flexShrink: 0 }}
                    />
                    <TimePicker
                      label="To Time"
                      value={dayjs(formData.toTime, "HH:mm")}
                      onChange={(time) => {
                        handleChangeOnInput("toTime", time?.format("HH:mm") || "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      sx={{ flexShrink: 0, ml: "5%" }}
                    />
                  </Stack>
                  <Stack direction={"row"} padding={"2%"}>
                    <TimePicker
                      label="From Time"
                      value={dayjs(formData.fromTime1, "HH:mm")}
                      onChange={(time) => {
                        handleChangeOnInput("fromTime1", time?.format("HH:mm") || "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      sx={{ flexShrink: 0 }}
                    />
                    <TimePicker
                      label="To Time"
                      value={dayjs(formData.toTime1, "HH:mm")}
                      onChange={(time) => {
                        handleChangeOnInput("toTime1", time?.format("HH:mm") || "");
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      sx={{ flexShrink: 0, ml: "5%" }}
                    />
                  </Stack>

                  <Stack padding={"2%"}>
                    <TextField
                      id="slot-duration"
                      label="Slot Duration (minutes)"
                      type="number"
                      value={formData.slotsDuration}
                      onChange={(event) => handleChangeOnInput("slotsDuration", event.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      sx={{ width: "55%" }}
                    />
                  </Stack>
                  <Stack direction={"row"} padding={"2%"}>
                    <FormControl>
                      <RadioGroup row name="type" value={formData.type} onChange={(event) => handleChangeOnInput("type", event.target.value)}>
                        <FormControlLabel value="me" control={<Radio />} label="For me" />
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="other" control={<Radio />} label="Other employee" />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  {formData.type === "other" && (
                    <FormControl style={{ width: "200px", marginLeft: "2%" }}>
                      <InputLabel id="select-employee">Employee</InputLabel>
                      <Select
                        labelId="select-employee"
                        id="select-id"
                        value={formData.employee.id || "0"}
                        label="Employee"
                        name="employee"
                        onChange={(event) => handleChangeOnInput("employee", event.target.value)}
                        size="small"
                      >
                        <MenuItem value="0" key="0" disabled>
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
                  )}
                </Stack>
              </Stack>
              {formData.type !== "" && rangeValues && (
                <Stack marginTop={"1%"}>
                  {employees.map((empl: Employee) => {
                    // Check formData.type and apply logic accordingly
                    if (formData.type === "all") {
                      return (
                        <FormEmployee
                          key={empl.id}
                          employee={empl}
                          dateRanges={rangeValues}
                          fromTime={formData.fromTime}
                          toTime={formData.toTime}
                          fromTime1={formData.fromTime1}
                          toTime1={formData.toTime1}
                          slotsDuration={formData.slotsDuration}
                          onUpdateEmployeeData={updateEmployeeData}
                        />
                      );
                    } else if (formData.type === "me" && empl.id === AuthService.getCurrentUser().employee.id) {
                      return (
                        <FormEmployee
                          key={empl.id}
                          employee={empl}
                          dateRanges={rangeValues}
                          fromTime={formData.fromTime}
                          toTime={formData.toTime}
                          fromTime1={formData.fromTime1}
                          toTime1={formData.toTime1}
                          slotsDuration={formData.slotsDuration}
                          onUpdateEmployeeData={updateEmployeeData}
                        />
                      );
                    } else if (formData.type === "other" && empl.id === formData.employee.id) {
                      return (
                        <FormEmployee
                          key={empl.id}
                          employee={empl}
                          dateRanges={rangeValues}
                          fromTime={formData.fromTime}
                          toTime={formData.toTime}
                          fromTime1={formData.fromTime1}
                          toTime1={formData.toTime1}
                          slotsDuration={formData.slotsDuration}
                          onUpdateEmployeeData={updateEmployeeData}
                        />
                      );
                    }
                    return null;
                  })}
                </Stack>
              )}
            </Box>
            {/* <Stack direction="row" justifyContent="flex-end" marginTop="2%"> */}
            <Box display={"flex"} justifyContent={"flex-end"} padding={4}>
              <Button variant="outlined" onClick={handleClose} color="primary" sx={{ marginRight: "1%" }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave} color="secondary">
                Save
              </Button>
            </Box>
            {/* </Stack> */}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateBTForm;
