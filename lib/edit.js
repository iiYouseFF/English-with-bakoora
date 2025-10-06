import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const SessionName = document.getElementById("sessionName");
const SessionDate = document.getElementById("sessionDate");
const SessionLink = document.getElementById("sessionLink");
const submitBTN = document.getElementById("submit");
const {data , error} = await supabase.from('sessions').select().eq('id' , id )
console.log(data , error);

SessionName.value = data[0]['title'];
SessionDate.value = data[0]['date'];
SessionLink.value = data[0]['recording_url'];


submitBTN.addEventListener("click" ,  async ()=>{
    const SessionName = document.getElementById("sessionName").value;
    const SessionDate = document.getElementById("sessionDate").value;
    const SessionLink = document.getElementById("sessionLink").value;

    const { error } = await supabase
    .from('sessions')
    .update({ title: SessionName, date: SessionDate , recording_url: SessionLink })
    .eq('id' , id)

    window.location.href = './admin.html';
    
})

