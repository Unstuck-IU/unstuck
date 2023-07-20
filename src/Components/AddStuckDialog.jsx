import { useAuth, supabase } from "../Providers/AuthProvider";

import { tokens } from "../theme";
import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddStuckDialog({ ...props }) {
  const { userDetails } = useAuth();
  const [open, setOpen] = useState(false);

  const [drivingQuestion, setDrivingQuestion] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // add database call to insert new row in stucks table - using current topic.id
    console.log("AddStuckDialog handleSubmit was called successfully");
    // get the user_topic.id from the user_topic table
    if (userDetails && props.activeTopic?.id) {
      // filtering out all records on user_topic table for ones that match the current entered topic_id and current user
      // there should be one and only one there if the student has joined already, and it should return an empty array if they haven't
      let { data: userTopicData, error: joinedTopicError } = await supabase
        .from("user_topic")
        .select("*")
        .eq("user_id", userDetails.user_id)
        .eq("topic_id", props.activeTopic.id)
        .single();
      console.log("userTopicData", userTopicData);
      if (userTopicData) {
        const { data: stuckData, error } = await supabase
          .from("stuck")
          .insert([{ user_topic_id: userTopicData.id, driving_question: drivingQuestion }])
          .select();
        console.log("stuckData: ", stuckData);
        props.handleFetchStucks();
      }
      setOpen(false);
    }
  };
  return (
    <div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        variant="outlined"
        onClick={handleClickOpen}>
        <AddCircleOutlineIcon sx={{ mr: "10px" }} />
        Add Stuck
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Add New Stuck To Current Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the text that will help a student understand what they need to be inputting into the text field. We need to
            give them an explanation of what a "Stuck Driving Question" is, and what are some good examples of one.
          </DialogContentText>
          <TextField
            sx={{ mt: "15px" }}
            autoFocus
            fullWidth
            multiline
            margin="dense"
            id="stuck"
            label="Driving Question"
            type="text"
            value={drivingQuestion}
            onChange={(e) => setDrivingQuestion(e.target.value)}
            //need to ad an "onSubmit", which will THEN call the setJoinCode when it's full
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Stuck</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
