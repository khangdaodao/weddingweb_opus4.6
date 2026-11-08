const https = require('https');
const { URL } = require('url');

const scriptUrl = "https://script.google.com/macros/s/AKfycbzighW9qPbHpKLnKcIOQKh0rCevcgK8y1Rw8h9GFiI9g-s0JhnSziVgwMh_xvUJDhZO/exec";

function postData(targetUrl, payload) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const postBody = JSON.stringify(payload);

    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('POST redirected to:', res.headers.location);
        // GET on redirect
        https.get(res.headers.location, (getRes) => {
          let data = '';
          getRes.on('data', chunk => data += chunk);
          getRes.on('end', () => resolve({ statusCode: getRes.statusCode, body: data }));
        }).on('error', reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.write(postBody);
    req.end();
  });
}

async function runTest() {
  console.log('Sending test POST to Google Sheet...');
  const testPayload = {
    name: "Kiểm Tra Hệ Thống",
    side: "groom",
    content: "Lời chúc thử nghiệm kết nối Google Sheet thành công 100%!"
  };

  try {
    const res = await postData(scriptUrl, testPayload);
    console.log('POST Status:', res.statusCode);
    console.log('POST Response:', res.body);
  } catch (e) {
    console.error('Error posting:', e);
  }
}

runTest();

