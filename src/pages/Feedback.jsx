import React from "react";
import { tokens } from "../theme";
import { useAuth, supabase } from "../Providers/AuthProvider";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";

const Feedback = ({ handlePageTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    handlePageTitle("Feedback", "Feedback Section");
  }, []);

  return <div>Feedback</div>;
};

export default Feedback;
