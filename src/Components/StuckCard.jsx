import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
//theme
import { tokens } from "../theme";
// ui icons
import { CheckBox } from "@mui/icons-material";

export default function StuckCard({ stuck, activeStep, handleChosenStuck, handleSetCheckedStuckIndex, checked, ...rest }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberChecked, setNumberChecked] = useState(0);
  const handleCheckChange = (event) => {
    console.log("Index of card: ", rest.index);
    handleSetCheckedStuckIndex(rest.index);
    handleChosenStuck(stuck.id);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px 10px 20px",
        margin: "10px",
        width: "300px",
        minHeight: "270px",
        justifyContent: "space-between",
        background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
      }}
      key={stuck.id}

      // onClick={handleRouteStuckDetailPage}
    >
      <div>
        <Typography
          variant="h4"
          textAlign="left">
          {" "}
          {stuck.driving_question}
        </Typography>
        {window.location.pathname !== "/profile" && (
          <Typography
            mt="10px"
            gutterBottom
            variant="h6"
            component="div">
            Submitted By: {stuck.user_topic_id.user_id.display_name + " (" + stuck.user_topic_id.user_id.first_name + ")"}
          </Typography>
        )}
        {window.location.pathname === "/profile" && (
          <>
            <Typography
              mt="10px"
              gutterBottom
              variant="h6"
              component="div">
              Topic: {stuck.user_topic_id.topic_id.topic_string}
            </Typography>
            <Typography
              mt="10px"
              gutterBottom
              variant="h6"
              component="div">
              Submitted ? {stuck.user_topic_id.submitted_stuck ? "Yes" : "No"}
            </Typography>
            <Typography
              mt="10px"
              gutterBottom
              variant="h6"
              component="div">
              Furthest Complete Step: {stuck.user_topic_id.furthest_complete_step}
            </Typography>
          </>
        )}
      </div>
      {activeStep === 1 && (
        <CardActions sx={{ justifyContent: "flex-start" }}>
          <FormGroup>
            <FormControlLabel
              label="Select Stuck"
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          </FormGroup>
        </CardActions>
      )}
    </Card>
  );
}
