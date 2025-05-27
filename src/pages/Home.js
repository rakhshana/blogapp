import React from "react";
import { Button, Typography } from "@mui/material";
import BlogWall from "./BlogWall";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleExploreClick = () => {
    navigate("/wall");
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url('/bg1.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            bottom: "140px",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontFamily: "Dancing Script, cursive" }}
          >
            Publish your passions, your way
          </Typography>
          <br />
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleLoginClick}
            sx={{ marginBottom: "1rem", borderRadius: "8px", width: "200px" }}
          >
            Create your Blog
          </Button>
          <br />
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleExploreClick}
            sx={{ marginBottom: "1rem", borderRadius: "8px", width: "200px" }}
          >
            Explore Blogs
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
