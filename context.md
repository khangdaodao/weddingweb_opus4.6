# CONTEXT.md — DỰ ÁN WEBSITE THIỆP CƯỚI

> **Mục đích tài liệu:** Lưu trữ toàn bộ bối cảnh, mục tiêu, yêu cầu, quyết định thiết kế, tiến độ và nguyên tắc triển khai của dự án.  
> Đây là tài liệu tham chiếu chính khi tiếp tục phát triển dự án, chuyển giao cho AI khác hoặc tùy chỉnh website cho khách hàng mới.
>
> **Quy tắc cập nhật:** Khi có quyết định mới hoặc hoàn thành một phase, hãy cập nhật tài liệu này. Không tự ý thay đổi các yêu cầu đã được người dùng xác nhận.

---

## 1. Tổng quan dự án

### 1.1. Mục tiêu chính

Xây dựng một website thiệp cưới trực tuyến có giao diện và trải nghiệm gần giống website mẫu:

- Website tham chiếu: https://visualinv.my.id/tf-024-photo/#gift
- Người dùng muốn tái tạo thiết kế mẫu với độ tương đồng cao, đặc biệt trên thiết bị di động.
- Website cần có thể tùy chỉnh nhanh để sử dụng cho nhiều cặp đôi/khách hàng khác nhau.
- Dự án không chỉ là một website demo; đây còn là nền tảng cho sản phẩm số có thể bán và nhân bản cho khách hàng.

### 1.2. Mục tiêu kinh doanh và khả năng tái sử dụng

Website cần được tổ chức để người phát triển có thể:

- Thay tên cô dâu chú rể, ngày cưới, ảnh, nội dung, địa điểm và thông tin sự kiện.
- Thay tài nguyên ảnh, nhạc và dữ liệu ngân hàng mà không phải tìm sửa nhiều file.
- Tùy chỉnh cho khách hàng mới nhanh, hạn chế sửa trực tiếp vào component.
- Dễ bảo trì, dễ kiểm tra và dễ mở rộng thêm section hoặc tính năng.
- Bàn giao cho khách hàng bằng quy trình rõ ràng.

### 1.3. Công cụ và cách làm việc

- Công cụ vibe coding chính: Antigravity.
- Tiếp tục làm trên project hiện tại, không tạo lại dự án từ đầu.
- Triển khai theo từng phase.
- Sau mỗi phase, người dùng xem giao diện, nghiệm thu hoặc yêu cầu sửa trước khi chuyển tiếp.
- Không tự động triển khai phase tiếp theo khi chưa được người dùng đồng ý.
- Ưu tiên kiểm tra giao diện thực tế và đối chiếu screenshot thay vì chỉ dựa vào báo cáo “đã hoàn thành”.

---

## 2. Tài liệu tham chiếu

Các nguồn tham chiếu đã được sử dụng:

1. Website mẫu: https://visualinv.my.id/tf-024-photo/#gift
2. Ảnh chụp toàn trang website mẫu do người dùng cung cấp.
3. Video khoảng 36 giây do người dùng cung cấp, thể hiện các trạng thái và section của website.
4. Screenshot website đang triển khai qua từng phase.
5. Ảnh line-art nhẫn cưới do người dùng cung cấp cho divider giữa Couple Profile và Save The Date.

### Quy tắc sử dụng tài liệu tham chiếu

- Đối chiếu đúng trạng thái và vị trí cuộn tương ứng.
- Không khẳng định số đo, màu chính xác hoặc font chính xác nếu chưa đo/kiểm tra.
- Nếu chi tiết chưa xác minh được, ghi rõ là ước lượng hoặc cần kiểm tra.
- Khi ảnh tham chiếu và yêu cầu mới của người dùng mâu thuẫn, ưu tiên yêu cầu mới nhất đã được người dùng xác nhận.

---

## 3. Định hướng giao diện tổng thể

### 3.1. Phong cách

- Lãng mạn, trang trọng, tinh tế.
- Thiết kế mobile-first.
- Ưu tiên tái tạo mẫu thay vì tự sáng tạo lại.
- Không thêm thành phần chỉ vì “trông đẹp hơn” nếu không phù hợp mẫu hoặc chưa được người dùng đồng ý.

### 3.2. Màu sắc và typography

Phong cách màu đã thống nhất:

- Burgundy / maroon / đỏ rượu vang đậm.
- Ivory / kem / trắng ngà.
- Blush pink / hồng phấn ở một số chi tiết.
- Gold / champagne gold cho viền ảnh và họa tiết trang trí.

Typography:

- Tiêu đề có thể dùng serif thanh lịch hoặc script theo mẫu.
- Nội dung sử dụng sans-serif dễ đọc.
- Không tự ý đổi font toàn website nếu chưa kiểm tra ảnh mẫu và chưa được duyệt.

### 3.3. Kích thước kiểm tra

- Viewport mobile chuẩn: rộng 390px.
- Chiều cao 844px được dùng làm kích thước kiểm tra ban đầu.
- Chiều cao 844px là cấu hình thử nghiệm, không phải số đo được người dùng xác nhận từ website mẫu.
- Ưu tiên kiểm tra trên mobile trước, sau đó mới tối ưu desktop.

### 3.4. Nguyên tắc khoảng trắng

- Giữ khoảng thở cần thiết để giao diện sang trọng.
- Không để khoảng trống lớn gây cảm giác section bị rời rạc.
- Không lấp đầy khoảng trắng bằng văn bản hoặc họa tiết quá mức.
- Khi chỉnh khoảng cách, phải xem cả section phía trên và phía dưới.

---

## 4. Yêu cầu chung về chức năng

### 4.1. Màn hình cover và mở thiệp

- Cover là một màn hình riêng.
- Trước khi bấm “Mở Thiệp”, người xem không được cuộn vào nội dung chính.
- Khi bấm nút mở thiệp:
  - Cover chuyển đi bằng hiệu ứng fade.
  - Nội dung chính xuất hiện mềm mại.
  - Trang được mở khóa cuộn.
  - Nhạc nền được phép bắt đầu phát sau tương tác của người dùng.
- Không dùng hiệu ứng mở phong bì, zoom mạnh hoặc chuyển cảnh phô trương.
- Hiệu ứng mở thiệp hiện tại đã được người dùng đánh giá ổn và không nên tự ý sửa lại.

### 4.2. Nhạc nền

- Có nút bật/tắt nhạc.
- Nhạc chỉ bắt đầu sau thao tác mở thiệp của người dùng.
- Nếu chưa có file MP3, website không được lỗi.
- Đường dẫn nhạc phải dễ thay đổi trong cấu hình.
- Không hardcode tên file rải rác trong component.

### 4.3. Countdown

- Đếm ngược đến **00:00 ở đầu ngày cưới**, không đếm đến giờ lễ.
- Múi giờ: `Asia/Ho_Chi_Minh`.
- Dùng JavaScript và đồng hồ thiết bị; không cần API thời gian bên ngoài ở phiên bản đầu.
- Hiển thị bốn đơn vị: ngày, giờ, phút, giây.
- Cập nhật mỗi giây.
- Ngày cưới phải được cấu hình ở một nơi.
- Khi ngày cưới đã qua, dừng đếm và hiển thị trạng thái phù hợp.
- Chấp nhận rằng thời gian có thể lệch nếu đồng hồ thiết bị của người xem sai.
- Không để animation countdown khởi chạy lại hoặc làm giật các animation khác mỗi giây.

### 4.4. Bottom navbar

- Thanh điều hướng cố định ở đáy màn hình sau khi mở thiệp.
- Có 6 icon tròn màu maroon theo mẫu.
- Icon đang chọn cần thể hiện trạng thái active.
- Các nút cuộn đến section tương ứng.
- Navbar không được che nội dung quan trọng; cần có khoảng đệm dưới phù hợp.
- Không tự ý thay số lượng, thứ tự hoặc kiểu icon nếu chưa đối chiếu mẫu.

### 4.5. Scroll reveal

- Các section có thể xuất hiện nhẹ khi cuộn đến.
- Cơ chế hiện tại đã được người dùng đánh giá “cũng tạm ổn”.
- Không tự ý thay đổi thời điểm kích hoạt, duration, delay hoặc easing khi triển khai phase khác.
- Không áp dụng animation mới cho toàn trang nếu chưa được người dùng duyệt.
- Đảm bảo nội dung không bị kẹt ở trạng thái ẩn khi cuộn nhanh hoặc mở trang giữa chừng.
- Tôn trọng `prefers-reduced-motion`.

### 4.6. Cánh hoa rơi

- Hiệu ứng cánh hoa ở Phase 1 hiện tại được người dùng chấp nhận.
- Người dùng đã thử yêu cầu cánh hoa chạy xuyên suốt nhiều section nhưng không hài lòng và đã rollback.
- Vì vậy:
  - Giữ lại phiên bản cánh hoa hiện tại.
  - Không cố làm cánh hoa chạy xuyên suốt các phase.
  - Không thêm lớp cánh hoa riêng ở Phase 2 hoặc các phase sau.
  - Không tự ý thay đổi hiệu ứng cánh hoa khi triển khai section khác.

---

## 5. Dữ liệu demo và khả năng tùy chỉnh

### 5.1. Dữ liệu demo hiện tại

- Tên demo: Hoàng Nam và Khánh Linh.
- Ngày cưới demo: 12/12/2027.
- Tên cô dâu: Đỗ Khánh Linh.
- Tên chú rể: Vũ Hoàng Nam.

Đây là dữ liệu demo, cần dễ thay đổi cho khách hàng mới.

### 5.2. Quy tắc cấu hình

- Dữ liệu khách hàng phải được tập trung trong file cấu hình, hiện dự án đã có `assets/js/config.js`.
- Không viết cứng tên, ngày cưới, nội dung, ảnh hoặc địa chỉ trong component nếu dữ liệu có thể cấu hình.
- Nếu cần thêm trường mới, cập nhật cấu hình và README.
- Không giả định tên file hoặc cấu trúc hiện tại nếu chưa kiểm tra project thực tế.

### 5.3. Tài nguyên ảnh

- Có ảnh demo cho cover và các section.
- Dự kiến cần ảnh cover, ảnh cô dâu riêng, ảnh chú rể riêng và 6 ảnh gallery.
- Kiểm tra file ảnh thực sự tồn tại trước khi tham chiếu.
- Không dùng đường dẫn ảnh không tồn tại.
- Khi thiếu ảnh, báo rõ tài nguyên còn thiếu.
- Ảnh demo phải có thể thay thế dễ dàng cho khách hàng khác.
- Giữ tỷ lệ ảnh, crop và bố cục gần mẫu.

### 5.4. Nhạc

- File nhạc demo chưa được xác nhận.
- Chưa có bài nhạc cuối cùng được chốt.
- Nếu chưa có file nhạc, giữ cấu hình trống hoặc placeholder có chú thích; website vẫn phải hoạt động bình thường.

---

## 6. Tiến độ theo phase

### Phase 1 — Cover, Hero, Countdown, Music, Navbar

**Trạng thái:** Đã triển khai và người dùng đã kiểm tra, chấp nhận.

Đã có:

- Cover overlay.
- Khung burgundy dạng vòm/capsule.
- Ảnh cặp đôi dạng oval, viền gold.
- Tên và ngày cưới demo.
- Nút “Mở Thiệp”.
- Fade transition khi mở thiệp.
- Hero và countdown.
- Nút nhạc nổi.
- Bottom navbar với 6 icon.
- Hiệu ứng cánh hoa ở Phase 1.

Người dùng đã yêu cầu cải thiện transition và nội dung hiện dần. Sau chỉnh sửa, người dùng đánh giá “thấy ổn rồi”.

**Quy tắc:** Không tự ý thiết kế lại Phase 1 hoặc thay đổi animation đã được duyệt.

### Phase 2 — Quote + Couple Profile

**Trạng thái:** Đã triển khai, người dùng đánh giá tạm ổn.

Đã có:

- Quote / lời mời.
- Couple Profile.
- Cô dâu được giới thiệu trước.
- Chú rể được giới thiệu sau.
- Ảnh oval và trang trí hoa.
- Thông tin giới thiệu và icon mạng xã hội theo thiết kế hiện tại.

Người dùng đã thử tăng độ trễ fade-in và làm cánh hoa chạy xuyên suốt nhưng không hài lòng, sau đó rollback.

**Quy tắc:** Giữ phiên bản hiện tại. Không tự ý thử lại phương án cánh hoa xuyên suốt.

### Phase 3 — Wedding Event / Save The Date

**Trạng thái:** Đã triển khai. Người dùng đã gửi screenshot toàn trang để đánh giá.

Nội dung:

- Hai khối sự kiện riêng:
  1. Lễ thành hôn.
  2. Tiệc cưới.
- Mỗi khối có tên sự kiện, ngày, giờ, địa điểm, địa chỉ và nút Google Maps.
- Hai khối được đặt trong panel burgundy dài, bo tròn.
- Nội dung phải lấy từ cấu hình.
- Nút Google Maps phải mở URL tương ứng.

**Đánh giá hiện tại:** Hướng thiết kế được người dùng chấp nhận, nhưng cần kiểm tra chức năng thực tế, địa chỉ, ngày giờ và liên kết Google Maps.

### Divider giữa Phase 2 và Phase 3

**Trạng thái:** Đã chốt ý tưởng thiết kế, cần kiểm tra kết quả triển khai.

Người dùng muốn bổ sung một divider vì khoảng chuyển tiếp giữa Couple Profile và Save The Date trông hơi trống.

Thiết kế được chốt:

- Minimalist wedding rings line art.
- Hai chiếc nhẫn cưới lồng vào nhau ở chính giữa.
- Một trái tim nhỏ phía trên chiếc nhẫn bên trái.
- Hai đường nét mảnh uốn lượn kéo dài sang hai bên.
- Màu champagne gold / gold nhạt.
- Không có chữ.
- Không có slogan.
- Không có monogram hoặc chữ cái viết tắt.
- Không có hoa, lá hoặc họa tiết bổ sung.
- Không có nền riêng hoặc khung bao quanh.
- Ưu tiên SVG vector.
- Đặt ở khoảng chuyển tiếp Couple Profile → Save The Date.
- Điều chỉnh khoảng cách để giảm cảm giác trống nhưng vẫn giữ khoảng thở.

Ảnh line-art người dùng cung cấp là tham chiếu trực tiếp cho divider.

### Phase 4 — Gallery

**Trạng thái:** Đã triển khai và tinh chỉnh theo phản hồi của người dùng, đang chờ nghiệm thu.

Yêu cầu đã hoàn thành đối chiếu theo ảnh & video tham chiếu:

- 6 ảnh demo từ `WEDDING_CONFIG.gallery` (`assets/images/couple/gallery-1.jpg` đến `gallery-6.jpg`).
- Bố cục lưới 2 cột × 3 hàng trên mobile (viewport 390px), khoảng cách giữa 2 cột là 8px.
- Chiều rộng khung lưới: Khoảng cách từ mép trái/phải section burgundy đến mép ngoài lưới ảnh đúng **39px** tại viewport 390px (`padding: 0 39px;`).
- Nền burgundy/maroon đậm liền mạch (`--color-maroon-deep`).
- Mép trên lượn sóng mềm mại (scallop dual-curve) tạo cảm giác nền mở xuống ở giữa, khớp 100% ảnh tham chiếu.
- Tiêu đề nghệ thuật “BEST Moment” tinh chỉnh chuẩn xác:
  - “BEST”: Serif in hoa thanh lịch, rõ nét (`Playfair Display`, weight 500, letter-spacing 1.5px).
  - “Moment”: Đúng font Google Font `Mrs Saint Delafield`, weight 400.
  - Vị trí lồng ghép: Chữ "M" của "Moment" lồng trực tiếp vào thân chữ "T" của "BEST" (nét cong bắt đầu dưới "S", vòng cao lồng qua thân "T", không lồng ở giữa E-S), cụm "oment" tiếp nối sang phải bên dưới baseline của "BEST", đối chiếu khớp 100% ảnh tham chiếu mẫu.
- Giữ nguyên toàn bộ các phase khác, component khác và font chữ khác ban đầu.
- Hiệu ứng tương tác:
  - Desktop hover: ảnh nhô nhẹ `translateY(-4px)` kèm zoom ảnh nhẹ `scale(1.04)`, không xê dịch layout.
  - Mobile touch: phản hồi chạm rõ ràng `:active` (`scale(0.97)`).
  - Modal Lightbox: Bấm ảnh mở toàn màn hình, backdrop mờ làm mờ nền, khóa cuộn trang (`body.gallery-modal-open`).
  - Điều hướng: Nút Next/Prev, phím mũi tên bàn phím, vuốt chạm cảm ứng (touch swipe).
  - Đóng: Nút đóng cố định góc trên phải, bấm vào backdrop mờ, hoặc bấm phím Escape.
  - Khả năng truy cập & motion: ARIA attributes, quản lý tiêu điểm bàn phím, alt text đầy đủ, tôn trọng `prefers-reduced-motion`.

### Phase 5 — Love Story

**Trạng thái:** Chưa triển khai.

Yêu cầu đã chốt:

- Timeline dọc.
- 3 mốc mặc định.
- Các card xen kẽ trái/phải.
- Marker hình trái tim.
- Card màu burgundy và dusty blush theo mẫu.
- Nội dung từng mốc có thể cấu hình.
- Có thể mở rộng thêm mốc trong tương lai.
- Fade-in theo cơ chế hiện tại, không tự ý thay đổi animation chung.

Các tên mốc demo từng được đề xuất:
- Lần đầu gặp gỡ.
- Bắt đầu yêu.
- Ngày chung đôi.

Đây là nội dung demo, không phải câu chữ chính xác được xác minh từ mẫu.

### Phase 6 — Wedding Gift + Wishes

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
- Giữ phong cách burgundy/ivory và trang trí phù hợp với các section trước.

---

## 7. Quy tắc về chức năng và dữ liệu chưa có backend

- Phiên bản hiện tại chưa cần database.
- Không tự ý kết nối cơ sở dữ liệu.
- Không tạo form RSVP.
- Không tuyên bố dữ liệu được lưu trữ nếu chưa có backend.
- Wedding Gift dùng QR demo giả và phải có chú thích rõ.
- Các liên kết Google Maps cần dùng URL cấu hình thực tế; dữ liệu demo phải được nhận diện là demo.

---

## 8. Tổ chức mã nguồn và tài liệu bàn giao

Người dùng yêu cầu mã nguồn phải dễ truy cập, dễ hiểu và dễ tùy chỉnh cho khách hàng tiếp theo.

Các yêu cầu:

- Dữ liệu khách hàng tập trung trong cấu hình.
- Tách component/section hợp lý.
- CSS có tổ chức, dễ tìm theo chức năng.
- Không chia file quá vụn nếu không mang lại lợi ích.
- Chú thích tiếng Việt đầy đủ tại các phần quan trọng.
- Có README hướng dẫn:
  - Cách chạy website.
  - Cách thay tên và ngày cưới.
  - Cách thay ảnh.
  - Cách thay nội dung các section.
  - Cách thay địa điểm và URL Google Maps.
  - Cách thay file nhạc.
  - Cách thay thông tin Wedding Gift và QR demo.
  - Cách build/deploy nếu có.
- Không tự ý đổi kiến trúc dự án nếu chưa kiểm tra hiện trạng.
- Không xóa hoặc ghi đè file quan trọng khi chưa xác định mục đích.

---

## 9. Quy trình phát triển và nghiệm thu

Mỗi phase cần theo quy trình:

1. Đọc tài liệu này và kiểm tra mã nguồn hiện tại.
2. Kiểm tra tài nguyên cần dùng.
3. Triển khai đúng phạm vi phase.
4. Không sửa các phase đã được nghiệm thu nếu không cần thiết.
5. Kiểm tra ở viewport 390 × 844.
6. Chụp screenshot ở trạng thái và vị trí cuộn phù hợp.
7. Kiểm tra chức năng thực tế, không chỉ nhìn giao diện.
8. Báo cáo file đã tạo/sửa, kiểm thử và vấn đề còn tồn tại.
9. Dừng lại chờ người dùng nghiệm thu.

### Nguyên tắc chỉnh sửa

- Mỗi lần chỉ sửa một nhóm vấn đề rõ ràng.
- Trước khi thay đổi, kiểm tra trạng thái hiện tại.
- Giữ phiên bản tốt trước đó để có thể rollback.
- Nếu người dùng không hài lòng, ưu tiên quay về phiên bản trước thay vì chồng thêm nhiều sửa đổi.
- Không tự ý chuyển phase.

---

## 10. Những điều không được tự ý làm

- Không tạo lại dự án từ đầu.
- Không thiết kế lại phase đã được duyệt.
- Không thay đổi màu sắc, font, bố cục hoặc animation chung khi chỉ được yêu cầu sửa một chi tiết.
- Không cố làm cánh hoa xuyên suốt các section.
- Không thêm RSVP.
- Không thêm nút quay lại đầu trang.
- Không thêm chữ vào divider nhẫn cưới.
- Không thêm monogram vào divider.
- Không kết nối database khi chưa được yêu cầu.
- Không dùng QR giả như QR thanh toán thật.
- Không hardcode dữ liệu khách hàng trong component.
- Không tuyên bố đã kiểm thử nếu chưa thực sự kiểm tra.
- Không khẳng định độ giống mẫu theo phần trăm nếu chưa có phép đo rõ ràng.

---

## 11. Việc cần làm tiếp theo

Trước khi chuyển sang phase tiếp theo:

1. Kiểm tra divider nhẫn cưới line art đã được triển khai đúng ảnh tham chiếu chưa.
2. Kiểm tra Phase 1–3 ở viewport 390 × 844.
3. Kiểm tra các liên kết Google Maps và thông tin sự kiện demo.
4. Kiểm tra navbar và các điểm cuộn.
5. Xác nhận cấu hình và README có thể dùng để tùy chỉnh khách hàng tiếp theo.
6. Chỉ sau khi người dùng nghiệm thu mới triển khai Gallery.

---

## 12. Trạng thái hiện tại — Tóm tắt nhanh

- **Phase 1:** Đã duyệt.
- **Phase 2:** Đã duyệt tạm thời.
- **Phase 3:** Đã triển khai, cần nghiệm thu chi tiết chức năng.
- **Divider nhẫn cưới:** Ý tưởng đã chốt; cần kiểm tra kết quả.
- **Phase 4 Gallery:** Đã triển khai (lưới 2x3, mép cong, modal xem ảnh lớn, điều hướng, đóng bằng Esc/backdrop), chờ duyệt.
- **Phase 5 Love Story:** Chưa triển khai.
- **Phase 6 Wedding Gift + Wishes:** Chưa triển khai.
- **Phase 7 Closing:** Chưa triển khai.
- **Database:** Chưa cần.
- **RSVP:** Bỏ.
- **QR:** Demo giả, phải ghi rõ.
- **Ưu tiên tiếp theo:** Kiểm tra divider và hoàn thiện nghiệm thu Phase 3 trước khi tiếp tục.

