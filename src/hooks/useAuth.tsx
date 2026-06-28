import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingRole, setCheckingRole] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProductManager, setIsProductManager] = useState(false);

  const checkAdminRole = async (userId: string) => {
    setCheckingRole(true);
    try {
      const [adminRes, pmRes] = await Promise.all([
        supabase.rpc('has_role', { _user_id: userId, _role: 'admin' as any }),
        supabase.rpc('has_role', { _user_id: userId, _role: 'product_manager' as any }),
      ]);
      setIsAdmin(!adminRes.error && !!adminRes.data);
      setIsProductManager(!pmRes.error && !!pmRes.data);
    } catch (error) {
      console.error('Error checking roles:', error);
      setIsAdmin(false);
      setIsProductManager(false);
    } finally {
      setCheckingRole(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role when user changes
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
          setCheckingRole(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdminRole(session.user.id);
      } else {
        setCheckingRole(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName || email
          }
        }
      });

      if (error) throw error;
      
      toast.success("Account created! Please check your email to verify.");
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Welcome back!");
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Signed out successfully");
      setIsAdmin(false);
      setIsProductManager(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return {
    user,
    session,
    loading,
    checkingRole,
    isAdmin,
    isProductManager,
    canManageProducts: isAdmin || isProductManager,
    signUp,
    signIn,
    signOut,
  };
};
