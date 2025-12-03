# FashionAI - React Native Cross-Platform App

A modern e-commerce application for fashion shopping with AI-powered recommendations, built with React Native and Expo. Works seamlessly on **Web, iOS, and Android**.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run on web
pnpm web

# Run on iOS simulator (macOS only)
pnpm ios

# Run on Android emulator
pnpm android

# Run with Expo Go (mobile scanning)
pnpm start
```

Open http://localhost:19006 for web version.

## ✨ Features

- 📱 **Cross-Platform**: Web, iOS, Android - one codebase
- 🛍️ **Product Browsing**: Browse, filter, and search products
- 💳 **Shopping Cart**: Add/remove items with persistent storage
- 🤖 **AI Assistant**: Chat-based product recommendations
- 📦 **Checkout**: Complete order form with validation
- 💾 **Local Storage**: AsyncStorage for offline cart persistence
- 📱 **Responsive**: Native feel on mobile, web-optimized
- ⚡ **Performance**: Optimized bundle size and fast loading

## 📁 Project Structure

```
app/                      # Expo Router (file-based routing)
├── (tabs)/               # Tab navigation
│   ├── index.tsx        # Home page
│   ├── shop.tsx         # Product browse
│   └── assistant.tsx    # AI chat
├── product/[id].tsx     # Product details
├── cart.tsx             # Shopping cart
├── checkout.tsx         # Checkout form
└── _layout.tsx          # Root layout

components/               # Reusable UI components
├── Header.tsx           # Navigation header

contexts/                # State management
├── CartContext.tsx      # Cart state with AsyncStorage

data/                    # Static data
├── products.ts          # Product catalog

app.json                 # Expo configuration
index.tsx               # App entry point
```

## 🛠️ Tech Stack

- **Framework**: React 18 + React Native
- **Build Tool**: Expo
- **Routing**: Expo Router (file-based)
- **State**: React Context + AsyncStorage
- **Language**: TypeScript
- **Icons**: react-native-vector-icons
- **Styling**: React Native StyleSheet

## 🎯 Core Functionality

### Home Screen
- Hero section with featured products
- Feature highlights
- Quick navigation to shop and AI assistant

### Shop Screen
- Product grid with images and prices
- Category filtering (Men, Women, Kids, Casual, Formal, Sports)
- Quick "Add to Cart" from listings
- Product rating display

### Product Details
- Full product information
- Size and color selection
- Quantity adjustment
- Detailed pricing with discounts
- Stock status indicator

### Shopping Cart
- View all items with thumbnails
- Adjust quantities
- Remove individual items
- Order summary with totals
- Proceed to checkout

### Checkout
- Customer information form (name, phone, address)
- Delivery address fields
- Payment method selection (Cash on delivery)
- Order summary and review
- Order confirmation

### AI Assistant
- Real-time chat interface
- Fashion recommendations
- Product guidance
- Conversation history
- Clear chat functionality

## 📱 Platform-Specific Details

### Web
- Full responsive layout
- Touch and mouse support
- Browser storage with AsyncStorage

### iOS
- Native iOS experience
- Safe area handling
- Status bar integration
- App permissions via Expo

### Android
- Native Android Material Design
- Proper system navigation handling
- Status bar and navigation bar integration
- Android-specific permissions

## 🔄 Navigation Flow

```
Home ──→ Shop (with filters)
 ├──→ Product Detail ──→ Add to Cart
 ├──→ AI Assistant
 └──→ Cart ──→ Checkout ──→ Confirmation
```

## 💾 Data Persistence

- **Cart Data**: AsyncStorage (survives app restarts)
- **Product Catalog**: Static/hardcoded (can be replaced with API)
- **Checkout Data**: Form state (cleared after order)

## 🔌 API Integration Points

The app is ready for API integration:

### Chat API
```typescript
// In assistant.tsx
POST /api/chat
Request: { message: string, conversationHistory: Message[] }
Response: { reply: string }
```

### Product API (Optional)
Currently using hardcoded products in `data/products.ts`. To integrate with API:

```typescript
// Modify data/products.ts or create an API module
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  return response.json();
};
```

### Checkout API (Optional)
```typescript
// In checkout.tsx
POST /api/orders
Request: { customer: FormData, items: CartItem[] }
Response: { orderId: string, status: string }
```

## 🎨 Customization

### Colors
Primary color is `#3B82F6` (blue). Update in component StyleSheet objects:
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6', // Change this
  },
});
```

### Products
Edit `data/products.ts` to add/modify products:
```typescript
export const products: Product[] = [
  {
    id: "1",
    name: "Your Product",
    price: 299000,
    // ... other fields
  },
];
```

### Fonts & Typography
React Native uses system fonts by default. Update in StyleSheet:
```typescript
fontSize: 16,
fontWeight: '600', // 'normal', '400', '600', 'bold'
```

## 🏗️ Building for Production

### Web
```bash
pnpm build:web
# Output in .next or dist folder
```

### iOS
Requires Expo EAS:
```bash
pnpm build:ios
# Or with Xcode for manual build
```

### Android
```bash
pnpm build:android
# Creates APK or AAB for Play Store
```

For detailed build instructions, see [REACT_NATIVE_SETUP.md](./REACT_NATIVE_SETUP.md)

## 🧪 Testing

### Manual Testing
1. **Web**: `pnpm web` then test in browser
2. **Mobile**: `pnpm start` then scan QR with Expo Go
3. **Native**: Build and install on physical device

### Test Scenarios
- [ ] Browse products and filter by category
- [ ] Add items to cart from shop and product detail
- [ ] Adjust quantities and remove items
- [ ] Complete checkout form
- [ ] Chat with AI assistant
- [ ] Verify cart persists after app restart

## 📚 Documentation

- **[REACT_NATIVE_SETUP.md](./REACT_NATIVE_SETUP.md)** - Detailed setup and running guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Web to React Native conversion details
- **[Expo Docs](https://docs.expo.dev)** - Official Expo documentation
- **[React Native Docs](https://reactnative.dev)** - React Native guide

## ⚙️ Environment Variables

Create `.env` file (based on `.env.example`):
```
REACT_NATIVE_API_URL=http://localhost:3000/api
```

Access in code:
```typescript
import { Constants } from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## 🐛 Troubleshooting

### Metro bundler crashes
```bash
pnpm start --reset-cache
```

### Dependencies not installing
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### App not opening on simulator
- Ensure simulator/emulator is running
- Check if port 19006 is available
- Try: `pnpm start --reset-cache`

### Images not loading
- Check image URL is valid and accessible
- Verify Image component has proper `{ uri: string }` format

## 📖 Learning Resources

- [File-based Routing](https://docs.expo.dev/routing/introduction/)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [AsyncStorage Usage](https://react-native-async-storage.github.io/)
- [Styling in React Native](https://reactnative.dev/docs/style)

## 🤝 Contributing

To extend this app:

1. **New Screen**: Create file in `app/` directory
2. **New Component**: Add to `components/` folder
3. **New Context**: Add to `contexts/` folder
4. **Update Styles**: Modify StyleSheet in component files

## 📝 License

This project is available for commercial and personal use.

## 🔗 Links

- **Expo**: https://expo.dev
- **React Native**: https://reactnative.dev
- **Expo Router**: https://docs.expo.dev/routing/introduction/

## ✅ Feature Checklist

- [x] Home screen with hero and features
- [x] Product browsing with grid layout
- [x] Category filtering
- [x] Product detail view with selection options
- [x] Shopping cart with persistence
- [x] Checkout form
- [x] AI assistant chat
- [x] Responsive design
- [x] Cross-platform compatibility
- [x] TypeScript support

## 🚀 Next Steps

1. **Test locally**: Run on web, iOS, and Android
2. **Customize colors**: Update primary color throughout
3. **Add API**: Connect to real product API
4. **Build**: Create production builds for app stores
5. **Deploy**: Launch on web, App Store, Google Play

---

**Created**: 2024  
**Platform**: Web, iOS, Android  
**Status**: Ready for Development & Production
