import React, { useState, useEffect } from "react";
import { Alert, useTheme } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
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

const UpdateProfileForm = (props) => {
  const { userDetails, setUserDetails, user } = useAuth();
  const [userType, setUserType] = useState("student");
  // const [avatarUrl, setAvatarUrl] = useState("")
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [open, setOpen] = useState(false);
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleUpdateUserDetails = async (e) => {
    // e.preventDefault();
    if (user) {
      const { data, error } = await supabase
        .from("user_details")
        .update({
          first_name: props.firstName === "" ? userDetails?.first_name : props.firstName,
          last_name: props.lastName === "" ? userDetails?.last_name : props.lastName,
          user_type: userType === "" ? userDetails?.user_type : userType,
          display_name: props.displayName === "" ? userDetails?.display_name : props.displayName,
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
      handleClose();
      // navigate(0);
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
        {userDetails?.completed_signup === true && (
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
              borderColor: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
            }}>
            Update Profile
          </Button>
        )}
        {userDetails?.completed_signup === false && (
          <Button
            sx={{
              color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
              borderColor: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100],
              backgroundColor: colors.greenAccent[700],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            variant="contained"
            onClick={handleClickOpen}
            borderstyle="solid">
            <NewReleasesIcon sx={{ mr: "10px" }} />
            Update Profile
          </Button>
        )}
        <Container
          component="main"
          maxWidth="xs">
          <CssBaseline />
          <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle>Update your profile</DialogTitle>
            <DialogContent>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                placeholder={userDetails?.first_name}
                onChange={(e) => props.setFirstName(e.target.value)}
                value={props.firstName}
                autoFocus
              />
              <TextField
                sx={{ my: "10px" }}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder={userDetails?.last_name}
                autoComplete="family-name"
                onChange={(e) => props.setLastName(e.target.value)}
                value={props.lastName}
              />
              <TextField
                fullWidth
                id="displayName"
                label="Display Name"
                placeholder={userDetails?.display_name}
                name="displayName"
                onChange={(e) => props.setDisplayName(e.target.value)}
                value={props.displayName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdateUserDetails}>Submit</Button>
            </DialogActions>
          </Dialog>
          {isAlertShowing && (
            <Alert
              severity={alertSeverity}
              onClose={() => {
                setIsAlertShowing(false);
              }}>
              {message}
            </Alert>
          )}
        </Container>
      </Box>
    </>
  );
};

export default UpdateProfileForm;
