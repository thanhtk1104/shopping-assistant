# FashionAI - Quick Reference Guide

## ⚡ Common Commands

### Installation & Setup
```bash
# Install all dependencies
pnpm install

# Install specific package
pnpm add package-name

# Install dev dependency
pnpm add -D package-name
```

### Running the App

| Command | Purpose | Platform |
|---------|---------|----------|
| `pnpm start` | Start Expo dev server | Web + Mobile (QR scan) |
| `pnpm web` | Run in web browser | Web only |
| `pnpm ios` | Run iOS simulator | iOS only |
| `pnpm android` | Run Android emulator | Android only |

### Building

```bash
# Build for web
pnpm build:web

# Build for iOS
pnpm build:ios

# Build for Android
pnpm build:android

# Typecheck TypeScript
pnpm typecheck

# Run tests
pnpm test
```

## 📱 Platform Testing

### Web Browser
```bash
pnpm web
# Opens: http://localhost:19006
```

### iOS Simulator (macOS)
```bash
pnpm ios
# Requires: Xcode + iOS SDK
```

### Android Emulator
```bash
pnpm android
# Requires: Android Studio + SDK
```

### Mobile Device (Expo Go)
```bash
pnpm start
# Scan QR code with Expo Go app
```

## 🔧 Development Tips

### Reset Expo Cache
```bash
pnpm start --reset-cache
```

### Clear Dependencies & Reinstall
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Check TypeScript Errors
```bash
pnpm typecheck
```

### View Logs
```bash
# In terminal where pnpm start is running
# Logs appear as you interact with the app
```

## 📁 File Organization

### Create New Screen
1. Create file in `app/` folder
2. Use file name as route (e.g., `about.tsx` → `/about`)
3. For dynamic routes: `[param].tsx` → `/param/value`

### Create New Component
1. Create file in `components/` folder
2. Import where needed
3. Keep related styles with component

### Add to Cart Context
1. Modify `contexts/CartContext.tsx`
2. Update CartContextType interface
3. Implement functions in provider

## 🎨 Styling Tips

### Using StyleSheet
```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

// Use: <View style={styles.container}>
```

### Common Properties
| Property | Values | Example |
|----------|--------|---------|
| `flex` | number | `flex: 1` |
| `flexDirection` | 'row' \| 'column' | `flexDirection: 'row'` |
| `alignItems` | 'center', 'flex-start', etc | `alignItems: 'center'` |
| `justifyContent` | 'center', 'space-between', etc | `justifyContent: 'space-between'` |
| `padding` | number | `padding: 16` |
| `backgroundColor` | color | `backgroundColor: '#ffffff'` |
| `borderRadius` | number | `borderRadius: 8` |

## 🔌 Navigation

### Navigate to Route
```typescript
import { router } from 'expo-router';

// Push new route
router.push('/shop');
router.push('/(tabs)/shop');

// Replace current route
router.replace('/');

// Go back
router.back();
```

### Get Route Parameters
```typescript
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

## 💾 Storage Operations

### Save Data
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('key', JSON.stringify(data));
```

### Load Data
```typescript
const data = await AsyncStorage.getItem('key');
if (data) {
  const parsed = JSON.parse(data);
}
```

### Remove Data
```typescript
await AsyncStorage.removeItem('key');
```

### Clear All
```typescript
await AsyncStorage.clear();
```

## 🎯 Debugging

### Console Logs
```typescript
console.log('Debug message', variable);
console.error('Error message');
console.warn('Warning message');
```

### In Expo
- Check terminal for logs
- Use React DevTools: `ctrl+shift+j` (web)
- Check phone logs in Expo app

### TypeScript Errors
```bash
pnpm typecheck
# Shows all type errors
```

## 📦 Dependencies

### View Installed
```bash
pnpm list
```

### Update Packages
```bash
pnpm update
pnpm update package-name
```

### Remove Package
```bash
pnpm remove package-name
```

## 🚀 Deployment

### Web Deployment
```bash
# Build production bundle
pnpm build:web

# Deploy to Netlify, Vercel, etc
# (Requires their CLI tools)
```

### Mobile Deployment
```bash
# Requires Expo EAS setup
# https://docs.expo.dev/eas/

pnpm build:ios   # App Store
pnpm build:android # Google Play
```

## 📝 File Templates

### New Screen Component
```typescript
import React from 'react';
import { ScrollView, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '@/components/Header';

export default function MyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View>
          <Text>Screen content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
```

### New Component
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export function MyComponent({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
});
```

## ❓ Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| App won't start | `pnpm start --reset-cache` |
| Styles not applying | Check StyleSheet syntax |
| Images not loading | Verify image URL format |
| Can't find module | `pnpm install` |
| TypeScript errors | `pnpm typecheck` |
| Storage not persisting | Ensure AsyncStorage is awaited |

## 🔗 Documentation Links

- **[README_NATIVE.md](./README_NATIVE.md)** - Full documentation
- **[REACT_NATIVE_SETUP.md](./REACT_NATIVE_SETUP.md)** - Setup guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Web to Native details
- **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)** - What was converted

## 🎓 Learn More

- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- Expo Router: https://docs.expo.dev/routing/
- TypeScript: https://www.typescriptlang.org/

## 📞 Help

1. Check documentation files
2. Review relevant component source code
3. Check Expo/React Native official docs
4. Review error message in console
5. Search in GitHub issues

## ✅ Development Checklist

- [ ] Run `pnpm install`
- [ ] Test `pnpm web`
- [ ] Test `pnpm start`
- [ ] Make a small change to verify hot reload
- [ ] Review project structure
- [ ] Read CONVERSION_SUMMARY.md
- [ ] Review a screen file to understand patterns
- [ ] Ready to customize!

---

**Save this file for quick reference while developing!**
