/**
 * ==============================================================================
 * ⭐ CẤU HÌNH DỮ LIỆU THIỆP CƯỚI (WEDDING CONFIGURATION)
 * ==============================================================================
 * Toàn bộ thông tin hiển thị của cô dâu, chú rể, ngày giờ cưới, lịch trình,
 * quà mừng và hình ảnh đều được quản lý tại file này.
 * Khi bàn giao cho khách hàng mới, chỉ cần chỉnh sửa nội dung bên dưới.
 */

const WEDDING_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. THÔNG TIN CẶP ĐÔI (COUPLE INFORMATION)
  // --------------------------------------------------------------------------
  groom: {
    shortName: "Hoàng Nam",
    fullName: "Vũ Hoàng Nam",
    roleText: "Chú Rể",
    parents: "Trưởng nam của Ông Vũ Đình Dũng & Bà Nguyễn Thị Mai",
    photo: "assets/images/couple/groom.jpg",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  },
  bride: {
    shortName: "Khánh Linh",
    fullName: "Đỗ Khánh Linh",
    roleText: "Cô Dâu",
    parents: "Ái nữ của Ông Đỗ Quang Huy & Bà Lê Thu Trang",
    photo: "assets/images/couple/bride.jpg",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  },

  // --------------------------------------------------------------------------
  // 2. THỜI GIAN CƯỚI & ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN SETTINGS)
  // --------------------------------------------------------------------------
  // Mốc thời gian đếm đến 00:00 của ngày cưới theo múi giờ Asia/Ho_Chi_Minh (GMT+7)
  weddingDate: "2027-12-12T00:00:00+07:00",
  dateFormatted: "12 . 12 . 2027",
  timezone: "Asia/Ho_Chi_Minh",

  // --------------------------------------------------------------------------
  // 3. THÔNG ĐIỆP & LỜI CHÀO (GREETINGS & QUOTE)
  // --------------------------------------------------------------------------
  invitationTag: "THE WEDDING OF",
  guestGreetingPrefix: "Kính gửi Quý khách:",
  guestGreetingDefault: "Bạn bè & Người thân thương",
  openButtonText: "Mở Thiệp",
  
  heroInvitationText: "Chúng tôi sắp bước vào chặng đường mới, và mong được đón tiếp bạn trong ngày hạnh phúc nhất!",
  saveTheDateText: "Lưu Ngày Trọng Đại",

  quote: {
    content: "“Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng và cùng nhau đi suốt cuộc đời.”",
    author: "Antoine de Saint-Exupéry"
  },

  // --------------------------------------------------------------------------
  // 4. LỊCH TRÌNH SỰ KIỆN (EVENTS SCHEDULE)
  // --------------------------------------------------------------------------
  events: [
    {
      id: "ceremony",
      type: "Lễ Thành Hôn",
      month: "THÁNG 12",
      dayOfWeek: "CHỦ NHẬT",
      dayNumber: "12",
      year: "2027",
      time: "09:00 Sáng",
      venueTitle: "TƯ GIA NHÀ GÁI",
      address: "Số 88 Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com"
    },
    {
      id: "reception",
      type: "Tiệc Cưới",
      month: "THÁNG 12",
      dayOfWeek: "CHỦ NHẬT",
      dayNumber: "12",
      year: "2027",
      time: "18:00 Tối",
      venueTitle: "TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI WHITE PALACE",
      address: "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com"
    }
  ],

  // --------------------------------------------------------------------------
  // 5. CÂU CHUYỆN TÌNH YÊU (LOVE STORY TIMELINE)
  // --------------------------------------------------------------------------
  loveStory: [
    {
      year: "2020",
      title: "Lần Đầu Gặp Gỡ",
      content: "Chúng tôi gặp nhau lần đầu vào một buổi chiều thu Hà Nội dưới giảng đường đại học. Nụ cười rạng rỡ của em ngày hôm ấy đã để lại ấn tượng sâu đậm không thể nào quên."
    },
    {
      year: "2022",
      title: "Lời Tỏ Tình & Bắt Đầu Yêu",
      content: "Sau 2 năm đồng hành từ tình bạn đến tình yêu, chúng tôi nhận ra đối phương là mảnh ghép hoàn hảo nhất. Một cái gật đầu đã mở ra chuyến hành trình ngọt ngào cùng nhau vượt qua bao thăng trầm."
    },
    {
      year: "2027",
      title: "Ngày Về Chung Một Nhà",
      content: "Sau những năm tháng thanh xuân sẻ chia vui buồn, chúng tôi quyết định nắm chặt tay nhau bước vào ngưỡng cửa hôn nhân, bắt đầu chương đẹp nhất của cuộc đời."
    }
  ],

  // --------------------------------------------------------------------------
  // 6. ALBUM HÌNH ẢNH (GALLERY)
  // --------------------------------------------------------------------------
  gallery: [
    { src: "assets/images/couple/gallery-1.jpg", alt: "Khoảnh khắc cưới 1" },
    { src: "assets/images/couple/gallery-2.jpg", alt: "Khoảnh khắc cưới 2" },
    { src: "assets/images/couple/gallery-3.jpg", alt: "Khoảnh khắc cưới 3" },
    { src: "assets/images/couple/gallery-4.jpg", alt: "Khoảnh khắc cưới 4" },
    { src: "assets/images/couple/gallery-5.jpg", alt: "Khoảnh khắc cưới 5" },
    { src: "assets/images/couple/gallery-6.jpg", alt: "Khoảnh khắc cưới 6" }
  ],

  // --------------------------------------------------------------------------
  // 7. MỪNG CƯỚI / HỘP MỪNG (WEDDING GIFT / DIGITAL ENVELOPE)
  // --------------------------------------------------------------------------
  gift: {
    title: "Mừng Cưới",
    message: "Sự hiện diện và lời chúc phúc của Quý khách là món quà quý giá nhất đối với chúng tôi. Nếu Quý khách muốn gửi quà mừng từ xa, xin vui lòng gửi qua:",
    openPopupButtonText: "Gửi Mừng Cưới",
    account: {
      bankName: "Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam (Vietcombank)",
      shortBankName: "Vietcombank",
      accountNumber: "9988776655",
      accountName: "VU HOANG NAM",
      qrCodeImage: "assets/images/decorations/qr-demo.png",
      demoWarning: "⚠️ ĐÂY LÀ QR DEMO MINH HOẠ — VUI LÒNG KHÔNG THỰC HIỆN GIAO DỊCH CHUYỂN TIỀN THẬT."
    }
  },

  // --------------------------------------------------------------------------
  // 8. LỜI CHÚC (WISHES - KHÔNG RSVP, LƯU CLIENT-SIDE)
  // --------------------------------------------------------------------------
  wishes: {
    title: "Sổ Lưu Bút Lời Chúc",
    subtitle: "Hãy để lại những lời chúc tốt đẹp nhất dành tặng cô dâu và chú rể nhé!",
    initialComments: [
      {
        name: "Minh Tuấn & Bích Ngọc",
        time: "Vừa xong",
        content: "Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương và đồng lòng vượt qua mọi thử thách!"
      },
      {
        name: "Gia đình Bác Hùng",
        time: "Hôm qua",
        content: "Mừng ngày vui của hai cháu! Chúc hai cháu sớm có tin vui và xây dựng một tổ ấm vẹn tròn."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 9. LỜI CẢM ƠN (FOOTER / THANK YOU)
  // --------------------------------------------------------------------------
  thankYou: {
    title: "Lời Cảm Ơn",
    message: "Sự hiện diện và những lời chúc phúc chân thành từ Quý khách là niềm vinh hạnh to lớn cho gia đình chúng tôi. Xin chân thành cảm ơn!",
    signOff: "Trân trọng cảm ơn,",
    coupleName: "Hoàng Nam & Khánh Linh"
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

