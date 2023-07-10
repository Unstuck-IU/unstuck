import React from "react";
import Copyright2 from "../components/Copyright2";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function Footer() {
 const theme = useTheme();
const colors = tokens(theme.palette.mode); 
return (
    <footer>
      <Copyright2 />
    </footer>
  );
}

export default Footer;
