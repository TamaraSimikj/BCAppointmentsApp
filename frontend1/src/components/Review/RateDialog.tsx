import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import { Appointment, Client, Review } from "../../data/models/Models";
import { IconButton, Stack } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import ReviewService from "../../services/review.service";
import { Edit as EditIcon } from "@material-ui/icons";

import dayjs from "dayjs";
import { ReviewDTO } from "../../data/models/DTOs";

interface RateDialogProps {
  appointment?: Appointment;
  isEditing: boolean;
  review?: Review;
  handleEdit?: (reviewId: number, reviewDTO: ReviewDTO) => void;
}
const RateDialog: React.FC<RateDialogProps> = ({ appointment, isEditing, review, handleEdit }) => {
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(review?.rating || 0);
  const [comment, setComment] = React.useState(review?.comment || "");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const reviewDTO = {
        comment,
        rating,
        date_time: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS"),
        client: user?.client || review?.client || ({} as Client),
        appointment: appointment || review?.appointment || ({} as Appointment),
      };
      console.log("Review DTO", reviewDTO);
      if (isEditing && handleEdit) {
        handleEdit(review?.id || -1, reviewDTO);
        // const updatedReview = await ReviewService.updateReview(review?.id, reviewDTO);
      } else {
        const createdReview = await ReviewService.createReview(reviewDTO);
        console.log("Created Review:", createdReview);
      }

      handleClose();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };
  return (
    <React.Fragment>
      {isEditing ? (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button variant="outlined" color={"secondary"} onClick={handleClickOpen}>
          Rate
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>Please rate your experience and leave a comment:</DialogContentText>
          <Stack sx={{ alignItems: "center" }}>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue || 0);
              }}
            />
          </Stack>

          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RateDialog;
