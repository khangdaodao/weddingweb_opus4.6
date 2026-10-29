/**
 * ==============================================================================
 * ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
 * ==============================================================================
 * Đếm ngược chính xác đến 00:00 của ngày cưới theo múi giờ Asia/Ho_Chi_Minh.
 * Dừng lại ở 00:00:00:00 khi đã đến hoặc qua ngày cưới (không hiển thị số âm).
 */

function initCountdown(targetDateISO) {
  const elDays = document.getElementById("countdownDays");
  const elHours = document.getElementById("countdownHours");
  const elMinutes = document.getElementById("countdownMinutes");
  const elSeconds = document.getElementById("countdownSeconds");

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  const targetTime = new Date(targetDateISO).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMinutes.textContent = "00";
      elSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    elDays.textContent = days < 10 ? "0" + days : days;
    elHours.textContent = hours < 10 ? "0" + hours : hours;
    elMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
    elSeconds.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  update();
  setInterval(update, 1000);
}

