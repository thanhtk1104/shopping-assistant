import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Trash2, ShoppingBag, ArrowLeft } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleRemove = (id: string) => {
    Alert.alert("Xác Nhận", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy", onPress: () => {} },
      {
        text: "Xóa",
        onPress: () => removeFromCart(id),
        style: "destructive",
      },
    ]);
  };

  const handleClearCart = () => {
    Alert.alert("Xác Nhận", "Bạn có chắc muốn xóa toàn bộ giỏ hàng?", [
      { text: "Hủy", onPress: () => {} },
      {
        text: "Xóa",
        onPress: () => clearCart(),
        style: "destructive",
      },
    ]);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <ShoppingBag color="#999999" size={56} />
          <Text style={styles.emptyTitle}>Giỏ Hàng Trống</Text>
          <Text style={styles.emptySubtitle}>Hãy thêm một số sản phẩm vào giỏ hàng của bạn</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/shop")}
            style={styles.continueBtn}
          >
            <ShoppingBag color="#ffffff" size={18} />
            <Text style={styles.continueBtnText}>Tiếp Tục Mua Sắm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderCartItem = ({ item }: { item: typeof items[0] }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          Kích cỡ: <Text style={styles.detailValue}>{item.size}</Text> | Màu: <Text style={styles.detailValue}>{item.color}</Text>
        </Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString("vi-VN")}₫
        </Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.deleteBtn}
        >
          <Trash2 color="#EF4444" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Giỏ Hàng</Text>
        </View>

        {/* Cart Items */}
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.cartList}
        />

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Tóm Tắt Đơn Hàng</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính:</Text>
            <Text style={styles.summaryValue}>
              {total.toLocaleString("vi-VN")}₫
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
            <Text style={[styles.summaryValue, styles.freeShipping]}>Miễn phí</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng Cộng:</Text>
            <Text style={styles.totalValue}>
              {total.toLocaleString("vi-VN")}₫
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/checkout")}
            style={styles.checkoutBtn}
          >
            <Text style={styles.checkoutBtnText}>Tiến Hành Thanh Toán</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/shop")}
            style={styles.continueShoppingBtn}
          >
            <ArrowLeft color="#3B82F6" size={18} />
            <Text style={styles.continueShoppingText}>Tiếp Tục Mua Sắm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClearCart}
            style={styles.clearBtn}
          >
            <Text style={styles.clearBtnText}>Xóa Giỏ Hàng</Text>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  continueBtn: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  cartList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cartItem: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: "600",
    color: "#000000",
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  itemActions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBtnText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  quantityValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
    minWidth: 20,
    textAlign: "center",
  },
  deleteBtn: {
    padding: 6,
  },
  summary: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 13,
    color: "#666666",
  },
  freeShipping: {
    color: "#10B981",
    fontWeight: "600",
  },
  totalRow: {
    borderBottomWidth: 0,
    paddingTopx: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  checkoutBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  checkoutBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  continueShoppingBtn: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  continueShoppingText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  clearBtn: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  clearBtnText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
