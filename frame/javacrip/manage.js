// Lấy danh sách yêu thích từ localStorage
function Laydanhsachyeuthich() {
    var Chuoi = localStorage.getItem("favoriteProducts");
    if (!Chuoi) return [];
    try {
        return JSON.parse(Chuoi);
    } catch (E) {
        return [];
    }
}
// Lưu lại danh sách vào localStorage
function Luudanhsachyeuthich(Danhsach) {
    localStorage.setItem("favoriteProducts", JSON.stringify(Danhsach));
}
// load danh sách yêu thích ra bảng
function Loaddanhsachyeuthich() {
    var Bangnoidung = document.getElementById("productTableBody");
    if (!Bangnoidung) return;

    var Danhsach = Laydanhsachyeuthich();

    if (Danhsach.length === 0) {
        Bangnoidung.innerHTML =
            "<tr><td colspan='6' class='text-center'>Chưa có sản phẩm yêu thích</td></tr>";
        return;
    }

    var Chuoihtml = "";

    for (var I = 0; I < Danhsach.length; I++) {
        var Sp = Danhsach[I];
        var Soluong = Sp.quantity || 1; // mặc định 1

        Chuoihtml +=
            "<tr>" +
                "<td class='text-center'>" + Sp.Id + "</td>" +
                "<td class='text-center'><img src='" + Sp.img + "' width='80' class='rounded'></td>" +
                "<td>" + Sp.name + "</td>" +
                "<td class='text-end'>" + Number(Sp.price).toLocaleString('vi-VN') + "đ</td>" +
                "<td class='text-center'>" + Soluong + "</td>" +
                "<td class='text-center'>" +
                    "<div class='d-flex flex-column align-items-center gap-1'>" +
                        "<button class='btn btn-success btn-sm w-100' onclick='Muangay(\"" + Sp.Id + "\")'>Mua ngay</button>" +
                        "<button class='btn btn-warning btn-sm w-100' onclick='Suasoluong(\"" + Sp.Id + "\")'>Sửa SL</button>" +
                        "<button class='btn btn-danger  btn-sm w-100' onclick='Xoayeuthich(\"" + Sp.Id + "\")'>Xóa</button>" +
                    "</div>" +
                "</td>" +
            "</tr>";
    }

    Bangnoidung.innerHTML = Chuoihtml;
}
// Điều chỉnh về số lượng
function Suasoluong(Id) {
    var Danhsach = Laydanhsachyeuthich();
    if (Danhsach.length === 0) return;

    var Vitri = Danhsach.findIndex(function (Sp) { return Sp.Id == Id; });
    if (Vitri === -1) {
        alert("Không tìm thấy sản phẩm để sửa.");
        return;
    }

    var Soluonghientai = Danhsach[Vitri].quantity || 1;
    var Nhap = prompt("Nhập số lượng mới:", Soluonghientai);
    if (Nhap === null) return; // Cancel

    var Soluongmoi = parseInt(Nhap, 10);
    if (isNaN(Soluongmoi) || Soluongmoi <= 0) {
        alert("Số lượng không hợp lệ. Vui lòng nhập số nguyên dương.");
        return;
    }

    Danhsach[Vitri].quantity = Soluongmoi;
    Luudanhsachyeuthich(Danhsach);
    Loaddanhsachyeuthich();
}
//Delete 
function Xoayeuthich(Id) {
    var Danhsach = Laydanhsachyeuthich();
    if (Danhsach.length === 0) return;

    Danhsach = Danhsach.filter(function (Sp) { return Sp.Id != Id; });
    Luudanhsachyeuthich(Danhsach);
    Loaddanhsachyeuthich();
}
// Mua ngay
function Muangay(Id) {
    var Danhsach = Laydanhsachyeuthich();
    if (Danhsach.length === 0) return;

    var Sanpham = Danhsach.find(function (Sp) { return Sp.Id == Id; });
    if (!Sanpham) {
        alert("Không tìm thấy sản phẩm để mua.");
        return;
    }

    var Hoten = prompt("Nhập họ và tên của bạn:");
    if (Hoten === null || Hoten.trim() === "") {
        alert("Bạn chưa nhập tên.");
        return;
    }

    var Sdt = prompt("Nhập số điện thoại:");
    if (Sdt === null || Sdt.trim() === "") {
        alert("Bạn chưa nhập số điện thoại.");
        return;
    }

    var Thoigiandi = prompt("Nhập thời gian đi (ví dụ: 10/01/2026 08:00):");
    if (Thoigiandi === null || Thoigiandi.trim() === "") {
        alert("Bạn chưa nhập thời gian đi.");
        return;
    }

    var Thoigianve = prompt("Nhập thời gian về (ví dụ: 12/01/2026 17:00):");
    if (Thoigianve === null || Thoigianve.trim() === "") {
        alert("Bạn chưa nhập thời gian về.");
        return;
    }

    alert(
        "Đã đặt mua thành công!\n\n" +
        "Sản phẩm: " + Sanpham.name + "\n" +
        "Giá: " + Number(Sanpham.price).toLocaleString('vi-VN') + "đ\n" +
        "Số lượng: " + (Sanpham.quantity || 1) + "\n\n" +
        "Họ tên: " + Hoten + "\n" +
        "SĐT: " + Sdt + "\n" +
        "Thời gian đi: " + Thoigiandi + "\n" +
        "Thời gian về: " + Thoigianve
    );
}

Loaddanhsachyeuthich();
