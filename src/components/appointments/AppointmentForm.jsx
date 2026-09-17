import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function AppointmentForm({ onAppointmentAdded, services, isLoadingServices }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    service: '',
    appointment_date: '',
    appointment_time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const now = new Date();
    const selectedDateTime = new Date(`${formData.appointment_date}T${formData.appointment_time}`);
    
    if (selectedDateTime < now) {
      setError("Cannot book an appointment in the past.");
      setIsSubmitting(false);
      return;
    }
    
    if (onAppointmentAdded) {
      const payload = {
        ...formData,
        service: Number(formData.service)
      };
      
      const res = await onAppointmentAdded(payload);
      
      if (!res.error) {
        setFormData({
          customer_name: '',
          customer_phone: '',
          service: '',
          appointment_date: '',
          appointment_time: ''
        });
      } else {
        setError(res.error);
      }
    }
    setIsSubmitting(false);
  };

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="bg-primary/5 pb-4 border-b">
        <CardTitle className="text-primary">Book Appointment</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-destructive font-medium bg-red-50 p-2 border-l-2 border-red-500">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Customer Name</label>
            <Input 
              required 
              placeholder="e.g. John Doe" 
              value={formData.customer_name}
              onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Phone Number</label>
            <Input 
              required 
              type="tel"
              inputMode="numeric"
              placeholder="e.g. 9840000000" 
              value={formData.customer_phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setFormData({...formData, customer_phone: val});
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Service</label>
            <select 
              required
              className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              disabled={isLoadingServices}
            >
              <option value="" disabled>Select a service</option>
              {services?.map(s => (
                <option key={s.id} value={s.id}>{s.name} - NPR {s.price}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Date</label>
              <Input 
                required 
                type="date" 
                min={todayStr}
                value={formData.appointment_date}
                onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Time</label>
              <Input 
                required 
                type="time" 
                min={formData.appointment_date === todayStr ? currentTimeStr : undefined}
                value={formData.appointment_time}
                onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting || isLoadingServices} className="w-full bg-primary hover:bg-primary/90 mt-2">
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
