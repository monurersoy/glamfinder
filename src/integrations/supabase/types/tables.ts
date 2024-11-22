import { type Database } from './database.types';

export type ProfilesTable = Database['public']['Tables']['profiles'];
export type SalonsTable = Database['public']['Tables']['salons'];
export type ServicesTable = Database['public']['Tables']['services'];
export type ServiceCategoriesTable = Database['public']['Tables']['service_categories'];
export type AppointmentsTable = Database['public']['Tables']['appointments'];