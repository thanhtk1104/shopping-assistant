# FashionAI - React Native Setup Guide

This application has been converted from a web-based React application to a cross-platform React Native app using **Expo**, allowing you to run the app on web, iOS (iPhone), and Android devices.

## What's New

- **Cross-Platform**: Run on web browsers, iOS, and Android
- **Expo Router**: Modern file-based routing system
- **AsyncStorage**: Persistent storage for cart data across sessions
- **Native UI Components**: Optimized for mobile and web performance
- **TypeScript Support**: Full type safety across the project

## Project Structure

```
app/                          # Routes (Expo Router)
├── (tabs)/                   # Tab-based navigation
│   ├── _layout.tsx          # Tab navigator
│   ├── index.tsx            # Home screen
│   ├── shop.tsx             # Shop/Browse screen
│   └── assistant.tsx        # AI Chat screen
├── product/[id].tsx         # Product detail screen (dynamic route)
├── cart.tsx                 # Shopping cart screen
├── checkout.tsx             # Checkout screen
└── _layout.tsx              # Root layout

components/
├── Header.tsx               # Navigation header component

contexts/
├── CartContext.tsx          # Cart state management with AsyncStorage

data/
├── products.ts              # Product data

app.json                      # Expo configuration
babel.config.js              # Babel configuration
tsconfig.json                # TypeScript configuration
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/pnpm
- Expo CLI: `npm install -g expo-cli`
- For iOS: Xcode (macOS only)
- For Android: Android Studio and Android SDK

### Step 1: Install Dependencies

```bash
pnpm install
# or
npm install
```

### Step 2: Install Expo CLI (if not already installed)

```bash
npm install -g expo-cli
```

## Running the App

### Run on Web
```bash
pnpm web
# or
npm run web
```
This starts the app in your web browser at `http://localhost:19006`

### Run on iOS (macOS only)
```bash
pnpm ios
# or
npm run ios
```
You need Xcode installed. This will open the iOS Simulator.

### Run on Android
```bash
pnpm android
# or
npm run android
```
You need Android Studio/Android SDK installed with a running emulator or connected device.

### Run with Expo Go App
For quick testing without building:
```bash
pnpm start
```
Then:
- Scan the QR code with Expo Go app on your phone
- Available on iOS App Store and Google Play Store

## Development

### Hot Reload
Changes to your code are automatically reflected in the running app. Just save your file!

### TypeScript
The project is fully typed with TypeScript. Run type checking:
```bash
pnpm typecheck
```

### File-Based Routing
Routes are automatically generated from the `app/` directory structure:
- `app/(tabs)/index.tsx` → Home page `/`
- `app/(tabs)/shop.tsx` → Shop page `/shop`
- `app/product/[id].tsx` → Dynamic product page `/product/:id`
- `app/cart.tsx` → Cart page `/cart`

## Key Features Implemented

### 1. Tab Navigation (Home, Shop, AI Assistant)
- Bottom tab navigator with custom styling
- Smooth transitions between screens

### 2. Product Browsing
- Product grid with images and prices
- Category filtering
- Quick "Add to Cart" functionality

### 3. Shopping Cart
- Persistent storage using AsyncStorage
- Add/remove/update quantity
- Order summary

### 4. Product Details
- Full product information
- Size and color selection
- Quantity adjustment
- Add to cart with selection

### 5. Checkout
- Customer information form
- Order summary
- Simulated order processing
- Success confirmation

### 6. AI Chat Assistant
- Real-time chat interface
- Conversation history
- Clear/refresh chat
- API integration ready

## Storage

### AsyncStorage
The cart data is persisted using `@react-native-async-storage/async-storage`:
- Automatically saves when items change
- Loads when app starts
- Works on all platforms (web, iOS, Android)

## Building for Production

### iOS
```bash
pnpm build:ios
# or
eas build --platform ios
```

### Android
```bash
pnpm build:android
# or
eas build --platform android
```

Requires setting up Expo Application Services (EAS):
1. Create account at https://expo.dev
2. Link your project: `eas init`
3. Run build command

## Customization

### Colors & Styling
Colors are currently inline in StyleSheet objects. To customize:
1. Edit the color values (e.g., `#3B82F6` for primary blue)
2. Update in multiple component files

### API Integration
The chat API endpoints are in:
- `Assistant.tsx`: `/api/chat` endpoint
- Checkout form submission logic

### Navigation
- Tab navigation configured in `app/(tabs)/_layout.tsx`
- Root navigation configured in `app/_layout.tsx`

## Troubleshooting

### "Metro bundler error"
Clear cache and restart:
```bash
pnpm start --reset-cache
```

### "Cannot find module '@react-native-async-storage/async-storage'"
Reinstall dependencies:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### iOS Simulator issues
```bash
xcrun simctl erase all
```

### Android Emulator issues
- Check if emulator is running: `adb devices`
- Reset emulator from Android Studio

## API Configuration

To integrate with your backend API:
1. Update API endpoints in screens (e.g., `Assistant.tsx`, form submissions)
2. For production, use environment variables in `app.json`

## Environment Variables

Create a `.env` file in the root directory:
```
REACT_NATIVE_API_URL=https://your-api.com
REACT_NATIVE_API_KEY=your_api_key
```

Access in code:
```typescript
import { Constants } from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Next Steps

1. **Test on real devices**: Download Expo Go app and scan QR code
2. **Customize theming**: Update colors in StyleSheet objects
3. **Add more features**: Follow the existing patterns
4. **Deploy**: Build with EAS or native tools
5. **Monitor**: Use Sentry or other error tracking

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)

## Support

For issues:
1. Check official Expo/React Native documentation
2. Review error logs in terminal
3. Clear cache with `pnpm start --reset-cache`
4. Check Expo forums: https://forums.expo.dev

## Converting from Web to Native

Key changes made from the original web app:
- ✅ React Router → Expo Router (file-based routing)
- ✅ HTML/CSS → React Native components (View, Text, etc.)
- ✅ localStorage → AsyncStorage
- ✅ Tailwind CSS → StyleSheet objects
- ✅ Web icons → react-native-vector-icons
- ✅ Browser APIs → Expo APIs

The functionality, state management, and data flow remain the same!
