import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ServiceCard } from "./salon/ServiceCard";
import { ServiceForm } from "./salon/ServiceForm";
import type { ServiceInput } from "./salon/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type FormValues = {
  name: string;
  description: string;
  address: string;
  services: ServiceInput[];
};

const SalonSetupForm = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      services: [],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["serviceCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!session?.user?.id) {
      toast({
        title: "Hata",
        description: "Salon oluşturmak için giriş yapmalısınız",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: salon, error: salonError } = await supabase
        .from("salons")
        .insert({
          name: data.name,
          description: data.description,
          address: data.address,
          owner_id: session.user.id,
        })
        .select()
        .single();

      if (salonError) throw salonError;

      const servicesData = data.services.map((service) => ({
        name: service.name,
        description: service.description,
        price: parseFloat(service.price),
        duration_minutes: parseInt(service.duration),
        category_id: service.categoryId,
        salon_id: salon.id,
      }));

      const { error: servicesError } = await supabase
        .from("services")
        .insert(servicesData);

      if (servicesError) throw servicesError;

      toast({
        title: "Başarılı",
        description: "Salonunuz başarıyla oluşturuldu!",
      });
      
      navigate("/business-dashboard");
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addService = () => {
    const services = form.getValues("services");
    form.setValue("services", [
      ...services,
      { categoryId: "", name: "", price: "", duration: "", description: "" },
    ]);
    setEditingServiceIndex(services.length);
  };

  const removeService = (index: number) => {
    const services = form.getValues("services");
    form.setValue(
      "services",
      services.filter((_, i) => i !== index)
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salon Adı</FormLabel>
              <FormControl>
                <Input placeholder="Salon adını girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Açıklama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Salonunuzu ve özel yanlarını açıklayın"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Salon adresini girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Hizmetler</h3>
            <Button type="button" variant="outline" onClick={addService}>
              <Plus className="h-4 w-4 mr-2" />
              Hizmet Ekle
            </Button>
          </div>

          <div className="grid gap-4">
            {form.watch("services").map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onEdit={() => setEditingServiceIndex(index)}
                onDelete={() => removeService(index)}
              />
            ))}
          </div>
        </div>

        <Dialog open={editingServiceIndex !== null} onOpenChange={() => setEditingServiceIndex(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hizmet Düzenle</DialogTitle>
            </DialogHeader>
            {editingServiceIndex !== null && (
              <ServiceForm index={editingServiceIndex} categories={categories || []} />
            )}
          </DialogContent>
        </Dialog>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salon oluşturuluyor...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Salon Oluştur
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default SalonSetupForm;