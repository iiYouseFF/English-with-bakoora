const userID = localStorage.getItem("User_ID")
if (userID == null) {
    window.location.href = '/src/welcome.html'
}
else {
    window.location.href = '/src/dashboard.html'
}
