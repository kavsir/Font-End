const USER_API = "https://67c573f6351c081993f9f25f.mockapi.io/api/vi/users";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Vui lòng nhập Email và Mật khẩu.");
            return;
        }

        const res   = await fetch(USER_API + "?email=" + encodeURIComponent(email));
        const users = await res.json();

        if (users.length === 0 || users[0].password !== password) {
            alert("Sai email hoặc mật khẩu.");
            return;
        }

        const user = users[0];

        alert("Đăng nhập thành công!");

        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            fullname: user.fullname,
            email: user.email
        }));

        window.location.href = "./index.html";
    });
});
