import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function AppointmentList({ appointments, isLoading, onStatusChange }) {
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(appt => {
      const matchesSearch = 
        appt.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        appt.customer_phone.includes(searchQuery);
      
      const matchesDate = dateFilter ? appt.appointment_date === dateFilter : true;
      const matchesStatus = statusFilter === 'all' ? true : appt.status === statusFilter;
      
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [appointments, searchQuery, dateFilter, statusFilter]);
  if (isLoading) {
    return <div className="p-8 text-center text-primary font-medium animate-pulse">Loading appointments...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center text-muted-foreground font-medium">
          No appointments found. Book one using the form.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or phone..." 
            className="h-10 pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full sm:w-36 rounded-none border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <div className="flex gap-2 w-full sm:w-auto items-center">
            <Input 
              type="date" 
              className="bg-white h-10 w-full sm:w-40"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {(dateFilter || statusFilter !== 'all') && (
              <Button variant="outline" onClick={() => { setDateFilter(''); setStatusFilter('all'); }}>Clear</Button>
            )}
          </div>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-8 text-center text-muted-foreground font-medium">
            No appointments match your filters.
          </CardContent>
        </Card>
      ) : filteredAppointments.map(appt => (
          <Card key={appt.id} className="border-l-4 border-l-secondary hover:bg-muted/10 transition-colors">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => setSelectedAppt(appt)}>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-foreground">{appt.customer_name}</CardTitle>
                <p className="text-sm text-primary font-bold mt-1">{appt.service_name}</p>
                <p className="text-sm text-muted-foreground font-medium mt-1">Phone: {appt.customer_phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{appt.appointment_date}</p>
                <p className="text-sm text-muted-foreground font-medium">{appt.appointment_time}</p>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="pt-2 border-t mt-2 bg-muted/20 p-4 flex justify-between items-center">
            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
              {appt.status.toUpperCase()}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Update Status:</span>
              <select
                value={appt.status}
                onChange={(e) => onStatusChange && onStatusChange(appt.id, e.target.value)}
                disabled={appt.status === 'completed' || appt.status === 'cancelled'}
                className="text-xs font-bold border border-input bg-background px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={!!selectedAppt} onOpenChange={(open) => !open && setSelectedAppt(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">Appointment Details</DialogTitle>
            <DialogDescription>Full details for this booking.</DialogDescription>
          </DialogHeader>
          
          {selectedAppt && (
            <div className="space-y-6 mt-4">
              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Customer Info</h4>
                <p className="text-lg font-bold text-foreground">{selectedAppt.customer_name}</p>
                <p className="text-sm font-medium text-foreground/80 mt-1">Phone: {selectedAppt.customer_phone}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Service Details</h4>
                <p className="text-lg font-bold text-primary">{selectedAppt.service_name}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">Schedule</h4>
                  <p className="text-md font-bold text-foreground">{selectedAppt.appointment_date}</p>
                  <p className="text-sm font-medium text-foreground/80 mt-1">{selectedAppt.appointment_time}</p>
                </div>
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                  selectedAppt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  selectedAppt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedAppt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedAppt.status.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
