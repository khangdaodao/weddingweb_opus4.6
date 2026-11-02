const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const target = '  <script src="assets/js/story.js"></script>';
const replacement = '  <script src="assets/js/story.js"></script>\r\n  <script src="assets/js/gift-wishes.js"></script>';

if (html.includes(target) && !html.includes('gift-wishes.js')) {
  html = html.replace(target, replacement);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully added gift-wishes.js script tag');
} else {
  console.log('Target not found or already included');
}

