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
  const port = 5580;
  await new Promise(r => server.listen(port, r));

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_detail_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9240',
    '--window-size=390,844',
    '--disable-gpu',
    '--user-data-dir=' + profileDir,
    `http://localhost:${port}/?opened=1`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9240/json', (res) => {
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

  // Test submit with detailed error trapping
  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        try {
          const form = document.getElementById("wishesForm");
          const nameInput = document.getElementById("wishName");
          const msgInput = document.getElementById("wishMessage");

          nameInput.value = "Minh Tuấn";
          msgInput.value = "Mừng ngày chung đôi! Chúc hai bạn bách niên giai lão.";
          
          // Trigger submit via submit button or form submit
          document.getElementById("btnSubmitWish").click();

          const items = Array.from(document.querySelectorAll(".wish-item")).map(el => ({
            author: el.querySelector(".wish-author") ? el.querySelector(".wish-author").textContent : null,
            text: el.querySelector(".wish-text") ? el.querySelector(".wish-text").textContent : null
          }));

          return {
            success: true,
            totalItems: items.length,
            items: items,
            count: document.getElementById("wishesCount").textContent
          };
        } catch(err) {
          return { error: err.message, stack: err.stack };
        }
      })()
    `,
    returnByValue: true
  });

  console.log('Detailed Submit Result:', JSON.stringify(res.result.value, null, 2));

  // Test copy account button with wait
  const copyRes = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        try {
          document.getElementById("btnOpenAmplop").click();
          const btn = document.getElementById("btnCopyAccount");
          btn.click();
          await new Promise(r => setTimeout(r, 200));
          return {
            copiedClass: btn.classList.contains("copied"),
            html: btn.innerHTML.trim()
          };
        } catch(err) {
          return { error: err.message };
        }
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('Copy Result:', JSON.stringify(copyRes.result.value, null, 2));

  ws.close();
  chrome.kill();
  server.close();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

