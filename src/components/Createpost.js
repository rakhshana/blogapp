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
import MenuBar from "./MenuBar";

function getEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes("youtube.com")) {
      // YouTube URL like: https://www.youtube.com/watch?v=VIDEO_ID
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } else if (hostname.includes("youtu.be")) {
      // YouTube short URL like: https://youtu.be/VIDEO_ID
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } else if (hostname.includes("vimeo.com")) {
      // Vimeo URL like: https://vimeo.com/VIDEO_ID
      const videoId = parsedUrl.pathname.split("/")[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    } else {
      // For other links, just return original URL or empty string
      return "";
    }
  } catch (e) {
    return "";
  }
}

function Createpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const userId = Cookies.get("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) {
      formData.append("image", image);
    }
    if (videoUrl.trim() !== "") {
      const embedUrl = getEmbedUrl(videoUrl.trim());
      if (embedUrl) {
        formData.append("videoUrl", embedUrl);
      } else {
        alert("Invalid video URL. Please enter a valid YouTube or Vimeo link.");
        return;
      }
    }

    const response = await fetch("http://localhost:4000/api/auth/create", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("Post created!");
      navigate("/dashboard");
    } else {
      toast.error("Failed to create post.");
    }
  };

  return (
    <div style={{ backgroundColor: "#FAF0E6", minHeight: "100vh" }}>
      <MenuBar />
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
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video link (YouTube, Vimeo, etc.)"
          />

          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Box>

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
