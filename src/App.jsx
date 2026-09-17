import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Global Navigation Header */}
      <header className="w-full bg-white py-4 px-8 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Salon Management System
        </h1>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</Link>
          <Link to="/services" className="text-gray-600 hover:text-indigo-600 font-medium">Services</Link>
          <Link to="/appointments" className="text-gray-600 hover:text-indigo-600 font-medium">Appointments</Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

