import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { Salon } from "../../data/models/Models";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface AddEditSalonProps {
  open: boolean;
  salon?: Salon;
  onSave: (salon: Salon) => void;
  onClose: () => void;
  isNew: boolean;
}

const AddEditSalon: React.FC<AddEditSalonProps> = ({ open, salon, onSave, onClose, isNew }) => {
  // const [editedSalon, setEditedSalon] = useState(
  //   isNew ? { name: "", address: "", latitude: "", longitude: "", number: "", email: "", image: "" } : { ...salon }
  // );

  const [editedSalon, setEditedSalon] = useState<Partial<Salon>>({});

  useEffect(() => {
    if (salon) {
      setEditedSalon({ ...salon });
    } else {
      setEditedSalon({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        number: "",
        email: "",
        image: "",
      });
    }
  }, [salon, isNew]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSalon({ ...editedSalon, [name]: value });
  };

  const handleSave = () => {
    onSave(editedSalon as Salon);
    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isNew ? "Create new salon" : `Edit ${salon?.name}`}</DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "2%" }}>
        <TextField label="Name" name="name" value={editedSalon.name} onChange={handleInputChange} />
        <TextField label="Address" name="address" value={editedSalon.address} onChange={handleInputChange} />
        <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} gap={2}>
          <TextField label="Latitude" name="latitude" value={editedSalon.latitude || ""} onChange={handleInputChange} fullWidth />
          <TextField label="Longitude" name="longitude" value={editedSalon.longitude || ""} onChange={handleInputChange} fullWidth />
        </Stack>
        <TextField label="Number" name="number" value={editedSalon.number} onChange={handleInputChange} />
        <TextField label="Email" name="email" value={editedSalon.email} onChange={handleInputChange} />
        <TextField label="Image URL" name="image" value={editedSalon.image} onChange={handleInputChange} />

        {/* <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="secondary">
          Save
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditSalon;
