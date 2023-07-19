import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { StatementForm } from "./StatementForm";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";

const steps = [
  "Post a Stuck",
  "Pick a Stuck",
  "Problem: Statement",
  "Problem: Expand",
  "Problem: Example",
  "Problem: Illustration",
  "Submit Problem",
  // "Review Peers Stucks",
];

export default function ProgressStepper(props) {
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({ statement: "", expand: "", example: "", illustrate: "" });
  const { userDetails } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

  const allStepsCompleted = () => {
    props.handleUpload(formValues);
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
    // console.log("current active step", activeStep)
    // console.log("Current stepper step:", step)
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("formValues", formValues);
    console.log("These are the current form values \n", formValues, "This is formValues.statement\n", formValues.statement);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleSave();
    handleNext();
  };

  const handleChosenStuck = async (stuckId) => {
    console.log("STUCK CARD CLICKED");
    console.log("Click object key:", stuckId);
    const { data: updatedUserTopic, error } = await supabase
      .from("user_topic")
      .update({ selected_stuck_id: stuckId })
      .eq("user_id", userDetails?.user_id)
      .eq("topic_id", props.activeTopic.id)
      .select();
    console.log("updatedUserTopic after updating the chosen stuck: ", updatedUserTopic);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        alternativeLabel
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}>
            <StepButton
              color="inherit"
              onClick={() => handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
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
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Button
                    onClick={handleNext}
                    sx={{
                      mr: 1,
                      color: colors.black[100],
                      border: 1,
                      borderColor: colors.black[100],
                      fontSize: "14px",
                    }}>
                    {completedSteps() === totalSteps() - 1 ? (
                      "Finish"
                    ) : (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}>
                        Next Step
                  </Typography>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    sx={{
                      mr: 1,
                      color: colors.black[100],
                      border: 1,
                      borderColor: colors.black[100],
                      fontSize: "14px",
                    }}>
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
