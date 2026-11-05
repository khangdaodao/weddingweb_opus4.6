const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Cập nhật Card 2: Wishes
const card2Start = '      <!-- CARD 2: WISHES (SỔ LỜI CHÚC - KHÔNG RSVP) -->';
const card2End = '      </div>\r\n    </section>';
const card2EndLF = '      </div>\n    </section>';

const card2StartIndex = html.indexOf(card2Start);
let isCRLF = true;
let card2EndIndex = html.indexOf(card2End, card2StartIndex);
if (card2EndIndex === -1) {
  card2EndIndex = html.indexOf(card2EndLF, card2StartIndex);
  isCRLF = false;
}

if (card2StartIndex === -1 || card2EndIndex === -1) {
  console.error('Card 2 boundary not found in index.html');
  process.exit(1);
}

const newCard2Html = `      <!-- CARD 2: WISHES (SỔ LỜI CHÚC - CAROUSEL 3 MỤC, NHÀ TRAI / NHÀ GÁI, VIEW ALL) -->
      <div id="wishes" class="wishes-card-wrapper reveal-on-scroll">
        <div class="gw-white-card wishes-card">
          <h2 class="gw-script-title" id="wishesTitle">Wishes</h2>
          <p class="gw-description" id="wishesSubtitle">
            Gửi những lời chúc tốt đẹp nhất đến cô dâu &amp; chú rể
          </p>

          <!-- Form gửi lời chúc 3 trường -->
          <form id="wishesForm" class="wishes-form">
            <!-- Trường 1: Tên người gửi -->
            <input type="text" id="wishName" class="wish-input" placeholder="Tên của bạn..." required maxlength="50"
              autocomplete="name" aria-label="Tên người gửi">

            <!-- Trường 2: Chọn Nhà trai hoặc Nhà gái -->
            <div class="wish-side-selector" role="radiogroup" aria-label="Khách của nhà">
              <button type="button" class="btn-side-pill active" data-side="groom" id="sideGroomBtn" aria-checked="true" role="radio">
                <span class="side-pill-icon">👨</span>
                <span>Nhà Trai</span>
              </button>
              <button type="button" class="btn-side-pill" data-side="bride" id="sideBrideBtn" aria-checked="false" role="radio">
                <span class="side-pill-icon">👩</span>
                <span>Nhà Gái</span>
              </button>
            </div>
            <input type="hidden" id="wishSide" value="groom">

            <!-- Trường 3: Nội dung lời chúc -->
            <textarea id="wishMessage" class="wish-textarea" placeholder="Nhập lời chúc tốt đẹp của bạn gửi tới cô dâu &amp; chú rể..." rows="3" required maxlength="500"
              aria-label="Lời chúc"></textarea>

            <!-- Nút gửi màu đỏ burgundy -->
            <button type="submit" id="btnSubmitWish" class="btn-wish-submit">Gửi Lời Chúc</button>
          </form>

          <!-- Vạch phân cách -->
          <div class="wishes-divider" aria-hidden="true"></div>

          <!-- Bộ đếm số lượng bình luận -->
          <div class="wishes-count" id="wishesCount">0 Lời Chúc</div>

          <!-- Khung xoay vòng Carousel (hiển thị 3 lời chúc mỗi trang, tự động mờ dần chuyển trang) -->
          <div class="wishes-carousel-wrap" id="wishesCarouselWrap" aria-label="Bình luận xoay vòng">
            <div id="wishesList" class="wishes-list" aria-live="polite">
              <!-- Điền tự động bởi assets/js/gift-wishes.js -->
            </div>

            <!-- Các chấm tròn chuyển trang thủ công -->
            <div class="wishes-dots" id="wishesDots" aria-label="Chuyển trang lời chúc"></div>
          </div>

          <!-- Nút Xem Tất Cả Lời Chúc (View All) -->
          <button type="button" class="btn-view-all-wishes" id="btnViewAllWishes" aria-label="Xem tất cả lời chúc">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
            <span id="btnViewAllWishesText">Xem Tất Cả Lời Chúc</span>
          </button>

          <!-- Ghi chú dữ liệu demo -->
          <p class="wishes-demo-note" id="wishesDemoNote">
            * Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).
          </p>
        </div>`;

const nl = isCRLF ? '\r\n' : '\n';
html = html.substring(0, card2StartIndex) + newCard2Html.replace(/\n/g, nl) + nl + html.substring(card2EndIndex);

// 2. Thêm Modal Xem Tất Cả Lời Chúc sau giftModal
const viewAllModalHtml = `  <!-- =========================================================================
       MODAL POPUP XEM TẤT CẢ LỜI CHÚC (VIEW ALL WISHES MODAL)
       ========================================================================= -->
  <div id="wishesAllModal" class="wishes-all-modal" aria-hidden="true" role="dialog" aria-modal="true"
    aria-label="Xem tất cả lời chúc">
    <div class="wishes-all-backdrop" id="wishesAllBackdrop"></div>
    <div class="wishes-all-dialog">
      <!-- Nút đóng modal -->
      <button type="button" class="wishes-all-close" id="wishesAllClose" aria-label="Đóng danh sách">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
          stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Tiêu đề & phụ đề -->
      <h3 class="wishes-all-title">Sổ Lưu Bút Lời Chúc</h3>
      <p class="wishes-all-subtitle" id="wishesAllSubtitle">Toàn bộ lời chúc phúc từ bạn bè và người thân</p>

      <!-- Bộ lọc Nhà trai / Nhà gái / Tất cả -->
      <div class="wishes-filter-tabs" role="tablist" aria-label="Lọc theo phía gia đình">
        <button type="button" class="btn-filter-tab active" data-filter="all" id="filterAllBtn" role="tab" aria-selected="true">
          <span>Tất Cả</span>
          <span class="filter-count" id="filterAllCount">0</span>
        </button>
        <button type="button" class="btn-filter-tab" data-filter="groom" id="filterGroomBtn" role="tab" aria-selected="false">
          <span>👨 Nhà Trai</span>
          <span class="filter-count" id="filterGroomCount">0</span>
        </button>
        <button type="button" class="btn-filter-tab" data-filter="bride" id="filterBrideBtn" role="tab" aria-selected="false">
          <span>👩 Nhà Gái</span>
          <span class="filter-count" id="filterBrideCount">0</span>
        </button>
      </div>

      <!-- Danh sách cuộn dạng feed Facebook -->
      <div class="wishes-all-scroll-list" id="wishesAllScrollList">
        <!-- Điền tự động bởi assets/js/gift-wishes.js -->
      </div>
    </div>
  </div>\r\n\r\n`;

const modalInsertTarget = '  <!-- =========================================================================\r\n       THANH ĐIỀU HƯỚNG CỐ ĐỊNH PHÍA DƯỚI (BOTTOM NAVBAR)';
const modalInsertTargetLF = '  <!-- =========================================================================\n       THANH ĐIỀU HƯỚNG CỐ ĐỊNH PHÍA DƯỚI (BOTTOM NAVBAR)';

if (!html.includes('id="wishesAllModal"')) {
  if (html.includes(modalInsertTarget)) {
    html = html.replace(modalInsertTarget, viewAllModalHtml + modalInsertTarget);
    console.log('Inserted wishesAllModal before navbar (CRLF)');
  } else if (html.includes(modalInsertTargetLF)) {
    html = html.replace(modalInsertTargetLF, viewAllModalHtml.replace(/\r\n/g, '\n') + modalInsertTargetLF);
    console.log('Inserted wishesAllModal before navbar (LF)');
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with new Wishes structure and modal');

