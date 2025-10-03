import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


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

function getYouTubeID(url) {
  try {
    let video_id = null;

    // Case 1: https://www.youtube.com/watch?v=VIDEOID
    let regExp1 = /(?:\?v=|&v=)([a-zA-Z0-9_-]{11})/;

    // Case 2: https://youtu.be/VIDEOID
    let regExp2 = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

    // Case 3: https://www.youtube.com/embed/VIDEOID
    let regExp3 = /embed\/([a-zA-Z0-9_-]{11})/;

    if (regExp1.test(url)) {
      video_id = url.match(regExp1)[1];
    } else if (regExp2.test(url)) {
      video_id = url.match(regExp2)[1];
    } else if (regExp3.test(url)) {
      video_id = url.match(regExp3)[1];
    }

    return video_id;
  } catch (err) {
    return null;
  }
}

const BTN = document.getElementById("submit");
BTN.addEventListener("click", async (e) => {
    event.preventDefault();
    const SessionName = document.getElementById("sessionName").value;
    const SessionDate = document.getElementById("sessionDate").value;
    const SessionLink = document.getElementById("sessionLink").value;
    const videoID = getYouTubeID(SessionLink);

    if (SessionName && SessionDate && SessionLink) {
        const {data, error} = await supabase.from("sessions").insert([
            {
                title: SessionName,
                date: SessionDate,
                recording_url: SessionLink,
                record_id: videoID
            }
        ]);
        showSnackbar('Session added successfully', 'success');
        window.location.href = "../src/dashboard.html";
    }
    else {
        showSnackbar('Please fill in all fields', 'error');
    }
});
