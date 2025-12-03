import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Giỏ Hàng Trống
          </h1>
          <p className="text-muted-foreground mb-8">
            Hãy thêm một số sản phẩm vào giỏ hàng của bạn
          </p>
          <Link to="/shop">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Tiếp Tục Mua Sắm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Giỏ Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-border rounded-lg p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-secondary rounded flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Kích cỡ: <span className="font-semibold">{item.size}</span> | Màu:{" "}
                    <span className="font-semibold">{item.color}</span>
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <p className="font-bold text-primary">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded border border-border hover:bg-secondary flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="font-semibold text-foreground w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded border border-border hover:bg-secondary flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 p-2 text-destructive hover:bg-destructive/10 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-border rounded-lg p-6 h-fit space-y-4">
            <h2 className="text-lg font-bold text-foreground">Tóm Tắt Đơn Hàng</h2>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính:</span>
                <span>{total.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Phí vận chuyển:</span>
                <span className="text-green-600 font-semibold">Miễn phí</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">Tổng Cộng:</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base">
                Tiến Hành Thanh Toán
              </Button>
            </Link>

            <Link to="/shop">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp Tục Mua Sắm
              </Button>
            </Link>

            <button
              onClick={() => clearCart()}
              className="w-full text-destructive hover:text-destructive/70 text-sm font-semibold pt-2 border-t border-border"
            >
              Xóa Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
