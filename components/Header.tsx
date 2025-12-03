import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import { ShoppingBag, ShoppingCart, MessageCircle, Home, Store } from "react-native-vector-icons/Feather";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  const isCartPage = pathname === "/cart";
  const isCheckoutPage = pathname === "/checkout";

  if (isCartPage || isCheckoutPage) {
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Quay Lại</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          {!isCheckoutPage && (
            <TouchableOpacity
              onPress={() => router.push("/cart")}
              style={styles.cartButton}
            >
              <ShoppingCart color="#3B82F6" size={24} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.logoButton}
        >
          <View style={styles.logoBg}>
            <ShoppingBag color="#ffffff" size={20} />
          </View>
          <Text style={styles.logoText}>FashionAI</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => router.push("/cart")}
          style={styles.cartButton}
        >
          <ShoppingCart color="#3B82F6" size={24} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerContent: {
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoBg: {
    width: 32,
    height: 32,
    backgroundColor: "#3B82F6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    display: "none",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  cartButton: {
    padding: 8,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#3B82F6",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
  },
});
