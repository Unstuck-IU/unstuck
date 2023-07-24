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
          backgroundColor: theme.palette.mode === "dark" ? colors.zest[600] : colors.zest[600],
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
        <DialogTitle fontSize="large">Add New Stuck To Current Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A 'Stuck' is defined as: "A defined problem, or potential area inside the overall topic area that needs improvement."
            Something we are 'Stuck' on.
          </DialogContentText>
          <DialogContentText
            mt={"10px"}
            fontSize={"medium"}
            fontWeight="bold">
            As an Example:
          </DialogContentText>

          <DialogContentText>
            If the Topic area is 'World Peace', the Stuck might be: "What is driving the ongoing armed conflict in Ukraine?" - or
            - "What are the potential routes to decreasing the number, intensity, and duration of conflicts?"
          </DialogContentText>
          <DialogContentText
            mt={"30px"}
            fontSize={"medium"}
            fontWeight="bold">
            So get creative and explore different areas of the topic, to come up with a stuck that interests you personally, and
            that you find engaging. You'll be exploring this Stuck further in the next steps!
          </DialogContentText>
          <TextField
            sx={{ mt: "15px" }}
            autoFocus
            fullWidth
            multiline
            margin="dense"
            id="stuck"
            label="Write Your Stuck Here"
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
