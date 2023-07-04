import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
//components
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
// // just writing example of how to show loading screen and fallback
// // error page when waiting for promise to resolve
// // from Beyond Fireship Youtube video "React VS Svelte...10 examples"
// function ComponentWithAsyncData(){
//   const number = use(Promise.resolve(69))

//   return(
//     <p>{number}</p>
//   );
// }

const theme = createTheme({
  palette: {
    primary: {
      main: "#41644A",
    },
    secondary: {
      main: "#FF7B54",
    },
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/signin"
            element={<SignIn />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/*"
            element={<ErrorPage />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
