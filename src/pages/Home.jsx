import React from "react";
import { useState, useEffect } from "react";
import SignIn from "./Signup.jsx";
import Box from "@mui/material/Box";

export default function Home() {


  return (
    <Box m="20px">
      <div>
        <h1>Unstuck!</h1>
        <h3>
          This is a platform for students to get experience through real-world projects to gain a greater understanding of their
          skills, talents, interests and personality traits
        </h3>
        <p>
          Sherpa's lead students through developing problem statements called "Stucks" which refer to the topic that the sherpa
          has laid out. Then students start out on an Expedition, uncovering deeper learning and knowledge about the Stuck they
          are diving into. Students are trained in the process of using critical thinking and design thinking to get more
          understanding of a problem than they've ever had before.
        </p>
        <p>
          Unstuck helps students find direction during the project phase, guiding them through self-reflection to get the most
          learning possible from completing their projects. This will help give students direction after high-school, and it's all
          about self-exploration!
        </p>
      </div>
      <div
        className="container"
        style={{ padding: "50px 0 100px 0" }}>
        <SignIn />
      </div>
    </Box>
  );
}
