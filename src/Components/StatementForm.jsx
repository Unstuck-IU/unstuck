import React, { useState, useEffect } from "react";
import { Alert, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";
// ui elements
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,

  TextField,
  Typography,
} from "@mui/material";
import JoinTopicDialog from "../components/JoinTopicDialog";
import TopicHeader from "../components/TopicHeader";
import AddStuckDialog from "../components/AddStuckDialog";
import StuckCard from "../components/stuckCard";
export function StatementForm(props) {
  const [statementText, setStatementText] = useState('')


  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI


  return (
    <>
      {/* <Box
        sx={{
          height: 10,
          mt: "40px",
          display: "flex",
          flexDirection: "column",
        }}>
        <Container>

          <Typography variant="h5">
            <div className="sexi-form"></div>
          </Typography>
        </Container>
      </Box> */}

      {/* HANDLETOPIC DIALOG   */}
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center">
        {props.isAlertShowing && (
          <Alert
            sx={{ mr: "10px" }}
            severity={alertSeverity}
            onClose={() => {
              setIsAlertShowing(false);
            }}>
            {message}
          </Alert>
        )}
        <JoinTopicDialog handleJoinTopic={props.handleJoinTopic} />
      </Box>
      {/* JOIN TOPIC   */}
      {/* {fetchError && <p>{fetchError}</p>} */}
      {/* {activeStep <= 1 && ( */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="end">
        <TopicHeader
          joinCode={props.joinCode}
          userDetails={props.userDetails}
          topic={props.topic}
        />
        <AddStuckDialog topic={props.topic} />
      </Box>
      {/* )} */}

      
      <Box m={"20px"}>
        <Container
          component="main"
          maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>

            <Box
              component="form"
              noValidate

              sx={{ mt: 3 }}>
              <form>
                {/* STATEMENT FORM SECTION */}
                <FormGroup sx={{ display: props.activeStep === 2 ? "" : "none" }}>
                  <Typography variant="h4">State the Problem in Your Own Words:</Typography>
                  {/* <Typography variant="p">This is [explaination text]</Typography> */}
                  <Grid
                    container
                    spacing={2}>
                    <Grid
                      item
                      xs={12}>
                      <TextField
                        name="statement"
                        fullWidth
                        multiline
                        minRows={5}
                        sx={{ mt: 10 }}
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

                {/* EXPAND FORM SECTION */}
                <FormGroup sx={{ display: props.activeStep === 3 ? "" : "none" }}>
                  <Typography variant="h4">Expand On Your View of the Problem:</Typography>
                  {/* <Typography variant="p">Try to add extra details that you may have thought were relevent, but maybe did not feel important enough to include in your original statement</Typography> */}
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
                        minRows={5}
                        sx={{ mt: 10 }}
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
                {/* EXAMPLE FORM SECTION */}
                <FormGroup sx={{ display: props.activeStep === 4 ? "" : "none" }}>
                  <Typography variant="h4">Write About a Specific Example of The Problem:</Typography>
                  {/* <Typography variant="p">A real-world example of this type of problem may help you and others to make a connection with the problem, but don't limit yourself if you can imagine a secenario. </Typography> */}
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
                        minRows={5}
                        sx={{ mt: 10 }}
                        id="example"
                        label="Example"
                        value={props.formValues.example}
                        onChange={props.handleTextFieldChange}
                        autoFocus
                      />
                    </Grid>

                  </Grid>
                  {/* <Button

                                fullWidth
                                variant="contained"
                                onClick={handleSave}
                                sx={{ mt: 3, mb: 2 }}>
                                Save
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleLoad}
                                sx={{ mt: 3, mb: 2 }}>
                                Load
                            </Button> */}
                  <Grid
                    container
                    justifyContent="flex-end"></Grid>
                </FormGroup>

                {/* ILLUSTRATE FORM SECTION */}
                <FormGroup sx={{ display: props.activeStep === 5 ? "" : "none" }}>
                  <Typography variant="h4">Create an Illustration of Your Problem:</Typography>
                  {/* <Typography variant="p"> Illustration usually implies creating a drawing, but here it means to create a mental image or demonstrate with an analogy.\n If you prefer pictures, feel free to add a picture! </Typography> */}
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
                        minRows={5}
                        sx={{ mt: 10 }}
                        id="illustrate"
                        label="Illustrate"
                        value={props.formValues.illustrate}
                        onChange={props.handleTextFieldChange}
                        autoFocus
                      />

                    </Grid>

                  </Grid>
                  {/* <Button

                    fullWidth
                    variant="contained"
                    onClick={printFormValues}
                    sx={{ mt: 3, mb: 2 }}>
                    Save
                  </Button>
                  
          <Button
              fullWidth
              variant="contained"
              onClick={handleLoad}
              sx={{ mt: 3, mb: 2 }}>
              Load
          </Button> */}
                  <Grid
                    container
                    justifyContent="flex-end"></Grid>
                </FormGroup>
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
              stuck={stuck}
              activeStep={props.activeStep}
              // setActiveStep={props.activeStep}
              index={index}
            />
          ))}
        </Box>
      )}
    </>
  )
}
