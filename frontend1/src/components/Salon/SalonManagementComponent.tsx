import React, { useState } from "react";
import SalonList from "./SalonList";
import { Box, Button, Stack } from "@mui/material";
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
    <Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pb: 0.5,
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
        {/* <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new salon</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={salonData.name}
              variant="standard"
              fullWidth
              onChange={(event) => setSalonData((old) => ({ ...old, name: event.target.value }))}
            />
            <TextField
              label="Address"
              name="address"
              value={salonData.address}
              variant="standard"
              fullWidth
              onChange={(event) => setSalonData((old) => ({ ...old, address: event.target.value }))}
            />
            <TextField
              label="Number"
              name="number"
              value={salonData.number}
              variant="standard"
              fullWidth
              onChange={(event) => setSalonData((old) => ({ ...old, number: event.target.value }))}
            />
            <TextField
              label="Email"
              name="email"
              value={salonData.email}
              variant="standard"
              fullWidth
              onChange={(event) => setSalonData((old) => ({ ...old, email: event.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSalon}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog> */}
      </Box>

      <SalonList />
    </Stack>
  );
};

export default SalonManagementComponent;
