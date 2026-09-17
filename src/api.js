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
