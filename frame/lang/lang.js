document.addEventListener("DOMContentLoaded", () => {
    // Load language JSON
    fetch("/frame/lang/index.json")  
        .then(res => res.json())
        .then(langData => {
            let currentLang = loadLanguage();

            applyLanguage(langData, currentLang);

            // Khi bấm nút đổi ngôn ngữ
            document.querySelectorAll(".lang-flag").forEach(flag => {
                flag.addEventListener("click", () => {
                    const selectedLang = flag.getAttribute("data-lang");

                    saveLanguage(selectedLang);
                    applyLanguage(langData, selectedLang);
                });
            });
        });
});

// Lưu ngôn ngữ người dùng
function saveLanguage(lang) {
    localStorage.setItem("lang", lang);
}

// Tải ngôn ngữ, nếu chưa có → lấy ngôn ngữ trình duyệt
function loadLanguage() {
    let lang = localStorage.getItem("lang");

    if (!lang) {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.includes("vi")) lang = "vn";
        else lang = "en";
        saveLanguage(lang);
    }
    return lang;
}

// Áp dụng ngôn ngữ cho toàn trang
function applyLanguage(langData, lang) {
    // Text bình thường
    document.querySelectorAll("[data-lang-key]").forEach(el => {
        const key = el.getAttribute("data-lang-key");
        if (langData[lang][key]) {
            el.innerHTML = langData[lang][key];
        }
    });

    // Placeholder trong input
    document.querySelectorAll("[data-lang-placeholder]").forEach(input => {
        const key = input.getAttribute("data-lang-placeholder");
        if (langData[lang][key]) {
            input.placeholder = langData[lang][key];
        }
    });
}
