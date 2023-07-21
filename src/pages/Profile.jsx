import { Avatar, Box, Button, Container, IconButton, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { tokens } from "../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// auth
import { useAuth, supabase } from "../Providers/AuthProvider";
import UpdateProfileForm from "../Components/UpdateProfileForm";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { sizing } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
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

  return (
    <div>
      <Box
        gridColumn="span 12"
        justifyContent="space-between"
        marginLeft="20px"
        marginRight="20px"
        alignItems="center">
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
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              p={1}
              sx={{ background: theme.palette.mode === "dark" ? colors.blueAccent[900] : colors.primary[900] }}>
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
                  alignItems="center"
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
          </Paper>
        )}

        {/* sx={{ background: theme.palette.mode === "dark" ? colors.blueAccent[950] : colors.primary[900] }} */}
        <Box
          // display="flex"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          mt="25px"
          // gridAutoRows="140px"
          gap="20px">
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[900]}
            display="flex"
            flexDirection="column"
            alignItems="top"
            justifyContent="left"
            padding="10px">
            <Typography
              variant="h4"
              sx={{ color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] }}>
              My Stucks and Unstucks
            </Typography>
          </Box>
          <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[900]}
            display="flex"
            flexDirection="column"
            alignItems="top"
            justifyContent="center">
            <Box>
              <Typography
                variant="h4"
                sx={{ color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] }}>
                Badges
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              sx={{ flexGrow: 1, m: 6, textAlign: "center" }}>
              <Box>
                <Card
                  style={{ backgroundColor: colors.primary[900] }}
                  sx={{
                    maxWidth: 100,
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 150, width: 100, objectFit: "contain", padding: "1em" }}
                    image="../src/assets/images/award-6693707_640.png"
                    title="1st stuck achievement"
                  />
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div">
                    1st Stuck Achievement
                  </Typography>
                </Card>
              </Box>
              <Card
                sx={{
                  maxWidth: 100,
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: colors.primary[900] }}>
                <CardMedia
                  component="img"
                  sx={{ height: 150, width: 100, objectFit: "contain" }}
                  image="../src/assets/images/cup-2533629_640.png"
                  title="feedback pro"
                />
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div">
                  Feedback Pro
                </Typography>
              </Card>

              <Card
                sx={{
                  maxWidth: 100,
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: colors.primary[900] }}>
                <CardMedia
                  component="img"
                  sx={{ height: 150, width: 100, objectFit: "contain" }}
                  image="../src/assets/images/stars-6699077_640.png"
                  title="Feedback Pro"
                />
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div">
                  Problem Solving Champion
                </Typography>
              </Card>
            </Box>

            {/* <Grid container
            display="flex"
            rowGap="10px"
            >
              <Grid
                item
                xs={8}
                md={6}
                >              
                  <Item>
                  <Card 
           sx={{ maxWidth: 100 }} style={{backgroundColor:colors.primary[900]}}>
      <CardMedia
        sx={{ height: 100 }}
        image="../src/assets/images/award-6693707_640.png"
        title="1st stuck achievement"
      />
      <Typography gutterBottom variant="body2" component="div">
          1st Stuck Achievement
        </Typography>
      </Card>
                  </Item>
                </Grid>
                <Grid xs={8 }md={6}>
                  <Item>         <Card 
           sx={{ maxWidth: 100 }} style={{backgroundColor:colors.primary[900]}}>
      <CardMedia
        sx={{ height: 100}}
        image="../src/assets/images/cup-2533629_640.png"
        title="feedback pro"
      />
      <Typography gutterBottom variant="body2" component="div">
      Feedback Pro
        </Typography>
      </Card></Item>
                </Grid>
                <Grid xs={8}md={6}>
                  <Item> 
                    
                    <Card 
           sx={{ maxWidth: 100 }} style={{backgroundColor:colors.primary[900]}}>
      <CardMedia
        sx={{ height: 100 }}
        image="../src/assets/images/stars-6699077_640.png"
        title="Feedback Pro"
      />
      <Typography gutterBottom variant="body2" component="div">
          1st Stuck Achievement
        </Typography>
      </Card></Item>
                </Grid>
                <Grid xs={8}md={6}>
                  <Item>4</Item>
                </Grid>
              </Grid>
              </Box> */}

            {/* <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 40 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card> */}

            {/* <Box
              gridColumn="span 12"
              justifyContent="space-between"
              marginLeft="10px"
              marginRight="10px"
              alignItems="center"
              height="50px"
              width="100px"
              sx={{
                backgroundImage: `url("../src/assets/images/destination-1285851_640.png")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                // height: "100%",
                // width: "100%",
              }}></Box> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
