import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createProduct = useMutation({
    mutationFn: async (productData: any) => {
      const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...productData }: any) => {
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
