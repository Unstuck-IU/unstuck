import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth, supabase } from "../Providers/AuthProvider";
//theme stuff
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import TerrainIcon from "@mui/icons-material/Terrain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useNavigate } from "react-router-dom";

// Adjust to get current user

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const viewNavigate = (newRoute) => {
    // Navigate to the new route
    if (!document.startViewTransition) {
      return navigate(newRoute);
    } else {
      return document.startViewTransition(() => {
        navigate(newRoute);
      });
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `${colors.primary[100]}`, //Changes the menu items text colours
      }}
      onClick={() => {
        setSelected(title);
        viewNavigate(to);
      }}
      icon={icon}>
      <Typography>{title}</Typography>
      {/* <Link to={to} /> */}
    </MenuItem>
  );
};

const Sidebar = () => {
  const { userDetails, userSession, logOut, setUserDetails, user, userLocal } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[900]} !important`, //sidebar main colour background
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#ec9933 !important",
        },
        "& .pro-menu-item.active": {
          color: "#ec9933 !important",
        },
      }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.black[100],
            }}>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">
                <Box>
                  <Box
                    display="flex"
                    alignItems="end">
                    <TerrainIcon sx={{ mb: "-2px", fontSize: 30, mr: "5px" }} />
                    <Typography
                      variant="h3"
                      color={colors.black[100]}>
                      Unstuck
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  icon={<AccountCircleIcon />}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  // color={colors.black[950]}
                  fontWeight="bold"
                  sx={({ m: "10px 0 0 0" }, { color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] })}>
                  {userDetails ? userDetails.first_name : ""}
                  {/* {data[0].first_name} */}
                </Typography>
                <Typography
                  variant="h5"
                  sx={({ m: "10px 0 0 0" }, { color: theme.palette.mode === "dark" ? colors.black[100] : colors.black[100] })}>
                  {/* {data[0].user_type} */}
                  {userDetails ? userDetails.display_name : ""}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {userSession === null && (
              <>
                <Typography
                  variant="h6"
                  color={colors.black[100]}
                  sx={{ m: "15px 0 5px 20px" }}>
                  Account
                </Typography>
                <Item
                  title="Sign Up"
                  to="/signup"
                  icon={<PersonAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Sign In"
                  to="/signin"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
            {userSession != null && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}>
                  Account
                </Typography>
                <Item
                  title="Profile"
                  to="/profile"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.black[100]}
                  sx={{ m: "15px 0 5px 20px" }}>
                  Pages
                </Typography>
                {userDetails?.user_type === "student" && (
                  <Item
                    title="Student Dashboard"
                    to="/student-dashboard"
                    icon={<DashboardIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}

                {userDetails?.user_type === "student" && (
                  <Item
                    title="Feedback"
                    to="/feedback"
                    icon={<FeedbackIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}

                {userDetails?.user_type === "sherpa" && (
                  <Item
                    title="Sherpa Dashboard"
                    to="/sherpa-dashboard"
                    icon={<DashboardIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
              </>
            )}
            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Typography
              variant="h6"
              color={colors.black[100]}
              sx={{ m: "15px 0 5px 20px" }}>
              Learn More
            </Typography>
            <Item
              title="About"
              to="/about"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userSession != null && (
              <>
                <MenuItem
                  icon={<LogoutIcon />}
                  onClick={logOut}>
                  {" "}
                  <Typography>Signout</Typography>
                  <Link to="/" />
                </MenuItem>
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
