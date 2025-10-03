import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


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