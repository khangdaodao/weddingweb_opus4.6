const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = 'c:/CompareAI/WeddingWeb_opus4.6';
const outDir = 'C:/Users/Windows/.gemini/antigravity/brain/b8abdec6-7496-40c9-95bf-e6c6cd2a8728';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(projectDir, reqPath);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function run() {
  const port = 5578;
  await new Promise(r => server.listen(port, r));
  console.log(`Test server running on http://localhost:${port}`);

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_p67_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9238',
    '--window-size=390,844',
    '--disable-gpu',
    '--user-data-dir=' + profileDir,
    `http://localhost:${port}/?opened=1`
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9238/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let id = 1;
  const cbs = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && cbs.has(m.id)) {
      const { resolve, reject } = cbs.get(m.id);
      cbs.delete(m.id);
      if (m.error) reject(m.error);
      else resolve(m.result);
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    cbs.set(curId, { resolve, reject });
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  console.log('--- TEST 1: KIỂM TRA NAVBAR CUỘN ĐẾN PHASE 6 (GIFT & WISHES) ---');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(`.nav-item[data-target="gift"]`).click();'
  });
  await new Promise(r => setTimeout(r, 1200));

  // Chụp ảnh thẻ Wedding Gift
  const shotGift = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'phase6_gift_card_390.png'), Buffer.from(shotGift.data, 'base64'));
  console.log('Saved phase6_gift_card_390.png');

  console.log('--- TEST 2: KIỂM TRA MỞ MODAL AMPLOP DIGITAL & COPY SỐ TK ---');
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("btnOpenAmplop").click();'
  });
  await new Promise(r => setTimeout(r, 600));

  // Chụp ảnh Modal Popup với QR demo và cảnh báo
  const shotModal = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'phase6_gift_modal_390.png'), Buffer.from(shotModal.data, 'base64'));
  console.log('Saved phase6_gift_modal_390.png');

  // Test copy button (chờ microtask hoàn thành)
  const copyRes = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const btn = document.getElementById("btnCopyAccount");
        btn.click();
        await new Promise(r => setTimeout(r, 150));
        return {
          isCopiedClass: btn.classList.contains("copied"),
          btnText: btn.textContent.trim(),
          accNum: document.getElementById("giftAccountNumber").textContent.trim()
        };
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('Copy button test result:', JSON.stringify(copyRes.result.value));

  // Đóng modal
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("giftModalClose").click();'
  });
  await new Promise(r => setTimeout(r, 400));

  console.log('--- TEST 3: KIỂM TRA SECTION WISHES (SỔ LỜI CHÚC) ---');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(`.nav-item[data-target="wishes"]`).click();'
  });
  await new Promise(r => setTimeout(r, 1000));

  const shotWishesInitial = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'phase6_wishes_initial_390.png'), Buffer.from(shotWishesInitial.data, 'base64'));
  console.log('Saved phase6_wishes_initial_390.png');

  // Test submit lời chúc mới
  const submitRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const nameInput = document.getElementById("wishName");
        const msgInput = document.getElementById("wishMessage");
        const form = document.getElementById("wishesForm");

        nameInput.value = "Đức Anh";
        msgInput.value = "Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử!";
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

        const items = document.querySelectorAll(".wish-item");
        return {
          totalComments: items.length,
          firstAuthor: items[0].querySelector(".wish-author").textContent,
          firstText: items[0].querySelector(".wish-text").textContent,
          countText: document.getElementById("wishesCount").textContent
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Submit wish test result:', JSON.stringify(submitRes.result.value));

  // Chụp ảnh Wishes sau khi gửi lời chúc
  const shotWishesSubmitted = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'phase6_wishes_submitted_390.png'), Buffer.from(shotWishesSubmitted.data, 'base64'));
  console.log('Saved phase6_wishes_submitted_390.png');

  console.log('--- TEST 4: KIỂM TRA PHASE 7 (CLOSING SECTION) ---');
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("closing").scrollIntoView({ behavior: "smooth", block: "start" });'
  });
  await new Promise(r => setTimeout(r, 1200));

  const shotClosing = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'phase7_closing_390.png'), Buffer.from(shotClosing.data, 'base64'));
  console.log('Saved phase7_closing_390.png');

  // Kiểm tra các yêu cầu nghiêm ngặt (Strict Constraints)
  const audit = await send('Runtime.evaluate', {
    expression: `
      (() => {
        // 1. Kiểm tra RSVP: tuyệt đối không có "Hadir", "Tidak Hadir" dạng nút chọn
        const rsvpButtons = Array.from(document.querySelectorAll("button, .btn, input[type=radio]"))
          .filter(el => /hadir/i.test(el.textContent || el.value));

        // 2. Kiểm tra Back To Top button
        const backToTop = Array.from(document.querySelectorAll("button, a"))
          .filter(el => /back.*top|về đầu trang|quay lại/i.test(el.textContent || el.title || el.id || el.className));

        // 3. Kiểm tra tràn ngang
        const bodyWidth = document.body.scrollWidth;
        const windowWidth = window.innerWidth;
        const hasHorizontalOverflow = bodyWidth > windowWidth;

        // 4. Kiểm tra khoảng cách chữ tên cặp đôi ở Closing so với đáy trang
        const namesEl = document.getElementById("closingCoupleNames");
        const namesRect = namesEl ? namesEl.getBoundingClientRect() : null;
        const navbarEl = document.getElementById("bottomNavbar");
        const navbarRect = navbarEl ? navbarEl.getBoundingClientRect() : null;

        // 5. Kiểm tra cảnh báo demo QR
        const demoAlert = document.getElementById("giftDemoAlert");
        const hasDemoWarning = demoAlert && demoAlert.textContent.includes("DEMO");

        return {
          rsvpButtonsFound: rsvpButtons.length,
          backToTopButtonsFound: backToTop.length,
          hasHorizontalOverflow,
          bodyScrollWidth: bodyWidth,
          windowWidth,
          closingNamesBottom: namesRect ? namesRect.bottom : null,
          navbarTop: navbarRect ? navbarRect.top : null,
          isObscuredByNavbar: namesRect && navbarRect ? (namesRect.bottom > navbarRect.top) : false,
          hasDemoWarning
        };
      })()
    `,
    returnByValue: true
  });

  console.log('=== AUDIT CONSTRAINTS REPORT ===');
  console.log(JSON.stringify(audit.result.value, null, 2));

  ws.close();
  chrome.kill();
  server.close();
  console.log('All tests completed successfully!');
}

run().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});

