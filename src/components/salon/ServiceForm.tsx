import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ServiceInput } from "./types";
import { useFormContext } from "react-hook-form";

interface ServiceFormProps {
  index: number;
  categories: any[];
}

export const ServiceForm = ({ index, categories }: ServiceFormProps) => {
  const form = useFormContext<{ services: ServiceInput[] }>();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`services.${index}.categoryId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kategori</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`services.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hizmet Adı</FormLabel>
            <FormControl>
              <Input placeholder="Hizmet adını girin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`services.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fiyat (₺)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Fiyat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`services.${index}.duration`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Süre (dakika)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Süre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`services.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Açıklama (opsiyonel)</FormLabel>
            <FormControl>
              <Textarea placeholder="Bu hizmeti açıklayın" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};