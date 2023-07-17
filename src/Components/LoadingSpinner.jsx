import React from "react";
import { ChaoticOrbit } from "@uiball/loaders";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { blueGrey } from "@mui/material/colors";

const LoadingSpinner = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="stretch"
      alignContent="center">
      <ChaoticOrbit
        size={25}
        speed={1.5}
        color="darkcyan"
      />
    </Box>
  );
};

export default LoadingSpinner;
