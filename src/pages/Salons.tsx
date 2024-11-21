import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Map from "@/components/Map";
import SalonFilters from "@/components/SalonFilters";
import { type Salon } from "@/integrations/supabase/types/salon";

const Salons = () => {
  const [filters, setFilters] = useState({ search: "", rating: "" });

  const { data: salons, isLoading } = useQuery({
    queryKey: ["salons", filters],
    queryFn: async () => {
      let query = supabase
        .from("salons")
        .select(`
          *,
          services (*)
        `);

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`);
      }

      if (filters.rating) {
        query = query.gte('rating', parseInt(filters.rating));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as (Salon & { services: any[] })[];
    },
  });

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Beauty Salons</h1>
      
      <SalonFilters onFilterChange={setFilters} />
      
      {salons && salons.length > 0 && (
        <div className="mb-8">
          <Map salons={salons} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons?.map((salon) => (
          <Card key={salon.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{salon.name}</CardTitle>
              <CardDescription>{salon.description}</CardDescription>
              <p className="text-sm text-gray-500">{salon.address}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{salon.rating ? salon.rating.toFixed(1) : 'No ratings yet'}</span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Services</h3>
              <div className="space-y-2">
                {salon.services?.map((service) => (
                  <div key={service.id} className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm text-gray-500">{service.duration_minutes} minutes</p>
                      </div>
                      <p className="font-semibold">${service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Salons;