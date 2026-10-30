/**
 * ==============================================================================
 * ỨNG DỤNG CHÍNH (APP INITIALIZATION)
 * ==============================================================================
 * Đọc dữ liệu từ WEDDING_CONFIG và render động các thành phần theo từng Phase.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("Lỗi: Không tìm thấy WEDDING_CONFIG.");
    return;
  }

  // 1. Render thông tin lên Cover Overlay (Phase 1)
  renderCoverData(WEDDING_CONFIG);

  // 2. Render thông tin lên Hero & Countdown Section (Phase 1)
  renderHeroData(WEDDING_CONFIG);

  // 3. Render thông tin lên Section Quote & Couple Profile (Phase 2)
  renderQuoteData(WEDDING_CONFIG);
  renderCoupleData(WEDDING_CONFIG);

  // 4. Render thông tin lên Section Wedding Events (Phase 3)
  renderEventsData(WEDDING_CONFIG);

  // 5. Khởi tạo Scroll Reveal Observer cho các phần tử khi cuộn tới
  initScrollReveal();

  // 6. Khởi tạo Countdown
  initCountdown(WEDDING_CONFIG.weddingDate);

  // 7. Khởi tạo Trình điều khiển Nhạc
  const musicController = initMusic(WEDDING_CONFIG.music.src);

  // 8. Khởi tạo Bottom Navbar
  const navbarController = initNavbar();

  // 9. Khởi tạo hiệu ứng cánh hoa rơi (Hero Section)
  initPetals();

  // 10. Khởi tạo sự kiện mở thiệp
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

  // Xử lý nút "Lưu Ngày Trọng Đại" (cuộn xuống mục sự kiện)
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

/**
 * Điền dữ liệu vào Section Quote (Phase 2)
 */
function renderQuoteData(cfg) {
  const elQuote = document.getElementById("quoteText");
  const elAuthor = document.getElementById("quoteAuthor");

  if (elQuote && cfg.quote) elQuote.textContent = cfg.quote.content;
  if (elAuthor && cfg.quote) elAuthor.textContent = cfg.quote.author;
}

/**
 * Điền dữ liệu vào Section Couple Profile (Phase 2)
 * Cô dâu trước, Chú rể sau. Không hiển thị thông tin cha mẹ.
 */
function renderCoupleData(cfg) {
  // Lời chào đầu
  const elGreetingTitle = document.getElementById("coupleGreetingTitle");
  const elGreetingSub = document.getElementById("coupleGreetingSub");
  if (elGreetingTitle && cfg.coupleGreeting) elGreetingTitle.textContent = cfg.coupleGreeting.title;
  if (elGreetingSub && cfg.coupleGreeting) elGreetingSub.textContent = cfg.coupleGreeting.subtitle;

  // 1. Cô Dâu
  const elBridePhoto = document.getElementById("bridePhoto");
  const elBrideOverlay = document.getElementById("brideOverlayName");
  const elBrideFullName = document.getElementById("brideFullName");
  const elBrideBio = document.getElementById("brideBio");
  const elBrideFb = document.getElementById("brideFb");
  const elBrideIg = document.getElementById("brideIg");

  if (cfg.bride) {
    if (elBridePhoto) elBridePhoto.src = cfg.bride.photo || "assets/images/couple/bride.jpg";
    if (elBrideOverlay) elBrideOverlay.textContent = cfg.bride.shortName;
    if (elBrideFullName) elBrideFullName.textContent = cfg.bride.fullName;
    if (elBrideBio) elBrideBio.textContent = cfg.bride.bio;
    if (elBrideFb && cfg.bride.facebook) elBrideFb.href = cfg.bride.facebook;
    if (elBrideIg && cfg.bride.instagram) elBrideIg.href = cfg.bride.instagram;
  }

  // 2. Chú Rể
  const elGroomPhoto = document.getElementById("groomPhoto");
  const elGroomOverlay = document.getElementById("groomOverlayName");
  const elGroomFullName = document.getElementById("groomFullName");
  const elGroomBio = document.getElementById("groomBio");
  const elGroomFb = document.getElementById("groomFb");
  const elGroomIg = document.getElementById("groomIg");

  if (cfg.groom) {
    if (elGroomPhoto) elGroomPhoto.src = cfg.groom.photo || "assets/images/couple/groom.jpg";
    if (elGroomOverlay) elGroomOverlay.textContent = cfg.groom.shortName;
    if (elGroomFullName) elGroomFullName.textContent = cfg.groom.fullName;
    if (elGroomBio) elGroomBio.textContent = cfg.groom.bio;
    if (elGroomFb && cfg.groom.facebook) elGroomFb.href = cfg.groom.facebook;
    if (elGroomIg && cfg.groom.instagram) elGroomIg.href = cfg.groom.instagram;
  }
}

/**
 * Điền dữ liệu vào Section Wedding Events (Phase 3)
 * Bao gồm hai khối sự kiện riêng biệt: Lễ Thành Hôn & Tiệc Cưới
 */
function renderEventsData(cfg) {
  if (!cfg.events) return;

  const elEventsHeading = document.getElementById("eventsHeading");
  if (elEventsHeading && cfg.events.sectionHeading) {
    elEventsHeading.textContent = cfg.events.sectionHeading;
  }

  // 1. Khối A: Lễ Thành Hôn
  const ceremony = cfg.events.ceremony;
  if (ceremony) {
    const elName = document.getElementById("ceremonyName");
    const elMonth = document.getElementById("ceremonyMonth");
    const elDayOfWeek = document.getElementById("ceremonyDayOfWeek");
    const elDayNumber = document.getElementById("ceremonyDayNumber");
    const elYear = document.getElementById("ceremonyYear");
    const elTime = document.getElementById("ceremonyTime");
    const elVenue = document.getElementById("ceremonyVenue");
    const elAddress = document.getElementById("ceremonyAddress");
    const elMapBtn = document.getElementById("ceremonyMapBtn");

    if (elName) elName.textContent = ceremony.eventName;
    if (elMonth) elMonth.textContent = ceremony.month;
    if (elDayOfWeek) elDayOfWeek.textContent = ceremony.dayOfWeek;
    if (elDayNumber) elDayNumber.textContent = ceremony.dayNumber;
    if (elYear) elYear.textContent = ceremony.year;
    if (elTime) elTime.textContent = ceremony.time;
    if (elVenue) elVenue.textContent = ceremony.venue;
    if (elAddress) elAddress.textContent = ceremony.address;
    if (elMapBtn && ceremony.googleMapsUrl) {
      elMapBtn.href = ceremony.googleMapsUrl;
    }
  }

  // 2. Khối B: Tiệc Cưới
  const reception = cfg.events.reception;
  if (reception) {
    const elName = document.getElementById("receptionName");
    const elMonth = document.getElementById("receptionMonth");
    const elDayOfWeek = document.getElementById("receptionDayOfWeek");
    const elDayNumber = document.getElementById("receptionDayNumber");
    const elYear = document.getElementById("receptionYear");
    const elTime = document.getElementById("receptionTime");
    const elVenue = document.getElementById("receptionVenue");
    const elAddress = document.getElementById("receptionAddress");
    const elMapBtn = document.getElementById("receptionMapBtn");

    if (elName) elName.textContent = reception.eventName;
    if (elMonth) elMonth.textContent = reception.month;
    if (elDayOfWeek) elDayOfWeek.textContent = reception.dayOfWeek;
    if (elDayNumber) elDayNumber.textContent = reception.dayNumber;
    if (elYear) elYear.textContent = reception.year;
    if (elTime) elTime.textContent = reception.time;
    if (elVenue) elVenue.textContent = reception.venue;
    if (elAddress) elAddress.textContent = reception.address;
    if (elMapBtn && reception.googleMapsUrl) {
      elMapBtn.href = reception.googleMapsUrl;
    }
  }
}

/**
 * Khởi tạo hiệu ứng xuất hiện khi cuộn tới (Scroll Reveal)
 */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback nếu trình duyệt cũ không có IntersectionObserver
    elements.forEach(el => el.classList.add("in-view"));
  }
}
