import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const displayUrl = process.env.REACT_APP_API_DISPLAY;

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
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create Post
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
          posts.map((post, idx) => (
            <Card key={idx} sx={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography>{post.content}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
