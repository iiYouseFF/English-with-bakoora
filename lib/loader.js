import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const userID = localStorage.getItem("User_ID")

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (!userID) {
  console.error("❌ User_ID not found in localStorage");
} else {
  const { data: User, error: userError } = await supabase
    .from("Users")
    .select()
    .eq("id", userID);

  if (userError) {
    console.error(userError);
  } else {
    console.log(User);
  }
}

if (error) {
    console.log(error);
}
else {
    console.log(data['is_assist']);
    if (data['is_assist'] == true) {
        window.location.href = '../../src/admin.html'
    }
    else {
        if (userID == null) {
            window.location.href = '../../src/welcome.html'
        }
        else {
            window.location.href = '../../src/dashboard.html'
        }
    }
}

