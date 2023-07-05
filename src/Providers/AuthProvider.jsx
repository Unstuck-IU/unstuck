import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../components/auth/supabaseDeets";
// import useSupabase from "./SupabaseProvider";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

/*
 *
 * Todo: Add .env helpers
 */

// import.meta.env.VITE_SUPABASE_URL;
// import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseUrl = "https://ibcloulxdbsfsdvegstc.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2xvdWx4ZGJzZnNkdmVnc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2Mzk3MzQsImV4cCI6MjAwMTIxNTczNH0.aayqb-XCiBg055mG-xCI9fC2sVNNzUGdTjC262-he-w";

//const supAuth = auth1()

const AuthProvider = (props) => {
  const { children } = props;
  console.log("props =", props);
  // const auth1 = supabase();
  // console.log("auth1 =", auth1)
  console.log("auth", supabase.auth);

  const logOut = async () => {
    await supabase.auth.signOut();
    // router.push("/");
  };

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     console.log("onAuthStateChanged() - new User!!", user);
  //     setUser(user);
  //   });
  //   return unsub; // to shut down onAuthStateChanged listener
  // }, [auth]);

  const user = async () => {
    try {
      const sessionDataKey = localStorage.key(0);
      const sessionData = localStorage.getItem(sessionDataKey); //get user data from local storage (if available)
      const sessionDataParsed = await JSON.parse(sessionData);
      let userId = await sessionDataParsed.user.id;
      console.log("creds1", userId);
      if (userId) {
        console.log("Logged in,", userId);
        return userId;
      } else {
        console.log("Login failed");
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };
  const signUp = async (emailField, passwordField) => {
    try {
      console.log("we called signUp successfully");
      let { data, error } = await supabase.auth.signUp({ email: emailField, password: passwordField });
      if (error) {
        console.log("Sign up failed. Error: \n", error);
        return { data, error };
      }
      if (data) {
        console.log("Signed up successfully", data);
        return { data, error };
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };

  // const currentSession = supabase.auth.getSession();
  // const currentUser = supabase.auth.getUser();
  // const signInMagic = supabase.auth.signInWithOtp;
  // const signInSSO = supabase.auth.signInWithSSO;
  // const signInToken = supabase.auth.signInWithIdToken;
  // const signInOAuth = supabase.auth.signInWithOAuth;

  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  const values = { signUp, user, logOut };
  console.log("values:", values);
  return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
};

export default AuthProvider;
