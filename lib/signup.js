import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const SUPABASE_URL = "https://dgchzirptreongikvicj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnY2h6aXJwdHJlb25naWt2aWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDk3MTQsImV4cCI6MjA3NDIyNTcxNH0.eOxiiXlTBCyIpVaMtdA_e9W-kjSgnlJPTpuiYYiZ8kI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadLectures() {
  // ✅ Get the logged-in user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error getting user:', userError.message)
    return
  }
  if (!user) {
    console.log('No user logged in')
    return
  }

  // ✅ Get the user role from Users table
  const { data: userData, error: roleError } = await supabase
    .from('Users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (roleError) {
    console.error('Error getting role:', roleError.message)
    return
  }

  let sessions
  if (userData.role === 'admin') {
    // ✅ Admin sees all sessions
    const { data, error } = await supabase
      .from('Sessions')
      .select('*')
      .order('date', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching all sessions:', error.message)
      return
    }
    sessions = data
  } else {
    // ✅ Normal user sees only attended sessions
    const { data, error } = await supabase
      .from('Attendance')
      .select('session_id, Sessions(*)')  // join with Sessions table
      .eq('user_id', user.id)
      .order('Sessions.date', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching attended sessions:', error.message)
      return
    }

    // Extract the sessions from the join
    sessions = data.map(row => row.Sessions)
  }

  // ✅ Render sessions in page
  const container = document.getElementById('lectures-container')
  container.innerHTML = ''

  if (!sessions || sessions.length === 0) {
    container.innerHTML = '<p>No sessions found.</p>'
    return
  }

  sessions.forEach(session => {
    const div = document.createElement('div')
    div.className = 'session-card'
    div.innerHTML = `
      <h3>${session.title}</h3>
      <p>Date: ${new Date(session.date).toLocaleDateString()}</p>
      <p>Description: ${session.description || 'No description'}</p>
    `
    container.appendChild(div)
  })
}

// Run on page load
loadLectures()
