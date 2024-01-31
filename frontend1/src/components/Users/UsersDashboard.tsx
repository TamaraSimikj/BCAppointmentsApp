import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsersDashboard = () => {
  const navigate = useNavigate();
  return (
    <Box margin={"auto"}>
      <Stack direction={"row"} display={"flex"} justifyContent={"space-around"} gap={10} padding={10}>
        <Button variant="outlined" size="large" color="secondary" onClick={() => navigate("/registerAdmin")}>
          Register Admin
        </Button>
        <Button variant="outlined" size="large" color="secondary" onClick={() => navigate("/registerEmployee")}>
          Register Employee
        </Button>
      </Stack>
    </Box>
  );
};

export default UsersDashboard;
