const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'assets', 'js', 'config.js');
let code = fs.readFileSync(configPath, 'utf8');

const targetStart = '  // --------------------------------------------------------------------------\n  // 8. LỜI CHÚC (WISHES';
const targetEnd = '  // --------------------------------------------------------------------------\n  // 9. LỜI CẢM ƠN (CLOSING';

const startIndex = code.indexOf(targetStart);
const endIndex = code.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Target boundary not found in config.js');
  process.exit(1);
}

const newWishesBlock = `  // --------------------------------------------------------------------------
  // 8. LỜI CHÚC (WISHES - CAROUSEL 3 MỤC, PHÂN LOẠI NHÀ TRAI / NHÀ GÁI, VIEW ALL)
  // --------------------------------------------------------------------------
  wishes: {
    title: "Wishes",
    subtitle: "Gửi những lời chúc tốt đẹp nhất đến cô dâu & chú rể",
    submitButtonText: "Gửi Lời Chúc",
    viewAllButtonText: "Xem Tất Cả Lời Chúc",
    placeholderName: "Tên của bạn...",
    placeholderMessage: "Nhập lời chúc tốt đẹp của bạn gửi tới cô dâu & chú rể...",
    replyText: "Trả lời",
    timeAgoText: "Vừa xong",
    demoNote: "* Dữ liệu lời chúc demo lưu tạm thời trên trình duyệt (client-side).",
    initialComments: [
      {
        id: "w1",
        name: "Minh Tuấn",
        side: "groom",
        time: "Vừa xong",
        content: "Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương và cùng nhau xây dựng một tổ ấm vẹn tròn!"
      },
      {
        id: "w2",
        name: "Thu Trang",
        side: "bride",
        time: "5 phút trước",
        content: "Chúc mừng Khánh Linh của tớ đã tìm được bến đỗ bình yên! Chúc hai vợ chồng luôn ngọt ngào như ngày đầu."
      },
      {
        id: "w3",
        name: "Anh Tuấn",
        side: "groom",
        time: "15 phút trước",
        content: "Chúc mừng chú em Hoàng Nam rước nàng về dinh! Chúc mừng hạnh phúc hai em, sớm sinh quý tử nhé."
      },
      {
        id: "w4",
        name: "Thùy Linh",
        side: "bride",
        time: "1 giờ trước",
        content: "Cô dâu hôm nay xinh đẹp tuyệt trần! Chúc hai bạn một đời an yên, yêu thương và thấu hiểu nhau."
      },
      {
        id: "w5",
        name: "Đức Anh",
        side: "groom",
        time: "2 giờ trước",
        content: "Chúc hai bạn bách niên giai lão, cùng nhau vượt qua mọi thử thách trong cuộc sống hôn nhân."
      },
      {
        id: "w6",
        name: "Mai Phương",
        side: "bride",
        time: "Hôm qua",
        content: "Hạnh phúc mãi mãi nhé Linh ơi! Nhìn hai bạn thật sự rất xứng đôi vừa lứa, ngưỡng mộ tình yêu của hai bạn."
      }
    ]
  },

`;

code = code.substring(0, startIndex) + newWishesBlock + code.substring(endIndex);
fs.writeFileSync(configPath, code, 'utf8');
console.log('Successfully updated config.js with enhanced wishes configuration');

