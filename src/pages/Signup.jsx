import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, supabase } from "../Providers/AuthProvider";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userSession, userDetails, signUp } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { data, error } = await signUp(email, password);

    if (error) {
      console.log("error when trying to create new record in user_details table.");
      alert(error.error_description || error.message);
    }
    if (data) {
      console.log("Successfully Signed Up", data);
      redirectOnLogin();
    }
    setLoading(false);
  };

  const redirectOnLogin = async () => {
    console.log("redirected after signing up");
    if (userSession != null) {
      if (userDetails?.completed_signup === true && userDetails?.user_type === "student") {
        navigate("/student-dashboard");
      } else if (userDetails.completed_signup === true && userDetails.user_type === "sherpa") {
        navigate("/sherpa-dashboard");
      } else if (userSession) {
        navigate("/profile");
      }
    }
  };

  return (
    <div>
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
            <h2>Start your adventure now</h2>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
              <Grid
                container
                spacing={2}>

                <Grid
                  item
                  xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid
                container
                justifyContent="flex-end">
                <Grid item>
                  {" "}
                  Already have an account?
                  <Link
                    sx={{ m: 1, color: "secondary.main" }}
                    href="/signin"
                    variant="inherit">
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
