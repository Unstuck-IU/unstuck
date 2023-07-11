// mui imports
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, IconButton } from "@mui/material";
//theme imports
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
//react imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userSession, userDetails, submitError, setSubmitError, alertMessage, signInPassword } = useAuth();
  console.log("alertMessage: ", alertMessage);
  console.log("submitError: ", submitError);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    const { data, error } = signInPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (error) {
      alert(error.error_description || error.message);
      setSubmitError(true);
    } else {
      setSubmitError(false);
      redirectOnLogin();
    }
    setLoading(false);
  };

  const redirectOnLogin = async () => {
    if (userSession != null) {
      console.log("is this being called AT ALL? ", userDetails);

      if (userDetails.completed_signup === true && userDetails.user_type === "student") {
        setLoading(false);
        navigate("/student-dashboard");
      } else if (userDetails.completed_signup === true && userDetails.user_type === "sherpa") {
        setLoading(false);
        navigate("/sherpa-dashboard");
      } else if (userSession) {
        setLoading(false);
        navigate("/profile");
      }
    }
  };

  return (
    <Box m="20px">
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              // onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid
                item
                xs>
                <Link
                  sx={{ m: 1, color: colors.greenAccent[300] }}
                  href="/resetpassword"
                  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link
                  sx={{ m: 1, color: colors.greenAccent[300] }}
                  href="/signup"
                  variant="body">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {submitError && (
          <Box>
            <Collapse in={submitError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSubmitError(false);
                    }}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}>
                {alertMessage}
              </Alert>
            </Collapse>
          </Box>
        )}
      </Container>
    </Box>
  );
}
