import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  session: null,
});

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthProvider = (props) => {
  const { children } = props;
  // console.log("props =", props);
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setUserSession(session);
      setUser(session?.user ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //runs after fetching user
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user != null) {
        const { data, error } = await supabase
          .from("user_details")
          .select("*")
          .eq("id", user?.id ? user?.id : null)
          .single();
        setUserDetails(data ?? null);
        if (data) {
          setSubmitError(false);
          setAlertMessage("Successfully fetched userDetails");
          setSignedIn(true);
        }

        if (error) {
          console.log("error occurred when trying to get user_details in AuthProvider useEffect: ", error);
          setSubmitError(true);
          setAlertMessage("User details could not be retrieved");
        }
        if (data.first_name != null && data.last_name != null && data.display_name != null && data.completed_signup != true) {
          console.log("All user_details are filled out and completed_signup can be set to true");
          const { data, error } = await supabase
            .from("user_details")
            .update({ completed_signup: true })
            .eq("id", user.id)
            .select();
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  //runs after fetching userDetails
  useEffect(() => {
    if (userDetails != null) {
      if (
        userDetails?.completed_signup === true &&
        userDetails?.user_type === "student" &&
        window.location.pathname === "/signin"
      ) {
        navigate("/student-dashboard");
      } else if (
        userDetails.completed_signup === true &&
        userDetails.user_type === "sherpa" &&
        window.location.pathname === "/signin"
      ) {
        navigate("/sherpa-dashboard");
      } else if (userSession && window.location.pathname === "/signin") {
        navigate("/profile");
      }
    }
  }, [signedIn]);

  async function signInPassword(email, password) {
    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signInWithPassword(email, password);
      if (data.user) {
        console.log(data);
        console.log("Logged in,", data.user);
        setSubmitError(false);
        setAlertMessage("Successfully signed in!");
        setLoading(false);
      }
      if (error) {
        console.log("Login failed, try a different email and password combo.");
        setSubmitError(true);
        setAlertMessage("Login failed, please try a different email and password, or sign up for an account.");
        return error;
        setLoading(false);
      }
      setLoading(false);
    } catch (ex) {
      console.log("Auth failed", ex.message);
      setLoading(false);
    }
  }

  const signUp = async (emailField, passwordField) => {
    setLoading(true);
    try {
      console.log("we called signUp successfully");
      let { data, error } = await supabase.auth.signUp({ email: emailField, password: passwordField, redirectTo: "/signin" });
      if (error) {
        console.log("Sign up failed. Error: \n", error);
        setAlertMessage("Sign up failed, please try again.");
        return error;
      }
      if (data) {
        console.log("Signed up successfully", data);
        setAlertMessage("Successfully signed up!");
        return data;
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    navigate("/");
    setLoading(false);
    // router.push("/");
  };

  const userLocal = async () => {
    setLoading(true);
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
        console.log("Getting local user details failed");
        setAlertMessage("Getting local user details failed");
      }
    } catch (ex) {
      console.log("Failure during retrieval of local user information", ex.message);
    }
    setLoading(false);
  };

  const storeLocally = async (someStr) => {
    setLoading(true);
    try {
      localStorage.setItem("resText", someStr);
      const resText = localStorage.getItem("resText");
      if (resText != null) {
        console.log("The following item was successfully stored in local storage:", resText);
      } else {
        console.log("Returned as null while trying to place an item in local storeage.");
      }
    } catch (ex) {
      console.log("Something went wrong while trying to place an item in local storage:", ex.message);
    }
    setLoading(false);
  };

  // This is just a helper to check what's currently stored in local storage.
  const getLocalStorage = async () => {
    setLoading(true);
    try {
      const items = { ...localStorage };
      if (!items) {
        console.log("There's nothing currently stored in local storage");
      } else {
        console.log("The following items are in local storage:", items);
      }
    } catch (ex) {
      console.log("getLocalStorage error:", ex.message);
    }
    setLoading(false);
  };

  // This returns the user from the current session. If this session contains an expired token, it refreshes the token to get a new session
  const userSupaSession = async () => {
    setLoading(true);
    try {
      const userData = await supabase.auth.getSession();
      //.then(console.log("This is data.session.user data:", { data: { user } }))

      if ({ userData }) {
        console.log("User session data from .getsession");
        return userData.data.session.user.id;
      } else {
        console.log("No user data");
      }
    } catch (ex) {
      console.log("Failed to get a user session back", ex);
    }
    setLoading(false);
  };

  const userSupa = async () => {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user) {
      console.log("user Supa Data", data);
      return { data: { user } };
    }
    if (error) {
      console.log("Error getting supabase User data", error);
      setAlertMessage("Error getting supabase User data. Are you signed in?");
    }
    setLoading(false);
  };

  // const signInMagic = supabase.auth.signInWithOtp;
  // const signInSSO = supabase.auth.signInWithSSO;
  // const signInToken = supabase.auth.signInWithIdToken;
  // const signInOAuth = supabase.auth.signInWithOAuth;

  const values = {
    user,
    userSession,
    userDetails,
    setUserDetails,
    submitError,
    setSubmitError,
    alertMessage,
    loading,
    setAlertMessage,
    signUp,
    userSupa,
    userLocal,
    signInPassword,
    logOut,
    storeLocally,
    getLocalStorage,
    userSupaSession,
  };
  console.log("useAuth useContext Values from AuthProvider:", values);
  return <AuthContext.Provider value={values}>{children} </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider.");
  }
  return context;
};

export default AuthProvider;
