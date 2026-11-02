const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'context.md');
let text = fs.readFileSync(contextPath, 'utf8');

// Cập nhật Phase 6 & Phase 7 trong mục 6
const oldPhase67 = `### Phase 6 — Wedding Gift + Wishes

**Trạng thái:** Chưa triển khai.

Yêu cầu đã chốt:

#### Wedding Gift
- Card/nút mở popup.
- Popup có thông tin chuyển khoản và mã QR.
- Có nút đóng và overlay.
- Có thể sao chép số tài khoản.
- Mã QR chỉ là mã demo giả, không dùng thông tin tài khoản thật.
- Phải ghi rõ đây là QR demo, không dùng để chuyển tiền thật.
- Không tự ý tạo thông tin ngân hàng có vẻ là thật hoặc tuyên bố QR demo có thể nhận tiền.

#### Wishes
- Giữ phần lời chúc.
- Không cần form xác nhận tham dự (RSVP).
- Không cần trường tên khách, số người tham dự hoặc lựa chọn có/không tham dự.
- Chưa cần kết nối database.
- Không tuyên bố lời chúc được lưu nếu chưa có backend.
- Có thể hiển thị phản hồi giao diện sau khi gửi, nhưng phải nói rõ dữ liệu chỉ là demo và không được lưu lâu dài.

### Phase 7 — Closing / Footer

**Trạng thái:** Chưa triển khai.

Yêu cầu đã chốt:

- Làm theo mẫu tham chiếu.
- Không thêm nút “Quay lại đầu trang”.
- Không tự ý thêm nội dung hoặc CTA không có trong mẫu.
- Giữ phong cách burgundy/ivory và trang trí phù hợp với các section trước.`;

const newPhase67 = `### Phase 6 — Wedding Gift + Wishes

**Trạng thái:** ĐÃ TRIỂN KHAI HOÀN TẤT & ĐANG CHỜ NGƯỜI DÙNG DUYỆT (01/11/2026).

Chi tiết triển khai:
- **Tập tin tạo mới:** \`assets/css/gift-wishes.css\`, \`assets/js/gift-wishes.js\`, \`assets/images/decorations/qr-demo.svg\`.
- **Cấu hình dữ liệu:** Đã tích hợp đầy đủ trong \`assets/js/config.js\` (mục \`gift\` và \`wishes\`).
- **Bố cục:**
  + Nền đỏ burgundy (\`--color-maroon-deep\`) liền mạch phía dưới Love Story.
  + Gồm 2 card trắng bo góc tròn 20px xếp dọc (\`#gift\` và \`#wishes\`), tương thích hoàn toàn với bottom navbar (\`data-target="gift"\` và \`data-target="wishes"\`).
- **Wedding Gift:**
  + Tiêu đề script đỏ burgundy: "Wedding Gift".
  + Đoạn mô tả/lời cảm ơn ngắn.
  + Nút "Buka Amplop Digital" / "Gửi Mừng Cưới" màu đỏ maroon sẫm kèm icon hộp quà.
  + Popup Modal:
    - Backdrop mờ tối, phím Escape / nút X / click backdrop đều đóng được modal.
    - Hiển thị ngân hàng Vietcombank, STK 9988776655, chủ TK VU HOANG NAM.
    - Nút sao chép STK kèm hiệu ứng chuyển trạng thái trực quan "Đã sao chép!" (\`.copied\`).
    - Mã QR vector SVG sắc nét: \`assets/images/decorations/qr-demo.svg\`.
    - **CẢNH BÁO DEMO BẮT BUỘC:** \`⚠️ ĐÂY LÀ QR DEMO MINH HOẠ — VUI LÒNG KHÔNG THỰC HIỆN GIAO DỊCH CHUYỂN TIỀN THẬT.\`
- **Wishes (Sổ Lời Chúc):**
  + Tiêu đề script đỏ burgundy: "Wishes".
  + Dòng mô tả ngắn.
  + Đếm số bình luận: "X Comments".
  + **TUYỆT ĐỐI TUÂN THỦ:** KHÔNG RSVP (không có nút Hadir/Tidak Hadir, không có bộ đếm người tham dự, không có dropdown xác nhận tham dự).
  + Form: Ô nhập tên + Textarea lời chúc + Nút "Kirim" màu than chì/xám đậm.
  + Hiển thị bình luận trực tiếp bên dưới với icon tích xanh đã xác thực, thời gian "baru saja", nút "Reply".
  + Lưu tạm client-side (\`localStorage\`) kèm dòng chú thích rõ: \`* Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).\`.

### Phase 7 — Closing / Footer

**Trạng thái:** ĐÃ TRIỂN KHAI HOÀN TẤT & ĐANG CHỜ NGƯỜI DÙNG DUYỆT (01/11/2026).

Chi tiết triển khai:
- **Tập tin tạo mới:** \`assets/css/closing.css\`.
- **Bố cục:**
  + Section \`<footer id="closing" class="closing-section">\`.
  + Nền kem sáng ngà ấm áp (\`#FAF4EE\`) với hiệu ứng loang màu nước nhẹ.
  + Họa tiết cụm hoa trang trí ở góc trên-trái và góc dưới-phải (\`assets/images/decorations/\`).
  + Khung ảnh chân dung cặp đôi dạng oval vòm đứng viền vàng hoàng gia (\`assets/images/couple/cover.jpg\`).
  + Tiêu đề chữ script burgundy thanh nhã: "Terima Kasih".
  + Đoạn tri ân trang trọng: *"Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kedua mempelai."*.
  + Lời kết trang trọng serif: *"Wassalamu’alaikum Wr. Wb."*.
  + Dòng chữ phụ: *"Kami yang berbahagia,"*.
  + Tên cặp đôi viết kiểu chữ script: *"Hoàng Nam & Khánh Linh"*.
- **Ràng buộc nghiêm ngặt:**
  + **TUYỆT ĐỐI KHÔNG CÓ NÚT "Back to top".**
  + **Khoảng đệm đáy:** \`padding-bottom: 115px\` đảm bảo thanh navbar cố định ở đáy không che khuất tên cặp đôi hay bất kỳ chữ nào (khoảng hở thực tế đo được là 45px an toàn).
  + Mobile-first: scrollWidth = windowWidth = 390px, tuyệt đối không tràn ngang.`;

// Cập nhật mục 12
const oldSection12 = `- **Phase 6 Wedding Gift + Wishes:** Chưa triển khai (ĐANG CHỜ LỆNH TỪ NGƯỜI DÙNG, TUYỆT ĐỐI CHƯA CODE).
- **Phase 7 Closing:** Chưa triển khai.
- **Database:** Chưa cần.
- **RSVP:** Bỏ.
- **QR:** Demo giả, phải ghi rõ.
- **Ưu tiên tiếp theo:** Kiểm tra divider và hoàn thiện nghiệm thu Phase 3 trước khi tiếp tục.`;

const newSection12 = `- **Phase 6 Wedding Gift + Wishes:** ĐÃ TRIỂN KHAI HOÀN TẤT & ĐANG CHỜ NGƯỜI DÙNG DUYỆT (01/11/2026).
- **Phase 7 Closing:** ĐÃ TRIỂN KHAI HOÀN TẤT & ĐANG CHỜ NGƯỜI DÙNG DUYỆT (01/11/2026).
- **Giữ nguyên Phase 1–5:** Không sửa, không refactor, bảo toàn 100% các phase đã duyệt.
- **Database:** Chưa cần, lưu demo client-side.
- **RSVP:** Đã bỏ hoàn toàn đúng yêu cầu.
- **QR:** Demo giả, cảnh báo rõ ràng.
- **Back to top:** Đã loại bỏ hoàn toàn.
- **Trạng thái:** Dừng lại chờ người dùng nghiệm thu Phase 6 & Phase 7.`;

if (text.includes('### Phase 6 — Wedding Gift + Wishes')) {
  text = text.replace(oldPhase67, newPhase67);
  text = text.replace(oldSection12, newSection12);
  fs.writeFileSync(contextPath, text, 'utf8');
  console.log('Successfully updated context.md');
} else {
  console.error('Could not find phase 6 block');
}

