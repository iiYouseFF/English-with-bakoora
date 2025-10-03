import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co"
const supabase = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Snackbar for notifications
function showSnackbar(message, type = "info") {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = "";
  snackbar.classList.add("show", type);

  setTimeout(() => {
    snackbar.classList.remove("show", type);
  }, 2000);
}

// Utility: Show loading spinner
function showLoading(show = true) {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = show ? "block" : "none";
}

// Populate sessions dropdown
async function populateSessions() {
  showLoading(true);
  const Sessions = document.getElementById("Sessions");
  Sessions.innerHTML = '<option disabled selected>Loading sessions...</option>';
  const { data: sessionsData, error: sessionsError } = await supabase
    .from("sessions")
    .select()
    .order('date', { ascending: false });

  Sessions.innerHTML = '';
  if (sessionsError) {
    showSnackbar("Error fetching sessions", "error");
    Sessions.innerHTML = '<option disabled selected>Error loading sessions</option>';
  } else {
    Sessions.innerHTML = '<option disabled selected>Select a session</option>';
    sessionsData.forEach(session => {
      const option = document.createElement("option");
      option.value = session.id;
      option.textContent = `${session.title} - ${new Date(session.date).toLocaleDateString()}`;
      Sessions.appendChild(option);
    });
  }
  showLoading(false);
}

// Check assistant status
async function isAssistant() {
  const AssistantID = localStorage.getItem("User_ID");
  const { data, error } = await supabase.from("Users").select().eq("id", AssistantID);
  if (error || !data || data.length === 0) return false;
  return data[0].is_assist === true;
}

// Display student name
async function displayStudentName(studentId) {
  const Student_Name = document.getElementById("Student-Name");
  Student_Name.textContent = "Student: ";
  const { data, error } = await supabase.from("Users").select().eq("id", studentId);
  if (error || !data || data.length === 0) {
    Student_Name.textContent += "User Not Found";
    showSnackbar("User Not Found", "error");
    setTimeout(() => {window.location.href = "../src/dashboard.html";}, 3000);
  } else {
    Student_Name.textContent += data[0].Student_Name;
  }
}
// Handle attendance submission
async function handleAttendance(studentId) {
  const BTN = document.getElementById("Attend");
  const Sessions = document.getElementById("Sessions");
  BTN.addEventListener("click", async (event) => {
    event.preventDefault();
    const selectedSessionId = Sessions.value;
    if (!selectedSessionId || selectedSessionId === "Select a session") {
      showSnackbar('Please select a session', 'error');
      return;
    }
    showLoading(true);
    const { data: existingAttendance } = await supabase
      .from("Attendance")
      .select()
      .eq("session_id", selectedSessionId)
      .eq("StudentID", studentId);

    if (existingAttendance && existingAttendance.length > 0) {
      showSnackbar('Attendance already recorded for this session', 'error');
    } else {
      const { error } = await supabase.from("Attendance").insert([
        { session_id: selectedSessionId, StudentID: studentId }
      ]);
      if (error) {
        showSnackbar('Error recording attendance', 'error');
      } else {
        showSnackbar('Attendance recorded successfully', 'success');
      }
    }
    showLoading(false);
  });
}

// Main page logic
(async function main() {
  showLoading(true);
  await populateSessions();
  if (await isAssistant()) {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("ID");
    await displayStudentName(studentId);
    handleAttendance(studentId);
  } else {
    alert("You are not authorized to access this page.");
    window.location.href = "../src/dashboard.html";
  }
  showLoading(false);
})();