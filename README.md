# Salon Management System - Frontend

This is the modern, responsive frontend for the Salon Management System, built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.

## Features

- **Dashboard Overview**: High-level summary of total revenue, total services, and active appointments. Includes quick views for today's and upcoming appointments.
- **Services Management (CRUD)**: Create, view, and safely delete salon services (e.g., Haircut, Massage). Form inputs are strictly validated for numbers.
- **Appointments Management (CRUD)**: 
  - Book new appointments by inputting customer details and selecting services dynamically fetched from the backend.
  - **Search & Filter**: Search appointments easily by customer name or phone number, and filter by specific dates.
  - **Status Workflows**: Update appointment statuses (Pending, Confirmed, Completed, Cancelled). Terminal statuses (Completed/Cancelled) are safely locked.
  - **Detailed View**: View full appointment details in a sleek pop-up modal.
- **Modern UI/UX**: 
  - Boxy, sharp-edged design aesthetic (radius 0) using customized `shadcn/ui` components.
  - Professional typography utilizing **Outfit** for headings and **Inter** for body text.
  - Fully responsive layout that gracefully adapts to mobile, tablet, and desktop screens, featuring a mobile hamburger navigation menu.
- **Robust Architecture**: Built with custom React hooks (`useServices`, `useAppointments`) for clean separation of state management, data fetching, and UI rendering.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Ensure you have a `.env` file in the root of the frontend directory pointing to your local Django backend:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`.

## Technologies Used
- **React 18**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui** (Dialog, Card, Input, Button)
- **Lucide React** (Iconography)
- **React Router DOM**
- **Native Fetch API**
