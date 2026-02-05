import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import cplusLogo from "@/assets/logo-without-text.png";
import { scrollToElement } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Navigation = () => {
  const { getTotalItems, toggleCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToElement("about"), 100);
    } else {
      scrollToElement("about");
    }
  };

  const handleHomeClick = () => {
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(
        () => window.scrollTo({ top: 0, behavior: "smooth" }),
        100
      );
    }
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-scale">
            <img src={cplusLogo} alt="C+" className="h-20 w-auto" />
            <span className="text-sm font-semibold text-muted-foreground tracking-wider">
              TASTE PLUS
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={handleHomeClick} className="nav-link">
              Home
            </button>
            <button onClick={handleAboutClick} className="nav-link">
              About
            </button>
            <Link to="/cafe" className="nav-link">
              Café
            </Link>
            <Link to="/restaurant" className="nav-link">
              Restaurant
            </Link>
            <Link to="/sweets" className="nav-link">
              Sweets
            </Link>
            <Link to="/weddings" className="nav-link">
              Wedding Halls
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {getTotalItems() > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="relative hover-scale"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center animate-scale-in">
                  {getTotalItems()}
                </span>
              </Button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            {getTotalItems() > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="relative hover-scale"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center animate-scale-in">
                  {getTotalItems()}
                </span>
              </Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-scale">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-6 mt-8">
                  <button onClick={handleHomeClick} className="mobile-link">
                    Home
                  </button>
                  <button onClick={handleAboutClick} className="mobile-link">
                    About
                  </button>
                  <Link to="/cafe" onClick={handleNavClick} className="mobile-link">
                    Café
                  </Link>
                  <Link
                    to="/restaurant"
                    onClick={handleNavClick}
                    className="mobile-link"
                  >
                    Restaurant
                  </Link>
                  <Link to="/sweets" onClick={handleNavClick} className="mobile-link">
                    Sweets
                  </Link>
                  <Link
                    to="/weddings"
                    onClick={handleNavClick}
                    className="mobile-link"
                  >
                    Wedding Halls
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
