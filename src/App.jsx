import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
// import Navbar from "./components/Navbar";
import Sidebar from "./global/Sidebar";
import Topbar from "./global/TopBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sherpa_admin from "./pages/sherpa_admin";
// import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import "./App.css";

// commenting out for now in favour of the theme from ./theme.js
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#41644A",
//     },
//     secondary: {
//       main: "#FF7B54",
//     },
//   },
// });
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
            </Routes>
          </main>
    </div>
        
          
       
      </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
