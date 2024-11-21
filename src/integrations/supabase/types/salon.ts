export type WorkingHours = {
  [key in DayOfWeek]: { open: string; close: string } | null;
};

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type Salon = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  owner_id: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number;
  working_hours: WorkingHours;
  created_at: string;
  updated_at: string;
};