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
import StuckCard from "../components/StuckCard";
import StepHeader from "./StepHeader";
import FeedbackComment from "./FeedbackComment";

export function StatementForm(props) {
  const { userDetails } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("Props from statement form", props)

  // TODO: Finish testing why the Styled card and textarea caused issues with text entry (reversed display/entry of text)

  // const SexiCard = styled(Card)(({ theme, ...props }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.primary,
  //   background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
  //   display: "flex",
  //   flexDirection: "column",
  //   flexWrap: "wrap",
  //   fontSize: "14px",
  //   fontWeight: "bold",
  //   margin: "10px",
  //   width: "600px",
  //   height: "300px",
  //   borderRadius: "12px 12px 12px 12px",
  //   justifyContent: "center",
  // }));



  // const SexiTextField = styled(TextareaAutosize)(
  //   ({ theme }) => `
  //   width: 500px;
  //   font-size: 0.875rem;
  //   font-weight: 400;
  //   line-height: 1.5;
  //   padding: 12px;
  //   border-radius: 12px 12px 0 12px;
  //   color: ${theme.palette.mode === "dark" ? colors.black[100] : colors.black[100]};
  //   background: ${theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800]};
  //   border: 1px solid ${theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]};
  //   box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]};
  //   margin: 10px;
  //   &:hover {
  //     border-color: ${colors.blueAccent[400]};
  //   }

  //   &:focus {
  //     border-color: ${colors.blueAccent[400]};
  //     box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.blueAccent[200]};
  //   }

  //   // firefox
  //   &:focus-visible {
  //     outline: 0;
  //   }
  // `
  // );

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
        {/* {props.isAlertShowing && (
          <Alert
            sx={{ mr: "10px" }}
            severity={props.alertSeverity}
            onClose={() => {
              setIsAlertShowing(false);
            }}>
            {props.message}
          </Alert>
        )} */}
        {props.activeStep === 0 && (
          <AddStuckDialog
            activeTopic={props.activeTopic}
            handleFetchStucks={props.handleFetchStucks}
          />
        )}
      </Box>
      {/* )} */}
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
              stuck={stuck}
              activeStep={props.activeStep}
              // setActiveStep={props.activeStep}
              index={index}
            // props={props}
            // handleChosenStuck={props.handleChosenStuck}
            />
          ))}
        </Box>
      )}
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
                <Card sx={{
                  display: props.activeStep === 2 || props.activeStep === 6 ? "" : "none",
                  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  ...theme.typography.body2,
                  // padding: theme.spacing(1),
                  textAlign: "center",
                  color: theme.palette.text.primary,
                  background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                  // display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "10px",
                  width: "600px",
                  height: "300px",
                  borderRadius: "12px 12px 12px 12px",
                  justifyContent: "center",
                }}>



                  <FormGroup sx={{ objectFit: "contain" }}>
                    <Typography variant="h5"></Typography>
                    {props.activeStep === 2 ? <Typography variant="subtitle1"></Typography> : ""}
                    <Grid
                      container
                      // spacing={1}
                      sx={{ objectFit: "contain" }}>
                      <Grid
                        item
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ objectFit: "contain" }}
                      >
                        <TextField
                          sx={{
                            color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
                            background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                            border: `1px solid theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]`,
                            boxShadow: `inset 1px 1px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]}`,
                            width: "560px",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            // lineHeight: "1.5",
                            height: "250px",
                            // padding: "12px",
                            borderRadius: "12px 12px 0 12px",
                            margin: "20px"
                          }}
                          name="statement"
                          fullWidth
                          multiline
                          minRows={11}
                          className="sexiform-textfield"
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
                </Card>

                {/* EXPAND FORM SECTION */}
                <Card sx={{
                  display: props.activeStep === 3 || props.activeStep === 6 ? "" : "none",
                  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  ...theme.typography.body2,
                  padding: theme.spacing(1),
                  textAlign: "center",
                  color: theme.palette.text.primary,
                  background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                  // display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "10px",
                  width: "600px",
                  height: "300px",
                  borderRadius: "12px 12px 12px 12px",
                  justifyContent: "center",

                }}>
                  <FormGroup sx={{ objectFit: "contain" }}>
                    <Typography variant="h5"></Typography>
                    <Typography variant="subtitle1">

                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <TextField
                          name="expand"
                          fullWidth
                          multiline
                          minRows={11}
                          sx={{
                            color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
                            background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                            border: `1px solid theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]`,
                            boxShadow: `inset 1px 1px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]}`,
                            width: "560px",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            // lineHeight: "1.5",
                            height: "250px",
                            // padding: "12px",
                            borderRadius: "12px 12px 0 12px",
                            margin: "20px"
                          }}
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
                </Card>

                {/* EXAMPLE FORM SECTION */}

                <Card sx={{
                  display: props.activeStep === 4 || props.activeStep === 6 ? "" : "none",
                  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  ...theme.typography.body2,
                  padding: theme.spacing(1),
                  textAlign: "center",
                  color: theme.palette.text.primary,
                  background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                  // display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "10px",
                  width: "600px",
                  height: "300px",
                  borderRadius: "12px 12px 12px 12px",
                  justifyContent: "center",
                }}>
                  <FormGroup>
                    <Typography variant="h5"></Typography>
                    <Typography variant="subtitle1">
                      {" "}
                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <TextField
                          name="example"
                          fullWidth
                          multiline
                          minRows={11}
                          sx={{
                            color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
                            background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                            border: `1px solid theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]`,
                            boxShadow: `inset 1px 1px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]}`,
                            width: "560px",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            // lineHeight: "1.5",
                            height: "250px",
                            // padding: "12px",
                            borderRadius: "12px 12px 0 12px",
                            margin: "20px"
                          }}
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
                </Card>

                {/* ILLUSTRATE FORM SECTION */}

                <Card sx={{
                  display: props.activeStep === 5 || props.activeStep === 6 ? "" : "none",
                  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  ...theme.typography.body2,
                  padding: "5px", // theme.spacing(1),
                  textAlign: "center",
                  color: theme.palette.text.primary,
                  background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                  // display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "10px",
                  width: "600px",
                  height: "300px",
                  borderRadius: "12px 12px 12px 12px",
                  justifyContent: "center",
                }}>
                  <FormGroup>
                    <Typography variant="h5"></Typography>
                    <Typography variant="subtitle1">
                      {" "}
                    </Typography>
                    <Grid
                      container
                      spacing={1}>
                      <Grid
                        item
                        xs={12}>
                        <TextField
                          name="illustrate"
                          fullWidth
                          multiline
                          minRows={11}
                          sx={{
                            color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
                            background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
                            border: `1px solid theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]`,
                            boxShadow: `inset 1px 1px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]}`,
                            width: "560px",
                            fontSize: "0.875rem",
                            fontWeight: "400",
                            // lineHeight: "1.5",
                            height: "250px",
                            // padding: "12px",
                            borderRadius: "12px 12px 0 12px",
                            margin: "20px"
                          }}
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
                </Card>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>

      {props.activeStep === 7 && (
        <Box>
          <FeedbackComment />
        </Box>
      )}
    </>
  );
}
