import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
//theme / mui
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
//components
import Sidebar from "./global/Sidebar";
import Topbar from "./global/TopBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
import Sherpa_admin from "./pages/sherpa_admin";
// import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import "./App.css";

// prettier-ignore
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sherpa-admin" element={<Sherpa_admin />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </main>
    </div>
        
          
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
