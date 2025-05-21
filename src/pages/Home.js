import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
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
            onClick={handleClick}
          >
            Create your Blog
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
