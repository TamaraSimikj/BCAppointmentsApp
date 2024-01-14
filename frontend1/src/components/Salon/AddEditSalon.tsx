import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { Salon } from "../../data/models/Models";

interface AddEditSalonProps {
  open: boolean;
  salon?: Salon;
  onSave: (salon: Salon) => void;
  onClose: () => void;
  isNew: boolean;
}

const AddEditSalon: React.FC<AddEditSalonProps> = ({ open, salon, onSave, onClose, isNew }) => {
  const [editedSalon, setEditedSalon] = useState(isNew ? { name: "", address: "", number: "", email: "" } : { ...salon });

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
      <DialogContent style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField label="Name" name="name" value={editedSalon.name} onChange={handleInputChange} />
        <TextField label="Address" name="address" value={editedSalon.address} onChange={handleInputChange} />
        <TextField label="Number" name="number" value={editedSalon.number} onChange={handleInputChange} />
        <TextField label="Email" name="email" value={editedSalon.email} onChange={handleInputChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained">
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
