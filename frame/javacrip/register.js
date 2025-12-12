const USER_API = "https://67c573f6351c081993f9f25f.mockapi.io/api/vi/users";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const agreeCheckbox = document.getElementById("flexCheckDeafault");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const fullname  = document.getElementById("FullName").value.trim();
        const email     = document.getElementById("email").value.trim();
        const password  = document.getElementById("password").value;
        const password2 = document.getElementById("password_confirmation").value;

        if (!fullname || !email || !password || !password2) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        if (!isValidEmail(email)) {
            alert("Email không đúng định dạng. Ví dụ: ten@gmail.com");
            return;
        }
        if (password !== password2) {
            alert("Mật khẩu và xác nhận mật khẩu không trùng nhau.");
            return;
        }
        if (!agreeCheckbox.checked) {
            alert("Bạn cần đồng ý với Chính sách và Điều khoản trước khi đăng ký.");
            return;
        }
        await fetch(USER_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password })
        });
        alert("Đăng ký thành công!");
        window.location.href = "./login.html";
    });
});
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
