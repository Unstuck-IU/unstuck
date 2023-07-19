import React, { useState, useEffect } from "react";
import { Alert, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";
// ui elements
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import JoinTopicDialog from "../components/JoinTopicDialog";
import TopicHeader from "../components/TopicHeader";
import AddStuckDialog from "../components/AddStuckDialog";
import StuckCard from "./stuckCard";
import StepHeader from "./StepHeader";

export function StatementForm(props) {
  const { userDetails } = useAuth();
  const [statementText, setStatementText] = useState("");
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const SexiCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "10px",
    width: "600px",
    height: "300px",
    borderRadius: "12px 12px 12px 12px",
    justifyContent: "center",
  }));

  const SexiTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 500px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? colors.black[100] : colors.black[100]};
    background: ${theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800]};
    border: 1px solid ${theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]};
    margin: 10px;
    &:hover {
      border-color: ${colors.blueAccent[400]};
    }

    &:focus {
      border-color: ${colors.blueAccent[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.blueAccent[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <>
      {/* HANDLETOPIC DIALOG   */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
        {/* {activeStep <= 1 && ( */}

        {/* JOIN TOPIC   */}
        {/* {fetchError && <p>{fetchError}</p>} */}
        <StepHeader activeStep={props.activeStep} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="end"
        mt="2rem"
        alignItems="end">
        {props.isAlertShowing && (
          <Alert
            sx={{ mr: "10px" }}
            severity={props.alertSeverity}
            onClose={() => {
              setIsAlertShowing(false);
            }}>
            {props.message}
          </Alert>
        )}
        {props.activeStep === 0 && (
          <AddStuckDialog
            activeTopic={props.activeTopic}
            handleFetchStucks={props.handleFetchStucks}
          />
        )}
      </Box>
      {/* )} */}

      <Box m={"5px"}>
        <Container
          component="main"
          maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box
              // component="form"
              noValidate
              sx={{ mt: 1 }}>
              <form>
                {/* STATEMENT FORM SECTION */}
                <SexiCard sx={{ display: props.activeStep === 2 || props.activeStep === 6 ? "" : "none" }}>
                  <FormGroup sx={{ objectFit: "contain" }}>
                    <Typography variant="h5">State the Problem in Your Own Words:</Typography>
                    {props.activeStep === 2 ? <Typography variant="subtitle1">This is [explanation text]</Typography> : ""}
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}
                        justifyContent="center"
                        alignItems="center">
                        <SexiTextarea
                          name="statement"
                          fullWidth
                          multiline
                          minRows={5}
                          sx={{ mt: 2 }}
                          id="statement"
                          label="Statement"
                          value={props.formValues.statement}
                          onChange={props.handleTextFieldChange}
                          autoFocus
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="flex-end"></Grid>
                  </FormGroup>
                </SexiCard>

                {/* EXPAND FORM SECTION */}
                <SexiCard sx={{ display: props.activeStep === 3 || props.activeStep === 6 ? "" : "none" }}>
                  <FormGroup sx={{ objectFit: "contain" }}>
                    <Typography variant="h5">Expand On Your View of the Problem:</Typography>
                    <Typography variant="subtitle1">
                      Try to add extra details that you may have thought were relevent, but maybe did not feel important enough to
                      include in your original statement
                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <SexiTextarea
                          name="expand"
                          fullWidth
                          multiline
                          minRows={5}
                          sx={{ mt: 2 }}
                          id="expand"
                          label="Expand"
                          value={props.formValues.expand}
                          onChange={props.handleTextFieldChange}
                          autoFocus
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justifyContent="flex-end"></Grid>
                  </FormGroup>
                </SexiCard>

                {/* EXAMPLE FORM SECTION */}

                <SexiCard sx={{ display: props.activeStep === 4 || props.activeStep === 6 ? "" : "none" }}>
                  <FormGroup>
                    <Typography variant="h5">Write About a Specific Example of The Problem:</Typography>
                    <Typography variant="subtitle1">
                      A real-world example of this type of problem may help you and others to make a connection with the problem,
                      but don't limit yourself if you can imagine a scenario.{" "}
                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <SexiTextarea
                          name="example"
                          fullWidth
                          multiline
                          minRows={5}
                          sx={{ mt: 2 }}
                          id="example"
                          label="Example"
                          value={props.formValues.example}
                          onChange={props.handleTextFieldChange}
                          autoFocus
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justifyContent="flex-end"></Grid>
                  </FormGroup>
                </SexiCard>

                {/* ILLUSTRATE FORM SECTION */}

                <SexiCard sx={{ display: props.activeStep === 5 || props.activeStep === 6 ? "" : "none" }}>
                  <FormGroup>
                    <Typography variant="h5">Create an Illustration of Your Problem:</Typography>
                    <Typography variant="subtitle1">
                      {" "}
                      Illustration usually implies creating a drawing, but here it means to create a mental image or demonstrate
                      with an analogy.\n If you prefer pictures, feel free to add a picture!{" "}
                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <SexiTextarea
                          name="illustrate"
                          fullWidth
                          multiline
                          minRows={5}
                          sx={{ mt: 2 }}
                          id="illustrate"
                          label="Illustrate"
                          value={props.formValues.illustrate}
                          onChange={props.handleTextFieldChange}
                          autoFocus
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justifyContent="flex-end"></Grid>
                  </FormGroup>
                </SexiCard>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Form for adding new Unstuck to the Topic */}
      {props.activeStep <= 1 && (
        // <StepOne/>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          mt="2rem">
          {/* display all submitted stucks here */}
          {props.stucks?.map((stuck, index) => (
            <StuckCard
              key={stuck.id}
              cardid={stuck.id}
              stuck={stuck}
              activeStep={props.activeStep}
              // setActiveStep={props.activeStep}
              index={index}
              // props={props}
              onClick={props.handleChosenStuck}
            />
          ))}
        </Box>
      )}
    </>
  );
}
