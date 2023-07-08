import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const TopicHeader = ({ ...props }) => {
  const { userDetails } = useAuth();
  const [topic, setTopic] = useState("");
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  useEffect(() => {
    const fetchTopic = async () => {
      const { data, error } = await supabase.from("topic").select().eq("join_code", "123456");

      if (error) {
        // setFetchError("Could not fetch the topic");
        // settopic(null);
        // console.log(error);
      }
      if (data) {
        setTopic(data);
        setFetchError(null);
      }
    };
    fetchTopic();
  }, []);
  return (
    <>
      {topic && (
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
              <div className="topic">{topic.topic_string}</div>
            </Typography>
          </Container>
          <Button>Add Stuck</Button>
        </Box>
      )}
    </>
  );
};

export default TopicHeader;
