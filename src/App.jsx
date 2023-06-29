import React from "react";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/student-dashboard" element={<StudentDashboard />} />
  </Routes>
  </div>
  )
  //  <main>
      /* <div>
          <h1>Unstuck!</h1>
          <h3>
            This is a platform for students to get experience through real-world projects to gain a
            greater understanding of their skills, talents, interests and personality traits
          </h3>
          <p>
            Sherpa's lead students through developing problem statements called "Stucks" which refer
            to the topic that the sherpa has laid out. Then students start out on an Expedition,
            uncovering deeper learning and knowledge about the Stuck they are diving into. Students
            are trained in the process of using critical thinking and design thinking to get more
            understanding of a problem than they've ever had before.
          </p>
          <p>
            Unstuck helps students find direction during the project phase, guiding them through
            self-reflection to get the most learning possible from completing their projects. This
            will help give students direction after high-school, and it's all about
            self-exploration!
          </p>
      </div> */
      /* <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
     */
    /* </main>
  ) */
  }
export default App;
