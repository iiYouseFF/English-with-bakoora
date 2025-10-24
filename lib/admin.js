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
          .select(  );

        if (error) {
          console.error(error);
          return;
        }

        const tbody = document.querySelector("#usersTable tbody");
        data.forEach((user) => {
          const row = `<tr>
          <td>${user.id}</td>
          <td>${user.Student_Email}</td>
          <td>${user.Student_Phone}</td>
          <td>${user.Parent_Phone}</td>
          <td>${user.Student_Name}</td>
          <td>${user.Student_Grade}</td>
          <td>${user.Student_Password}</td>
        </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });

        userOffset += limit;
      }

      // Load sessions
      async function loadSessions() {
        const { data, error } = await supabase
          .from("sessions")
          .select("id, title, date , record_id");

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
          <td class="actions">
          <a class="delete" href="delete.html?id=${session.id}">DELETE<a>
          <a class="edit" href="edit.html?id=${session.id}">EDIT<a>
          <a class="view" href="watch.html?vid=${session.record_id}">VIEW<a>
          </td>
        </tr>`;
          tbody.insertAdjacentHTML("beforeend", row);
        });
      }

      // Load attendance
      async function loadAttendance() {
  // Fetch attendance records
  const { data: attendance, error } = await supabase
    .from("Attendance")
    .select("id, StudentID, session_id");

  // Fetch sessions
  const { data: sessions, error: sessionsError } = await supabase
    .from("sessions")
    .select("id, title");

  // Fetch users
  const { data: users, error: usersError } = await supabase
    .from("Users")
    .select("id, Student_Name");
        console.log(attendance , sessions , users);
        
  // Error handling
  if (error || sessionsError || usersError) {
    console.error(error || sessionsError || usersError);
    return;
  }

  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = ""; // Clear old rows before inserting new ones

  attendance.forEach((a) => {
    // Find the related session
    const session = sessions.find((s) => s.id === a.session_id);
    // Find the related user
    const user = users.find((u) => u.id === a.StudentID);

    const row = `
      <tr>
        <td>${a.id}</td>
        <td>${a.StudentID}</td>
        <td>${user ? user.Student_Name : "Unknown"}</td>
        <td>${a.session_id}</td>
        <td>${session ? session.title : "Unknown"}</td>
      </tr>
    `;

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
