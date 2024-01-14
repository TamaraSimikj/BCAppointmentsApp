import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/api/categories';

const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getCategory: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      throw error;
    }
  },

  createCategory: async (categoryDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, categoryDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, categoryDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, categoryDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating category with id ${id}:`, error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error);
      throw error;
    }
  },
};

export default CategoryService;
