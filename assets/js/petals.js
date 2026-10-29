/**
 * ==============================================================================
 * HIỆU ỨNG CÁNH HOA RƠI (FALLING PETALS EFFECT)
 * ==============================================================================
 */

function initPetals() {
  const container = document.getElementById("petalsContainer");
  if (!container) return;

  const PETAL_COUNT = 15;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    const size = Math.random() * 8 + 8; // 8px -> 16px
    const left = Math.random() * 100; // 0% -> 100%
    const duration = Math.random() * 5 + 6; // 6s -> 11s
    const delay = Math.random() * 6; // 0s -> 6s
    const driftX = (Math.random() - 0.5) * 80 + "px";
    const rotation = Math.random() * 360 + 180 + "deg";

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--drift-x", driftX);
    petal.style.setProperty("--rot", rotation);

    container.appendChild(petal);
  }
}

