import { AppointmentStatus, Role } from "../enums";

export interface Salon {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  number: string;
  email: string;
  image: string;
}

export interface Client {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  numberOfApp: number;
  points: number;
  loyaltyClub: boolean;
}

export interface Favorites {
  id: number;
  client: Client;
  salon: Salon;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  value: number;
  salon: Salon;
  category: Category;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  salon: Salon;
}
export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  client: Client;
  employee: Employee;
  enabled: boolean;
  authorities: Role[];
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

export interface BookingTime {
  id: number;
  startTime: string; //LocalDateTime
  duration: string; //LocalTime
  employee: Employee;
}

export interface EmployeesServices {
  id: number;
  employee: Employee;
  service: Service;
}

export interface Payment {
  id: number;
  paymentInfo: string;
  status: string;
  online: boolean;
  paymentId: string;
}

export interface Appointment {
  id: number;
  status: AppointmentStatus;
  price: number;
  client: Client;
  bookingTime: BookingTime;
  salon: Salon;
  employee: Employee;
  payment: Payment;
  service: Service;
}

export interface Review {
  id: number;
  comment: string;
  rating: number;
  date_time: string;
  client: Client;
  appointment: Appointment;
}
