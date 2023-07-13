import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const TopicHeader = ({ topic }) => {
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();

  return (
    <>
      {topic && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "baseline",
            }}>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "baseline",
                mr: "10px",
              }}
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold">
              Topic:{"  "}
              <Typography
                variant="h2"
                ml="10px">
                {topic.topic_string}
              </Typography>
            </Typography>

            {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
          </Container>
        </Box>
      )}
    </>
  );
};

export default TopicHeader;
