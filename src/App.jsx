import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";

import "./App.css";


function App() { 
  

  return (

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/student-dashboard" element={<StudentDashboard />} />
  </Routes>

  )
}



export default App;
