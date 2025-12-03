import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Star, ShoppingCart, ArrowLeft } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>Sản phẩm không tìm thấy</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Quay Lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    });
    Alert.alert("Thành Công", "Sản phẩm đã được thêm vào giỏ hàng!");
    setQuantity(1);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercent}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  color={i < Math.floor(product.rating) ? "#FCD34D" : "#D1D5DB"}
                  fill={i < Math.floor(product.rating) ? "#FCD34D" : "none"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating}/5 ({product.reviews} đánh giá)
            </Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {product.price.toLocaleString("vi-VN")}₫
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </Text>
            )}
          </View>

          {product.originalPrice && (
            <Text style={styles.savingsText}>
              Tiết kiệm {(product.originalPrice - product.price).toLocaleString("vi-VN")}₫
            </Text>
          )}

          {/* Size Selection */}
          <View style={styles.selectionGroup}>
            <Text style={styles.selectionLabel}>Kích Cỡ</Text>
            <View style={styles.optionsContainer}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.option,
                    selectedSize === size && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedSize === size && styles.optionTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.selectionGroup}>
            <Text style={styles.selectionLabel}>Màu Sắc</Text>
            <View style={styles.optionsContainer}>
              {product.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.option,
                    selectedColor === color && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedColor === color && styles.optionTextSelected,
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.selectionGroup}>
            <Text style={styles.selectionLabel}>Số Lượng</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.addToCartBtn}
          >
            <ShoppingCart color="#ffffff" size={22} />
            <Text style={styles.addToCartText}>
              Thêm Vào Giỏ ({(product.price * quantity).toLocaleString("vi-VN")}₫)
            </Text>
          </TouchableOpacity>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={styles.stockText}>✓ Còn hàng - Giao hàng nhanh</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999999",
    textDecorationLine: "line-through",
  },
  savingsText: {
    fontSize: 13,
    color: "#3B82F6",
    fontWeight: "600",
    marginBottom: 20,
  },
  selectionGroup: {
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    minWidth: "22%",
    alignItems: "center",
  },
  optionSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F6",
  },
  optionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  optionTextSelected: {
    color: "#ffffff",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBtnText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600",
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    minWidth: 30,
    textAlign: "center",
  },
  addToCartBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 16,
  },
  addToCartText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  stockContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
    borderRadius: 8,
    alignItems: "center",
  },
  stockText: {
    color: "#166534",
    fontWeight: "600",
    fontSize: 13,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
