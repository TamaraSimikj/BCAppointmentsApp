import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';
const API_BASE_URL = 'http://localhost:8080/api/salons';

const SalonService = {
  getAllSalons: async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching salons:', error);
      throw error;
    }
  },
  getAllFavoritesSalons: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allFavorites/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching salons:', error);
      throw error;
    }
  },

  getSalonById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching salon with id ${id}:`, error);
      throw error;
    }
  },

  createSalon: async (salonDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, salonDTO, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating salon:', error);
      throw error;
    }
  },

  updateSalon: async (id, salonDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, salonDTO, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating salon with id ${id}:`, error);
      throw error;
    }
  },

  deleteSalon: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error deleting salon with id ${id}:`, error);
      throw error;
    }
  },
  getFavorites: async () => {
    try {
    const user = AuthService.getCurrentUser();
    if(user?.client ===null || user ===null){
        return [];
    }
      const response = await axios.get(`${API_BASE_URL}/favorites/${user.client.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching salons:', error);
      throw error;
    }
  },

     addToFavourites: async (salon) => {
    try {
        const client = AuthService.getCurrentUser().client;
        const response = await axios.post(`${API_BASE_URL}/addToFavourites`, {
            client: client,
            salon: salon,
        }, {
            headers: {
              ...authHeader(),
              'Content-Type': 'application/json',
            },
          });
      
        return response.data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
},
removeFromFavourites: async (salon) => {
    try {
        const client = AuthService.getCurrentUser().client;
        const response = await axios.post(`${API_BASE_URL}/removeFromFavorites`, {
            client: client,
            salon: salon,
        }, {
            headers: {
              ...authHeader(),
              'Content-Type': 'application/json',
            },
          });
      
        return response.data;
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
}
};

export default SalonService;
