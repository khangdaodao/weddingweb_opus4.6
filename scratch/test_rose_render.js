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
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
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
  await new Promise(r => server.listen(5592, r));

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_rose_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9252',
    '--window-size=390,844',
    '--user-data-dir=' + profileDir,
    'http://localhost:5592/index.html?opened=1'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9252/json', (res) => {
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

  // 1. Thử nghiệm với mix-blend-mode: multiply trên hoahong.jpg hiện tại
  await send('Runtime.evaluate', {
    expression: `
      document.querySelectorAll(".floral-decoration").forEach(el => {
        el.style.mixBlendMode = "multiply";
      });
    `
  });

  const shotMultiply = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 350, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, 'rose_mix_blend_mode.png'), Buffer.from(shotMultiply.data, 'base64'));
  console.log('Saved rose_mix_blend_mode.png');

  // 2. Thử nghiệm với file hoahong-transparent.png vừa tách phông
  await send('Runtime.evaluate', {
    expression: `
      document.querySelectorAll(".floral-decoration").forEach(el => {
        el.style.mixBlendMode = "normal";
        el.src = "assets/images/decorations/hoahong-transparent.png";
      });
    `
  });
  await new Promise(r => setTimeout(r, 500));

  const shotTransparent = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 390, height: 350, scale: 1 }
  });
  fs.writeFileSync(path.join(outDir, 'rose_transparent_png.png'), Buffer.from(shotTransparent.data, 'base64'));
  console.log('Saved rose_transparent_png.png');

  ws.close();
  chrome.kill();
  server.close();
}

run().catch(console.error);

