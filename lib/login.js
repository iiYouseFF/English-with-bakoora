import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginBtn = document.getElementById("login");


function showSnackbar(message, type = "info") {
  let snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;

  // إزالة الكلاسات القديمة
  snackbar.className = "";
  snackbar.classList.add("show", type);

  // بعد 3 ثواني يختفي
  setTimeout(() => {
    snackbar.classList.remove("show", type);
  }, 2000);
}

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("SE").value.trim();
  const password = document.getElementById("PW").value.trim();

  if (!email || !password) {
    console.log("Please fill in all fields.");
    showSnackbar('Empty Input Fields')
    return;
  }

  const { data, error } = await supabase.from('Users')
    .select()
    .eq('Student_Email' , email)
    .eq('Student_Password' , password)
    .single();
  console.log(data , error);

  if (error){
    console.log("Data is incorrect")
    showSnackbar('Data is incorrect', 'error')
  }
  else{
    console.log("Logged in Successfully!");
    localStorage.setItem('User_ID', data.id)
    showSnackbar('Logged in successfully', 'success')
    setTimeout(() => {
      window.location.href = '/src/dashboard.html'
    }, 3000);
  }
  // if (data[0]["Student_Password"] == password.value.trim() && data[0]["Student_Email"] == email.value.trim()) {
  //   console.log("Logged in Successfully!");
  //   localStorage.setItem('User_ID', data[0]['id'])
  //   showSnackbar('Logged in successfully', 'success')
  //   setTimeout(() => {
  //     window.location.href = '/src/dashboard.html'
  //   }, 3000);
  // }
  // else {
  //   console.log(data[0]['id']);
    
  //   console.log("Data is incorrect")
  //   showSnackbar('Data is incorrect', 'error')
  // }
});
