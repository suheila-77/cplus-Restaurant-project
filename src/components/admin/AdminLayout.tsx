import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  LogOut,
  User,
  Users
} from "lucide-react";
import cplusLogo from "@/assets/logo-without-text.png";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const allMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin", adminOnly: true },
  { icon: ShoppingBag, label: "Products", path: "/admin/products", adminOnly: false },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders", adminOnly: true },
  { icon: Users, label: "Users", path: "/admin/users", adminOnly: true },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin, isProductManager } = useAuth();

  useEffect(() => {
    if (!isAdmin && isProductManager && location.pathname === "/admin") {
      navigate("/admin/products", { replace: true });
    }
  }, [isAdmin, isProductManager, location.pathname, navigate]);

  const menuItems = allMenuItems.filter((item) => isAdmin || !item.adminOnly);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src={cplusLogo} alt="C+" className="h-12 w-auto" />
            <div>
              <h2 className="font-bold text-lg">C+ Admin</h2>
              <p className="text-xs text-muted-foreground">TASTE PLUS</p>
            </div>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : isProductManager ? "Product Manager" : "User"}</p>
            </div>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
