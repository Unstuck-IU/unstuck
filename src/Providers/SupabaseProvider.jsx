import React, { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
const SupabaseContext = createContext();
export const useSupabase = () => useContext(SupabaseContext);

// import.meta.env.VITE_SUPABASE_URL;
// import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = "https://ibcloulxdbsfsdvegstc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2xvdWx4ZGJzZnNkdmVnc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2Mzk3MzQsImV4cCI6MjAwMTIxNTczNH0.aayqb-XCiBg055mG-xCI9fC2sVNNzUGdTjC262-he-w";
;


const SupabaseProvider = () => {
  // const children = props.children;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const auth = supabase.auth;
  


  const values = (supabase, auth);
  return (
    <SupabaseContext.Provider value={values}>
      
    </SupabaseContext.Provider>
  )
}

export default SupabaseProvider


