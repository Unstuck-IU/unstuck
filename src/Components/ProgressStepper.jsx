import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
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
  "Review Peers Stucks",
];

export default function ProgressStepper(props) {
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({ statement: "", expand: "", example: "", illustrate: "" });
  const [chosenStuckId, setChosenStuckId] = useState(null);
  const [isAllStepsComplete, setIsAllStepsComplete] = useState(false);
  const { userDetails } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    //check if all of the steps in the stepper have been marked as complete, if so, send call to handleUpload function
    if (completedSteps() === totalSteps()) {
      setIsAllStepsComplete(true);
      props.handleUpload(formValues);
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
    }

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
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
    console.log(formValues, formValues.statement);
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
    } else if (chosenStuckId === null) {
      props.handleAlert("Please choose a stuck before continuing", "warning");
    }
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
