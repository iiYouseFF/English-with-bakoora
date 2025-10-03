import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase setup
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { data, error } = await supabase.from("Users").select("*");

const userID = localStorage.getItem("User_ID");
const { data: currentUser, error: userError } = await supabase
  .from("Users")
  .select("*")
  .eq("id", userID)
  .single();

if (userError) {
  console.log(userError);
} else {
  if (currentUser["is_assist"] != true) {
    window.location.href = "/src/dashboard.html";
  } else {
    const userList = document.getElementById("user-list");

    if (error) {
      userList.innerHTML = "<p>Error loading users.</p>";
    } else {
      let userOffset = 0;
      let sessionOffset = 0;
      let attendanceOffset = 0;
      const limit = 10;

      // Load users
      async function loadUsers() {
        const { data, error } = await supabase
          .from("Users")
          .select("id, Student_Email, Student_Name")
          .range(userOffset, userOffset + limit - 1);

        if (error) {
          console.error(error);
          return;
        }

        const tbody = document.querySelector("#usersTable tbody");
        data.forEach((user) => {
          const row = `<tr>
          <td>${user.id}</td>
          <td>${user.Student_Email}</td>
          <td>${user.Student_Name}</td>
        </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });

        userOffset += limit;
      }

      // Load sessions
      async function loadSessions() {
        const { data, error } = await supabase
          .from("sessions")
          .select("id, title, date")
          .range(sessionOffset, sessionOffset + limit - 1);

        if (error) {
          console.error(error);
          return;
        }

        const tbody = document.querySelector("#sessionsTable tbody");
        data.forEach((session) => {
          const row = `<tr>
          <td>${session.id}</td>
          <td>${session.title}</td>
          <td>${session.date}</td>
        </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });

        sessionOffset += limit;
      }

      // Load attendance
      async function loadAttendance() {
        const { data, error } = await supabase
          .from("Attendance")
          .select("id, StudentID,Users(Student_Name), session_id ,sessions(title)")
          .range(attendanceOffset, attendanceOffset + limit - 1);

        if (error) {
          console.error(error);
          return;
        }

        const tbody = document.querySelector("#attendanceTable tbody");
        data.forEach((a) => {
          const row = `<tr>
          <td>${a.id}</td>
          <td>${a.StudentID}</td>
          <td>${a.Users.Student_Name}</td>
          <td>${a.session_id}</td>
          <td>${a.sessions.title}</td>
        </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });

        attendanceOffset += limit;
      }

      // Attach events
      document
        .getElementById("loadMoreUsers")
        .addEventListener("click", loadUsers);
      document
        .getElementById("loadMoreSessions")
        .addEventListener("click", loadSessions);
      document
        .getElementById("loadMoreAttendance")
        .addEventListener("click", loadAttendance);

      // Load first 10 rows initially
      loadUsers();
      loadSessions();
      loadAttendance();
    }
  }
}
