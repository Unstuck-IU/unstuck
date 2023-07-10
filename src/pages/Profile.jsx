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
  padding: theme.spacing(1),
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
  const [userDetails, setUserDetails] = useState(null);
  // const [open, setOpen] = useState(false);
  const auth = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // fetching the currently logged in user_details, and update them if the userId changes(like a new user signs in)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await auth.userLocal();
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
        {userDetails && (
          <Box sx={{ flexGrow: 1, m: 4, textAlign: "center" }}>
            <Grid>
              <Grid
                item
                xs={6}
                md={8}>
                <Item>
                  <Container>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <AccountCircleIcon />
                    </Avatar>

                    <Typography variant="h4">
                      {userDetails.first_name} {userDetails.last_name}
                    </Typography>
                    <Typography variant="h5">
                      <div className="user-details">{userDetails.display_name}</div>
                    </Typography>
                  </Container>
                  <Container>
                    <UpdateProfileForm
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      displayName={displayName}
                      setDisplayName={setDisplayName}
                    />
                  </Container>
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
                <Container>
                  <Typography variant="h4">Placeholder</Typography>
                  <ul>
                    Placeholder
                    <li>Placeholder 1</li>
                    <li>Placeholder 2</li>
                    <li>Placeholder 3</li>
                  </ul>
                </Container>
              </Item>
            </Grid>

            <Grid
              item
              xs={6}
              md={4}>
              <Item>
                <Container>
                  <Typography variant="h4">Badges</Typography>
                  <ul>
                    Placeholder
                    <li>Badge 1</li>
                    <li>Badge 2</li>
                    <li>Badge 3</li>
                  </ul>
                </Container>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
