export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: ProfilesTable;
      salons: SalonsTable;
      services: ServicesTable;
      service_categories: ServiceCategoriesTable;
      appointments: AppointmentsTable;
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

interface ProfilesTable {
  Row: {
    created_at: string;
    id: string;
    updated_at: string;
    user_type: string;
  };
  Insert: {
    created_at?: string;
    id: string;
    updated_at?: string;
    user_type: string;
  };
  Update: {
    created_at?: string;
    id?: string;
    updated_at?: string;
    user_type?: string;
  };
  Relationships: [];
}

interface SalonsTable {
  Row: {
    address: string | null;
    created_at: string;
    description: string | null;
    id: string;
    latitude: number | null;
    longitude: number | null;
    name: string;
    owner_id: string | null;
    rating: number;
    updated_at: string;
  };
  Insert: {
    address?: string | null;
    created_at?: string;
    description?: string | null;
    id?: string;
    latitude?: number | null;
    longitude?: number | null;
    name: string;
    owner_id?: string | null;
    rating?: number;
    updated_at?: string;
  };
  Update: {
    address?: string | null;
    created_at?: string;
    description?: string | null;
    id?: string;
    latitude?: number | null;
    longitude?: number | null;
    name?: string;
    owner_id?: string | null;
    rating?: number;
    updated_at?: string;
  };
  Relationships: [];
}

interface ServicesTable {
  Row: {
    category_id: string | null;
    created_at: string;
    description: string | null;
    duration_minutes: number;
    id: string;
    name: string;
    price: number;
    salon_id: string | null;
    updated_at: string;
  };
  Insert: {
    category_id?: string | null;
    created_at?: string;
    description?: string | null;
    duration_minutes: number;
    id?: string;
    name: string;
    price: number;
    salon_id?: string | null;
    updated_at?: string;
  };
  Update: {
    category_id?: string | null;
    created_at?: string;
    description?: string | null;
    duration_minutes?: number;
    id?: string;
    name?: string;
    price?: number;
    salon_id?: string | null;
    updated_at?: string;
  };
  Relationships: [];
}

interface ServiceCategoriesTable {
  Row: {
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
  };
  Insert: {
    created_at?: string;
    id?: string;
    name: string;
    updated_at?: string;
  };
  Update: {
    created_at?: string;
    id?: string;
    name?: string;
    updated_at?: string;
  };
  Relationships: [];
}

interface AppointmentsTable {
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
  Relationships: [];
}