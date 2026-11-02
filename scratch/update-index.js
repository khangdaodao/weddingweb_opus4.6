const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Thêm CSS stylesheets
const cssTarget = '<link rel="stylesheet" href="assets/css/story.css">';
const cssAddition = `<link rel="stylesheet" href="assets/css/story.css">\r\n  <link rel="stylesheet" href="assets/css/gift-wishes.css">\r\n  <link rel="stylesheet" href="assets/css/closing.css">`;

if (html.includes(cssTarget) && !html.includes('gift-wishes.css')) {
  html = html.replace(cssTarget, cssAddition);
  console.log('Added CSS links');
}

// 2. Thay thế placeholder gift và wishes bằng Phase 6 & Phase 7
const placeholderTarget = '    <div id="gift" style="height: 10px;"></div>\r\n    <div id="wishes" style="height: 10px;"></div>';
const placeholderTargetLF = '    <div id="gift" style="height: 10px;"></div>\n    <div id="wishes" style="height: 10px;"></div>';

const phase67Markup = `    <!-- =========================================================================
         SECTION 7: WEDDING GIFT & WISHES (PHASE 6)
         ========================================================================= -->
    <section class="gift-wishes-section" aria-label="Mừng cưới và Lời chúc">
      <!-- CARD 1: WEDDING GIFT (MỪNG CƯỚI) -->
      <div id="gift" class="gift-card-wrapper reveal-on-scroll">
        <div class="gw-white-card gift-card">
          <h2 class="gw-script-title" id="giftTitle">Wedding Gift</h2>
          <p class="gw-description" id="giftMessage">
            Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:
          </p>
          <button type="button" class="btn-open-amplop" id="btnOpenAmplop" aria-label="Mở phong bì mừng cưới điện tử">
            <svg viewBox="0 0 24 24">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V14h2V8.76L15.38 12 17 10.83 14.92 8H20v6z"/>
            </svg>
            <span id="btnOpenAmplopText">Buka Amplop Digital</span>
          </button>
        </div>
      </div>

      <!-- CARD 2: WISHES (SỔ LỜI CHÚC - KHÔNG RSVP) -->
      <div id="wishes" class="wishes-card-wrapper reveal-on-scroll">
        <div class="gw-white-card wishes-card">
          <h2 class="gw-script-title" id="wishesTitle">Wishes</h2>
          <p class="gw-description" id="wishesSubtitle">
            Tuliskan Ucapan &amp; Doa Yang Terbaik Untuk Kedua Mempelai
          </p>

          <!-- Bộ đếm số lượng bình luận -->
          <div class="wishes-count" id="wishesCount">2 Comments</div>

          <!-- Form gửi lời chúc -->
          <form id="wishesForm" class="wishes-form">
            <input type="text" id="wishName" class="wish-input" placeholder="sigma" required maxlength="50" autocomplete="name" aria-label="Tên người gửi">
            <textarea id="wishMessage" class="wish-textarea" placeholder="Ucapan" rows="3" required maxlength="500" aria-label="Lời chúc"></textarea>
            <button type="submit" id="btnSubmitWish" class="btn-wish-submit">Kirim</button>
          </form>

          <!-- Vạch phân cách -->
          <div class="wishes-divider" aria-hidden="true"></div>

          <!-- Danh sách lời chúc -->
          <div id="wishesList" class="wishes-list" aria-label="Danh sách lời chúc">
            <!-- Điền tự động bởi assets/js/gift-wishes.js -->
          </div>

          <!-- Ghi chú dữ liệu demo -->
          <p class="wishes-demo-note" id="wishesDemoNote">
            * Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).
          </p>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 8: CLOSING (PHASE 7 - LỜI CẢM ƠN & KẾT THÚC)
         ========================================================================= -->
    <footer id="closing" class="closing-section" aria-label="Lời cảm ơn">
      <!-- Họa tiết hoa trang trí góc -->
      <img src="assets/images/decorations/flower-bottom-left.svg" alt="Hoa trang trí góc trên" class="closing-flower closing-flower-top-left" aria-hidden="true">
      <img src="assets/images/decorations/flower-top-right.svg" alt="Hoa trang trí góc dưới" class="closing-flower closing-flower-bottom-right" aria-hidden="true">

      <div class="closing-content reveal-on-scroll">
        <!-- Khung ảnh chân dung oval vòm cong viền vàng -->
        <div class="closing-photo-frame">
          <img id="closingPhoto" src="assets/images/couple/cover.jpg" alt="Ảnh cặp đôi" class="closing-photo-img" loading="lazy">
        </div>

        <!-- Tiêu đề cảm ơn dạng script -->
        <h2 class="closing-title" id="closingTitle">Terima Kasih</h2>

        <!-- Lời tri ân -->
        <p class="closing-message" id="closingMessage">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kedua mempelai.
        </p>

        <!-- Lời kết trang trọng -->
        <p class="closing-signoff" id="closingSignoff">Wassalamu’alaikum Wr. Wb.</p>

        <!-- Dòng chữ phụ -->
        <p class="closing-subsignoff" id="closingSubsignoff">Kami yang berbahagia,</p>

        <!-- Tên cặp đôi -->
        <h3 class="closing-couple-names" id="closingCoupleNames">Hoàng Nam &amp; Khánh Linh</h3>
      </div>
    </footer>`;

if (html.includes(placeholderTarget)) {
  html = html.replace(placeholderTarget, phase67Markup.replace(/\n/g, '\r\n'));
  console.log('Replaced placeholder (CRLF)');
} else if (html.includes(placeholderTargetLF)) {
  html = html.replace(placeholderTargetLF, phase67Markup);
  console.log('Replaced placeholder (LF)');
} else {
  console.error('Placeholder not found');
}

// 3. Thêm Gift Modal trước Bottom Navbar
const modalMarkup = `  <!-- =========================================================================
       MODAL POPUP QUÀ MỪNG CƯỚI (WEDDING GIFT MODAL / AMPLOP DIGITAL)
       ========================================================================= -->
  <div id="giftModal" class="gift-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Thông tin mừng cưới">
    <div class="gift-modal-backdrop" id="giftModalBackdrop"></div>
    <div class="gift-modal-dialog">
      <button type="button" class="gift-modal-close" id="giftModalClose" aria-label="Đóng popup">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h3 class="gift-modal-title" id="giftModalTitle">Amplop Digital</h3>
      <p class="gift-modal-subtitle">Thông tin chuyển khoản mừng cưới</p>

      <!-- Khối tài khoản ngân hàng -->
      <div class="gift-bank-box">
        <div class="gift-bank-name" id="giftBankName">Vietcombank</div>
        <div class="gift-account-number-wrap">
          <span class="gift-account-number" id="giftAccountNumber">9988776655</span>
          <button type="button" class="btn-copy-account" id="btnCopyAccount" aria-label="Sao chép số tài khoản">
            <svg viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span>Sao chép</span>
          </button>
        </div>
        <div class="gift-account-holder" id="giftAccountHolder">VU HOANG NAM</div>
      </div>

      <!-- Mã QR Demo -->
      <div class="gift-qr-wrap">
        <img id="giftQrImg" src="assets/images/decorations/qr-demo.svg" alt="Mã QR Demo mừng cưới" class="gift-qr-img">
      </div>

      <!-- Cảnh báo Demo bắt buộc -->
      <div class="gift-demo-alert" id="giftDemoAlert">
        ⚠️ ĐÂY LÀ QR DEMO MINH HOẠ — VUI LÒNG KHÔNG THỰC HIỆN GIAO DỊCH CHUYỂN TIỀN THẬT.
      </div>
    </div>
  </div>\r\n\r\n`;

const navbarTarget = '  <!-- =========================================================================\r\n       THANH ĐIỀU HƯỚNG CỐ ĐỊNH PHÍA DƯỚI (BOTTOM NAVBAR)';
const navbarTargetLF = '  <!-- =========================================================================\n       THANH ĐIỀU HƯỚNG CỐ ĐỊNH PHÍA DƯỚI (BOTTOM NAVBAR)';

if (html.includes(navbarTarget) && !html.includes('id="giftModal"')) {
  html = html.replace(navbarTarget, modalMarkup + navbarTarget);
  console.log('Added gift modal (CRLF)');
} else if (html.includes(navbarTargetLF) && !html.includes('id="giftModal"')) {
  html = html.replace(navbarTargetLF, modalMarkup.replace(/\r\n/g, '\n') + navbarTargetLF);
  console.log('Added gift modal (LF)');
}

// 4. Thêm script tag cho gift-wishes.js
const scriptTarget = '<script src="assets/js/app.js"></script>';
const scriptAddition = '<script src="assets/js/gift-wishes.js"></script>\r\n  <script src="assets/js/app.js"></script>';

if (html.includes(scriptTarget) && !html.includes('gift-wishes.js')) {
  html = html.replace(scriptTarget, scriptAddition);
  console.log('Added script tag');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html');

