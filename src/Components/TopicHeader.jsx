import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../Providers/AuthProvider";

const TopicHeader = ({ topics, setTopics }) => {
  // const [fetchError, setFetchError] = useState("");
  // useEffect(() => {
  //   const fetchTopics = async () => {
    //   const { data, error } = await supabase.from("topics").select().eq("join_code", "123456");

    //   if (error) {
    //     // setFetchError("Could not fetch the topics");
    //     // setTopics(null);
    //     // console.log(error);
    //   }
    //   if (data) {
    //     setTopics(data);
    //     setFetchError(null);
    //   }
    // };
    // fetchTopics();
  // }, []);
  return (
    <>
      {topics && (
        <Box
          sx={{
            height: 300,
            mt: "40px",
            display: "flex",
            flexDirection: "column",
          }}>
          <Container>
            <Typography variant="h2">Topic</Typography>
            {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
            <Typography variant="h5">
              <div className="topics">{topics.topic_string}</div>
            </Typography>
          </Container>
          <Button>Add Stuck</Button>
        </Box>
      )}
    </>
  );
};

export default TopicHeader;
