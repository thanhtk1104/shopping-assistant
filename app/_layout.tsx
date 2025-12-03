import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "@/contexts/CartContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const showTabs = pathname === "/" || pathname === "/shop" || pathname === "/assistant";

  return (
    <SafeAreaProvider>
      <CartProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff" },
          }}
        >
          {showTabs && (
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name="product/[id]"
            options={{
              title: "Product Detail",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="checkout"
            options={{
              title: "Checkout",
              headerShown: false,
            }}
          />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  );
}
