import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userID = localStorage.getItem("User_ID")
const { data, error } = await supabase.from("Users").select().eq("id", userID)


const UN = document.getElementById("user-name");
const UE = document.getElementById("user-email");
const UP = document.getElementById("user-phone");
const UPP = document.getElementById("user-p-phone");

UN.innerHTML = data[0]['Student_Name']
UE.innerHTML = data[0]['Student_Email']
UP.innerHTML = data[0]['Student_Phone']
UPP.innerHTML = data[0]['Parent_Phone']


const LOBTN = document.getElementById("logout");
const popup = document.getElementById("cont");

const yes = document.getElementById("yes")
const no = document.getElementById("no")


LOBTN.addEventListener("click" , ()=>{
    popup.style.display = 'block'
})

no.addEventListener("click" , ()=>{
    popup.style.display = 'none'
})

yes.addEventListener("click" , ()=>{
    popup.style.display ='none'
    localStorage.removeItem('User_ID')
    window.location.href = '/src/index.html'
})
