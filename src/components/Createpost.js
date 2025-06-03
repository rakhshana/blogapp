import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import MenuBar from "./MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

function getEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } else if (hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } else if (hostname.includes("vimeo.com")) {
      const videoId = parsedUrl.pathname.split("/")[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
}

function Createpost() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState(null);
  const [saveAsHtml, setSaveAsHtml] = useState(true);
  const [plainText, setPlainText] = useState("");

  const navigate = useNavigate();

  // Initialize Tiptap editor with empty content
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline],
    content: "",
  });

  const handleCreate = async () => {
    const userId = Cookies.get("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    if (saveAsHtml && !editor) {
      alert("Editor is not ready.");
      return;
    }

    // Prepare content based on toggle
    const contentToSave = saveAsHtml ? editor.getHTML() : plainText;

    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    if (!contentToSave.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", contentToSave); // Save content either as HTML or plain text
    formData.append("contentType", saveAsHtml ? "html" : "text"); // Send content type to backend
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

  if (saveAsHtml && !editor) return <div>Loading editor...</div>;

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

          <FormControlLabel
            control={
              <Checkbox
                checked={saveAsHtml}
                onChange={(e) => setSaveAsHtml(e.target.checked)}
              />
            }
            label="Save content as rich text (HTML)"
            sx={{ marginTop: 2 }}
          />

          <Typography sx={{ marginTop: 2, marginBottom: 1 }}>
            Content
          </Typography>

          {saveAsHtml ? (
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                minHeight: "200px",
                padding: "10px",
                backgroundColor: "white",
              }}
            >
              <EditorContent editor={editor} />
            </div>
          ) : (
            <TextField
              multiline
              rows={8}
              fullWidth
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
              placeholder="Enter plain text content here..."
            />
          )}

          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video link (YouTube, Vimeo, etc.)"
            sx={{ marginTop: 2 }}
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
