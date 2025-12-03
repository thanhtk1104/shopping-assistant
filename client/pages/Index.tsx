import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {
  ShoppingBag,
  Sparkles,
  Zap,
  Brain,
  Truck,
  ArrowRight,
  Star,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: "Trợ Lý AI Tư Vấn",
      description:
        "Nhận những lời khuyên cá nhân hóa về thời trang từ trợ lý AI thông minh",
    },
    {
      icon: Sparkles,
      title: "Thời Trang Đa Dạng",
      description:
        "Bộ sưu tập quần áo nam, nữ, trẻ em - từ casual đến formal",
    },
    {
      icon: Truck,
      title: "Giao Hàng Nhanh",
      description:
        "Vận chuyển miễn phí, giao hàng nhanh chóng an toàn đến tay bạn",
    },
    {
      icon: ShoppingBag,
      title: "Giá Cạnh Tranh",
      description:
        "Giá tốt nhất thị trường với nhiều ưu đãi và giảm giá hàng ngày",
    },
    {
      icon: Zap,
      title: "Mua Sắm Dễ Dàng",
      description:
        "Giao diện thân thiện, thanh toán an toàn và nhanh chóng",
    },
    {
      icon: Star,
      title: "Chất Lượng Đảm Bảo",
      description: "Tất cả sản phẩm đều được kiểm tra chất lượng kỹ càng",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Thời Trang Đẳng Cấp với
                  <span className="text-primary"> AI</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Khám phá bộ sưu tập thời trang xu hướng. Trợ lý AI của chúng tôi
                  sẽ giúp bạn tìm những bộ quần áo hoàn hảo, so sánh giá cả và
                  đưa ra quyết định mua sắm thông minh nhất.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Khám Phá Cửa Hàng <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/assistant">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Tư Vấn AI
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Khách Hàng Hài Lòng</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">200+</p>
                  <p className="text-sm text-muted-foreground">Sản Phẩm</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Đảm Bảo Chất Lượng</p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative hidden md:block">
              <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ShoppingBag className="w-24 h-24 text-primary mx-auto" />
                  <p className="text-foreground font-semibold">
                    FashionAI - Cửa Hàng Thời Trang
                  </p>
                </div>
              </div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những item thời trang được yêu thích nhất của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Áo Thun Cotton Premium Nam",
                price: "199.000₫",
                image:
                  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
              },
              {
                name: "Quần Jean Slim Fit",
                price: "399.000₫",
                image:
                  "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop",
              },
              {
                name: "Váy Đầm Midi Nữ",
                price: "549.000₫",
                image:
                  "https://images.unsplash.com/photo-1595777712802-46b80a36cdb6?w=300&h=300&fit=crop",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">
                      {product.price}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
              >
                Xem Tất Cả Sản Phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tại Sao Chọn FashionAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những tính năng mạnh mẽ để làm cho trải nghiệm mua sắm của bạn
              tốt hơn, nhanh hơn và thông minh hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sẵn Sàng Mua Sắm Thông Minh?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá bộ sưu tập thời trang của chúng tôi hoặc sử dụng trợ lý AI
              để nhận những lời khuyên cá nhân hóa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Mua Sắm Ngay
                </Button>
              </Link>
              <Link to="/assistant">
                <Button
                  size="lg"
                  variant="outline"
                >
                  Tư Vấn AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center text-muted-foreground">
            <p>© 2024 FashionAI. Cửa hàng thời trang được trợ lý AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
