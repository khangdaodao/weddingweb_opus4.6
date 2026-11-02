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
      res.end('Not found: ' + reqPath);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function run() {
  await new Promise(r => server.listen(5590, r));

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_bg_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9250',
    '--user-data-dir=' + profileDir,
    'http://localhost:5590/index.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9250/json', (res) => {
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

  // Chuyển ảnh nền trắng sang PNG trong suốt
  const result = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const img = new Image();
        img.src = '/assets/images/decorations/hoahong.jpg';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Xóa nền trắng với feathering mượt mà
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Khoảng cách tới màu trắng (255, 255, 255)
          const distToWhite = Math.sqrt(
            Math.pow(255 - r, 2) +
            Math.pow(255 - g, 2) +
            Math.pow(255 - b, 2)
          );

          if (distToWhite < 30) {
            // Hoàn toàn trắng -> trong suốt 100%
            data[i + 3] = 0;
          } else if (distToWhite < 65) {
            // Vùng biên mờ nhẹ để không bị răng cưa
            const alphaFactor = (distToWhite - 30) / 35;
            data[i + 3] = Math.round(data[i + 3] * alphaFactor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        return canvas.toDataURL('image/png');
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });

  if (result.result && result.result.value) {
    const base64Data = result.result.value.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(
      path.join(projectDir, 'assets/images/decorations/hoahong-transparent.png'),
      Buffer.from(base64Data, 'base64')
    );
    console.log('Successfully created hoahong-transparent.png');
  } else {
    console.error('Failed:', result);
  }

  ws.close();
  chrome.kill();
  server.close();
}

run().catch(console.error);

