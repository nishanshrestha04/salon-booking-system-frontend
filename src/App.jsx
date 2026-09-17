import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import AppointmentsPage from './pages/AppointmentsPage';

import { Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Global Navigation Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4">
          <h1 className="text-xl font-bold tracking-tight">SalonAdmin</h1>
          
          {/* Desktop Nav */}
          <nav className="hidden sm:flex space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors whitespace-nowrap">Dashboard</Link>
            <Link to="/services" className="hover:text-primary-foreground/80 transition-colors whitespace-nowrap">Services</Link>
            <Link to="/appointments" className="hover:text-primary-foreground/80 transition-colors whitespace-nowrap">Appointments</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="sm:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="sm:hidden flex flex-col px-4 pb-4 space-y-4 text-sm font-medium border-t border-primary-foreground/20 pt-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-foreground/80 transition-colors block">Dashboard</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-foreground/80 transition-colors block">Services</Link>
            <Link to="/appointments" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-foreground/80 transition-colors block">Appointments</Link>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-8 py-4 sm:py-8 overflow-x-hidden">
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

