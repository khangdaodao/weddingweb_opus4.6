const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const target = '  <script src="assets/js/app.js"></script>';
const replacement = '  <script src="assets/js/gift-wishes.js"></script>\r\n  <script src="assets/js/app.js"></script>';

const newHtml = html.replace(target, replacement);
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Added gift-wishes.js before app.js');

