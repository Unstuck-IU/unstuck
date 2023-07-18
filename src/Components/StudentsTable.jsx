import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


const StyledCard = styled(Card)({
  minWidth: 150,
  background: "#2d2d2d",
  borderRadius: 5,
  "&:hover": {
    boxShadow: "0px 1px 5px 0px #6dcc93",
    elevation: 20,
  },
});

const StudentsTable = ({ stuck }) => {

 
  
  return (
    <StyledCard raised={true} elevation={1}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div" color="#3cb371">
            {stuck.user_topic.user_details.first_name}
          </Typography>
          <Typography variant="body2">{stuck.driving_question}</Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="read-only"
              value={stuck.user_topic_id}
              readOnly
              sx={{ color: "#3cb371" }}
            />
            <Stack direction="row">
              <Link to={`/${stuck.id}`}>
                <IconButton aria-label="edit" color="secondary">
                  <Edit />
                </IconButton>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default StudentsTable

// import React,{useEffect,useState} from 'react'

// const StudentsTable = () => {
//   return (
//     <div>StudentsTable</div>
//   )
// }

// export default StudentsTable