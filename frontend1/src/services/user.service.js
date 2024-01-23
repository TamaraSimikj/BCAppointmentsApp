import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getAllAdmins: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admins`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  addUser: async (userDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/add`, userDTO);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  registerEmployee: async (registerDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/registerEmployee`, registerDTO);
      return response.data;
    } catch (error) {
      console.error('Error registering employee:', error);
      throw error;
    }
  },

  registerClient: async (registerDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, registerDTO);
      return response.data;
    } catch (error) {
      console.error('Error registering client:', error);
      throw error;
    }
  },

  registerAdmin: async (userDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register-admin`, userDTO);
      return response.data;
    } catch (error) {
      console.error('Error registering admin:', error);
      throw error;
    }
  },

  updateUser: async (id, userDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, userDTO);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
};

export default UserService;
