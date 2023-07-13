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
import SherpaDashboard from "./pages/SherpaDashboard";
//components
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";

import { useAuth } from "./Providers/AuthProvider";
// prettier-ignore
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { userSession, loading } = useAuth();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar className="sidebar" isSidebar={isSidebar} />
          <main className="content">
            <div className="header">
              <Topbar setIsSidebar={setIsSidebar} />
            </div>
            <div className="page-content">
              {userSession && !loading ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/sherpa-dashboard" element={<SherpaDashboard />} />
                  <Route path="/student-dashboard" element={<StudentDashboard />} />
                  <Route path="/*" element={<ErrorPage />} />
                </Routes>
              ) : (!loading ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/*" element={<ErrorPage />} />
                </Routes>
              ) : ( <LoadingSpinner />))}
              </div>
            <div className="footer">
              <Footer />
            </div>
          </main>
    </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
