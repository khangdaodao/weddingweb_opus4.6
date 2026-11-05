const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let text = fs.readFileSync(contextPath, 'utf8');

const targetWishes = `- **Wishes (Sổ Lời Chúc):**
  + Tiêu đề script đỏ burgundy: "Wishes".
  + Dòng mô tả ngắn.
  + Đếm số bình luận: "X Comments".
  + **TUYỆT ĐỐI TUÂN THỦ:** KHÔNG RSVP (không có nút Hadir/Tidak Hadir, không có bộ đếm người tham dự, không có dropdown xác nhận tham dự).
  + Form: Ô nhập tên + Textarea lời chúc + Nút "Kirim" màu than chì/xám đậm.
  + Hiển thị bình luận trực tiếp bên dưới với icon tích xanh đã xác thực, thời gian "baru saja", nút "Reply".
  + Lưu tạm client-side (\`localStorage\`) kèm dòng chú thích rõ: \`* Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).\`.`;

const newWishes = `- **Wishes (Sổ Lời Chúc - Tinh chỉnh nâng cấp 05/11/2026):**
  + Tiêu đề script đỏ burgundy: "Wishes".
  + Dòng mô tả tiếng Việt: "Gửi những lời chúc tốt đẹp nhất đến cô dâu & chú rể".
  + **Form gửi lời chúc 3 trường:**
    1. Ô nhập tên người gửi.
    2. Hai nút bấm chọn nhanh (Pill selector): \`[ 👨 Nhà Trai ]\` và \`[ 👩 Nhà Gái ]\`, bấm bên nào sáng màu đỏ burgundy nổi bật bên đó.
    3. Ô nhập nội dung lời chúc.
    4. Nút bấm: "Gửi Lời Chúc" màu đỏ burgundy sang trọng.
  + **Hiển thị xoay vòng (Carousel 3 lời chúc):**
    - Chỉ hiển thị 3 lời chúc một lần để giao diện luôn gọn gàng, không bị dài thườn thượt.
    - Tự động chuyển 3 lời chúc tiếp theo sau 5 giây bằng hiệu ứng mờ dần (fade transition) mềm mại.
    - Tạm dừng chuyển trang khi rê chuột (hover) hoặc chạm tay (touch) để khách đọc kịp.
    - Có các chấm tròn nhỏ (dots indicator) để chuyển trang thủ công.
  + **Avatar đại diện theo nhà:**
    - Khách nhà trai: hiển thị avatar tròn \`assets/images/avatars/man.jpg\` bên trái tên.
    - Khách nhà gái: hiển thị avatar tròn \`assets/images/avatars/women.jpg\` bên trái tên.
    - Kèm huy hiệu Nhà Trai / Nhà Gái và icon tích xanh đã xác thực.
  + **Nút "Xem Tất Cả Lời Chúc" & Popup Modal (Feed lướt Facebook):**
    - Nút "Xem Tất Cả Lời Chúc" ở đáy card mở Popup Modal cuộn dọc mượt mà.
    - Có 3 tab bộ lọc: \`[ Tất Cả ]\`, \`[ Nhà Trai ]\`, \`[ Nhà Gái ]\` kèm số lượng đếm thực tế của từng bên.
  + Lưu tạm client-side (\`localStorage\`) kèm dòng chú thích rõ: \`* Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).\`.`;

if (text.includes(targetWishes)) {
  text = text.replace(targetWishes, newWishes);
  fs.writeFileSync(contextPath, text, 'utf8');
  console.log('Successfully updated context.md with new Wishes documentation');
} else {
  console.error('Target wishes block not found in context.md');
}

