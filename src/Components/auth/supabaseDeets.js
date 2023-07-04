import { createClient } from "@supabase/supabase-js";
/*
 *
 * Todo: Add .env helpers
 */

// import.meta.env.VITE_SUPABASE_URL;
// import.meta.env.VITE_SUPABASE_ANON_KEY;
const realtimeUrl = "wss://ibcloulxdbsfsdvegstc.supabase.co/realtime/v1";
const supabaseUrl = "https://ibcloulxdbsfsdvegstc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY2xvdWx4ZGJzZnNkdmVnc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2Mzk3MzQsImV4cCI6MjAwMTIxNTczNH0.aayqb-XCiBg055mG-xCI9fC2sVNNzUGdTjC262-he-w";
const authUrl = "https://ibcloulxdbsfsdvegstc.supabase.co/auth/v1";
const storageUrl = "https://ibcloulxdbsfsdvegstc.supabase.co/storage/v1";
const storageKey = "sb-ibcloulxdbsfsdvegstc-auth-token";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
