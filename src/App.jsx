import React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
