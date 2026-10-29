/**
 * ==============================================================================
 * LOGIC MÀN HÌNH BÌA & MỞ THIỆP (COVER & UNLOCK)
 * ==============================================================================
 */

function initCover(onOpenCallback) {
  const coverOverlay = document.getElementById("coverOverlay");
  const btnOpen = document.getElementById("btnOpenInvitation");

  if (!coverOverlay || !btnOpen) return;

  // Đảm bảo ban đầu luôn khóa cuộn trang
  document.body.classList.add("lock-scroll");

  let isOpening = false;

  btnOpen.addEventListener("click", () => {
    // Ngăn chặn bấm nhiều lần gây nhấp nháy hoặc lặp trạng thái
    if (isOpening) return;
    isOpening = true;
    btnOpen.disabled = true;

    // 1. Kích hoạt hiệu ứng fade mờ dần và trôi nhẹ của màn hình bìa
    coverOverlay.classList.add("opened");

    // 2. Kích hoạt chuỗi hiệu ứng xuất hiện từ từ (staggered reveal) cho Hero đồng thời
    document.body.classList.add("is-opened");

    // 3. Callback phát nhạc nền và chuẩn bị các tiện ích
    if (typeof onOpenCallback === "function") {
      onOpenCallback();
    }

    // 4. Mở khóa cuộn trang SAU KHI hiệu ứng chuyển cảnh hoàn tất (750ms)
    setTimeout(() => {
      document.body.classList.remove("lock-scroll");
    }, 750);
  });
}

