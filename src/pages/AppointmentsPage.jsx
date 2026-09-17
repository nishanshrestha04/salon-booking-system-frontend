import { AppointmentList, AppointmentForm } from '../components/appointments';
import { useAppointments, useServices } from '../hooks';

export default function AppointmentsPage() {
  const { appointments, isLoading: loadingAppts, addAppointment, updateStatus } = useAppointments();
  const { services, isLoading: loadingServices } = useServices();

  const isLoading = loadingAppts || loadingServices;

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Appointments Management</h2>
        <p className="text-muted-foreground font-medium">Book new appointments and manage their status.</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-start">
        <AppointmentForm 
          onAppointmentAdded={addAppointment} 
          services={services} 
          isLoadingServices={loadingServices}
        />
        <AppointmentList 
          appointments={appointments} 
          isLoading={isLoading} 
          onStatusChange={updateStatus} 
        />
      </div>
    </div>
  );
}
