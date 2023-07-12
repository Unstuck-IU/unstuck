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
import "../assets/images/2206.i518.016.S.m005.c13.mountains sunset.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Profile = ({ handlePageTitle }) => {
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

  
  useEffect(() => {
    handlePageTitle("Profile", "Welcome to your profile");
  }, []);

  // fetching the currently logged in user_details, and update them if the userId changes(like a new user signs in)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await userLocal();
      console.log(userId);
      if (userId) {
        const { data, error } = await supabase.from("user_details").select("*").eq("id", userId).single();
        if (!data || data.length === 0) {
          // const { data, error } = await supabase.from("user_details").insert({ id: userId, user_type: "student" }).select();
          console.log("there is no data to use", error);
        }
        if (error) {
          setFetchError("Could not fetch the user details");
          setUserDetails(null);
          console.log("data: ", data);
          console.log("error: ", error);
        }
        if (data) {
          if (data.first_name != null && data.last_name != null && data.display_name != null) {
            console.log("is this RUNNING?");
            const { data, error } = await supabase
              .from("user_details")
              .update({ completed_signup: true })
              .eq("id", userId)
              .select();
          }
          setUserDetails(data);
          setFetchError(null);
          console.log("fetched user profile details of logged in user: ", data);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      {/* <Box
        gridColumn="span 12"
        justifyContent="space-between"
        marginLeft="10px"
        marginRight="10px"
        alignItems="center"
        height="500px"
        sx={{
          backgroundImage: `url("../src/assets/images/2206.i518.016.S.m005.c13.mountains sunset.jpg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
        }}>
        <Header
          title="Profile"
          subtitle="Welcome to your Unstuck Profile"
        />
      </Box> */}
      <Box
        gridColumn="span 12"
        justifyContent="space-between"
        marginLeft="10px"
        marginRight="10px"
        alignItems="center">
        {userDetails && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}>
            <Box
              display="flex"
              alignItems="center"
              borderRadius="3px">
              {/* <Item> */}
              {/* <Container> */}
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AccountCircleIcon />
              </Avatar>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p={2}
                borderRadius="3px"
                rowGap="10px">
                <Typography variant="h4">
                  {userDetails.first_name} {userDetails.last_name}
                </Typography>

                <Typography variant="h5">
                  <div className="user-details">{userDetails.display_name}</div>
                </Typography>
              </Box>
            </Box>

            <Box display="flex">
              <UpdateProfileForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                displayName={displayName}
                setDisplayName={setDisplayName}
              />
            </Box>
          </Box>
        )}

        <Box sx={{ flexGrow: 1, m: 4, justifyContent: "Center" }}>
          {/* <Grid         container
            spacing={2}> */}
          {/* <Grid
            container
            spacing={1}
            justifyContent="center"
            marginLeft={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              direction="row"
              maxWidth="400"
              justifyContent="space-evenly"
              alignContent="center"> */}
          {/* <Item> */}
          <Box display="flex">
            <Typography variant="h4">My Stucks and Unstucks</Typography>
            <ul>
              Placeholder
              <li>Placeholder 1</li>
              <li>Placeholder 2</li>
              <li>Placeholder 3</li>
            </ul>
          </Box>
          {/* </Item>
            </Grid> */}

          {/* <Grid
              item
              xs={12}
              sm={12}
              md={6}>
              <Item> */}
          <Box>
            <Typography variant="h4">Badges</Typography>
            <ul>
              Placeholder
              <li>Badge 1</li>
              <li>Badge 2</li>
              <li>Badge 3</li>
            </ul>
          </Box>
          {/* </Item>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
