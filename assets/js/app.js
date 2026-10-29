/**
 * ==============================================================================
 * ỨNG DỤNG CHÍNH (APP INITIALIZATION)
 * ==============================================================================
 * Đọc dữ liệu từ WEDDING_CONFIG và render động các thành phần Phase 1.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("Lỗi: Không tìm thấy WEDDING_CONFIG.");
    return;
  }

  // 1. Render thông tin lên Cover Overlay
  renderCoverData(WEDDING_CONFIG);

  // 2. Render thông tin lên Hero & Countdown Section
  renderHeroData(WEDDING_CONFIG);

  // 3. Khởi tạo Countdown
  initCountdown(WEDDING_CONFIG.weddingDate);

  // 4. Khởi tạo Trình điều khiển Nhạc
  const musicController = initMusic(WEDDING_CONFIG.music.src);

  // 5. Khởi tạo Bottom Navbar
  const navbarController = initNavbar();

  // 6. Khởi tạo hiệu ứng cánh hoa rơi
  initPetals();

  // 7. Khởi tạo sự kiện mở thiệp
  initCover(() => {
    // Khi người dùng bấm "Mở Thiệp":
    musicController.showButton();
    if (WEDDING_CONFIG.music.autoplayOnOpen) {
      musicController.play();
    }
    navbarController.showNavbar();
  });

  // Hỗ trợ kiểm thử tự động: nếu có tham số ?opened=1 trên URL, tự động mở thiệp ngay lập tức
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("opened") === "1") {
    const coverOverlay = document.getElementById("coverOverlay");
    if (coverOverlay) {
      coverOverlay.classList.add("opened");
      document.body.classList.remove("lock-scroll");
      document.body.classList.add("is-opened");
      musicController.showButton();
      navbarController.showNavbar();
    }
  }
});

/**
 * Điền dữ liệu vào Cover Overlay
 */
function renderCoverData(cfg) {
  const elTagline = document.getElementById("coverTagline");
  const elNames = document.getElementById("coverNames");
  const elDate = document.getElementById("coverDate");
  const elRecipientName = document.getElementById("coverRecipientName");
  const elPhoto = document.getElementById("coverPhoto");

  if (elTagline) elTagline.textContent = cfg.invitationTag;
  if (elNames) elNames.textContent = `${cfg.groom.shortName} & ${cfg.bride.shortName}`;
  if (elDate) elDate.textContent = cfg.dateFormatted;
  if (elPhoto) elPhoto.src = cfg.groom.photo || "assets/images/couple/cover.jpg";

  // Lấy tên khách mời từ query parameter (?to=...) nếu có
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to") || urlParams.get("u") || cfg.guestGreetingDefault;
  if (elRecipientName) elRecipientName.textContent = guestName;
}

/**
 * Điền dữ liệu vào Hero Section
 */
function renderHeroData(cfg) {
  const elTagline = document.getElementById("heroTagline");
  const elNames = document.getElementById("heroNames");
  const elDate = document.getElementById("heroDate");
  const elDesc = document.getElementById("heroDesc");
  const elPhoto = document.getElementById("heroPhoto");
  const elSaveDateBtn = document.getElementById("btnSaveDate");

  if (elTagline) elTagline.textContent = cfg.invitationTag;
  if (elNames) elNames.textContent = `${cfg.groom.shortName} & ${cfg.bride.shortName}`;
  if (elDate) elDate.textContent = cfg.dateFormatted;
  if (elDesc) elDesc.textContent = cfg.heroInvitationText;
  if (elPhoto) elPhoto.src = cfg.groom.photo || "assets/images/couple/cover.jpg";

  // Xử lý nút "Lưu Ngày Trọng Đại" (cuộn xuống mục sự kiện hoặc tải lịch)
  if (elSaveDateBtn) {
    elSaveDateBtn.addEventListener("click", () => {
      const eventsEl = document.getElementById("events");
      if (eventsEl) {
        eventsEl.scrollIntoView({ behavior: "smooth" });
      } else {
        alert(`Ngày cưới: ${cfg.dateFormatted}. Hân hạnh được đón tiếp bạn!`);
      }
    });
  }
}
