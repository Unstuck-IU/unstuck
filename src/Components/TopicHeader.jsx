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
            mt: "30px",
            display: "flex",
            flexDirection: "row",
          }}>
          <Container
            sx={
              {
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
                // alignContent: "baseline",
              }
            }>
            <Typography
              variant="h2"
              mr="10px">
              Topic: {topic.topic_string}
            </Typography>
            <Typography
              variant="h4"
              mr="10px">
              Sherpa: {topic.user_details[0].first_name + " " + topic.user_details[0].last_name}
            </Typography>
            {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
          </Container>
        </Box>
      )}
    </>
  );
};

export default TopicHeader;
