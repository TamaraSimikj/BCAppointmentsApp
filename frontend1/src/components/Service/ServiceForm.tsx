import React, { useEffect, useState } from "react";
import { TableContainer, Button, Collapse, IconButton, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Typography } from "@material-ui/core";
import { Service } from "../../data/models/Models";
import CloseIcon from "@mui/icons-material/Close";
import { Category } from "../../data/models/Models";
import CategoryService from "../../services/category.service";
import AuthService from "../../services/auth.service";

interface ServiceFormProps {
  service?: Service;
  opened: (newValue: boolean) => void;
  addNewService?: (addNewService: Service) => void;
  editService?: (editService: Service) => void;
  deleteService?: (serviceId: number) => void;
  isEditing: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, opened, addNewService, editService, isEditing, deleteService }) => {
  const employee = AuthService.getCurrentUser().employee;
  //console.log("empl", employee);
  //console.log("user,", AuthService.getCurrentUser());
  const [newService, setNewService] = useState<Service>({
    id: service?.id || null,
    name: service?.name || "",
    value: service?.value || 0,
    description: service?.description || "",
    salon: service?.salon || employee.salon || null,
    category: service?.category || null,
  } as Service);
  //   const [editingService, setEditingService] = useState<Service>({} as Service);
  const [categories, setCategories] = useState<Category[]>([]);

  //   const handleInputChange = (addingNew: boolean, event: any, field: string) => {
  //     console.log("event", event);
  //     if (addingNew) {
  //       setNewService((prevService) => ({
  //         ...prevService,
  //         [field]: event.target.value,
  //       }));
  //     } else {
  //       setEditingService((prevService) => ({
  //         ...prevService,
  //         [field]: event.target.value,
  //       }));
  //     }
  //   };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "category") {
      let category = categories.find((cat) => cat.id === Number(value));
      setNewService({ ...newService, category: category || categories[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const handleAddService = () => {
    console.log("add clicked");
    console.log("newService", newService);
    if (!isEditing && addNewService !== undefined) {
      addNewService(newService);
    } else if (isEditing && editService !== undefined) {
      editService(newService);
    }
  };
  const handleOpen = () => {
    opened(false);
    console.log("close clicked");
  };

  const handleDeleteService = () => {
    console.log("delete ", newService.id);
    if (deleteService !== undefined) deleteService(newService.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCategories = await CategoryService.getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching salons:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ margin: 1 }}>
      {/* <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between" }}> */}
      <Typography variant="body2">{isEditing ? "Edit service:" : "Create new service:"}</Typography>

      {/* </Stack> */}
      <Stack direction={"row"} sx={{ paddingTop: 1, display: "flex", justifyContent: "space-between", columnGap: "5px" }}>
        <TextField size="small" id="input-service-name" label="Name" value={newService.name || ""} name="name" onChange={handleInputChange} />
        <TextField size="small" id="input-service-value" label="Value" value={newService.value || ""} name="value" onChange={handleInputChange} />
        <FormControl fullWidth>
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            labelId="select-category"
            id="select-id"
            value={newService.category?.id || "0"}
            label="Category"
            name="category"
            onChange={handleInputChange}
            size="small"
          >
            <MenuItem value="0" key="0" disabled>
              {" "}
              all{" "}
            </MenuItem>
            {categories.map((category: Category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <TextField
        size="small"
        id="input-service-desc"
        label="Description"
        multiline
        maxRows={4}
        value={newService.description || ""}
        name="description"
        onChange={handleInputChange}
        fullWidth
        sx={{ marginTop: "10px" }}
      />
      <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        {isEditing ? (
          <Button size="small" variant="contained" onClick={handleDeleteService} disabled={!isEditing} sx={{ backgroundColor: "#D22B2B" }}>
            Delete
          </Button>
        ) : (
          <Stack></Stack>
        )}
        <Stack direction={"row"} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" variant="contained" sx={{ marginX: 1 }} onClick={handleAddService}>
            {isEditing ? "Edit" : "Add"}
          </Button>
          <IconButton size="small" onClick={handleOpen}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ServiceForm;
