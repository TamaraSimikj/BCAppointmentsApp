import { Avatar, Box, Button, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category, Salon, Service } from "../../data/models/Models";
import SalonService from "../../services/salon.service";
import ServicesService from "../../services/services.service";
import CategoryService from "../../services/category.service";
import AppointmentModal from "../Appointment/AppointmentModal";
import ReviewsList from "../Review/ReviewsList";
import MapComponentSeparate from "../MapComponentSeparate";

const SelectedSalon: React.FC = () => {
  const { id } = useParams();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setfilteredServices] = useState<Service[]>(services);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(-1);
  const [selectedService, setSelectedService] = useState<Service>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>();

  // const { pathname } = useLocation();
  // const navigate = useNavigate();

  const fetchData = async () => {
    const data = await SalonService.getSalonById(id);
    console.log("salon", data);
    setSalon(data);
    const servicesData = await ServicesService.getServicesBySalon(id);
    setServices(servicesData);
    setfilteredServices(servicesData);
    console.log("serviceData", servicesData);
    const categoriesData = await CategoryService.getAllCategories();
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    if (categoryId === -1) {
      setfilteredServices(services);
    } else {
      let filtered = services.filter((s) => s.category.id === categoryId);
      setfilteredServices(filtered);
    }
  };
  const handleClickSelect = (service: Service) => {
    console.log(service);
    setSelectedService(service);
    setIsDialogOpen(true);
    // navigate(`${pathname}/free`);
  };

  return (
    <Box p={5}>
      <Typography variant="h2" color={"secondary"}>
        {" "}
        {salon?.name}
      </Typography>
      <Stack direction={"row"}>
        <List sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
          <Typography variant="h6" color="textSecondary" mb={2}>
            Categories
          </Typography>
          <ListItemButton
            key={-1}
            onClick={() => handleCategoryClick(-1)}
            sx={{
              "&:hover": {
                backgroundColor: "#f5f1e1",
              },
              backgroundColor: selectedCategory === -1 ? "#efe8ce" : "inherit",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
              all
            </Typography>
          </ListItemButton>
          {categories.map((category) => (
            <ListItemButton
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                backgroundColor: selectedCategory === category.id ? "#efe8ce" : "inherit",
                "&:hover": {
                  backgroundColor: "#f5f1e1",
                },
              }}
            >
              <Typography variant="subtitle1">{category.name}</Typography>
            </ListItemButton>
          ))}
        </List>
        <List dense sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper", margin: "auto" }}>
          {filteredServices.map((service) => {
            const labelId = `service-list-item-${service.id}`;

            return (
              <ListItem
                key={service.id}
                disablePadding
                sx={{
                  height: "90px",
                  padding: "1em",
                  "&:hover": {
                    backgroundColor: "#f5f1e1",
                  },
                }}
              >
                {/* <ListItemButton
                  sx={{
                    height: "90px",
                    "&:hover": {
                      backgroundColor: "#f5f1e1",
                    },
                  }}
                > */}
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${service.id + 1}`} src={`/static/images/avatar/${service.id + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={
                    <React.Fragment>
                      <Typography variant="subtitle1">{service.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemText
                  id={labelId}
                  primary={
                    <Stack direction={"row"} justifyContent="flex-end">
                      <Typography variant="subtitle1" alignSelf={"center"} pr={2}>
                        {service.value}
                      </Typography>
                      <Button variant="contained" color="secondary" onClick={() => handleClickSelect(service)}>
                        Select
                      </Button>
                    </Stack>
                  }
                />
                {/* </ListItemButton> */}
              </ListItem>
            );
          })}
        </List>
      </Stack>
      {selectedService && (
        <>
          <AppointmentModal open={isDialogOpen || false} service={selectedService} onClose={() => setIsDialogOpen(false)} />
        </>
      )}
      <ReviewsList salonId={salon?.id || -1} />
      <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} gap={5}>
        <Stack>
          <Typography variant="h3">Contact information:</Typography>
          <p>Address: {salon?.address}</p>
          <p>Number: {salon?.number}</p>
          <p>Email: {salon?.email}</p>
        </Stack>
        <Stack width={"50%"}>{salon && <MapComponentSeparate salon={salon} />}</Stack>
      </Stack>
    </Box>
  );
};

export default SelectedSalon;
