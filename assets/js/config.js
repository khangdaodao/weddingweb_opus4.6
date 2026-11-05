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
  // Lưu ý: Không hiển thị thông tin cha mẹ ở phần giới thiệu theo yêu cầu
  bride: {
    shortName: "Khánh Linh",
    fullName: "Đỗ Khánh Linh",
    roleText: "Cô Dâu",
    bio: "Một cô gái dịu dàng luôn mỉm cười và trân quý từng khoảnh khắc ngọt ngào của tình yêu.",
    photo: "assets/images/couple/bride.jpg",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  },
  groom: {
    shortName: "Hoàng Nam",
    fullName: "Vũ Hoàng Nam",
    roleText: "Chú Rể",
    bio: "Chàng trai chân thành, luôn kiên nhẫn và sẵn lòng là chỗ dựa vững chãi suốt cuộc đời.",
    photo: "assets/images/couple/groom.jpg",
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

  // Lời chào mở đầu cho Section Couple Profile
  coupleGreeting: {
    title: "Trân Trọng Kính Mời",
    subtitle: "Sự hiện diện của Quý khách là niềm vinh hạnh to lớn và lời chúc phúc ý nghĩa nhất dành cho chúng tôi."
  },

  quote: {
    content: "“Được ai đó yêu sâu sắc sẽ mang lại cho bạn sức mạnh, trong khi yêu ai đó sâu sắc sẽ mang lại cho bạn sự dũng cảm.”",
    author: "Lão Tử"
  },

  // --------------------------------------------------------------------------
  // 4. LỊCH TRÌNH SỰ KIỆN (WEDDING EVENTS SCHEDULE)
  // --------------------------------------------------------------------------
  events: {
    sectionHeading: "Save The Date",
    ceremony: {
      id: "ceremony",
      eventName: "Lễ Thành Hôn",
      month: "THÁNG 12",
      dayOfWeek: "CHỦ NHẬT",
      dayNumber: "12",
      year: "2027",
      date: "Chủ Nhật, ngày 12 tháng 12 năm 2027",
      time: "09:00 Sáng",
      venue: "TƯ GIA NHÀ GÁI",
      address: "Số 88 Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      googleMapsUrl: "https://maps.google.com/?q=88+L%C3%AA+Du%E1%BA%A9n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh"
    },
    reception: {
      id: "reception",
      eventName: "Tiệc Cưới",
      month: "THÁNG 12",
      dayOfWeek: "CHỦ NHẬT",
      dayNumber: "12",
      year: "2027",
      date: "Chủ Nhật, ngày 12 tháng 12 năm 2027",
      time: "18:00 Tối",
      venue: "TRUNG TÂM HỘI NGHỊ WHITE PALACE",
      address: "194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
      googleMapsUrl: "https://maps.google.com/?q=White+Palace,+194+Ho%C3%A0ng+V%C4%83n+Th%E1%BB%A5,+Ph%C6%B0%E1%BB%9Dng+9,+Ph%C3%BA+Nhu%E1%BA%ADn,+H%E1%BB%93+Ch%C3%AD+Minh"
    }
  },

  // --------------------------------------------------------------------------
  // 5. CÂU CHUYỆN TÌNH YÊU (LOVE STORY TIMELINE)
  // --------------------------------------------------------------------------
  loveStoryHeading: {
    title: "Love Story",
    subtitle: '"Every Love Story is Beautiful, but Ours is My Favorite"'
  },
  loveStory: [
    {
      id: "milestone-1",
      title: "Lần Đầu Gặp Gỡ",
      date: "Năm 2020",
      description: "Chúng tôi gặp nhau lần đầu vào một buổi chiều thu Hà Nội dưới giảng đường đại học. Nụ cười rạng rỡ của em ngày hôm ấy đã để lại ấn tượng sâu đậm không thể nào quên.\n\nSau những buổi trò chuyện thân mật, chúng tôi dần tìm thấy sự đồng điệu trong tâm hồn.",
      side: "right",
      theme: "maroon",
      image: null
    },
    {
      id: "milestone-2",
      title: "Bắt Đầu Yêu",
      date: "Năm 2022",
      description: "Sau 2 năm đồng hành từ tình bạn đến tình yêu, chúng tôi nhận ra đối phương là mảnh ghép hoàn hảo nhất. Một cái gật đầu đã mở ra chuyến hành trình ngọt ngào cùng nhau vượt qua bao thăng trầm.\n\nMỗi ngày trôi qua đều là một kỷ niệm đáng trân trọng khi được ở bên nhau.",
      side: "right",
      theme: "maroon",
      image: null
    },
    {
      id: "milestone-3",
      title: "Ngày Chung Đôi",
      date: "12 . 12 . 2027",
      description: "Sau những năm tháng thanh xuân sẻ chia vui buồn, chúng tôi quyết định nắm chặt tay nhau bước vào ngưỡng cửa hôn nhân, bắt đầu chương đẹp nhất của cuộc đời.\n\nCảm ơn bạn đã luôn ở bên và chúc phúc cho hành trình hạnh phúc của chúng tôi.",
      side: "right",
      theme: "maroon",
      image: null
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
  // 7. MỪNG CƯỚI / HỘP MỪNG (WEDDING GIFT / DIGITAL ENVELOPE - PHASE 6)
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
