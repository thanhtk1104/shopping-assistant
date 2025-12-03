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
    name: "Áo Sơ Mi Oxford Nữ",
    description:
      "Áo sơ mi Oxford sang trọng, phù hợp cho công sở và các dịp trang trọng.",
    price: 349000,
    originalPrice: 499000,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop",
    category: "nữ",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Xanh Nhạt", "Hồng Nhạt"],
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: "4",
    name: "Váy Đầm Midi Nữ",
    description:
      "Váy đầm midi thanh lịch, thoải mái và dễ phối. Lý tưởng cho các buổi hẹn hò và sự kiện.",
    price: 549000,
    originalPrice: 799000,
    image:
      "https://images.unsplash.com/photo-1595777712802-46b80a36cdb6?w=400&h=400&fit=crop",
    category: "nữ",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Đen", "Xanh", "Đỏ Đô"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: "5",
    name: "Áo Phông Trẻ Em",
    description:
      "Áo phông cotton mềm mại cho trẻ em, an toàn với da nhạy cảm, thiết kế vui nhộn.",
    price: 99000,
    originalPrice: 149000,
    image:
      "https://images.unsplash.com/photo-1503424997750-b895c5eab0b8?w=400&h=400&fit=crop",
    category: "trẻem",
    sizes: ["2-3", "3-4", "4-5", "5-6", "6-7"],
    colors: ["Xanh", "Đỏ", "Vàng", "Hồng"],
    rating: 4.9,
    reviews: 428,
    inStock: true,
  },
  {
    id: "6",
    name: "Quần Shorts Trẻ Em",
    description:
      "Quần shorts thoải mái cho trẻ em, dễ chuyển động, phù hợp mặc trong nhà và ngoài trời.",
    price: 129000,
    originalPrice: 199000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    category: "trẻem",
    sizes: ["2-3", "3-4", "4-5", "5-6", "6-7"],
    colors: ["Xanh", "Đen", "Xám"],
    rating: 4.8,
    reviews: 267,
    inStock: true,
  },
  {
    id: "7",
    name: "Áo Hoodie Casual Nam",
    description:
      "Áo hoodie ấm áp và thoải mái, phù hợp cho ngày lạnh và mặc thường ngày.",
    price: 459000,
    originalPrice: 699000,
    image:
      "https://images.unsplash.com/photo-1556821552-1dadfbcda98f?w=400&h=400&fit=crop",
    category: "casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Xám", "Đen", "Xanh Navy"],
    rating: 4.7,
    reviews: 345,
    inStock: true,
  },
  {
    id: "8",
    name: "Quần Joggers Nam",
    description:
      "Quần joggers thoải mái, phối cách điệu hay mặc nhà, được yêu thích cho hoạt động thể thao nhẹ.",
    price: 299000,
    originalPrice: 449000,
    image:
      "https://images.unsplash.com/photo-1506629082632-a94e15f8e55f?w=400&h=400&fit=crop",
    category: "casual",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Xám", "Xanh Navy"],
    rating: 4.6,
    reviews: 198,
    inStock: true,
  },
  {
    id: "9",
    name: "Áo Khoác Blazer Nữ",
    description:
      "Áo khoác blazer chuyên nghiệp, phù hợp cho công sở và các sự ki��n chính thức.",
    price: 799000,
    image:
      "https://images.unsplash.com/photo-1539533057440-7814bae8f881?w=400&h=400&fit=crop",
    category: "formal",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Xanh Navy"],
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
  {
    id: "10",
    name: "Quần Tây Nam Formal",
    description:
      "Quần tây cao cấp, lịch sự, phù hợp cho các sự kiện chính thức và công sở.",
    price: 599000,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
    category: "formal",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Đen", "Xám", "Nâu"],
    rating: 4.8,
    reviews: 167,
    inStock: true,
  },
  {
    id: "11",
    name: "Áo Tập Gym Nữ",
    description:
      "Áo tập gym co giãn 4 chiều, thoáng mát, dân rút mồ hôi. Phù hợp cho các hoạt động thể dục.",
    price: 249000,
    originalPrice: 399000,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    category: "sports",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Đen", "Hồng", "Tím"],
    rating: 4.7,
    reviews: 289,
    inStock: true,
  },
  {
    id: "12",
    name: "Quần Legging Thể Thao Nữ",
    description:
      "Quần legging co giãn tốt, thoáng mát, bền bỉ. Hoàn hảo cho tập gym và yoga.",
    price: 299000,
    originalPrice: 449000,
    image:
      "https://images.unsplash.com/photo-1506629082632-a94e15f8e55f?w=400&h=400&fit=crop",
    category: "sports",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Đen", "Xám", "Hồng"],
    rating: 4.8,
    reviews: 421,
    inStock: true,
  },
];
