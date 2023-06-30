import React from "react";
import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient.js";

// const Profile = () => {
//   return (
//     <div>
//       <h1>Profile</h1>
//     </div>
//   );
// };

// export default Profile;

function Profile() {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    let { data, error } = await supabase.from("user_details").select("*");
    setUserProfile(data);
    console.log(userProfile);
  }

  return (
    <ul>
      {userProfile.map((profile) => (
        <li key={profile.user_id}>{profile.first_name}</li>
      ))}
      {userProfile.map((profile) => (
        <li key={profile.user_id}>{profile.last_name}</li>
      ))}
      {userProfile.map((profile) => (
        <li key={profile.user_id}>{profile.user_type}</li>
      ))}
    </ul>
  );
}

export default Profile;
