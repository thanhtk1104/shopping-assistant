export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "nam" | "nữ" | "trẻem" | "casual" | "formal" | "sports";
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Áo Thun Cotton Premium Nam",
    description:
      "Áo thun cotton 100% cao cấp, thoáng mát, phù hợp cho mọi mùa. Thiết kế đơn giản nhưng sang trọng.",
    price: 199000,
    originalPrice: 299000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "nam",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Đen", "Trắng", "Xanh", "Xám"],
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: "2",
    name: "Quần Jean Slim Fit Nam",
    description:
      "Quần jean bền, co giãn tốt, tôn dáng. Phù hợp cho mọi hoạt động hàng ngày.",
    price: 399000,
    originalPrice: 599000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    category: "nam",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Xanh Đậm", "Xanh Nhạt", "Đen"],
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
  {
    id: "3",
    name: "Váy Đầm Midi Nữ",
    description:
      "Váy đầm midi thanh lịch, vải mềm mịn, phù hợp cho các buổi dự tiệc hay đi chơi.",
    price: 549000,
    originalPrice: 799000,
    image:
      "https://images.unsplash.com/photo-1595777712802-46b80a36cdb6?w=400&h=400&fit=crop",
    category: "nữ",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Hồng", "Xanh"],
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: "4",
    name: "Áo Sơ Mi Formal Nam",
    description:
      "Áo sơ mi lịch sự, phù hợp cho môi trường công sở. Chất liệu cao cấp, bền bỉ.",
    price: 349000,
    originalPrice: 499000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "formal",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Trắng", "Xanh", "Hồng"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: "5",
    name: "Quần Short Thể Thao Nam",
    description:
      "Quần short thể thao thoáng khí, co giãn, phù hợp cho tập gym hoặc chạy bộ.",
    price: 149000,
    originalPrice: 249000,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    category: "sports",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Xám", "Xanh"],
    rating: 4.5,
    reviews: 124,
    inStock: true,
  },
  {
    id: "6",
    name: "Áo Khoác Denim Nữ",
    description:
      "Áo khoác denim cổ điển, phù hợp mix với nhiều trang phục khác nhau.",
    price: 399000,
    originalPrice: 599000,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop",
    category: "nữ",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Xanh Đậm", "Xanh Nhạt", "Đen"],
    rating: 4.8,
    reviews: 267,
    inStock: true,
  },
  {
    id: "7",
    name: "Áo Thun Trẻ Em",
    description:
      "Áo thun dành cho trẻ em, chất cotton an toàn, thoáng mát, các mẫu đẹp.",
    price: 99000,
    originalPrice: 149000,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop",
    category: "trẻem",
    sizes: ["2-3", "4-5", "6-7", "8-9", "10-11"],
    colors: ["Đỏ", "Xanh", "Vàng", "Hồng"],
    rating: 4.6,
    reviews: 98,
    inStock: true,
  },
  {
    id: "8",
    name: "Quần Dài Casual Nữ",
    description:
      "Quần dài casual thoáng mát, co giãn, phù hợp cho hoạt động hàng ngày.",
    price: 299000,
    originalPrice: 449000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    category: "casual",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Đen", "Xám"],
    rating: 4.7,
    reviews: 203,
    inStock: true,
  },
];
