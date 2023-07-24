import React, { useState } from "react";
import { Avatar, Button, Box, Typography, Card, CardContent, Divider, useTheme, TextareaAutosize } from "@mui/material";
import Rating from "@mui/material/Rating";
import { tokens } from "../theme";
import { useAuth } from "../Providers/AuthProvider";
import { styled } from "@mui/material/styles";

// export default function FeedbackComment({ avatarUrl, userName, timeAgo })
export default function FeedbackComment() {
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const { loading, userDetails, user } = useAuth();
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //handlePageTitle(userDetails?.display_name + "'s Dashboard", "Welcome to your dashboard")

  const timeAgo = "posted Yesterday";
  const userName = userDetails?.display_name;
  const avatarUrl = "";

  const handleRateFeedbackClick = () => {
    setShowFeedbackSection(!showFeedbackSection);
  };

  // if (!loading && userDetails.user_id != null) {

  // }

  const SexiTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 500px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? colors.grey[300] : colors.grey[900]};
    background: ${theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800]};
    border: 1px solid ${theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? colors.grey[900] : colors.grey[50]};
    margin: 10px;
    &:hover {
      border-color: ${colors.blueAccent[400]};
    }
  
    &:focus {
      border-color: ${colors.blueAccent[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.blueAccent[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  function randomScore() {
    return Math.round(Math.random() * (4 - 1) + 1);
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex">
          {/* User avatar */}
          <Box
            sx={{
              paddingRight: "30px",
              paddingLeft: "20px",
            }}>
            <Avatar
              alt={userName}
              src={avatarUrl}
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
          />

          <Box
            sx={{
              flexDirection: "column",
              margin: "10px 20px",
            }}>
            <Box
              // flexGrow={1}
              sx={{
                mb: "20px",
              }}>
              {/* User name */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}>
                  {userName}
                </Typography>
                {/* Time ago */}
                <Typography variant="subtitle2">{timeAgo}</Typography>
                {/* Reply button */}
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  justifyContent: "space-around",
                }}
                variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br></br>
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>

            {/* Hidden feedback section */}
            {showFeedbackSection && (
              <Box
                sx={{
                  marginTop: "20px",
                }}>
                <Divider />
                {/* Subsection 1 */}
                <Box
                  sx={{
                    marginTop: "20px",
                  }}>
                  <Typography variant="subtitle1">Clarity</Typography>
                  <Rating
                    defaultValue={randomScore}
                    max={4}
                  />
                </Box>
                {/* Subsection 2 */}
                <Box>
                  <Typography variant="subtitle1">Relevance</Typography>
                  <Rating
                    defaultValue={randomScore}
                    max={4}
                  />
                </Box>
                {/* Subsection 3 */}
                <Box>
                  <Typography variant="subtitle1">Importance</Typography>
                  <Rating
                    defaultValue={randomScore}
                    max={4}
                  />
                </Box>
              </Box>
            )}

            <Box
              display="flex"
              sx={{
                alignSelf: "right",
                alignContent: "right",
                marginTop: "30px",
                justifyContent: "flex-end",
              }}>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "5px 20px",
                  padding: "5px 10px",
                }}
                variant="outlined">
                Reply
              </Button>
              {/* Rate feedback button */}
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "5px 10px",
                  margin: "5px 20px",
                }}
                variant="outlined"
                onClick={handleRateFeedbackClick}>
                Rate Feedback
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
