import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
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


export function StatementForm(props) {
  // const [formValues, setFormValues] = useState({ statement: "", expand: "", explain: "", illustrate: "" });

  // const printFormValues = () => {
  //   console.log("print form values \n\n", ...formValues)
  // }
  // const handleTextFieldChange = (
  //   event
  // ) => {
  //   const { name, value } = event.target;
  //   console.log("Type of form values from inside handleText \n", typeof (name), typeof (value), typeof (formValues), console.log({ formValues }))
  //   setFormValues({
  //     ...formValues,
  //     [name]: value
  //   }

  //   )
  //   console.log("value\n", value, "name\n", name)
  //   console.log("Type of form values\n", typeof (name), typeof (value), typeof (formValues), [name], [value], "value", value, "name", name)
  // }

  // console.log("FORMTYPE values", formValues, Object.keys(formValues))


  const [statementText, setStatementText] = useState('')
  const handleSave = () => {
    localStorage.setItem("statementText", statementText);
  }
  const handleLoad = () => {
    setStatementText(localStorage.getItem("statementText"));
  }
  return (
    <>
      <Box
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
      </Box>

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
                <FormGroup sx={{ display: props.step === 0 ? "" : "none" }}>
                  <Typography variant="h4">Restate the problem in your own words:</Typography>
                  {/* <Typography variant="p">This is [explaination text]</Typography> */}
                  <Grid
                    container
                    spacing={1}>
                    <Grid
                      item
                      xs={12}>
                      <TextField
                        name="statement"
                        fullWidth
                        multiline
                        minRows={5}
                        id="statement"
                        label="Statement"
                        value={props.formValues.statement}
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


                <FormGroup sx={{ display: props.step === 1 ? "" : "none" }}>
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
                        id="expand"
                        label="Expand"
                        value={props.formValues.expand}
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

                <FormGroup sx={{ display: props.step === 2 ? "" : "none" }}>
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


                <FormGroup sx={{ display: props.step === 3 ? "" : "none" }}>
                  <Typography variant="h4">Create an Illustration of Your Problem:</Typography>
                  {/* <Typography variant="p"> Illustration usually implies creating a drawing, but here it means to create a mental image or demonstrate with an analogy. If you prefer pictures, feel free to add a picture! </Typography> */}
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
    </>
  )
}

// export function ExampleForm(props) {
//   const [formValues, setFormValues] = useState("");

//   const handleTextFieldChange = (
//     event
//   ) => {
//     const { name, value } = event.target;
//     setFormValues(
//       ...formValues,
//       [name]

//     )
//     console.log("form values", value, "name from form", name)
//   }

//   const [exampleText, setExampleText] = useState('')
//   const handleSave = () => {
//     localStorage.setItem("exampleText", exampleText);
//   }
//   const handleLoad = () => {
//     setExampleText(localStorage.getItem("exampleText"));
//   }
//   return (
//     <>
//       <Box
//         sx={{
//           height: 10,
//           mt: "40px",
//           display: "flex",
//           flexDirection: "column",
//         }}>
//         <Container>
//           <Typography variant="h2">Expand On Your View of the Problem:</Typography>
//           {/* <Typography variant="p">Try to add extra details that you may have thought were relevent, but maybe did not feel important enough to include in your original statement</Typography> */}
//           <Typography variant="h5">
//             <div className="sexi-form"></div>
//           </Typography>
//         </Container>
//       </Box>

//       <Box m={"20px"}>
//         <Container
//           component="main"
//           maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}>

//             <Box
//               component="form"
//               noValidate

//               sx={{ mt: 3 }}>
//               <form>
//                 <FormGroup sx={{ display: props.step === 1 ? "" : "none" }}>
//                   <Grid
//                     container
//                     spacing={1}>
//                     <Grid
//                       item
//                       xs={12}>
//                       <TextField
//                         name="example"
//                         fullWidth
//                         multiline
//                         minRows={5}
//                         id="example"
//                         label="Example"
//                         value={formValues.example}
//                         onChange={handleTextFieldChange}
//                         autoFocus
//                       />
//                     </Grid>

//                   </Grid>
//                   {/* <Button

//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleSave}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Save
//                             </Button>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleLoad}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Load
//                             </Button> */}
//                   <Grid
//                     container
//                     justifyContent="flex-end"></Grid>
//                 </FormGroup>
//               </form>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   )
// }

// export function ExpandForm() {
//     const [expandText, setExpandText] = useState('')
//     const handleSave = () => {
//         localStorage.setItem("expandText", expandText);
//     }
//     const handleLoad = () => {
//         setExpandText(localStorage.getItem("expandText"));
//     }
//     return (
//         <>
//             <Box
//                 sx={{
//                     height: 10,
//                     mt: "40px",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}>
//                 <Container>
//                     <Typography variant="h2">Expand On Your View of the Problem:</Typography>
//                     {/* <Typography variant="p">Try to add extra details that you may have thought were relevent, but maybe did not feel important enough to include in your original statement</Typography> */}
//                     <Typography variant="h5">
//                         <div className="sexi-form"></div>
//                     </Typography>
//                 </Container>
//             </Box>

//             <Box m={"20px"}>
//                 <Container
//                     component="main"
//                     maxWidth="xs">
//                     <CssBaseline />
//                     <Box
//                         sx={{
//                             marginTop: 8,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}>

//                         <Box
//                             component="form"
//                             noValidate

//                             sx={{ mt: 3 }}>
//                             <Grid
//                                 container
//                                 spacing={1}>
//                                 <Grid
//                                     item
//                                     xs={12}>
//                                     <TextField
//                                         name="expand"
//                                         fullWidth
//                                         multiline
//                                         minRows={5}
//                                         id="expand"
//                                         label="Expand"
//                                         value={expandText}
//                                         onChange={e => setExpandText(e.target.value)}
//                                         autoFocus
//                                     />
//                                 </Grid>

//                             </Grid>
//                             <Button

//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleSave}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Save
//                             </Button>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleLoad}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Load
//                             </Button>
//                             <Grid
//                                 container
//                                 justifyContent="flex-end"></Grid>
//                         </Box>
//                     </Box>
//                 </Container>
//             </Box>
//         </>
//     )
// }

// export function ExampleForm() {
//     const [exampleText, setExampleText] = useState('')
//     const handleSave = () => {
//         localStorage.setItem("exampleText", exampleText);
//     }
//     const handleLoad = () => {
//         setExampleText(localStorage.getItem("exampleText"));
//     }
//     return (
//         <>
//             <Box
//                 sx={{
//                     height: 10,
//                     mt: "40px",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}>
//                 <Container>
//                     <Typography variant="h2">Write About a Specific Example of The Problem:</Typography>
//                     {/* <Typography variant="p">A real-world example of this type of problem may help you and others to make a connection with the problem, but don't limit yourself if you can imagine a secenario. </Typography> */}
//                     <Typography variant="h5">
//                         <div className="sexi-form"></div>
//                     </Typography>
//                 </Container>
//             </Box>

//             <Box m={"20px"}>
//                 <Container
//                     component="main"
//                     maxWidth="xs">
//                     <CssBaseline />
//                     <Box
//                         sx={{
//                             marginTop: 8,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}>

//                         <Box
//                             component="form"
//                             noValidate

//                             sx={{ mt: 3 }}>
//                             <Grid
//                                 container
//                                 spacing={1}>
//                                 <Grid
//                                     item
//                                     xs={12}>
//                                     <TextField
//                                         name="example"
//                                         fullWidth
//                                         multiline
//                                         minRows={5}
//                                         id="example"
//                                         label="Example"
//                                         value={exampleText}
//                                         onChange={e => setExampleText(e.target.value)}
//                                         autoFocus
//                                     />
//                                 </Grid>

//                             </Grid>
//                             <Button

//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleSave}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Save
//                             </Button>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleLoad}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Load
//                             </Button>
//                             <Grid
//                                 container
//                                 justifyContent="flex-end"></Grid>
//                         </Box>
//                     </Box>
//                 </Container>
//             </Box>
//         </>
//     )
// }

// export function IllustrateForm() {
//     const [illustrateText, setIllustrateText] = useState('')
//     const handleSave = () => {
//         localStorage.setItem("illustrateText", illustrateText);
//     }
//     const handleLoad = () => {
//         setIllustrateText(localStorage.getItem("illustrateText"));
//     }
//     return (
//         <>
//             <Box
//                 sx={{
//                     height: 10,
//                     mt: "40px",
//                     display: "flex",
//                     flexDirection: "column",
//                 }}>
//                 <Container>
//                     <Typography variant="h2">Create an Illustration of Your Problem:</Typography>
//                     {/* <Typography variant="p"> Illustration usually implies creating a drawing, but here it means to create a mental image or demonstrate with an analogy. If you prefer pictures, feel free to add a picture! </Typography> */}
//                     <Typography variant="h5">
//                         <div className="sexi-form"></div>
//                     </Typography>
//                 </Container>
//             </Box>

//             <Box m={"20px"}>
//                 <Container
//                     component="main"
//                     maxWidth="xs">
//                     <CssBaseline />
//                     <Box
//                         sx={{
//                             marginTop: 8,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}>

//                         <Box
//                             component="form"
//                             noValidate

//                             sx={{ mt: 3 }}>
//                             <Grid
//                                 container
//                                 spacing={1}>
//                                 <Grid
//                                     item
//                                     xs={12}>
//                                     <TextField
//                                         name="illustrate"
//                                         fullWidth
//                                         multiline
//                                         minRows={5}
//                                         id="illustrate"
//                                         label="Illustrate"
//                                         value={illustrateText}
//                                         onChange={e => setIllustrateText(e.target.value)}
//                                         autoFocus
//                                     />
//                                 </Grid>

//                             </Grid>
//                             <Button

//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleSave}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Save
//                             </Button>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 onClick={handleLoad}
//                                 sx={{ mt: 3, mb: 2 }}>
//                                 Load
//                             </Button>
//                             <Grid
//                                 container
//                                 justifyContent="flex-end"></Grid>
//                         </Box>
//                     </Box>
//                 </Container>
//             </Box>
//         </>
//     )
// }