import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BasicInfoForm } from "./salon/BasicInfoForm";
import { ServicesList } from "./salon/ServicesList";
import { ServiceForm } from "./salon/ServiceForm";
import type { SalonFormValues } from "./salon/types";

const SalonSetupForm = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);

  const form = useForm<SalonFormValues>({
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

  const onSubmit = async (data: SalonFormValues) => {
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
      
      // Navigate after successful creation
      navigate("/manage-salon");
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

  const handleServiceSave = () => {
    setEditingServiceIndex(null);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoForm />
        <ServicesList
          onAddService={addService}
          onEditService={setEditingServiceIndex}
          onRemoveService={removeService}
        />

        <Dialog 
          open={editingServiceIndex !== null} 
          onOpenChange={(open) => !open && setEditingServiceIndex(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hizmet Düzenle</DialogTitle>
            </DialogHeader>
            {editingServiceIndex !== null && categories && (
              <>
                <ServiceForm index={editingServiceIndex} categories={categories} />
                <DialogFooter>
                  <Button type="button" onClick={handleServiceSave}>
                    Kaydet
                  </Button>
                </DialogFooter>
              </>
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