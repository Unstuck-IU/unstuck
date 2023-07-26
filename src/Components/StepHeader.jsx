import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const StepHeader = ({ activeStep, currentStuckData, ...rest }) => {
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();
  const [stuckData, setStuckData] = useState({});

  useEffect(() => {
    if (activeStep === 2) {
      if (currentStuckData === null) {
        setStuckData({ ...stuckData, driving_question: "No Stuck Selected, please go back to Step 2 and select a Stuck." });
        rest.handleAlert("No Stuck Selected, please go back to Step 2 and select a Stuck", "error");
      } else {
        setStuckData({ ...stuckData, driving_question: currentStuckData[0].driving_question });
      }
      console.log("stuckData: ", stuckData);
    }
  }, [activeStep]);

  const steps = {
    1: {
      primary: "Post A Stuck",
      secondary:
        "Within each topic area there are a number of important questions that relate to better understanding the problems and opportunities that are present. By important, we mean questions for which the answers will have significant impact on improving our understanding of the topic area. Things that will keep us stuck if we don't understand them better.",
    },
    2: { primary: "Select a Stuck", secondary: "Choose a Stuck to work on that inspires you" },
    3: {
      primary: "Problem Statement",
      secondary:
        "Referring to your selected 'Stuck', concisely state the following in one or two sentences: The current situation, the desired future situation, and the gap(s) that exist between the two.",
    },
    4: {
      primary: "Expand",
      secondary:
        "Describe more about the problem and how it works including when and where it is happening, who or what is involved, and what the consequences are and / or might be if it continues. Perhaps highlight key relationships, feedback loops, or concepts.",
    },
    5: {
      primary: "Example",
      secondary:
        "Provide a sample scenario that is representative of the problem in action. If there are variations, consider more than one example to help get further clarity.",
    },
    6: {
      primary: "Illustration",
      secondary:
        "Provide a representation of the problem in a different form that is already more familiar using synonyms, analogies, metaphors, or visual presentations.",
    },
    7: {
      primary: "Review and Submit Problem",
      secondary:
        "Review and change things to your liking. Remember: It's totally ok to delete what you had and to try again, there's no shame in starting over!",
    },
    8: {
      primary: "Review Peer Stucks",
      secondary:
        "Provide some helpful feedback for your peers. You will be receiving feedback from them as well, after which you will use to further clarify the problem you've identified with your Stuck.",
    },
  };
  return (
    <>
      {activeStep >= 0 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
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
            {activeStep === 2 && (
              <Typography
                mt={"1em"}
                variant="h3"
                fontWeight={"bold"}>
                Selected Stuck: {stuckData.driving_question}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {/* Post a Stuck */}
      {activeStep === 0 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/post-it-2718596_640.png")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "250px",
              height: "150px",
            }}></Box>
        </Box>
      )}
      {/* Pick a Stuck */}
      {activeStep === 1 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {/* Problem: Statement */}
      {activeStep === 2 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {/* Problem: Expand */}
      {activeStep === 3 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {/* Problem: Example */}
      {activeStep === 4 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {/* Problem: Illustration */}
      {activeStep === 5 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {/* Submit Problem */}
      {activeStep === 6 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
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
      {activeStep === 7 && (
        <Box
          display="flex"
          alignItems="space-evenly"
          justifyContent="space-evenly"
          marginTop="15px"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Box
            display="flex"
            sx={{
              backgroundImage: `url("../src/assets/images/survey-7078101_640.png")`,
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
