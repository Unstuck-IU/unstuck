import React from "react";
import { useEffect, useState } from "react";
//auth context
import { useAuth, supabase } from "../Providers/AuthProvider";

//theme
import { tokens } from "../theme";
import {
  Box,
  Button,
  
  useTheme,
  Alert,
  
} from "@mui/material";
//components

import TopicHeader from "../components/TopicHeader";
import Header from "../components/Header";


//ui elements

import LoadingSpinner from "../components/LoadingSpinner";
import JoinTopicDialog from "../components/JoinTopicDialog";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import StudentsTable from "../components/StudentsTable";
import { Grid } from "@mui/material";

function MyFormHelperText() {
  const { focused } = useFormControl() || {};
  const helperText = React.useMemo(() => {
    if (focused) {
      return "This field is being focused";
    }

    return "Topic";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
const SherpaDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();
  const [topic, setTopic] = useState("");
  const [joinCode, setJoinCode] = useState(null);
  const [stucks, setStucks] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const [User_id, setUser_id] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();
  //     if (user) {
  //       setUser(user.id);
  //     } else {
  //       // handle error
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // console.log(user);

  function handleChange(e) {
    const { name, value } = e.target;
    setTopic((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function createTopic() {
    event.preventDefault();

    await supabase
      .from("topic")
      .insert([{ sherpa_owner: user, topic_string: topic.topic_string }])
      .select();
  }

  useEffect(() => {
    if (userDetails) {
      const fetchLastTopicId = async () => {
        let { data: lastTopicId, error: lastTopicIdError } = await supabase
          .from("topic")
          .select(
            "*, user_details!user_topic!inner(last_topic_id_viewed, id, first_name, last_name)"
          )
          .eq("id", userDetails.last_topic_id_viewed)
          .single();
        console.log(`lastTopicId: ${JSON.stringify(lastTopicId, null, 2)}`);
        console.log(
          `lastTopicIdError: ${JSON.stringify(lastTopicIdError, null, 2)}`
        );
        if (lastTopicId) {
          setTopic(lastTopicId);
        }
      };
      if (!loading) {
        fetchLastTopicId();
      }
    }
  }, [userDetails]);

  useEffect(() => {
    setTimeout(() => {
      setIsAlertShowing(false);
    }, 5000);
  });

  useEffect(() => {
    if (!loading && joinCode) {
      console.log("2nd useEffect, this is the current topic useState: ", topic);
      const fetchMatchingTopic = async () => {
        console.log("joinCode: ", joinCode);
        console.log("from authProvider, userDetails: ", userDetails);
        const { data: fetchedTopic, error: fetchedTopicError } = await supabase
          .from("topic")
          .select("*, user_details!inner(id,first_name, last_name)") // going
         
          .eq("join_code", joinCode)
          .single();

        
        if (fetchedTopic) {
          setTopic(fetchedTopic);
        }

        if (fetchedTopicError) {
          setFetchError("Could not fetch the topic");
          setTopic(null);
          console.log(error);
        }
      };

      if (!loading) {
        fetchMatchingTopic();
      }
    }
  }, [loading, joinCode]);

  useEffect(() => {
    const fetchStucks = async () => {
      console.log("trying to get stucks from the database");
      let { data: stuck, error } = await supabase
        .from("stuck") 
        .select("*, user_topic!inner(*, user_details!inner(*))") 
        .eq("user_topic.topic_id", topic.id);
      console.log(stuck);
      if (error) {
        setFetchError("Could not fetch the list of stucks");
        setStucks(null);
        console.log("there was an error ", error);
      }
      if (stuck) {
        setStucks(stuck);
        console.log("fetched stucks: ", stuck);
      }
    };
    if (userDetails && topic) {
      fetchStucks();
    }
  }, [topic]);

  const handleJoinTopic = async (newJoinCode) => {
    // fetching the topic_id that matches the join_code entered.
    let { data: fetchedTopic, error: topicIdError } = await supabase
      .from("topic")
      .select("id, topic_string")
      .eq("join_code", newJoinCode)
      .single();
    if (fetchedTopic === null) {
      setMessage(
        `There is no join code that matches that value. Please try again with a different code.`
      );
      setAlertSeverity("error");
      setIsAlertShowing(true);
    } else if (fetchedTopic.id) {
      // filtering out all records on user_topic table for ones that match the current entered topic_id and current user
      // there should be one and only one there if the student has joined already, and it should return an empty array if they haven't
      let { data: topicExistsCheck, error: joinedTopicError } = await supabase
        .from("user_topic")
        .select("*")
        .eq("user_id", userDetails.user_id)
        .eq("topic_id", fetchedTopic.id);
      if (topicExistsCheck) {
        if (topicExistsCheck.length != 0) {
          setMessage(
            `You are already joined to this Topic! Current topic is now changed.`
          );
          setAlertSeverity("info");
          setIsAlertShowing(true);
          setJoinCode(newJoinCode);
        } else if (userDetails && fetchedTopic.id) {
          const { data: user_topic, error } = await supabase
            .from("user_topic")
            .insert([
              { user_id: userDetails.user_id, topic_id: fetchedTopic.id },
            ])
            .select();
          setMessage(
            `User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`
          );
          setAlertSeverity("success");
          setIsAlertShowing(true);
          setJoinCode(newJoinCode);
        }
        // updating the database with the last topic id viewed, to help load the correct one next time
        const { data: updatedUser, error } = await supabase
          .from("user_details")
          .update({ last_topic_id_viewed: fetchedTopic.id })
          .eq("user_id", userDetails.user_id)
          .select();
        console.log(`last_topic_viewed: ${updatedUser.last_topic_id_viewed}`);
      }
    }
  };

  if (loading)
    return (
      <Box
        m="20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
        alignSelf="center"
        alignItems="center"
      >
        <LoadingSpinner />
      </Box>
    );
  return (
    <Box m="20px" display="flex" flexDirection="column" justifyContent="end">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={
            userDetails?.display_name
              ? userDetails?.display_name + "'s Dashboard"
              : "Student Dashboard"
          }
          subtitle="Welcome to your Unstuck Profile!"
        />

        <Box display="flex" justifyContent="end" alignItems="center">
          {isAlertShowing && (
            <Alert
              sx={{ mr: "10px" }}
              severity={alertSeverity}
              onClose={() => {
                setIsAlertShowing(false);
              }}
            >
              {message}
            </Alert>
          )}
          <JoinTopicDialog handleJoinTopic={handleJoinTopic} />
        </Box>
      </Box>
      {/* <ProgressStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      /> */}
      {/* {fetchError && <p>{fetchError}</p>} */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        name="topic_string"
        onSubmit={createTopic}>
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput
            name="topic_string"
            placeholder="Please enter the topic title"
            onChange={handleChange}
          />
          <MyFormHelperText />
        </FormControl>
        <Button
          variant="outlined"
          type="submit">
          Submit
        </Button>
      </Box>
      {activeStep <= 1 && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="end"
        >
          <TopicHeader
            joinCode={joinCode}
            userDetails={userDetails}
            topic={topic}
          />
          {/* <AddStuckDialog topic={topic} /> */}
        </Box>
      )}
      {/* Form for odding new Unstuck to the Topic */}
      <Grid container spacing={5}>
        {stucks &&
          stucks.map((stuck) => (
            <Grid item lg={4} xl={4} md={4} sm={6} xs={12} key={stuck.id}>
              <StudentsTable stuck={stuck} />
            </Grid>
          ))}
      </Grid>
      
    </Box>
  );
};

export default SherpaDashboard;
