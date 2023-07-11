import React from "react";
import { ChaoticOrbit } from "@uiball/loaders";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { blueGrey } from "@mui/material/colors";

const LoadingSpinner = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <ChaoticOrbit
        size={25}
        speed={1.5}
        color="darkcyan"
      />
    </>
  );
};

export default LoadingSpinner;
