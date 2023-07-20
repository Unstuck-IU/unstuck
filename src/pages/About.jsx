import React from "react";
import Link from "@mui/material/Link";
import { useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

const About = ( {handlePageTitle} ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    handlePageTitle("About", "");
  }, []);

  return (
    <div>
      <Box>
        <h1>About</h1>
        <h4>Image credit:</h4>
        <a href="https://www.freepik.com/free-vector/cartoon-nature-landscape-with-mountain-forest-deciduous-trees-trunks-clearance_10385782.htm#page=7&query=cartoon%20climbing%20mountain&position=0&from_view=search&track=ais">
          Image by upklyak
        </a>{" "}
        on Freepik
      </Box>
    </div>
  );
};

export default About;
