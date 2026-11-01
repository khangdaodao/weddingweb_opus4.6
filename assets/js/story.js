/**
 * ==============================================================================
 * SECTION 6: LOVE STORY TIMELINE CONTROLLER (PHASE 5)
 * ==============================================================================
 * - Đọc dữ liệu từ WEDDING_CONFIG.loveStory và render động các mốc timeline.
 * - Hỗ trợ thêm, xóa, đổi thứ tự mốc mà không cần sửa HTML.
 * - Đường nối trục timeline tự động cân chỉnh độ dài chính xác từ tâm marker đầu
 *   đến tâm marker cuối cùng.
 * - Hiệu ứng xuất hiện khi cuộn (Slide-in + Fade-in từ phải sang trái):
 *   Mỗi card xuất hiện độc lập khi đi vào vùng nhìn thấy (IntersectionObserver).
 * - Tôn trọng tuyệt đối prefers-reduced-motion.
 */

function initStory(config) {
  if (!config) return;

  // 1. Điền tiêu đề & trích dẫn dòng phụ nếu có cấu hình
  renderStoryHeading(config.loveStoryHeading);

  // 2. Render danh sách các mốc câu chuyện
  renderStoryMilestones(config.loveStory);

  // 3. Cân chỉnh độ dài đường nối timeline từ marker đầu đến marker cuối
  updateTimelineLine();

  // 4. Khởi tạo hiệu ứng trượt + rõ dần khi cuộn
  initStoryScrollObserver();
}

/**
 * Render tiêu đề và dòng trích dẫn
 */
function renderStoryHeading(headingCfg) {
  if (!headingCfg) return;
  const elTitle = document.getElementById("storyTitle");
  const elSubtitle = document.getElementById("storySubtitle");

  if (elTitle && headingCfg.title) {
    elTitle.textContent = headingCfg.title;
  }
  if (elSubtitle && headingCfg.subtitle) {
    elSubtitle.textContent = headingCfg.subtitle;
  }
}

/**
 * Render các thẻ mốc thời gian động từ dữ liệu
 */
function renderStoryMilestones(milestones) {
  const container = document.getElementById("storyTimeline");
  if (!container || !Array.isArray(milestones) || milestones.length === 0) return;

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  milestones.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "story-item";
    itemEl.setAttribute("data-id", item.id || `milestone-${index + 1}`);

    // Marker tròn chứa icon trái tim
    const markerEl = document.createElement("div");
    markerEl.className = "story-marker";
    markerEl.setAttribute("aria-hidden", "true");
    markerEl.innerHTML = `
      <svg class="story-marker-heart" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    itemEl.appendChild(markerEl);

    // Thẻ câu chuyện (Story Card)
    const cardEl = document.createElement("div");
    const themeClass = item.theme === "dusty-blush" ? " theme-dusty-blush" : "";
    cardEl.className = `story-card${themeClass}`;

    // Tiêu đề mốc
    const titleEl = document.createElement("h3");
    titleEl.className = "story-card-title";
    titleEl.textContent = item.title || "";
    cardEl.appendChild(titleEl);

    // Năm / Thời gian
    if (item.date || item.year) {
      const dateEl = document.createElement("div");
      dateEl.className = "story-card-date";
      dateEl.textContent = item.date || item.year;
      cardEl.appendChild(dateEl);
    }

    // Nội dung mô tả (tách các đoạn văn bằng \n\n hoặc xuống dòng)
    const descText = item.description || item.content || "";
    if (descText) {
      const descEl = document.createElement("div");
      descEl.className = "story-card-desc";
      const paragraphs = descText.split(/\n\s*\n/);
      paragraphs.forEach(para => {
        const cleanPara = para.trim();
        if (cleanPara) {
          const p = document.createElement("p");
          p.textContent = cleanPara;
          descEl.appendChild(p);
        }
      });
      cardEl.appendChild(descEl);
    }

    // Ảnh đính kèm (nếu mốc câu chuyện thực sự có ảnh)
    if (item.image) {
      const imgWrap = document.createElement("div");
      imgWrap.className = "story-card-img-wrap";
      const img = document.createElement("img");
      img.className = "story-card-img";
      img.src = item.image;
      img.alt = item.title || "Khoảnh khắc kỷ niệm";
      img.loading = "lazy";
      imgWrap.appendChild(img);
      cardEl.appendChild(imgWrap);
    }

    itemEl.appendChild(cardEl);
    fragment.appendChild(itemEl);
  });

  container.appendChild(fragment);
}

/**
 * Cân chỉnh độ dài đường nối timeline chính xác từ tâm marker đầu đến tâm marker cuối
 */
function updateTimelineLine() {
  const line = document.querySelector(".story-timeline-line");
  const markers = document.querySelectorAll(".story-marker");
  const wrap = document.querySelector(".story-timeline-wrap");

  if (!line || !wrap || markers.length < 2) return;

  const firstMarker = markers[0];
  const lastMarker = markers[markers.length - 1];

  const wrapRect = wrap.getBoundingClientRect();
  const firstRect = firstMarker.getBoundingClientRect();
  const lastRect = lastMarker.getBoundingClientRect();

  const topOffset = (firstRect.top - wrapRect.top) + (firstRect.height / 2);
  const bottomOffset = wrapRect.bottom - (lastRect.top + (lastRect.height / 2));

  line.style.top = `${topOffset}px`;
  line.style.bottom = `${bottomOffset}px`;
}

/**
 * Hiệu ứng xuất hiện khi cuộn (Slide-in + Fade-in độc lập từng card)
 */
function initStoryScrollObserver() {
  const items = document.querySelectorAll(".story-item");
  if (!items.length) return;

  // Kiểm tra prefers-reduced-motion: nếu người dùng bật giảm chuyển động, hiển thị ngay lập tức
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach(item => {
      item.classList.add("is-revealed");
      const card = item.querySelector(".story-card");
      if (card) card.classList.add("is-revealed");
    });
    return;
  }

  // Sử dụng IntersectionObserver độc lập cho Phase 5 quan sát từng .story-item
  // Đặt rootMargin: "0px 0px -100px 0px" và threshold: 0.2 để card chỉ kích hoạt khi đã thực sự tiến vào vùng nhìn thấy
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        const card = entry.target.querySelector(".story-card");
        if (card) {
          card.classList.add("is-revealed");
        }
        obs.unobserve(entry.target); // Kích hoạt 1 lần duy nhất, giữ nguyên trạng thái rõ
      }
    });
  }, {
    root: null,
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  });

  items.forEach(item => observer.observe(item));

  // Lắng nghe resize màn hình để cập nhật lại chiều dài đường nối timeline nếu cần
  window.addEventListener("resize", () => {
    updateTimelineLine();
  }, { passive: true });
}
