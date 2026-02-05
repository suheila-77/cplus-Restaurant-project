import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      
      const previousOrders = queryClient.getQueryData(["orders"]);
      
      queryClient.setQueryData(["orders"], (old: any) =>
        old?.map((order: any) =>
          order.id === id ? { ...order, status } : order
        )
      );

      return { previousOrders };
    },
    onError: (error: any, variables, context) => {
      queryClient.setQueryData(["orders"], context?.previousOrders);
      toast.error(`Failed to update order: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Order status updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    orders: ordersQuery.data ?? [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    updateOrderStatus,
  };
};
