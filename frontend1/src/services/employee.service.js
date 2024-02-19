import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/api/employees';

const EmployeeService = {
  getAllEmployees: async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  getAllEmployeesForSalon: async (salonId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all/${salonId}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching employees for salon with id ${salonId}:`, error);
      throw error;
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee with id ${id}:`, error);
      throw error;
    }
  },

  updateEmployee: async (id, employeeDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, employeeDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating employee with id ${id}:`, error);
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error deleting employee with id ${id}:`, error);
      throw error;
    }
  },
  createBookingTimes: async (employeDataList) => {
    try {
      await axios.post(`${API_BASE_URL}/createBookingTimes`, employeDataList ,{
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(`Error creating booking times:`, error);
      throw error;
    }
  },
  getAllBookingTimes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookingTimes`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking times:', error);
      throw error;
    }
  },
  getAllBookingTimesBySalon: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookingTimesBySalon/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking times:', error);
      throw error;
    }
  },  
  getAllEmployeesForService: async (serviceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listEmployeesByService/${serviceId}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching employees for service with id ${serviceId}:`, error);
      throw error;
    }
  },
  updateEmployeesServices: async (formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updateAssigneEmployees`, formData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating data`, error);
      throw error;
    }
  },


};

export default EmployeeService;
