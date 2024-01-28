import { Typography } from "@mui/material";
import ReviewsList from "./Review/ReviewsList";
import SalonList from "./Salon/SalonList";

const HomePage = () => {
  return (
    <>
      <Typography variant="h3" align="center" color={"secondary"} style={{ padding: 5 }}>
        Available salons
      </Typography>
      <SalonList onlyFavorites={false} />
      <ReviewsList salonId={-1} />
      {/* -1 - get all salons reviews */}
    </>
  );
};

export default HomePage;
