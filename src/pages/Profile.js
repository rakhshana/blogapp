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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/auth/user/${userId}`
        );
        const user = res.data;

        setName(user.name || "");
        setEmail(user.email || "");
        setPassword(user.password || "");
        setAbout(user.about || "");
        if (user.profilePhoto) {
          setPreview(`http://localhost:4000/${user.profilePhoto}`);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!profilePhoto) return alert("Please select a photo first");
    const formData = new FormData();
    formData.append("profile", profilePhoto);
    try {
      await axios.post(
        `http://localhost:4000/api/auth/upload-profile/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Profile photo uploaded successfully");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/auth/user/${userId}`, {
        name,
        email,
        password,
        about,
      });
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed");
    }
  };

  return (
    <div style={{ backgroundColor: "#FAF0E6", minHeight: "130vh" }}>
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

      <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Your Profile
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              style={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          ) : (
            <Box
              width={150}
              height={150}
              borderRadius="50%"
              bgcolor="#ccc"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              No Photo
            </Box>
          )}
        </Box>

        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <Button
            variant="contained"
            component="label"
            sx={{ width: 150, height: 30 }}
          >
            Choose Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handleUpload}
            sx={{ width: 150, height: 30 }}
          >
            Upload Photo
          </Button>
        </Box>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Email row */}
          <Grid
            item
            container
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <Grid
              item
              sx={{
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 1,
              }}
            >
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                value={email}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            </Grid>
          </Grid>
          {/*Name row*/}
          <Grid
            item
            container
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <Grid
              item
              sx={{
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 1,
              }}
            >
              <Typography>Name:</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                size="small"
                sx={{ width: "215px" }}
              />
            </Grid>
          </Grid>

          {/* Password row */}
          <Grid
            item
            container
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <Grid
              item
              sx={{
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 1,
              }}
            >
              <Typography>Password:</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                type="password"
                value={password}
                fullWidth
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          {/* Description row */}
          <Grid
            item
            container
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <Grid
              item
              sx={{
                width: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: 1,
              }}
            >
              <Typography>About:</Typography>
            </Grid>
            <Grid item xs>
              <TextField
                label="About"
                variant="outlined"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
                multiline
                minrows={3}
                maxrows={6}
                size="small"
                sx={{ width: "215px" }}
              />
            </Grid>
          </Grid>

          {/* Save button */}
          <Grid item sx={{ width: "100%", mt: 2 }}>
            <center>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: 40, width: 140 }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </center>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
