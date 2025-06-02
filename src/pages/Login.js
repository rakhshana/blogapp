import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const signinurl = process.env.REACT_APP_API_SIGNIN;

  console.log(signinurl);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(signinurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name);

        Cookies.set("isLoggedIn", "true", { expires: 7 });
        Cookies.set("userEmail", email);
        Cookies.set("userPassword", password);
        Cookies.set("userId", data.userId);
        setMessage(`Login successful!`);
        navigate("/dashboard");
      } else {
        setMessage(`Login failed: ${data.error || "Invalid credentials"}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFDECD",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          border: "1px solid #ccc",
          padding: "40px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ marginBottom: "15px" }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ marginBottom: "15px" }}
        />

        <Button variant="contained" type="submit" color="error" fullWidth>
          Login
        </Button>

        <Button onClick={goToRegister} style={{ marginTop: "10px" }} fullWidth>
          Don't have an account? Register
        </Button>

        {message && (
          <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Signin;
