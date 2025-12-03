import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:inline">
              FashionAI
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Trang Chủ
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="ghost" size="sm">
                Cửa Hàng
              </Button>
            </Link>
            <Link to="/assistant">
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Tư Vấn
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
