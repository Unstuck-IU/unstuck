import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
//theme
import { tokens } from "../theme";
// ui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CheckBox } from "@mui/icons-material";

export default function StuckCard({ stuck, activeStep, handleChosenStuck, ...rest }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        margin: "10px",
        width: "300px",
        height: "190px",
        justifyContent: "space-between",
        background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.primary[800],
      }}
      key={stuck.id}

      // onClick={handleRouteStuckDetailPage}
    >
      <div>
        <Typography
          variant="h5"
          textAlign="left">
          {" "}
          {stuck.driving_question}
        </Typography>
        <Typography
          mt="10px"
          gutterBottom
          variant="h6"
          component="div">
          Submitted By: {stuck.user_topic_id.user_id.display_name}
        </Typography>
      </div>
      {activeStep === 1 && (
        <CardActions sx={{ justifyContent: "end" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  checked={checked}
                  onChange={() => {
                    handleCheckChange;
                    handleChosenStuck(stuck.id);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Select Stuck"
            />
          </FormGroup>
        </CardActions>
      )}
    </Card>
  );
}
