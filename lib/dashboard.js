import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔹 Supabase credentials
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

// 🔹 Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🔹 Wrap everything inside an async function
async function init() {
  const userID = localStorage.getItem("User_ID");

  if (!userID) {
    console.error("❌ No User_ID found in localStorage");
    window.location.href = "../../src/welcome.html";
    return;
  }

  // ✅ Fetch user data
  const { data, error } = await supabase
    .from("Users")
    .select("id, Student_Name, is_assist")
    .eq("id", userID)
    .single(); // returns one object instead of array

  if (error) {
    console.error("❌ Supabase error:", error);
    return;
  }

  if (!data) {
    console.error("❌ No user found for this ID");
    window.location.href = "../../src/welcome.html";
    return;
  }

  console.log("✅ User data loaded:", data);


  // 🔹 Otherwise → stay on dashboard
  // Generate QR Code
  const qrContainer = document.getElementById("qrcode");
  if (qrContainer) {
    new QRCode(qrContainer, {
      text: `https://english-with-bakoora.vercel.app/src/attendance.html?ID=${data.id}`,
      width: 250,
      height: 250,
      colorDark: "#000000",
      colorLight: "#f0f0f0",
      correctLevel: QRCode.CorrectLevel.L
    });
  }

  // 🔹 Update UI with user info
  const userName = document.getElementById("userName");
  const ID = document.getElementById("userID");

  if (userName) userName.innerText = data.Student_Name;
  if (ID) ID.innerText = `ID: ${data.id}`;
}

// Run the script
init();
