import { useEffect, useState } from 'react';
import { fetchServices } from './api';

function App() {
  const [apiStatus, setApiStatus] = useState('Connecting...');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const checkConnection = async () => {
      const { data, error } = await fetchServices();
      if (error) {
        setApiStatus(`Connection failed: ${error}`);
      } else {
        setApiStatus('API Connected');
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data && data.results) {
          setServices(data.results);
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
          <div className="w-full text-left">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id || Math.random()} className="bg-white p-6 rounded-lg transition-shadow">
                  <h3 className="text-lg font-bold text-indigo-600">{service.name || service.title || 'Service Name'}</h3>
                  {service.description && <p className="text-gray-600 mt-2 text-sm">{service.description}</p>}
                  {service.price && <p className="text-green-600 font-bold mt-2">NPR {service.price}</p>}
                  {service.duration && <p className="text-gray-500 text-sm mt-1">{service.duration} mins</p>}
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
