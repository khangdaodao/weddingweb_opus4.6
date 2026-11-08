const https = require('https');

const url = "https://script.google.com/macros/s/AKfycbzighW9qPbHpKLnKcIOQKh0rCevcgK8y1Rw8h9GFiI9g-s0JhnSziVgwMh_xvUJDhZO/exec";

function fetchGet(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      // Xử lý redirect của Google Apps Script (302)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        return resolve(fetchGet(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function test() {
  console.log('Testing GET on deployed Web App URL...');
  try {
    const res = await fetchGet(url);
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', res.body);
  } catch (err) {
    console.error('Error fetching GET:', err);
  }
}

test();

