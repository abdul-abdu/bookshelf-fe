import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export const Navbar: React.FC = () => {
  return (
    <Box sx={{ display: "flex", marginBottom: 10 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img src="/shelf.png" />
          </Box>
          <Box>
            <Button sx={{ color: "#fff" }}>Craete</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
