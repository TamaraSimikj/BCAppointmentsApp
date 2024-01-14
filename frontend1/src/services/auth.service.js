import axios from "axios";
import { RegisterModel } from "../data/models/DTOs";

const register = (RegisterModel) => {
  return axios.post("http://localhost:8080/api/register", {
    RegisterModel
  });
};

const login = (username, password) => {
  return axios
    .post("http://localhost:8080/login", {
      username,
      password
    })
    .then((response) => {
      console.log("response", response);
      console.log(response.data.access_token);
      if (response.data.access_token) {
        console.log("accesstoken true, user", response.data.user)
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;