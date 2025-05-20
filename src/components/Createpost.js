import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
      alert("Post created!");
      navigate("/dashboard");
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Create New Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" onClick={handleCreate} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Createpost;
