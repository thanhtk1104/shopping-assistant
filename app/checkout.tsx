import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, CheckCircle } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  if (items.length === 0 && !orderComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Giỏ Hàng Trống</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/shop")}
            style={styles.backBtn}
          >
            <Text style={styles.backBtnText}>Quay Lại Cửa Hàng</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (orderComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.successContainer}>
          <CheckCircle color="#10B981" size={56} />
          <Text style={styles.successTitle}>Đặt Hàng Thành Công!</Text>
          <Text style={styles.successSubtitle}>
            Cảm ơn bạn đã mua sắm. Chúng tôi sẽ sớm liên hệ với bạn.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.homeBtn}
          >
            <Text style={styles.homeBtnText}>Quay Lại Trang Chủ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Số điện thoại, Địa chỉ)");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  const handleBack = () => {
    Alert.alert(
      "Xác Nhận",
      "Bạn có chắc muốn quay lại? Các thông tin sẽ không được lưu.",
      [
        { text: "Hủy", onPress: () => {} },
        {
          text: "Quay Lại",
          onPress: () => router.push("/cart"),
          style: "destructive",
        },
      ]
    );
  };

  const renderFormInput = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    required: boolean = false,
    multiline: boolean = false
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(text) => handleInputChange(field, text)}
        style={[styles.input, multiline && styles.textArea]}
        placeholderTextColor="#999999"
        editable={!isProcessing}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backLink}
              disabled={isProcessing}
            >
              <ArrowLeft color="#3B82F6" size={18} />
              <Text style={styles.backLinkText}>Quay Lại Giỏ Hàng</Text>
            </TouchableOpacity>
          </View>

          {/* Shipping Form */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Thông Tin Giao Hàng</Text>

            {renderFormInput("Họ Và Tên", "fullName", "Nhập họ và tên", true)}
            {renderFormInput("Email", "email", "your@email.com")}
            {renderFormInput("Số Điện Thoại", "phone", "Ví dụ: 0912345678", true)}
            {renderFormInput("Địa Chỉ", "address", "Ví dụ: 123 Đường ABC", true)}

            <View style={styles.rowInputs}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Thành Phố</Text>
                <TextInput
                  placeholder="Hà Nội"
                  value={formData.city}
                  onChangeText={(text) => handleInputChange("city", text)}
                  style={styles.input}
                  placeholderTextColor="#999999"
                  editable={!isProcessing}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Quận/Huyện</Text>
                <TextInput
                  placeholder="Ba Đình"
                  value={formData.district}
                  onChangeText={(text) => handleInputChange("district", text)}
                  style={styles.input}
                  placeholderTextColor="#999999"
                  editable={!isProcessing}
                />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Phường/Xã</Text>
                <TextInput
                  placeholder="Điện Biên"
                  value={formData.ward}
                  onChangeText={(text) => handleInputChange("ward", text)}
                  style={styles.input}
                  placeholderTextColor="#999999"
                  editable={!isProcessing}
                />
              </View>
            </View>

            {renderFormInput("Ghi Chú", "notes", "Ghi chú về đơn hàng (tuỳ chọn)", false, true)}
          </View>

          {/* Payment Method */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Phương Thức Thanh Toán</Text>

            <View style={styles.paymentOption}>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtnInner} />
              </View>
              <View>
                <Text style={styles.paymentLabel}>Thanh Toán Khi Nhận Hàng</Text>
                <Text style={styles.paymentDesc}>
                  Bạn sẽ thanh toán khi nhân viên giao hàng đến.
                </Text>
              </View>
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Tóm Tắt Đơn Hàng</Text>

            <ScrollView
              style={styles.itemsList}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {items.map((item) => (
                <View key={item.id} style={styles.summaryItem}>
                  <Text style={styles.itemNameSummary} numberOfLines={1}>
                    {item.name} x{item.quantity}
                  </Text>
                  <Text style={styles.itemPriceSummary}>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính:</Text>
              <Text style={styles.summaryValue}>
                {total.toLocaleString("vi-VN")}₫
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
              <Text style={[styles.summaryValue, styles.freeShipping]}>Miễn phí</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng Cộng:</Text>
              <Text style={styles.totalValue}>
                {total.toLocaleString("vi-VN")}₫
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isProcessing}
            style={[styles.submitBtn, isProcessing && styles.submitBtnDisabled]}
          >
            {isProcessing ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitBtnText}>Hoàn Tất Đơn Hàng</Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backLinkText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
    textAlign: "center",
  },
  homeBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  homeBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  radioBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  radioBtnInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3B82F6",
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
  },
  paymentDesc: {
    fontSize: 12,
    color: "#666666",
  },
  summary: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  itemsList: {
    maxHeight: 180,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemNameSummary: {
    fontSize: 12,
    color: "#666666",
    flex: 1,
    marginRight: 8,
  },
  itemPriceSummary: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 13,
    color: "#666666",
  },
  freeShipping: {
    color: "#10B981",
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTopx: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  submitBtn: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
