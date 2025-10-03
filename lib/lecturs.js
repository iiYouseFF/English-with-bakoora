import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userID = localStorage.getItem("User_ID")
const { data, error } = await supabase.from("Attendance")
.select("session_id,sessions(title,date,recording_url)")
.eq("StudentID", userID);
const lecturesList = document.getElementById("lectures");

console.log(data , error);

if (error) {
    lecturesList.innerHTML = "<p>Error loading lectures.</p>";  
}
else{
    data.forEach(session => {
        const card = document.createElement("div");
        card.className = "lecture-card";
        card.innerHTML = `
        <img src="https://img.youtube.com/vi/NzTEZgFEr9k/hqdefault.jpg" alt="thumbnail">
                <h2>${session['sessions']['title']}</h2>
                <h4>${session['sessions']['date']}</h4>
                <button>يلا يا قلب ابوك</button>`   
        console.log(session);
        
        lecturesList.appendChild(card);
    });
    
}

