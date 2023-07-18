import React, { useEffect, useState } from "react";
// import supabase   from "../../src/components/auth/supabaseDeets.js"
// import { supabase } from "../supabaseClient.js";
import { supabase, useAuth } from "../Providers/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import TopicHeader from "../components/TopicHeader";
import SelectCurrentTopicDialog from "../components/selectCurrentTopicDialog";
import { Alert } from "@mui/material";

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

const Sherpa_dashboard = () => {
  const { userDetails, user, loading } = useAuth();
  const [topicFormInput, setTopicFormInput] = useState({
    topic_string: "",
  });
  const [activeTopic, setActiveTopic] = useState(null);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  // retrieve most recently viewed topic from the database to load by default
  useEffect(() => {
    if (!loading && userDetails.last_topic_id_viewed != null && userDetails.user_id != null) {
      const fetchUserTopicOfLastTopicViewed = async () => {
        let { data: lastUserTopic, error: lastUserTopicError } = await supabase
          .from("user_topic")
          .select("*, topic_id!inner(*), user_id!inner(*)")
          .eq("user_id.user_id", userDetails?.user_id ? userDetails?.user_id : null)
          .eq("user_id.last_topic_id_viewed", userDetails?.last_topic_id_viewed ? userDetails?.last_topic_id_viewed : null)
          .eq("topic_id.sherpa_owner_id", userDetails?.user_id ? userDetails?.user_id : null)
          .single();
        if (lastUserTopic) {
          setActiveTopic(lastUserTopic.topic_id);
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
      </Box>
    </>
  );
};
//topic key you use it with the map fxn could be needed above ref part 4 of videos

export default Sherpa_dashboard;
