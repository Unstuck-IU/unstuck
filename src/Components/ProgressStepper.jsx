


import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import StepLabel from "@mui/material/StepLabel";
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { StatementForm } from "./StatementForm";
import SexiForm from "./SexiForm";
const steps = [
  // "Post a Stuck",
  // "Pick a Stuck",
  "Problem: Statement",
  "Problem: Expand",
  "Problem: Example",
  "Problem: Illustration",
  // "Submit Problem",
  // "Review Peers Stucks",
];


export default function ProgressStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formValues, setFormValues] = useState({ statement: "", expand: "", explain: "", illustrate: "" });
  const totalSteps = () => {
    return steps.length;
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

  const handleStep = (step) => () => {
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

  const handleTextFieldChange = (
    event
  ) => {
    const { name, value } = event.target;
    console.log("Type of form values from inside handleText \n", typeof (name), typeof (value), typeof (formValues), console.log({ formValues }))
    setFormValues({
      ...formValues,
      [name]: value
    }

    )
    console.log("value\n", value, "name\n", name)
    console.log("Type of form values\n", typeof (name), typeof (value), typeof (formValues), [name], [value], "value", value, "name", name)
  }

  const handleSave = () => {
    localStorage.setItem("formValues", formValues);
    console.log(formValues)
  }
  // <CreateStuck />,
  // <ChooseStuck />,
  // <ExpandForm />,
  // <ExampleForm />,
  // <IllustrationForm />,
  // <SubmitProblem />,
  // <PeerStucks />



  const [formData, setFormData] = useState({});
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState("");
  const [text9, setText9] = useState("");
  // const newText = "";
  // const changeText = () => {
  //   setText1(newText)
  //   console.log("text1", text1)
  // }

  // const children = [

  //   <StatementForm onChange={changeText} text1={newText} />,
  //   // <ExpandForm />,
  //   // <ExampleForm />,
  //   // <IllustrateForm />,
  // ]



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <React.Fragment>

            <StatementForm step={activeStep} formValues={formValues} handleTextFieldChange={handleTextFieldChange} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* {children[activeStep]} */}

            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
