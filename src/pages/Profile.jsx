import { Avatar, Box, Button, Container, IconButton, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// auth
import { useAuth, supabase } from "../Providers/AuthProvider";
import UpdateProfileForm from "../Components/UpdateProfileForm";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  // auth.userLocal needs to give us more details than just user_id, so we can update page details like name, avatar, etc.

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("student");
  const [displayName, setDisplayName] = useState("");
  const [fetchError, setFetchError] = useState("");
  // const [open, setOpen] = useState(false);
  const { userDetails } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      gridColumn="span 12"
      justifyContent="space-between"
      marginLeft="10px"
      marginRight="10px"
      alignItems="center">
      <Header
        title="Profile"
        subtitle="Welcome to your Unstuck Profile"
      />
      {userDetails?.completed_signup === false && (
        <Box sx={{ flexGrow: 1, m: 4, textAlign: "left" }}>
          <Grid>
            <Grid
              item
              xs={6}
              md={8}>
              <Item>
                <Typography
                  variant="h4"
                  mb="10px">
                  <div className="user-details">It looks like your first time signing in!</div>
                </Typography>
                <Typography variant="h5">
                  <div className="user-details">
                    Thanks for joining Unstuck, you're going to have a great time. First thing you need to do is to update your
                    profile so people know who you are around here!
                  </div>
                </Typography>
              </Item>
            </Grid>
          </Grid>
          <UpdateProfileForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            displayName={displayName}
            setDisplayName={setDisplayName}
          />
        </Box>
      )}
      {userDetails?.completed_signup === true && (
        <Box sx={{ flexGrow: 1, m: 4, textAlign: "center" }}>
          <Grid>
            <Grid
              item
              xs={6}
              md={8}>
              <Item>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <AccountCircleIcon />
                </Avatar>

                <Typography variant="h4">
                  {userDetails?.first_name} {userDetails?.last_name}
                </Typography>
                <Typography variant="h5">
                  <div className="user-details">{userDetails?.display_name}</div>
                </Typography>
                <UpdateProfileForm
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  displayName={displayName}
                  setDisplayName={setDisplayName}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, m: 4, justifyContent: "Center" }}>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={6}
            md={8}>
            <Item>
              <Typography variant="h4">Placeholder</Typography>
              <ul>
                Placeholder
                <li>Placeholder 1</li>
                <li>Placeholder 2</li>
                <li>Placeholder 3</li>
              </ul>
            </Item>
          </Grid>

          <Grid
            item
            xs={6}
            md={4}>
            <Item>
              <Typography variant="h4">Badges</Typography>
              <ul>
                Placeholder
                <li>Badge 1</li>
                <li>Badge 2</li>
                <li>Badge 3</li>
              </ul>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
