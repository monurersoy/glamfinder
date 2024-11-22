import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { ServiceInput } from "./types";

interface ServiceCardProps {
  service: ServiceInput;
  onEdit: () => void;
  onDelete: () => void;
}

export const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-medium">{service.name || "Yeni Hizmet"}</h4>
            {service.price && (
              <p className="text-sm text-muted-foreground">
                {service.price} ₺ - {service.duration} dakika
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};