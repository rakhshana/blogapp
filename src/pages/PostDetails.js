import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!userId;

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/auth/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("Please log in to like this post.");
      return;
    }
    try {
      await axios.post(`http://localhost:4000/api/auth/${postId}/like`, {
        userId,
      });
      fetchPost();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    if (!isLoggedIn) {
      alert("Please log in to comment.");
      return;
    }

    try {
      await axios.post(`http://localhost:4000/api/auth/${postId}/comment`, {
        userId,
        text: commentText,
      });
      setCommentText("");
      fetchPost();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#DC143C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: 600, width: "100%" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Card sx={{ backgroundColor: "#f5f5dc" }}>
          {post.image && (
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:4000/uploads/${post.image}`}
              alt={post.title}
            />
          )}
          <CardContent>
            {post.videoUrl && (
              <Box
                my={2}
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  width: "100%",
                  height: 0,
                }}
              >
                <iframe
                  src={post.videoUrl.replace("watch?v=", "embed/")}
                  title="Post Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                  }}
                />
              </Box>
            )}

            {/* User Info */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
              mb={2}
            >
              <Avatar
                src={
                  post.userId?.profilePhoto
                    ? `http://localhost:4000/${post.userId.profilePhoto}`
                    : undefined
                }
                alt={post.userId?.name || "User"}
                sx={{ width: 56, height: 56 }}
              >
                {!post.userId?.profilePhoto && post.userId?.name
                  ? post.userId.name[0].toUpperCase()
                  : ""}
              </Avatar>
              <Typography variant="h6" align="center">
                {post.userId?.name || "Anonymous"}
              </Typography>
            </Box>

            {/* Post title and content */}
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              component="div"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <IconButton color="error" onClick={handleLike}>
                <FavoriteIcon />
              </IconButton>
              <Typography>{post.likes?.length || 0} Likes</Typography>
            </Box>

            {isLoggedIn ? (
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button variant="contained" onClick={handleCommentSubmit}>
                  Comment
                </Button>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" mb={2}>
                Please log in to add a comment.
              </Typography>
            )}

            {/* Comments list */}
            {post.comments?.length === 0 && (
              <Typography variant="body2" color="textSecondary">
                No comments yet.
              </Typography>
            )}
            {post.comments?.map((comment) => (
              <Box
                key={comment._id || comment.createdAt}
                display="flex"
                alignItems="center"
                gap={2}
                mb={1}
              >
                <Avatar
                  src={
                    comment.user?.profilePhoto
                      ? `http://localhost:4000/${comment.user.profilePhoto}`
                      : undefined
                  }
                  alt={comment.user?.name || "User"}
                  sx={{ width: 32, height: 32 }}
                >
                  {!comment.user?.profilePhoto && comment.user?.name
                    ? comment.user.name[0].toUpperCase()
                    : ""}
                </Avatar>
                <Typography variant="body2">
                  <strong>{comment.user?.name || "Anonymous"}: </strong>
                  {comment.text}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default PostDetails;
