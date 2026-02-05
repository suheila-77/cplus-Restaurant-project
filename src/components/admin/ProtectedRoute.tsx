import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, checkingRole, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !checkingRole && !user) {
      navigate("/auth");
    }
  }, [user, loading, checkingRole, navigate]);

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
