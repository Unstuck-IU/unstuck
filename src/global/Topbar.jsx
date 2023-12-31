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
        minHeight="100px"
        sx={{
          backgroundImage: `url("../src/assets/images/3706.jpg")`,
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
        {/* <Box sx={{width: 200,
        height: 100, background: theme.palette.mode === "dark" ? colors.blueAccent[900] : colors.primary[900], justifyContent: "center" }}> */}
        <Header
          justifyContent="center"
          title={title}
          subtitle={subtitle}
        />
        {/* </Box> */}
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
        <Box
          display="flex"
          sx={{ backgroundColor: colors.primary[900], borderRadius: 30, mr: "20px" }}>
          <IconButton
            sx={{ color: colors.black[100] }}
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
            <PersonOutlinedIcon sx={{ color: colors.black[100] }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
