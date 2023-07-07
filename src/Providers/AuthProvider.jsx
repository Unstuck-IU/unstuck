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

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserSession(session);
      setUser(session?.user ?? null);
      if (session) console.log("session: ", session);
      if (user) {
        console.log("user: ", user);
      }
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      setUserSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
          console.log("Successfully fetched userDetails: ", data);
          setSubmitError(false);
          setAlertMessage("Successfully fetched userDetails");
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

  async function signInPassword(email, password) {
    try {
      let { data, error } = await supabase.auth.signInWithPassword(email, password);
      if (data.user) {
        console.log(data);
        console.log("Logged in,", data.user);
        setSubmitError(false);
        setAlertMessage("Successfully signed in!");
      }
      if (error) {
        console.log("Login failed, try a different email and password combo.");
        setSubmitError(true);
        setAlertMessage("Login failed, please try a different email and password, or sign up for an account.");
        return error;
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  }

  const logOut = async () => {
    await supabase.auth.signOut();
    navigate("/");

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
      const sessionDataKey = localStorage.key(0);
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
      console.log("Auth failed", ex.message);
    }
  };

  const userSupa = async () => {
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
  };

  const signUp = async (emailField, passwordField) => {
    try {
      console.log("we called signUp successfully");
      let { data, error } = await supabase.auth.signUp({ email: emailField, password: passwordField });
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

  const values = {
    user,
    userSession,
    userDetails,
    setUserDetails,
    submitError,
    setSubmitError,
    alertMessage,
    setAlertMessage,
    signUp,
    userSupa,
    userLocal,
    signInPassword,
    logOut,
  };
  console.log("useAuth useContext values:", values);
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
