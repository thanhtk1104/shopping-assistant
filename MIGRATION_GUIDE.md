# Migration Guide: Web to React Native

This document explains how the FashionAI e-commerce application was converted from a web-based React application to a cross-platform React Native app.

## Overview

**Original Stack**: React 18 + React Router 6 + Tailwind CSS + Vite
**New Stack**: React Native + Expo + TypeScript

The conversion maintains all functionality while adding support for iOS, Android, and improved web experience through Expo.

## Architecture Changes

### 1. Routing System

**Before (Web - React Router):**
```typescript
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
</BrowserRouter>
```

**After (React Native - Expo Router):**
```
app/
├── (tabs)/
│   ├── _layout.tsx       # Tab navigator
│   ├── index.tsx         # Home (/)
│   ├── shop.tsx          # Shop (/shop)
│   └── assistant.tsx     # Assistant
├── product/[id].tsx      # Product detail (/product/:id)
├── cart.tsx              # Cart (/cart)
├── checkout.tsx          # Checkout (/checkout)
└── _layout.tsx           # Root layout
```

**Benefits:**
- File-based routing (no configuration needed)
- Type-safe parameters with `useLocalSearchParams`
- Automatic code splitting
- Better performance on mobile

### 2. Styling System

**Before (Web - Tailwind CSS):**
```tsx
<div className="flex items-center justify-between px-4 py-2 bg-blue-500 rounded-lg">
  <span className="text-white font-bold">Button</span>
</div>
```

**After (React Native - StyleSheet):**
```tsx
<View style={styles.button}>
  <Text style={styles.buttonText}>Button</Text>
</View>

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
```

**Key Differences:**
- No CSS classes - inline StyleSheet objects
- Uses `View`, `Text`, `Image` instead of HTML elements
- Flexbox layout (same as web, but more explicit)
- No global CSS, all scoped

### 3. Storage System

**Before (Web - localStorage):**
```typescript
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(items));
}, [items]);

// On mount:
const saved = localStorage.getItem("cart");
const items = saved ? JSON.parse(saved) : [];
```

**After (React Native - AsyncStorage):**
```typescript
const loadCart = async () => {
  const saved = await AsyncStorage.getItem("cart");
  if (saved) {
    setItems(JSON.parse(saved));
  }
};

useEffect(() => {
  loadCart();
}, []);

// Save on change:
useEffect(() => {
  AsyncStorage.setItem("cart", JSON.stringify(items));
}, [items]);
```

**Benefits:**
- Works on all platforms (web, iOS, Android)
- Async operations (better for performance)
- Better error handling

### 4. UI Components

**Before (Web - HTML/Radix UI):**
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";

<Button onClick={handleClick} className="bg-primary">
  <ShoppingCart className="w-4 h-4" />
  Add to Cart
</Button>
```

**After (React Native):**
```tsx
import { TouchableOpacity, View, Text } from "react-native";
import { ShoppingCart } from "react-native-vector-icons/Feather";

<TouchableOpacity onPress={handleClick} style={styles.button}>
  <ShoppingCart color="#ffffff" size={18} />
  <Text style={styles.buttonText}>Add to Cart</Text>
</TouchableOpacity>
```

**Component Mapping:**

| Web | React Native | Notes |
|-----|-----|-----|
| `<div>` | `<View>` | Container element |
| `<span>`, `<p>` | `<Text>` | Text content |
| `<input>` | `<TextInput>` | User input |
| `<button>`, `<a>` | `<TouchableOpacity>` | Pressable element |
| `<img>` | `<Image>` | Images |
| `<scroll>` | `<ScrollView>` | Scrollable container |
| `lucide-react` | `react-native-vector-icons` | Icon library |

### 5. Navigation

**Before (Web):**
```typescript
import { Link, useNavigate } from "react-router-dom";

<Link to="/shop">Shop</Link>

const navigate = useNavigate();
navigate("/cart");
```

**After (React Native):**
```typescript
import { router } from "expo-router";

router.push("/shop");
router.push("/(tabs)/shop");  // Tab-based route
router.replace("/");          // Replace current route
router.back();               // Go back
```

## File Structure Comparison

### Web Version (Old)
```
client/
├── pages/
│   ├── Index.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Assistant.tsx
│   └── NotFound.tsx
├── components/
│   ├── Header.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── ...
├── contexts/
│   └── CartContext.tsx
├── data/
│   └── products.ts
├── App.tsx
└── main.tsx
```

### React Native Version (New)
```
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── shop.tsx
│   └── assistant.tsx
├── product/
│   └── [id].tsx
├── cart.tsx
├── checkout.tsx
└── _layout.tsx

components/
├── Header.tsx

contexts/
├── CartContext.tsx

data/
├── products.ts

app.json
index.tsx
```

## Data & API Integration

**No Changes to Data Structure:**
```typescript
// products.ts - Same interface for both web and native
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // ... same fields
}
```

**Cart Context:**
- Interface remains the same
- Only storage method changed (AsyncStorage instead of localStorage)
- All methods work identically

**API Calls:**
```typescript
// Both web and native use same fetch syntax
const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message }),
});
```

## Performance Improvements

1. **Mobile-First Rendering**: Optimized for touch interfaces
2. **Efficient Re-renders**: React Native's reconciliation is faster on mobile
3. **Native Modules**: Access to native APIs for better performance
4. **Code Splitting**: Automatic with Expo Router
5. **Bundle Size**: Smaller footprint on mobile devices

## Feature Parity

| Feature | Web | React Native | Status |
|---------|-----|-----|--------|
| Product Browse | ✅ | ✅ | Full |
| Shopping Cart | ✅ | ✅ | Full |
| Checkout Form | ✅ | ✅ | Full |
| AI Chat | ✅ | ✅ | Full (needs API) |
| Product Filters | ✅ | ✅ | Full |
| Persistent Cart | ✅ | ✅ | AsyncStorage |
| Responsive Design | ✅ | ✅ | Native |

## Breaking Changes

### For Developers

1. **No Tailwind CSS**: Use StyleSheet instead
2. **No HTML**: Use React Native components
3. **Async Storage**: localStorage → AsyncStorage (async operations)
4. **Navigation**: useNavigate → router
5. **Icon Library**: lucide-react → react-native-vector-icons

### For End Users

- Better mobile experience (native feel)
- Faster performance on mobile devices
- Works offline with cached data
- Better accessibility on mobile

## Migration Checklist for Custom Changes

If you made changes to the original web app:

- [ ] Convert any custom components to React Native
- [ ] Update all import statements (lucide-react → react-native-vector-icons)
- [ ] Replace localStorage with AsyncStorage
- [ ] Update routing (Link → router.push, useNavigate → router)
- [ ] Convert Tailwind classes to StyleSheet
- [ ] Test on mobile devices
- [ ] Update API endpoints if needed

## Reverting to Web Version

If you need to revert to the original web version:
1. Keep the `client/` folder intact (not modified)
2. Remove `app/` folder
3. Restore `package.json` to original React/Vite version
4. Delete `app.json`, `babel.config.js`
5. Run `npm install` to restore web dependencies

## Common Issues & Solutions

### Issue: Styles not applying
**Solution**: Check StyleSheet syntax, ensure proper property names (e.g., `paddingHorizontal` not `px`)

### Issue: Storage not persisting
**Solution**: Ensure AsyncStorage is async - await the operations

### Issue: Navigation not working
**Solution**: Use `router` from `expo-router`, not web router

### Issue: Images not loading
**Solution**: Ensure proper Image source format - `{ uri: string }` for URLs

## Testing

### Web Testing
```bash
pnpm web
```
Opens in browser at localhost:19006

### Mobile Testing
```bash
pnpm start
```
Scan QR with Expo Go app

### Native Build Testing
```bash
pnpm build:ios
pnpm build:android
```

## Conclusion

The migration maintains all functionality while providing a modern, cross-platform solution. The new React Native version works seamlessly on web, iOS, and Android with no code duplication.

For questions or issues, refer to:
- REACT_NATIVE_SETUP.md - Setup and running guide
- Expo Documentation - https://docs.expo.dev
- React Native Docs - https://reactnative.dev
