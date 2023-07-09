import React, { useState, useEffect } from "react";
import { Alert, useTheme } from "@mui/material";
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

const UpdateProfileForm = () => {
  const { userDetails, setUserDetails, user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
  const [displayName, setDisplayName] = useState("");
  const [completedSignup, setCompletedSignup] = useState(false);
  // const [avatarUrl, setAvatarUrl] = useState("")
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();
    if (user) {
      const { data, error } = await supabase
        .from("user_details")
        .update({
          first_name: firstName === "" ? userDetails?.first_name : firstName,
          last_name: lastName === "" ? userDetails?.last_name : lastName,
          user_type: userType === "" ? userDetails?.user_type : userType,
          display_name: displayName === "" ? userDetails?.display_name : displayName,
        })
        .eq("id", user.id)
        .select()
        .single();
      if (error) {
        console.log("Tried to update the user details and got an error: ", error);
        setMessage("Tried to update the user details and got an error:    " + error.message);
        setAlertSeverity("error");
        setIsAlertShowing(true);
      }
      if (data) {
        // setFirstName(data.first_name);
        // setLastName(data.last_name);
        // setUserType(data.user_type);
        // setDisplayName(data.display_name);
        //   setAvatarUrl(data.avatar_url);
        console.log("Successfully updated your profile!", data);
        setMessage("Successfully updated your profile!");
        setAlertSeverity("success");
        setIsAlertShowing(true);
        setUserDetails(data);
      }
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // fetching the currently logged in user_details, and update them if the userId changes(like a new user signs in)
  useEffect(() => {
    const updateCompletionLevel = async () => {
      console.log(userDetails);
      if (user != null) {
        if (userDetails?.first_name != null && userDetails?.last_name != null && userDetails?.display_name != null) {
          console.log("Trying to update completed_signup on user_details table");
          const { data, error } = await supabase
            .from("user_details")
            .update({ completed_signup: true })
            .eq("id", user?.id)
            .select();
          // setUserDetails(data);
          console.log("fetched user profile details of logged in user: ", data);
        }
        setMessage(null);
      }
    };
    updateCompletionLevel();
  }, []);

  return (
    <>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5">
              Update Your Profile Details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleUpdateUserDetails}
              sx={{ mt: 3 }}>
              <Grid
                container
                spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    placeholder={userDetails?.first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    autoFocus
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    placeholder={userDetails?.last_name}
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <TextField
                    fullWidth
                    id="displayName"
                    label="Display Name"
                    placeholder={userDetails?.display_name}
                    name="displayName"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}>
                  <FormControl>
                    <FormLabel>User Type</FormLabel>
                    <RadioGroup
                      defaultValue="student"
                      onChange={handleUserTypeChange}
                      name="user-type-selection-group">
                      <Radio
                        value="student"
                        label="Student"
                        onChange={(e) => setUserType(e.target.value)}
                      />
                      <Radio
                        value="sherpa"
                        label="Sherpa"
                        onChange={(e) => setUserType(e.target.value)}
                        sx={{ color: colors.greenAccent[400] }}
                      />
                    </RadioGroup>
                    <FormHelperText sx={{ color: colors.greenAccent[400] }}>
                      Please don't select Sherpa if you're not. Honor Code.
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Update Profile
              </Button>
            </Box>
            {isAlertShowing && (
              <Alert
                severity={alertSeverity}
                onClose={() => {
                  setIsAlertShowing(false);
                }}>
                {message}
              </Alert>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
