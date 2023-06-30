// import React from "react";

// const Profile = () => {
//   return (
//     <div>
//       <h1>Profile</h1>
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../supabaseClient.js"


// const supabase = createClient("https://<project>.supabase.co", "<your-anon-key>");

function Profile() {
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    
let { data: user_details, error } = await supabase
.from('user_details')
.select('user_type,first_name','last_name')
    setUserProfile(data);
  }

  return (
    <ul>
      {userProfile.map((profile) => (
        <li key={profile.name}>{profile.name}</li>
      ))}
    </ul>
  );
}

export default Profile;
