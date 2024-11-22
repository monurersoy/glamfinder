import { type Database } from './database.types';

export type ProfilesTable = Database['public']['Tables']['profiles'];
export type SalonsTable = Database['public']['Tables']['salons'];
export type ServicesTable = Database['public']['Tables']['services'];
export type ServiceCategoriesTable = Database['public']['Tables']['service_categories'];
export type AppointmentsTable = {
  Row: {
    id: string;
    salon_id: string;
    service_id: string;
    customer_id: string;
    customer_name: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    salon_id: string;
    service_id: string;
    customer_id: string;
    customer_name: string;
    start_time: string;
    end_time: string;
    status?: 'pending' | 'confirmed' | 'cancelled';
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    salon_id?: string;
    service_id?: string;
    customer_id?: string;
    customer_name?: string;
    start_time?: string;
    end_time?: string;
    status?: 'pending' | 'confirmed' | 'cancelled';
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "appointments_salon_id_fkey";
      columns: ["salon_id"];
      isOneToOne: false;
      referencedRelation: "salons";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "appointments_service_id_fkey";
      columns: ["service_id"];
      isOneToOne: false;
      referencedRelation: "services";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "appointments_customer_id_fkey";
      columns: ["customer_id"];
      isOneToOne: false;
      referencedRelation: "profiles";
      referencedColumns: ["id"];
    }
  ];
};