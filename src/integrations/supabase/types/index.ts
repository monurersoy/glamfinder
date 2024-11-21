export * from './salon';
export * from './review';
export * from './photo';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
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
      };
      salons: {
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
          working_hours: Json;
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
          working_hours?: Json;
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
          working_hours?: Json;
        };
      };
      services: {
        Row: {
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
          created_at?: string;
          description?: string | null;
          duration_minutes?: number;
          id?: string;
          name?: string;
          price?: number;
          salon_id?: string | null;
          updated_at?: string;
        };
      };
      salon_photos: {
        Row: {
          id: string;
          salon_id: string;
          photo_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          salon_id: string;
          photo_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          salon_id?: string;
          photo_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          salon_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          salon_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          salon_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};