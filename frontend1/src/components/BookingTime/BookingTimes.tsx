import React from "react";
import CreateBTForm from "./CreateBTForm";
import ListBT from "./ListBT";
import { Typography } from "@mui/material";

const BookingTimes = () => {
  return (
    <>
      <CreateBTForm />
      <ListBT />
    </>
  );
};

export default BookingTimes;
