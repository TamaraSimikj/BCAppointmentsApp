import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Avatar, CardHeader, CardMedia } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddEditSalon from "./AddEditSalon";
import { Salon, Favorites } from "../../data/models/Models";
import { useNotification } from "../../hooks/useNotification";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import SalonService from "../../services/salon.service";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const SalonList = () => {
  const { user } = useUser();

  const isEmployee = user?.role == "ROLE_EMPLOYEE";
  const [salons, setSalons] = useState<Salon[]>([]);
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalons();
    fetchFavorites();
  }, []);

  const fetchSalons = async () => {
    const data = await SalonService.getAllSalons();
    setSalons(data);
    // // Make a GET request to fetch the list of salons
    // fetch("http://localhost:8080/api/salons")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSalons(data);
    //     console.log("data", data);
    //   })
    //   .catch((error) => console.error("Error fetching salons:", error));
  };

  const fetchFavorites = async () => {
    const data = await SalonService.getFavorites();
    //console.log("favorites", data);
    setFavorites(data);
  };

  const handleClickFavorites = async (event: any, salon: Salon) => {
    event.stopPropagation();
    if (favorites.find((fav) => fav.salon.id === salon.id)) {
      const removedFavorite = await SalonService.removeFromFavourites(salon);
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== removedFavorite.id));
    } else {
      const addedFavorite = await SalonService.addToFavourites(salon);
      setFavorites((prevFavorites) => [...prevFavorites, addedFavorite]);
      //fetchFavorites();
    }
  };
  const handleCardClick = (event: any) => {
    const cardKey = event.currentTarget.getAttribute("data-key");

    console.log("card clicked", cardKey);
    navigate("/" + cardKey);
  };

  const handleDelete = (event: any, salon: Salon) => {
    event.stopPropagation();
    setSelectedSalon(salon);
    setIsDeleteDialogOpen(true);
  };
  const onDelete = (salon?: Salon) => {
    if (salon === undefined) {
      showNotification("Please select salon to be deleted", "warning");
      return;
    }
    fetch(`http://localhost:8080/api/salons/${salon.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Salon deleted successfully");
          showNotification("Salon deleted successfully", "success");
          // Optionally, you can update the salon list here
          fetchSalons();
        } else {
          console.error("Error deleting salon:", response.status);
          showNotification("Error deleting salon", "error");
        }
      })
      .catch((error) => {
        console.error("Error deleting salon:", error);
        showNotification("Error deleting salon", "error");
      })
      .finally(() => {
        setIsDeleteDialogOpen(false);
        // Optionally, you can update the salon list here
        // fetchSalons();
      });
  };
  const handleEdit = (event: any, salon: Salon) => {
    event.stopPropagation();
    setSelectedSalon(salon);
    setIsEditDialogOpen(true);
  };

  const onEdit = (salon: Salon) => {
    const updatedSalonData = {
      name: salon.name,
      address: salon.address,
      number: salon.number,
      email: salon.email,
    };

    fetch(`http://localhost:8080/api/salons/${salon.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSalonData),
    })
      .then((response) => response.json())
      .then((updatedSalon) => {
        console.log("Salon updated successfully:", updatedSalon);
        showNotification("Salon updated successfully", "success");

        fetchSalons();
        setIsEditDialogOpen(false);
      })
      .catch((error) => {
        showNotification(error, "error");
        console.error("Error updating salon:", error);
      });
  };

  return (
    <div>
      <Typography variant="h6" align="center">
        List of available salons
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {salons.map((salon) => (
          <Card
            key={salon.id}
            data-key={salon.id}
            style={{ margin: "16px", flex: "0 0 30%", minWidth: "300px" }}
            onClick={(event) => handleCardClick(event)}
          >
            <CardHeader
              // avatar={
              //   <Avatar sx={{ bgcolor: "#f44336" }} aria-label="salon">
              //     S
              //   </Avatar>
              // }
              action={
                <IconButton aria-label="add to favorites" onClick={(event) => handleClickFavorites(event, salon)}>
                  {favorites.find((fav) => fav.salon.id === salon.id) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )}
                </IconButton>
              }
              title={salon.name}
              subheader={salon.address}
            />
            <CardMedia
              component="img"
              height="140"
              image="https://w7.pngwing.com/pngs/393/665/png-transparent-beauty-salon-logo-thumbnail.png"
              alt="Salon Image"
            />
            <CardContent>
              <Typography>{salon.number}</Typography>
              <Typography>{salon.email}</Typography>
            </CardContent>
            {isEmployee && (
              <Stack direction={"row"} display={"block"} textAlign={"center"}>
                <IconButton aria-label="edit" onClick={(event) => handleEdit(event, salon)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={(event) => handleDelete(event, salon)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
          </Card>
        ))}
      </div>
      {selectedSalon && (
        <>
          <AddEditSalon
            open={isEditDialogOpen || false}
            salon={selectedSalon}
            onSave={(updatedSalon: Salon) => onEdit(updatedSalon)}
            onClose={() => setIsEditDialogOpen(false)}
            isNew={false}
          />
        </>
      )}

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Salon: {selectedSalon?.name}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedSalon?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDelete(selectedSalon || undefined)} variant="contained">
            Delete
          </Button>
          <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SalonList;
