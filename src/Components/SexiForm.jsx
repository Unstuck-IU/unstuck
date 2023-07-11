import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";
// ui elements
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Copyright } from "@mui/icons-material";



function SexiForm() {
  
  
    return (
        <>
        <Box
        sx={{
          height: 300,
          mt: "40px",
          display: "flex",
          flexDirection: "column",
        }}>
        <Container>
          <Typography variant="h2">Let's Make Sure We Understand The Problem</Typography>
          {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
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

          {/* <Typography
            component="h1"
            variant="h5">
            
          </Typography> */}
          <Box
            component="form"
            noValidate
            
            sx={{ mt: 3 }}>
            <Grid
              container
              spacing={1}>
              <Grid
                item
                xs={12}>
                <TextField
                  name="statement"
                  fullWidth
                  id="statement"
                  label="Statement"
                  size="medium"
                  value=''
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={12}>
                <TextField
                  fullWidth
                  id="expand"
                  label="Expand"                
                  name="expand"
                  size="medium"
                  value=''
                />
              </Grid>
              <Grid
                item
                xs={12}>
                <TextField
                  fullWidth
                  id="Example"
                  label="Example"
                  name="example"
                  size="medium"
                  value=''
                />
              </Grid>
              <Grid
                item
                xs={12}>
                <TextField
                  fullWidth
                  name="illustrate"
                  label="Illustrate"
                  type="illustrate"
                  size="medium"
                  value=''
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Next
            </Button>
            <Grid
              container
              justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  </>
  )
}

export default SexiForm