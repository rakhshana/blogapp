import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Navbar";
import CreatePost from "./components/Createpost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Signin
            onLoginSuccess={() => (window.location.href = "/dashboard")}
          />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
