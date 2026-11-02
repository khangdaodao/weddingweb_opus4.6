const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'assets', 'js', 'config.js');
let code = fs.readFileSync(configPath, 'utf8');

const targetStr = '  // 7. MỪNG CƯỚI';
const targetIndex = code.indexOf(targetStr);

if (targetIndex === -1) {
  console.error('Target comment not found in config.js');
  process.exit(1);
}

const newBlock = `  // 7. MỪNG CƯỚI / HỘP MỪNG (WEDDING GIFT / DIGITAL ENVELOPE - PHASE 6)
  // --------------------------------------------------------------------------
  gift: {
    title: "Wedding Gift",
    message: "Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:",
    openPopupButtonText: "Buka Amplop Digital",
    modalTitle: "Amplop Digital",
    account: {
      bankName: "Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam (Vietcombank)",
      shortBankName: "Vietcombank",
      accountNumber: "9988776655",
      accountName: "VU HOANG NAM",
      qrCodeImage: "assets/images/decorations/qr-demo.svg",
      copyButtonText: "Sao chép số tài khoản",
      copiedText: "Đã sao chép!",
      demoWarning: "⚠️ ĐÂY LÀ QR DEMO MINH HOẠ — VUI LÒNG KHÔNG THỰC HIỆN GIAO DỊCH CHUYỂN TIỀN THẬT."
    }
  },

  // --------------------------------------------------------------------------
  // 8. LỜI CHÚC (WISHES - PHASE 6: KHÔNG RSVP, LƯU CLIENT-SIDE)
  // --------------------------------------------------------------------------
  wishes: {
    title: "Wishes",
    subtitle: "Tuliskan Ucapan & Doa Yang Terbaik Untuk Kedua Mempelai",
    submitButtonText: "Kirim",
    placeholderName: "sigma",
    placeholderMessage: "Ucapan",
    replyText: "Reply",
    timeAgoText: "baru saja",
    demoNote: "* Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).",
    initialComments: [
      {
        name: "sigma",
        time: "baru saja",
        content: "lala"
      },
      {
        name: "kiki",
        time: "baru saja",
        content: "xin chào"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 9. LỜI CẢM ƠN (CLOSING / THANK YOU - PHASE 7)
  // --------------------------------------------------------------------------
  closing: {
    title: "Terima Kasih",
    message: "Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kedua mempelai.",
    signOff: "Wassalamu’alaikum Wr. Wb.",
    subSignOff: "Kami yang berbahagia,",
    coupleName: "Hoàng Nam & Khánh Linh",
    photo: "assets/images/couple/cover.jpg"
  },
  // Giữ alias thankYou để tương thích ngược
  thankYou: {
    title: "Terima Kasih",
    message: "Merupakan suatu kebahagiaan và kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do’a restu kepada kedua mempelai.",
    signOff: "Wassalamu’alaikum Wr. Wb.",
    subSignOff: "Kami yang berbahagia,",
    coupleName: "Hoàng Nam & Khánh Linh",
    photo: "assets/images/couple/cover.jpg"
  },

  // --------------------------------------------------------------------------
  // 10. NHẠC NỀN & THANH ĐIỀU HƯỚNG
  // --------------------------------------------------------------------------
  music: {
    src: "assets/music/background.mp3",
    autoplayOnOpen: true
  },

  navigation: [
    { id: "hero", label: "Đầu Trang", icon: "home" },
    { id: "couple", label: "Cặp Đôi", icon: "couple" },
    { id: "events", label: "Sự Kiện", icon: "calendar" },
    { id: "story", label: "Chuyện Tình", icon: "story" },
    { id: "gift", label: "Mừng Cưới", icon: "gift" },
    { id: "wishes", label: "Lời Chúc", icon: "wishes" }
  ]
};

// Đảm bảo tương thích cả môi trường script tag và module
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
`;

code = code.substring(0, targetIndex) + newBlock;
fs.writeFileSync(configPath, code, 'utf8');
console.log('Successfully updated config.js');

