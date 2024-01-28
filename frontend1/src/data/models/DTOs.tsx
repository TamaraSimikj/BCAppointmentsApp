import { Client, Salon, BookingTime, Payment, Employee, Service, Appointment } from "./Models";

export interface RegisterModel {
  username: string;
  password: string;
  role: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  salon: Salon;
}

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface ServiceDTO {
  name: string;
  description: string;
  value: number;
  salon: number;
  category: number;
}

export interface EmployeeDTO {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  salonId: number;
}

export interface AppointmentDTO {
  status: string;
  price: number;
  client: Client;
  bookingTime: BookingTime;
  salon: Salon;
  employee: Employee;
  payment?: Payment;
  service: Service;
}
export interface ReviewDTO {
  comment: string;
  rating: number;
  date_time: string;
  client: Client;
  appointment: Appointment;
}
