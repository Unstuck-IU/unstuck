import { tokens } from "../theme";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TopicSelectionDropdown from "./TopicSelectionDropdown";
import { useAuth, supabase } from "../Providers/AuthProvider";

export default function SelectCurrentTopicDialog({ ...props }) {
  const { userDetails, user, loading } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [sherpaTopics, setSherpaTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const retrieveTopics = async () => {
      const { data: sherpaTopics, error } = await supabase.from("topic").select("*").eq("sherpa_owner_id", userDetails.user_id);
      console.log("sherpaTopics", sherpaTopics);
      setSherpaTopics(sherpaTopics);
    };
    retrieveTopics();
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectTopicId = async (topicId) => {
    console.log("handleSelectTopicId from SelectCurrentTopicDialog.jsx: ", topicId);
    setSelectedTopic(topicId);
  };

  const handleSubmit = async () => {
    console.log("handleSubmit from SelectCurrentTopicDialog.jsx. selectedTopic: ", selectedTopic);
    await props.handleSetActiveTopic(selectedTopic);
    setOpen(false);
  };

  return (
    <div>
      {props.firstTime ? (
        <Button
          sx={{
            // backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            backgroundColor: colors.greenAccent[700],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: 2,
          }}
          variant="outlined"
          onClick={handleClickOpen}>
          <AddCircleOutlineIcon sx={{ mr: "10px" }} />
          Join Topic
        </Button>
      ) : (
        <Button
          sx={{
            // backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          variant="outlined"
          onClick={handleClickOpen}>
          <AddCircleOutlineIcon sx={{ mr: "10px" }} />
          Select Active Topic
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Select Active Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select the topic you want to filter your dashboard view by.</DialogContentText>
          <TopicSelectionDropdown
            handleSelectTopicId={handleSelectTopicId}
            sherpaTopics={sherpaTopics}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Join Topic</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}