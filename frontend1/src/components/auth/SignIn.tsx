import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
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

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { updateUser } = useUser();

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginObject = {
      username: username,
      password: password,
      //role: "ROLE_CLIENT",
    };
    console.log(loginObject);

    // try {
    //   const response = await fetch("http://localhost:8080/login", {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loginObject),
    //   });

    //   if (response.ok) {
    //     // Handle success, e.g., show a success message or redirect to login
    //     console.log("Login successful");
    //     navigate("/home");
    //     window.location.reload();
    //   } else {
    //     // Handle error, e.g., show an error message
    //     console.error("Registration failed");
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    // }
    AuthService.login(username, password).then(
      () => {
        navigate("/home");
        updateUser();
        //window.location.reload();
      },
      (error: any) => {
        console.log(error);
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        showNotification(resMessage, "error");
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
            onChange={onChangeUsername}
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
            onChange={onChangePassword}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
