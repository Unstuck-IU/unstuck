import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {title != "" ? (
        <Box
          display="flex"
          alignItems="end"
          borderRadius="15px"
          m={2}
          px={2}
          py={1}>
          <Typography
            variant="h2"
            fontWeight="bold"
            boxShadow="0 5px 25px rgb(0 0 0 / 0.2)"
            sx={{ m: "0 0 5px 0", color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] }}>
            {title}
          </Typography>
        </Box>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Header;
