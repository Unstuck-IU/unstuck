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
import ProgressStepper from "../components/ProgressStepper";
import TopicHeader from "../components/TopicHeader";
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
import JoinTopicDialog from "../components/JoinTopicDialog";
import StuckCard from "../components/stuckCard";
import AddStuckDialog from "../components/AddStuckDialog";

const StudentDashboard = () => {
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
          setMessage("Could not fetch the topic");
          setAlertSeverity("error");
          setIsAlertShowing(true);
          console.log(fetchedTopicError);
        }
      };

      if (!loading) {
        fetchMatchingTopic();
      }
    }
  }, [joinCode]);

  // this function will fetch the latest list of stucks from the database - passing this function to the AddStuckDialog component
  // so that we can have this list update immediately after a new stuck is added
  const handleFetchStucks = async () => {
    console.log("trying to get stucks from the database");
    let { data: stuck, error: fetchStucksError } = await supabase
      .from("stuck") // from this table
      // getting details from two other tables using foreign keys (stuck is the original,
      // user_topic is the next table, and user_details is the third table that are connected via foreign keys)
      .select("*, user_topic!inner(*, user_details!inner(*))") // on stuck table, the foreign key to user_topic table is called user_topic_id
      .eq("user_topic.topic_id", activeTopic?.id);
    if (fetchStucksError) {
      setMessage("Could not fetch the list of stucks");
      setAlertSeverity("error");
      setIsAlertShowing(true);
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
          setFirstTime(false);
        } else if (userDetails && fetchedTopic.id) {
          const { data: user_topic, error } = await supabase
            .from("user_topic")
            .insert([{ user_id: userDetails.user_id, topic_id: fetchedTopic.id }])
            .select();
          setMessage(`User ${userDetails.display_name} is now joined to the topic: '${fetchedTopic.topic_string}'`);
          setAlertSeverity("success");
          setIsAlertShowing(true);
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
          flexDirection="row"
          flexWrap="wrap"
          alignItems="baseline"
          alignContent="flex-start">
          <Box sx={{ mr: "10px" }}>
            <Header
              title={userDetails?.display_name ? userDetails?.display_name + "'s Dashboard" : "Student Dashboard"}
              subtitle="Welcome to your Unstuck Profile!"
            />
          </Box>
        </Box>
        <ProgressStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="baseline"
          alignContent="flex-start">
          <Box sx={{ mb: "10px" }}>
            <TopicHeader activeTopic={activeTopic} />
          </Box>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center">
            <JoinTopicDialog
              handleJoinTopic={handleJoinTopic}
              firstTime={firstTime}
            />
          </Box>
        </Box>
      </Box>
      <Box m="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <StepHeader activeStep={activeStep} />

          {/* {fetchError && <p>{fetchError}</p>} */}
          {activeStep < 1 && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="end"
              alignItems="end">
              <AddStuckDialog
                activeTopic={activeTopic}
                handleFetchStucks={handleFetchStucks}
              />
            </Box>
          )}
          {activeStep === 1 && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="end"
              alignItems="end">
              <Button>Select Stuck</Button>
            </Box>
          )}
        </Box>
        {/* Form for odding new Unstuck to the Topic */}
        {activeStep <= 1 && (
          // <StepOne/>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            m="2rem">
            {/* display all submitted stucks here */}
            {stucks?.map((stuck, index) => (
              <StuckCard
                key={stuck.id}
                stuck={stuck}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                index={index}
              />
            ))}
          </Box>
        )}
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
    </>
  );
};

export default StudentDashboard;
