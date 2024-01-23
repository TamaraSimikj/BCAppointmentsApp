import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';
const API_BASE_URL = 'http://localhost:8080/api/appointments';

const AppointmentService = {
   
      getSlotsByDate: async (date,serviceId) => {
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
 
};

export default AppointmentService;
