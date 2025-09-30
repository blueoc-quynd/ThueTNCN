# Tính Thuế Thu Nhập Cá Nhân (TNCN) Việt Nam

## Giới thiệu

Đây là công cụ tính thuế thu nhập cá nhân hàng tháng theo luật thuế lũy tiến của Việt Nam. Người dùng có thể nhập thu nhập, số người phụ thuộc, số tiền bảo hiểm và chọn giảm trừ bản thân để tính số thuế phải nộp và số tiền còn lại sau thuế.

## Luật Thuế TNCN Việt Nam

Thuế TNCN được tính theo **biểu thuế lũy tiến từng phần**. Thu nhập tính thuế được chia thành các bậc, mỗi bậc áp dụng một mức thuế suất khác nhau.

### Các khoản giảm trừ

- **Giảm trừ bản thân:** 11.000.000 VND/tháng
- **Giảm trừ mỗi người phụ thuộc:** 4.400.000 VND/tháng/người
- **Giảm trừ bảo hiểm:** Tổng số tiền bảo hiểm bắt buộc đã đóng (nếu có)

### Công thức tính thu nhập chịu thuế

```
Thu nhập chịu thuế = Thu nhập - Giảm trừ bản thân - Giảm trừ người phụ thuộc - Bảo hiểm
```

### Biểu thuế lũy tiến từng phần

| Bậc | Thu nhập tính thuế/tháng (VND) | Thuế suất (%) |
|-----|-------------------------------|--------------|
| 1   | Đến 5.000.000                 | 5%           |
| 2   | Trên 5.000.000 đến 10.000.000 | 10%          |
| 3   | Trên 10.000.000 đến 18.000.000| 15%          |
| 4   | Trên 18.000.000 đến 32.000.000| 20%          |
| 5   | Trên 32.000.000 đến 52.000.000| 25%          |
| 6   | Trên 52.000.000 đến 80.000.000| 30%          |
| 7   | Trên 80.000.000                | 35%          |

### Công thức tính thuế phải nộp

Thuế phải nộp = Tổng thuế các bậc, tính theo biểu thuế lũy tiến từng phần.

Ví dụ:
- Nếu thu nhập tính thuế là 20.000.000 VND:
  - Bậc 1: 5.000.000 × 5%
  - Bậc 2: (10.000.000 - 5.000.000) × 10%
  - Bậc 3: (18.000.000 - 10.000.000) × 15%
  - Bậc 4: (20.000.000 - 18.000.000) × 20%

### Số tiền còn lại sau thuế

```
Số tiền còn lại = Thu nhập - Thuế phải nộp
```

## Hướng dẫn sử dụng

1. Nhập thu nhập hàng tháng, số người phụ thuộc, số tiền bảo hiểm.
2. Chọn giảm trừ bản thân nếu có.
3. Nhấn "Tính thuế" để xem kết quả chi tiết.

## Tham khảo

- [Luật Thuế Thu Nhập Cá Nhân Việt Nam](https://thuvienphapluat.vn/van-ban/thue-phi-le-phi/luat-thue-thu-nhap-ca-nhan-2007-62727.aspx)
- [Biểu thuế lũy tiến từng phần](https://thuvienphapluat.vn/van-ban/thue-phi-le-phi/thong-tu-111-2013-tt-btc-huong-dan-luat-thue-thu-nhap-ca-nhan-216785.aspx)
