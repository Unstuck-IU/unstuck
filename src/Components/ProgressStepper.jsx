import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { StatementForm } from "./StatementForm";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";

const Item = styled(Stepper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "left",
  color: theme.palette.text.zest,
}));

const steps = [
  "Post a Stuck",
  "Pick a Stuck",
  "Problem: Statement",
  "Problem: Expand",
  "Problem: Example",
  "Problem: Illustration",
  "Review and Submit Problem",
  "Review Peers Stucks",
];

export default function ProgressStepper(props) {
  const [formValues, setFormValues] = useState({});
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [chosenStuckId, setChosenStuckId] = useState(null);
  const [isAllStepsComplete, setIsAllStepsComplete] = useState(false);
  const { userDetails } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    console.log("ProgressStepper useEffect called, activeStep: ", activeStep);
    //check if all of the steps in the stepper have been marked as complete, if so, send call to handleUpload function

    if (completedSteps() === totalSteps() - 1) {
      console.log("all steps are complete! setting isAllStepsComplete to true");
      setIsAllStepsComplete(true);
    }
  }, [completed]);

  const totalSteps = () => {
    return steps.length;
  };

  const handleLoadFromLocal = () => {
    const statement = getitem("formvalues");
    console.log(formValues);
    localStorage.getItem("statementText");
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    let newActiveStep = null;

    if (isLastStep() && isAllStepsComplete === false) {
      // if it's the last step, but not all steps have been completed,
      // find the first step that has not been completed
      newActiveStep = steps.findIndex((step, i) => !(i in completed));
      if (chosenStuckId !== null && newActiveStep === 1) {
        submitChosenStuck();
      }
    } else {
      newActiveStep = activeStep + 1;
      if (chosenStuckId !== null && activeStep === 1) {
        submitChosenStuck();
      }
      if (activeStep === 6) {
        props.handleUpload(formValues);
      }
    }
    if (activeStep === 1 && chosenStuckId === null) {
      props.handleAlert("Please choose a stuck before continuing", "warning");
    } else {
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setIsAllStepsComplete(false);
    setActiveStep(0);
    setCompleted({});
  };

  const handleTextFieldChange = (event) => {
    // this is the one to update the info as each field is typed into
    const { name, value } = event.target;
    console.log("handleTextFieldChange, name:", name, "value: ", value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log("formValues: ", formValues);
  };

  const handleTextFieldSubmit = async (columnName) => {
    console.log("handleTextFieldSubmit was called, columnName: ", columnName.name);
    // this is the one used to send the info to the database
    // supabase update user_topic {column_name}
    // supabase table names: statement_text, expand_text, example_text, illustration_text
    let columnToUpdate = columnName.name + "_text"; // get just the column name from the form input
    console.log("columnToUpdate: ", columnToUpdate);
    const { data: textFieldFormSubmit, error: textFieldFormSubmitError } = await supabase
      .from("user_topic")
      .update({
        [columnToUpdate]: formValues[columnName.name], // object bracket notation used to specify dynamic values of key:value pairs
      })
      .eq("user_id", userDetails.user_id) // matches the current user_id of logged in student
      .eq("topic_id", props.activeTopic.id) // matches the current topic, completing the filter for the correct user_topic record
      .select();
    if (textFieldFormSubmitError) {
      console.log("Error received while updating user_topic table entries for formValues. \n", textFieldFormSubmitError);
    } else {
      console.log("handleTextFieldSubmit: studentEntries: ", textFieldFormSubmit);
    }
  };

  const handleSave = () => {
    localStorage.setItem("formValues", formValues);
    console.log("These are the current form values: \n", formValues);
  };

  const handleComplete = () => {
    console.log("handleComplete was called");
    console.log("activeStep: ", activeStep);
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if (activeStep === 2) {
      console.log("handleComplete was called for statement (step 2)");
      handleTextFieldSubmit(statement);
    }
    if (activeStep === 3) {
      console.log("handleComplete was called for expand (step 3)");
      handleTextFieldSubmit(expand);
    }
    if (activeStep === 4) {
      console.log("handleComplete was called for example (step 4)");
      handleTextFieldSubmit(example);
    }
    if (activeStep === 5) {
      console.log("handleComplete was called for illustrate (step 5)");
      handleTextFieldSubmit(illustrate);
    }
    if (activeStep === 6) {
      console.log("handleComplete was called for Submit Stuck", formValues);
      props.handleUpload(formValues);
    }
    handleSave();
    handleNext();
  };

  const handleChosenStuck = (stuckId) => {
    setChosenStuckId(stuckId);
    console.log("chosen stuck id: ", stuckId);
  };

  const submitChosenStuck = async () => {
    if (chosenStuckId !== null) {
      const { data: updatedUserTopic, error } = await supabase
        .from("user_topic")
        .update({ selected_stuck_id: chosenStuckId })
        .eq("user_id", userDetails?.user_id)
        .eq("topic_id", props.activeTopic.id)
        .select();
      console.log("updatedUserTopic after updating the chosen stuck: ", updatedUserTopic);
      // save the data we just collected from updating the user_topic table to state
    } else if (chosenStuckId === null) {
      props.handleAlert("Please choose a stuck before continuing", "warning");
    }
  };

  const stepStyle = {
    boxShadow: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 2,
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: colors.greenAccent[600],
        fontSize: "1.5rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: colors.greenAccent[600],
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: colors.zest[500],
        fontSize: "1.5rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: colors.zest[700],
      },
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <meta
        name="view-transition"
        content="same-origin"
      />
      <Stepper
        sx={stepStyle}
        nonLinear
        alternativeLabel
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}>
            <StepButton
              color={colors.zest[600]}
              onClick={() => handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {isAllStepsComplete ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished.</Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>Please wait for your Sherpa to activate the next step!</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <React.Fragment>
            <StatementForm
              activeStep={activeStep}
              formValues={formValues}
              handleTextFieldChange={handleTextFieldChange}
              handleChosenStuck={handleChosenStuck}
              activeTopic={props.activeTopic}
              handleFetchStucks={props.handleFetchStucks}
              chosenStuckId={chosenStuckId}
              handleAlert={props.handleAlert}
              // joinCode={props.joinCode}
              {...props}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>{/* {children[activeStep]} */}</Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                // color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  color: colors.black[100],
                  border: 1,
                  borderColor: colors.black[100],
                  fontSize: "14px",
                }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep < steps.length && completed[activeStep] && completedSteps() < totalSteps() - 1 ? (
                <Button
                  onClick={handleNext}
                  sx={{
                    mr: 1,
                    color: colors.primary[100],
                    border: 1,
                    borderColor: colors.primary[100],
                    fontSize: "14px",
                  }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}>
                    Next Step
                  </Typography>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleComplete();
                  }}
                  sx={{
                    mr: 1,
                    color: colors.primary[100],
                    border: 1,
                    borderColor: colors.zest[600],
                    fontSize: "14px",
                  }}>
                  {activeStep === 6
                    ? "Submit Filled Out Stuck"
                    : completedSteps() >= totalSteps() - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
