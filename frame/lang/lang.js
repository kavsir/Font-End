document.addEventListener("DOMContentLoaded", () => {
    // Load file ngon ngu JSON
    fetch("/frame/lang/index.json")  
        .then(Phanhoi => Phanhoi.json())
        .then(Dulieungonngu => {
            let Ngonnguhientai = Taingonngu();

            Apdungngonngu(Dulieungonngu, Ngonnguhientai);

            // Khi bam nut doi ngon ngu
            document.querySelectorAll(".lang-flag").forEach(Co => {
                Co.addEventListener("click", () => {
                    const Ngonnguduocchon = Co.getAttribute("data-lang");

                    Luungonngu(Ngonnguduocchon);
                    Apdungngonngu(Dulieungonngu, Ngonnguduocchon);
                });
            });
        });
});

// Luu ngon ngu nguoi dung
function Luungonngu(Ngonngu) {
    localStorage.setItem("lang", Ngonngu);
}

// Tai ngon ngu, neu chua co → lay ngon ngu trinh duyet
function Taingonngu() {
    let Ngonngu = localStorage.getItem("lang");

    if (!Ngonngu) {
        const Ngonngutruycap = navigator.language.toLowerCase();
        if (Ngonngutruycap.includes("vi")) Ngonngu = "vn";
        else Ngonngu = "en";
        Luungonngu(Ngonngu);
    }
    return Ngonngu;
}

// Ap dung ngon ngu cho toan trang
function Apdungngonngu(Dulieungonngu, Ngonngu) {
    // Text binh thuong
    document.querySelectorAll("[data-lang-key]").forEach(Phantu => {
        const Khoa = Phantu.getAttribute("data-lang-key");
        if (Dulieungonngu[Ngonngu][Khoa]) {
            Phantu.innerHTML = Dulieungonngu[Ngonngu][Khoa];
        }
    });

    // Placeholder trong input
    document.querySelectorAll("[data-lang-placeholder]").forEach(Oinput => {
        const Khoa = Oinput.getAttribute("data-lang-placeholder");
        if (Dulieungonngu[Ngonngu][Khoa]) {
            Oinput.placeholder = Dulieungonngu[Ngonngu][Khoa];
        }
    });
}
