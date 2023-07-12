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
import Sherpa_dashboard from "./pages/sherpa_dashboard";
//components
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
import ProgressStepper from "./Components/ProgressStepper";
import Footer from "./components/Footer";

import { useAuth } from "./Providers/AuthProvider";
// prettier-ignore
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { userSession } = useAuth();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handlePageTitle = (title, subtitle) => {
    setTitle(title);
    setSubtitle(subtitle);
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} 
            title={title}
            subtitle={subtitle}/>

            {userSession ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile handlePageTitle={handlePageTitle}/>} />
                <Route path="/sherpa-dashboard" element={<Sherpa_dashboard handlePageTitle={handlePageTitle}/>} />
                <Route path="/student-dashboard" element={<StudentDashboard handlePageTitle={handlePageTitle} />} />
                <Route path="/currentstuck" element={<ProgressStepper />} />
                <Route path="/*" element={<ErrorPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/about" element={<About />} />
                <Route path="/*" element={<ErrorPage />} />
              </Routes>
            )}
          </main>
    </div>
    <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
