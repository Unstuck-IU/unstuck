import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const TopicHeader = ({ activeTopic }) => {
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();

  return (
    <>
      {activeTopic && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "baseline",
              mr: "10px",
            }}
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold">
            Topic:{"  "}
            <Typography
              variant="h3"
              ml="10px">
              {activeTopic.topic_string}
            </Typography>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TopicHeader;
