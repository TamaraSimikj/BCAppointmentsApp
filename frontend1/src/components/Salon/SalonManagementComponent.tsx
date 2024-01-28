import React, { useState } from "react";
import SalonList from "./SalonList";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNotification } from "../../hooks/useNotification";
import AddEditSalon from "./AddEditSalon";
import { Salon } from "../../data/models/Models";
import { useUser } from "../../contexts/UserContext";

const SalonManagementComponent = () => {
  const { showNotification } = useNotification();
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();

  const isAdmin = user?.role == "ROLE_ADMIN";
  // const [salonData, setSalonData] = useState({
  //   name: "",
  //   address: "",
  //   number: "",
  //   email: "",
  // });

  const handleAddSalon = (salon: Salon) => {
    fetch("http://localhost:8080/api/salons/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salon),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Salon added successfully:", data);
        showNotification("Salon added successfully", "success");
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        showNotification(error, "error");
        console.error("Error adding salon:", error);
      });
  };

  const handleClickOpen = () => {
    console.log("open modal clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {" "}
      <Stack>
        <Typography variant="h3" align="center" color={"secondary"} style={{ padding: 5 }}>
          Available salons
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pb: 0.5,
            pt: 0.5,
          }}
        >
          {isAdmin && (
            <Button
              sx={{
                height: "100%",
                minHeight: 58, //64
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                flexShrink: 0,
                mb: 1,
              }}
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add new
            </Button>
          )}
          <AddEditSalon open={open} onClose={handleClose} salon={undefined} onSave={(salon: Salon) => handleAddSalon(salon)} isNew={true} />
        </Box>

        <SalonList onlyFavorites={false} />
      </Stack>
    </>
  );
};

export default SalonManagementComponent;
