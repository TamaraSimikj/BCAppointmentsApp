import React, { FC, useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewService from "../../services/review.service";
import { Review } from "../../data/models/Models";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Rating, Stack, Typography } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";
import { ReviewDTO } from "../../data/models/DTOs";
import StarIcon from "@mui/icons-material/Star";

interface ReviewsListProps {
  salonId?: number;
  clientId?: number;
}
const ReviewsList: FC<ReviewsListProps> = ({ salonId, clientId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { showNotification } = useNotification();
  const [averageReviewValue, setAverageReviewValue] = useState<number>(5.0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let data;
        //console.log("salonId , clientid", salonId, clientId);
        if (salonId !== undefined) {
          if (salonId == -1) {
            data = await ReviewService.getAllReviews();
          } else {
            data = await ReviewService.getAllReviewsForSalonId(salonId);
          }
        } else if (clientId !== undefined) {
          data = await ReviewService.getAllReviewsForClientId(clientId);
        }

        console.log("data for reviews", data);
        setReviews(data);
        setAverageReviewValue(data.reduce((total: number, review: Review) => total + review.rating, 0) / data.length);
        setTotalReviews(data.length);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [salonId]);

  const handleEdit = async (reviewId: number, reviewDTO: ReviewDTO) => {
    try {
      const updatedReview = await ReviewService.updateReview(reviewId, reviewDTO);

      setReviews((prevReviews) => prevReviews.map((review) => (review.id === updatedReview.id ? updatedReview : review)));

      showNotification("Review updated successfully!", "success");
      // setOpenEditId(null);
      // setEditCategory({} as Category);
    } catch (error) {
      console.error("Error updating review:", error);
      showNotification("Error updating review", "error");
    }
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await ReviewService.deleteReview(reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      showNotification(`Review with ID ${reviewId} deleted successfully!`, "success");
    } catch (error) {
      console.error("Error deleting review:", error);
      showNotification("Error deleting review", "error");
    }
  };

  return (
    <Stack sx={{ width: "100%", bgcolor: "background.paper" }}>
      {/* sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper", margin: "auto" }} */}
      <Typography variant="h6">
        Reviews
        {clientId === undefined && (
          <>
            <StarIcon sx={{ color: "#ffc107" }} />
            {!Number.isNaN(averageReviewValue) ? averageReviewValue.toFixed(1) : 0.0} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </>
        )}
      </Typography>

      {reviews.map((review: Review) => (
        <ReviewItem key={review.id} review={review} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </Stack>
  );
};

export default ReviewsList;
