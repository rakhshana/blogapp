import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Box,
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
import MenuBar from "./MenuBar";
import DOMPurify from "dompurify";

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
      <MenuBar />

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
              {post.videoUrl && (
                <CardMedia
                  component="iframe"
                  height="315"
                  src={post.videoUrl.replace("watch?v=", "embed/")}
                  title="Post Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sx={{
                    borderRadius: "4px",
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography
                  variant="body1"
                  paragraph
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                />

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
