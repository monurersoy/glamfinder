import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AppointmentsTab } from "@/components/salon/AppointmentsTab";
import type { Appointment } from "@/integrations/supabase/types";

const ManageSalon = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("services");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: salon, isLoading } = useQuery({
    queryKey: ["salon"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salons")
        .select(`
          *,
          services (*)
        `)
        .eq("owner_id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: appointments } = useQuery({
    queryKey: ["appointments", selectedDate],
    queryFn: async () => {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("salon_id", salon?.id)
        .gte("start_time", startOfDay.toISOString())
        .lte("start_time", endOfDay.toISOString());

      if (error) throw error;
      return data as Appointment[];
    },
    enabled: !!salon?.id,
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

  const handleDeleteService = async (serviceId: string) => {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId);

    if (error) {
      toast({
        title: "Error",
        description: "Service could not be deleted",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Service deleted successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{salon.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                  <TabsTrigger value="services">Hizmetler</TabsTrigger>
                  <TabsTrigger value="images">Fotoğraflar</TabsTrigger>
                  <TabsTrigger value="appointments">Randevular</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Hizmetler</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Hizmet
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {salon.services?.map((service) => (
                      <Card key={service.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {service.price} ₺ - {service.duration_minutes} dakika
                              </p>
                              {service.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {service.description}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="images">
                  <div>Image management coming soon...</div>
                </TabsContent>

                <TabsContent value="appointments">
                  <AppointmentsTab
                    appointments={appointments}
                    selectedDate={selectedDate}
                    onDateSelect={(date) => date && setSelectedDate(date)}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map(
                  (day) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium">{day}</span>
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">09:00 - 18:00</span>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageSalon;