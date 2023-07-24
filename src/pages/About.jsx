import React from "react";
import Link from "@mui/material/Link";
import { useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import { useAuth } from "../Providers/AuthProvider";

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
      <Box>
        <h1>About</h1>
        <h4>Image credits:</h4>
        <a href="https://www.freepik.com/free-vector/cartoon-nature-landscape-with-mountain-forest-deciduous-trees-trunks-clearance_10385782.htm#page=7&query=cartoon%20climbing%20mountain&position=0&from_view=search&track=ais">
          Image by upklyak
        </a>{" "}
        <br />
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
        <br />
        Image by{" "}
        <a href="https://pixabay.com/users/thehalaldesign-19718486/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6693707">
          3D Illustrator and Graphic Designer
        </a>{" "}
        from{" "}
        <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6693707">
          Pixabay
        </a>
      </Box>
    </div>
  );
};

export default About;
