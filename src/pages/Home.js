import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "-90px",
          textAlign: "center",
          color: "white",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Publish your passions, your way
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleClick}
        >
          Create your Blog
        </Button>
      </div>
    </div>
  );
}

export default Home;
