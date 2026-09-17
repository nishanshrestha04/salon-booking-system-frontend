import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white py-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          Salon Management System
        </h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl text-gray-600 max-w-md">
          Welcome to the Salon Management System.
        </p>
        <button className="mt-8 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
          Get Started
        </button>
      </main>
    </div>
  );
}

export default App;
