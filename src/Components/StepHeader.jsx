import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const StepHeader = ({ activeStep }) => {
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();

  const steps = {
    1: {
      primary: "Post A Stuck",
      secondary:
        "Within each topic area there are a number of important questions that relate to better understanding the problems and opportunities that are present. By important, we mean questions for which the answers will have significant impact on improving our understanding of the topic area. Things that will keep us stuck if we don't understand them better.",
    },
    2: { primary: "Select a Stuck", secondary: "Choose a Stuck to work on that inspires you" },
    3: {
      primary: "Problem Statement",
      secondary: "Write your problem statement out in one to two sentences, being as clear and concise as possible",
    },
    4: { primary: "Expand", secondary: "Expand on your problem statement, providing more detail and context" },
    5: { primary: "Example", secondary: "Provide an example of your problem statement that happens in the real world" },
    6: { primary: "Illustration", secondary: "Provide an illustration of your problem statement, like a metaphor or analogy" },
    7: { primary: "Submit Problem", secondary: "Review and change things to your liking. Remember: iterate, iterate, iterate!" },
    8: {
      primary: "Review Peer Stucks",
      secondary: "Provide some helpful feedback for your colleagues. Hopefully they'll do the same for you.",
    },
  };
  return (
    <>
      {activeStep >= 0 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              mr="10px">
              Step {activeStep + 1}: {steps[activeStep + 1].primary}
            </Typography>
            <Typography
              variant="h4"
              mr="10px">
              {steps[activeStep + 1].secondary}
            </Typography>
          </Box>
        </Box>
      )}

      {activeStep === 1 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/map-29903_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {activeStep === 2 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/support-6773819_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {activeStep === 3 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/adventure-5519220_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {activeStep === 4 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/mountain-7011121_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {activeStep === 5 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/adventure-7691290_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {activeStep === 6 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="10px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            sx={{
              m: "30px",
              display: "flex",
              flexDirection: "column",
            }}></Box>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/success-7097008_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
    </>
  );
};

export default StepHeader;
