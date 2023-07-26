import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function Copyright(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="/about">
        Unstuck
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
export default Copyright;
