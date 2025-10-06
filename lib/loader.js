import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkUser() {
  const userID = localStorage.getItem("User_ID");

  if (!userID) {
    console.error("❌ User_ID not found in localStorage");
    window.location.href = "../../src/welcome.html";
    return;
  }

  const { data, error } = await supabase
    .from("Users")
    .select("is_assist")
    .eq("id", userID)
    .single(); // ensures one object, not array

  if (error) {
    console.error("❌ Supabase error:", error);
    return;
  }

  if (!data) {
    console.error("❌ No user found with this ID");
    window.location.href = "../../src/welcome.html";
    return;
  }

  // Now 'data' is an object like { is_assist: true }
  if (data.is_assist === true) {
    window.location.href = "../../src/admin.html";
  } else {
    window.location.href = "../../src/dashboard.html";
  }

  console.log("✅ User loaded:", data);
}

checkUser();
