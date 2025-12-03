import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { ShoppingBag, Sparkles, Zap, Brain, Truck, ArrowRight, Star } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Index() {
  const features = [
    {
      icon: "brain",
      title: "Trợ Lý AI Tư Vấn",
      description: "Nhận những lời khuyên cá nhân hóa về thời trang từ trợ lý AI thông minh",
    },
    {
      icon: "sparkles",
      title: "Thời Trang Đa Dạng",
      description: "Bộ sưu tập quần áo nam, nữ, trẻ em - từ casual đến formal",
    },
    {
      icon: "truck",
      title: "Giao Hàng Nhanh",
      description: "Vận chuyển miễn phí, giao hàng nhanh chóng an toàn đến tay bạn",
    },
    {
      icon: "shopping-bag",
      title: "Giá Cạnh Tranh",
      description: "Giá tốt nhất thị trường với nhiều ưu đãi và giảm giá hàng ngày",
    },
    {
      icon: "zap",
      title: "Mua Sắm Dễ Dàng",
      description: "Giao diện thân thiện, thanh toán an toàn và nhanh chóng",
    },
    {
      icon: "star",
      title: "Chất Lượng Đảm Bảo",
      description: "Tất cả sản phẩm đều được kiểm tra chất lượng kỹ càng",
    },
  ];

  const getIcon = (iconName: string) => {
    const iconProps = { size: 28, color: "#3B82F6" };
    switch (iconName) {
      case "brain":
        return <Brain {...iconProps} />;
      case "sparkles":
        return <Sparkles {...iconProps} />;
      case "truck":
        return <Truck {...iconProps} />;
      case "shopping-bag":
        return <ShoppingBag {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      case "star":
        return <Star {...iconProps} color="#FCD34D" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Hero Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#000000", marginBottom: 8 }}>
              Thời Trang Đẳng Cấp với
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#3B82F6" }}>AI</Text>
          </View>

          <Text style={{ fontSize: 16, color: "#666666", marginBottom: 24, lineHeight: 24 }}>
            Khám phá bộ sưu tập thời trang xu hướng. Trợ lý AI của chúng tôi sẽ giúp bạn tìm những bộ quần áo hoàn hảo.
          </Text>

          <View style={{ gap: 12, marginBottom: 32 }}>
            <TouchableOpacity
              onPress={() => router.push("/shop")}
              style={{ backgroundColor: "#3B82F6", paddingVertical: 14, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}
            >
              <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>Khám Phá Cửa Hàng</Text>
              <ArrowRight color="#ffffff" size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/assistant")}
              style={{ borderWidth: 1, borderColor: "#E5E7EB", paddingVertical: 14, borderRadius: 8, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: "#000000", fontSize: 16, fontWeight: "600" }}>Tư Vấn AI</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={{ borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 24, flexDirection: "row", justifyContent: "space-around" }}>
            {[
              { count: "10K+", label: "Khách Hàng Hài Lòng" },
              { count: "200+", label: "Sản Phẩm" },
              { count: "100%", label: "Đảm Bảo Chất Lượng" },
            ].map((stat, idx) => (
              <View key={idx} style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}>{stat.count}</Text>
                <Text style={{ fontSize: 12, color: "#666666", marginTop: 4 }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24, backgroundColor: "#F9FAFB" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000000", marginBottom: 8, textAlign: "center" }}>
            Sản Phẩm Nổi Bật
          </Text>
          <Text style={{ fontSize: 14, color: "#666666", marginBottom: 20, textAlign: "center" }}>
            Những item thời trang được yêu thích nhất
          </Text>

          {[
            {
              name: "Áo Thun Cotton Premium Nam",
              price: "199.000₫",
              image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
            },
            {
              name: "Quần Jean Slim Fit",
              price: "399.000₫",
              image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop",
            },
            {
              name: "Váy Đầm Midi Nữ",
              price: "549.000₫",
              image: "https://images.unsplash.com/photo-1595777712802-46b80a36cdb6?w=300&h=300&fit=crop",
            },
          ].map((product, idx) => (
            <View key={idx} style={{ marginBottom: 16, backgroundColor: "#ffffff", borderRadius: 8, overflow: "hidden", borderWidth: 1, borderColor: "#E5E7EB" }}>
              <Image
                source={{ uri: product.image }}
                style={{ width: "100%", height: 160, backgroundColor: "#E5E7EB" }}
              />
              <View style={{ padding: 12 }}>
                <Text style={{ fontWeight: "600", color: "#000000", marginBottom: 8 }}>
                  {product.name}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#3B82F6" }}>
                    {product.price}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} color="#FCD34D" size={14} fill="#FCD34D" />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={() => router.push("/shop")}
            style={{ borderWidth: 1, borderColor: "#3B82F6", paddingVertical: 12, borderRadius: 8, marginTop: 16 }}
          >
            <Text style={{ color: "#3B82F6", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
              Xem Tất Cả Sản Phẩm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000000", marginBottom: 8, textAlign: "center" }}>
            Tại Sao Chọn FashionAI?
          </Text>
          <Text style={{ fontSize: 14, color: "#666666", marginBottom: 20, textAlign: "center" }}>
            Những tính năng mạnh mẽ cho trải nghiệm mua sắm tốt hơn
          </Text>

          {features.map((feature, idx) => (
            <View
              key={idx}
              style={{
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                backgroundColor: "#ffffff",
                marginBottom: 12,
              }}
            >
              <View style={{ marginBottom: 8 }}>
                {getIcon(feature.icon)}
              </View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000000", marginBottom: 6 }}>
                {feature.title}
              </Text>
              <Text style={{ fontSize: 12, color: "#666666", lineHeight: 18 }}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA Section */}
        <View style={{ marginHorizontal: 16, marginVertical: 24, padding: 24, borderRadius: 16, borderWidth: 1, borderColor: "#BFDBFE", backgroundColor: "#F0F9FF" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000000", marginBottom: 12, textAlign: "center" }}>
            Sẵn Sàng Mua Sắm Thông Minh?
          </Text>
          <Text style={{ fontSize: 14, color: "#666666", marginBottom: 20, textAlign: "center", lineHeight: 20 }}>
            Khám phá bộ sưu tập thời trang hoặc sử dụng trợ lý AI.
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/shop")}
              style={{ backgroundColor: "#3B82F6", paddingVertical: 12, borderRadius: 8 }}
            >
              <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
                Mua Sắm Ngay
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/assistant")}
              style={{ borderWidth: 1, borderColor: "#3B82F6", paddingVertical: 12, borderRadius: 8 }}
            >
              <Text style={{ color: "#3B82F6", fontSize: 16, fontWeight: "600", textAlign: "center" }}>
                Tư Vấn AI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={{ borderTopWidth: 1, borderTopColor: "#E5E7EB", backgroundColor: "#ffffff", paddingHorizontal: 16, paddingVertical: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "#999999" }}>
            © 2024 FashionAI. Cửa hàng thời trang được trợ lý AI.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
