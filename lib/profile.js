import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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
