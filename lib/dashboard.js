import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co"
const supabase = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const userID = localStorage.getItem("User_ID")
const { data, error } = await supabase.from("Users").select().eq("id", userID)








// توليد QR code
const userId = data[0]['id'];  // مثلًا ال id اللي جاي من Supabase

  // أنشئ QR جديد
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://iiyouseff.github.io/English-with-bakoora/src/attendance.html?ID=" + userId,
    width: 200,   // العرض
    height: 200,  // الطول
    colorDark: "#000000",
    colorLight: "#f0f0f0",
    correctLevel: QRCode.CorrectLevel.H
  });

const userName = document.getElementById('userName');
userName.innerText = data[0]['Student_Name']
const ID = document.getElementById('userID');
ID.innerText += userID


