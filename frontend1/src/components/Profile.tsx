import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import ReviewsList from "./Review/ReviewsList";
import SalonList from "./Salon/SalonList";
import { Box, Stack, Typography } from "@mui/material";

const Profile = () => {
  const { user } = useUser();
  const [logged, setLogged] = useState(user?.client || user?.employee);

  return (
    <Box p={5} sx={{ bgcolor: "background.paper", width: "75%", margin: "auto" }}>
      <Stack gap={2}>
        <Stack>
          <Typography variant="h3">Client Information</Typography>
          <p>Name: {logged?.name}</p>
          <p>Surname: {logged?.surname}</p>
          <p>Phone Number: {logged?.phoneNumber}</p>
          <p>Email: {logged?.email}</p>
          {/* {user?.client!==null && (<p>Number of Appointments: {logged?.numberOfApp}</p>)} */}
        </Stack>

        <ReviewsList clientId={logged?.id} />

        <Stack>
          <Typography variant="h6">Favorites Salons</Typography>
          <SalonList onlyFavorites={true} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profile;
