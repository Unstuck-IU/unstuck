import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      mb="30px"
      height="100px">
      <Typography
        variant="h2"
        color="white"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
