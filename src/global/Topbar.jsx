import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";

const Topbar = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}>
      <Box
        display="flex"
        gridColumn="span 12"
        justifyContent="space-between"
        marginLeft="5px"
        marginRight="5px"
        alignItems="center"
        height="200px"
        sx={{
          backgroundImage: `url("../src/assets/images/2206.i518.016.S.m005.c13.mountains sunset.jpg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
        }}>
        {/* SEARCH BAR */}
        {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
        />
        <IconButton
          type="button"
          sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
        <Header
          title={title}
          subtitle={subtitle}
        />
        {/* <Box display="flex" mb="30px"
    height="100px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box> */}

        {/* ICONS */}
        <Box display="flex">
          <IconButton
            sx={{ color: colors.primary[150] }}
            onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
          {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
          <IconButton
            component={Link}
            to="/profile">
            <PersonOutlinedIcon sx={{ color: colors.primary[150] }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
