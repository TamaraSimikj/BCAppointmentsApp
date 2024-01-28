import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';
const API_BASE_URL = 'http://localhost:8080/api/appointments';

const AppointmentService = {

  getSlotsByDate: async (date, serviceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/slots?date=${date}&serviceId=${serviceId}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  },

  getAllBookingTimes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allbookingTimes`, {
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

  getBookingTime: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookingTime/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching booking time with id ${id}:`, error);
      throw error;
    }
  },
  getAppointmentsForUser: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allByClient/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for user with id ${id}:`, error);
      throw error;
    }
  },
  getAppointmentsForUser: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allByClient/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for user with id ${id}:`, error);
      throw error;
    }
  }, getAppointmentsForSalon: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allBySalon/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for salon with id ${id}:`, error);
      throw error;
    }
  },

  createAppointment: async (appointmentDTO) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, appointmentDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updateStatus/${id}`, null, {
        params: {
          status: status
        },
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for appointment with id ${id}:`, error);
      throw error;
    }
  },
  // declineAppointment: async (id) => {
  //   try {
  //     const response = await axios.put(`${API_BASE_URL}/decline/${id}`, {
       
  //       headers: {
  //         ...authHeader(),
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error declining appointment with id ${id}:`, error);
  //     throw error;
  //   }
  // },

  updateAppointment: async (id, appointmentDTO) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, appointmentDTO, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating appointment with id ${id}:`, error);
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting appointment with id ${id}:`, error);
      throw error;
    }
  },
};

export default AppointmentService;
