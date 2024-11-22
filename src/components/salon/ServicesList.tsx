import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ServiceCard } from "./ServiceCard";
import type { SalonFormValues } from "./types";

interface ServicesListProps {
  onAddService: () => void;
  onEditService: (index: number) => void;
  onRemoveService: (index: number) => void;
}

export const ServicesList = ({
  onAddService,
  onEditService,
  onRemoveService,
}: ServicesListProps) => {
  const form = useFormContext<SalonFormValues>();
  const services = form.watch("services");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Hizmetler</h3>
        <Button type="button" variant="outline" onClick={onAddService}>
          <Plus className="h-4 w-4 mr-2" />
          Hizmet Ekle
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            onEdit={() => onEditService(index)}
            onDelete={() => onRemoveService(index)}
          />
        ))}
      </div>
    </div>
  );
};