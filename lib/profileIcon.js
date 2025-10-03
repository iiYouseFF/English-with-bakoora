import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userID = localStorage.getItem("User_ID")
const { data, error } = await supabase.from("Users").select().eq("id", userID)

function profileIcon() {
  const name = data[0]['Student_Name'];
  const firstLetter = name.charAt(0).toUpperCase();

  const icons = document.getElementsByClassName("profile-icon");
  for (let i = 0; i < icons.length; i++) {
    icons[i].innerHTML = firstLetter;
  }

  const icon2 = document.getElementById("profile-icon");
  if (icon2) {
    icon2.addEventListener("click", () => {
      console.log("clicked");
      window.location.href = "/src/profile.html";
    });
  }
}

profileIcon()