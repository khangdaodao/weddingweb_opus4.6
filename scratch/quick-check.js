const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = 'C:/Users/Windows/.gemini/antigravity/brain/b8abdec6-7496-40c9-95bf-e6c6cd2a8728';

async function testSubmit() {
  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9238/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

