import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function MenuBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#DC143C" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/wall")}
        >
          DASHBOARD
        </Button>
        <Box>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create Post
          </Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            View Posts
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default MenuBar;
