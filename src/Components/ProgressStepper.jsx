import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

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
export default function ProgressStepper() {
  return (
    <Box sx={{ width: "100%", mt: "10px" }}>
      <Stepper
        activeStep={1}
        alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
