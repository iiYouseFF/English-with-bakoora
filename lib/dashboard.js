import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userID = localStorage.getItem("User_ID")
if (userID) {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", userID);
  console.log(data);
} else {
  console.log("No User_ID found in localStorage");
}

const { data, error } = await supabase.from("Users").select().eq("id", userID)


// توليد QR code
const userId = data[0]['id'];  // مثلًا ال id اللي جاي من Supabase

  // أنشئ QR جديد
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://english-with-bakoora.vercel.app/src/attendance.html?ID=" + userId,
    width: 300,   // العرض
    height: 300,  // الطول
    colorDark: "#000000",
    colorLight: "#f0f0f0",
    correctLevel: QRCode.CorrectLevel.H
  });

const userName = document.getElementById('userName');
userName.innerText = data[0]['Student_Name']
const ID = document.getElementById('userID');
ID.innerText += userID


