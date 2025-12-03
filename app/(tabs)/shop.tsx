import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";
import { Star, ShoppingCart } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const { width } = Dimensions.get("window");
const PRODUCT_WIDTH = (width - 32 - 8) / 2;

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();

  const categories = [
    { id: "nam", label: "Nam" },
    { id: "nữ", label: "Nữ" },
    { id: "trẻem", label: "Trẻ Em" },
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "sports", label: "Thể Thao" },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
      image: product.image,
    });
  };

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity
      onPress={() => router.push(`/product/${item.id}`)}
      style={[styles.productCard, { width: PRODUCT_WIDTH }]}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        {item.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                color={i < Math.floor(item.rating) ? "#FCD34D" : "#D1D5DB"}
                fill={i < Math.floor(item.rating) ? "#FCD34D" : "none"}
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>({item.reviews})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {item.price.toLocaleString("vi-VN")}₫
          </Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              {item.originalPrice.toLocaleString("vi-VN")}₫
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartBtn}
        >
          <ShoppingCart color="#ffffff" size={16} />
          <Text style={styles.addToCartText}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Cửa Hàng Thời Trang</Text>
        <Text style={styles.heroSubtitle}>Khám phá bộ sưu tập sản phẩm chất lượng cao</Text>
      </View>

      <View style={styles.content}>
        {/* Categories Sidebar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            style={[
              styles.categoryBtn,
              selectedCategory === null && styles.categoryBtnActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === null && styles.categoryTextActive,
              ]}
            >
              Tất Cả
            </Text>
          </TouchableOpacity>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id as any)}
              style={[
                styles.categoryBtn,
                selectedCategory === cat.id && styles.categoryBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && styles.categoryTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          contentContainerStyle={styles.gridContent}
          scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  heroSection: {
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  categoriesScroll: {
    marginBottom: 12,
  },
  categoriesContainer: {
    gap: 8,
    paddingVertical: 8,
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  categoryBtnActive: {
    backgroundColor: "#3B82F6",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  categoryTextActive: {
    color: "#ffffff",
  },
  grid: {
    gap: 8,
    marginBottom: 8,
  },
  gridContent: {
    gap: 8,
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  productImageContainer: {
    position: "relative",
    width: "100%",
    height: 160,
    backgroundColor: "#F3F4F6",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 6,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  reviewCount: {
    fontSize: 11,
    color: "#999999",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  originalPrice: {
    fontSize: 11,
    color: "#999999",
    textDecorationLine: "line-through",
  },
  addToCartBtn: {
    flexDirection: "row",
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  addToCartText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
