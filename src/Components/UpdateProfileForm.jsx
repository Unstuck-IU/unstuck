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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [open, setOpen] = useState(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Button
        variant="outlined"
        onClick={handleClickOpen}></Button>
      <Button
        variant="outlined"
        onClick={handleClickOpen}>
        Update Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Update your profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your information.</DialogContentText>
          <TextField
            autoComplete="given-name"
            name="firstName"
            fullWidth
            id="firstName"
            label="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName || ""}
            autoFocus
          />
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName || ""}
          />

          <TextField
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName || ""}
          />
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          <FormControl>
            <FormLabel>User Type</FormLabel>
            <RadioGroup
              defaultValue="student"
              value={userType ? userType : "student"}
              onChange={handleUserTypeChange}
              name="user-type-selection-group"                  
              sx={{ my: 1 }}>
              <Radio
                value="student"
                label="Student"
                onChange={(e) => setUserType(e.target.value)}
              />
              <Radio
                value="sherpa"
                label="Sherpa"
                onChange={(e) => setUserType(e.target.value)}
              />
            </RadioGroup>
            <FormHelperText>Please don't select Sherpa if you're not. Honor Code.</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateUserDetails}>Submit</Button>
        </DialogActions>
      </Dialog>




      {userDetails && (
        <Box
          sx={{
            height: 300,
            mt: "40px",
            display: "flex",
            flexDirection: "column",
          }}>
          <Container>
            <Typography variant="h2">{userDetails.first_name}</Typography>
            {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
            <Typography variant="h5">
              <div className="user-details">{userDetails.last_name}</div>
            </Typography>
          </Container>
        </Box>
      )}
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
              Update your Profile Details
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
                  xs={12}>
                  <TextField
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
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                      value={userType ? userType : "student"}
                      onChange={handleUserTypeChange}
                      name="user-type-selection-group"
                      sx={{ my: 1 }}>
                      <Radio
                        value="student"
                        label="Student"
                        onChange={(e) => setUserType(e.target.value)}
                      />
                      <Radio
                        value="sherpa"
                        label="Sherpa"
                        onChange={(e) => setUserType(e.target.value)}
                      />
                    </RadioGroup>
                    <FormHelperText>Please don't select Sherpa if you're not. Honor Code.</FormHelperText>
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
              <Grid
                container
                justifyContent="flex-end"></Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
