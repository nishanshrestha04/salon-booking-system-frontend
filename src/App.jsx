import { useEffect, useState } from 'react';
import { fetchServices, fetchAppointments } from './api';

function App() {
  const [apiStatus, setApiStatus] = useState('Connecting...');
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const checkConnection = async () => {
      const [servicesRes, appointmentsRes] = await Promise.all([
        fetchServices(),
        fetchAppointments()
      ]);

      if (servicesRes.error && appointmentsRes.error) {
        setApiStatus(`Connection failed: ${servicesRes.error}`);
      } else {
        setApiStatus('API Connected');
        if (Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data);
        } else if (servicesRes.data && servicesRes.data.results) {
          setServices(servicesRes.data.results);
        }

        if (Array.isArray(appointmentsRes.data)) {
          setAppointments(appointmentsRes.data);
        } else if (appointmentsRes.data && appointmentsRes.data.results) {
          setAppointments(appointmentsRes.data.results);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white py-6 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-indigo-600">
          Salon Management System
        </h1>
      </header>
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center p-8 text-center">
        <div className={`mb-6 px-4 py-2 rounded-full text-sm font-semibold ${apiStatus === 'API Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {apiStatus}
        </div>
        
        <p className="text-xl text-gray-600 max-w-md mb-8">
          Welcome to the Salon Management System.
        </p>

        {services.length > 0 && (
          <div className="w-full text-left mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id || Math.random()} className="bg-white p-6 rounded-lg transition-shadow shadow-sm">
                  <h3 className="text-lg font-bold text-indigo-600">{service.name || service.title || 'Service Name'}</h3>
                  {service.description && <p className="text-gray-600 mt-2 text-sm">{service.description}</p>}
                  {service.price && <p className="text-green-600 font-bold mt-2">NPR {service.price}</p>}
                  {service.duration && <p className="text-gray-500 text-sm mt-1">{service.duration} mins</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {appointments.length > 0 && (
          <div className="w-full text-left mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id || Math.random()} className="bg-white p-6 rounded-lg transition-shadow shadow-sm border-l-4 border-indigo-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{appointment.customer_name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                      {appointment.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium">{appointment.service_name}</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>📅 {appointment.appointment_date} at {appointment.appointment_time}</p>
                    <p>📱 {appointment.customer_phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {services.length === 0 && apiStatus === 'API Connected' && (
          <p className="text-gray-500 italic mt-8">No services found. Add some from the backend!</p>
        )}
      </main>
    </div>
  );
}

export default App;
