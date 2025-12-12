// Chuyển đổi giao diện sáng/tối
document.addEventListener("DOMContentLoaded", function () { 
    const Thantrang = document.body;
    const Nutchuyenchedo = document.getElementById("toggleDark");

    if (localStorage.getItem("theme") === "dark") {
        Thantrang.classList.add("dark");
        Nutchuyenchedo.textContent = "Light";
    }

    Capnhatchedotoisang();

    Nutchuyenchedo.addEventListener("click", () => {
        Thantrang.classList.toggle("dark");

        if (Thantrang.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            Nutchuyenchedo.textContent = "Light";
        } else {
            localStorage.setItem("theme", "light");
            Nutchuyenchedo.textContent = "Dark";
        }

        Capnhatchedotoisang();
    });
});

// Thay đổi hình slider theo giao diện
const Anhslider = document.getElementById("slider-img");

function Capnhatchedotoisang() {
    Anhslider.classList.add("fade-out");

    setTimeout(() => {
        if (document.body.classList.contains("dark")) {
            Anhslider.src = "/frame/Storage_Img/slider-img/sider-index-dark.jpg";
        } else {
            Anhslider.src = "/frame/Storage_Img/slider-img/silder-index-img.jpg";
        }

        Anhslider.classList.remove("fade-out");
    }, 300);
}
// Lấy từ API về đây
var Duongdanapi = "https://67c573f6351c081993f9f25f.mockapi.io/api/vi/name";
var Danhsachsanpham = [];

function Taisanphambanchay() {
    var Khunghienthi = document.getElementById("bestSale-list");

    fetch(Duongdanapi)
        .then(Phanhoi => Phanhoi.json())
        .then(Dulieu => {

            Danhsachsanpham = Dulieu;

            var Chuoihtml = "";

            for (var i = 0; i < 3 && i < Dulieu.length; i++) {
                var Sp = Dulieu[i];

                var Sosao = Math.round(Sp.rating);
                if (Sosao > 5) Sosao = 5;

                var Chuoisao = "";
                for (var s = 0; s < Sosao; s++) {
                    Chuoisao += '<i class="fa-solid fa-star"></i>';
                }

                Chuoihtml +=
                '<div class="col-lg-4 col-md-6 col-sm-12" data-id="' + Sp.Id + '">' +
                    '<div class="product-card">' +
                        '<a href="#"><img src="' + Sp.img + '" alt="' + Sp.name + '"></a>' + 
                        '<a href="#"><h3 class="product-title">' + Sp.name + '</h3></a>' +
                        '<div class="buy">' +
                            '<p class="product-price">' + Number(Sp.price).toLocaleString("vi-VN") + 'đ</p>' +
                            '<a onclick="Themvaoqanly(\'' + Sp.Id + '\', true)" class="btn-buy">Mua ngay</a>' +
                        '</div>' +

                        '<div class="product-rating">' +
                            Chuoisao +
                            '<button class="fav-btn" onclick="Themvaoqanly(\'' + Sp.Id + '\', false, this)">' +
                                '<i class="fa-solid fa-heart fav-heart"></i>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }

            Khunghienthi.innerHTML = Chuoihtml;
        })
        .catch(Loi => console.log("Lỗi tải dữ liệu:", Loi));
}
Taisanphambanchay();

// Thêm yêu thích
function Themvaoqanly(Idsanpham, Chuyentrangquanly, Nutbam) {
    var Sanpham = Danhsachsanpham.find(Sp => Sp.Id == Idsanpham);

    if (!Sanpham) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    var Danhsach = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    var Vitri = Danhsach.findIndex(Sp => Sp.Id == Idsanpham);
// nút trái tim
    if (!Chuyentrangquanly) {

        if (Vitri === -1) {
            Danhsach.push(Sanpham);
            localStorage.setItem("favoriteProducts", JSON.stringify(Danhsach));
            if (Nutbam) Nutbam.classList.add("is-favorite");
            alert("Đã thêm vào yêu thích!");
        } else {
            Danhsach.splice(Vitri, 1);
            localStorage.setItem("favoriteProducts", JSON.stringify(Danhsach));
            if (Nutbam) Nutbam.classList.remove("is-favorite");
            alert("Đã xoá khỏi yêu thích!");
        }

        return;
    }

// nút mua ngay
    if (Vitri === -1) {
        Danhsach.push(Sanpham);
        localStorage.setItem("favoriteProducts", JSON.stringify(Danhsach));
    }

    window.location.href = "/frame/View/manage.html";
}
// ======================= LỌC SẢN PHẨM YÊU THÍCH / TẤT CẢ ==========================
var Nutchixemyeuthich = document.getElementById("btnShowFavorites");
var Nutxemtatca = document.getElementById("btnShowAll");

if (Nutchixemyeuthich) {
    Nutchixemyeuthich.addEventListener("click", function () {

        var Danhsachyeuthich = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
        var Danhsachid = Danhsachyeuthich.map(Sp => Sp.Id);

        var Tatcasanpham = document.querySelectorAll("#bestSale-list > div");

        Tatcasanpham.forEach(Item => {
            var Id = Item.getAttribute("data-id");

            if (Danhsachid.includes(Id)) Item.style.display = "block";
            else Item.style.display = "none";
        });
    });
}

if (Nutxemtatca) {
    Nutxemtatca.addEventListener("click", function () {
        document.querySelectorAll("#bestSale-list > div").forEach(Item => {
            Item.style.display = "block";
        });
    });
}
//Tìm kiếm
const Otimkiem = document.getElementById("searchInput");
const Nuttimkiem = document.getElementById("btnSearch");

function Loctheoten() {
    const Tukhoa = Otimkiem.value.trim().toLowerCase();

    document.querySelectorAll("#bestSale-list > div").forEach(Item => {
        const Tensp = Item.querySelector(".product-title")?.textContent.toLowerCase() || "";
        Item.style.display = !Tukhoa || Tensp.includes(Tukhoa) ? "" : "none";
    });
}

if (Otimkiem && Nuttimkiem) {
    Nuttimkiem.onclick = Loctheoten;
    Otimkiem.onkeyup = e => e.key === "Enter" && Loctheoten();
}
