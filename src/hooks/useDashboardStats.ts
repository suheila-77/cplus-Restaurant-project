import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  revenue: number;
  products: number;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const [ordersResult, productsResult] = await Promise.all([
        supabase.from("orders").select("*"),
        supabase.from("products").select("*"),
      ]);

      if (ordersResult.error) throw ordersResult.error;
      if (productsResult.error) throw productsResult.error;

      const orders = ordersResult.data || [];
      const products = productsResult.data || [];

      const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const pendingOrders = orders.filter(order => order.status === "pending").length;

      return {
        totalOrders: orders.length,
        pendingOrders,
        revenue,
        products: products.length,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
