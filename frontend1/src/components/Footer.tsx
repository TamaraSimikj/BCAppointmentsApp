import { Divider, Link, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "20px" }}>
      <Divider sx={{ width: "50%", margin: "auto", mb: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          BeautyCenter
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
      {/* <p>&copy; {currentYear} BeautyCenter. All rights reserved.</p> */}
    </footer>
  );
};

export default Footer;
