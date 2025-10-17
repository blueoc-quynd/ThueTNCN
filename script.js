// Format số khi nhập
function formatNumberInput(input) {
    let value = input.value;
    
    // Lưu vị trí con trỏ
    let cursorPosition = input.selectionStart;
    
    // Giữ lại các phép toán và số
    let originalLength = value.length;
    
    // Loại bỏ tất cả dấu phẩy hiện có
    value = value.replace(/,/g, '');
    
    // Format số với dấu phẩy (chỉ format phần số, giữ nguyên các phép toán)
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    // Cập nhật giá trị
    input.value = value;
    
    // Điều chỉnh vị trí con trỏ
    let newLength = value.length;
    let lengthDiff = newLength - originalLength;
    input.setSelectionRange(cursorPosition + lengthDiff, cursorPosition + lengthDiff);
}

// Loại bỏ dấu phẩy trước khi tính toán
function parseFormattedNumber(value) {
    return value.replace(/,/g, '');
}

function safeEval(expr) {
    // Loại bỏ dấu phẩy trước khi eval
    expr = parseFormattedNumber(expr);
    
    // Chỉ cho phép số, toán tử cơ bản, dấu ngoặc, khoảng trắng
    if (/^[\d+\-*/().\s]+$/.test(expr)) {
        try {
            // eslint-disable-next-line no-eval
            return eval(expr);
        } catch {
            throw "Biểu thức không hợp lệ!";
        }
    }
    throw "Biểu thức không hợp lệ!";
}

function tinhThueTNCN(thuNhap, giamTruBanThan, giamTruPhuThuoc, soNguoiPhuThuoc, baoHiem, khongTinhThue) {
    const giamTruBanThanVal = giamTruBanThan;
    const giamTruPhuThuocTotal = soNguoiPhuThuoc * giamTruPhuThuoc;
    const giamTruBaoHiem = baoHiem;
    const giamTruKhongTinhThue = khongTinhThue;

    const thuNhapChiuThue = thuNhap - giamTruBanThanVal - giamTruPhuThuocTotal - giamTruBaoHiem - giamTruKhongTinhThue;
    if (thuNhapChiuThue <= 0) {
        return {
            tongThue: 0,
            chiTietBac: [],
            soThuePhaiNop: 0,
            thuNhapConLai: thuNhap,
            thongTinGiamTru: {
                thuNhapGoc: thuNhap,
                giamTruBanThan: giamTruBanThanVal,
                giamTruPhuThuoc: giamTruPhuThuocTotal,
                giamTruPhuThuocDonGia: giamTruPhuThuoc,
                soNguoiPhuThuoc: soNguoiPhuThuoc,
                giamTruBaoHiem: giamTruBaoHiem,
                giamTruKhongTinhThue: giamTruKhongTinhThue,
                thuNhapChiuThue: thuNhapChiuThue
            }
        };
    }

    const bacThue = [
        [5000000, 0.05],
        [10000000, 0.10],
        [18000000, 0.15],
        [32000000, 0.20],
        [52000000, 0.25],
        [80000000, 0.30],
        [Infinity, 0.35]
    ];

    let thue = 0;
    let thuNhapConLai = thuNhapChiuThue;
    let mucDuoi = 0;
    let chiTietBac = [];

    for (let i = 0; i < bacThue.length; i++) {
        const [mucTren, tyLe] = bacThue[i];
        if (thuNhapConLai > 0) {
            const mucTinhThue = Math.min(thuNhapConLai, mucTren - mucDuoi);
            const thueBac = mucTinhThue * tyLe;
            chiTietBac.push({
                mucDuoi: mucDuoi + 1,
                mucTren: mucTren,
                tyLe: tyLe,
                thuNhapBac: mucTinhThue,
                thueBac: Math.round(thueBac)
            });
            thue += thueBac;
            thuNhapConLai -= mucTinhThue;
            mucDuoi = mucTren;
        } else {
            break;
        }
    }

    const soThuePhaiNop = Math.round(thue);
    const thuNhapConLaiSauThue = thuNhap - soThuePhaiNop;

    return {
        tongThue: soThuePhaiNop,
        chiTietBac: chiTietBac,
        soThuePhaiNop: soThuePhaiNop,
        thuNhapConLai: thuNhapConLaiSauThue,
        thongTinGiamTru: {
            thuNhapGoc: thuNhap,
            giamTruBanThan: giamTruBanThanVal,
            giamTruPhuThuoc: giamTruPhuThuocTotal,
            giamTruPhuThuocDonGia: giamTruPhuThuoc,
            soNguoiPhuThuoc: soNguoiPhuThuoc,
            giamTruBaoHiem: giamTruBaoHiem,
            giamTruKhongTinhThue: giamTruKhongTinhThue,
            thuNhapChiuThue: thuNhapChiuThue
        }
    };
}

function formatVND(num) {
    return num.toLocaleString('vi-VN');
}

function tinhThue() {
    const resultDiv = document.getElementById('result');
    try {
        const thuNhap = safeEval(document.getElementById('thuNhap').value);
        const baoHiem = safeEval(document.getElementById('baoHiem').value);
        const khongTinhThue = safeEval(document.getElementById('khongTinhThue').value);
        const soPhuThuoc = safeEval(document.getElementById('phuThuoc').value);
        const giamTruBanThan = safeEval(document.getElementById('giamTruBanThan').value);
        const giamTruPhuThuoc = safeEval(document.getElementById('giamTruPhuThuoc').value);

        const ketQua = tinhThueTNCN(
            thuNhap,
            giamTruBanThan,
            giamTruPhuThuoc,
            Number(soPhuThuoc),
            baoHiem,
            khongTinhThue
        );

        let msg = `<div style="margin-bottom: 20px;">`;
        msg += `<h3 style="margin-bottom: 15px; color: white;">📊 Thông tin giảm trừ</h3>`;
        msg += `<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">`;
        msg += `Thu nhập gốc: <b>${formatVND(ketQua.thongTinGiamTru.thuNhapGoc)} VND</b><br>`;
        msg += `Giảm trừ bản thân: <b>${formatVND(ketQua.thongTinGiamTru.giamTruBanThan)} VND</b><br>`;
        if (ketQua.thongTinGiamTru.soNguoiPhuThuoc > 0) {
            msg += `Giảm trừ người phụ thuộc: <b>${ketQua.thongTinGiamTru.soNguoiPhuThuoc} người × ${formatVND(ketQua.thongTinGiamTru.giamTruPhuThuocDonGia)} = ${formatVND(ketQua.thongTinGiamTru.giamTruPhuThuoc)} VND</b><br>`;
        } else {
            msg += `Giảm trừ người phụ thuộc: <b>${formatVND(ketQua.thongTinGiamTru.giamTruPhuThuoc)} VND</b><br>`;
        }
        msg += `Giảm trừ bảo hiểm: <b>${formatVND(ketQua.thongTinGiamTru.giamTruBaoHiem)} VND</b><br>`;
        msg += `Giảm trừ khác: <b>${formatVND(ketQua.thongTinGiamTru.giamTruKhongTinhThue)} VND</b><br>`;
        msg += `<hr style="border: 1px solid rgba(255,255,255,0.3); margin: 10px 0;">`;
        msg += `Thu nhập chịu thuế: <b>${formatVND(ketQua.thongTinGiamTru.thuNhapChiuThue)} VND</b>`;
        msg += `</div></div>`;

        msg += `<h3 style="margin-bottom: 15px; color: white;">💰 Kết quả tính thuế</h3>`;
        msg += `<div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">`;
        msg += `<b>Thuế theo lũy tiến:</b> ${formatVND(ketQua.tongThue)} VND<br><br>`;
        
        if (ketQua.chiTietBac.length > 0) {
            msg += `<b>Chi tiết theo từng bậc thuế:</b><br>`;
            ketQua.chiTietBac.forEach((bac, idx) => {
                const mucTrenText = bac.mucTren === Infinity ? 'trở lên' : formatVND(bac.mucTren);
                msg += `<div class="bac">Bậc ${idx + 1}: ${formatVND(bac.mucDuoi)} - ${mucTrenText} VND (${(bac.tyLe * 100).toFixed(0)}%)<br>`
                    + `Thu nhập tính thuế: ${formatVND(bac.thuNhapBac)} VND → Thuế: <b>${formatVND(bac.thueBac)} VND</b></div>`;
            });
        }
        
        msg += `<hr style="border: 1px solid rgba(255,255,255,0.3); margin: 15px 0;">`;
        msg += `<div style="font-size: 18px; font-weight: bold;">`;
        msg += `🏛️ Số thuế phải nộp: <span style="color: #FFE066;">${formatVND(ketQua.soThuePhaiNop)} VND</span><br>`;
        msg += `💵 Thu nhập sau thuế: <span style="color: #7BED9F;">${formatVND(ketQua.thuNhapConLai)} VND</span>`;
        msg += `</div></div>`;
        
        resultDiv.innerHTML = msg;
        resultDiv.style.display = 'block';
    } catch (e) {
        resultDiv.innerHTML = `<div class="error">⚠️ Lỗi: Vui lòng nhập đúng định dạng số hoặc phép tính!</div>`;
        resultDiv.style.display = 'block';
    }
}

// Auto-format các input khi trang load
window.addEventListener('DOMContentLoaded', function() {
    ['thuNhap', 'baoHiem', 'khongTinhThue', 'giamTruBanThan', 'giamTruPhuThuoc'].forEach(id => {
        const input = document.getElementById(id);
        if (input.value && input.value !== '0') {
            formatNumberInput(input);
        }
    });
});