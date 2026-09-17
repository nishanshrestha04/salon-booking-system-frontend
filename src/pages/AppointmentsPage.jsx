import { AppointmentList, AppointmentForm } from '../components/appointments';

export default function AppointmentsPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Appointments Management</h2>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}
