import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function showSnackbar(message, type = "info") {
  let snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;

  snackbar.className = "";
  snackbar.classList.add("show", type);

  setTimeout(() => {
    snackbar.classList.remove("show", type);
  }, 2000);
}



const resetBTN = document.getElementById("reset-btn");

resetBTN.addEventListener("click" ,async ()=>{
    const email = document.getElementById('SE').value;
    const NP = document.getElementById("NP").value;
    const {data,error} = await supabase.from("Users").select().eq("Student_Email" , email).single();
    if(email != "" && NP != ""){
        if(error){
        showSnackbar("ERROR,Please Try again later" , "error")
    }
    else{
        const uid = data['id'];
        const {data:update , error:updateError} = await supabase.from("Users").update({"Student_Password" : NP}).eq("id" , uid)
        if(updateError){
            showSnackbar("ERROR,Please Try again later" , "error")
        }
        else{
            showSnackbar("Password reset successfully" , "success")
            window.location.href= "../src/login.html"
        }
    }
    }
    else{
        showSnackbar("Please Fill The Requirements" , "error")
    }   

})