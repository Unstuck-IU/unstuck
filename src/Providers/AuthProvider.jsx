
import React, { createContext, useContext, useState, useEffect } from "react";
// import useSupabase from "./SupabaseProvider";
import supabase from "../Components/auth/supabaseDeets.js";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

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
  console.log("props =", props)
  // const auth1 = supabase();
  // console.log("auth1 =", auth1)
  const auth = supabase.auth;
  console.log('auth', auth)
  // const [user, setUser] = useState();
  // console.log('user', user)
  const signInPassword = async (email, password) => {
    try {
      let creds = await auth.signInWithPassword(email, password);
      console.log("creds1", creds)
      if (creds) {
        console.log("Logged in,", creds.data.user, creds.user)
      } else {
        console.log("Login failed"); 
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  } 

  const logOut = async () => {
    await auth.signOut();
  };



  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     console.log("onAuthStateChanged() - new User!!", user);
  //     setUser(user);
  //   });
  //   return unsub; // to shut down onAuthStateChanged listener
  // }, [auth]);

const user = () => {
  try {
    const sessionDataKey = localStorage.key(0)
    const sessionData = localStorage.getItem(sessionDataKey); //get user data from local storage (if available)
    const sessionDataParsed = JSON.parse(sessionData)
    let userId = sessionDataParsed.user.id;
    console.log("creds1", userId)
    if (userId) {
      console.log("Logged in,", userId,)
      return userId
      
    } else {
      console.log("Login failed"); 
    }
  } catch (ex) {
    console.log("Auth failed", ex.message);
  }
} 
  ;
 


const signUp = async (email, password) => {
  try { 
        let userCred = auth.signUp(email,password);
      if (userCred) {
        console.log("Signed up successfully", userCred)
      } else { 
        console.log("Sign up failed")
      }
      } catch (ex) {
        console.log("Auth failed", ex.message)
      }
    };

// const currentSession = auth.getSession();
// const currentUser = auth.getUser();
// const signInMagic = auth.signInWithOtp;
// const signInSSO = auth.signInWithSSO;
// const signInToken = auth.signInWithIdToken;
// const signInOAuth = auth.signInWithOAuth;


  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

const values = { signUp, user, signInPassword, logOut };
console.log('values:', values)
  return (<AuthContext.Provider value={values}>
    {children} </AuthContext.Provider>
   )
}

export default AuthProvider