import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { StatementForm } from "./StatementForm";

const steps = [
  "Post a Stuck",
  "Pick a Stuck",
  "Problem: Statement",
  "Problem: Expand",
  "Problem: Example",
  "Problem: Illustration",
  // "Submit Problem",
  // "Review Peers Stucks",
];

export default function ProgressStepper({ activeStep, setActiveStep }) {
  const [completed, setCompleted] = useState({});
  const [formValues, setFormValues] = useState({ statement: "", expand: "", explain: "", illustrate: "" });
  const totalSteps = () => {
    // return 4; // just returning manually 4 while I'm working on the first two steps
    return steps.length;
  };

  const handleLoad = () => {
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
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleSave();
    handleNext();
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
    console.log(formValues);
  };

  // const [formData, setFormData] = useState({});

  // const children = [

  //   <StatementForm onChange={changeText} text1={newText} />,
  //   // <ExpandForm />,
  //   // <ExampleForm />,
  //   // <IllustrateForm />,
  // ]

  // [<CreateStuck />,
  // <ChooseStuck />,
  // <ExpandForm />,
  // <ExampleForm />,
  // <IllustrationForm />,
  // <SubmitProblem />,
  // <PeerStucks />]

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
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <React.Fragment>
            <StatementForm
              step={activeStep - 2} // setting as -2 because the first 2 steps don't have components attached yet
              formValues={formValues}
              handleTextFieldChange={handleTextFieldChange}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>{/* {children[activeStep]} */}</Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>{completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}</Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
