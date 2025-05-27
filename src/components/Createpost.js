import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Createpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const userId = Cookies.get("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const response = await fetch("http://localhost:4000/api/auth/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, userId }),
    });

    if (response.ok) {
      toast.success("Post created!");
      navigate("/dashboard");
    } else {
      toast.console.error("Failed to create post.");
    }
  };

  return (
    <div style={{ backgroundColor: "#FAF0E6", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#DC143C" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create Post
          </Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            View Posts
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br />

      <Container maxWidth="md">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create New Post
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            multiline
            rows={6}
            sx={{ backgroundColor: "#fff" }}
          />
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                backgroundColor: "#DC143C",
                color: "white",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#b01032",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Createpost;
