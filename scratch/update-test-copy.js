const fs = require('fs');
let code = fs.readFileSync('scratch/test_phase6_7.js', 'utf8');

const oldCopyCheck = `  // Test copy button
  const copyRes = await send('Runtime.evaluate', {
    expression: \`
      (() => {
        const btn = document.getElementById("btnCopyAccount");
        btn.click();
        return {
          isCopiedClass: btn.classList.contains("copied"),
          btnText: btn.textContent.trim(),
          accNum: document.getElementById("giftAccountNumber").textContent.trim()
        };
      })()
    \`,
    returnByValue: true
  });`;

const newCopyCheck = `  // Test copy button (chờ microtask hoàn thành)
  const copyRes = await send('Runtime.evaluate', {
    expression: \`
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
    \`,
    awaitPromise: true,
    returnByValue: true
  });`;

code = code.replace(oldCopyCheck, newCopyCheck);
fs.writeFileSync('scratch/test_phase6_7.js', code, 'utf8');

