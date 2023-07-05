import React from "react";
import { useState, useEffect } from "react";
import SignIn from "./Signup.jsx";
import Box from "@mui/material/Box";
import { Container, CssBaseline, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Copyright } from "@mui/icons-material";
import Copyright2 from "../components/Copyright2.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <div>
          <CssBaseline />
          <Grid
            container
            spacing={2}>
            <Grid
              item
              xs={6}>
              <Item>
                <h1>Unstuck</h1>
                <h2>Start your expedition with critical thinking: where learning becomes an adventure.</h2>
                <h3>Learn how to use critical thinking to easily break down problems.</h3>
                <ul>
                  <li>A Sherpa (teacher) sets out a topic for their class.</li>
                  <li>
                    The app leads students through the process of developing problem statements related to the topic, called
                    “stucks”.
                  </li>
                  <li>
                    Students then using critical thinking skills to break down the stuck, gather feedback, and refine their
                    analysis.
                  </li>
                  <li>Afterwards, students can develop the idea they want to prototype to solve the stuck.</li>
                </ul>
              </Item>
            </Grid>
            <Grid
              item
              xs={6}>
              <Item>
                {/* </div> */}
                {/* <div
        className="container"
        style={{ padding: "50px 0 100px 0" }}> */}
                <SignIn />
              </Item>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Copyright2 />
    </div>
  );
}
