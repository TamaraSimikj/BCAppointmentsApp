import React from "react";
import { HourglassTop, CheckCircleOutline, DoneAll, HighlightOff } from "@mui/icons-material";
import { AppointmentStatus } from "../../data/enums";

interface AppointmentStatusIconProps {
  status: AppointmentStatus;
}

const AppointmentStatusIcon: React.FC<AppointmentStatusIconProps> = ({ status }) => {
  switch (status) {
    case AppointmentStatus.PENDING:
      return <HourglassTop sx={{ color: "#F29339" }} />;
    case AppointmentStatus.APPROVED:
      return <CheckCircleOutline sx={{ color: "green" }} />;
    case AppointmentStatus.FINISHED:
      return <DoneAll sx={{ color: "green" }} />;
    case AppointmentStatus.DECLINED:
      return <HighlightOff sx={{ color: "red" }} />;
    default:
      return null;
  }
};

export default AppointmentStatusIcon;
