import { useState, useEffect, useCallback } from 'react';
import { fetchAppointments } from '../api';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const res = await fetchAppointments();
    if (res.error) {
      setError(res.error);
    } else if (res.data) {
      setAppointments(Array.isArray(res.data) ? res.data : (res.data.results || []));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return {
    appointments,
    isLoading,
    error,
    loadAppointments
  };
}
