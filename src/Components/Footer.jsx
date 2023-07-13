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
      {/* <a href="https://www.freepik.com/free-vector/cartoon-nature-landscape-with-mountain-forest-deciduous-trees-trunks-clearance_10385782.htm#page=7&query=cartoon%20climbing%20mountain&position=0&from_view=search&track=ais">Image by upklyak</a> on Freepik */}
    </footer>
  );
}

export default Footer;
