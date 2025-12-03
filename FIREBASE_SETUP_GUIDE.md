# Firebase Setup Guide - Chi Tiết Từng Bước

## 🔥 Bước 1: Tạo Firebase Project

### 1.1 Truy cập Firebase Console
1. Mở https://console.firebase.google.com/
2. Đăng nhập bằng Google Account (nếu chưa có tạo mới)

### 1.2 Tạo Project Mới
1. Click **"Add project"** hoặc **"+ Create a project"**
2. Nhập tên project: **"fashionai"** (hoặc tên bạn thích)
3. Click **Continue**

### 1.3 Cấu Hình Google Analytics
1. Bạn sẽ được hỏi: **"Enable Google Analytics for this project?"**
2. Chọn **"Enable Google Analytics"** (khuyến nghị)
3. Click **Continue**

### 1.4 Chọn Google Analytics Account
1. Chọn **"Create a new analytics account"**
2. Country: **Vietnam** (hoặc quốc gia của bạn)
3. Đồng ý Terms of Service
4. Click **Create project**
5. Chờ ~ 5-10 phút

---

## 🔐 Bước 2: Setup Authentication (Email + Google)

### 2.1 Mở Firebase Console
1. Đi đến Project Settings > Project Overview
2. Bên trái, chọn **"Authentication"** (nó sẽ xuất hiện dưới phần "Grow")

### 2.2 Bật Email/Password Authentication
1. Click **"Get started"** hoặc **"Sign-in method"**
2. Click **"Email/Password"**
3. Enable toggle cho **"Email/Password"**
4. KHÔNG bật "Email link sign-in"
5. Click **Save**

### 2.3 Bật Google Authentication
1. Click **"Google"** từ danh sách
2. Enable toggle
3. Điền **Project support email**: Địa chỉ email Firebase của bạn (sẽ tự điền)
4. Click **Save**

---

## 🗄️ Bước 3: Setup Firestore Database

### 3.1 Tạo Firestore Database
1. Bên trái, chọn **"Firestore Database"** (dưới "Build")
2. Click **"Create database"**

### 3.2 Cấu Hình Firestore
1. **Location**: Chọn **"Asia Southeast 1 (singapore)"** (gần Việt Nam nhất)
2. Click **Next**
3. **Security Rules**: Chọn **"Start in test mode"** (để dễ develop)
4. Click **Create**
5. Chờ ~ 2-3 phút

### 3.3 Tạo Collections
Sau khi Firestore ready, tạo các collection:

**Collection 1: users**
1. Click **"Start collection"**
2. Collection ID: `users`
3. Bỏ qua "Add its first document"
4. Click **Create**

**Collection 2: images**
1. Click **"Start collection"**
2. Collection ID: `images`
3. Click **Create**

**Collection 3: products**
1. Click **"Start collection"**
2. Collection ID: `products`
3. Click **Create**

---

## 📁 Bước 4: Setup Firebase Storage

### 4.1 Tạo Storage Bucket
1. Bên trái, chọn **"Storage"** (dưới "Build")
2. Click **"Get started"**
3. Chọn location: **"asia-southeast1"** (Singapore)
4. Click **Next**
5. Security Rules: Chọn **"Start in test mode"**
6. Click **Done**

### 4.2 Tạo Thư Mục (Folders)
1. Click **"Create folder"**
2. Tên: `product-images`
3. Lặp lại cho `user-avatars`

---

## 🔑 Bước 5: Lấy Firebase Config

### 5.1 Mở Project Settings
1. Click gear icon ⚙️ (Settings)
2. Chọn **"Project settings"**
3. Chọn tab **"General"**

### 5.2 Tìm Firebase Config
Scroll xuống, tìm **"Your apps"** section. Click icon **"</>"** (Web)

### 5.3 Copy Firebase Config
Bạn sẽ thấy một đoạn code như này:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "fashionai-xxxx.firebaseapp.com",
  projectId: "fashionai-xxxx",
  storageBucket: "fashionai-xxxx.appspot.com",
  messagingSenderId: "xxx...",
  appId: "1:xxx:web:xxx..."
};
```

**✅ Copy toàn bộ object này** (sẽ cần sau)

---

## 🔒 Bước 6: Setup Google OAuth Credentials (cho Google Sign-in)

### 6.1 Tạo OAuth Consent Screen
1. Mở https://console.cloud.google.com/
2. Chọn Project của bạn (fashionai)
3. Bên trái, chọn **"APIs & Services"** > **"OAuth consent screen"**
4. Chọn **"External"** User type
5. Click **Create**

### 6.2 Điền Thông Tin
1. **App name**: FashionAI
2. **User support email**: Email của bạn
3. **Developer contact**: Email của bạn
4. Click **Save and Continue**
5. Bỏ qua "Scopes" (default là được)
6. Click **Save and Continue**
7. Click **Save and Continue** lần nữa

### 6.3 Tạo OAuth Credentials
1. Chọn **"Credentials"** từ menu bên trái
2. Click **"+ Create Credentials"**
3. Chọn **"OAuth client ID"**
4. **Application type**: Web application
5. **Name**: FashionAI Web Client
6. **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
7. **Authorized redirect URIs**:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
8. Click **Create**
9. **Copy Client ID** (sẽ cần)

---

## 📝 Bước 7: Lưu Credentials

Tạo file `.env` trong thư mục project gốc:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=fashionai-xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fashionai-xxxx
VITE_FIREBASE_STORAGE_BUCKET=fashionai-xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx...
VITE_FIREBASE_APP_ID=1:xxx:web:xxx...

VITE_GOOGLE_CLIENT_ID=xxx-xxx.apps.googleusercontent.com
```

**⚠️ Không commit file này** - thêm vào `.gitignore`

---

## ✅ Kiểm Tra Hoàn Thành

Bạn đã hoàn thành Firebase setup khi:
- ✅ Firebase Project tạo xong
- ✅ Authentication: Email + Google enabled
- ✅ Firestore Database created (3 collections: users, images, products)
- ✅ Firebase Storage created (2 folders)
- ✅ Lấy được Firebase Config
- ✅ Lấy được Google OAuth Client ID
- ✅ Lưu vào `.env` file

---

## 🔗 Tóm Tắt Links Cần Dùng

1. **Firebase Console**: https://console.firebase.google.com/
2. **Google Cloud Console**: https://console.cloud.google.com/
3. **Firebase Docs**: https://firebase.google.com/docs
4. **Authentication Docs**: https://firebase.google.com/docs/auth

---

## 🆘 Gặp Vấn Đề?

| Vấn Đề | Giải Pháp |
|--------|---------|
| Không thấy "Authentication" | Chắc chắn bạn đã tạo xong project (chờ 5-10 phút) |
| Lỗi "Location is required" | Chọn location (Asia Southeast 1) |
| Không tìm thấy Config | Đi Project Settings > General > "Your apps" |
| Google OAuth lỗi | Bật "Google+ API" trong Google Cloud Console |

---

## 📖 Lưu Ý Quan Trọng

1. **Test Mode Security**: Test mode chỉ dùng để develop. Trước khi deploy:
   - Update security rules
   - Bật Cloud Billing

2. **Free Tier**: Firebase có tier free đủ cho develop:
   - Firestore: 50,000 reads/day
   - Storage: 1GB/month
   - Auth: Unlimited

3. **Backup**: Giữ lưu Firebase Config ở nơi an toàn (không public)

---

**Sau khi hoàn thành tất cả bước trên, hãy gửi Firebase Config cho phần tiếp theo!**
