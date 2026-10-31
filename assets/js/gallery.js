/**
 * ==============================================================================
 * SECTION 5: GALLERY (BEST MOMENT) INTERACTION & LIGHTBOX
 * ==============================================================================
 * Quản lý tương tác của bộ sưu tập ảnh cưới:
 * - Tự động tải danh sách ảnh từ WEDDING_CONFIG.gallery (dễ tùy biến cho khách hàng).
 * - Mở ảnh lớn toàn màn hình với hiệu ứng fade & scale mượt mà.
 * - Điều hướng: Nút bấm Next/Prev, Phím mũi tên (ArrowLeft/ArrowRight), Vuốt chạm (Swipe touch).
 * - Đóng modal: Nút đóng (X), Phím Escape, hoặc Bấm vào nền mờ (Backdrop).
 * - Khóa cuộn trang khi modal đang mở, phục hồi vị trí cuộn & tiêu điểm truy cập khi đóng.
 * - Tôn trọng accessibility (ARIA attributes, keyboard trap, alt text đầy đủ).
 */

(function () {
  'use strict';

  // Khởi tạo sau khi DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', initGallery);

  function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('galleryModal');
    if (!galleryGrid || !modal) return;

    const modalImg = document.getElementById('galleryModalImg');
    const modalCounter = document.getElementById('galleryModalCounter');
    const modalClose = document.getElementById('galleryModalClose');
    const modalBackdrop = document.getElementById('galleryModalBackdrop');
    const modalPrev = document.getElementById('galleryModalPrev');
    const modalNext = document.getElementById('galleryModalNext');

    // 1. Lấy dữ liệu ảnh từ file cấu hình (nếu có) hoặc đọc từ DOM hiện tại
    let galleryData = [];
    if (typeof WEDDING_CONFIG !== 'undefined' && Array.isArray(WEDDING_CONFIG.gallery) && WEDDING_CONFIG.gallery.length > 0) {
      galleryData = WEDDING_CONFIG.gallery;
      renderGalleryItems(galleryGrid, galleryData);
    } else {
      // Đọc từ markup tĩnh có sẵn
      const existingItems = galleryGrid.querySelectorAll('.gallery-item');
      existingItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
          galleryData.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt') || `Khoảnh khắc cưới ${index + 1}`
          });
        }
      });
    }

    if (galleryData.length === 0) return;

    let currentIndex = 0;
    let lastFocusedElement = null;

    // 2. Hàm dựng danh sách ảnh trong Grid
    function renderGalleryItems(container, items) {
      container.innerHTML = '';
      items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item reveal-on-scroll';
        itemEl.setAttribute('data-index', String(index));
        itemEl.setAttribute('tabindex', '0');
        itemEl.setAttribute('role', 'button');
        itemEl.setAttribute('aria-label', `Xem ảnh cưới phóng to: ${item.alt || (index + 1)}`);

        const imgEl = document.createElement('img');
        imgEl.className = 'gallery-img';
        imgEl.src = item.src;
        imgEl.alt = item.alt || `Khoảnh khắc cưới ${index + 1}`;
        imgEl.loading = 'lazy';

        itemEl.appendChild(imgEl);
        container.appendChild(itemEl);
      });
    }

    // 3. Hàm hiển thị ảnh trong Lightbox Modal
    function showImage(index) {
      if (index < 0) index = galleryData.length - 1;
      if (index >= galleryData.length) index = 0;
      currentIndex = index;

      const currentItem = galleryData[currentIndex];
      if (!currentItem) return;

      // Hiệu ứng mờ nhẹ chuyển ảnh mượt mà
      modalImg.style.opacity = '0';
      modalImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        modalImg.src = currentItem.src;
        modalImg.alt = currentItem.alt || `Khoảnh khắc cưới ${currentIndex + 1}`;
        if (modalCounter) {
          modalCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
        }
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
      }, 100);
    }

    // 4. Mở Modal
    function openModal(index) {
      lastFocusedElement = document.activeElement;
      currentIndex = index;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gallery-modal-open');

      showImage(currentIndex);

      // Chuyển tiêu điểm vào nút đóng để người dùng bàn phím dễ thao tác
      if (modalClose) {
        setTimeout(() => modalClose.focus(), 150);
      }
    }

    // 5. Đóng Modal
    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('gallery-modal-open');

      // Phục hồi tiêu điểm bàn phím về phần tử vừa bấm
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    // 6. Gán sự kiện click & bàn phím cho các ảnh trong Grid (Event Delegation)
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const index = parseInt(item.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          openModal(index);
        }
      }
    });

    galleryGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('.gallery-item');
        if (item) {
          e.preventDefault();
          const index = parseInt(item.getAttribute('data-index'), 10);
          if (!isNaN(index)) {
            openModal(index);
          }
        }
      }
    });

    // 7. Gán sự kiện cho các nút điều hướng và đóng Modal
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalPrev) modalPrev.addEventListener('click', () => showImage(currentIndex - 1));
    if (modalNext) modalNext.addEventListener('click', () => showImage(currentIndex + 1));

    // 8. Bàn phím: Esc (đóng), Mũi tên trái/phải (chuyển ảnh)
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showImage(currentIndex + 1);
      }
    });

    // 9. Cử chỉ vuốt chạm trên thiết bị di động (Touch Swipe)
    let touchStartX = 0;
    let touchStartY = 0;

    modal.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Chỉ kích hoạt khi lướt theo chiều ngang rõ rệt (hạn chế nhầm lẫn cuộn dọc)
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Vuốt sang trái -> Ảnh kế tiếp
          showImage(currentIndex + 1);
        } else {
          // Vuốt sang phải -> Ảnh trước
          showImage(currentIndex - 1);
        }
      }
    }, { passive: true });
  }
})();

