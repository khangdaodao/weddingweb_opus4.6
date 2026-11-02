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
  await new Promise(r => server.listen(5584, r));

  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profileDir = path.join(outDir, 'scratch/prof_console_' + Date.now());

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9244',
    '--window-size=390,844',
    '--disable-gpu',
    '--user-data-dir=' + profileDir,
    'http://localhost:5584/?opened=1'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9244/json', (res) => {
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

  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1500));

  console.log('Console logs & exceptions:', logs);

  const testInit = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          hasConfig: typeof WEDDING_CONFIG !== 'undefined',
          keys: typeof WEDDING_CONFIG !== 'undefined' ? Object.keys(WEDDING_CONFIG) : [],
          hasInitGiftWishes: typeof initGiftWishes !== 'undefined'
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Runtime test:', testInit.result.value);

  ws.close();
  chrome.kill();
  server.close();
}

run().catch(console.error);

