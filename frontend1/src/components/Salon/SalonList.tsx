import { FC, useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Avatar, CardHeader, CardMedia } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddEditSalon from "./AddEditSalon";
import { Salon, Favorites } from "../../data/models/Models";
import { useNotification } from "../../hooks/useNotification";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, useTheme } from "@mui/material";
import SalonService from "../../services/salon.service";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

interface SalonListProps {
  onlyFavorites: boolean;
}
const SalonList: FC<SalonListProps> = ({ onlyFavorites }) => {
  const { user } = useUser();

  const isAdmin = user?.role == "ROLE_ADMIN";
  const isClient = user?.role == "ROLE_CLIENT";
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
    let data;
    if (onlyFavorites) {
      data = await SalonService.getAllFavoritesSalons(user?.client.id);
    } else {
      data = await SalonService.getAllSalons();
    }

    setSalons(data);
  };

  const fetchFavorites = async () => {
    const data = await SalonService.getFavorites();
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
    }
  };
  const handleCardClick = (event: any) => {
    const cardKey = event.currentTarget.getAttribute("data-key");
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
    try {
      SalonService.deleteSalon(salon.id);
      showNotification("Salon deleted successfully", "success");
      // fetchSalons();
      setSalons((prevSalons) => prevSalons.filter((prevSalon) => prevSalon.id !== salon.id));

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting salon:", error);
      showNotification("Error deleting salon", "error");
    }
  };
  const handleEdit = (event: any, salon: Salon) => {
    event.stopPropagation();
    console.log("edit selected , ", selectedSalon);
    setSelectedSalon(salon);
    setIsEditDialogOpen(true);
  };

  const onEdit = async (salon: Salon) => {
    const updatedSalonData = {
      name: salon.name,
      address: salon.address,
      latitude: salon.latitude,
      longitude: salon.longitude,
      number: salon.number,
      email: salon.email,
      image: salon.image,
    };

    try {
      const updated = await SalonService.updateSalon(salon.id, updatedSalonData);
      showNotification("Salon updated successfully", "success");
      // fetchSalons();
      setSalons((prevSalons) => prevSalons.map((prevSalon) => (prevSalon.id === updated.id ? updated : prevSalon)));

      setIsEditDialogOpen(false);
    } catch (error) {
      showNotification("Error updating salon", "error");
      console.error("Error updating salon:", error);
    }
  };

  return (
    <>
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
                isClient && (
                  <IconButton aria-label="add to favorites" onClick={(event) => handleClickFavorites(event, salon)}>
                    {favorites.find((fav) => fav.salon.id === salon.id) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "red" }} />
                    )}
                  </IconButton>
                )
              }
              title={salon.name}
              subheader={salon.address}
            />
            <CardMedia component="img" height="140" image={salon.image} alt="Salon Image" />
            <CardContent>
              <Typography>{salon.number}</Typography>
              <Typography>{salon.email}</Typography>
            </CardContent>
            {isAdmin && (
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

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} maxWidth="sm">
        <DialogTitle>Delete Salon: {selectedSalon?.name}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedSalon?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDelete(selectedSalon || undefined)} variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SalonList;
