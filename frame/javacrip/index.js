document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const btn = document.getElementById("toggleDark");

    // Load trạng thái đã lưu
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        btn.textContent = "Light";
    }

    // GỌI KHI TRANG VỪA LOAD
    applyDarkMode();

    btn.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            btn.textContent = "Light";
        } else {
            localStorage.setItem("theme", "light");
            btn.textContent = "Dark";
        }

        // GỌI KHI CLICK
        applyDarkMode();
    });
});

const sliderImg = document.getElementById("slider-img");

function applyDarkMode() {
    sliderImg.classList.add("fade-out");  //  mờ hình ảnh

    setTimeout(() => {
        if (document.body.classList.contains("dark")) {
            sliderImg.src = "/frame/Storage_Img/slider-img/sider-index-dark.jpg";
        } else {
            sliderImg.src = "/frame/Storage_Img/slider-img/silder-index-img.jpg";
        }

        sliderImg.classList.remove("fade-out");
    }, 300); 
}
