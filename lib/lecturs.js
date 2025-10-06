import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const lecturesList = document.getElementById("lectures");
const userID = localStorage.getItem("User_ID");

// نجيب دور المستخدم
const { data: User, error: userError } = await supabase
  .from("Users")
  .select("is_assist")
  .eq("id", userID);

if (userError) {
  console.log(userError);
} else if (User && User.length > 0) {
  const isAssist = User[0].is_assist;

  let data, error;

  if (isAssist === true) {
    // Admin → يجيب كل الـ sessions
    ({ data, error } = await supabase
      .from("sessions")
      .select("id, title, date, recording_url, record_id"));
      console.log("from admin");
      
      console.log(data ,error);
      
  } else {
    // Student → يجيب بس اللي حضرها
    ({ data, error } = await supabase
      .from("Attendance")
      .select("session_id, sessions(id, title, date, recording_url, record_id)")
      .eq("StudentID", userID));
      console.log("from student");
      
        console.log(data , error);
  }

  if (error) {
    console.log(error);
    lecturesList.innerHTML = "<p>Error loading lectures.</p>";
  } else {
    data.forEach((session) => {
        const s = isAssist ? session : session.sessions;

      const card = document.createElement("div");
      card.className = "lecture-card";

      card.innerHTML = `
          <img src="https://img.youtube.com/vi/${s.record_id}/hqdefault.jpg" alt="thumbnail">
          <h2>${s.title}</h2>
          <h4>${new Date(s.date).toLocaleDateString()}</h4>
          <button class="watch-btn">يلا يا قلب ابوك</button>`;   

      const btn = card.querySelector(".watch-btn");
      btn.addEventListener("click", () => {
        watch(s.record_id);
      });

      lecturesList.appendChild(card);
    });
  }
}

function watch(videoID) {
  window.location.href = `watch.html?vid=${videoID}`;
}
