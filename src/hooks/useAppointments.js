import { useState, useEffect, useCallback } from 'react';
import { fetchAppointments, createAppointment, updateAppointmentStatus } from '../api';

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

  const addAppointment = async (apptData) => {
    const res = await createAppointment(apptData);
    if (!res.error) {
      await loadAppointments();
    }
    return res;
  };

  const updateStatus = async (id, status) => {
    const res = await updateAppointmentStatus(id, status);
    if (!res.error) {
      await loadAppointments();
    }
    return res;
  };

  return {
    appointments,
    isLoading,
    error,
    loadAppointments,
    addAppointment,
    updateStatus
  };
}
