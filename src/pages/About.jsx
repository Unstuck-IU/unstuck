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
      handlePageTitle("About", "");
    }
  }, [userDetails]);

  return (
    <div>
      <meta
        name="view-transition"
        content="same-origin"
      />
      <Box>
        <h2>Unstuck Developer Team</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
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
              sx={{ height: 300 }}
              image="/src/assets/images/jenny-head-shot-cropped.jpg"
              title="Jenny-Headshot"
            />
            <CardContent>
              <Typography
                variant="h5"
                textAlign="left">
                {" "}
                Jennifer Gajdos-Bomben
              </Typography>
              <a href="mailto:jgajdosbomben@gmail.com">Email Jennifer</a>
              <br />
              <a href="https://www.linkedin.com/in/jennifer-gajdos-bomben-bb037143/">Jennifer's LinkedIn Profile</a>
              <br />
              <a href="link-to-portfolio-here">Jennifer's Personal Portfolio (Todo)</a>
            </CardContent>
          </Card>
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
              sx={{ height: 300 }}
              image="/src/assets/images/aric-head-shot-cropped.jpg"
              title="Aric-Headshot"
            />
            <CardContent
              display="flex"
              justifyContent="flex-start">
              <Typography
                variant="h5"
                textAlign="left">
                {" "}
                Aric Crosson Bouwers
              </Typography>
              <a href="mailto:0many-treaty@icloud.com">Email Aric</a>
              <br />
              <a href="linkedin.com/in/aric-crosson-bouwers">Aric's LinkedIn Profile</a>
              <br />
              <a href="https://www.ariccb.dev">Aric's Personal Portfolio</a>
            </CardContent>
          </Card>
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
              sx={{ height: 300 }}
              image="/src/assets/images/zee-head-shot-cropped.jpg"
              title="Zee-Headshot"
            />
            <CardContent
              display="flex"
              justifyContent="flex-start">
              <Typography
                variant="h5"
                textAlign="left">
                {" "}
                Zibusiso Mafaiti
              </Typography>
              <a href="mailto:zmafaiti@gmail.com">Email Zee</a>
              <br />
              <a href="https://www.linkedin.com/in/zibusiso-mafaiti/">Zee's LinkedIn Profile</a>
              <br />
              <a href="link-to-portfolio-here">Zee's Personal Portfolio (Todo)</a>
            </CardContent>
          </Card>
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
              sx={{ height: 300 }}
              image="/src/assets/images/med-head-shot-cropped.jpg"
              title="Med-Headshot"
            />
            <CardContent
              display="flex"
              justifyContent="flex-start">
              <Typography
                variant="h5"
                textAlign="left">
                {" "}
                Medara Kapcsos
              </Typography>
              <a href="mailto:med.kap2023@gmail.com">Email Med</a>
              <br />
              <a href="https://www.linkedin.com/in/medara-kapcsos-67196526b/">Med's LinkedIn Profile</a>
              <br />
              <a href="link-to-portfolio-here">Med's Personal Portfolio (Todo)</a>
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
