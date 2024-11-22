import type { AppointmentsTable } from './tables';

export type Appointment = AppointmentsTable['Row'] & {
  status: 'pending' | 'confirmed' | 'cancelled';
};