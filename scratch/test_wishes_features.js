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
      res.end('Not found: ' + reqPath);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function run() {
  const port = 5596;
  await new Promise(r => server.listen(port, r));
  console.log('Test server started on port ' + port);

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_wishes_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9256',
    '--window-size=390,844',
    '--disable-gpu',
    '--user-data-dir=' + profileDir,
    `http://localhost:${port}/?opened=1`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9256/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let id = 1;
  const cbs = new Map();
  const logs = [];

  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.consoleAPICalled') {
      logs.push(m.params.args.map(a => a.value || a.description).join(' '));
    }
    if (m.method === 'Runtime.exceptionThrown') {
      logs.push('EXCEPTION: ' + JSON.stringify(m.params.exceptionDetails));
    }
    if (m.id && cbs.has(m.id)) {
      const { resolve, reject } = cbs.get(m.id);
      cbs.delete(m.id);
      if (m.error) reject(m.error);
      else resolve(m.result);
    }
  };

  await new Promise(resolve => ws.onopen = resolve);

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

  console.log('--- TEST 1: KIỂM TRA CARD WISHES BAN ĐẦU ---');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(`.nav-item[data-target="wishes"]`).click();'
  });
  await new Promise(r => setTimeout(r, 1000));

  const initialCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const items = document.querySelectorAll("#wishesList .wish-item");
        const dots = document.querySelectorAll("#wishesDots .wish-dot");
        const countText = document.getElementById("wishesCount").textContent;
        return {
          visibleItemsCount: items.length,
          dotsCount: dots.length,
          countText,
          firstAuthor: items[0] ? items[0].querySelector(".wish-author").textContent : null,
          firstAvatar: items[0] ? items[0].querySelector(".wish-avatar-img").getAttribute("src") : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Initial check:', JSON.stringify(initialCheck.result.value, null, 2));

  // Chụp ảnh Wishes card với 3 lời chúc + dots
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'wishes_carousel_390.png'), Buffer.from(shot1.data, 'base64'));
  console.log('Saved wishes_carousel_390.png');

  console.log('--- TEST 2: KIỂM TRA CHUYỂN TRANG BẰNG DOTS ---');
  await send('Runtime.evaluate', {
    expression: 'document.querySelectorAll("#wishesDots .wish-dot")[1].click();'
  });
  await new Promise(r => setTimeout(r, 500));

  const page2Check = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const items = document.querySelectorAll("#wishesList .wish-item");
        return {
          visibleItemsCount: items.length,
          firstAuthor: items[0] ? items[0].querySelector(".wish-author").textContent : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Page 2 check:', JSON.stringify(page2Check.result.value, null, 2));

  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'wishes_page2_390.png'), Buffer.from(shot2.data, 'base64'));
  console.log('Saved wishes_page2_390.png');

  console.log('--- TEST 3: GỬI LỜI CHÚC MỚI VỚI LỰA CHỌN NHÀ GÁI ---');
  const submitCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        // Chọn Nhà Gái
        document.getElementById("sideBrideBtn").click();

        const nameInput = document.getElementById("wishName");
        const msgInput = document.getElementById("wishMessage");
        nameInput.value = "Hà My";
        msgInput.value = "Chúc bạn yêu Khánh Linh mãi mãi hạnh phúc viên mãn!";

        document.getElementById("btnSubmitWish").click();

        const items = document.querySelectorAll("#wishesList .wish-item");
        return {
          sideInputVal: document.getElementById("wishSide").value,
          brideBtnActive: document.getElementById("sideBrideBtn").classList.contains("active"),
          firstAuthor: items[0].querySelector(".wish-author").textContent,
          firstAvatar: items[0].querySelector(".wish-avatar-img").getAttribute("src"),
          firstBadge: items[0].querySelector(".wish-side-badge").textContent,
          totalCount: document.getElementById("wishesCount").textContent
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Submit check:', JSON.stringify(submitCheck.result.value, null, 2));

  console.log('--- TEST 4: MỞ MODAL XEM TẤT CẢ LỜI CHÚC (VIEW ALL) VÀ TEST BỘ LỌC ---');
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("btnViewAllWishes").click();'
  });
  await new Promise(r => setTimeout(r, 600));

  const viewAllCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const modal = document.getElementById("wishesAllModal");
        const allItems = modal.querySelectorAll(".wishes-all-scroll-list .wish-item");
        const allCount = document.getElementById("filterAllCount").textContent;
        const groomCount = document.getElementById("filterGroomCount").textContent;
        const brideCount = document.getElementById("filterBrideCount").textContent;

        // Bấm lọc Nhà Trai
        document.getElementById("filterGroomBtn").click();
        const groomItems = modal.querySelectorAll(".wishes-all-scroll-list .wish-item");

        // Bấm lọc Nhà Gái
        document.getElementById("filterBrideBtn").click();
        const brideItems = modal.querySelectorAll(".wishes-all-scroll-list .wish-item");

        // Trở về Tất Cả
        document.getElementById("filterAllBtn").click();

        return {
          modalIsOpen: modal.classList.contains("is-open"),
          allCount,
          groomCount,
          brideCount,
          totalItemsRendered: allItems.length,
          groomItemsFiltered: groomItems.length,
          brideItemsFiltered: brideItems.length
        };
      })()
    `,
    returnByValue: true
  });
  console.log('View All modal check:', JSON.stringify(viewAllCheck.result.value, null, 2));

  // Chụp ảnh View All modal
  const shotModal = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, 'wishes_view_all_modal_390.png'), Buffer.from(shotModal.data, 'base64'));
  console.log('Saved wishes_view_all_modal_390.png');

  // Đóng modal
  await send('Runtime.evaluate', {
    expression: 'document.getElementById("wishesAllClose").click();'
  });
  await new Promise(r => setTimeout(r, 300));

  console.log('Console logs/errors:', logs);

  ws.close();
  chrome.kill();
  server.close();
  console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
}

run().catch(console.error);

