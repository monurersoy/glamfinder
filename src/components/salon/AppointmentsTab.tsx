import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import type { Appointment } from "@/integrations/supabase/types";

interface AppointmentsTabProps {
  appointments: Appointment[] | undefined;
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
}

export const AppointmentsTab = ({ appointments, selectedDate, onDateSelect }: AppointmentsTabProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Bugünün Randevuları</CardTitle>
        </CardHeader>
        <CardContent>
          {!appointments || appointments.length === 0 ? (
            <p className="text-muted-foreground">
              Bugün için randevu bulunmuyor
            </p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex justify-between items-center p-3 bg-secondary rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {format(new Date(appointment.start_time), "HH:mm", {
                        locale: tr,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.customer_name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Detaylar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Takvim</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
            modifiersStyles={{
              booked: { backgroundColor: "rgb(239 68 68)" },
              available: { backgroundColor: "rgb(34 197 94)" },
              partial: { backgroundColor: "rgb(234 179 8)" },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};