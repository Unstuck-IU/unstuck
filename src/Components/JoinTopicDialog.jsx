import { tokens } from "../theme";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function JoinTopicDialog({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.handleJoinTopic(joinCodeInput);
    setOpen(false);
  };

  return (
    <>
      {props.firstTime ? (
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.black[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mr: 2,
          }}
          variant="outlined"
          borderStyle="solid"
          onClick={handleClickOpen}>
          <AddCircleOutlineIcon sx={{ mr: "10px" }} />
          Join Topic
        </Button>
      ) : (
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.black[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mr: 2,
          }}
          variant="outlined"
          onClick={handleClickOpen}>
          <AddCircleOutlineIcon sx={{ mr: "10px" }} />
          Join / Switch Topic
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle>Join / Switch Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a new topic, or switch to one you're already joined to, please enter the 6-digit join code provided by your
            Sherpa.
          </DialogContentText>
          <TextField
            sx={{ mt: "15px" }}
            autoFocus
            margin="dense"
            id="join-code"
            label="Join Code"
            type="text"
            value={joinCodeInput}
            onChange={(e) => setJoinCodeInput(e.target.value)}
            //need to ad an "onSubmit", which will THEN call the setJoinCode when it's full
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Join Topic</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
