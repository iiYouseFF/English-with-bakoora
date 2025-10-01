import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function showSnackbar(message, type = "info") {
  let snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;

  // إزالة الكلاسات القديمة
  snackbar.className = "";
  snackbar.classList.add("show", type);

  // بعد 3 ثواني يختفي
  setTimeout(() => {
    snackbar.classList.remove("show", type);
  }, 2000);
}



const BTN = document.getElementById("submit");
BTN.addEventListener("click", async (e) => {
    event.preventDefault();
    const SessionName = document.getElementById("sessionName").value;
    const SessionDate = document.getElementById("sessionDate").value;
    const SessionLink = document.getElementById("sessionLink").value;


    if (SessionName && SessionDate && SessionLink) {
        const {data, error} = await supabase.from("sessions").insert([
            {
                title: SessionName,
                date: SessionDate,
                recording_url: SessionLink
            }
        ]);
        showSnackbar('Session added successfully', 'success');
    }
    else {
        showSnackbar('Please fill in all fields', 'error');
    }
});
