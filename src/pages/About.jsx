import React from "react";
import Link from "@mui/material/Link";
import { useEffect } from "react";
import { tokens } from "../theme";
import { Box, Card, CardMedia, CardContent, Typography, useTheme } from "@mui/material";
import { useAuth } from "../Providers/AuthProvider";
import "./About.css";

const About = ({ handlePageTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userDetails } = useAuth();

  useEffect(() => {
    if (userDetails) {
      handlePageTitle("", "");
    }
  }, [userDetails]);

  return (
    <div>
      <meta
        name="view-transition"
        content="same-origin"
      />
      <Box>
        <h1>About</h1>
        <h2>Unstuck Developer Team</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px 10px 20px",
              margin: "10px",
              width: "300px",
              minHeight: "270px",
              justifyContent: "space-between",
              background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
            }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/src/assets/images/developer-team-1.png"
              title="green iguana"
            />
            <CardContent>
              <div>
                <Typography
                  variant="h5"
                  textAlign="left">
                  {" "}
                  Name
                </Typography>
                <Typography
                  mt="10px"
                  gutterBottom
                  variant="h6"
                  component="div">
                  Picture
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <h2>Image credits:</h2>
          <a href="https://www.freepik.com/free-vector/cartoon-nature-landscape-with-mountain-forest-deciduous-trees-trunks-clearance_10385782.htm#page=7&query=cartoon%20climbing%20mountain&position=0&from_view=search&track=ais">
            Topbar Image by upklyak
          </a>
          <a href="https://pixabay.com/users/thehalaldesign-19718486/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6699074">
            3D Illustrator and Graphic Designer
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6699074">
            Pixabay
          </a>
          on Freepik
          <br />
          Image by{" "}
          <a href="https://pixabay.com/users/thehalaldesign-19718486/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6699077">
            3D Illustrator and Graphic Designer
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6699077">
            Pixabay
          </a>
          <br />
          Image by{" "}
          <a href="https://pixabay.com/users/nashart-570652/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2533629">
            Nashrulloh Huda
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2533629">
            Pixabay
          </a>
          {/* <br />
        Image by{" "}
        <a href="https://pixabay.com/users/thehalaldesign-19718486/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6693707">
          3D Illustrator and Graphic Designer
        </a>{" "}
        from{" "}
        <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6693707">
          Pixabay
        <br />
        </a> */}
          <br />
          Image by{" "}
          <a href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=29903">
            Clker-Free-Vector-Images
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=29903">
            Pixabay
          </a>
          <br />
          Image by{" "}
          <a href="https://pixabay.com/users/mohamed_hassan-5229782/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5519220">
            Mohamed Hassan
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5519220">
            Pixabay
          </a>
          <br />
          Image by{" "}
          <a href="https://pixabay.com/users/stux-12364/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2718596">
            Stefan Schweihofer
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2718596">
            Pixabay
          </a>
        </Box>
      </Box>
    </div>
  );
};

export default About;
