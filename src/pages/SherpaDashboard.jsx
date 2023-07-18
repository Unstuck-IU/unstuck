import React, { useEffect, useState } from "react";

//auth context
import { useAuth, supabase } from "../Providers/AuthProvider";

//theme
import { tokens } from "../theme";
import { Box, Button, useTheme, Alert } from "@mui/material";

//components
import TopicHeader from "../components/TopicHeader";
import Header from "../components/Header";
import JoinTopicDialog from "../components/JoinTopicDialog";
import SelectCurrentTopicDialog from "../components/selectCurrentTopicDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentsTable from "../components/StudentsTable";

// ui elements
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl, { useFormControl } from "@mui/material/FormControl";
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
  const { userDetails, user, loading } = useAuth();
  const [topicFormInput, setTopicFormInput] = useState({
    topic_string: "",
  });
  const [activeTopic, setActiveTopic] = useState(null);
  const [stucks, setStucks] = useState([]);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  // retrieve most recently viewed topic from the database to load by default
  useEffect(() => {
    if (!loading && userDetails.last_topic_id_viewed != null && userDetails.user_id != null) {
      const fetchUserTopicOfLastTopicViewed = async () => {
        console.log("userDetails on useEffect: ", userDetails);
        let { data: lastUserTopic, error: lastUserTopicError } = await supabase
          .from("topic")
          .select("*, sherpa_owner_id!inner(*)")
          .eq("id", userDetails?.last_topic_id_viewed ? userDetails?.last_topic_id_viewed : null)
          .single();
        if (lastUserTopic) {
          console.log("lastUserTopic: ", lastUserTopic);
          setActiveTopic(lastUserTopic);
        } else {
          console.log(`lastTopicError: ${JSON.stringify(lastUserTopicError, null, 2)}`);
        }
      };
      fetchUserTopicOfLastTopicViewed();
    } else if (userDetails.last_topic_id_viewed === null) {
      setFirstTime(true);
    }
  }, [user]);

  function handleNewTopicFormChange(e) {
    const { name, value } = e.target;
    setTopicFormInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // hangleGetAllTopicsOwnedBySherpa
  // let { data: topicExistsCheck, error: joinedTopicError } = await supabase
  // .from("user_topic")
  // .select("*")
  // .eq("user_id", userDetails.user_id)
  // .eq("topic_id", fetchedTopic.id);

  // copied from StudentDashboard.jsx, need to edit still
  const handleSetActiveTopic = async (newActiveTopicId) => {
    console.log("activeTopic from handleSetActiveTopic: ", newActiveTopicId);
    // fetching the topic_id that matches the join_code entered.
    console.log("userDetails prior to calling fetchedTopic: ", userDetails);
    let { data: fetchedTopic, error: fetchedTopicError } = await supabase
      .from("topic")
      // .select("*, topic_id!inner(*), user_id!inner(*)")
      .select("*, sherpa_owner_id!inner(*)")
      .eq("sherpa_owner_id", userDetails?.user_id ? userDetails?.user_id : null)
      .eq("id", newActiveTopicId)
      .single();

    // .from("topic")
    // .select("id, sherpa_owner_id, topic_string")
    // .eq("id", newActiveTopicId)
    // .single();
    console.log("################################# fetchedTopic after selecting from the dropdown ", fetchedTopic);
    if (fetchedTopicError?.message) {
      setMessage(`An error occurred: ${fetchedTopicError.message}`);
      setAlertSeverity("error");
      setIsAlertShowing(true);
    } else if (fetchedTopic.id && userDetails) {
      console.log("###before changing the active topic :", newActiveTopicId);
      // saving the topic as the active topic
      setMessage(`The topic '${fetchedTopic?.topic_string}' is now active. \n The Join Code is: ${fetchedTopic?.join_code}}`);
      setAlertSeverity("success");
      setIsAlertShowing(true);
      setActiveTopic(fetchedTopic);
      setFirstTime(false);
      // updating the database with the last topic id viewed, to help load the correct one next time
      const { data: updatedUser, error } = await supabase
        .from("user_details")
        .update({ last_topic_id_viewed: fetchedTopic.id })
        .eq("user_id", userDetails?.user_id)
        .select();
      console.log("updatedUser after updating the last topic viewed: ", updatedUser);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsAlertShowing(false);
    }, 4500);
  });

  async function handleCreateTopic(e) {
    e.preventDefault();

    await supabase
      .from("topic")
      .insert([{ sherpa_owner_id: userDetails.user_id, topic_string: topicFormInput.topic_string }])
      .select();
  }

  // useEffect(() => {
  //   if (userDetails) {
  //     const fetchLastTopicId = async () => {
  //       let { data: lastTopicId, error: lastTopicIdError } = await supabase
  //         .from("topic")
  //         .select("*, user_details!user_topic!inner(last_topic_id_viewed, id, first_name, last_name)")
  //         .eq("id", userDetails.last_topic_id_viewed)
  //         .single();
  //       console.log(`lastTopicId: ${JSON.stringify(lastTopicId, null, 2)}`);
  //       console.log(`lastTopicIdError: ${JSON.stringify(lastTopicIdError, null, 2)}`);
  //       if (lastTopicId) {
  //         setActiveTopic(lastTopicId);
  //       }
  //     };
  //     if (!loading) {
  //       fetchLastTopicId();
  //     }
  //   }
  // }, [userDetails]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsAlertShowing(false);
  //   }, 5000);
  // });

  // useEffect(() => {
  //   if (!loading && joinCode) {
  //     console.log("2nd useEffect, this is the current topic useState: ", topic);
  //     const fetchMatchingTopic = async () => {
  //       console.log("joinCode: ", joinCode);
  //       console.log("from authProvider, userDetails: ", userDetails);
  //       const { data: fetchedTopic, error: fetchedTopicError } = await supabase
  //         .from("topic")
  //         .select("*, user_details!inner(id,first_name, last_name)") // going

  //         .eq("join_code", joinCode)
  //         .single();

  //       if (fetchedTopic) {
  //         setTopic(fetchedTopic);
  //       }

  //       if (fetchedTopicError) {
  //         setFetchError("Could not fetch the topic");
  //         setTopic(null);
  //         console.log(error);
  //       }
  //     };

  //     if (!loading) {
  //       fetchMatchingTopic();
  //     }
  //   }
  // }, [joinCode]);

  useEffect(() => {
    const fetchStucks = async () => {
      console.log("trying to get stucks from the database");
      let { data: stuck, error } = await supabase
        .from("stuck")
        .select("*, user_topic!inner(*, user_details!inner(*))")
        .eq("user_topic.topic_id", activeTopic.id);
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
    if (userDetails && activeTopic) {
      fetchStucks();
    }
  }, [activeTopic]);

  // const handleJoinTopic = async (newJoinCode) => {
  //   // fetching the topic_id that matches the join_code entered.
  //   let { data: fetchedTopic, error: topicIdError } = await supabase
  //     .from("topic")
  //     .select("id, topic_string")
  //     .eq("join_code", newJoinCode)
  //     .single();
  //   if (fetchedTopic === null) {
  //     setMessage(`There is no join code that matches that value. Please try again with a different code.`);
  //     setAlertSeverity("error");
  //     setIsAlertShowing(true);
  //   } else if (fetchedTopic.id) {
  //     // filtering out all records on user_topic table for ones that match the current entered topic_id and current user
  //     // there should be one and only one there if the student has joined already, and it should return an empty array if they haven't
  //     let { data: topicExistsCheck, error: joinedTopicError } = await supabase
  //       .from("user_topic")
  //       .select("*")
  //       .eq("user_id", userDetails.user_id)
  //       .eq("topic_id", fetchedTopic.id);
  //     if (topicExistsCheck) {
  //       if (topicExistsCheck.length != 0) {
  //         setMessage(`You are already joined to this Topic! Current topic is now changed.`);
  //         setAlertSeverity("info");
  //         setIsAlertShowing(true);
  //         setJoinCode(newJoinCode);
  //       } else if (userDetails && fetchedTopic.id) {
  //         const { data: user_topic, error } = await supabase
  //           .from("user_topic")
  //           .insert([{ user_id: userDetails.user_id, topic_id: fetchedTopic.id }])
  //           .select();
  //         setMessage(`User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`);
  //         setAlertSeverity("success");
  //         setIsAlertShowing(true);
  //         setJoinCode(newJoinCode);
  //       }
  //       // updating the database with the last topic id viewed, to help load the correct one next time
  //       const { data: updatedUser, error } = await supabase
  //         .from("user_details")
  //         .update({ last_topic_id_viewed: fetchedTopic.id })
  //         .eq("user_id", userDetails.user_id)
  //         .select();
  //       console.log(`last_topic_viewed: ${updatedUser.last_topic_id_viewed}`);
  //     }
  //   }
  // };

  if (loading)
    return (
      <Box
        m="20px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignContent="center"
        alignSelf="center"
        alignItems="center">
        <LoadingSpinner />
      </Box>
    );
  return (
    <>
      {isAlertShowing && (
        <Alert
          sx={{ position: "fixed", mt: "-10px", alignSelf: "end" }}
          severity={alertSeverity}
          onClose={() => {
            setIsAlertShowing(false);
          }}>
          {message}
        </Alert>
      )}
      <Box m="20px">
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="baseline"
          alignContent="flex-start">
          <Box sx={{ mr: "10px" }}>
            <Header
              title={"Sherpa Dashboard"}
              subtitle={`Welcome to your Unstuck Profile, ${userDetails?.first_name} ${userDetails?.last_name}!`}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="baseline"
            alignContent="flex-start"
            width="full">
            <Box sx={{ mb: "10px" }}>
              <TopicHeader activeTopic={activeTopic} />
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center">
              <SelectCurrentTopicDialog
                handleSetActiveTopic={handleSetActiveTopic}
                firstTime={firstTime}
              />
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          name="topic_string"
          onSubmit={handleCreateTopic}
          m="20px">
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput
              name="topic_string"
              placeholder="Please enter the topic title"
              onChange={handleNewTopicFormChange}
            />
            <MyFormHelperText />
          </FormControl>
          <Button
            variant="outlined"
            type="submit">
            Submit
          </Button>
        </Box>
        <Grid
          container
          spacing={5}>
          {stucks &&
            stucks.map((stuck) => (
              <Grid
                item
                lg={4}
                xl={4}
                md={4}
                sm={6}
                xs={12}
                key={stuck.id}>
                <StudentsTable stuck={stuck} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default SherpaDashboard;
