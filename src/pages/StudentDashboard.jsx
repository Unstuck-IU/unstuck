import React from "react";
import { useEffect, useState } from "react";
//auth context
import { useAuth, supabase } from "../Providers/AuthProvider";
//mock data
import { mockTransactions } from "../data/mockData";
//theme
import { tokens } from "../theme";
import { Box, Button, Card, IconButton, Typography, useTheme, Alert, CardActions } from "@mui/material";
//components
import ProgressStepper from "../Components/ProgressStepper";

import Header from "../components/Header";
import StepHeader from "../components/StepHeader";
import LineChart from "../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";
//ui elements
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LoadingSpinner from "../components/LoadingSpinner";
import TopicHeader from "../components/TopicHeader";
import JoinTopicDialog from "../components/JoinTopicDialog";
import AddStuckDialog from "../components/AddStuckDialog";

// import StuckCard from "../components/stuckCard";

const StudentDashboard = ({ handlePageTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();
  const [activeTopic, setActiveTopic] = useState("");
  const [joinCode, setJoinCode] = useState(null);
  const [stucks, setStucks] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    handlePageTitle(userDetails?.display_name + "'s Dashboard", "Welcome to your dashboard");
  }, []);

  useEffect(() => {
    if (!loading && userDetails.user_id != null) {
      const fetchLastTopicId = async () => {
        let { data: lastUserTopic, error: lastUserTopicError } = await supabase
          .from("user_topic")
          .select("*, topic_id!inner(*), user_id!inner(*)")
          .eq("user_id.user_id", userDetails?.user_id ? userDetails?.user_id : null)
          .eq("topic_id.id", userDetails?.last_topic_id_viewed ? userDetails?.last_topic_id_viewed : null)
          .single();
        if (lastUserTopic) {
          console.log("lastUserTopic record using last_topic_id_viewed from user_details table ", lastUserTopic);
          setActiveTopic(lastUserTopic.topic_id);
        } else {
          setFirstTime(true);
          console.log(`lastTopicIdError: ${JSON.stringify(lastUserTopicError, null, 2)}`);
        }
      };
      fetchLastTopicId();
    }
  }, [userDetails]);

  useEffect(() => {
    setTimeout(() => {
      setIsAlertShowing(false);
    }, 4500);
  });

  useEffect(() => {
    if (!loading && joinCode) {
      const fetchMatchingTopic = async () => {
        console.log("joinCode: ", joinCode);
        const { data: fetchedTopic, error: fetchedTopicError } = await supabase
          .from("topic")
          .select("*") // going
          // .select("topic_string, student_topic(*)")
          .eq("join_code", joinCode)
          .single();

        // // example for how to get records from a table filtered based on a foreign key:
        // let { data: stores } = await supabase
        // .from('stores')
        // .select('*, cars!inner(*)')
        // .eq('cars.brand', 'Ford')

        if (fetchedTopic) {
          setActiveTopic(fetchedTopic);
        } else if (fetchedTopicError.message) {
          handleAlert("Could not fetch the topic", "error");
          console.log(fetchedTopicError);
        }
      };

      if (!loading) {
        fetchMatchingTopic();
      }
    }
  }, [joinCode]);

  const handleAlert = (
    alertMessage,
    severityLevel = { error: "error", warning: "warning", info: "info", success: "success" }
  ) => {
    setMessage(alertMessage);
    setAlertSeverity(severityLevel);
    setIsAlertShowing(true);
  };

  // this function will fetch the latest list of stucks from the database - passing this function to the AddStuckDialog component
  // so that we can have this list update immediately after a new stuck is added
  const handleFetchStucks = async () => {
    console.log("trying to get stucks from the database");
    let { data: stuck, error: fetchStucksError } = await supabase
      .from("stuck") // from this table
      // getting details from two other tables using foreign keys (stuck is the original,
      // user_topic is the next table, and user_details is the third table that are connected via foreign keys)
      .select("*, user_topic_id!inner(*, user_id!inner(*), topic_id!inner(*))") // on stuck table, the foreign key to user_topic table is called user_topic_id
      .eq("user_topic_id.topic_id.id", activeTopic?.id);
    if (fetchStucksError) {
      handleAlert("Could not fetch the list of stucks", "error");
      setStucks(null);
      console.log("there was an error ", fetchStucksError);
    }
    if (stuck) {
      setStucks(stuck);
      console.log("fetched stucks: ", stuck);
    }
  };

  //this will update the stucks list when the active topic changes
  useEffect(() => {
    if (userDetails && activeTopic) {
      handleFetchStucks();
    }
  }, [activeTopic]);

  const handleJoinTopic = async (newJoinCode) => {
    // fetching the topic_id that matches the join_code entered.
    let { data: fetchedTopic, error: topicIdError } = await supabase
      .from("topic")
      .select("id, topic_string")
      .eq("join_code", newJoinCode)
      .single();
    if (fetchedTopic === null) {
      handleAlert(`There is no join code that matches that value. Please try again with a different code.`, "error");
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
          handleAlert(`You are already joined to this Topic! Current topic is now changed.`, "info");
          setJoinCode(newJoinCode);
          setFirstTime(false);
        } else if (userDetails && fetchedTopic.id) {
          const { data: userTopicData, error } = await supabase
            .from("user_topic")
            .insert([{ user_id: userDetails.user_id, topic_id: fetchedTopic.id }])
            .select();
          handleAlert(`User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`, "success");
          console.log("student successfully joined user_topic: ", userTopicData);
          handleAlert(`User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`, "success");
          setJoinCode(newJoinCode);
          setFirstTime(false);
        }
        // updating the database with the last topic id viewed, to help load the correct one next time
        console.log("userDetails prior to trying to set the last_topic_id_viewed: ", userDetails);
        const { data: updatedUser, error: updateUserDetailsError } = await supabase
          .from("user_details")
          .update({ last_topic_id_viewed: fetchedTopic.id })
          .eq("user_id", userDetails.user_id)
          .single();
        if (updateUserDetailsError) {
          console.log(updateUserDetailsError);
        }
        if (updatedUser) {
          console.log("updatedUser from StudentDashboard: ", updatedUser);
          console.log(`last_topic_viewed: ${updatedUser.last_topic_id_viewed}`);
        }
      }
    }
  };

  // Update all instances to handleSexiFormUpload or some variant for clarity?
  // const handleUpload = async (formValues) => {
  //   const { data, error } = await supabase
  //     .from("stuck")
  //     .update({
  //       statement_text: formValues.statement,
  //       expand_text: formValues.expand,
  //       example_text: formValues.example,
  //       illustration_text: formValues.illustrate,
  //     })
  //     .eq("user_topic_id", 36) // Todo: ? Add join with user_topic on topic id and return?
  //     .eq("id", 27); // Change to retrieved ID from handleChosenStuck (StuckCard/ProgressStepper)
  //   if (error) {
  //     console.log("Error received while updating Stuck table entries. \n", error);
  //   }

  //   console.log("handleUpload Student Dashboard Data", data);
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
      <Box m="20px">
        {/* HEADER */}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="baseline"
          alignContent="flex-start">
          <TopicHeader activeTopic={activeTopic} />
          <Box
            mt={2}
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center">
            {isAlertShowing && (
              <Alert
                sx={{ mr: "20px" }}
                severity={alertSeverity}
                onClose={() => {
                  setIsAlertShowing(false);
                }}>
                {message}
              </Alert>
            )}

            <JoinTopicDialog
              handleJoinTopic={handleJoinTopic}
              firstTime={firstTime}
            />
          </Box>
        </Box>
        {/* student dashboard content + stepper */}
        <Box
          my="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          borderRadius="3px"
          rowGap="10px"
          sx={{ background: theme.palette.mode === "dark" ? colors.blueAccent[900] : colors.primary[900] }}>
          <ProgressStepper
            // activeStep={activeStep}
            // setActiveStep={setActiveStep}
            handleJoinTopic={handleJoinTopic}
            handleFetchStucks={handleFetchStucks}
            joinCode={joinCode}
            activeTopic={activeTopic}
            isAlertShowing={isAlertShowing}
            setIsAlertShowing={setIsAlertShowing}
            stucks={stucks}
            setStucks={setStucks}
            handleUpload={handleUpload}
            handleAlert={handleAlert}
          />
        </Box>
      </Box>
    </>
  );
};

export default StudentDashboard;
