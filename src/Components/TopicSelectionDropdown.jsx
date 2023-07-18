import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TopicSelectionDropdown({ handleSelectTopicId, sherpaTopics }) {
  const [topicId, setTopicId] = useState("");

  const handleChange = (event) => {
    setTopicId(event.target.value);
  };

  useEffect(() => {
    if (topicId != "") handleSelectTopicId(topicId);
  }, [topicId]);

  console.log("topicId, from TopicSelectionDropdown.jsx", topicId);

  return (
    <Box sx={{ minWidth: 120, mt: "15px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="topic-simple-select-label"
          id="topic-simple-select"
          value={topicId}
          label="Topic"
          onChange={handleChange}>
          {sherpaTopics.map((item, index) => {
            return (
              <MenuItem
                key={item.id}
                value={item.id}>
                {item.topic_string}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
