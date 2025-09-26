import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://dgchzirptreongikvicj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI')

const BTN = document.getElementById("signup");

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

BTN.addEventListener('click', async () => {
  const SN = document.getElementById("SN").value;
  const SG = document.getElementById("SG").value;
  const SP = document.getElementById("SP").value;
  const PP = document.getElementById("PP").value;
  const SE = document.getElementById("SE").value;
  const Password = document.getElementById("Password").value;
  const errors = [];


  if (SN.length < 3) {
    errors.push("Student name must be at least 3 characters.");
  }

  // Grade
  if (SG === "" || SG === "Select Grade") {
    errors.push("Please select a grade.");
  }

  // Phone check
  if (SP == "" || SP.length < 11) {
    errors.push("Enter a valid student phone number (10-15 digits).");
  }
  if (SP == "" || SP.length < 11) {
    errors.push("Enter a valid parent phone number (10-15 digits).");
  }

  // Email check
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(SE)) {
    errors.push("Enter a valid email address.");
  }

  // Password
  if (Password.length < 6) {
    errors.push("Password must be at least 6 characters.");

  }

  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i++) {
      console.log((errors[i]));
      showSnackbar(errors[i], "error");
    }
  }
  else {
    const { data, error } = await supabase.from('Users').insert({
      Student_Name: SN,
      Student_Grade: SG,
      Student_Phone: SP,
      Parent_Phone: PP,
      Student_Email: SE,
      Student_Password: Password
    })
    showSnackbar("Signed Up Successfully!", 'success')
    setTimeout(() => {
      window.location.href = '/src/dashboard.html'
    }, 3000)
    const { userdata, usererror } = await supabase.from('Users')
      .select()
    localStorage.setItem('User_ID', userdata[0]['id'])
    if (error != null) {
      alert(error)
    }
  }
})
