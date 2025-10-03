import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const header = document.getElementById("header");
const userID = localStorage.getItem("User_ID")
const { data: User, error: userError } = await supabase.from("Users").select().eq("id", userID);
if (userError) {
    console.log(userError);
}
else {
    if (User[0]['is_assist'] == true) {
        header.innerHTML = `
        <h1>Admin Panel</h1>
        <nav>
          <ul id="navLinks">
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="sessions.html">Add Session</a></li>
            <li><a href="lectures.html">Lectures</a></li>
            <li><a href="admin.html">Admin</a></li>
          </ul>
          <div class="profile-icon" id="profile-icon"></div>
          <div class="hamburger" id="hamburger">☰</div>
        </nav>
        `
    }
    else {
        header.innerHTML = `
            <div class="title">
                <h1>Simple English with bakoora</h1>
            </div>
            <nav>
                <ul id="navLinks">
                    <li>
                        <a href="dashboard.html">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="lectures.html">
                            Lectures
                        </a>
                    </li>
                </ul>
                <div class="profile-icon" id="profile-icon"></div>
                <div class="hamburger" id="hamburger">☰</div>
            </nav>`
    }
    const profileIcon = document.getElementById("profile-icon");
    if (profileIcon && User[0]['Student_Name']) {
        profileIcon.innerText = User[0]['Student_Name'].charAt(0).toUpperCase();
        profileIcon.addEventListener("click", () => {
            window.location.href = "/src/profile.html";
        });

        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");

        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
}