import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ManageSalon = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("services");

  const { data: salon, isLoading } = useQuery({
    queryKey: ["salon"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salons")
        .select(`
          *,
          services (*),
          salon_images (*),
          salon_working_hours (*)
        `)
        .eq("owner_id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (!session?.user?.id) {
      navigate("/");
    }
  }, [session, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!salon) {
    return <div>Salon not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{salon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="services">Hizmetler</TabsTrigger>
              <TabsTrigger value="images">Fotoğraflar</TabsTrigger>
              <TabsTrigger value="hours">Çalışma Saatleri</TabsTrigger>
              <TabsTrigger value="appointments">Randevular</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <div>Service management coming soon...</div>
            </TabsContent>

            <TabsContent value="images">
              <div>Image management coming soon...</div>
            </TabsContent>

            <TabsContent value="hours">
              <div>Working hours management coming soon...</div>
            </TabsContent>

            <TabsContent value="appointments">
              <div>Appointment management coming soon...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSalon;