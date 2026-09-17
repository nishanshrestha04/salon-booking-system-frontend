const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { data: null, error: error.message };
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error creating service:', error);
    return { data: null, error: error.message };
  }
};

export const deleteService = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { error: null };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { error: error.message };
  }
};

export const fetchAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { data: null, error: error.message };
  }
};
