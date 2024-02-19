import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reviews';

const ReviewService = {
  getAllReviews: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  getAllReviewsForSalonId: async (id) => {
    try {
      console.log('try to get for salon iddddd');
      const response = await axios.get(`${BASE_URL}/allBySalon/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },
  getAllReviewsForClientId: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/allByClient/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  getReviewById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching review with id ${id}:`, error);
      throw error;
    }
  },

  createReview: async (reviewDTO) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, reviewDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  updateReview: async (id, reviewDTO) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, reviewDTO);
      return response.data;
    } catch (error) {
      console.error(`Error updating review with id ${id}:`, error);
      throw error;
    }
  },

  deleteReview: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting review with id ${id}:`, error);
      throw error;
    }
  },
};

export default ReviewService;
