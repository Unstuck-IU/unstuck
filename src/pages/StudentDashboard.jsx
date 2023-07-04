import { useEffect, useState } from "react";

//ui elements
import { Box } from "@mui/material";
//components
import ProgressStepper from "../components/ProgressStepper";
import TopicHeader from "../components/TopicHeader";

const StudentDashboard = () => {
  const [fetchError, setFetchError] = useState(null);
  const [topics, setTopics] = useState(null);

  return (
    <Box
      className="student-dashboard"
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        alignContent: "center",
      }}>
      <ProgressStepper />
      {fetchError && <p>{fetchError}</p>}
      <TopicHeader
        topics={topics}
        setTopics={setTopics}
      />
    </Box>
  );
};

export default StudentDashboard;
