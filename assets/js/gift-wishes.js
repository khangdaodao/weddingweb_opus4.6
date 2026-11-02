/**
 * ==============================================================================
 * PHASE 6: WEDDING GIFT & WISHES JAVASCRIPT
 * ==============================================================================
 * Quản lý tương tác:
 * 1. Mở / Đóng popup modal Quà mừng cưới (Amplop Digital)
 * 2. Sao chép số tài khoản vào clipboard kèm hiệu ứng phản hồi
 * 3. Gửi lời chúc, lưu trữ client-side (localStorage) và hiển thị trực tiếp
 * 4. TUYỆT ĐỐI: Không có chức năng RSVP
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

  if (elBankName && accountInfo.shortBankName) {
    elBankName.textContent = accountInfo.shortBankName;
  }
  if (elAccNumber && accountInfo.accountNumber) {
    elAccNumber.textContent = accountInfo.accountNumber;
  }
  if (elAccHolder && accountInfo.accountName) {
    elAccHolder.textContent = accountInfo.accountName;
  }
  if (elQrImg && accountInfo.qrCodeImage) {
    elQrImg.src = accountInfo.qrCodeImage;
  }
  if (elDemoAlert && accountInfo.demoWarning) {
    elDemoAlert.textContent = accountInfo.demoWarning;
  }

  // Mở modal
  function openModal() {
    if (!giftModal) return;
    giftModal.classList.add("is-open");
    giftModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Giữ cố định scroll khi mở modal
  }

  // Đóng modal
  function closeModal() {
    if (!giftModal) return;
    giftModal.classList.remove("is-open");
    giftModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnOpenAmplop) {
    btnOpenAmplop.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (giftModalClose) {
    giftModalClose.addEventListener("click", closeModal);
  }

  if (giftModalBackdrop) {
    giftModalBackdrop.addEventListener("click", closeModal);
  }

  // Đóng modal bằng phím Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && giftModal && giftModal.classList.contains("is-open")) {
      closeModal();
    }
  });

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
  // 2. SỔ LỜI CHÚC (WISHES - CLIENT-SIDE ONLY)
  // --------------------------------------------------------------------------
  const wishesForm = document.getElementById("wishesForm");
  const wishNameInput = document.getElementById("wishName");
  const wishMessageInput = document.getElementById("wishMessage");
  const wishesList = document.getElementById("wishesList");
  const wishesCount = document.getElementById("wishesCount");

  const STORAGE_KEY = "wedding_demo_wishes_v1";

  // Lấy danh sách bình luận (từ localStorage hoặc cấu hình mặc định)
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
    return wishesCfg.initialComments || [
      { name: "sigma", time: "baru saja", content: "lala" },
      { name: "kiki", time: "baru saja", content: "xin chào" }
    ];
  }

  function saveComments(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn("Lỗi lưu localStorage:", e);
    }
  }

  function renderComments() {
    if (!wishesList) return;
    const comments = getComments();

    // Cập nhật số lượng bình luận
    if (wishesCount) {
      const count = comments.length;
      wishesCount.textContent = `${count} Comments`;
    }

    wishesList.innerHTML = "";

    comments.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "wish-item";
      itemEl.innerHTML = `
        <div class="wish-item-header">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-verified" title="Đã xác thực" aria-label="Đã xác thực">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#10B981">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </span>
        </div>
        <p class="wish-text">${escapeHtml(item.content)}</p>
        <div class="wish-item-footer">
          <span class="wish-time">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${escapeHtml(item.time || "baru saja")}
          </span>
          <button type="button" class="wish-reply-btn">${escapeHtml(wishesCfg.replyText || "Reply")}</button>
        </div>
      `;
      wishesList.appendChild(itemEl);
    });
  }

  // Xử lý gửi lời chúc
  if (wishesForm) {
    wishesForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = wishNameInput ? wishNameInput.value.trim() : "";
      const content = wishMessageInput ? wishMessageInput.value.trim() : "";

      if (!name || !content) return;

      const newWish = {
        name: name,
        content: content,
        time: wishesCfg.timeAgoText || "baru saja",
        date: new Date().toISOString()
      };

      const currentComments = getComments();
      currentComments.unshift(newWish); // Đưa lời chúc mới lên đầu
      saveComments(currentComments);

      renderComments();

      // Reset form
      if (wishMessageInput) wishMessageInput.value = "";
      if (wishNameInput) wishNameInput.value = "";
    });
  }

  // Khởi tạo hiển thị danh sách bình luận ban đầu
  renderComments();
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

