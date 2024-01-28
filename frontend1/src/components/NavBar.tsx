// NavBar.tsx
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";
import { useUser } from "../contexts/UserContext";
import { Stack } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

const pages = ["Home", "Salons", "Categories", "Services", "BookingTimes"];
const settings = ["Profile", "Appointments", "Logout"];

interface NavBarProps {
  closeMobileMenu: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ closeMobileMenu }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user, updateUser } = useUser();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: String) => {
    //console.log(setting, "setting");
    if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Appointments") {
      navigate("/appointments");
    } else if (setting === "Logout") {
      AuthService.logout();
      updateUser();
      showNotification("Successfull logout", "success");
      navigate("/home");
    }
    setAnchorElUser(null);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <ModeOfTravelIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <KeyboardDoubleArrowRightIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            onClick={handleLinkClick}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BEAUTYCENTER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography component={Link} to={page === "Home" ? "/home" : `/${page.toLowerCase()}`} onClick={handleLinkClick} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <KeyboardDoubleArrowRightIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            onClick={handleLinkClick}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === "Home" ? "/home" : `/${page.toLowerCase()}`}
                onClick={handleLinkClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {user !== null ? (
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction={"row"} gap={"5px"}>
                <Typography color={"secondary"} sx={{ alignSelf: "center" }} variant="h6">
                  {user.client?.name || user.employee?.name || user.username}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/broken-image.jpg" sx={{ bgcolor: "#009688" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Stack direction={"row"} gap={"5px"}>
              <Button variant="contained" color="secondary" size="small" onClick={() => navigate("/login")}>
                Login
              </Button>{" "}
              <Button variant="outlined" color="secondary" size="small" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
