import { Salon } from "./Models";

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
