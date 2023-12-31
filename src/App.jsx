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
import Feedback from "./pages/Feedback";
//components
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import { useAuth } from "./Providers/AuthProvider";

// prettier-ignore
export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { userSession, loading, userDetails } = useAuth();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  let isViewTransition =
    "Oops, Your browser doesn't support View Transitions API";
  if (document.startViewTransition) {
    isViewTransition = "Yes, Your browser support View Transitions API";
  }

  const handlePageTitle = (title, subtitle) => {
    setTitle(title);
    setSubtitle(subtitle);
  }


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <meta
        name="view-transition"
        content="same-origin"
      />
          <Sidebar className="sidebar" isSidebar={isSidebar} />
          <main className="content">
            <div className="header">
              <Topbar setIsSidebar={setIsSidebar}
            title={title}
            subtitle={subtitle}/>
            </div>
            <div className="page-content">
              {userSession && !loading && userDetails ? (
                <Routes>
                  <Route path="/" element={<Home handlePageTitle={handlePageTitle}/>} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/about" element={<About handlePageTitle={handlePageTitle}/>} />
                  <Route path="/profile" element={<Profile handlePageTitle={handlePageTitle}/>} />
                  {userDetails?.user_type === "sherpa" && (
                    <Route path="/sherpa-dashboard" element={<SherpaDashboard handlePageTitle={handlePageTitle}/>} />
                    )}
                  {userDetails?.user_type === "student" && (
                    <Route path="/student-dashboard" element={<StudentDashboard handlePageTitle={handlePageTitle}/>} />
                    )}
                    {userDetails?.user_type === "student" && (
                  <Route path="/feedback" element={<Feedback handlePageTitle={handlePageTitle}/>} />
                    )}
                  <Route path="/*" element={<ErrorPage />} />
                </Routes>
              ) : (!loading ? (
                <Routes>
                  <Route path="/" element={<Home handlePageTitle={handlePageTitle}/>} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/*" element={<ErrorPage />} />
                </Routes>
              ) : ( <LoadingSpinner />))}
              </div>
            <div className="footer">
              <Footer />

              {/* <p>{"...." +isViewTransition}</p> */}
            </div>
          </main>
    </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
