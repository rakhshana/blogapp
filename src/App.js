import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Navbar";
import CreatePost from "./components/Createpost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogWall from "./pages/BlogWall";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Signin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={isLoggedIn ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/wall" element={<BlogWall />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
