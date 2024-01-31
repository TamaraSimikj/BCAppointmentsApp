import { Stack, Typography } from "@mui/material";
import ReviewsList from "./Review/ReviewsList";
import SalonList from "./Salon/SalonList";
import MapComponent from "./MapComponent";
import { useEffect, useState } from "react";
import { Salon } from "../data/models/Models";
import SalonService from "../services/salon.service";

const HomePage = () => {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    const data = await SalonService.getAllSalons();
    setSalons(data);
  };

  return (
    <>
      <Typography variant="h3" align="center" color={"secondary"} style={{ padding: 5 }}>
        Available salons
      </Typography>
      <SalonList onlyFavorites={false} />
      {/* <ReviewsList salonId={-1} /> */}
      {/* -1 - get all salons reviews */}
      <Stack width={"80%"} margin={"auto"}>
        <MapComponent salons={salons} />
      </Stack>
    </>
  );
};

export default HomePage;
