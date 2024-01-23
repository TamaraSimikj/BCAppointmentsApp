import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Collapse, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Employee, Service } from "../../data/models/Models";
import { useNotification } from "../../hooks/useNotification";
import { useTheme } from "@mui/material";
import ServicesService from "../../services/services.service";
import ServiceForm from "./ServiceForm";
import { ServiceDTO } from "../../data/models/DTOs";

import AssigneeDialog from "./AssigneeDialog";

import AuthService from "../../services/auth.service";
import { useUser } from "../../contexts/UserContext";

const Services = () => {
  const { user } = useUser();
  const [services, setServices] = useState<Service[]>([]);
  const { showNotification } = useNotification();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openEditId, setOpenEditId] = useState<number | null>(null);
  const [editService, setEditService] = useState<Service>({} as Service);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let loggedEmployee = user?.employee; // AuthService.getCurrentUser().employee;
      const servicesData = await ServicesService.getServicesBySalon(loggedEmployee?.salon.id); //.getAllServices();
      setServices(servicesData);
      console.log("services", servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    // setNewService({} as Service);
  };
  const handleOpenedState = (newValue: boolean) => {
    setOpen(newValue);
  };
  const handleAddNewService = async (newService: Service) => {
    let serviceDTO = {
      name: newService.name,
      description: newService.description,
      value: newService.value,
      salon: newService.salon.id,
      category: newService.category.id,
    } as ServiceDTO;
    let newser = await ServicesService.createService(serviceDTO);
    setServices((old) => [newser as Service, ...old]);
    setOpen(!open);
    showNotification("Successfully created new service", "success");

    console.log("handleAddNewService called ...", newService);
  };

  const handleEditService = async (editedService: Service) => {
    //setOpen(!open);
    let serviceDTO = {
      name: editedService.name,
      description: editedService.description,
      value: editedService.value,
      salon: editedService.salon.id,
      category: editedService.category.id,
    } as ServiceDTO;
    console.log("edit id", editedService.id);
    let editser = await ServicesService.updateService(editedService.id, serviceDTO);
    setServices((prevServices) => prevServices.map((service) => (service.id === editser.id ? editser : service)));

    closeEdit();
    showNotification("Successfully edited service", "success");

    console.log("handleEditService called ...", editedService);
  };

  const handleDeleteService = async (serviceId: number) => {
    try {
      await ServicesService.deleteService(serviceId);
      setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
      showNotification(`Service with ID ${serviceId} deleted successfully!`, "success");
      closeEdit();
    } catch (error) {
      console.error("Error deleting service:", error);
      showNotification("Error deleting service", "error");
    }
  };
  const handleEditOpen = (serviceId: number | null) => {
    setOpenEditId(serviceId === openEditId ? null : serviceId);
    setEditService(services.find((service) => service.id === serviceId) || ({} as Service));
  };

  const closeEdit = () => {
    setOpenEditId(null);
    setEditService({} as Service);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 650, margin: "auto", marginTop: "5%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5px" }}>
                <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
                  {open ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <ServiceForm opened={handleOpenedState} addNewService={handleAddNewService} isEditing={false} />
                </Collapse>
              </TableCell>
            </TableRow>
            {services.map((service: Service) => (
              <React.Fragment key={service.id}>
                <TableRow
                  onClick={() => handleEditOpen(service.id || null)}
                  sx={{
                    backgroundColor: openEditId === service.id ? theme.palette.divider : "",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: theme.palette.divider,
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell sx={{ width: "5px" }} onClick={(event) => event.stopPropagation()}>
                    <AssigneeDialog service={service} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {service.id}
                  </TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.value}</TableCell>
                  <TableCell>{service.category.name}</TableCell>
                </TableRow>
                <TableRow key={service.id + "-edit"}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={openEditId === service.id} timeout="auto" unmountOnExit>
                      <ServiceForm
                        service={service}
                        opened={closeEdit}
                        isEditing={true}
                        editService={handleEditService}
                        deleteService={handleDeleteService}
                      />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Services;
