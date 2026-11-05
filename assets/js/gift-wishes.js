/**
 * ==============================================================================
 * PHASE 6: WEDDING GIFT & WISHES JAVASCRIPT
 * ==============================================================================
 * Quản lý tương tác:
 * 1. Mở / Đóng popup modal Quà mừng cưới (Amplop Digital) & sao chép số tài khoản
 * 2. Form gửi lời chúc (Tên, Nhà trai / Nhà gái, Lời chúc)
 * 3. Hiển thị xoay vòng 3 lời chúc mỗi trang (Carousel fade transition)
 *    - Tự động chuyển trang sau 5 giây
 *    - Tạm dừng khi rê chuột (hover) hoặc chạm tay (touch)
 *    - Chấm tròn chuyển trang thủ công (dots indicator)
 * 4. Popup Modal "Xem tất cả lời chúc" (View All)
 *    - Cuộn dọc như feed Facebook
 *    - Bộ lọc tab [Tất Cả] [Nhà Trai] [Nhà Gái]
 * 5. TUYỆT ĐỐI: Không có chức năng RSVP
 */

function initGiftWishes(cfg) {
  if (!cfg) return;

  const giftCfg = cfg.gift || {};
  const wishesCfg = cfg.wishes || {};

  // --------------------------------------------------------------------------
  // 1. POPUP MODAL MỪNG CƯỚI (WEDDING GIFT)
  // --------------------------------------------------------------------------
  const btnOpenAmplop = document.getElementById("btnOpenAmplop");
  const giftModal = document.getElementById("giftModal");
  const giftModalClose = document.getElementById("giftModalClose");
  const giftModalBackdrop = document.getElementById("giftModalBackdrop");
  const btnCopyAccount = document.getElementById("btnCopyAccount");

  // Điền dữ liệu cấu hình vào modal
  const elBankName = document.getElementById("giftBankName");
  const elAccNumber = document.getElementById("giftAccountNumber");
  const elAccHolder = document.getElementById("giftAccountHolder");
  const elQrImg = document.getElementById("giftQrImg");
  const elDemoAlert = document.getElementById("giftDemoAlert");

  const accountInfo = giftCfg.account || {};

  if (elBankName && accountInfo.shortBankName) elBankName.textContent = accountInfo.shortBankName;
  if (elAccNumber && accountInfo.accountNumber) elAccNumber.textContent = accountInfo.accountNumber;
  if (elAccHolder && accountInfo.accountName) elAccHolder.textContent = accountInfo.accountName;
  if (elQrImg && accountInfo.qrCodeImage) elQrImg.src = accountInfo.qrCodeImage;
  if (elDemoAlert && accountInfo.demoWarning) elDemoAlert.textContent = accountInfo.demoWarning;

  function openGiftModal() {
    if (!giftModal) return;
    giftModal.classList.add("is-open");
    giftModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGiftModal() {
    if (!giftModal) return;
    giftModal.classList.remove("is-open");
    giftModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnOpenAmplop) {
    btnOpenAmplop.addEventListener("click", (e) => {
      e.preventDefault();
      openGiftModal();
    });
  }

  if (giftModalClose) giftModalClose.addEventListener("click", closeGiftModal);
  if (giftModalBackdrop) giftModalBackdrop.addEventListener("click", closeGiftModal);

  // Sao chép số tài khoản
  if (btnCopyAccount) {
    btnCopyAccount.addEventListener("click", () => {
      const accNum = accountInfo.accountNumber || (elAccNumber ? elAccNumber.textContent.trim() : "");
      if (!accNum) return;

      const originalHtml = btnCopyAccount.innerHTML;

      const triggerCopiedState = () => {
        btnCopyAccount.classList.add("copied");
        btnCopyAccount.innerHTML = `
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>${accountInfo.copiedText || "Đã sao chép!"}</span>
        `;

        setTimeout(() => {
          btnCopyAccount.classList.remove("copied");
          btnCopyAccount.innerHTML = originalHtml;
        }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(accNum)
          .then(triggerCopiedState)
          .catch(() => fallbackCopy(accNum, triggerCopiedState));
      } else {
        fallbackCopy(accNum, triggerCopiedState);
      }
    });
  }

  function fallbackCopy(text, onSuccess) {
    try {
      const tempInput = document.createElement("textarea");
      tempInput.value = text;
      tempInput.style.position = "fixed";
      tempInput.style.top = "-9999px";
      tempInput.style.left = "-9999px";
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    } catch (e) {
      console.warn("Fallback copy failed:", e);
    }
    if (onSuccess) onSuccess();
  }

  // --------------------------------------------------------------------------
  // 2. SỔ LỜI CHÚC (WISHES - CAROUSEL 3 MỤC, PHÂN LOẠI NHÀ, VIEW ALL)
  // --------------------------------------------------------------------------
  const wishesForm = document.getElementById("wishesForm");
  const wishNameInput = document.getElementById("wishName");
  const wishMessageInput = document.getElementById("wishMessage");
  const wishSideInput = document.getElementById("wishSide");
  const sideGroomBtn = document.getElementById("sideGroomBtn");
  const sideBrideBtn = document.getElementById("sideBrideBtn");

  const wishesList = document.getElementById("wishesList");
  const wishesDots = document.getElementById("wishesDots");
  const wishesCount = document.getElementById("wishesCount");
  const wishesCarouselWrap = document.getElementById("wishesCarouselWrap");

  const btnViewAllWishes = document.getElementById("btnViewAllWishes");
  const wishesAllModal = document.getElementById("wishesAllModal");
  const wishesAllClose = document.getElementById("wishesAllClose");
  const wishesAllBackdrop = document.getElementById("wishesAllBackdrop");
  const wishesAllScrollList = document.getElementById("wishesAllScrollList");

  const filterAllBtn = document.getElementById("filterAllBtn");
  const filterGroomBtn = document.getElementById("filterGroomBtn");
  const filterBrideBtn = document.getElementById("filterBrideBtn");
  const filterAllCount = document.getElementById("filterAllCount");
  const filterGroomCount = document.getElementById("filterGroomCount");
  const filterBrideCount = document.getElementById("filterBrideCount");

  const STORAGE_KEY = "wedding_demo_wishes_v2";
  const AVATAR_MAN = "assets/images/avatars/man.jpg";
  const AVATAR_WOMEN = "assets/images/avatars/women.jpg";

  // Quản lý trạng thái Carousel
  const PAGE_SIZE = 3;
  let currentPage = 0;
  let autoPlayTimer = null;
  const AUTOPLAY_DELAY = 5000; // 5 giây đổi trang một lần
  let currentFilter = "all";

  // 2.1. Đọc và Lưu dữ liệu lời chúc
  function getComments() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Lỗi đọc localStorage:", e);
    }
    return wishesCfg.initialComments || [];
  }

  function saveComments(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Lỗi lưu localStorage:", e);
    }
  }

  // 2.2. Xử lý nút chọn Nhà Trai / Nhà Gái
  let selectedSide = "groom";

  function setSide(side) {
    selectedSide = side;
    if (wishSideInput) wishSideInput.value = side;

    if (side === "groom") {
      if (sideGroomBtn) {
        sideGroomBtn.classList.add("active");
        sideGroomBtn.setAttribute("aria-checked", "true");
      }
      if (sideBrideBtn) {
        sideBrideBtn.classList.remove("active");
        sideBrideBtn.setAttribute("aria-checked", "false");
      }
    } else {
      if (sideBrideBtn) {
        sideBrideBtn.classList.add("active");
        sideBrideBtn.setAttribute("aria-checked", "true");
      }
      if (sideGroomBtn) {
        sideGroomBtn.classList.remove("active");
        sideGroomBtn.setAttribute("aria-checked", "false");
      }
    }
  }

  if (sideGroomBtn) {
    sideGroomBtn.addEventListener("click", () => setSide("groom"));
  }
  if (sideBrideBtn) {
    sideBrideBtn.addEventListener("click", () => setSide("bride"));
  }

  // 2.3. Tạo HTML cho từng lời chúc (kèm Avatar & Huy hiệu nhà trai/gái)
  function buildWishItemHtml(item) {
    const isBride = item.side === "bride";
    const avatarSrc = item.avatar || (isBride ? AVATAR_WOMEN : AVATAR_MAN);
    const badgeText = isBride ? "Nhà Gái" : "Nhà Trai";
    const badgeClass = isBride ? "bride" : "groom";

    return `
      <div class="wish-item">
        <img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(badgeText)}" class="wish-avatar-img" loading="lazy" onerror="this.src='${isBride ? AVATAR_WOMEN : AVATAR_MAN}'">
        <div class="wish-item-main">
          <div class="wish-item-header">
            <span class="wish-author">${escapeHtml(item.name)}</span>
            <span class="wish-verified" title="Đã xác thực" aria-label="Đã xác thực">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#10B981">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </span>
            <span class="wish-side-badge ${badgeClass}">${badgeText}</span>
          </div>
          <p class="wish-text">${escapeHtml(item.content)}</p>
          <div class="wish-item-footer">
            <span class="wish-time">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${escapeHtml(item.time || "Vừa xong")}
            </span>
            <button type="button" class="wish-reply-btn">${escapeHtml(wishesCfg.replyText || "Trả lời")}</button>
          </div>
        </div>
      </div>
    `;
  }

  // 2.4. Render Carousel 3 lời chúc mỗi trang với hiệu ứng Fade
  function renderCarouselPage(page, animate = true) {
    if (!wishesList) return;
    const comments = getComments();
    const totalCount = comments.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    if (page >= totalPages) page = 0;
    if (page < 0) page = totalPages - 1;
    currentPage = page;

    // Cập nhật bộ đếm
    if (wishesCount) {
      wishesCount.textContent = `${totalCount} Lời Chúc`;
    }

    const startIndex = currentPage * PAGE_SIZE;
    const pageItems = comments.slice(startIndex, startIndex + PAGE_SIZE);

    const updateDom = () => {
      wishesList.innerHTML = pageItems.map(buildWishItemHtml).join("");
      renderDots(totalPages, currentPage);
      wishesList.classList.remove("fade-out");
    };

    if (animate) {
      wishesList.classList.add("fade-out");
      setTimeout(updateDom, 200);
    } else {
      updateDom();
    }
  }

  // Render các chấm tròn chuyển trang
  function renderDots(totalPages, currentIdx) {
    if (!wishesDots) return;
    if (totalPages <= 1) {
      wishesDots.innerHTML = "";
      return;
    }

    let dotsHtml = "";
    for (let i = 0; i < totalPages; i++) {
      const activeClass = i === currentIdx ? "active" : "";
      dotsHtml += `<button type="button" class="wish-dot ${activeClass}" data-page="${i}" aria-label="Trang ${i + 1}"></button>`;
    }
    wishesDots.innerHTML = dotsHtml;

    wishesDots.querySelectorAll(".wish-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const pageIdx = parseInt(dot.getAttribute("data-page"), 10);
        goToPage(pageIdx);
      });
    });
  }

  function goToPage(pageIdx) {
    renderCarouselPage(pageIdx, true);
    resetAutoPlay();
  }

  // 2.5. Cơ chế Tự Động Xoay Vòng & Tạm Dừng khi Hover / Touch
  function startAutoPlay() {
    stopAutoPlay();
    const comments = getComments();
    const totalPages = Math.ceil(comments.length / PAGE_SIZE);
    if (totalPages <= 1) return;

    autoPlayTimer = setInterval(() => {
      const next = (currentPage + 1) % totalPages;
      renderCarouselPage(next, true);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (wishesCarouselWrap) {
    // Tạm dừng khi rê chuột trên desktop
    wishesCarouselWrap.addEventListener("mouseenter", stopAutoPlay);
    wishesCarouselWrap.addEventListener("mouseleave", startAutoPlay);

    // Tạm dừng khi chạm tay trên điện thoại
    wishesCarouselWrap.addEventListener("touchstart", stopAutoPlay, { passive: true });
    wishesCarouselWrap.addEventListener("touchend", () => {
      setTimeout(startAutoPlay, 2500); // Sau khi nhấc tay 2.5s thì chạy tiếp
    }, { passive: true });
  }

  // 2.6. Xử lý gửi lời chúc mới
  if (wishesForm) {
    wishesForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = wishNameInput ? wishNameInput.value.trim() : "";
      const content = wishMessageInput ? wishMessageInput.value.trim() : "";
      const side = selectedSide || "groom";

      if (!name || !content) return;

      const newWish = {
        id: "w_" + Date.now(),
        name: name,
        content: content,
        side: side,
        avatar: side === "bride" ? AVATAR_WOMEN : AVATAR_MAN,
        time: wishesCfg.timeAgoText || "Vừa xong",
        date: new Date().toISOString()
      };

      const currentComments = getComments();
      currentComments.unshift(newWish); // Thêm lời chúc mới lên đầu danh sách
      saveComments(currentComments);

      // Quay về trang 0 để hiển thị ngay lời chúc vừa gửi
      renderCarouselPage(0, true);
      resetAutoPlay();
      updateViewAllModal();

      // Reset ô nhập lời chúc
      if (wishMessageInput) wishMessageInput.value = "";
      if (wishNameInput) wishNameInput.value = "";
    });
  }

  // --------------------------------------------------------------------------
  // 3. POPUP MODAL XEM TẤT CẢ LỜI CHÚC (VIEW ALL WISHES FEED)
  // --------------------------------------------------------------------------
  function openViewAllModal() {
    if (!wishesAllModal) return;
    wishesAllModal.classList.add("is-open");
    wishesAllModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateViewAllModal();
  }

  function closeViewAllModal() {
    if (!wishesAllModal) return;
    wishesAllModal.classList.remove("is-open");
    wishesAllModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnViewAllWishes) {
    btnViewAllWishes.addEventListener("click", (e) => {
      e.preventDefault();
      openViewAllModal();
    });
  }

  if (wishesAllClose) wishesAllClose.addEventListener("click", closeViewAllModal);
  if (wishesAllBackdrop) wishesAllBackdrop.addEventListener("click", closeViewAllModal);

  // Đóng modal bằng phím Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (wishesAllModal && wishesAllModal.classList.contains("is-open")) closeViewAllModal();
      if (giftModal && giftModal.classList.contains("is-open")) closeGiftModal();
    }
  });

  // 3.1. Cập nhật và Lọc danh sách trong Modal View All
  function updateViewAllModal() {
    if (!wishesAllScrollList) return;
    const comments = getComments();

    const countAll = comments.length;
    const countGroom = comments.filter((c) => c.side === "groom").length;
    const countBride = comments.filter((c) => c.side === "bride").length;

    if (filterAllCount) filterAllCount.textContent = countAll;
    if (filterGroomCount) filterGroomCount.textContent = countGroom;
    if (filterBrideCount) filterBrideCount.textContent = countBride;

    let filtered = comments;
    if (currentFilter === "groom") {
      filtered = comments.filter((c) => c.side === "groom");
    } else if (currentFilter === "bride") {
      filtered = comments.filter((c) => c.side === "bride");
    }

    if (filtered.length === 0) {
      wishesAllScrollList.innerHTML = `
        <div style="text-align: center; padding: 40px 16px; color: #9CA3AF; font-size: 13px;">
          Chưa có lời chúc nào trong mục này. Hãy là người đầu tiên gửi lời chúc nhé!
        </div>
      `;
    } else {
      wishesAllScrollList.innerHTML = filtered.map(buildWishItemHtml).join("");
    }
  }

  function setFilter(filterType) {
    currentFilter = filterType;
    [filterAllBtn, filterGroomBtn, filterBrideBtn].forEach((btn) => {
      if (!btn) return;
      const isSelected = btn.getAttribute("data-filter") === filterType;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-selected", isSelected ? "true" : "false");
    });
    updateViewAllModal();
  }

  if (filterAllBtn) filterAllBtn.addEventListener("click", () => setFilter("all"));
  if (filterGroomBtn) filterGroomBtn.addEventListener("click", () => setFilter("groom"));
  if (filterBrideBtn) filterBrideBtn.addEventListener("click", () => setFilter("bride"));

  // Khởi tạo ban đầu
  setSide("groom");
  renderCarouselPage(0, false);
  startAutoPlay();
}

/**
 * Hàm lọc ký tự đặc biệt phòng ngừa XSS
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
