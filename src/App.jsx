import {React} from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import SupabaseProvider from "./Providers/SupabaseProvider";
import AuthProvider from "./Providers/AuthProvider";
const theme = createTheme({
  palette: {
    primary: {
      main: "#41644A",
    },
    secondary: {
      main: "#FF7B54",
    },
  }
});
function App() {
  return (
    <div>
              <SupabaseProvider>
          <AuthProvider>   
      <ThemeProvider theme={theme}>
       

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>

      </ThemeProvider>
      </AuthProvider> 
        </SupabaseProvider>
    </div>
  );
}

export default App;
