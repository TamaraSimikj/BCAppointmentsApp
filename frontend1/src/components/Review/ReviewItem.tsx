import React from "react";
import { Box, Typography, Rating, Stack, IconButton } from "@mui/material";
import { Review } from "../../data/models/Models";
import dayjs from "dayjs";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import RateDialog from "./RateDialog";
import { ReviewDTO } from "../../data/models/DTOs";
import { useUser } from "../../contexts/UserContext";

interface ReviewItemProps {
  review: Review;
  handleEdit: (reviewId: number, reviewDTO: ReviewDTO) => void;
  handleDelete: (id: number) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, handleDelete, handleEdit }) => {
  const { user } = useUser();
  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
      <Stack>
        <Rating name="rating" value={review.rating} readOnly />
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {review.comment}
        </Typography>
        <Typography variant="body2">
          {review.client.name} - <span style={{ fontStyle: "italic" }}>{review.appointment.service.name}</span>
        </Typography>
        <Typography variant="body2">{dayjs(review.date_time).format("DD/MM/YYYY")}</Typography>
      </Stack>
      {/* <Stack direction={"row"} display={"block"} textAlign={"center"}>
        {user?.role == "ROLE_CLIENT" && user?.client.id == review.client.id && (
          <>
            <RateDialog isEditing={true} review={review} handleEdit={handleEdit} />

            <IconButton aria-label="delete" onClick={() => handleDelete(review.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Stack> */}
    </Box>
  );
};

export default ReviewItem;
