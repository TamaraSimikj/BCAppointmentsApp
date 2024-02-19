// App.tsx
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import { theme } from "./assets/styles/themeStyles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavBar from "./components/NavBar";
import { Box, Container, Paper, ThemeProvider } from "@mui/material";
import Notification from "./components/Notification";
import { AuthProvider } from "./contexts/AuthContext";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navBarProps = {
    closeMobileMenu,
  };

  return (
    <>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <Notification />
            <NavBar {...navBarProps} />

            <Box
              component="main"
              id="container-main"
              sx={{
                flexGrow: 1,
                zIndex: 1,
                height: "100%",
                width: "100%",
                backgroundColor: theme.palette.background.default,
              }}
            >
              {/* <div style={{ height: "auto", minHeight: "100vh" }}> */}
              <AllRoutes />
              {/* </div> */}
            </Box>
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
