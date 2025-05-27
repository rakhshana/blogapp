import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, AppBar, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function BlogWall() {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("*"); // change "/" to your actual home route if different
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/all");
      setPosts(res.data.reverse());
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:4000/api/auth/${postId}/like`, {
        userId,
      });
      fetchAllPosts();
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      await axios.post(`http://localhost:4000/api/auth/${postId}/comment`, {
        user: userId || "Anonymous",
        text,
      });
      setCommentInputs({ ...commentInputs, [postId]: "" });
      fetchAllPosts();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#DC143C", height: "30px" }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton color="inherit" onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#DC143C",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Dancing Script, cursive", color: "white" }}
        >
          Blog Wall
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {posts.map((post) => {
            console.log("Post Creator:", post.userId); // <-- Check creator data here

            return (
              <Grid item xs={12} sm={10} md={8} key={post._id}>
                <Card
                  sx={{
                    backgroundColor: "#f5f5dc", // light beige
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    margin: "1.5rem 0",
                    padding: "1rem",
                  }}
                >
                  <CardContent>
                    {/* Post Title + Tooltip */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={1}
                      mb={1}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Dancing Script, cursive",
                          color: "#2e2e2e",
                        }}
                      >
                        {post.title}
                      </Typography>

                      {post.userId && (
                        <Tooltip
                          title={
                            <Box p={1} maxWidth={250}>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={1}
                              >
                                <Avatar
                                  src={
                                    post.userId.profilePhoto
                                      ? `http://localhost:4000/${post.userId.profilePhoto}`
                                      : undefined
                                  }
                                  alt={post.userId.name || "User"}
                                  sx={{ width: 40, height: 40 }}
                                >
                                  {!post.userId.profilePhoto && post.userId.name
                                    ? post.userId.name[0].toUpperCase()
                                    : ""}
                                </Avatar>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {post.userId.name || "Unknown User"}
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{ wordWrap: "break-word" }}
                              >
                                {post.userId.about ||
                                  "No description available."}
                              </Typography>
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <IconButton>
                            <InfoIcon color="action" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4b4b4b",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {post.content}
                    </Typography>

                    <Box mt={2} display="flex" alignItems="center" gap={1}>
                      <IconButton
                        onClick={() => handleLike(post._id)}
                        color="error"
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <Typography>{post.likes?.length || 0} Likes</Typography>
                    </Box>

                    {/* Comments Input */}
                    <Box mt={2}>
                      <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Add a comment..."
                        value={commentInputs[post._id] || ""}
                        onChange={(e) =>
                          handleCommentChange(post._id, e.target.value)
                        }
                        sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleCommentSubmit(post._id)}
                        sx={{ marginTop: "0.5rem", backgroundColor: "#8fbc8f" }}
                      >
                        Comment
                      </Button>
                    </Box>

                    {/* Show Comments */}
                    {post.comments?.length > 0 && (
                      <Box mt={2}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Comments:
                        </Typography>
                        {post.comments.map((c, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{ color: "#81c784" }}
                          >
                            <strong>{c.user.name || "Anonymous"}:</strong>{" "}
                            {c.text}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <br />
        <Box textAlign="center">
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default BlogWall;
