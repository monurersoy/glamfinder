export type ServiceInput = {
  categoryId: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
};

export type SalonFormValues = {
  name: string;
  description: string;
  address: string;
  services: ServiceInput[];
};