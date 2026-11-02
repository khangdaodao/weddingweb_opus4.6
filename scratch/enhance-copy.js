const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'assets', 'js', 'gift-wishes.js');
let code = fs.readFileSync(jsPath, 'utf8');

const oldCopyBlock = code.substring(
  code.indexOf('  // Sao chép số tài khoản'),
  code.indexOf('  // --------------------------------------------------------------------------\n  // 2. SỔ LỜI CHÚC')
);

const newCopyBlock = `  // Sao chép số tài khoản
  if (btnCopyAccount) {
    btnCopyAccount.addEventListener("click", () => {
      const accNum = accountInfo.accountNumber || (elAccNumber ? elAccNumber.textContent.trim() : "");
      if (!accNum) return;

      const originalHtml = btnCopyAccount.innerHTML;

      const triggerCopiedState = () => {
        btnCopyAccount.classList.add("copied");
        btnCopyAccount.innerHTML = \`
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>\${accountInfo.copiedText || "Đã sao chép!"}</span>
        \`;

        setTimeout(() => {
          btnCopyAccount.classList.remove("copied");
          btnCopyAccount.innerHTML = originalHtml;
        }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(accNum)
          .then(triggerCopiedState)
          .catch(() => fallbackCopy(accNum, triggerCopiedState));
      } else {
        fallbackCopy(accNum, triggerCopiedState);
      }
    });
  }

  function fallbackCopy(text, onSuccess) {
    try {
      const tempInput = document.createElement("textarea");
      tempInput.value = text;
      tempInput.style.position = "fixed";
      tempInput.style.top = "-9999px";
      tempInput.style.left = "-9999px";
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    } catch (e) {
      console.warn("Fallback copy failed:", e);
    }
    if (onSuccess) onSuccess();
  }

`;

code = code.replace(oldCopyBlock, newCopyBlock);
fs.writeFileSync(jsPath, code, 'utf8');
console.log('Successfully enhanced copy button logic');

