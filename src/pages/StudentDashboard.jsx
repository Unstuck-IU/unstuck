import React from "react";
import { useAuth } from "../Providers/AuthProvider";

const StudentDashboard = () => {
  const auth = useAuth();
  const user1 = auth.user();
  
  return <div>
    <h1>Student Dashboard</h1>
    <p>UserID is: {user1}</p>
    </div>;
};

export default StudentDashboard;
