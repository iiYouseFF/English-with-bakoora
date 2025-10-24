import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ========================
// 🔗 Supabase credentials
// ========================
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========================
// 🔸 Selectors
// ========================
const lecturesList = document.getElementById("lectures");
const userID = localStorage.getItem("User_ID");

// ========================
// 🔹 Validate userID
// ========================
if (!userID) {
  console.error("❌ User_ID not found in localStorage");
  window.location.href = "../../src/welcome.html";
  throw new Error("User_ID missing");
}

// ========================
// 🔹 Fetch user role
// ========================
const { data: userData, error: userError } = await supabase
  .from("Users")
  .select("is_assist")
  .eq("id", userID)
  .single();

if (userError || !userData) {
  console.error("Error fetching user:", userError);
  lecturesList.innerHTML = "<p>Error loading user data.</p>";
  throw new Error("User fetch failed");
}

const isAssist = userData.is_assist;

let sessionsData = [];
let sessionsError = null;

// ========================
// 👨‍🏫 Admin view
// ========================
if (isAssist === true) {
  const { data, error } = await supabase
    .from("sessions")
    .select("id, title, date, recording_url, record_id")
    .order("date", { ascending: false });

  sessionsData = data || [];
  sessionsError = error;

  console.log("from admin", data, error);
} else {
  // 👨‍🎓 Student view
  const { data: attendanceData, error: attendanceError } = await supabase
    .from("Attendance")
    .select("session_id")
    .eq("StudentID", userID);

  if (attendanceError) {
    console.error("Error fetching attendance:", attendanceError);
    lecturesList.innerHTML = "<p>Error loading attendance.</p>";
    throw attendanceError;
  }

  if (!attendanceData || attendanceData.length === 0) {
    lecturesList.innerHTML = "<p>No attended lectures found.</p>";
  } else {
    const sessionIDs = attendanceData.map((item) => item.session_id);

    const { data, error } = await supabase
      .from("sessions")
      .select("id, title, date, recording_url, record_id")
      .in("id", sessionIDs)
      .order("date", { ascending: false });

    sessionsData = data || [];
    sessionsError = error;

    console.log("from student", attendanceData, data, error);
  }
}

// ========================
// 🔹 Handle errors
// ========================
if (sessionsError) {
  console.error("Error fetching sessions:", sessionsError);
  lecturesList.innerHTML = "<p>Error loading lectures.</p>";
} else if (sessionsData.length === 0) {
  lecturesList.innerHTML = "<p>No lectures found.</p>";
} else {
  // ========================
  // 🎥 Render lectures
  // ========================
  sessionsData.forEach((session) => {
    const card = document.createElement("div");
    card.className = "lecture-card";

    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${session.record_id}/hqdefault.jpg" alt="thumbnail">
      <h2>${session.title}</h2>
      <h4>${new Date(session.date).toLocaleDateString()}</h4>
      <button class="watch-btn">يلا يا قلب ابوك</button>
    `;

    const btn = card.querySelector(".watch-btn");
    btn.addEventListener("click", () => {
      watch(session.record_id , userID , session.id);
    });

    lecturesList.appendChild(card);
  });
}

// ========================
// ▶️ Watch function
// ========================
async function watch(videoID, userID, sessionID) {
  // 1️⃣ Check if there is already a view record for this student & session
  const { data, error } = await supabase
    .from("sessionViews")
    .select("id, views_count")
    .eq("Student_id", userID)
    .eq("session_id", sessionID)
    .single(); // return only one record

  if (error && error.code !== "PGRST116") {
    console.error("Error checking session views:", error);
    return;
  }

  // 2️⃣ If no record found → create it with views_count = 1
  if (!data) {
    const { error: insertError } = await supabase
      .from("sessionViews")
      .insert([
        {
          Student_id: userID,
          session_id: sessionID,
          views_count: 1,
        },
      ]);

    if (insertError) {
      console.error("Error inserting new view record:", insertError);
      return;
    }

    console.log("First time watching — record created.");
    window.location.href = `./watch.html?vid=${videoID}`;
    return;
  }

  // 3️⃣ If record exists → check view count
  if (data.views_count < 3) {
    const { error: updateError } = await supabase
      .from("sessionViews")
      .update({ views_count: data.views_count + 1 })
      .eq("id", data.id);

    if (updateError) {
      console.error("Error updating views:", updateError);
      return;
    }

    console.log(`View ${data.views_count + 1}/3`);
    window.location.href = `./watch.html?vid=${videoID}`;
  } else {
    alert("You Have Reached 3 Views of This Session")
    const {data:deleteSession , error:deleteError} = await supabase.from("Attendance").delete().eq("session_id" , sessionID).eq("StudentID" , userID).single();
    const {data:response , error:responseError} = await supabase.from("sessionViews").delete().eq("session_id" , sessionID).eq("Student_id" , userID);
    console.log(response , responseError);
    window.location.reload(true);
  }
}

