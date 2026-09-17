import { useServices, useAppointments } from '../hooks';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CalendarDays, Scissors, Clock, Banknote } from 'lucide-react';

export default function Dashboard() {
  const { services, isLoading: loadingServices } = useServices();
  const { appointments, isLoading: loadingAppointments } = useAppointments();

  const isLoading = loadingServices || loadingAppointments;

  // Stats
  const totalServices = services.length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  
  // Total Income (Completed appointments)
  const totalIncome = appointments
    .filter(a => a.status === 'completed')
    .reduce((sum, appt) => {
      const service = services.find(s => s.id === appt.service);
      return sum + (service ? Number(service.price) : 0);
    }, 0);

  // Today's Appointments
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const todaysAppointments = appointments.filter(a => a.appointment_date === todayStr);

  // Upcoming Appointments (Strictly future dates)
  const upcomingAppointments = appointments
    .filter(a => a.appointment_date > todayStr)
    .sort((a, b) => new Date(`${a.appointment_date}T${a.appointment_time}`) - new Date(`${b.appointment_date}T${b.appointment_time}`))
    .slice(0, 5); // Just show next 5

  if (isLoading) {
    return <div className="p-8 text-center text-primary font-medium animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Dashboard</h2>
        <p className="text-muted-foreground font-medium">Welcome to your salon overview.</p>
      </div>

      {/* Summary Seciton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Total Revenue</CardTitle>
             <Banknote className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              <span className="text-lg text-primary mr-1">NPR</span>
              {totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">From completed services</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-secondary-foreground">Total Services</CardTitle>
            <Scissors className="h-5 w-5 text-secondary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalServices}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Available to book</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-cta">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-cta">Total Appointments</CardTitle>
            <CalendarDays className="h-5 w-5 text-cta" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">All time bookings</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-yellow-600">Pending</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Today's Appointments */}
        <Card className="flex flex-col border-t-4 border-t-primary">
          <CardHeader className="bg-primary/5 pb-4 border-b">
            <CardTitle className="text-primary">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            {todaysAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground font-medium italic">No appointments scheduled for today.</p>
            ) : (
              <div className="space-y-4">
                {todaysAppointments.map(appt => (
                  <div key={appt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-lg transition-colors -mx-2 gap-2 sm:gap-0">
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none">{appt.customer_name}</p>
                      <p className="text-sm text-primary font-medium mt-1">{appt.service_name}</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                      <p className="text-sm font-bold text-foreground">{appt.appointment_time}</p>
                      <div className={`mt-0 sm:mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appt.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="flex flex-col border-t-4 border-t-cta">
          <CardHeader className="bg-cta/5 pb-4 border-b">
            <CardTitle className="text-cta">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground font-medium italic">No upcoming appointments scheduled.</p>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map(appt => (
                  <div key={appt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-lg transition-colors -mx-2 gap-2 sm:gap-0">
                    <div>
                      <p className="text-sm font-bold text-foreground leading-none">{appt.customer_name}</p>
                      <p className="text-sm text-cta font-medium mt-1">{appt.service_name}</p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                      <p className="text-sm font-bold text-foreground">{appt.appointment_date}</p>
                      <p className="text-sm text-muted-foreground font-medium">{appt.appointment_time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
