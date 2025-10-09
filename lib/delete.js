import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase setup
const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id) {
    const response = await supabase.from('sessions').delete().eq('id' , id);
    const views = await supabase.from('sessionViews').delete().eq('session_id' , id);   
    const attendance = await supabase.from('Attendance').delete().eq('session_id' , id) 
    window.location.href = './admin.html';

}