/**
 * ==============================================================================
 * QUẢN LÝ NHẠC NỀN & NÚT BẬT/TẮT (AUDIO CONTROLLER)
 * ==============================================================================
 * Khởi chạy sau tương tác người dùng (click mở thiệp).
 * An toàn tuyệt đối: nếu chưa có file MP3, bắt lỗi êm dịu không làm crash giao diện.
 */

function initMusic(musicSrc) {
  const musicBtn = document.getElementById("musicToggleBtn");
  const audio = new Audio();
  audio.src = musicSrc || "assets/music/background.mp3";
  audio.loop = true;
  audio.preload = "auto";

  let isPlaying = false;

  // Icon SVG
  const playIcon = `
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>`;
    
  const pauseIcon = `
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"/>
    </svg>`;

  function showButton() {
    if (musicBtn) {
      musicBtn.classList.add("visible");
    }
  }

  function play() {
    audio.play().then(() => {
      isPlaying = true;
      if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = playIcon;
      }
    }).catch(err => {
      console.warn("Chưa tìm thấy file nhạc hoặc trình duyệt chặn autoplay:", err.message);
      isPlaying = false;
      if (musicBtn) {
        musicBtn.classList.remove("playing");
        musicBtn.innerHTML = pauseIcon;
      }
    });
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    if (musicBtn) {
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = pauseIcon;
    }
  }

  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", toggle);
  }

  return {
    showButton,
    play,
    pause,
    toggle
  };
}

