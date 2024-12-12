import { useState } from "react";
import { useExampleApi } from "@/hooks/useExampleApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const ExampleComponent = () => {
  const { salons, isLoading, createSalon } = useExampleApi();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSalon.mutateAsync({ name, description });
      toast({
        title: "Başarılı",
        description: "Salon başarıyla oluşturuldu",
      });
      setName("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Salon oluşturulurken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Salon adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" disabled={createSalon.isPending}>
          Salon Oluştur
        </Button>
      </form>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="space-y-2">
          {salons?.map((salon: any) => (
            <div key={salon.id} className="p-4 border rounded">
              <h3 className="font-medium">{salon.name}</h3>
              <p className="text-sm text-muted-foreground">{salon.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};