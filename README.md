# Salon Management System - Frontend

This is the frontend for the Salon Management System, built with React, Vite, and Tailwind CSS.

## Features
- **Dashboard**: View and manage salon services and appointments.
- **Services Management**: View available services dynamically fetched from the backend.
- **Appointment Booking**: Real-time integration with the backend to book appointments and track statuses.

## Setup Instructions

1. **Install Node modules**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root of the frontend directory and add the backend API URL:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
   (This is already created during the initial setup).

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`.

## Technologies Used
- React 18
- Vite
- Tailwind CSS
- Native Fetch API
