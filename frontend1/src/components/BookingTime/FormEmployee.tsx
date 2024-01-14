import React, { useEffect, useState } from "react";
import { Employee } from "../../data/models/Models";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import type { Value } from "react-multi-date-picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { EmployeeData } from "./CreateBTForm";

interface FormEmployeeProps {
  employee: Employee;
  dateRanges: any; //Value[];
  fromTime: any;
  toTime: any;
  fromTime1: any;
  toTime1: any;
  slotsDuration: number;
  onUpdateEmployeeData: (employeeData: EmployeeData) => void;
}

const FormEmployee: React.FC<FormEmployeeProps> = ({
  employee,
  dateRanges,
  fromTime,
  toTime,
  fromTime1,
  toTime1,
  slotsDuration,
  onUpdateEmployeeData,
}) => {
  // console.log("dateRanges", dateRanges);
  // console.log("formEmpl", fromTime, toTime, fromTime1, toTime1, slotsDuration);

  const useDateRanges = (dateRanges: any[]) => {
    const [values, setValues] = useState<Value>([]);

    useEffect(() => {
      let initial: Value[] = [];

      dateRanges.forEach((range: any) => {
        let startDate;
        let endDate;
        // console.log("range", range);
        if (range.length !== 1) {
          startDate = range[0];
          endDate = range[1];
        } else {
          startDate = range[0];
          endDate = range[0];
        }

        let currentDate = new DateObject(startDate);
        //  console.log("currentDate", currentDate);
        currentDate = currentDate.set({
          hour: fromTime.hour,
          minute: fromTime.minute,
          second: fromTime.second,
        });

        while (currentDate <= endDate) {
          initial.push(new DateObject(currentDate));
          currentDate.setDate(currentDate.add(1, "day"));
        }
      });

      setValues(initial as any);
      //  onUpdateEmployeeData({ ...employeeData, dates: initial.toString() });
    }, [dateRanges, fromTime, toTime, fromTime1, toTime1, slotsDuration]);

    return { values, setValues };
  };

  const { values, setValues } = useDateRanges(dateRanges);

  const [employeeData, setEmployeeData] = useState({
    employee: employee,
    fromTime: fromTime,
    toTime: toTime,
    fromTime1: fromTime1,
    toTime1: toTime1,
    slotsDuration: slotsDuration,
    dates: values?.toString(),
  } as EmployeeData);

  useEffect(() => {
    //  console.log("first initialization", employeeData, values);
    setEmployeeData({ ...employeeData, dates: values?.toString() });
    onUpdateEmployeeData({ ...employeeData, dates: values?.toString() });
  }, [values]);

  const handleChangeOnInput = (key: string, value: string | number | boolean | any): void => {
    setEmployeeData({
      ...employeeData,
      [key]: value,
    });

    onUpdateEmployeeData({ ...employeeData, [key]: value });
    //console.log(key, value);
  };

  return (
    <Box sx={{ border: "0.5px solid gray", borderRadius: "2px", margin: "0.2em", padding: "0.5em" }}>
      <Typography variant="subtitle1" sx={{ padding: "1%" }}>
        {employee.name}
      </Typography>
      <Stack marginLeft={"3%"} width={"fit-content"}>
        <DatePicker
          multiple
          format="DD/MM/YYYY"
          value={values}
          onChange={(value) => {
            handleChangeOnInput("dates", value?.toString());
            setValues(value);
          }}
          plugins={[<DatePanel />]}
          render={<InputIcon />}
          className="teal"
        />
      </Stack>

      <Stack direction={"row"} paddingTop={"2%"} display={"flex"} justifyContent={"space-evenly"}>
        <TimePicker
          label="From Time"
          value={dayjs(employeeData.fromTime, "HH:mm")}
          onChange={(time) => {
            handleChangeOnInput("fromTime", time?.format("HH:mm") || "");
          }}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{ flexShrink: 0, width: "150px" }}
        />
        <TimePicker
          label="To Time"
          value={dayjs(employeeData.toTime, "HH:mm")}
          onChange={(time) => {
            handleChangeOnInput("toTime", time?.format("HH:mm") || "");
          }}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{ flexShrink: 0, width: "150px" }}
        />
        <TimePicker
          label="From Time"
          value={dayjs(employeeData.fromTime1, "HH:mm")}
          onChange={(time) => {
            handleChangeOnInput("fromTime1", time?.format("HH:mm") || "");
          }}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{ flexShrink: 0, width: "150px" }}
        />
        <TimePicker
          label="To Time"
          value={dayjs(employeeData.toTime1, "HH:mm")}
          onChange={(time) => {
            handleChangeOnInput("toTime1", time?.format("HH:mm") || "");
          }}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{ flexShrink: 0, width: "150px" }}
        />
        <TextField
          id="slot-duration"
          label="Slot Duration (minutes)"
          type="number"
          value={employeeData.slotsDuration}
          onChange={(event: any) => handleChangeOnInput("slotsDuration", event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          sx={{ width: "150px" }}
        />
      </Stack>
    </Box>
  );
};

export default FormEmployee;
