export type Appointment = {
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