import { RequestHandler } from "express";

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

interface ChatResponse {
  reply: string;
  confidence: number;
  sources?: string[];
}

// Knowledge base về thời trang
const fashionKnowledge: Record<string, Record<string, string>> = {
  "chọn áo": {
    "cơ thể gầy":
      "Với cơ thể gầy, bạn nên chọn:\n• Áo có màu sắc nổi bật để tôn dáng\n• Áo rộng một chút hoặc có chi tiết họa tiết\n• Áo lớp (hoodie, cardigan) để tạo chiều rộng\n• Tránh áo quá sát hay quá mỏng\n\nSản phẩm gợi ý: Áo Hoodie Casual, Áo Sơ Mi Oxford",
    "cơ thể mũm mĩm":
      "Với cơ thể mũm mĩm, bạn nên chọn:\n• Áo có màu tối hoặc kết hợp tối-sáng\n• Áo thoải mái nhưng không quá rộng\n• Áo dài tay giấu bắp tay\n• Tránh áo quá sáng hay quá bó sát\n\nSản phẩm gợi ý: Áo Thun Cotton Premium, Áo Khoác Blazer",
    "công sở":
      "Cho môi trường công sở, chọn:\n• Áo Sơ Mi Oxford hoặc Blazer\n• Màu sắc lịch sự: trắng, xanh, đen, xám\n• Chất liệu tốt: cotton, linen, polyester pha\n• Cửa hàng của chúng tôi có: Áo Sơ Mi Oxford Nữ (349.000₫)",
  },
  "chọn quần": {
    "quần jean":
      "Chọn quần jean phù hợp:\n• Slim Fit: tôn dáng, phù hợp mọi cơ thể\n• Straight Fit: thoải mái, dễ mặc\n• Bootcut: tôn chân\n• Wash xanh đậm hoặc xanh nhạt: dễ mix\n\nSản phẩm: Quần Jean Slim Fit Nam (399.000₫)",
    "quần tây":
      "Quần tây công sở:\n• Chọn size vừa vặn, không quá chặt hay quá rộng\n• Màu đen, xám, nâu là chuẩn\n• Chất lượng tốt có thể mặc lâu dài\n• Ủi phẳng trước khi mặc\n\nSản phẩm: Quần Tây Nam Formal (599.000₫)",
    "quần joggers":
      "Quần joggers casual:\n• Thoải mái nhưng vẫn lịch sự\n• Phù hợp mặc nhà hoặc casual dates\n• Màu sắc: đen, xám, xanh navy là chủ yếu\n\nSản phẩm: Quần Joggers Nam (299.000₫)",
  },
  "mix-match": {
    "casual":
      "Style casual hàng ngày:\n• Áo thun + Quần jean + Sneakers\n• Hoodie + Joggers + Sneakers\n• Áo sơ mi suông + Shorts + Dép\n\nChú ý: Màu sắc hài hòa, không quá 3 màu chính",
    "công sở":
      "Style công sở:\n• Áo sơ mi + Quần tây + Giày công sở\n• Blazer + Quần tây + Heels\n• Váy đầm midi + Áo khoác\n\nChú ý: Tuy nhiên, lịch sự nhất",
    "dạo phố":
      "Cho dạo phố/cafe:\n• Áo thun/sơ mi + Quần jean + Sneakers\n• Váy đầm midi + Áo khoác nhẹ\n• Quần joggers + Áo hoodie + Giày\n\nChú ý: Thoải mái nhưng vẫn trông gọn gàng",
  },
  "chăm sóc": {
    "giặt áo thun":
      "Giặt áo thun đúng cách:\n1. Lộn áo ra khi giặt để giữ màu\n2. Nước lạnh hoặc hơi ấm (30-40°C)\n3. Dùng detergent nhẹ\n4. Không vắt quá mạnh\n5. Sấy bằng gió hoặc phơi bóng mặt\n\nTừ: Áo Thun Cotton Premium",
    "giặt quần jean":
      "Giặt quần jean đúng cách:\n1. Lộn ra trước khi giặt\n2. Nước lạnh (20-30°C)\n3. Giặt tay hoặc máy chế độ nhẹ\n4. Không tẩy\n5. Phơi bóng mặt, tránh phơi trực tiếp nắng\n\nTừ: Quần Jean Slim Fit",
    "bảo vệ áo khoác":
      "Bảo vệ áo khoác/blazer:\n1. Giặt khô (dry clean) tốt nhất\n2. Hoặc giặt tay ở chế độ nhẹ\n3. Để khô tự nhiên trên treo áo\n4. Khi không dùng, bảo quản trong túi vải\n5. Định kỳ giặt để loại bỏ bụi\n\nTừ: Áo Khoác Blazer Nữ",
  },
  "đầu mùa": {
    "mua quần áo mùa hè":
      "Mua sắm cho mùa hè:\n• Chọn chất liệu thoáng mát: cotton, linen\n• Màu sáng: trắng, be, xanh nhạt\n• Quần shorts, váy ngắn\n• Áo hở vai, áo phông\n• Không quên nắng: áo chống nắng\n\nSản phẩm phù hợp: Áo Thun, Quần Shorts Trẻ Em",
    "mua quần áo mùa đông":
      "Mua sắm cho mùa đông:\n• Chọn chất liệu ấm: cotton dày, wool\n• Màu tối: đen, nâu, xanh navy\n• Áo hoodie, áo khoác, áo len\n• Quần dài, quần lót ấm\n• Phụ kiện: mũ, khăn, găng tay\n\nSản phẩm phù hợp: Áo Hoodie Casual, Áo Khoác Blazer",
  },
  "kích cỡ": {
    "chọn size quần áo":
      "Cách chọn size quần áo chuẩn:\n\n**Nam:**\n• Áo: XS(44), S(48), M(52), L(56), XL(60), XXL(64)\n• Quần: 28, 30, 32, 34, 36, 38\n\n**Nữ:**\n• Áo: XS, S, M, L, XL\n• Quần: 24, 26, 28, 30, 32\n\n**Mẹo:** Luôn try on nếu mua offline, hoặc đọc kỹ size chart online",
    "quần quá lớn/nhỏ":
      "Nếu quần áo không vừa vặn:\n• Quá lớn: May gọn lại hoặc dùng dây thắt\n• Quá nhỏ: Không nên ép mặc, có thể gây khó chịu\n• Liên hệ cửa hàng để đổi size (nếu còn hạn chế độ)\n\nLưu ý: Tại FashionAI, bạn có thể đổi size miễn phí trong 7 ngày",
  },
  "giá cả": {
    "có rẻ không":
      "Giá cả sản phẩm tại FashionAI:\n• Áo thun cotton: 99.000₫ - 199.000₫\n• Quần jean: 299.000₫ - 399.000₫\n• Váy đầm: 399.000₫ - 549.000₫\n• Áo khoác: 399.000₫ - 799.000₫\n\n💡 Tip: Theo dõi mục 'Sản Phẩm Nổi Bật' để không bỏ lỡ sale!",
    "khuyến mãi":
      "Khuyến mãi hiện tại:\n• Giảm 30-35% một số sản phẩm\n• Miễn phí vận chuyển cho mọi đơn hàng\n• Quy đổi điểm tích lũy (đang chuẩn bị)\n\n📢 Follow fanpage để cập nhật khuyến mãi mới!",
  },
};

export const handleChat: RequestHandler<
  {},
  ChatResponse,
  ChatRequest
> = (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      reply: "Xin lỗi, tôi không hiểu yêu cầu của bạn. Vui lòng gửi một câu hỏi.",
      confidence: 0,
    });
  }

  const lowerMessage = message.toLowerCase();

  // Tìm kiếm trong knowledge base
  let reply = "";
  let confidence = 0;
  const sources: string[] = [];

  for (const [category, answers] of Object.entries(fashionKnowledge)) {
    for (const [keyword, answer] of Object.entries(answers)) {
      if (lowerMessage.includes(keyword) || keyword.includes(lowerMessage)) {
        reply = answer;
        confidence = Math.min(
          1,
          0.7 + (lowerMessage.length / keyword.length) * 0.3
        );
        sources.push(`${category} - ${keyword}`);
        break;
      }
    }
    if (reply) break;
  }

  // Nếu không tìm thấy, trả lời mặc định
  if (!reply) {
    const patterns: Record<string, string> = {
      "giúp|hỗ trợ|tư vấn":
        "Tôi có thể giúp bạn với:\n\n👕 **Chọn quần áo**: Gợi ý size, color, style phù hợp\n👔 **Mix & Match**: Cách kết hợp trang phục\n🧼 **Chăm sóc**: Cách giặt và bảo vệ quần áo\n💰 **Giá cả**: Khuyến mãi, so sánh giá\n📏 **Kích cỡ**: Hướng dẫn chọn size chuẩn\n\nBạn muốn hỏi về điều gì?",
      "công sở|formal|lịch sự":
        "Cho môi trường công sở, tôi khuyến nghị:\n\n✨ **Top Picks**:\n• Áo Sơ Mi Oxford Nữ - 349.000₫\n• Quần Tây Nam Formal - 599.000₫\n• Áo Khoác Blazer Nữ - 799.000₫\n\n💡 **Tips**: Chọn màu tối (đen, xám, xanh navy), chất liệu tốt, phù hợp với body",
      "casual|hàng ngày|dạo phố":
        "Cho style casual hàng ngày:\n\n✨ **Top Picks**:\n• Áo Thun Cotton Premium Nam - 199.000₫\n• Quần Joggers Nam - 299.000₫\n• Áo Hoodie Casual Nam - 459.000₫\n\n💡 **Tips**: Mix áo thun/hoodie với quần jean hoặc joggers, add sneakers",
      "thể thao|gym|tập":
        "Cho hoạt động thể thao:\n\n✨ **Top Picks**:\n• Áo Tập Gym Nữ - 249.000₫\n• Quần Legging Thể Thao Nữ - 299.000₫\n\n💡 **Tips**: Chọn chất liệu co giãn, thoáng mát, dân mồ hôi tốt",
      "nữ|girl|woman":
        "Danh mục cho nữ giới:\n\n✨ **Best Sellers**:\n• Áo Sơ Mi Oxford Nữ - 349.000₫\n• Váy Đầm Midi Nữ - 549.000₫\n• Áo Khoác Blazer Nữ - 799.000₫\n• Áo Tập Gym Nữ - 249.000₫\n\nKhám phá thêm tại Cửa Hàng!",
      "nam|male|men":
        "Danh mục cho nam giới:\n\n✨ **Best Sellers**:\n• Áo Thun Cotton Premium Nam - 199.000₫\n• Quần Jean Slim Fit Nam - 399.000₫\n• Áo Hoodie Casual Nam - 459.000₫\n• Quần Tây Nam Formal - 599.000₫\n\nKhám phá thêm tại Cửa Hàng!",
      "trẻ em|bé|kid|trẻ":
        "Danh mục cho trẻ em:\n\n✨ **Best Sellers**:\n• Áo Phông Trẻ Em - 99.000₫\n• Quần Shorts Trẻ Em - 129.000₫\n\n💡 **Tips**: Tất cả sản phẩm trẻ em được làm từ cotton an toàn",
    };

    for (const [pattern, answer] of Object.entries(patterns)) {
      const keywords = pattern.split("|");
      if (keywords.some((kw) => lowerMessage.includes(kw))) {
        reply = answer;
        confidence = 0.6;
        sources.push(`General Pattern: ${pattern}`);
        break;
      }
    }
  }

  // Default response nếu vẫn không tìm thấy
  if (!reply) {
    reply =
      "Xin lỗi, tôi không tìm thấy thông tin về chủ đề bạn hỏi. 😅\n\nTôi có thể giúp bạn với:\n- Chọn quần áo phù hợp\n- Mix & Match trang phục\n- Chăm sóc quần áo\n- Hỏi về giá cả & khuyến mãi\n- Gợi ý size & kích cỡ\n\nVui lòng thử lại với một câu hỏi khác!";
    confidence = 0.3;
  }

  res.json({
    reply,
    confidence,
    sources: sources.length > 0 ? sources : undefined,
  });
};
