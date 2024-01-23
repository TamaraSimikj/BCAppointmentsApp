import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { useUser } from "../../contexts/UserContext";
import UserService from "../../services/user.service";

const RegisterAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const { showNotification } = useNotification();
  const fetchAdmins = async () => {
    let adminsList = await UserService.getAllAdmins();
    console.log(adminsList, "admins");
    setAdmins(adminsList);
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = () => {
    console.log("submit register admin");
    UserService.registerAdmin({ username: username, password: password, role: "ROLE_ADMIN" });
    showNotification("Successfully registered new admin", "success");
  };
  return (
    <>
      Hello from admin
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <ul>
          {admins.map((admin: any) => (
            <li key={admin?.id}>{admin?.username}</li>
          ))}
        </ul>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color={"secondary"} sx={{ mt: 3, mb: 2 }}>
              Register Admin
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterAdmin;
