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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const UpdateProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [displayName, setDisplayName] = useState("");
  const [completedSignup, setCompletedSignup] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [avatarUrl, setAvatarUrl] = useState("")
  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();
    const userId = await auth.userLocal();

    const { data, error } = await supabase
      .from("user_details")
      .update({ first_name: firstName, last_name: lastName, user_type: userType, display_name: displayName })
      .eq("id", userId)
      .select();

    console.log("trying to update the user_details. UserId: ", userId);
    if (error) {
      setFetchError("Could not update the user details");
      console.log(error);
      handleClose();
    }
    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setUserType(data.user_type);
      setDisplayName(data.display_name);
      //   setAvatarUrl(data.avatar_url);
      setFetchError(null);
      console.log("updated user profile details: ", data);
      handleClose();
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
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const userId = await auth.userLocal();
  //     console.log(userId);
  //     if (userId) {
  //       const { data, error } = await supabase.from("user_details").select("*").eq("id", userId).single();
  //       if (!data || data.length === 0) {
  //         // const { data, error } = await supabase.from("user_details").insert({ id: userId, user_type: "student" }).select();
  //         console.log("there is no data to use", error);
  //       }
  //       if (error) {
  //         setFetchError("Could not fetch the user details");
  //         setUserDetails(null);
  //         console.log("data: ", data);
  //         console.log("error: ", error);
  //       }
  //       if (data) {
  //         if (data.first_name != null && data.last_name != null && data.display_name != null) {
  //           console.log("is this RUNNING?");
  //           const { data, error } = await supabase
  //             .from("user_details")
  //             .update({ completed_signup: true })
  //             .eq("id", userId)
  //             .select();
  //         }
  //         setUserDetails(data);
  //         setFetchError(null);
  //         console.log("fetched user profile details of logged in user: ", data);
  //       }
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  return (
    <>
      {/* {userDetails && (
        <Box
          sx={{
            height: 300,
            mt: "40px",
            display: "flex",
            flexDirection: "column",
          }}>
          <Container>
            <Typography variant="h2">{userDetails.first_name}</Typography>
            <Typography variant="h5">
              <div className="user-details">{userDetails.last_name}</div>
            </Typography>
          </Container>
        </Box>
      )} */}
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
            value={firstName}
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
            value={lastName}
          />

          <TextField
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
    </>
  );
};

export default UpdateProfileForm;
