import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Send, Plus } from "react-native-vector-icons/Feather";
import { Header } from "@/components/Header";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Xin chào! Tôi là trợ lý tư vấn thời trang của FashionAI. Tôi có thể giúp bạn với:\n\n👕 Chọn quần áo: Gợi ý size, màu sắc, style phù hợp\n👔 Mix & Match: Cách kết hợp trang phục đẹp\n🧼 Chăm sóc: Cách giặt và bảo vệ quần áo\n💰 Giá cả & Khuyến mãi: Thông tin về giá và ưu đãi\n📏 Kích cỡ: Hướng dẫn chọn size chuẩn\n\nBạn muốn hỏi gì?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gọi API chatbot");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Xin lỗi, tôi gặp lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "👋 Xin chào! Tôi là trợ lý tư vấn thời trang của FashionAI. Tôi có thể giúp bạn với:\n\n👕 Chọn quần áo: Gợi ý size, màu sắc, style phù hợp\n👔 Mix & Match: Cách kết hợp trang phục đẹp\n🧼 Chăm sóc: Cách giặt và bảo vệ quần áo\n💰 Giá cả & Khuyến mãi: Thông tin về giá và ưu đãi\n📏 Kích cỡ: Hướng dẫn chọn size chuẩn\n\nBạn muốn hỏi gì?",
      },
    ]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageWrapper, item.role === "user" && styles.userMessageWrapper]}>
      <View
        style={[
          styles.messageBubble,
          item.role === "user" ? styles.userMessage : styles.assistantMessage,
        ]}
      >
        <Text style={[styles.messageText, item.role === "user" && styles.userMessageText]}>
          {item.content}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContent}
          scrollEnabled={true}
          onContentSizeChange={scrollToBottom}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.assistantMessage}>
              <ActivityIndicator color="#999999" size="small" />
            </View>
          </View>
        )}

        <View style={styles.inputSection}>
          <TouchableOpacity
            onPress={handleClearChat}
            style={styles.refreshButton}
          >
            <Plus color="#999999" size={18} />
            <Text style={styles.refreshText}>Làm Mới</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Bạn đang tìm gì? Hỏi tôi bất cứ điều gì..."
              placeholderTextColor="#999999"
              style={styles.input}
              multiline
              maxLength={500}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={isLoading || !input.trim()}
              style={[styles.sendButton, (isLoading || !input.trim()) && styles.sendButtonDisabled]}
            >
              <Send color={isLoading || !input.trim() ? "#CCCCCC" : "#ffffff"} size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Hỏi tôi về áo thun, quần jean, váy đầm, hoặc bất kỳ sản phẩm thời trang nào!
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  messageWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 6,
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  assistantMessage: {
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 0,
  },
  userMessage: {
    backgroundColor: "#3B82F6",
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  userMessageText: {
    color: "#ffffff",
  },
  loadingContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#ffffff",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  refreshText: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000000",
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  hint: {
    fontSize: 11,
    color: "#999999",
    textAlign: "center",
    marginTop: 8,
  },
});
