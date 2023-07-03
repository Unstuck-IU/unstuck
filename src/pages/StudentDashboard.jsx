import React from "react";
import { useAuth } from "../Providers/AuthProvider";

// const sessionDataKey = localStorage.key(0)
// const sessionDataKey1 = localStorage.key(1)
// const sessionData = JSON.parse(localStorage.getItem(sessionDataKey))
// const sessionData1 = JSON.parse(sessionData)
// const sessionData2 = sessionData.user.id
// console.log('sessionDataKey1', sessionDataKey1)
// console.log('sessionDataKey', sessionDataKey)
// //const sessionUser = sessionData.user.id
// console.log("session data:", sessionData)
// console.log("session data1 parsed:", sessionData1)
// console.log("session data parsed user:", sessionData2)
// console.log('SessionUser', sessionUser)


const accessToken = {
  "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg4NDEzMDUzLCJpYXQiOjE2ODg0MDk0NTMsInN1YiI6ImU2YjljNmY5LTQwNTUtNGE2YS1iMDI5LTg3ZWIwODA0YWU2YyIsImVtYWlsIjoiY29kZWNhbXBAZW1haWxwbHVzLm9yZyIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjg4NDA1OTIyfV0sInNlc3Npb25faWQiOiI2M2YzZDgzNS1iN2RmLTQ5YTItYmJkMy0xODJjOTY5Y2YwZDkifQ.dnxy-Kbm5Haj27TZ9EuTN3c7Tc3WkG5rBSj0SHrhODY",
  "token_type":"bearer",
  "expires_in":3600,
  "refresh_token":"-0_pPZDlz5QWwnnU48nAmA",
  "user":{"id":"e6b9c6f9-4055-4a6a-b029-87eb0804ae6c","aud":"authenticated","role":"authenticated","email":"codecamp@emailplus.org","email_confirmed_at":"2023-06-22T17:20:07.97342Z","phone":"","confirmed_at":"2023-06-22T17:20:07.97342Z","recovery_sent_at":"2023-06-29T02:29:51.913348Z","last_sign_in_at":"2023-07-03T17:46:58.352143Z","app_metadata":{"provider":"email","providers":["email"]},"user_metadata":{},"identities":[{"id":"e6b9c6f9-4055-4a6a-b029-87eb0804ae6c","user_id":"e6b9c6f9-4055-4a6a-b029-87eb0804ae6c","identity_data":{"email":"codecamp@emailplus.org","sub":"e6b9c6f9-4055-4a6a-b029-87eb0804ae6c"},"provider":"email","last_sign_in_at":"2023-06-22T17:20:07.971807Z","created_at":"2023-06-22T17:20:07.971843Z","updated_at":"2023-06-22T17:20:07.971843Z"}],"created_at":"2023-06-22T17:20:07.970768Z","updated_at":"2023-07-03T18:37:33.064276Z"},"expires_at":1688413053}
const StudentDashboard = () => {
  const auth = useAuth();
  const user1 = auth.user();
  
  return <div>
    <h1>Student Dashboard</h1>
    <p>User is: {user1}</p>
    </div>;
};

export default StudentDashboard;
