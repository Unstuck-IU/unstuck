import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

import { createClient } from "@supabase/supabase-js";

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthProvider = (props) => {
  const { children } = props;
  console.log("props =", props);

  const signInPassword = async (email, password) => {
    try {
      let creds = await supabase.auth.signInWithPassword(email, password);
      console.log("creds1", creds);
      if (creds) {
        console.log("Logged in,", creds.data.user, creds.user);
      } else {
        console.log("Login failed");
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  };

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

  const userLocal = async () => {
    try {
      const sessionDataKey = localStorage.key(1);
      const sessionData = localStorage.getItem(sessionDataKey); //get user data from local storage (if available)
      const sessionDataParsed = await JSON.parse(sessionData);
      let userId = await sessionDataParsed.user.id;
      console.log("userId", userId);
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

  const storeLocally = async (someStr) => {
    try {
      localStorage.setItem("resText", someStr);
      const resText = localStorage.getItem("resText")
      if (resText != null) {
        console.log("We found this pile of garbage in local storage:", resText)
      } else {
        console.log("Huh. So it's null.")
      }
    } catch (ex) {
      console.log("So, um, someone shit the bed when they were setting local storage:", ex.message)
    }
  }

  // This is just a helper to check what's currently stored in local storage. 
  const getLocalStorage = async () => {
    try {
      const items = { ...localStorage };
      if (!items) {
        console.log("Shit's fucked up in local storage")
      } else {
        console.log("This is what's in local storage:", items)
      }
    } catch (ex) {
      console.log("I dunno what to tell you, but here's an error message:", ex.message)
    }
  }

  // This returns the user from the current session. If this session contains an expired token, it refreshes the token to get a new session
  const userSupaSession = async () => {
    try {
      const userData = await supabase.auth.getSession()
      //.then(console.log("This is data.session.user data:", { data: { user } }))

      if ({ userData }) {
        console.log("User session data from .getsession")
        return userData.data.session.user.id
      } else {
        console.log("No user data")
      }
    } catch (ex) {
      console.log("Failed to get a user session back", ex)
    }
  }

  const userSupa = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user Supa Data", data);
    return { data: { user } };
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

  const values = { signUp, userSupa, userLocal, signInPassword, logOut, storeLocally, getLocalStorage, userSupaSession };
  console.log("values:", values);
  return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
};

export default AuthProvider;
