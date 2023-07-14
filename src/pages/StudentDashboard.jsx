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

// import StuckCard from "../components/stuckCard";


const StudentDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();
  const [topic, setTopic] = useState("");
  const [joinCode, setJoinCode] = useState(null);
  const [stucks, setStucks] = useState([]);
  // const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // "error", "warning", "info", or "success" from MUI
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    if (!loading && userDetails != null) {
      const fetchLastTopicId = async () => {
        let { data: lastTopicId, error: lastTopicIdError } = await supabase
          .from("topic")
          .select("*, user_details!inner(last_topic_id_viewed, id, first_name, last_name)")
          .eq("id", userDetails?.last_topic_id_viewed ? userDetails?.last_topic_id_viewed : null)
          .single();
        if (lastTopicId) {
          console.log(`lastTopicId: ${JSON.stringify(lastTopicId, null, 2)}`);
          setTopic(lastTopicId);
        } else {
          setFirstTime(true);
          console.log(`lastTopicIdError: ${JSON.stringify(lastTopicIdError, null, 2)}`);
        }
      };
      fetchLastTopicId();
    }
  }, [loading]);

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
          // .select("topic_string, student_topic(*)")
          .eq("join_code", joinCode)
          .single();

        // // example for how to get records from a table filtered based on a foreign key:
        // let { data: stores } = await supabase
        // .from('stores')
        // .select('*, cars!inner(*)')
        // .eq('cars.brand', 'Ford')

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
        .from("stuck") // from this table
        // getting details from two other tables using foreign keys (stuck is the original,
        // user_topic is the next table, and user_details is the third table that are connected via foreign keys)
        .select("*, user_topic!inner(*, user_details!inner(*))") // on stuck table, the foreign key to user_topic table is called user_topic_id
        .eq("user_topic.topic_id", topic.id);
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
      setMessage(`There is no join code that matches that value. Please try again with a different code.`);
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
          setMessage(`You are already joined to this Topic! Current topic is now changed.`);
          setAlertSeverity("info");
          setIsAlertShowing(true);
          setJoinCode(newJoinCode);
        } else if (userDetails && fetchedTopic.id) {
          const { data: user_topic, error } = await supabase
            .from("user_topic")
            .insert([{ user_id: userDetails.user_id, topic_id: fetchedTopic.id }])
            .select();
          setMessage(`User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`);
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


  // Update all instances to handleSexiFormUpload or some variant for clarity? 
  const handleUpload = async (formValues) => {
    const { data, error } = await supabase
      .from('stuck')
      .update({
        statement_text: formValues.statement,
        expand_text: formValues.expand,
        example_text: formValues.example,
        illustration_text: formValues.illustrate
      })
      .eq("user_topic_id", 36) // Todo: ? Add join with user_topic on topic id and return? 
      .eq("id", 27); // Change to retrieved ID from handleChosenStuck (StuckCard/ProgressStepper)
    if (error) {

      console.log("Error received while updating Stuck table entries. \n", error)


    }

    console.log("handleUpload Student Dashboard Data", data)
  }

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
    <Box
      m="20px"
      display="flex"
      flexDirection="column"
      justifyContent="end">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        alignContent="center">
        <Header
          title={userDetails?.display_name ? userDetails?.display_name + "'s Dashboard" : "Student Dashboard"}
          subtitle="Welcome to your Unstuck Profile!"
        />
        <TopicHeader
          joinCode={joinCode}
          userDetails={userDetails}
          topic={topic}
        />

      </Box>
      <ProgressStepper
        // activeStep={activeStep}
        // setActiveStep={setActiveStep}
        handleJoinTopic={handleJoinTopic}
        joinCode={joinCode}
        topic={topic}
        isAlertShowing={isAlertShowing}
        setIsAlertShowing={setIsAlertShowing}
        stucks={stucks}
        setStucks={setStucks}
        handleUpload={handleUpload}
      />

      {/* {activeStep === 2 && (
        // <StepTwo/>
        <Typography
          gutterBottom
          variant="h5"
          component="div">
          Test Step 2
        </Typography>
      )}
      {activeStep === 3 && (
        // <StepThree/>
        <Typography
          gutterBottom
          variant="h5"
          component="div">
          Test Step 3
        </Typography>
      )} */}
    </Box>
  );
};

export default StudentDashboard;
