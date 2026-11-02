const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Thêm khởi tạo Phase 6 và Phase 7 trong DOMContentLoaded
const initTarget = `  // 4b. Khởi tạo Section Love Story Timeline (Phase 5)\n  if (typeof initStory === "function") {\n    initStory(WEDDING_CONFIG);\n  }`;
const initAddition = `  // 4b. Khởi tạo Section Love Story Timeline (Phase 5)\n  if (typeof initStory === "function") {\n    initStory(WEDDING_CONFIG);\n  }\n\n  // 4c. Khởi tạo Section Mừng Cưới & Sổ Lời Chúc (Phase 6)\n  if (typeof initGiftWishes === "function") {\n    initGiftWishes(WEDDING_CONFIG);\n  }\n\n  // 4d. Render thông tin Section Lời Cảm Ơn (Phase 7)\n  renderClosingData(WEDDING_CONFIG);`;

if (code.includes(initTarget) && !code.includes('initGiftWishes')) {
  code = code.replace(initTarget, initAddition);
  console.log('Added Phase 6 & 7 init calls');
}

// 2. Thêm hàm renderClosingData ở cuối file
const closingFunction = `\n/**\n * Điền dữ liệu vào Section Lời Cảm Ơn / Kết Thúc (Phase 7)\n */\nfunction renderClosingData(cfg) {\n  const closingCfg = cfg.closing || cfg.thankYou;\n  if (!closingCfg) return;\n\n  const elTitle = document.getElementById("closingTitle");\n  const elMessage = document.getElementById("closingMessage");\n  const elSignoff = document.getElementById("closingSignoff");\n  const elSubsignoff = document.getElementById("closingSubsignoff");\n  const elNames = document.getElementById("closingCoupleNames");\n  const elPhoto = document.getElementById("closingPhoto");\n\n  if (elTitle && closingCfg.title) elTitle.textContent = closingCfg.title;\n  if (elMessage && closingCfg.message) elMessage.textContent = closingCfg.message;\n  if (elSignoff && closingCfg.signOff) elSignoff.textContent = closingCfg.signOff;\n  if (elSubsignoff && closingCfg.subSignOff) elSubsignoff.textContent = closingCfg.subSignOff;\n  if (elNames && closingCfg.coupleName) elNames.textContent = closingCfg.coupleName;\n  if (elPhoto && closingCfg.photo) elPhoto.src = closingCfg.photo;\n}\n`;

if (!code.includes('function renderClosingData')) {
  code += closingFunction;
  console.log('Added renderClosingData function');
}

fs.writeFileSync(appPath, code, 'utf8');
console.log('Successfully updated app.js');

