// import { Delete, Edit } from "@mui/icons-material";
// import {
//   Card,
//   CardContent,
//   IconButton,
//   Rating,
//   Stack,
//   styled,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { Link } from "react-router-dom";


// const StyledCard = styled(Card)({
//   minWidth: 150,
//   background: "#2d2d2d",
//   borderRadius: 5,
//   "&:hover": {
//     boxShadow: "0px 1px 5px 0px #6dcc93",
//     elevation: 20,
//   },
// });

// const User_topics = ({ user_topic }) => {

 
  
//   return (
//     <StyledCard raised={true} elevation={1}>
//       <CardContent>
//         <Stack spacing={2}>
//           <Typography variant="h5" component="div" color="#3cb371">
//             {user_topic.user_id}
//           </Typography>
//           <Typography variant="body2">{user_topic.topic_id}</Typography>
//           <Stack
//             spacing={2}
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Rating
//               name="read-only"
//               value={user_topic.user}
//               readOnly
//               sx={{ color: "#3cb371" }}
//             />
//             <Stack direction="row">
//               <Link to={`/${user_topic.id}`}>
//                 <IconButton aria-label="edit" color="secondary">
//                   <Edit />
//                 </IconButton>
//               </Link>
//             </Stack>
//           </Stack>
//         </Stack>
//       </CardContent>
//     </StyledCard>
//   );
// };

// export default User_topics

// // import React,{useEffect,useState} from 'react'

// // const StudentsTable = () => {
// //   return (
// //     <div>StudentsTable</div>
// //   )
// // }

// // export default StudentsTable

// useEffect(() => {
//     const fetchStudentId = async () => {
//       console.log("trying to get id from the database");
//       let { data: first_name, error } = await supabase
//         .from("user_topic") // from this table
//         // getting details from two other tables using foreign keys (stuck is the original,
//         // user_topic is the next table, and user_details is the third table that are connected via foreign keys)
//         .select("*, user_details!inner(*)") // on stuck table, the foreign key to user_topic table is called user_topic_id
//         .eq("user_details.first_name",user_topic.user_id );
//       if (error) {
//         setFetchError("Could not fetch the id");
//         setStucks(null);
//         console.log("there was an error ", error);
//       }
//       if (stuck) {
//         setStucks(stuck);
//         console.log("fetched ids: ", id);
//       }
//     };
    
//       fetchStudentId();
//     }
//   , []);

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
import React, { useEffect, useState } from "react";
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

const UserTopics = ({ user_topic }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("Trying to get user details from the database");
      let { data: userDetails, error } = await supabase
        .from("user_topic")
        .select("*, user_details!inner(*)")
        .eq("user_details.user_id", user_topic.user_id);

      if (error) {
        console.error("Could not fetch user details", error);
        setUserDetails(null);
      }

      if (userDetails) {
        setUserDetails(userDetails);
        console.log("Fetched user details:", userDetails);
      }
    };

    fetchUserDetails();
  }, [user_topic.user_id]);

  return (
    <StyledCard raised={true} elevation={1}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="div" color="#3cb371">
            {userDetails && userDetails.user_id}
          </Typography>
          <Typography variant="body2">
            {userDetails && userDetails.topic_id}
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="read-only"
              value={user_topic.user}
              readOnly
              sx={{ color: "#3cb371" }}
            />
            <Stack direction="row">
              <Link to={`/${user_topic.id}`}>
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

export default UserTopics;
