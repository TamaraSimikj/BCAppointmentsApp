import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { RegisterModel } from "../../data/models/DTOs";
import { useNavigate } from "react-router-dom";
import { Role } from "../../data/enums";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SalonService from "../../services/salon.service";
import { Salon, User } from "../../data/models/Models";
import { useUser } from "../../contexts/UserContext";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        BeautyCenter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface SignUpProps {
  role: String;
  user?: User | null;
}

const SignUp: React.FC<SignUpProps> = ({ role, user }) => {
  // console.log("role", role);
  const navigate = useNavigate();
  // const { user } = useUser();
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user, user?.role, user?.role === Role.EMPLOYEE);
        if (user?.role === Role.EMPLOYEE) {
          setSalons([user.employee.salon]);
        } else {
          const allSalons = await SalonService.getAllSalons();
          setSalons(allSalons);
        }
      } catch (error) {
        console.error("Error fetching salons:", error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: role,
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    salon: {},
  } as RegisterModel);

  const handleChange = (event: any) => {
    console.log("event on register", event);
    if (event.target.name === "salon") {
      let salon = salons.find((s) => s.id === event.target.value);
      setFormData({
        ...formData,
        salon: salon || ({} as Salon),
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let path = "";
      if (role === Role.CLIENT) {
        path = "register";
      } else if (role === Role.EMPLOYEE) {
        path = "registerEmployee";
      }
      console.log("form data sending", formData);

      const response = await fetch(`http://localhost:8080/api/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect to login
        console.log("Registration successful");
        if (role === Role.CLIENT) navigate("/login");
        else navigate("/"); // da smenam kaj da redirektira
      } else {
        // Handle error, e.g., show an error message
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: data.get("username"),
  //     password: data.get("password"),
  //     role: data.get("role"),
  //     name: data.get("firstName"),
  //     surname: data.get("lastName"),
  //     phoneNumber: data.get("phoneNumber"),
  //     email: data.get("email"),
  //   });
  // };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {role == "ROLE_EMPLOYEE" ? "Register new employee" : "Sign up"}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField required fullWidth id="role" label="Role" name="role" value={formData.role} onChange={handleChange} />
            </Grid> */}
            {role === Role.EMPLOYEE ? (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-salon">Salon</InputLabel>
                  <Select labelId="select-salon" id="select-id" value={formData.salon.id || "0"} label="Salon" name="salon" onChange={handleChange}>
                    <MenuItem value="0" key="0" disabled>
                      {" "}
                      all{" "}
                    </MenuItem>
                    {salons.map((salon: Salon) => (
                      <MenuItem value={salon.id} key={salon.id}>
                        {salon.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField required fullWidth id="salon" label="Salon" name="salon" value={formData.salonId} onChange={handleChange} /> */}
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="surname" label="Last Name" name="surname" value={formData.surname} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {role == "ROLE_EMPLOYEE" ? "Register" : "Sign up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default SignUp;
