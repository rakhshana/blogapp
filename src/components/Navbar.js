import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:4000/api/auth/all/${userId}`
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    const response = await fetch(
      `http://localhost:4000/api/auth/delete/${postId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully.");
    } else {
      toast.error("Failed to delete post.");
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

      <div style={{ padding: "20px" }}>
        {posts.length === 0 ? (
          <Typography>No posts found.</Typography>
        ) : (
          posts.map((post) => (
            <Card
              key={post._id}
              sx={{ marginBottom: "20px", position: "relative" }}
            >
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:4000/uploads/${post.image}`}
                  alt={post.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography>{post.content}</Typography>

                <IconButton
                  onClick={() => handleDelete(post._id)}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
