import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const params = new URLSearchParams(window.location.search);
const iframe = document.getElementById("iframe");
const videoId = params.get("vid");
console.log( videoId);

if (videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
}

const {data , error} = await supabase.from('sessions').select('title , date').eq('record_id' , videoId).single();
if (error) {
    console.log(error);
    
} else {
    console.log(data);
    
    document.getElementById("title").innerText = data.title;
    document.getElementById("date").innerText = new Date(data.date).toLocaleDateString();
}