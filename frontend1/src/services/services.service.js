import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/api/services';

const ServicesService = {
  getAllServices: async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getServicesBySalon: async (salonId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bySalon?id=${salonId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching services for salon with id ${salonId}:`, error);
      throw error;
    }
  },

  getServicesByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/byCategory?id=${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching services for category with id ${categoryId}:`, error);
      throw error;
    }
  },

  getServiceById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching service with id ${id}:`, error);
      throw error;
    }
  },

  createService: async (serviceDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, serviceDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  updateService: async (id, serviceDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, serviceDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating service with id ${id}:`, error);
      throw error;
    }
  },

  deleteService: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error deleting service with id ${id}:`, error);
      throw error;
    }
  },
};

export default ServicesService;
