import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const userID = localStorage.getItem("User_ID")
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co"
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const { data, error } = await supabase.from('Users').select().eq('id', userID).single();
if (error) {
    console.log(error);
}
else {
    console.log(data['is_assist']);
    if (data['is_assist'] == true) {
        window.location.href = '../../src/admin.html'
    }
    else {
        if (userID == null) {
            window.location.href = '../../src/welcome.html'
        }
        else {
            window.location.href = '../../src/dashboard.html'
        }
    }
}

