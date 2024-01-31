import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useUser } from "../../contexts/UserContext";
import UserService from "../../services/user.service";
import { Stack } from "@mui/material";
import { User } from "../../data/models/Models";

const RegisterAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState<any>([]);
  const { showNotification } = useNotification();
  const fetchAdmins = async () => {
    let adminsList = await UserService.getAllAdmins();
    console.log(adminsList, "admins");
    setAdmins(adminsList);
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async () => {
    console.log("submit register admin");
    const newadmin = await UserService.registerAdmin({ username: username, password: password, role: "ROLE_ADMIN" });
    setAdmins((prevAdmins: User[]) => prevAdmins.map((prevAdmin: User) => (prevAdmin.id === newadmin.id ? newadmin : prevAdmin)));
    showNotification("Successfully registered new admin", "success");
  };
  return (
    <>
      {/* <Container component="main" maxWidth="xs"> */}
      <Stack direction="row" display={"flex"} justifyContent={"space-around"} p={10} width={"100%"} gap={"20%"}>
        <Stack width={"30%"}>
          <ul>
            {admins.map((admin: any) => (
              <li key={admin?.id}>{admin?.username}</li>
            ))}
          </ul>
        </Stack>
        {/* <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          > */}
        <Stack>
          <Typography component="h1" variant="h5">
            Register new admin
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
        </Stack>
        {/* </Box> */}
      </Stack>
      {/* </Container> */}
    </>
  );
};

export default RegisterAdmin;
