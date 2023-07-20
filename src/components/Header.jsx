import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      // mb="30px"
      height="100px">
      <Box
        display="inline-flex"
        borderRadius="10px"
        sx={{ backgroundColor: colors.primary[900] }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          boxShadow="0 5px 25px rgb(0 0 0 / 0.2)"
          sx={{ m: "0 0 5px 0", color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] }}>
          {title}
        </Typography>
        {/* <Typography
        variant="h5"
        color="white"
        fontWeight="bold">
        {subtitle}
      </Typography> */}
      </Box>
    </Box>
  );
};

export default Header;
