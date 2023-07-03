import { createClient } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";
import useSupabase from "./SupabaseProvider";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

/*
 *
 * Todo: Add .env helpers
 */

// import.meta.env.VITE_SUPABASE_URL;
// import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = "https://ibcloulxdbsfsdvegstc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2xvdWx4ZGJzZnNkdmVnc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2Mzk3MzQsImV4cCI6MjAwMTIxNTczNH0.aayqb-XCiBg055mG-xCI9fC2sVNNzUGdTjC262-he-w";





const AuthProvider = (props) => {
  const children = props.children;
  const supabase = useSupabase();
  const auth = supabase.auth
  const [user, setUser] = useState();
  
  const signInPassword = async (email, password) => {
    try {
      let creds = await auth.signInWithPassword(email, password);
      if (creds) {
        console.log("Logged in,", creds.user)
      } else {
        console.log("Login failed"); 
      }
    } catch (ex) {
      console.log("Auth failed", ex.message);
    }
  } 

  const logOut = async () => {
    await auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub; // to shut down onAuthStateChanged listener
  }, [auth]);




const currentSession = auth.getSession();

const currentUser = auth.getUser();


const signUp = auth.signUp;

const signInMage = auth.signInWithOtp;
const signInSSO = auth.signInWithSSO;
const signInToken = auth.signInWithIdToken;
const signInOAuth = auth.signInWithOAuth;

const values = { user, signInPassword, logOut };
  return <AuthContext.Provider value={values}>
    {children} </AuthContext.Provider>
  ;
};

export default AuthProvider;