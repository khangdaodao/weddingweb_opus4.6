const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'gift-wishes.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Thay thế từ section CARD 2: WISHES đến hết file
const targetComment = '/* --------------------------------------------------------------------------\n   CARD 2: WISHES (SỔ LỜI CHÚC)\n   -------------------------------------------------------------------------- */';
const targetIndex = css.indexOf(targetComment);

if (targetIndex === -1) {
  console.error('Target comment not found in gift-wishes.css');
  process.exit(1);
}

const newCss = `/* --------------------------------------------------------------------------
   CARD 2: WISHES (SỔ LỜI CHÚC)
   -------------------------------------------------------------------------- */
.wishes-count {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  color: #1F2937;
  text-align: center;
  margin: 0 0 14px 0;
}

/* Form gửi lời chúc */
.wishes-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

/* Thanh chọn Nhà trai / Nhà gái */
.wish-side-selector {
  display: flex;
  gap: 10px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.btn-side-pill {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1.5px solid #E5E7EB;
  background-color: #FAF4EE;
  color: #4A0808;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.btn-side-pill:hover {
  background-color: #F4E8D3;
  border-color: rgba(200, 163, 102, 0.7);
}

.btn-side-pill.active {
  background-color: #4A0808;
  border-color: #4A0808;
  color: #FFFFFF;
  box-shadow: 0 3px 10px rgba(74, 8, 8, 0.25);
}

.btn-side-pill .side-pill-icon {
  font-size: 14px;
  line-height: 1;
}

.wish-input,
.wish-textarea {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-sans);
  font-size: 13.5px;
  color: #1F2937;
  background-color: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.wish-input:focus,
.wish-textarea:focus {
  border-color: #4A0808;
  box-shadow: 0 0 0 3px rgba(74, 8, 8, 0.12);
}

.wish-textarea {
  resize: vertical;
  min-height: 72px;
}

/* Nút gửi màu đỏ burgundy nổi bật */
.btn-wish-submit {
  align-self: flex-start;
  background-color: #4A0808;
  color: #FFFFFF;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(74, 8, 8, 0.25);
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  margin-top: 2px;
}

.btn-wish-submit:hover {
  background-color: #380404;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(74, 8, 8, 0.35);
}

.btn-wish-submit:active {
  transform: translateY(1px);
}

/* Đường phân cách */
.wishes-divider {
  height: 1px;
  background-color: #E5E7EB;
  margin: 18px 0 14px 0;
}

/* Khung Carousel xoay vòng 3 lời chúc */
.wishes-carousel-wrap {
  position: relative;
  text-align: left;
}

.wishes-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: left;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.wishes-list.fade-out {
  opacity: 0;
  transform: translateY(6px);
}

/* Từng lời chúc có Avatar */
.wish-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  text-align: left;
}

.wish-item:last-child {
  border-bottom: none;
}

.wish-avatar-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid rgba(200, 163, 102, 0.5);
  flex-shrink: 0;
  background-color: #FAF4EE;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.wish-item-main {
  flex: 1;
  min-width: 0;
}

.wish-item-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.wish-author {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
}

/* Huy hiệu nhà trai / nhà gái */
.wish-side-badge {
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 10px;
  line-height: 1.3;
}

.wish-side-badge.groom {
  background-color: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #DBEAFE;
}

.wish-side-badge.bride {
  background-color: #FDF2F8;
  color: #BE185D;
  border: 1px solid #FCE7F3;
}

/* Icon tích xanh đã xác thực */
.wish-verified {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
}

.wish-verified svg {
  width: 14px;
  height: 14px;
}

.wish-text {
  font-family: var(--font-sans);
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  margin: 0 0 6px 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.wish-item-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-sans);
  font-size: 11.5px;
  color: #6B7280;
}

.wish-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wish-time svg {
  width: 12px;
  height: 12px;
}

.wish-reply-btn {
  background: none;
  border: none;
  padding: 0;
  color: #111827;
  font-family: var(--font-sans);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
}

.wish-reply-btn:hover {
  text-decoration: underline;
}

/* Các chấm tròn chuyển trang thủ công (Dots Indicator) */
.wishes-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 16px 0;
}

.wish-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #D1D5DB;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.wish-dot:hover {
  background-color: #9CA3AF;
}

.wish-dot.active {
  width: 22px;
  border-radius: 4px;
  background-color: #4A0808;
}

/* Nút Xem Tất Cả Lời Chúc (View All Button) */
.btn-view-all-wishes {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background-color: #FAF4EE;
  border: 1.5px solid rgba(200, 163, 102, 0.45);
  border-radius: 10px;
  padding: 10px 16px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  color: #4A0808;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, transform 0.15s;
  box-sizing: border-box;
  margin-top: 4px;
  margin-bottom: 4px;
}

.btn-view-all-wishes:hover {
  background-color: #F4E8D3;
  border-color: #4A0808;
  transform: translateY(-1px);
}

.btn-view-all-wishes:active {
  transform: translateY(1px);
}

.btn-view-all-wishes svg {
  flex-shrink: 0;
}

/* Ghi chú demo ở đáy card */
.wishes-demo-note {
  font-family: var(--font-sans);
  font-size: 11px;
  font-style: italic;
  color: #9CA3AF;
  text-align: center;
  margin: 10px 0 0 0;
}

/* --------------------------------------------------------------------------
   MODAL POPUP XEM TẤT CẢ LỜI CHÚC (VIEW ALL WISHES MODAL)
   -------------------------------------------------------------------------- */
.wishes-all-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.wishes-all-modal.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wishes-all-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 3, 3, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wishes-all-dialog {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 440px;
  height: 85vh;
  max-height: 640px;
  background-color: #FFFDFC;
  border-radius: 20px;
  padding: 24px 20px 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transform: scale(0.92) translateY(12px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.wishes-all-modal.is-open .wishes-all-dialog {
  transform: scale(1) translateY(0);
}

.wishes-all-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  background: rgba(74, 8, 8, 0.08);
  border: none;
  border-radius: 50%;
  color: #4A0808;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
}

.wishes-all-close:hover {
  background: rgba(74, 8, 8, 0.16);
  transform: scale(1.05);
}

.wishes-all-close svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}

.wishes-all-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: #4A0808;
  margin: 0 0 4px 0;
  text-align: center;
}

.wishes-all-subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #7D5E5A;
  margin: 0 0 14px 0;
  text-align: center;
}

/* Các tab lọc (Tất cả / Nhà trai / Nhà gái) */
.wishes-filter-tabs {
  display: flex;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 12px;
}

.btn-filter-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 7px 8px;
  border-radius: 18px;
  border: 1px solid #E5E7EB;
  background-color: #FAF4EE;
  color: #4A0808;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.btn-filter-tab:hover {
  background-color: #F4E8D3;
}

.btn-filter-tab.active {
  background-color: #4A0808;
  color: #FFFFFF;
  border-color: #4A0808;
  box-shadow: 0 2px 8px rgba(74, 8, 8, 0.2);
}

.btn-filter-tab .filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  font-size: 10.5px;
  font-weight: 700;
}

.btn-filter-tab.active .filter-count {
  background-color: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

.btn-filter-tab:not(.active) .filter-count {
  background-color: #E5E7EB;
  color: #4B5563;
}

/* Vùng cuộn dọc dạng feed lướt Facebook */
.wishes-all-scroll-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 0;
  -webkit-overflow-scrolling: touch;
}

.wishes-all-scroll-list::-webkit-scrollbar {
  width: 4px;
}

.wishes-all-scroll-list::-webkit-scrollbar-thumb {
  background-color: rgba(74, 8, 8, 0.2);
  border-radius: 4px;
}
`;

css = css.substring(0, targetIndex) + newCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated gift-wishes.css');

