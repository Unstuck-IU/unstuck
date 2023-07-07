import { Box, Button, Container, IconButton, Typography, useTheme } from "@mui/material";
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

  // ui elements
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
    // <Box m="50px">
    //   {/* HEADER */}
    //   <Box
    //     display="flex"
    //     justifyContent="space-between"
    //     alignItems="center">
    //     <Header
    //       title="Profile"
    //       subtitle="Welcome to your Unstuck Profile"
    //     />

    //   </Box>
    //   <Box
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center">
    //     <UpdateProfileForm />
    //   </Box>

    //   {/* GRID & CHARTS */}
    //   <Box
    //     display="grid"
    //     gridTemplateColumns="repeat(12, 1fr)"
    //     grid-template-rows="repeat(3, 1fr)"
    //     grid-row-gap="2rem" /* Will be used instead by browsers that do not support `row-gap` */
    //     row-gap="2rem"
    //     // gridAutoRows="200px"
    //     // gap="20px"
    //   >
    //     {/* <Paper> */}
    //     {userDetails && (
    //       <Box
    //         gridColumn="span 12"
    //         backgroundColor={colors.primary[400]}
    //         display="flex"
    //         alignItems="center"
    //         justifyContent="center">
    //         <Container>
    //           <Typography variant="h2">
    //             {userDetails.first_name} {userDetails.last_name}
    //           </Typography>
    //           {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
    //           <Typography variant="h3">
    //             <div className="user-details">{userDetails.display_name}</div>
    //           </Typography>
    //           <Typography variant="h2">Avatar
    //           </Typography>
    //         </Container>
    //       </Box>
    //     )}
    //     {/* </Paper> */}
    //   </Box>
    //   <Box
    //     gridColumn="span 3"
    //     backgroundColor={colors.primary[400]}
    //     display="flex"
    //     alignItems="center"
    //     justifyContent="center">
    //     <Container>
    //       <Typography variant="h2">Badges and achievements can go here</Typography>
    //     </Container>
    //   </Box>
    //   <Box
    //     gridColumn="span 3"
    //     backgroundColor={colors.primary[400]}
    //     display="flex"
    //     alignItems="center"
    //     justifyContent="center">
    //     <Container>
    //       <Typography variant="h2">My Stucks and Unstucks</Typography>
    //     </Container>
    //   </Box>
    //   {/* <Box
    //     gridColumn="span 3"
    //     backgroundColor={colors.primary[400]}
    //     display="flex"
    //     alignItems="center"
    //     justifyContent="center">
    //     <StatBox
    //       title="1,325,134"
    //       subtitle="Traffic Received"
    //       progress="0.80"
    //       increase="+43%"
    //       icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
    //     />
    //   </Box> */}
    //   {/*
    //   <Box
    //     gridColumn="span 8"
    //     gridRow="span 2"
    //     backgroundColor={colors.primary[400]}>
    //     <Box
    //       mt="25px"
    //       p="0 30px"
    //       display="flex "
    //       justifyContent="space-between"
    //       alignItems="center">
    //       <Box>
    //         <Typography
    //           variant="h5"
    //           fontWeight="600"
    //           color={colors.grey[100]}>
    //           Revenue Generated
    //         </Typography>
    //         <Typography
    //           variant="h3"
    //           fontWeight="bold"
    //           color={colors.greenAccent[500]}>
    //           $59,342.32
    //         </Typography>
    //       </Box>
    //       <Box>
    //         <IconButton>
    //           <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
    //         </IconButton>
    //       </Box>
    //     </Box>
    //     <Box
    //       height="250px"
    //       m="-20px 0 0 0">
    //       <LineChart isDashboard={true} />
    //     </Box>
    //   </Box>
    //   <Box
    //     gridColumn="span 4"
    //     gridRow="span 2"
    //     backgroundColor={colors.primary[400]}
    //     overflow="auto">
    //     <Box
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       borderBottom={`4px solid ${colors.primary[500]}`}
    //       colors={colors.grey[100]}
    //       p="15px">
    //       <Typography
    //         color={colors.grey[100]}
    //         variant="h5"
    //         fontWeight="600">
    //         Recent Transactions
    //       </Typography>
    //     </Box>
    //     {mockTransactions.map((transaction, i) => (
    //       <Box
    //         key={`${transaction.txId}-${i}`}
    //         display="flex"
    //         justifyContent="space-between"
    //         alignItems="center"
    //         borderBottom={`4px solid ${colors.primary[500]}`}
    //         p="15px">
    //         <Box>
    //           <Typography
    //             color={colors.greenAccent[500]}
    //             variant="h5"
    //             fontWeight="600">
    //             {transaction.txId}
    //           </Typography>
    //           <Typography color={colors.grey[100]}>{transaction.user}</Typography>
    //         </Box>
    //         <Box color={colors.grey[100]}>{transaction.date}</Box>
    //         <Box
    //           backgroundColor={colors.greenAccent[500]}
    //           p="5px 10px"
    //           borderRadius="4px">
    //           ${transaction.cost}
    //         </Box>
    //       </Box>
    //     ))}
    //   </Box>

    //   <Box
    //     gridColumn="span 4"
    //     gridRow="span 2"
    //     backgroundColor={colors.primary[400]}
    //     p="30px">
    //     <Typography
    //       variant="h5"
    //       fontWeight="600">
    //       Campaign
    //     </Typography>
    //     <Box
    //       display="flex"
    //       flexDirection="column"
    //       alignItems="center"
    //       mt="25px">
    //       <ProgressCircle size="125" />
    //       <Typography
    //         variant="h5"
    //         color={colors.greenAccent[500]}
    //         sx={{ mt: "15px" }}>
    //         $48,352 revenue generated
    //       </Typography>
    //       <Typography>Includes extra misc expenditures and costs</Typography>
    //     </Box>
    //   </Box>
    //   <Box
    //     gridColumn="span 4"
    //     gridRow="span 2"
    //     backgroundColor={colors.primary[400]}>
    //     <Typography
    //       variant="h5"
    //       fontWeight="600"
    //       sx={{ padding: "30px 30px 0 30px" }}>
    //       Sales Quantity
    //     </Typography>
    //     <Box
    //       height="250px"
    //       mt="-20px">
    //       <BarChart isDashboard={true} />
    //     </Box>
    //   </Box>
    //   <Box
    //     gridColumn="span 4"
    //     gridRow="span 2"
    //     backgroundColor={colors.primary[400]}
    //     padding="30px">
    //     <Typography
    //       variant="h5"
    //       fontWeight="600"
    //       sx={{ marginBottom: "15px" }}>
    //       Geography Based Traffic
    //     </Typography>
    //   </Box>
    // </Box> */}

    // </Box>
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
        <Box sx={{ flexGrow: 1, m: 4 }}>
          <Grid>
            <Grid
              item
              xs={6}
              md={8}>
              <Item>
                <Container>
                  <Typography variant="h4">
                    {userDetails.first_name} {userDetails.last_name}
                  </Typography>
                  <Typography variant="h5">
                    <div className="user-details">{userDetails.display_name}</div>
                  </Typography>
                  <Typography variant="h5">Avatar</Typography>
                </Container>
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
        <UpdateProfileForm />
      </Box>

      <Box sx={{ flexGrow: 1, m: 4 }}>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={6}
            md={8}>
            <Item>
              <Container>
                <Typography variant="h4">Stucks and Unstucks</Typography>
                <ul>
                  Placeholder
                  <li>Stuck 1</li>
                  <li>Stuck 2</li>
                  <li>Stuck 3</li>
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
  );
};

export default Profile;
