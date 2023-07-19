import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, useTheme } from "@mui/material";
//theme
import { tokens } from "../theme";
// ui icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function StuckCard({ stuck, activeStep }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              // handleChosenStuck();
            }}>
            <CheckBoxOutlineBlankIcon sx={{ mr: "10px" }} />
            Select Stuck
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
