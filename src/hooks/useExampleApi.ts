import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useExampleApi = () => {
  const queryClient = useQueryClient();

  // Fetch salons
  const { data: salons, isLoading } = useQuery({
    queryKey: ["salons"],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke("example", {
        method: "GET",
      });
      return data.salons;
    },
  });

  // Create salon mutation
  const createSalon = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      const { data } = await supabase.functions.invoke("example", {
        method: "POST",
        body: { name, description },
      });
      return data.salon;
    },
    onSuccess: () => {
      // Invalidate and refetch salons after creating a new one
      queryClient.invalidateQueries({ queryKey: ["salons"] });
    },
  });

  return {
    salons,
    isLoading,
    createSalon,
  };
};