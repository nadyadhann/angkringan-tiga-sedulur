<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Food Stall Manager</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- Login Page -->
<div id="loginPage" class="login-page">
    <!-- Logo outside login box -->
    <img src="pict\logo.jpeg" alt="Login Logo" class="login-logo">

    <div class="login-box">
        <h2>Angkringan Tiga Sedulur</h2>
        <form onsubmit="login(event)">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Enter username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>

    <div id="loginError" class="login-error"></div>
</div>

<script>
function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.token) {
      // ❌ jangan alert
      // 👉 pakai UI error kamu sendiri
      document.getElementById("loginError").innerText =
        "Nama Pengguna dan Kata Sandi Tidak Valid!";
      document.getElementById("loginError").style.display = "block";
      return;
    }

    // 🔑 INI YANG WAJIB ADA
    localStorage.setItem("token", data.token);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(data.user));

    // redirect
    window.location.href = "dashboard.html";
  })
  .catch(() => {
    document.getElementById("loginError").innerText =
      "Gagal terhubung ke server";
    document.getElementById("loginError").style.display = "block";
  });
}
</script>
</body>
</html>
