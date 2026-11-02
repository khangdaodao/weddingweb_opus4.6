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
  const port = 5586;
  await new Promise(r => server.listen(port, r));

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_full_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9246',
    '--window-size=390,844',
    '--disable-gpu',
    '--user-data-dir=' + profileDir,
    `http://localhost:${port}/?opened=1`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9246/json', (res) => {
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

  // Chụp trọn vẹn Section Phase 6
  const p6Box = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector(".gift-wishes-section");
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      })()
    `,
    returnByValue: true
  });

  const shotP6Full = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: p6Box.result.value.x,
      y: p6Box.result.value.y,
      width: p6Box.result.value.width,
      height: p6Box.result.value.height,
      scale: 1
    }
  });
  fs.writeFileSync(path.join(outDir, 'phase6_full_section.png'), Buffer.from(shotP6Full.data, 'base64'));
  console.log('Saved phase6_full_section.png');

  // Chụp trọn vẹn Section Phase 7
  const p7Box = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById("closing");
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      })()
    `,
    returnByValue: true
  });

  const shotP7Full = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: p7Box.result.value.x,
      y: p7Box.result.value.y,
      width: p7Box.result.value.width,
      height: p7Box.result.value.height,
      scale: 1
    }
  });
  fs.writeFileSync(path.join(outDir, 'phase7_full_section.png'), Buffer.from(shotP7Full.data, 'base64'));
  console.log('Saved phase7_full_section.png');

  ws.close();
  chrome.kill();
  server.close();
}

run().catch(console.error);

