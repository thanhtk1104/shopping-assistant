import { Tabs } from "expo-router";
import { ShoppingBag, Store, MessageCircle } from "react-native-vector-icons/Feather";
import { useCart } from "@/contexts/CartContext";
import { View, Text } from "react-native";

export default function TabsLayout() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#E5E7EB",
          borderTopWidth: 1,
          height: 60,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang Chủ",
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Cửa Hàng",
          tabBarIcon: ({ color }) => <Store color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "Tư Vấn",
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
